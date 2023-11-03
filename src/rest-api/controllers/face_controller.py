from flask_app import app
from flask import request, Response
from ChernoffFace import *
import numpy as np
import matplotlib as mpl
from matplotlib import cm, pyplot
import io

@app.route('/face', methods = ['POST'])
def draw_face():
    input = request.get_json()

    face_size = 1
    forehead_shape = input['forehead_shape']
    left_iris = 0.5 # tęczówka
    right_iris = 0.5
    eyes_vertical_position = 0.5
    eye_size = 0.5
    eye_slant = input['eye_slant'] # skos oka
    left_eyebrow_raising = 0.5 # uniesienie brwi
    left_eyebrow_slant = input['eyebrow_slant'] # skos brwi
    left_eyebrow_trim = input['eyebrow_trim']
    right_eyebrow_raising = 0.5
    right_eyebrow_slant = input['eyebrow_slant']
    right_eyebrow_trim = input['eyebrow_trim']
    nose_length = 0.5
    mouth_smile = input['mouth_smile']
    mouth_twist = 0.5
    mouth_width = 0.5
    face_color = None
    iris_color = None
    nose_color = None
    mouth_color = None
    eye_ball_color = None
    make_symmetric = True

    data = np.array([[
        face_size,
        forehead_shape,
        eyes_vertical_position,
        eye_size,
        eye_slant,
        left_eyebrow_slant,
        left_iris,
        nose_length,
        mouth_smile,
        left_eyebrow_trim,
        left_eyebrow_raising,
        mouth_twist,
        mouth_width,
        right_eyebrow_trim,
        right_eyebrow_raising,
        right_eyebrow_slant,
        right_iris,
        # face_color,
        # iris_color,
        # nose_color,
        # mouth_color,
        # eye_ball_color,
        # make_symmetric, 

    ]])

    pyplot.switch_backend('Agg') 

    figure = mpl.figure.Figure(figsize=(2, 2), facecolor='None')

    # Make Chernoff faces
    fig = chernoff_face(data=data, 
                        # titles=[str(x) for x in list(range(len(data)))], 
                        color_mapper=cm.Pastel1,
                        figsize=(2, 2),
                        figure=figure
                        )

     # Render the Matplotlib plot to a BytesIO object
    output = io.BytesIO()
    fig.savefig(output, format='svg')
    output.seek(0)

    # Create a response with the plot data and content type
    response = Response(output.getvalue(), content_type='image/svg+xml')

    return response
