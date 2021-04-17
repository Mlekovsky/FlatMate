import { PostRequest, Request } from './base/Requests';
import { IResponse } from './base/Responses';
import { BaseAPI } from './base/BaseAPI';
import { AuthorizeUrl, LoginUrl, RegisterUrl, UserInfoUrl } from './base/EndpointsAPI';
import { IUserLoginRequest, IUserRegisterRequest } from '../types/User';

/** Klasa API do zarządzania użytkownikiem */
class UserAPI extends BaseAPI {
  public async login(item: IUserLoginRequest): Promise<IResponse<any>> {
    return await super.post<any>(
      new PostRequest({
        url: LoginUrl,
        body: JSON.stringify({
          email: item.email,
          password: item.password,
        }),
      }),
    );
  }

  public async register(item: IUserRegisterRequest): Promise<IResponse<any>> {
    return await super.post<any>(
      new PostRequest({
        url: RegisterUrl,
        body: JSON.stringify({
          email: item.email,
          password: item.password,
          firstName: item.firstName,
          lastName: item.lastName,
        }),
      }),
    );
  }

  public async authorize(token: string): Promise<IResponse<any>> {
    return await super.post<any>(
      new PostRequest({
        url: AuthorizeUrl,
        body: JSON.stringify({
          token: token,
        }),
      }),
    );
  }

  public async refreshInfo(token: string): Promise<IResponse<any>> {
    return await super.get<any>(
      new Request({
        url: UserInfoUrl,
        headers: { Authorization: 'Bearer ' + token },
      }),
    );
  }
}

export const UsersAPI = new UserAPI();
