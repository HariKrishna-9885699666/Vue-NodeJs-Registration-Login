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
    { path: "/dashboard", component: Dashboard, name: "dashboard" },
    { path: "/:notFound(.*)", component: null },
  ],
  linkExactActiveClass: "active", // active class for *exact* links.
});

export default router;
