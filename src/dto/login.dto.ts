export interface LoginDto {
  password: string;
  recaptcha: string;
  rememberMe: boolean;
  username: string;
}
