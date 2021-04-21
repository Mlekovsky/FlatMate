import { DeleteRequest, PostRequest, Request } from './base/Requests';
import { IResponse } from './base/Responses';
import { BaseAPI } from './base/BaseAPI';
import { TodoItemsUrl, TodoListsUrl } from './base/EndpointsAPI';
import { ITodoItemSave, ITodoListCreateRequest, ITodoListDeleteRequest } from '../types/ToDoItem';

/** Klasa API do modułu roomCodesTranslations */
class TodoItemAPI extends BaseAPI {
  public async getTodoLists(token: string, apartamentId: number): Promise<IResponse<any>> {
    return await super.get<any>(
      new Request({
        url: TodoListsUrl,
        querySearchParams: {apartamentId: apartamentId},
        headers: { Authorization: 'Bearer ' + token},
      }),
    );
  }

  public async saveTodoItem(item: ITodoItemSave, token: string): Promise<IResponse<any>> {
    return await super.post<any>(
      new PostRequest({
        url: TodoItemsUrl,
        body: JSON.stringify({
          listId: item.listId,
          title: item.title,
          apartamentId: item.apartamentId
        }),
      }, { Authorization: 'Bearer ' + token}),
    );
  }

  public async createTodoList(item: ITodoListCreateRequest, token: string): Promise<IResponse<any>> {
    return await super.post<any>(
      new PostRequest({
        url: TodoListsUrl,
        body: JSON.stringify({
          title: item.title,
          apartamentId: item.apartamentId
        }),
      }, { Authorization: 'Bearer ' + token}),
    );
  }

  public async deleteTodoList(item: ITodoListDeleteRequest, token: string): Promise<IResponse<any>> {
    return await super.delete<any>(
      new DeleteRequest({
        url: TodoListsUrl,
        querySearchParams: {
          apartamentId: item.apartamentId,
          id: item.id
        },
        body: JSON.stringify ({
          apartamentId: item.apartamentId,
          id: item.id
        })
      }, 
      { Authorization: 'Bearer ' + token}),
    );
  }

}

export const TodoItemsAPI = new TodoItemAPI();
