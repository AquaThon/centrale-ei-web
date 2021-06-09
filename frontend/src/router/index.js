import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import MovieAdd from "../views/MovieAdd.vue";
import Users from "../views/Users.vue";
import About from "../views/About.vue";
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
    path: "/movies/show/:movieId",
    name: "Movie",
    component: MovieShow,
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
