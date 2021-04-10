import { IToken } from './Token';

export interface IUserLoginRequest {
  email: string;
  password: string;
}

export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  token: IToken;
}

export interface IUserRegisterRequest {
  email: string;
  password: string;
}
