const mongoose = require("mongoose");

const PredictionSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  movieId: { type: Number, required: true },
  ratePredict: { type: Number },
});

const PredictionModel = mongoose.model("PredictionModel", PredictionSchema, "prediction");

module.exports = PredictionModel;
