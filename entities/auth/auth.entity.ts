import { UserConfigData } from "./user.entity";

export type LoginResponse = {
  message: string;
  token: string;
  role: string;
  username: string;
  profileImgUrl: string;
  userConfig: UserConfigData;
}

export type SignUp = {
  username: string;
  password: string;
}
