export type LoginResponse = {
  message: string;
  token: string;
  role: string;
  username: string;
}

export type SignUp = {
  username: string;
  password: string;
}
