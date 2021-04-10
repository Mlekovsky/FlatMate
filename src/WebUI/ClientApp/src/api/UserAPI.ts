import { PostRequest, Request } from './base/Requests';
import { IResponse } from './base/Responses';
import { BaseAPI } from './base/BaseAPI';
import { LoginUrl } from './base/EndpointsAPI';
import { ITodoItemSave } from 'src/types/ToDoItem';
import { IUserLoginRequest } from 'src/types/User';

/** Klasa API do modułu roomCodesTranslations */
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

  //   public async register(item:)

  //   public async getTodoLists(): Promise<IResponse<any>> {
  //     return await super.get<any>(
  //       new Request({
  //         url: TodoListsUrl,
  //         querySearchParams: {},
  //       }),
  //     );
  //   }

  //   public async saveTodoItem(item: ITodoItemSave): Promise<IResponse<any>> {
  //     return await super.post<any>(
  //       new PostRequest({
  //         url: TodoItemsUrl,
  //         body: JSON.stringify({
  //           listId: item.listId,
  //           title: item.title,
  //         }),
  //       }),
  //     );
  //   }
}

export const UsersAPI = new UserAPI();
