import os
from flask import Flask, request, render_template,jsonify
import requests
from pypdf import PdfReader
import json
from resumeparser import ats_extractor

# Set up the Flask app
UPLOAD_PATH = r"__DATA__"
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/process", methods=["POST"])
def ats():
    try:
        # Get the Firebase PDF link from the request
        request_data = request.json
        pdf_url = request_data.get("pdf_url")

        if not pdf_url:
            return jsonify({"error": "PDF URL is required"}), 400

        # Download the PDF from the provided URL
        response = requests.get(pdf_url)
        if response.status_code != 200:
            return jsonify({"error": "Failed to download PDF from URL"}), 500

        # Save the PDF to a temporary file
        pdf_path = os.path.join(UPLOAD_PATH, "file.pdf")
        with open(pdf_path, "wb") as pdf_file:
            pdf_file.write(response.content)

        # Read the content from the saved PDF file
        data = _read_file_from_path(pdf_path)

        # Extract ATS data using the ats_extractor function
        extracted_data = ats_extractor(data)

        # Return the extracted data
        return jsonify({"extracted_data": extracted_data}), 200

    except Exception as e:
        print("Error processing ATS:", str(e))
        return jsonify({"error": "An error occurred while processing the PDF"}), 500

def _read_file_from_path(path):
    reader = PdfReader(path)
    data = ""

    # Extract text from each page of the PDF
    for page_no in range(len(reader.pages)):
        page = reader.pages[page_no]
        data += page.extract_text()

    return data

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8082, debug=True)
