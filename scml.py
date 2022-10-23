from sklearn.tree import DecisionTreeClassifier
import pickle

def load_model(filename='model.pkl'):
    # load the model
    model = pickle.load(open(filename, 'rb'))
    return model

def predict(model, data):
    # make a prediction
    prediction = model.predict(data)
    return prediction