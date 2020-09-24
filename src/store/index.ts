import Vue from "vue";
import Vuex from "vuex";

import { useAccessor } from "typed-vuex";

import * as user from "./modules/user.module";

Vue.use(Vuex);

const storePattern = {
  modules: {
    user
  },
  strict: process.env.NODE_ENV !== "production"
};

const store = new Vuex.Store(storePattern);
const accessor = useAccessor(store, storePattern);

Vue.prototype.$accessor = accessor;

export { accessor, store };
