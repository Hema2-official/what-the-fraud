from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_socketio import SocketIO, emit

from geoenv import *
from seonapi import *
from scml import *
from scml_trainer import *

user_history = [(540, 47.499547506475835, 19.05877926994122)]
user_attemps = []

def fill_in_attempt(history_ele, success):
    coords = history_ele[1:]
    address = getAddress(Point(coords[0], coords[1])).raw['address']
    attempt = (mins_to_time24(history_ele[0]), address['country'], int(success))
    user_attemps.append(attempt)
    socketio.emit('attempts', user_attemps)

print(getAddress(Point(47.499547506475835, 19.05877926994122)).raw['address'])
# print(checkPhone("36306885371"))

def create_app():
    app = Flask(__name__)
    CORS(app)
    return app

app = create_app()
socketio = SocketIO(app)

@app.route('/purchase', methods=['POST'])
def purchase():
    data = request.form
    print(data)
    df = pd.DataFrame(data, index=[0])
    # add origin time and lat/lon to the data
    df['timeOrigin'] = user_history[-1][0]    # last time
    df['timeLater'] = df['timeLater'].apply(time24_to_mins)
    df['lat0'] = user_history[-1][1]     # last lat
    df['lng0'] = user_history[-1][2]     # last lon
    # calculate delta time and add it to the dataframe
    df['deltaTime'] = df.apply(lambda row: mins_past_between(row['timeOrigin'], row['timeLater']), axis=1)
    # calculate distance and add it to the dataframe
    df['distance'] = df.apply(lambda row: getDistance(Point(row['lat0'], row['lng0']), Point(row['lat1'], row['lng1'])), axis=1)
    df = df.astype({'lat0': 'float64', 'lng0': 'float64', 'lat1': 'float64', 'lng1': 'float64', 'timeOrigin': 'int32', 'timeLater': 'int32', 'deltaTime': 'int32', 'distance': 'float64'})

    print(df)

    model = load_model()
    prediction = predict(model, df)[0]
    print('Prediction made: ' + str(prediction))
    if prediction == 0:
        user_history.append((int(df['timeLater'][0]), float(df['lat1'][0]), float(df['lng1'][0])))
    fill_in_attempt((int(df['timeLater'][0]), float(df['lat1'][0]), float(df['lng1'][0])), prediction)
    return ('status', 200 if prediction == 0 else 400)

def time24_to_mins(time):
    return int(time[:2]) * 60 + int(time[3:])

def mins_to_time24(mins):
    return str(mins // 60).zfill(2) + ':' + str(mins % 60).zfill(2)

def mins_past_between(t1, t2):
    return (t2 - t1) % (24 * 60)

@app.route('/train_data', methods=['POST'])
def train_data():
    data = request.form
    print(data)
    tr_data = pd.DataFrame(data, index=[0])
    # convert time to minutes
    tr_data['timeOrigin'] = tr_data['timeOrigin'].apply(time24_to_mins)
    tr_data['timeLater'] = tr_data['timeLater'].apply(time24_to_mins)
    # calculate delta time and add it to the dataframe
    tr_data['deltaTime'] = tr_data.apply(lambda row: mins_past_between(row['timeOrigin'], row['timeLater']), axis=1)
    # calculate distance and add it to the dataframe
    tr_data['distance'] = tr_data.apply(lambda row: getDistance(Point(row['lat0'], row['lng0']), Point(row['lat1'], row['lng1'])), axis=1)
    tr_data = tr_data.astype({'lat0': 'float64', 'lng0': 'float64', 'lat1': 'float64', 'lng1': 'float64', 'score': 'int16', 'timeOrigin': 'int32', 'timeLater': 'int32', 'deltaTime': 'int32', 'distance': 'float64'})

    print(tr_data)

    add_training_data(tr_data)

    return ('status', 200)

@app.route('/test_data', methods=['POST'])
def test_data():
    data = request.form
    print(data)
    df = pd.DataFrame(data, index=[0])
    # convert time to minutes
    df['timeOrigin'] = df['timeOrigin'].apply(time24_to_mins)
    df['timeLater'] = df['timeLater'].apply(time24_to_mins)
    # calculate delta time and add it to the dataframe
    df['deltaTime'] = df.apply(lambda row: mins_past_between(row['timeOrigin'], row['timeLater']), axis=1)
    # calculate distance and add it to the dataframe
    df['distance'] = df.apply(lambda row: getDistance(Point(row['lat0'], row['lng0']), Point(row['lat1'], row['lng1'])), axis=1)
    df = df.astype({'lat0': 'float64', 'lng0': 'float64', 'lat1': 'float64', 'lng1': 'float64', 'score': 'int16', 'timeOrigin': 'int32', 'timeLater': 'int32', 'deltaTime': 'int32', 'distance': 'float64'})

    print(df)
    X = df.drop(['score'], axis=1)
    y = df['score'][0]

    model = load_model()
    prediction = predict(model, X)[0]
    print('Prediction made: ' + str(prediction))
    print('Correct answer was: ' + str(y))

    return ('status', 200 if prediction == y else 400)

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')

@app.route('/trainer')
def trainer_app():
    return send_from_directory('static', 'trainer.html')

@app.route('/tester')
def tester_app():
    return send_from_directory('static', 'tester.html')

@app.route('/dashboard')
def dashboard_app():
    return send_from_directory('static', 'dashboard.html')

# serve static files
@app.route('/<path:path>')
def send_js(path):
    return send_from_directory('static', path)


# listen for socketio messages
@socketio.on('haloo')
def haloooo():
    print('haloooo')
    emit('history', {'data': 'Connected'})

# train_model()


if __name__ == '__main__':
    socketio.run(app, debug=True, host='0.0.0.0', port=5000)

