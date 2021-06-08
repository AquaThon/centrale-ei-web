const express = require("express");
const MovieModel = require("../models/movie");
const router = express.Router();

router.get("/", function (req, res) {
  console.log("succes!");
  res.send([]);
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
          message: `User with id "${newMovie.id}" already exists`,
        });
      } else {
        res.status(500).json({ message: "Error while creating the movie" });
      }
    });
});

module.exports = router;
