<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.jpg" class="logo" />
    <h1>Bienvenue sur le site du CineVR !</h1>
    <div class="movieshow-nav">
      <input
        type="text"
        v-model="movieName"
        placeholder="Type a movie name here"
      />
      <button class="movieshow-button" @click="search()">Search</button>
      <p>Chose between search and sort</p>
      <div class="movieshow-container">
        <label class="movieshow-row" for="sortby">Sort by :</label>
        <select class="movieshow-row" name="sortby" v-model="sortKey">
          <option value="suggestions">suggestions</option>
          <option value="release">release date</option>
          <option value="title">title</option>
          <option value="popularity">popularity</option>
          <option value="topRated">top rated</option>
        </select>
        <label class="movieshow-row" for="size">Number of movies :</label>
        <select class="movieshow-row" name="size" v-model="size">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="200">200</option>
        </select>
        <button class="movieshow-row movieshow-button-1" @click="sort()">
          Go !
        </button>
      </div>
    </div>
    <h3>Movies</h3>
    <div class="cards">
      <Movie
        v-for="movie in movies"
        :key="movie.id"
        :movieId="movie.id"
        :movieOriginalTitle="movie.originalTitle"
        :movieDescription="movie.overview"
        :moviePosterPath="movie.posterPath"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Movie from "@/components/Movie.vue";

export default {
  name: "Home",
  components: {
    Movie,
  },
  data: function () {
    return {
      apiKey: "522d421671cf75c2cba341597d86403a",
      placeHolderPosterPath: "@/assets/posterPlaceHolder.png",
      movieName: "",
      movies: [],
      sortBy: "suggestions",
      limit: 20,
    };
  },
  created: function () {
    if (this.$root.currentUserEmail === null) {
      this.$router.push("/users");
    };
    this.sort();
  },
  methods: {
    fetchMovies: function (body) {
      console.log("Loading API");
      axios
      .get(`${process.env.VUE_APP_BACKEND_BASE_URL}/movies`, body)
      .then((response) => {
        this.movies = response.data.movies;
        console.log(response);
        console.log("Fetched movies");
      })
      .catch(() => {
        console.log(error);
      });
    },
    search: function () {
      axios
        .get(`${process.env.VUE_APP_BACKEND_BASE_URL}/movies/search`, {
          params: { title: this.movieName },
        })
        .then((response) => {
          this.movies = response.data.movies;
          console.log("changed search");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    sort: function () {
      if (this.sortBy === "suggestions") {
        axios.get(`${process.env.VUE_APP_BACKEND_BASE_URL}/movies/recommend`, { params: { "email": this.$root.currentUserEmail, "limit": this.limit }})
        .then((response) => {
          this.movies = response.data.movies;
          console.log("Recommended movies loaded");
        })
        .catch((error) => {
          console.log(error);
        })
      } else {
        this.fetchMovies({ params: { "sortBy": this.sortBy, "limit": this.limit, "skip": 0 } });
      }
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.movieshow-nav {
  background-color: #d1d1d1;
  padding-top: 20px;
  padding-bottom: 20px;
  border-radius: 30px;
  box-shadow: 5px 7px 10px;
}
.home {
  text-align: center;
  color: #1d1d1d;
}

.logo {
  max-height: 150px;
  max-width: 200px;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.movieshow-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: auto;
  margin-right: auto;
  width: 600px;
  align-items: center;
}
.movieshow-button {
  width: 140px;
  height: 45px;
  font-family: "Roboto", sans-serif;
  font-size: 11px;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  font-weight: bold;
}
.movieshow-button:hover {
  background-color: #2ecae5;
  box-shadow: 0px 15px 20px rgba(46, 147, 229, 0.4);
  transform: translateY(-7px);
}
.movieshow-button-1 {
  width: 140px;
  height: 45px;
  font-family: "Roboto", sans-serif;
  font-size: 11px;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  font-weight: bold;
}
.movieshow-button-1:hover {
  background-color: #2ecae5;
  box-shadow: 0px 15px 20px rgba(46, 147, 229, 0.4);
  color: white;
  font-weight: bold;
}
</style>
