#!/usr/bin/env python3
"""
Amazon Pricing Error Checker — Web UI
Run with: python web_app.py
Then open http://localhost:5000 in your browser.
"""

import io
import json
import queue
import threading
import uuid
from contextlib import redirect_stdout

from flask import Flask, Response, render_template, request

from analyzer import analyze_products
from config import load_config
from scraper import CATEGORIES, fetch_product_detail, scrape_category

app = Flask(__name__)

# In-memory store: scan_id -> list of anomaly dicts (for the report page)
_scan_results: dict[str, list] = {}


@app.route("/")
def index():
    return render_template("index.html", categories=list(CATEGORIES.keys()))


@app.route("/scan")
def scan():
    selected = request.args.getlist("c")
    if not selected:
        return render_template("index.html", categories=list(CATEGORIES.keys()),
                               error="Please select at least one category.")
    scan_id = str(uuid.uuid4())
    return render_template("scan.html", categories=selected, scan_id=scan_id)


@app.route("/stream")
def stream():
    """Server-Sent Events endpoint: runs the scan and emits live progress + anomalies."""
    selected = request.args.getlist("c")
    scan_id = request.args.get("sid", "")

    def generate():
        q: queue.Queue = queue.Queue()

        class QueueWriter(io.TextIOBase):
            def write(self, s: str) -> int:
                text = s.rstrip()
                if text:
                    q.put(("log", {"message": text}))
                return len(s)

            def flush(self):
                pass

        def run_scan():
            try:
                config = load_config()
                all_anomalies = []

                with redirect_stdout(QueueWriter()):
                    for category in selected:
                        products = scrape_category(category, config)
                        anomalies = analyze_products(
                            products, category, config, fetch_product_detail
                        )
                        for a in anomalies:
                            d = {
                                "asin": a.asin,
                                "title": a.title,
                                "url": a.url,
                                "category": a.category,
                                "anomaly_type": a.anomaly_type,
                                "current_price": a.current_price,
                                "reference_price": a.reference_price,
                                "discount_pct": a.discount_pct,
                                "details": a.details,
                            }
                            q.put(("anomaly", d))
                            all_anomalies.append(d)
                        all_anomalies.extend([])  # no-op, already appended above

                if scan_id:
                    _scan_results[scan_id] = all_anomalies

                q.put(("done", {"count": len(all_anomalies), "scan_id": scan_id}))

            except Exception as exc:
                q.put(("error", {"message": str(exc)}))
            finally:
                q.put(None)

        thread = threading.Thread(target=run_scan, daemon=True)
        thread.start()

        while True:
            item = q.get()
            if item is None:
                break
            event_type, data = item
            yield f"event: {event_type}\ndata: {json.dumps(data)}\n\n"

    return Response(
        generate(),
        mimetype="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


@app.route("/report/<scan_id>")
def report(scan_id: str):
    anomalies = _scan_results.get(scan_id, [])
    categories = list({a["category"] for a in anomalies})
    return render_template("report.html", anomalies=anomalies, categories=categories)


if __name__ == "__main__":
    app.run(debug=False, host="0.0.0.0", port=5000)
