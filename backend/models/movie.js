const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  originalTitle: { type: String, required: true },
  adult: { type: Boolean },
  releaseDate: { type: String },
  posterPath: { type: String },
  backdropPath: { type: String },
  genreIds: { type: Array },
  originalLanguage: { type: String },
  overview: { type: String },
  popularity: { type: Number },
  title: { type: String },
  video: { type: Boolean },
  voteAverage: { type: Number },
  voteCount: { type: Number },
});

const MovieModel = mongoose.model("MovieModel", MovieSchema, "movies");

module.exports = MovieModel;
