import { DeleteRequest, PostRequest, PutRequest, Request } from './base/Requests';
import { IResponse } from './base/Responses';
import { BaseAPI } from './base/BaseAPI';
import { TodoItemsUrl, TodoListsUrl } from './base/EndpointsAPI';
import {
  ITodoItemDeleteRequest,
  ITodoItemDetailsUpdateRequest,
  ITodoItemSave,
  ITodoItemUpdateRequest,
  ITodoListCreateRequest,
  ITodoListDeleteRequest,
  ITodoListUpdateRequest,
} from '../types/ToDoItem';

/** Klasa API do modułu roomCodesTranslations */
class TodoItemAPI extends BaseAPI {
  //TODO LISTS
  public async getTodoLists(token: string, apartamentId: number): Promise<IResponse<any>> {
    return await super.get<any>(
      new Request({
        url: TodoListsUrl,
        querySearchParams: { apartamentId: apartamentId },
        headers: { Authorization: 'Bearer ' + token },
      }),
    );
  }

  public async createTodoList(item: ITodoListCreateRequest, token: string): Promise<IResponse<any>> {
    return await super.post<any>(
      new PostRequest(
        {
          url: TodoListsUrl + '/Create',
          body: JSON.stringify({
            title: item.title,
            apartamentId: item.apartamentId,
          }),
        },
        { Authorization: 'Bearer ' + token },
      ),
    );
  }

  public async deleteTodoList(item: ITodoListDeleteRequest, token: string): Promise<IResponse<any>> {
    return await super.post<any>(
      new DeleteRequest(
        {
          url: TodoListsUrl,
          body: JSON.stringify({
            apartamentId: item.apartamentId,
            id: item.id,
          }),
        },
        { Authorization: 'Bearer ' + token },
      ),
    );
  }

  public async updateTodoList(item: ITodoListUpdateRequest, token: string): Promise<IResponse<any>> {
    return await super.post<any>(
      new PostRequest(
        {
          url: TodoListsUrl + '/Update',
          body: JSON.stringify({
            id: item.id,
            title: item.title,
            apartamentId: item.apartamentId,
          }),
        },
        { Authorization: 'Bearer ' + token },
      ),
    );
  }

  //TODO ITEMS
  public async saveTodoItem(item: ITodoItemSave, token: string): Promise<IResponse<any>> {
    return await super.post<any>(
      new PostRequest(
        {
          url: TodoItemsUrl + '/Create',
          body: JSON.stringify({
            listId: item.listId,
            title: item.title,
            apartamentId: item.apartamentId,
            assignedUserId: item.assignedUserId,
          }),
        },
        { Authorization: 'Bearer ' + token },
      ),
    );
  }

  public async updateTodoItemStatus(item: ITodoItemUpdateRequest, token: string): Promise<IResponse<any>> {
    return await super.post<any>(
      new PostRequest(
        {
          url: TodoItemsUrl + '/Update',
          body: JSON.stringify({
            id: item.id,
            apartamentId: item.apartamentId,
            done: item.done,
          }),
        },
        { Authorization: 'Bearer ' + token },
      ),
    );
  }

  public async updateTodoItemDetails(item: ITodoItemDetailsUpdateRequest, token: string): Promise<IResponse<any>> {
    return await super.post<any>(
      new PostRequest(
        {
          url: TodoItemsUrl + '/UpdateDetails',
          body: JSON.stringify({
            id: item.id,
            apartamentId: item.apartamentId,
            listId: item.listId,
            title: item.title,
            assignedUserId: item.assignedUserId,
          }),
        },
        { Authorization: 'Bearer ' + token },
      ),
    );
  }

  public async deleteTodoItem(item: ITodoItemDeleteRequest, token: string): Promise<IResponse<any>> {
    return await super.post<any>(
      new DeleteRequest(
        {
          url: TodoItemsUrl,
          body: JSON.stringify({
            apartamentId: item.apartamentId,
            id: item.id,
          }),
        },
        { Authorization: 'Bearer ' + token },
      ),
    );
  }
}

export const TodoItemsAPI = new TodoItemAPI();
