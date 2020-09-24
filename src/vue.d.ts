import { AxiosInstance } from "axios";

import { accessor } from "./store";

import Vue from "vue";

declare module "vue/types/vue" {
  interface Vue {
    $accessor: typeof accessor;
    $http: AxiosInstance;
  }

  interface VueConstructor {
    $http: AxiosInstance;
  }
}
