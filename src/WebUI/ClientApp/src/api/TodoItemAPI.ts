import { PostRequest, Request } from './base/Requests';
import { IResponse } from './base/Responses';
import { BaseAPI } from './base/BaseAPI';
import { TodoItemsUrl, TodoListsUrl } from './base/EndpointsAPI';
import { ITodoItemSave } from 'src/types/ToDoItem';

/** Klasa API do modułu roomCodesTranslations */
class TodoItemAPI extends BaseAPI {
  public async getTodoLists(token: string): Promise<IResponse<any>> {
    return await super.get<any>(
      new Request({
        url: TodoListsUrl,
        querySearchParams: {},
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
        }),
      }, { Authorization: 'Bearer ' + token}),
    );
  }
}

export const TodoItemsAPI = new TodoItemAPI();
