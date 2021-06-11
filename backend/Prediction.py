from pandas.core.base import DataError
import numpy as np
import pandas as pd
from sklearn import model_selection
from sklearn.metrics.pairwise import pairwise_distances
from pymongo import MongoClient
from bson import ObjectId


# Import BDD

client = MongoClient(
    'mongodb://group8:zPd4RnEU5X9YU8LS@cs2021.lmichelin.fr:27017/group8?ssl=true')
db = client.group8
rate = db.rates

rate = list(rate.find({}))

usermail = {}
movie_id = {}
i = 0
j = 0


for document in rate:
    if document["userEmail"] not in list(usermail.keys()):
        usermail[document["userEmail"]] = i
        i += 1
    if document["movieId"] not in list(movie_id.keys()):
        movie_id[document["movieId"]] = j
        j += 1


for document in rate:
    document["user_id"] = usermail[document["userEmail"]]
    document["movie_id"] = movie_id[document["movieId"]]
    document["rate"] = document["rate"]

data = pd.DataFrame.from_dict(rate)


# Data

# nb_users = data.userEmail.unique().shape[0]
# nb_items = data.movieId.unique().shape[0]
nb_users = len(usermail)
nb_items = len(movie_id)

# Prediction

train_data, test_data = model_selection.train_test_split(data, test_size=0.25)

movie_matrix = train_data.pivot_table(
    index='user_id', columns='movie_id', values='rate')


train_data_matrix = np.zeros((nb_users, nb_items))
train_data_dict = list(train_data.itertuples())
for line in train_data_dict:
    line = line._asdict()
    train_data_matrix[line["user_id"], line["movie_id"]] = line["rate"]


test_data_matrix = np.zeros((nb_users, nb_items))
test_data_dict = list(test_data.itertuples())
for line in test_data_dict:
    line = line._asdict()
    test_data_matrix[line["user_id"], line["movie_id"]] = line["rate"]

user_similarity = pairwise_distances(train_data_matrix, metric='cosine')


def predict(ratings, similarity):
    print(len(ratings[1]))
    mean_user_rating = ratings.mean(axis=1)
    # You use np.newaxis so that mean_user_rating has same format as ratings
    ratings_diff = (ratings - mean_user_rating[:, np.newaxis])
    pred = mean_user_rating[:, np.newaxis] + similarity.dot(
        ratings_diff) / np.array([np.abs(similarity).sum(axis=1)]).T
    return pred


user_prediction = predict(train_data_matrix, user_similarity)

# DataBase for prediction

prediction = db.prediction
post = {}
prediction = prediction.delete_many({})
prediction = db.prediction

# Adressing

id_usermail = {}
id_movie = {}

for document in rate:
    id_usermail[document["user_id"]] = document["userEmail"]
    id_movie[document["movie_id"]] = document["movieId"]


for i in range(np.shape(user_prediction)[0]):
    for j in range(np.shape(user_prediction)[1]):

        post = {"userEmail": id_usermail[i], "movieId": id_movie[j],
                "ratePredict": user_prediction[i][j]}
        post_id = prediction.insert_one(post).inserted_id
