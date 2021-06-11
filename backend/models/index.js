const mongoose = require("mongoose");

const IndexSchema = new mongoose.Schema({
  word: { type: String, required: true, unique: true },
  df: { type: Number, required: true },
  movieIds: { type: Array, required: true },
});

const IndexModel = mongoose.model("IndexModel", IndexSchema, "index");

module.exports = IndexModel;
