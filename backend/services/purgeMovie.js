const RateModel = require("../models/rate");

const purgeMovie = function (movie) {
  RateModel.deleteMany({ movieId: movie }, function (err, result) {
    if (err) {
      console.log(err);
    } else console.log(result);
  });
};

module.exports = purgeMovie;
