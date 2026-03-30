#!/usr/bin/env python3
"""
Amazon Pricing Error Checker — Web UI
Run with: python web_app.py
Then open http://localhost:5000 in your browser.
"""

import io
import json
import os
import queue
import threading
from contextlib import redirect_stdout

from flask import Flask, Response, render_template, request, send_file

from analyzer import Anomaly, analyze_products
from config import load_config
from notifier import generate_pdf
from scraper import CATEGORIES, fetch_product_detail, scrape_category

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html", categories=list(CATEGORIES.keys()))


@app.route("/scan")
def scan():
    selected = request.args.getlist("c")
    if not selected:
        return render_template("index.html", categories=list(CATEGORIES.keys()),
                               error="Please select at least one category.")
    return render_template("scan.html", categories=selected)


@app.route("/stream")
def stream():
    """Server-Sent Events endpoint that runs the scan and emits live progress."""
    selected = request.args.getlist("c")

    def generate():
        q: queue.Queue = queue.Queue()

        class QueueWriter(io.TextIOBase):
            """Redirect print() output into the SSE queue."""
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
                all_anomalies: list[Anomaly] = []

                with redirect_stdout(QueueWriter()):
                    for category in selected:
                        products = scrape_category(category, config)
                        anomalies = analyze_products(
                            products, category, config, fetch_product_detail
                        )
                        for a in anomalies:
                            q.put(("anomaly", {
                                "asin": a.asin,
                                "title": a.title,
                                "url": a.url,
                                "category": a.category,
                                "anomaly_type": a.anomaly_type,
                                "current_price": a.current_price,
                                "reference_price": a.reference_price,
                                "discount_pct": a.discount_pct,
                                "details": a.details,
                            }))
                        all_anomalies.extend(anomalies)

                pdf_path = None
                if all_anomalies:
                    pdf_path = generate_pdf(
                        all_anomalies, selected, config["pdf_output_dir"]
                    )

                q.put(("done", {
                    "count": len(all_anomalies),
                    "pdf": pdf_path,
                }))

            except Exception as exc:
                q.put(("error", {"message": str(exc)}))
            finally:
                q.put(None)  # sentinel

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


@app.route("/download")
def download():
    path = request.args.get("path", "")
    if not path.endswith(".pdf") or ".." in path:
        return "Invalid path", 400
    if not os.path.isfile(path):
        return "File not found", 404
    return send_file(path, as_attachment=True, download_name=os.path.basename(path))


if __name__ == "__main__":
    app.run(debug=False, host="0.0.0.0", port=5000)
