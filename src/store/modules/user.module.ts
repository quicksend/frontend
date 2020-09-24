import { actionTree, getterTree, mutationTree } from "typed-vuex";

import { login } from "@/api/auth/login.api";
import { logout } from "@/api/auth/logout.api";
import { me } from "@/api/users/me.api";

import { LoginDto } from "@/dto/login.dto";

import { User } from "@/interfaces/user";

export interface UserState {
  info: User | null;
}

export const namespaced = true;

export const state = (): UserState => ({
  info: null
});

export const getters = getterTree(state, {
  isLoggedIn: state => !!state.info
});

export const mutations = mutationTree(state, {
  setUser(state, user: UserState["info"]) {
    state.info = user;
  }
});

export const actions = actionTree(
  { state, mutations },
  {
    async logout({ commit }) {
      commit("setUser", await logout());
    },

    async login({ commit }, payload: LoginDto) {
      commit("setUser", await login(payload));
    },

    async me({ commit }) {
      const user = await me();

      commit("setUser", user);

      return user;
    }
  }
);
