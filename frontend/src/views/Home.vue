<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/movie.png" />
    <h1>! Films du jour !</h1>
    <input v-model="movieName" placeholder="Movie Name" />
    <p>Number of pages: {{ pages }}</p>
    <p>Movie name is: {{ movieName }}</p>
    <ul id="array-rendering">
      <li v-for="(movie,index) in movies" :key=index>
        <Movie v-if="movie.original_title.includes(movieName)" :movie="movie"/>
      </li>
    </ul>
    <button @click="morePages()"> Show More !</button>
  </div>
</template>

<script>

import Movie from "@/components/Movie.vue";
const axios = require('axios').default;


export default {
  data: function () {
    return {
      movieName: "",
      movies: [],
      page: 1
    }
  },
  name: "Home",
  created: function () {
    this.fetchMovies(1)
  },
  methods: {
    morePages: function () {
      this.page = this.page + 1;
      this.fetchMovies(this.page)
    },
    fetchMovies: function (page) {
      axios
        .get(`https://api.themoviedb.org/3/movie/popular?api_key=522d421671cf75c2cba341597d86403a&language=en-US&page=` + page)
        .then((response) => {
         console.log(response.data.results);
         this.movies = this.movies.concat(response.data.results);
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

}
</style>
