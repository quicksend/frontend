import Vue from "vue";

import { RegisterDto } from "@/dto/register.dto";

export const register = (dto: RegisterDto) => Vue.$http.post<void>("/auth/register", dto);
