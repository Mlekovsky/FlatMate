import { PostRequest, Request } from './base/Requests';
import { IResponse } from './base/Responses';
import { BaseAPI } from './base/BaseAPI';
import { TodoItemsUrl, TodoListsUrl } from './base/EndpointsAPI';
import { ITodoItemSave } from 'src/types/ToDoItem';

/** Klasa API do modułu roomCodesTranslations */
class TodoItemAPI extends BaseAPI {
  public async getTodoLists(): Promise<IResponse<any>> {
    return await super.get<any>(
      new Request({
        url: TodoListsUrl,
        querySearchParams: {},
      }),
    );
  }

  /**
   * saveRoomCodesTranslations - funkcja zapisujące zmiany występujące w translacjach kodów pokoi,
   * a następnie zwracająca liste zupdateowanych translacji kodów pokoi
   * @param {string} languageCode - kod języka dla jakiego zostaną zapisane zmiany translacji kodów pokoi
   * @param {any} roomCodesTranslations - kolekcja zmienionych translacji kodów pokoi
   * @returns {Promise<IResponse<any>>} - promise odpowiedzi,
   */
  public async saveTodoItem(item: ITodoItemSave): Promise<IResponse<any>> {
    return await super.post<any>(
      new PostRequest({
        url: TodoItemsUrl,
        body: JSON.stringify({
          listId: item.listId,
          title: item.title,
        }),
      }),
    );
  }
}

export const TodoItemsAPI = new TodoItemAPI();
