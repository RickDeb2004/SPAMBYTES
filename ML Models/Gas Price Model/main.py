import sklearn
import flask

app = flask.Flask(__name__)

@app.route('/')
def index():
    return 'Hello World All men!'

if __name__ == '__main__':
    app.run(debug=True)

