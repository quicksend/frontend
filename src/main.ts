import Vue from "vue";

import { VueReCaptcha } from "vue-recaptcha-v3";

import { AxiosPlugin } from "./plugins/axios";

import { router } from "./router";
import { store } from "./store";

import App from "./App.vue";

import "./assets/scss/main.scss";

// import "./registerServiceWorker";

Vue.config.productionTip = false;

Vue.use(AxiosPlugin, {
  baseURL: process.env.VUE_APP_API_BASE_URL,
  withCredentials: true
});

Vue.use(VueReCaptcha, {
  loaderOptions: {
    autoHideBadge: true,
    useRecaptchaNet: true
  },
  siteKey: process.env.VUE_APP_RECAPTCHA_SITE_KEY
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
