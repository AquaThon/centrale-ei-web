const MovieModel = require("../models/movie");
const axios = require("axios").default;

const populateMovieDatabase = function (pages) {
  for (let page = 1; page <= pages; page++) {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=522d421671cf75c2cba341597d86403a&language=en-US&page=` +
          page
      )
      .then((response) => {
        response.data.results.forEach((movie) => {
          const newMovie = new MovieModel({
            id: movie.id,
            originalTitle: movie.original_title,
            releaseDate: movie.release_date,
            posterPath:
              movie.poster_path !== null
                ? `https://image.tmdb.org/t/p/w500` + movie.poster_path
                : undefined,
            backdropPath:
              movie.backdrop_path !== null
                ? `https://image.tmdb.org/t/p/w500` + movie.backdrop_path
                : undefined,
            genreIds: movie.genre_ids,
            originalLanguage: movie.original_language,
            overview: movie.overview,
            popularity: movie.popularity,
            title: movie.title,
            video: movie.video,
            voteAverage: movie.vote_average,
            voteCount: movie.vote_count,
          });
          newMovie.save().catch(function (error) {
            if (error.code !== 11000) {
              console.log(error);
            }
          });
        });
      });
  }
};

module.exports = populateMovieDatabase;
