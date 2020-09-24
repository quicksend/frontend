import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import PortalLayout from "./layouts/Portal.vue";

import { accessor } from "./store";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: "/",
    beforeEnter(_to, _from, next) {
      if (!accessor.user.isLoggedIn) next({ name: "login" });
      else next({ name: "explorer" });
    }
  },
  {
    path: "/explorer",
    name: "explorer",
    component: () => import(/* webpackChunkName: "explorer" */ "./views/Explorer.vue"),
    meta: {
      loginRequired: true
    }
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "login" */ "./views/Login.vue"),
    meta: {
      guestOnly: true,
      layout: PortalLayout
    }
  },
  {
    path: "/register",
    name: "register",
    component: () => import(/* webpackChunkName: "register" */ "./views/Register.vue"),
    meta: {
      guestOnly: true,
      layout: PortalLayout
    }
  }
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  mode: "history",
  routes
});

// Admin guard
router.beforeEach((to, _from, next) => {
  if (!accessor.user.info?.admin && to.meta.admin) next({ name: "explorer" });
  else next();
});

// Guest only guard
router.beforeEach((to, _from, next) => {
  if (accessor.user.isLoggedIn && to.meta.guestOnly) next({ name: "explorer" });
  else next();
});

// Authenticated guard
router.beforeEach((to, _from, next) => {
  if (!accessor.user.isLoggedIn && to.meta.loginRequired) next({ name: "login" });
  else next();
});

export { router };
