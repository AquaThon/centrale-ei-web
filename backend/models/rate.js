const mongoose = require("mongoose");

const RateSchema = new mongoose.Schema({
  userMoviePair: { type: Object, required: true, unique: true },
  userEmail: { type: String },
  movieId: { type: Number },
  rate: { type: Number },
});

const RateModel = mongoose.model("RateModel", RateSchema, "rates");

module.exports = RateModel;
