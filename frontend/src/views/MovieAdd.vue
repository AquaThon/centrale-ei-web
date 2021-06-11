<template>
  <div class="movieadd-container">
    <h1 class="movieadd-title">Fill this form to add a movie</h1>
    <h2 v-if="errorMessage !== ''">{{ this.errorMessage }}</h2>
    <div class="form">
      <p class="row">Movie name :</p>
      <input
        type="text"
        v-model="originalTitle"
        placeholder="John Cena : origins"
        class="row"
      />
      <p class="row">Release date :</p>
      <input class="row" type="text" v-model="releaseDate" placeholder="1326" />
      <p class="row">Url of an image :</p>
      <input
        class="row"
        type="url"
        v-model="posterPath"
        placeholder="https://s1.qwant.com/thumbr/0x380/a/0/03a879dc9055423a3f48828aac8c0493693c984c940941d3cabf5810afdb5b/fkrjojtgi4c31.jpg?u=https%3A%2F%2Fi.redd.it%2Ffkrjojtgi4c31.jpg&q=0&b=1&p=0&a=0"
      />
      <p class="row movieadd-text">Language :</p>
      <input
        class="row"
        type="text"
        v-model="originalLanguage"
        placeholder="en"
      />
      <p class="row">Description of the movie :</p>
      <textarea
        class="row movieadd-description"
        type="text"
        v-model="overview"
        placeholder="At an early age, Cena showed a passion for sports and working out. By the time he was 15, he was a regular gym rat and after graduating high school, Cena headed off to Springfield College in Massachusetts to study exercise physiology and prove his worth on the football field. At Springfield, Cena turned himself into a Division III All-American offensive lineman and team captain."
      />
      <div class="row movieadd-button-container">
        <button class="movieadd-button" @click="submit()">Submit</button>
        <button class="movieadd-button" @click="cancel()">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MovieAdd",
  data: function () {
    return {
      originalTitle: "",
      releaseDate: "",
      posterPath: "",
      backdropPath: "",
      originalLanguage: "",
      overview: "",
      popularity: "",
      title: "",
      video: false,
      voteAverage: undefined,
      voteCount: undefined,
      errorMessage: "",
    };
  },
  created: function () {
    if (this.$root.currentUserEmail === null) {
      this.$router.push("/users");
    }
  },
  methods: {
    submit: function () {
      console.log("");
      axios
        .post(`${process.env.VUE_APP_BACKEND_BASE_URL}/movies/add/`, {
          originalTitle: this.originalTitle,
          releaseDate: this.releaseDate,
          posterPath: this.posterPath,
          backdropPath: this.posterPath,
          originalLanguage: this.originalLanguage,
          overview: this.overview,
          video: this.video,
        })
        .then((res) => {
          if (res.status === 201) {
            console.log(res);
            const movieId = res.data.id;
            this.$router.push(`/movies/show/${movieId}`);
          } else {
            console.log(res);
            this.errorMessage = "Request failed";
          }
        })
        .catch((error) => {
          this.errorMessage = "Request failed";
          console.log(error);
        });
    },
    cancel: function () {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.movieadd-title {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 425px;
}
.movieadd-container {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  background-color: #2ecae5;
  padding-top: 3px;
  padding-bottom: 3px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: 78px;
}
div .form {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: #2ecae556;
  height: 40em;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
}
div .row {
  display: flex;
  flex-direction: row;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
}
p {
  width: fit-content;
  padding-right: 10px;
  margin: 0px;
}
.movieadd-description {
  height: 200px;
}
.movieadd-button-container {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.movieadd-button {
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
}
.movieadd-button:hover {
  background-color: #2ecae5;
  box-shadow: 0px 15px 20px rgba(46, 147, 229, 0.4);
  transform: translateY(-7px);
}
</style>
