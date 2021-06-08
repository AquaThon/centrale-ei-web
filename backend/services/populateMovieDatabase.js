const MovieModel = require("../models/movie");
const axios = require("axios").default;

const populateMovieDatabase = function () {
  console.log("heyo");
  axios
    .get(
      `https://api.themoviedb.org/3/movie/popular?api_key=522d421671cf75c2cba341597d86403a&language=en-US&page=1`
    )
    .then((response) => {
      response.data.results.forEach((movie) => {
        const newMovie = new MovieModel({
          id: movie.id,
          original_title: movie.original_title,
          release_date: movie.release_date,
          poster_path: movie.poster_path,
        });
        newMovie.save().catch(function (error) {
          if (error.code !== 11000) {
            console.log(error);
          }
        });
      });
    });
};

module.exports = populateMovieDatabase;
