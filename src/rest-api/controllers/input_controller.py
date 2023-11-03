from flask_app import app
from flask import request
import uuid
import pathlib 
import os

from services.xlsx_service import xlsx_to_json

@app.route('/input', methods = ['POST'])
def upload_file():
    xlsx_file = request.files['file']
    # dpi = request.form['dpi']
    # silicon_name = request.form['silicon_name']

    # guid = uuid.uuid4()
    # dxf_dir = f'/usr/share/bga2dxf/{guid}'
    # pathlib.Path(dxf_dir).mkdir(parents=True, exist_ok=True)
    # dxf_path = f'{dxf_dir}/{silicon_name}.dxf'

    return xlsx_to_json(xlsx_file)
