import { AxiosInstance } from "axios";

import Vue from "vue";

declare module "vue/types/vue" {
  interface Vue {
    $http: AxiosInstance;
  }

  interface VueConstructor {
    $http: AxiosInstance;
  }
}
