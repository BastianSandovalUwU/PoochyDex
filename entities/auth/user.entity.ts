export type UserData = {
  user: string;
  token: string;
  role: string;
}

export type UserConfigResponse = {
  message: string;
  config:  UserConfigData;
}


export type UserConfigData = {
  id: number;
  language: string;
}

export type CreateUserConfigData = {
  id: number;
  language: string;
}
