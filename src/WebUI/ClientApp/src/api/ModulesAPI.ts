import { Request } from './base/Requests';
import { IResponse } from './base/Responses';
import { BaseAPI } from './base/BaseAPI';
import { ModulesUrl } from './base/EndpointsAPI';

/** Klasa API do zarządzania użytkownikiem */
class ModulesAPI extends BaseAPI {
  public async getModules(token: string): Promise<IResponse<any>> {
    return await super.get<any>(
      new Request({
        url: ModulesUrl,
        headers: { Authorization: 'Bearer ' + token},
      }),
    );
  }
}

export const ModuleAPI = new ModulesAPI();
