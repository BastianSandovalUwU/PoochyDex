export type LoginResponse = {
  message: string;
  token: string;
  role: string;
  username: string;
  profileImgUrl: string;
}

export type SignUp = {
  username: string;
  password: string;
}
