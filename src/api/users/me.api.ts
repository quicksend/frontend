import Vue from "vue";

import { User } from "@/interfaces/user";

export const me = () => Vue.$http.get<User>("/users/@me").then(res => res.data);
