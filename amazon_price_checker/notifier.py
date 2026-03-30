import os
from datetime import datetime

from fpdf import FPDF

ANOMALY_COLORS = {
    "MISPRICE":           (200, 50,  50),   # red
    "HISTORY_ANOMALY":    (210, 120, 20),   # orange
    "SELLER_DISCREPANCY": (50,  100, 180),  # blue
}


class PricingReport(FPDF):
    def __init__(self, categories: list[str], *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.categories = categories
        self.report_date = datetime.now().strftime("%Y-%m-%d %H:%M")
        self.set_auto_page_break(auto=True, margin=15)

    def header(self):
        self.set_font("Helvetica", "B", 14)
        self.set_fill_color(30, 30, 30)
        self.set_text_color(255, 255, 255)
        self.cell(0, 10, "Amazon Pricing Error Report", align="C", fill=True, new_x="LMARGIN", new_y="NEXT")
        self.set_font("Helvetica", "", 9)
        self.set_text_color(100, 100, 100)
        self.cell(0, 6, f"Generated: {self.report_date}  |  Categories: {', '.join(self.categories)}", align="C", new_x="LMARGIN", new_y="NEXT")
        self.ln(3)

    def footer(self):
        self.set_y(-12)
        self.set_font("Helvetica", "I", 8)
        self.set_text_color(150, 150, 150)
        self.cell(0, 10, f"Page {self.page_no()}", align="C")


def _badge(pdf: FPDF, anomaly_type: str) -> None:
    """Draw a coloured badge label for the anomaly type."""
    r, g, b = ANOMALY_COLORS.get(anomaly_type, (80, 80, 80))
    label = anomaly_type.replace("_", " ")
    pdf.set_font("Helvetica", "B", 8)
    pdf.set_fill_color(r, g, b)
    pdf.set_text_color(255, 255, 255)
    pdf.cell(45, 6, f"  {label}", fill=True, new_x="END", new_y="LAST")
    pdf.set_text_color(0, 0, 0)
    pdf.set_fill_color(255, 255, 255)
    pdf.ln(8)


def _row(pdf: FPDF, label: str, value: str, url: str | None = None) -> None:
    """Render a label + value row, optionally with a clickable link."""
    pdf.set_font("Helvetica", "B", 9)
    pdf.set_text_color(80, 80, 80)
    pdf.cell(32, 6, label, new_x="END", new_y="LAST")
    pdf.set_font("Helvetica", "", 9)
    if url:
        pdf.set_text_color(0, 80, 180)
        pdf.cell(0, 6, value, link=url, new_x="LMARGIN", new_y="NEXT")
    else:
        pdf.set_text_color(20, 20, 20)
        pdf.multi_cell(0, 6, value, new_x="LMARGIN", new_y="NEXT")
    pdf.set_text_color(0, 0, 0)


def generate_pdf(anomalies: list, categories: list[str], output_dir: str = ".") -> str:
    """
    Generate a PDF report of all anomalies with clickable Amazon links.
    Returns the path to the saved PDF file.
    """
    pdf = PricingReport(categories=categories, orientation="P", unit="mm", format="A4")
    pdf.add_page()

    # Summary box
    pdf.set_font("Helvetica", "", 10)
    pdf.set_fill_color(245, 245, 245)
    pdf.set_draw_color(200, 200, 200)
    pdf.rect(10, pdf.get_y(), 190, 12, style="FD")
    pdf.set_xy(14, pdf.get_y() + 2)
    pdf.set_text_color(40, 40, 40)
    pdf.cell(0, 8, f"Total anomalies found: {len(anomalies)}  across {len(categories)} categor{'y' if len(categories) == 1 else 'ies'}")
    pdf.ln(16)

    if not anomalies:
        pdf.set_font("Helvetica", "I", 11)
        pdf.set_text_color(100, 100, 100)
        pdf.cell(0, 10, "No pricing anomalies were detected in this scan.", align="C")
    else:
        current_category = None
        for i, anomaly in enumerate(anomalies):
            # Category section header
            if anomaly.category != current_category:
                current_category = anomaly.category
                pdf.set_font("Helvetica", "B", 11)
                pdf.set_text_color(30, 30, 30)
                pdf.set_fill_color(220, 230, 245)
                pdf.cell(0, 8, f"  {current_category}", fill=True, new_x="LMARGIN", new_y="NEXT")
                pdf.ln(3)

            # Anomaly card
            card_y = pdf.get_y()
            pdf.set_fill_color(252, 252, 252)
            pdf.set_draw_color(220, 220, 220)
            pdf.rect(10, card_y, 190, 38, style="FD")
            pdf.set_xy(14, card_y + 3)

            _badge(pdf, anomaly.anomaly_type)

            _row(pdf, "Title:", anomaly.title)

            discount_str = f"{anomaly.discount_pct * 100:.1f}% {'spread' if anomaly.anomaly_type == 'SELLER_DISCREPANCY' else 'off'}"
            price_str = f"${anomaly.current_price:.2f}  (ref ${anomaly.reference_price:.2f} — {discount_str})"
            _row(pdf, "Price:", price_str)

            _row(pdf, "Details:", anomaly.details)

            _row(pdf, "Link:", anomaly.url, url=anomaly.url)

            pdf.ln(5)

    # Save
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"amazon_pricing_report_{timestamp}.pdf"
    filepath = os.path.join(output_dir, filename)
    pdf.output(filepath)
    return filepath
