<template>
    <div class=movie-card>
        <img v-if="movie.posterPath!==null" :src="'https://image.tmdb.org/t/p/w500' + movie.posterPath" />
        <img v-if="movie.posterPath===null" src="../assets/no_poster.png" />
        <h2>{{ movie.originalTitle}} : {{ movie.releaseDate}}</h2>
    </div>
</template>

<script>
export default {
    props: {
        movie: Object,
    },
    // data: function () {
    //     return {
    //         img: ''
    //     }
    // },
    // mounted: function () {
    //     this.img= "https://image.tmdb.org/t/p/w500" + this.movie.poster_path;
    // }
}
</script>

<style scoped>
.movie-card {
    text-align: center;
}
h2 {
    width: 500px;
}
</style>