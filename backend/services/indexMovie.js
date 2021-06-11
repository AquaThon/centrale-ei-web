// const IndexModel = require("../models/index");
const MovieModel = require("../models/movie");

let invertedIndex = {};

const emptyWords = ["the", "a", "an", "at", "of", "and"];
const titleCoef = 5;
const descCoef = 1;

const normalize = function (text) {
  let res = [];
  let words = text.match(/\b(\w+)\b/g);
  if (!words) {
    return null;
  }
  words.forEach((Word) => {
    let word = Word.toLowerCase();
    if (!emptyWords.includes(word)) {
      res.push(word);
    }
  });
  return res;
};

const frequencies = function (normalizedTitle, normalizedDesc) {
  let res = {};
  if (normalizedTitle) {
    normalizedTitle.forEach((word) => {
      if (word in res) {
        res[word] = res[word] + titleCoef;
      } else res[word] = titleCoef;
    });
  }
  if (normalizedDesc) {
    normalizedDesc.forEach((word) => {
      if (word in res) {
        res[word] = res[word] + descCoef;
      } else res[word] = descCoef;
    });
  }
  return res;
};

const invertIndex = function (index, movieId) {
  // Add new words and edit ones that are still in this movie
  for (const word in index) {
    if (!(word in invertedIndex)) {
      invertedIndex[word] = {};
      invertedIndex[word].df = 1;
      invertedIndex[word].movieIds = {};
    } else {
      invertedIndex[word].df = invertedIndex[word].movieIds[movieId]
        ? invertedIndex[word].df
        : invertedIndex[word].df + 1;
    }

    invertedIndex[word].movieIds[movieId] = index[word];
  }
  // Remove words that were in this movie but not anymore
  for (const word in invertedIndex) {
    if (invertedIndex[word].movieIds[movieId]) {
      if (!(word in index)) {
        if (invertedIndex[word].df == 1) {
          delete invertedIndex[word];
        } else {
          invertedIndex[word].df -= 1;
          delete invertedIndex[word].movieIds[movieId];
        }
      }
    }
  }
};

const indexMovie = function (title, desc, movieId) {
  invertIndex(frequencies(normalize(title), normalize(desc)), movieId);
};

const intersectObjects = function (o1, o2) {
  if (o1.init == true) {
    return o2;
  }
  let res = {};
  for (const e in o1) {
    if (e in o2) res[e] = 0;
  }
  return res;
};

const sortBy2ndDsc = function (score) {
  var sortable = [];
  for (var movie in score) {
    sortable.push([movie, score[movie]]);
  }

  sortable.sort(function (a, b) {
    return b[1] - a[1];
  });

  return sortable;
};

const indexSearch = function (request, response) {
  MovieModel.countDocuments({})
    .then((N) => {
      let normalizedReq = normalize(request);
      var movies = { init: true };
      if (!normalizedReq) {
        MovieModel.find({}).then((movies) => response.json({ movies: movies }));
      } else {
        normalizedReq.forEach((word) => {
          if (invertedIndex[word]) {
            movies = intersectObjects(movies, invertedIndex[word].movieIds);
          }
        });

        for (const movie in movies) {
          if (movie != "init")
            normalizedReq.forEach((word) => {
              if (invertedIndex[word]) {
                movies[movie] +=
                  (1 + Math.log10(invertedIndex[word].movieIds[movie])) *
                  Math.log10(N / invertedIndex[word].df);
              }
            });
        }

        let sorted = sortBy2ndDsc(movies);

        if (typeof sorted[0][1] == "boolean") {
          sorted = [];
        }

        var results = [];
        sorted.forEach((movie) => {
          results.push(parseInt(movie[0]));
        });
        MovieModel.find({ id: { $in: results } })
          .then(function (movies) {
            response.json({ movies: movies });
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
};

module.exports = { indexMovie: indexMovie, indexSearch: indexSearch };
