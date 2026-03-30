import os
from dotenv import load_dotenv


def load_config() -> dict:
    """Load .env file and return a validated config dict."""
    load_dotenv()

    return {
        "threshold_misprice_pct": float(os.getenv("THRESHOLD_MISPRICE_PCT", "0.30")),
        "threshold_history_pct": float(os.getenv("THRESHOLD_HISTORY_PCT", "0.40")),
        "threshold_seller_spread": float(os.getenv("THRESHOLD_SELLER_SPREAD", "0.50")),
        "request_delay_min": float(os.getenv("REQUEST_DELAY_MIN", "2")),
        "request_delay_max": float(os.getenv("REQUEST_DELAY_MAX", "5")),
        "pdf_output_dir": os.getenv("PDF_OUTPUT_DIR", "."),
    }
