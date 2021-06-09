const express = require("express");
const MovieModel = require("../models/movie");
const populateDatabase = require("../services/populateMovieDatabase");
const router = express.Router();

router.get("/", function (req, res) {
  MovieModel.find({}).then(function (movies) {
    res.json({ movies: movies });
  });
});

router.get("/show/:movieId", function (req, res) {
  MovieModel.findOne({ id: req.params.movieId }).then(function (movie) {
    res.json({ movie: movie });
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
  console.log(req.query.test);
  populateDatabase(req.body.pages);
  res.json({ message: "DONE" });
});

router.post("/new", function (req, res) {
  const newMovie = new MovieModel({
    id: req.body.id,
    originalTitle: req.body.original_title,
    releaseDate: req.body.release_date,
    posterPath: req.body.poster_path,
    backdropPath: req.body.backdrop_path,
    genreIds: req.body.genre_ids,
    originalLanguage: req.body.original_language,
    overview: req.body.overview,
    popularity: req.body.popularity,
    title: req.body.title,
    video: req.body.video,
    voteAverage: req.body.vote_average,
    voteCount: req.body.vote_count,
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
