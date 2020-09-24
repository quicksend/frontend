import Vue from "vue";

export const logout = () => Vue.$http.post("/auth/logout").then(() => null);
