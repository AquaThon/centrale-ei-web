<template>
  <h1>Edit information about the movie</h1>
  <h2 v-if="errorMessage !== ''">{{ this.errorMessage }}</h2>
  <div class="form">
    <div class="row">
      <p>
        Movie name :
      </p>
      <input
        type="text"
        v-model="originalTitle"
        placeholder="John Cena : origins"
      />
    </div>
    <div class="row">
      <p>
        Release date :
      </p>
      <input
        type="text"
        v-model="releaseDate"
        placeholder="1326"
      />
    </div>
    <div class="row">
      <p>
        Url of an image :
      </p>
      <input
        type="url"
        v-model="posterPath"
        placeholder="https://s1.qwant.com/thumbr/0x380/a/0/03a879dc9055423a3f48828aac8c0493693c984c940941d3cabf5810afdb5b/fkrjojtgi4c31.jpg?u=https%3A%2F%2Fi.redd.it%2Ffkrjojtgi4c31.jpg&q=0&b=1&p=0&a=0"
      />
    </div>
    <div class="row">
      <p>
        Language :
      </p>
      <input
        type="text"
        v-model="originalLanguage"
        placeholder="en"
      />
    </div>
    <div class="row description" >
      <p>
        Description of the movie :
      </p>
      <input
        type="text"
        v-model="overview"
        placeholder="At an early age, Cena showed a passion for sports and working out. By the time he was 15, he was a regular gym rat and after graduating high school, Cena headed off to Springfield College in Massachusetts to study exercise physiology and prove his worth on the football field. At Springfield, Cena turned himself into a Division III All-American offensive lineman and team captain."
      />
    </div>
    <div class="row">
      <button @click="submit()">Submit</button>
      <button @click="cancel()">Cancel</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MovieEdit",
  data: function () {
    return {
      id: this.$route.params.movieId,
      originalTitle: "",
      releaseDate: "",
      posterPath: "",
      backdropPath: "",
      originalLanguage: "",
      overview: "",
      popularity: "",
      title: "",
      video: "",
      voteAverage: "",
      voteCount: "",
      errorMessage: "",
    };
  },
  methods: {
    submit: function () {
      axios.post(`${process.env.VUE_APP_BACKEND_BASE_URL}/movies/edit`, {
        "id": this.id,
        "originalTitle": this.originalTitle,
        "releaseDate": this.releaseDate,
        "posterPath": this.posterPath,
        "backdropPath": this.backdropPath,
        "originalLanguage": this.originalLanguage,
        "overview": this.overview,
        "popularity": this.popularity,
        "title": this.title,
        "video": this.video,
        "voteAverage": this.voteAverage,
        "voteCount": this.voteCount,
      })
      .then((res) => {
        if (res.status === 201) {
          document.location.href=`/movies/show/${this.id}`;
        } else {
          console.log(res);
          this.errorMessage = "Request failed";
        }
      })
      .catch((error) => {
        this.errorMessage = "Request failed";
        console.log(error);
      })
    },
    cancel: function () {
      document.location.href="/";
    },
  },
  created: function () {
    axios.get(`${process.env.VUE_APP_BACKEND_BASE_URL}/movies/show/${this.id}`)
    .then((response) => {
      this.originalTitle= response.data.movie.originalTitle;
      this.releaseDate= response.data.movie.releaseDate;
      this.posterPath= response.data.movie.posterPath;
      this.backdropPath= response.data.movie.backdropPath;
      this.originalLanguage= response.data.movie.originalLanguage;
      this.overview= response.data.movie.overview;
      this.popularity= response.data.movie.popularity;
      this.title= response.data.movie.title;
      this.video= response.data.movie.video;
      this.voteAverage= response.data.movie.voteAverage;
      this.voteCount= response.data.movie.voteCount;
    })
    .catch((error) => {
      this.usersLoadingError = "An error occured while fetching movie details.";
      console.error(error);
    });
  },
};
</script>

<style scoped>
div .form {
  display: flex;
  flex-direction: column;
}
div .row {
  display: flex;
  flex-direction: row;
}
p {
  width: fit-content;
  padding-right: 10px;
  margin: 0px;
}
div .description {
  height: 50vh;
}
</style>
