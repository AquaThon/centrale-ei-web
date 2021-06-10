<template>
  <p class="movieshow-title">{{ this.movieOriginalTitle }}</p>
  <div class="movieshow-container">
    <div class="movieshow-img" >
      <img class="movieshow-inner-image" :alt="moviePosterPath ? moviePosterPath : require(`@/assets/noImage.png`)" :src="moviePosterPath ? moviePosterPath : require(`@/assets/noImage.png`)" />
    </div>
    <div class="movieshow-description">
      <p>
        {{ this.movieDescription }}
      </p>
      <Stars :rate="3" />
      <button @click="redirectEdit()">Edit informations</button>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import Stars from "@/components/Stars.vue";

export default {
  name: "MovieShow",
  components: {
    Stars,
  },
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
        .get(
          `${process.env.VUE_APP_BACKEND_BASE_URL}/movies/show/${this.movieId}`
        )
        .then((response) => {
          console.log(response);
          this.movieOriginalTitle = response.data.movie.originalTitle;
          this.moviePosterPath = response.data.movie.posterPath;
          this.movieDescription = response.data.movie.overview;
        })
        .catch((error) => {
          this.usersLoadingError = "An error occured while fetching movie details.";
          console.error(error);
        });
    },
    redirectEdit: function () {
      this.$router.push(`/movies/edit/${this.movieId}`);
    }
  },
  created: function () {
    if (this.$root.currentUserEmail === null) {
      this.$router.push("/users");
    };
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
