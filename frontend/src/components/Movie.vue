<template>
  <article class="card">
    <a href="#" v-on:click="redirect()">
      <div class="description" v-if="movieDescription !== ''">
        {{ movieDescription }}
      </div>
      <div class="description" v-if="movieDescription === ''">
        There is no description of this movie...
      </div>
    </a>
    <div class="mainTitle">
      <img :alt="moviePosterPath ? moviePosterPath : require(`@/assets/noImage.png`)" :src="moviePosterPath ? moviePosterPath : require(`@/assets/noImage.png`)" />
      <h3 class="title">{{ movieOriginalTitle }}</h3>
    </div>
  </article>
</template>

<script>
export default {
  name: "Movie",
  props: {
    movieId: "",
    movieOriginalTitle: "",
    moviePosterPath: "",
    movieDescription: "",
  },
  methods: {
    redirect : function ()  {
      this.$router.push(`/movies/show/${this.movieId}`);
      return false;
    }
  }
};
</script>

<style>
.card {
  flex: 0 0 250px;
  margin: 10px;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.3);
  background: #f0f0f0;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
}
.card img {
  max-width: 100%;
}
.card .mainTitle {
  max-width: 100%;
  width: 100%;
  height: 100%;
}
.card .mainTitle .title {
  padding: 0 20px 20px;
}
.card .description {
  text-align: justify;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  height: 100%;
  position: absolute;
  color: rgba(0, 0, 0, 0);
  transition: 300ms ease;
}
.card .description:hover {
  color: rgba(255, 255, 255, 1);
  background: rgba(0, 0, 0, 0.8);
  cursor: pointer;
}
</style>
