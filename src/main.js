import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import router from "./router.js";
import "./axios.js";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-vue/dist/bootstrap-vue.css";
import Vuelidate from "vuelidate";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

Vue.config.productionTip = false;

Vue.use(VueRouter);

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.use(Vuelidate);
Vue.use(VueToast);
Vue.use(Loading);

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
