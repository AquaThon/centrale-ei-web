<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.jpg" class="logo" />
    <h1>Bienvenue sur le site du CineVR !</h1>
    <p>
      <input type="text" v-model="movieName" placeholder="Type a movie name here">
    </p>
    <h3>Movies</h3>
    <div class="cards">
      <Movie v-for="movie in movies"
        :key=movie.id
        :movieId=movie.id
        :movieOriginalTitle=movie.originalTitle
        :movieDescription=movie.overview
        :moviePosterPath=movie.posterPath
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
    Movie
  },
  data: function () {
    return {
      apiKey: "522d421671cf75c2cba341597d86403a",
      movieName: "",
      movies: []
    };
  },
  created: function () {
    console.log("Loading API")
    axios
    .get(`${process.env.VUE_APP_BACKEND_BASE_URL}/movies`)
    .then(this.fetchMovies)
    .catch(this.apiCallFailure)
  },
  methods: {
    fetchMovies: function (response) {
      this.movies = response.data.movies
      console.log("Fetched movies")
    },
    apiCallFailure: function (error) {
      console.log(error)
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
