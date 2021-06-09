<template>
  <article class="card">
    <div class="mainTitle">
      <img :alt=this.moviePosterPath :src=this.moviePosterPath />
      <h3 class="title">{{ movieOriginalTitle }}</h3>
    </div>
    <a :href="`/movies/show/${this.movieId}`">
      <div class="description" v-if="movieDescription !== ''">
        {{ movieDescription }}
      </div>
      <div class="description" v-if="movieDescription === ''">
        There is no description of this movie...
      </div>
    </a>
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
};
</script>

<style>
  .card {
    flex: 0 0 250px;
    margin: 10px;
    border: 1px solid #ccc;
    box-shadow: 2px 2px 6px 0px  rgba(0,0,0,0.3);
    background: #f0f0f0;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
  }
  .card img {
    max-width: 100%;
  }
  .card .mainTitle {
    z-index: 0;
    max-width: 100%;
    width: 100%;
    height: 100%;
  }
  .card .mainTitle .title {
    padding: 0 20px 20px;
  }
  .card .description {
    z-index: 1;
    text-align: justify;
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    height: 100%;
    position: absolute;
    color: rgba(0,0,0,0.0);
    transition: 300ms ease;
  }
  .card .description:hover {
    color: rgba(255, 255, 255, 1);
    background: rgba(0, 0, 0, 0.8);
    cursor: pointer;
  }
</style>