from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_socketio import SocketIO, emit

from geoenv import *

import geopy

from seonapi import checkEmail

# print(getAddress(Point(47.499547506475835, 19.05877926994122)))
print(checkEmail("temporary@email.lol"))

def create_app():
    app = Flask(__name__)
    CORS(app)
    return app

app = create_app()
socketio = SocketIO(app)

@app.route('/purchase', methods=['POST'])
def purchase():
    data = request.get_json()

    socketio.emit('purchase', data)
    return jsonify(data)

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')

# serve static files
@app.route('/<path:path>')
def send_js(path):
    return send_from_directory('static', path)


if __name__ == '__main__':
    socketio.run(app, debug=True, host='0.0.0.0', port=5000)

