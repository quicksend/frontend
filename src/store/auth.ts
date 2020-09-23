import Vue from "vue";

import { Module, MutationAction, VuexModule } from "vuex-module-decorators";

import { User } from "@/interfaces/user";

@Module({ name: "auth", namespaced: true })
export default class AuthModule extends VuexModule {
  user: User | null = null;

  @MutationAction({ mutate: ["user"] })
  async logout() {
    await Vue.$http.post("/auth/logout");

    return { user: null };
  }

  @MutationAction({ mutate: ["user"] })
  async login(payload: { password: string; recaptcha: string; username: string }) {
    const user = await Vue.$http.post<User>("/auth/login", payload).then(res => res.data);

    return { user };
  }
}
