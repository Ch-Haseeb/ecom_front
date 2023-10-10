import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/ProductView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (!token && to.name === "home") {
    next({ name: "login" });
  } else if (token && (to.name === "register" || to.name === "login")) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
