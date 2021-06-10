const RateModel = require("../models/rate");
const MovieModel = require("../models/movie");

const purgeUser = function (user) {
  RateModel.find({ userEmail: user }).then((response) => {
    console.log(response);
    response.forEach((rating) => {
      console.log(rating.movieId);
      MovieModel.findOne({ id: rating.movieId }).then((movie) => {
        MovieModel.findOneAndUpdate(
          { id: rating.movieId },
          {
            $set: {
              voteCount: movie.voteCount - 1,
              voteAverage:
                (movie.voteAverage * movie.voteCount - rating.rate) /
                (movie.voteCount - 1),
            },
          },
          { useFindAndModify: false },
          function (err) {
            if (err) console.log(err);
            else console.log("Successfully deleted rating");
          }
        );
      });
    });
  });
  RateModel.deleteMany({ userEmail: user }, function (err, result) {
    if (err) {
      console.log(err);
    } else console.log(result);
  });
};

module.exports = purgeUser;
