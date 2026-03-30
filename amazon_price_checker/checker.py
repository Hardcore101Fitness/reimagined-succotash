#!/usr/bin/env python3
"""
Amazon Pricing Error Checker
Scrapes Amazon category pages, flags pricing anomalies, and saves a PDF report.

Usage:
    python checker.py

Setup:
    1. pip install -r requirements.txt
    2. (optional) cp .env.example .env to customise thresholds
"""

from datetime import datetime

from analyzer import analyze_products
from config import load_config
from notifier import generate_pdf
from scraper import CATEGORIES, fetch_product_detail, scrape_category

MENU_CATEGORIES = list(CATEGORIES.keys())

ANOMALY_TYPE_LABELS = {
    "MISPRICE": "MISPRICE       ",
    "HISTORY_ANOMALY": "HISTORY ANOMALY",
    "SELLER_DISCREPANCY": "SELLER DISCREP.",
}


def print_banner() -> None:
    print()
    print("=" * 60)
    print("  Amazon Pricing Error Checker")
    print("=" * 60)
    print()


def print_menu() -> None:
    print("Select categories to scan (comma-separated numbers, or 'all'):")
    print()
    for i, name in enumerate(MENU_CATEGORIES, start=1):
        print(f"  {i:2}. {name}")
    print()


def get_user_selection() -> list[str]:
    """Prompt the user to select categories. Returns a list of category name strings."""
    print_menu()
    while True:
        raw = input("Your selection: ").strip()
        if not raw:
            print("  Please enter at least one number or 'all'.\n")
            continue

        if raw.lower() == "all" or raw == "0":
            print()
            return list(MENU_CATEGORIES)

        parts = [p.strip() for p in raw.split(",")]
        selected = []
        valid = True
        for part in parts:
            if not part.isdigit():
                print(f"  '{part}' is not a valid number. Try again.\n")
                valid = False
                break
            idx = int(part)
            if idx < 1 or idx > len(MENU_CATEGORIES):
                print(f"  {idx} is out of range (1–{len(MENU_CATEGORIES)}). Try again.\n")
                valid = False
                break
            name = MENU_CATEGORIES[idx - 1]
            if name not in selected:
                selected.append(name)

        if valid and selected:
            print()
            return selected


def print_anomaly(anomaly) -> None:
    label = ANOMALY_TYPE_LABELS.get(anomaly.anomaly_type, anomaly.anomaly_type)
    discount_str = f"{anomaly.discount_pct * 100:.1f}%"
    if anomaly.anomaly_type == "SELLER_DISCREPANCY":
        discount_str += " spread"
    else:
        discount_str += " off"

    print(f"  !! [{label}] {anomaly.category}")
    print(f"     Title:    {anomaly.title}")
    print(f"     ASIN:     {anomaly.asin}")
    print(f"     Price:    ${anomaly.current_price:.2f}  (ref ${anomaly.reference_price:.2f} — {discount_str})")
    print(f"     URL:      {anomaly.url}")
    print(f"     Details:  {anomaly.details}")
    if anomaly.anomaly_type == "SELLER_DISCREPANCY" and anomaly.other_sellers:
        prices = ", ".join(f"${s['price']:.2f}" for s in anomaly.other_sellers[:5])
        print(f"     Sellers:  {prices}")
    print()


def run() -> None:
    print_banner()

    try:
        config = load_config()
    except EnvironmentError as exc:
        print(f"[ERROR] {exc}")
        return

    selected_categories = get_user_selection()
    print(f"Checking categories: {', '.join(selected_categories)}")
    print()

    all_anomalies = []
    start_time = datetime.now()

    for category in selected_categories:
        print(f"--- {category} ---")
        products = scrape_category(category, config)
        if not products:
            print(f"  No products scraped for {category}.\n")
            continue

        anomalies = analyze_products(products, category, config, fetch_product_detail)

        if anomalies:
            print(f"  Found {len(anomalies)} anomaly/anomalies in {category}:\n")
            for anomaly in anomalies:
                print_anomaly(anomaly)
        else:
            print(f"  No pricing anomalies found in {category}.\n")

        all_anomalies.extend(anomalies)

    elapsed = (datetime.now() - start_time).seconds
    print("=" * 60)
    print(f"  Scan complete in {elapsed}s")
    print(f"  Total anomalies found: {len(all_anomalies)}")
    print(f"  Categories checked: {', '.join(selected_categories)}")
    print("=" * 60)
    print()

    if all_anomalies:
        print("Generating PDF report...")
        pdf_path = generate_pdf(all_anomalies, selected_categories, config["pdf_output_dir"])
        print(f"  Report saved: {pdf_path}")
    else:
        print("No pricing errors detected. No PDF generated.")

    print()


if __name__ == "__main__":
    run()
