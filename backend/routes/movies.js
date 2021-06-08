const express = require("express");
const MovieModel = require("../models/movie");
const populateDatabase = require("../services/populateMovieDatabase");
const router = express.Router();

router.get("/", function (req, res) {
  MovieModel.find({}).then(function (movies) {
    res.json({ movies: movies });
  });
});

router.delete("/delete", function (req, res) {
  MovieModel.deleteOne({ id: req.body.id }, function (err) {
    if (err) res.status(500).json({ message: err });
    else
      res.status(201).json({
        message: `Successfully deleted movie with id ${req.body.id} !`,
      });
  });
});

router.post("/populate", function (req, res) {
  populateDatabase();
  res.json({ message: "DONE" });
});

router.post("/new", function (req, res) {
  const newMovie = new MovieModel({
    id: req.body.id,
    original_title: req.body.original_title,
    release_date: req.body.release_date,
    poster_path: req.body.poster_path,
  });

  newMovie
    .save()
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      if (error.code === 11000) {
        res.status(400).json({
          message: `Movie with id ${newMovie.id} already exists`,
        });
      } else {
        res.status(500).json({ message: "Error while creating the movie" });
      }
    });
});

module.exports = router;
