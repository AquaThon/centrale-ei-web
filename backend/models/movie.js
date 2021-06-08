const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  original_title: { type: String, required: true },
  release_date: { type: Number, required: true },
  poster_path: { type: String, required: true },
});

const MovieModel = mongoose.model("MovieModel", MovieSchema, "movies");

module.exports = MovieModel;
