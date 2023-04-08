import sklearn
import flask
import pickle
import os
import numpy as np

app = flask.Flask(__name__)

@app.route('/')
def index():
    return 'Hello World All men!'

with open(os.path.dirname(__file__) + "/Gas Price Modelmodel.pkl" , 'rb') as f:
    model = pickle.load(f)

@app.route('/<int:id>/<int:pid>/pi')
def pdf_template(id, pid):
    prediction = model.predict(np.array([[id, pid]]))
    return str(prediction)

if __name__ == '__main__':
    app.run(host='0.0.0.0' , debug=True)
