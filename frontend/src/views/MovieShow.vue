<template>
  <p class="movieshow-title">{{ this.movieOriginalTitle }}</p>
  <div class="movieshow-container">
    <div class="movieshow-img" >
      <img class="movieshow-inner-image" :alt="this.moviePosterPath" :src="this.moviePosterPath" />
    </div>
    <div class="movieshow-description">
      {{ this.movieDescription }}
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
const posterPlaceHolderPath = require('@/assets/posterPlaceHolder.png')

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
      // axios
      //   .get(
      //     `${process.env.VUE_APP_BACKEND_BASE_URL}/movies/show/${this.movieId}`
      //   )
      //   .then((response) => {
      //     this.movieOriginalTitle = response.data.movieOriginalTitle;
      //     this.moviePosterPath = response.data.moviePosterPath;
      //     this.movieDescription = response.data.movieDescription;
      //   })
      //   .catch((error) => {
      //     this.usersLoadingError = "An error occured while fetching movie details.";
      //     console.error(error);
      //   });
      this.movieOriginalTitle = "Voici le titre";
      this.moviePosterPath = posterPlaceHolderPath;
      this.movieDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.";

    },
  },
  created: function () {
    this.fetchData();
  },
};
</script>

<style>
.movieshow-title {
  padding: 10px 10px 10px 10px;
  margin: 10px;
  text-align: center;
  font-family: "TeX Gyre Adventor";
  font-size: xx-large;
}
.movieshow-container {
  display: flex;
  justify-content: stretch;
  width: 100%;
}
.movieshow-img {
  width: 40%;
  height: 100%;
  display: block;
}
.movieshow-img .movieshow-inner-image {
  width: 100%;
}
.movieshow-description {
  width: 60%;
  padding: 10px 10px 10px 10px;
  display: block;
  align-content: center;
}
</style>
