//note: LOGIN INTERFACE
export interface ILoginPayload {
  username: string;
  password: string;
}

export interface ILoginResponse {
  access_token: string;
  refresh_token: string;
}

export interface IProfileResponse {
  name: string;
  id: string;
  code: string;
  sale: string;
}
