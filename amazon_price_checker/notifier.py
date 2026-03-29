from datetime import date


def format_sms(anomalies: list, categories: list[str]) -> str:
    """Build a compact SMS string summarising all anomalies."""
    today = date.today().isoformat()
    header = (
        f"AMAZON PRICE ALERT - {today}\n"
        f"Categories: {', '.join(categories)}\n"
        f"Found {len(anomalies)} anomaly/anomalies:\n\n"
    )

    lines = []
    for a in anomalies[:5]:
        short_title = a.title[:40]
        line = (
            f"[{a.anomaly_type}] {short_title} - "
            f"${a.current_price:.2f} ({a.discount_pct * 100:.0f}% off) "
            f"{a.url}"
        )
        lines.append(line)

    body = "\n".join(lines)

    if len(anomalies) > 5:
        body += f"\n+{len(anomalies) - 5} more — run checker for full list."

    full = header + body
    # Truncate hard at 1500 chars to stay within Twilio limits
    if len(full) > 1500:
        full = full[:1497] + "..."

    return full


def send_sms(anomalies: list, categories: list[str], config: dict) -> bool:
    """Send an SMS alert via Twilio. Returns True on success."""
    try:
        from twilio.rest import Client
        from twilio.base.exceptions import TwilioRestException
    except ImportError:
        print("[ERROR] twilio package not installed. Run: pip install twilio")
        return False

    message_body = format_sms(anomalies, categories)

    try:
        client = Client(config["twilio_account_sid"], config["twilio_auth_token"])
        message = client.messages.create(
            body=message_body,
            from_=config["twilio_from_number"],
            to=config["twilio_to_number"],
        )
        print(f"  SMS sent: SID {message.sid}")
        return True
    except TwilioRestException as exc:
        print(f"  [ERROR] Failed to send SMS: {exc}")
        return False
