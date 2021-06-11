import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import MovieAdd from "../views/MovieAdd.vue";
import MovieEdit from "../views/MovieEdit.vue";
import Users from "../views/Users.vue";
import MovieShow from "../views/MovieShow.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/movies/add",
    name: "MovieAdd",
    component: MovieAdd,
  },
  {
    path: "/movies/edit/:movieId",
    name: "MovieEdit",
    component: MovieEdit,
  },
  {
    path: "/movies/show/:movieId",
    name: "Movie",
    component: MovieShow,
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
