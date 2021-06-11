<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.jpg" class="logo" />
    <h1>Bienvenue sur le site du CineVR !</h1>
    <div>
      <input
        type="text"
        v-model="movieName"
        placeholder="Type a movie name here"
      />
      <button @click="search()">Search</button>
      <p>
        Chose between search and sort
      </p>
      <label for="sortby">Sort by :</label>
      <select name="sortby" v-model="sortKey">
        <option value="suggestions">suggestions</option>
        <option value="release">release date</option>
        <option value="title">title</option>
        <option value="popularity">popularity</option>
        <option value="topRated">top rated</option>
      </select>
      <label for="size">Number of movies</label>
      <select name="size" v-model="size">
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="200">200</option>
      </select>
      <button @click="sort()">Go !</button>
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
      sortKey: "suggestions",
      size: 20,
    };
  },
  created: function () {
    if (this.$root.currentUserEmail === null) {
      this.$router.push("/users");
    };
    console.log("Loading API");
    axios
      .get(`${process.env.VUE_APP_BACKEND_BASE_URL}/movies`, { params: { "sortBy": this.sortKey, "size": this.size } })
      .then(this.fetchMovies)
      .catch(this.apiCallFailure);
  },
  methods: {
    fetchMovies: function (response) {
      this.movies = response.data.movies;
      console.log("Fetched movies");
    },
    apiCallFailure: function (error) {
      console.log(error);
    },
    search: function () {
      axios
      .get(`${process.env.VUE_APP_BACKEND_BASE_URL}/movies/search`, { params: { "title": this.movieName } })
      .then((response) => {
        this.movies = response.data.movies;
        console.log("changed search")
      })
      .catch((error) => {
        console.log(error)
      })
    },
    sort: function () {
      axios.get(`${process.env.VUE_APP_BACKEND_BASE_URL}/movies/search`, { params: { "title": this.movieName } })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
