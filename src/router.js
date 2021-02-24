import VueRouter from "vue-router";
import FrontPage from "./pages/FrontPage.vue";
import Register from "./pages/Register.vue";
import Login from "./pages/Login.vue";
import Dashboard from "./pages/Dashboard.vue";

const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", component: FrontPage },
    { path: "/register", component: Register },
    { path: "/login", component: Login, name: "login" },
    {
      path: "/dashboard",
      component: Dashboard,
      name: "dashboard",
      meta: {
        requiresAuth: true,
      },
    },
    { path: "/:notFound(.*)", component: null },
  ],
  linkExactActiveClass: "active", // active class for *exact* links.
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("jwt") === null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath },
      });
    } else {
      if (to.matched.some((record) => record.meta.is_admin)) {
        next({ name: "dashboard" });
      } else {
        next();
      }
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (localStorage.getItem("jwt") === null) {
      next();
    } else {
      next({ name: "dashboard" });
    }
  } else {
    next();
  }
});

export default router;
