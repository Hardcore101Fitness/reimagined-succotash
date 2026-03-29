import os
from dotenv import load_dotenv


def load_config() -> dict:
    """
    Load .env file and return a validated config dict.
    Raises EnvironmentError if any required Twilio variable is missing.
    """
    load_dotenv()

    required = [
        "TWILIO_ACCOUNT_SID",
        "TWILIO_AUTH_TOKEN",
        "TWILIO_FROM_NUMBER",
        "TWILIO_TO_NUMBER",
    ]
    missing = [k for k in required if not os.getenv(k)]
    if missing:
        raise EnvironmentError(
            f"Missing required environment variables: {', '.join(missing)}\n"
            "Copy .env.example to .env and fill in your Twilio credentials."
        )

    return {
        "twilio_account_sid": os.getenv("TWILIO_ACCOUNT_SID"),
        "twilio_auth_token": os.getenv("TWILIO_AUTH_TOKEN"),
        "twilio_from_number": os.getenv("TWILIO_FROM_NUMBER"),
        "twilio_to_number": os.getenv("TWILIO_TO_NUMBER"),
        "threshold_misprice_pct": float(os.getenv("THRESHOLD_MISPRICE_PCT", "0.30")),
        "threshold_history_pct": float(os.getenv("THRESHOLD_HISTORY_PCT", "0.40")),
        "threshold_seller_spread": float(os.getenv("THRESHOLD_SELLER_SPREAD", "0.50")),
        "request_delay_min": float(os.getenv("REQUEST_DELAY_MIN", "2")),
        "request_delay_max": float(os.getenv("REQUEST_DELAY_MAX", "5")),
    }
