from flask_app import app
from flask import request

from services.xlsx_service import xlsx_to_json

@app.route('/input', methods = ['POST'])
def upload_file():
    xlsx_file = request.files['file']

    return xlsx_to_json(xlsx_file)
