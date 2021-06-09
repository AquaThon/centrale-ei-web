<template>
  <div class="container">
    <img :alt=this.moviePosterPath :src=this.moviePosterPath />
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
  name: "MovieShow",
  data: function () {
    return {
      movieId: this.$route.params.movieId,
      movieOriginalTitle: "",
      moviePosterPath: "",
      movieDescription: "",
    };
  },
  methods: {
    fetchData: function () {
      axios
        .get(`${process.env.VUE_APP_BACKEND_BASE_URL}/movies/details/${this.movieId}`)
        .then((response) => {
          this.movieOriginalTitle = response.data.movieOriginalTitle;
          this.moviePosterPath = response.data.moviePosterPath;
          this.movieDescription = response.data.movieDescription;
        })
        .catch((error) => {
          this.usersLoadingError = "An error occured while fetching movie details.";
          console.error(error);
        });
    },
  },
  created: function () {
    this.fetchData();
  }
};
</script>

<style>
</style>