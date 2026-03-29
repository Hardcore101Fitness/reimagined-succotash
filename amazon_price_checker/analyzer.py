from dataclasses import dataclass, field
from typing import Callable


@dataclass
class Anomaly:
    asin: str
    title: str
    url: str
    category: str
    anomaly_type: str       # "MISPRICE" | "HISTORY_ANOMALY" | "SELLER_DISCREPANCY"
    current_price: float
    reference_price: float
    discount_pct: float     # 0.0–1.0
    details: str
    other_sellers: list = field(default_factory=list)


def check_misprice(product: dict, config: dict) -> "Anomaly | None":
    """Flag if current price is below threshold_misprice_pct of the list price."""
    current = product["current_price"]
    list_price = product.get("list_price")
    if not list_price or list_price <= 0 or current <= 0:
        return None

    discount = 1.0 - (current / list_price)
    threshold = 1.0 - config["threshold_misprice_pct"]  # e.g. 1 - 0.30 = 0.70

    if discount > threshold:
        return Anomaly(
            asin=product["asin"],
            title=product["title"],
            url=product["url"],
            category=product.get("category", ""),
            anomaly_type="MISPRICE",
            current_price=current,
            reference_price=list_price,
            discount_pct=discount,
            details=(
                f"Current ${current:.2f} vs list ${list_price:.2f} "
                f"— {discount * 100:.1f}% off"
            ),
        )
    return None


def check_history_anomaly(product: dict, config: dict) -> "Anomaly | None":
    """Flag if current price is dramatically lower than the 'was' price shown on the card."""
    current = product["current_price"]
    was_price = product.get("list_price")
    if not was_price or was_price <= 0 or current <= 0:
        return None

    discount = 1.0 - (current / was_price)
    threshold = 1.0 - config["threshold_history_pct"]  # e.g. 1 - 0.40 = 0.60

    if discount > threshold:
        return Anomaly(
            asin=product["asin"],
            title=product["title"],
            url=product["url"],
            category=product.get("category", ""),
            anomaly_type="HISTORY_ANOMALY",
            current_price=current,
            reference_price=was_price,
            discount_pct=discount,
            details=(
                f"Currently ${current:.2f}, 'was' shown as ${was_price:.2f} "
                f"— {discount * 100:.1f}% off listed 'was' price"
            ),
        )
    return None


def check_seller_discrepancy(
    product: dict, other_sellers: list, config: dict
) -> "Anomaly | None":
    """Flag if the spread across seller prices exceeds threshold_seller_spread."""
    buybox_price = product.get("buybox_price") or product.get("current_price")
    all_prices = [buybox_price] + [s["price"] for s in other_sellers if s.get("price")]
    all_prices = [p for p in all_prices if p and p > 0]

    if len(all_prices) < 2:
        return None

    lo = min(all_prices)
    hi = max(all_prices)
    spread = (hi - lo) / lo

    if spread > config["threshold_seller_spread"]:
        return Anomaly(
            asin=product["asin"],
            title=product["title"],
            url=product["url"],
            category=product.get("category", ""),
            anomaly_type="SELLER_DISCREPANCY",
            current_price=lo,
            reference_price=hi,
            discount_pct=spread,
            details=(
                f"Prices range from ${lo:.2f} to ${hi:.2f} across "
                f"{len(all_prices)} sellers ({spread * 100:.1f}% spread)"
            ),
            other_sellers=other_sellers,
        )
    return None


def analyze_products(
    products: list[dict],
    category: str,
    config: dict,
    fetch_detail_fn: Callable,
) -> list[Anomaly]:
    """
    Run all anomaly checks on a list of products.
    fetch_detail_fn(asin, config, session) is called for products with multiple sellers.
    """
    import requests

    anomalies: list[Anomaly] = []
    session = requests.Session()

    for product in products:
        product = {**product, "category": category}
        title_short = product["title"][:60]
        print(f"  Checking: {title_short}...", end="\r", flush=True)

        # MISPRICE takes precedence over HISTORY_ANOMALY
        anomaly = check_misprice(product, config)
        if anomaly is None:
            anomaly = check_history_anomaly(product, config)

        if anomaly:
            anomalies.append(anomaly)

        # Cross-seller discrepancy check (requires extra HTTP call)
        if product.get("seller_count", 1) > 1:
            detail = fetch_detail_fn(product["asin"], config, session)
            if detail.get("other_sellers"):
                seller_anomaly = check_seller_discrepancy(
                    {**product, "buybox_price": detail.get("buybox_price")},
                    detail["other_sellers"],
                    config,
                )
                if seller_anomaly:
                    anomalies.append(seller_anomaly)

    # Clear the in-place status line
    print(" " * 80, end="\r")
    return anomalies
