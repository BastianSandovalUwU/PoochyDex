export type UserData = {
  user: string;
  token: string;
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
  language: string;
}
