import { PostRequest, Request } from './base/Requests';
import { IResponse } from './base/Responses';
import { BaseAPI } from './base/BaseAPI';
import {
  ApartamentCreateUrl,
  ApartamentAssignUserUrl,
  ApartamentDeleteUrl,
  ApartamentInfoUrl,
  ApartamentListUrl,
  ApartamentRemoveUserUrl,
  ApartamentUpdateModulesUrl,
  ApartamentUpdateUrl,
} from './base/EndpointsAPI';
import {
  IApartamentAssignUserRequest,
  IApartamentCreateRequest,
  IApartamentUpdateMoudlesRequest,
  IApartamentUpdateRequest,
  IDeleteApartamentRequest,
  IGetApartamentListRequest,
  IRemoveUserApartamentReuqest,
} from 'src/types/Apartament';

/** Klasa API do zarządzania mieszkaniem */
class ApartamentAPI extends BaseAPI {
  public async createApartament(item: IApartamentCreateRequest): Promise<IResponse<any>> {
    return await super.post<any>(
      new PostRequest({
        url: ApartamentCreateUrl,
        body: JSON.stringify({
          shortName: item.shortName,
          city: item.city,
          address: item.address,
          password: item.password,
        }),
        headers: {
          Bearer: sessionStorage.getItem('token'),
        },
      }),
    );
  }

  public async updateApartament(item: IApartamentUpdateRequest): Promise<IResponse<any>> {
    return await super.post<any>(
      new PostRequest({
        url: ApartamentUpdateUrl,
        body: JSON.stringify({
          apartamentId: item.apartamentId,
          shortName: item.shortName,
          city: item.city,
          address: item.address,
        }),
        headers: {
          Bearer: sessionStorage.getItem('token'),
        },
      }),
    );
  }

  public async updateApartamentModules(item: IApartamentUpdateMoudlesRequest): Promise<IResponse<any>> {
    return await super.post<any>(
      new PostRequest({
        url: ApartamentUpdateModulesUrl,
        body: JSON.stringify({
          apartamentId: item.apartamentId,
          modules: item.modules,
        }),
        headers: {
          Bearer: sessionStorage.getItem('token'),
        },
      }),
    );
  }

  public async assignUserApartament(item: IApartamentAssignUserRequest): Promise<IResponse<any>> {
    return await super.post<any>(
      new PostRequest({
        url: ApartamentAssignUserUrl,
        body: JSON.stringify({
          apartamentId: item.apartamentId,
          apartamentPassword: item.apartamentPassword,
        }),
        headers: {
          Bearer: sessionStorage.getItem('token'),
        },
      }),
    );
  }

  public async removeUserApartament(item: IRemoveUserApartamentReuqest): Promise<IResponse<any>> {
    return await super.post<any>(
      new PostRequest({
        url: ApartamentRemoveUserUrl,
        body: JSON.stringify({
          apartamentId: item.apartamentId,
        }),
        headers: {
          Bearer: sessionStorage.getItem('token'),
        },
      }),
    );
  }

  public async deleteApartament(item: IDeleteApartamentRequest): Promise<IResponse<any>> {
    return await super.post<any>(
      new PostRequest({
        url: ApartamentDeleteUrl,
        body: JSON.stringify({
          apartamentId: item.apartamentId,
        }),
        headers: {
          Bearer: sessionStorage.getItem('token'),
        },
      }),
    );
  }

  public async getApartamentList(item: IGetApartamentListRequest, token: string | null): Promise<IResponse<any>> {
    return await super.get<any>(
      new Request({
        url: ApartamentListUrl,
        querySearchParams: {
          order: item.order,
          searchField: item.searchField,
        },
        headers: { Authorization: 'Bearer ' + token },
      }),
    );
  }

  public async getApartamentInfo(apartamentId: number): Promise<IResponse<any>> {
    return await super.get<any>(
      new Request({
        url: ApartamentInfoUrl,
        querySearchParams: {
          apartamentId: apartamentId,
        },
        headers: {
          Bearer: sessionStorage.getItem('token'),
        },
      }),
    );
  }
}

export const ApartamentsAPI = new ApartamentAPI();
