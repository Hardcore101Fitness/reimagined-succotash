from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/submit-trial", methods=["POST"])
def submit_trial():
    data = request.get_json()
    first_name = data.get("first_name", "").strip()
    phone = data.get("phone", "").strip()
    email = data.get("email", "").strip()

    if not first_name or not phone or not email:
        return jsonify({"success": False, "message": "All fields are required."}), 400

    # TODO: integrate with CRM / email service (e.g. GoHighLevel, Mailchimp, etc.)
    print(f"New trial lead: {first_name} | {phone} | {email}")

    return jsonify({"success": True, "message": "Thanks! We'll be in touch shortly."})


if __name__ == "__main__":
    app.run(debug=True)
