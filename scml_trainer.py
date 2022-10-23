import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
import pickle
import os

def save_model(model, filename='model.pkl'):
    # check if file already exists
    if os.path.isfile(filename):
        # change the name of the file
        filename = filename.split('.')[0] + '_new.pkl'
        save_model(model, filename)
        return
    # save the model
    pickle.dump(model, open(filename, 'wb'))

def add_training_data(data, filename='training_data.csv'):
    # check if file already exists
    if os.path.isfile(filename):
        # append to the file
        df = pd.read_csv(filename)
        df = df.append(data, ignore_index=True)
        df.to_csv(filename, index=False)
        return
    # create a new file
    data.to_csv(filename, index=False)


def train_model(filename='training_data.csv'):
    print('Training model...')
    # load the training data
    df = pd.read_csv(filename)
    # filter out duplicate rows
    df = df.drop_duplicates()
    # split the data into features and labels
    X = df.drop(['score'], axis=1)
    y = df['score']
    # # split the data into training and testing sets
    # X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
    # create the model
    model = DecisionTreeClassifier()
    # train the model
    model.fit(X, y)
    print('Model ready.')
    # save the model
    save_model(model)
    return model