<template>
    <div class=movie-card>
        <img :src="img" />
        <h2>{{ movie.original_title}} : {{ movie.release_date}}</h2>
    </div>
</template>

<script>
export default {
    props: {
        movie: Object,
    },
    data: function () {
        return {
            img: ''
        }
    },
    created: function () {
        this.img= "https://image.tmdb.org/t/p/w500" + this.movie.poster_path;
    }
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