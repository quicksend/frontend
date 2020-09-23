import axios, { AxiosError, AxiosRequestConfig } from "axios";

import _Vue from "vue";

export const AxiosPlugin = {
  install(Vue: typeof _Vue, defaults: AxiosRequestConfig) {
    const $http = axios.create(defaults);

    $http.interceptors.request.use(config => {
      return config;
    });

    $http.interceptors.response.use(
      response => response,
      (error: AxiosError) => {
        if (!error.response || error.response.status >= 500) {
          console.error(error);
          throw new Error("An error has occured, please try again later!");
        }

        const { message } = error.response.data;

        throw new Error(Array.isArray(message) ? message.join("\n") : message);
      }
    );

    Vue.$http = $http;
    Vue.prototype.$http = $http;
  }
};
