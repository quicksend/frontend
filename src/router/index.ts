import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import PortalLayout from "@/layouts/Portal.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    beforeEnter(_to, _from, next) {
      next("login");
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    meta: {
      layout: PortalLayout
    }
  },
  {
    path: "/register",
    name: "Register",
    component: () => import(/* webpackChunkName: "register" */ "../views/Register.vue"),
    meta: {
      layout: PortalLayout
    }
  }
];

export const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
