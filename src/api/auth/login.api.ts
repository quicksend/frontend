import Vue from "vue";

import { LoginDto } from "@/dto/login.dto";

import { User } from "@/interfaces/user";

export const login = (dto: LoginDto) =>
  Vue.$http.post<User>("/auth/login", dto).then(res => res.data);
