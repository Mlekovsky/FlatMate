export interface IUserLoginRequest {
  email: string;
  password: string;
}

export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
}

export interface IUserRegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
