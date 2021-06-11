<template>
  <div class="movieshow">
    <p class="movieshow-title">{{ this.movieOriginalTitle }}</p>
    <div class="movieshow-container">
      <div class="movieshow-img">
        <img
          class="movieshow-inner-image"
          :alt="
            moviePosterPath ? moviePosterPath : require(`@/assets/noImage.png`)
          "
          :src="
            moviePosterPath ? moviePosterPath : require(`@/assets/noImage.png`)
          "
        />
      </div>
      <div class="movieshow-block-description">
        <div class="movieshow-description-header">
          <p>Synopsis</p>
        </div>
        <div class="movieshow-description">
          <p>
            {{ this.movieDescription }}
          </p>
          <div class="movieshow-description-header">
            <p>Note</p>
          </div>
          <Stars v-if="movieId" :movieId="this.movieId" />
          <button class="movieshow-button" @click="redirectEdit()">
            Edit informations
          </button>
        </div>
      </div>
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
          this.usersLoadingError =
            "An error occured while fetching movie details.";
          console.error(error);
        });
    },
    redirectEdit: function () {
      this.$router.push(`/movies/edit/${this.movieId}`);
    },
  },
  created: function () {
    if (this.$root.currentUserEmail === null) {
      this.$router.push("/users");
    }
    this.fetchData();
  },
};
</script>

<style>
.movieshow {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 70%;
}
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
  margin-top: 15px;
  width: 50%;
  height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.movieshow-inner-image {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 35vw;
  height: 70vw;
  max-width: 400px;
  max-height: 600px;
}
.movieshow-description-header {
  font-size: 40px;
  font-family: cursive;
}

.movieshow-description {
  display: block;
  align-content: center;
  font-family: Arial, Helvetic, sans-serif;
}
.movieshow-block-description {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  margin-bottom: 70px;
  width: 60%;
  height: 700px;
}
.movieshow-button {
  margin-top: 30px;
}
</style>
