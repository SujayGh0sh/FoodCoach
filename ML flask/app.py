import os
import sys
import flask
import numpy as np
from flask import Flask, render_template, request
from werkzeug.utils import secure_filename

from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model
from PIL import Image, ImageFile
import my_tf_mod
from io import BytesIO
import matplotlib.pyplot as plt
import base64


app = Flask(__name__)


@app.route('/')
def home():
    return ({"ads": "das"})
    # return render_template('home.html')


@app.route('/Prediction', methods=['GET', 'POST'])
def pred():
    if request.method == 'POST':
        file = request.files['file']
        print(file)
        org_img, img = my_tf_mod.preprocess(file)
        # file = "https://res.cloudinary.com/fidal123/image/upload/v1667977202/zy9birtqdchyxeq9hpjb.jpg"

        print(img.shape)

        fruit_dict = my_tf_mod.classify_fruit(img)
        rotten = my_tf_mod.check_rotten(img)

        img_x = BytesIO()
        plt.imshow(org_img/255.0)
        plt.savefig(img_x, format='png')
        plt.close()
        img_x.seek(0)
        plot_url = base64.b64encode(img_x.getvalue()).decode('utf8')
        # response = render_template(
        #     'Pred3.html', fruit_dict=fruit_dict, rotten=rotten, plot_url=plot_url)
        response = flask.jsonify(
            {"fruit_dict": fruit_dict, "rotten": rotten, "plot_url": plot_url})
        response.headers.add('Access-Control-Allow-Origin', '*')

    return response
    # return ({fruit_dict: fruit_dict, rotten: rotten, plot_url: plot_url})


if __name__ == '__main__':
    app.run(debug=True)
