import Vue from "vue";

import { VueReCaptcha } from "vue-recaptcha-v3";

import { AxiosPlugin } from "./plugins/axios.plugin";

import { accessor, store } from "./store";
import { router } from "./router";

import App from "./App.vue";

import "./assets/scss/main.scss";

// import "./registerServiceWorker";

Vue.config.productionTip = process.env.NODE_ENV === "development";

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

/*
 ** Check if the user is logged in before initializing Vue,
 ** so that the router knows whether to redirect on certain routes
 */
accessor.user
  .me()
  .catch(error => console.error(error))
  .finally(() =>
    new Vue({
      render: h => h(App),
      router,
      store
    }).$mount("#app")
  );
