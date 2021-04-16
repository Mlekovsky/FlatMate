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
  AvailableAparatamentsListUrl
} from './base/EndpointsAPI';
import {
  IApartamentAssignUserRequest,
  IApartamentCreateRequest,
  IApartamentUpdateMoudlesRequest,
  IApartamentUpdateRequest,
  IDeleteApartamentRequest,
  IGetApartamentListRequest,
  IRemoveUserApartamentReuqest,
} from '../types/Apartament';

/** Klasa API do zarządzania mieszkaniem */
class ApartamentAPI extends BaseAPI {
  public async createApartament(item: IApartamentCreateRequest, token: string): Promise<IResponse<any>> {
    return await super.post<any>(
      new PostRequest({
        url: ApartamentCreateUrl,
        body: JSON.stringify({
          shortName: item.shortName,
          city: item.city,
          address: item.address,
          password: item.password,
        }),
      }, { Authorization: 'Bearer ' + token}),
    );
  }

  public async updateApartament(item: IApartamentUpdateRequest, token: string): Promise<IResponse<any>> {
    return await super.post<any>(
      new PostRequest({
        url: ApartamentUpdateUrl,
        body: JSON.stringify({
          apartamentId: item.apartamentId,
          shortName: item.shortName,
          city: item.city,
          address: item.address,
        }),
      }, { Authorization: 'Bearer ' + token}),
    );
  }

  public async updateApartamentModules(item: IApartamentUpdateMoudlesRequest, token: string): Promise<IResponse<any>> {
    return await super.post<any>(
      new PostRequest({
        url: ApartamentUpdateModulesUrl,
        body: JSON.stringify({
          apartamentId: item.apartamentId,
          modules: item.modules,
        }),
      }, { Authorization: 'Bearer ' + token}),
    );
  }

  public async assignUserApartament(item: IApartamentAssignUserRequest, token: string): Promise<IResponse<any>> {
    return await super.post<any>(
      new PostRequest({
        url: ApartamentAssignUserUrl,
        body: JSON.stringify({
          apartamentId: item.apartamentId,
          apartamentPassword: item.apartamentPassword,
        }),
      }, { Authorization: 'Bearer ' + token}),
    );
  }

  public async removeUserApartament(item: IRemoveUserApartamentReuqest, token: string): Promise<IResponse<any>> {
    return await super.post<any>(
      new PostRequest({
        url: ApartamentRemoveUserUrl,
        body: JSON.stringify({
          apartamentId: item.apartamentId,
        }),
      }, { Authorization: 'Bearer ' + token}),
    );
  }

  public async deleteApartament(item: IDeleteApartamentRequest, token: string): Promise<IResponse<any>> {
    return await super.post<any>(
      new PostRequest({
        url: ApartamentDeleteUrl,
        body: JSON.stringify({
          apartamentId: item.apartamentId,
        }),
      }, { Authorization: 'Bearer ' + token}),
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

  public async getApartamentInfo(apartamentId: number, token: string): Promise<IResponse<any>> {
    return await super.get<any>(
      new Request({
        url: ApartamentInfoUrl,
        querySearchParams: {
          apartamentId: apartamentId,
        },
        headers: { Authorization: 'Bearer ' + token },
      }),
    );
  }

  public async getAvailableApartaments(token: string) : Promise<IResponse<any>> {
    return await super.get<any>(
      new Request({
        url: AvailableAparatamentsListUrl,
        headers: { Authorization: 'Bearer ' + token} 
      })
    )
  }
}

export const ApartamentsAPI = new ApartamentAPI();
