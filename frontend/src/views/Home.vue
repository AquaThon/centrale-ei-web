<template>
  <div class="home">
    <img src="../assets/movie.png" />
    <h1>! Films du jour !</h1>
    <input v-model="movieName" placeholder="Movie Name" />
    <p>Number of pages: {{ page }}</p>
    <p>Movie name is: {{ movieName }}</p>
    <h2 v-if="loading"> Please wait...</h2>
    <ul v-if="loading == false" id="array-rendering">
      <li v-for="(movie,index) in movies.filter(movie => movie.originalTitle.toLowerCase().includes(movieName.toLowerCase()))" :key="index">
        <Movie :movie="movie"/>
      </li>
    </ul>
    <button @click="morePages()"> Show More !</button>
  </div>
</template>

<script>

import Movie from "@/components/Movie.vue";
import axios from "axios";


export default {
  data: function () {
    return {
      movieName: "",
      movies: [],
      page: 1,
      loading: true
    }
  },
  name: "Home",
  created: function () {
    this.fetchMovies()
  },
  methods: {
    morePages: function () {
      this.page = this.page + 1;
      this.fetchMovies()
    },
    fetchMovies: function () {
      axios
        .get(`http://localhost:3000/movies/`)
        .then((response) => {
         console.log(response.data.movies);
         this.movies = response.data.movies;
         this.loading = false;
       })
       .catch((error) => {
         console.log(error)
      });
    },
  },
  components: {
    Movie,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  text-align: center;
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

#array-rendering {
  flex-wrap: wrap;
}
</style>
