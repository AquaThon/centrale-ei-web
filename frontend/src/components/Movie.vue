<template>
    <div class=movie-card>
        <img v-if="movie.poster_path!==null" :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" />
        <img v-if="movie.poster_path===null" src="../assets/no_poster.png" />
        <h2>{{ movie.original_title}} : {{ movie.release_date}}</h2>
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