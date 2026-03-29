import random
import re
import time

import requests
from bs4 import BeautifulSoup

CATEGORIES = {
    "Electronics":            ("aps", "172282"),
    "Computers":              ("computers", "541966"),
    "Home & Kitchen":         ("garden", "1055398"),
    "Sports & Outdoors":      ("sporting", "3375251"),
    "Clothing":               ("apparel", "7141123011"),
    "Books":                  ("stripbooks", "283155"),
    "Toys & Games":           ("toys-and-games", "165793011"),
    "Health & Personal Care": ("hpc", "3760901"),
}

USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_4) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Safari/605.1.15",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
]


def get_headers() -> dict:
    return {
        "User-Agent": random.choice(USER_AGENTS),
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-User": "?1",
        "Cache-Control": "max-age=0",
    }


def safe_select(soup: BeautifulSoup, selectors: list) -> str | None:
    """Try each CSS selector in order, return first non-empty text found."""
    for selector in selectors:
        el = soup.select_one(selector)
        if el and el.get_text(strip=True):
            return el.get_text(strip=True)
    return None


def parse_price(text: str | None) -> float | None:
    """Extract a float price from a string like '$1,234.56'."""
    if not text:
        return None
    cleaned = re.sub(r"[^\d.]", "", text.replace(",", ""))
    try:
        return float(cleaned) if cleaned else None
    except ValueError:
        return None


def category_url(category_name: str, page: int = 1) -> str:
    index, node = CATEGORIES[category_name]
    return f"https://www.amazon.com/s?i={index}&rh=n%3A{node}&page={page}"


def fetch_page(
    url: str, config: dict, session: requests.Session, extra_delay: float = 0.0
) -> BeautifulSoup | None:
    """Fetch a URL and return parsed BeautifulSoup, or None on failure."""
    delay = random.uniform(config["request_delay_min"], config["request_delay_max"]) + extra_delay
    time.sleep(delay)
    session.headers.update(get_headers())
    try:
        response = session.get(url, timeout=30)
    except requests.RequestException as exc:
        print(f"  [WARNING] Request failed for {url}: {exc}")
        return None

    if response.status_code != 200:
        print(f"  [WARNING] HTTP {response.status_code} for {url}")
        return None

    soup = BeautifulSoup(response.text, "lxml")

    if soup.find("form", {"action": "/errors/validateCaptcha"}):
        print("  [WARNING] CAPTCHA detected — skipping page. Try increasing REQUEST_DELAY_MIN.")
        return None

    return soup


def parse_product_cards(soup: BeautifulSoup) -> list[dict]:
    """Parse product cards from an Amazon search results page."""
    cards = soup.select('div[data-component-type="s-search-result"]')
    products = []

    for card in cards:
        asin = card.get("data-asin", "").strip()
        if not asin:
            continue

        title = safe_select(card, [
            "h2 span.a-text-normal",
            "h2.a-size-mini span.a-size-base-plus",
            "h2 span",
        ])
        if not title:
            continue

        current_price_text = safe_select(card, [
            '.a-price[data-a-size="xl"] .a-offscreen',
            '.a-price[data-a-size="b"] .a-offscreen',
            ".a-price .a-offscreen",
        ])
        current_price = parse_price(current_price_text)
        if current_price is None:
            continue

        # The struck-through "was" / list price — second .a-offscreen inside .a-text-price
        list_price = None
        list_price_el = card.select(".a-price.a-text-price .a-offscreen")
        if list_price_el:
            list_price = parse_price(list_price_el[0].get_text(strip=True))

        # Seller / offer count
        seller_count = 1
        offer_text = safe_select(card, [
            "span.a-size-base.s-light-color",
            "span.a-size-small.s-light-color",
        ])
        if offer_text:
            m = re.search(r"(\d+)", offer_text)
            if m:
                seller_count = int(m.group(1))

        products.append({
            "asin": asin,
            "title": title,
            "current_price": current_price,
            "list_price": list_price,
            "seller_count": seller_count,
            "url": f"https://www.amazon.com/dp/{asin}",
        })

    return products


def fetch_product_detail(asin: str, config: dict, session: requests.Session) -> dict:
    """Fetch a product detail page and extract buybox price, list price, and other sellers."""
    url = f"https://www.amazon.com/dp/{asin}"
    soup = fetch_page(url, config, session)
    if soup is None:
        return {"asin": asin, "buybox_price": None, "list_price": None, "other_sellers": []}

    buybox_price_text = safe_select(soup, [
        "#corePriceDisplay_desktop_feature_div .a-price .a-offscreen",
        "#priceblock_ourprice",
        "#priceblock_dealprice",
        ".a-price .a-offscreen",
    ])
    buybox_price = parse_price(buybox_price_text)

    list_price_text = safe_select(soup, [
        ".basisPrice .a-offscreen",
        "#listPrice",
        "#priceblock_saleprice",
        ".a-text-price .a-offscreen",
    ])
    list_price = parse_price(list_price_text)

    # Try to find other seller prices from the "other sellers" widget
    other_sellers = []
    seller_section = soup.select_one(
        "#olpLinkWidget_feature_div, #dynamic-aod-ingress-box, .olp-text-box"
    )
    if seller_section:
        price_els = seller_section.select(".a-color-price, .a-price .a-offscreen")
        for el in price_els:
            price = parse_price(el.get_text(strip=True))
            if price:
                other_sellers.append({"seller_name": "Other", "price": price})

    return {
        "asin": asin,
        "buybox_price": buybox_price,
        "list_price": list_price,
        "other_sellers": other_sellers,
    }


def scrape_category(category_name: str, config: dict, max_pages: int = 2) -> list[dict]:
    """Scrape product listings from an Amazon category, returning a deduplicated list."""
    session = requests.Session()
    seen_asins: set[str] = set()
    all_products: list[dict] = []

    for page in range(1, max_pages + 1):
        print(f"  Scraping {category_name} page {page}...")
        url = category_url(category_name, page)
        soup = fetch_page(url, config, session)
        if soup is None:
            break

        cards = parse_product_cards(soup)
        if not cards:
            print(f"  No products found on page {page}, stopping.")
            break

        for product in cards:
            if product["asin"] not in seen_asins:
                seen_asins.add(product["asin"])
                all_products.append(product)

    print(f"  Found {len(all_products)} unique products in {category_name}.")
    return all_products
