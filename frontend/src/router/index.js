import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Counter from "../views/Counter.vue";
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
    path: "/counter",
    name: "Counter",
    component: Counter,
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
  {
    path: "/movies/show/:movieId",
    name: "Movie",
    component: MovieShow,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
