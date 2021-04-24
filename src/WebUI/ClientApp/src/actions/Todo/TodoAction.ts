import { actionCreators as loaderActionsCreator } from '../common/loaderAction';
import { TodoItemsAPI } from '../../api/TodoItemAPI';
import { FETCH_DATA } from './TodoActionTypes';
import { ITodoItemUpdateRequest, ITodoListCreateRequest, ITodoListDeleteRequest, ITodoListUpdateRequest, ITodoItemSave, ITodoItemDetailsUpdateRequest, ITodoItemDeleteRequest } from '../../types/ToDoItem';

export const actionCreatos = {
  getTodoLists: (apartamentId: number) => async (dispatch, getState) => {
    dispatch(loaderActionsCreator.showLoaderWithPleaseWaitText());

    try {
      const token = localStorage.getItem('token');
      const result = await TodoItemsAPI.getTodoLists(token, apartamentId);

      dispatch({
        type: FETCH_DATA,
        payload: {
          todoItems: result.data,
        },
      });
    } catch (response) {
      console.log(response);
    } finally {
      dispatch(loaderActionsCreator.hideLoader());
    }
  },

  createTodoList: (item: ITodoListCreateRequest) => async (dispatch, getState) => {
    try {
      const token = localStorage.getItem('token');
      await TodoItemsAPI.createTodoList(item, token);

      dispatch(actionCreatos.getTodoLists(item.apartamentId));
    } catch (response) {
      console.log(response);
    }
  },

  deleteTodoList: (item: ITodoListDeleteRequest) => async (dispatch, getState) => {
    try {
      const token = localStorage.getItem('token');
      await TodoItemsAPI.deleteTodoList(item, token);

      dispatch(actionCreatos.getTodoLists(item.apartamentId));
    } catch (response) {
      console.log(response);
    }
  },

  updateTodoListName: (item: ITodoListUpdateRequest) => async (dispatch, getState) => {
    try {
      const token = localStorage.getItem('token');
      await TodoItemsAPI.updateTodoList(item, token);

      dispatch(actionCreatos.getTodoLists(item.apartamentId));
    } catch (response) {
      console.log(response);
    }
  },

  saveTodoItem: (item: ITodoItemSave) => async (dispatch, getState) => {
    try {
      const token = localStorage.getItem('token');
      await TodoItemsAPI.saveTodoItem(item, token);

      dispatch(actionCreatos.getTodoLists(item.apartamentId));
    } catch (response) {
      console.log(response);
    }
  },

  updateTodoItemStatus: (item: ITodoItemUpdateRequest) => async (dispatch, getState) => {
    try{
      const token = localStorage.getItem('token');
      await TodoItemsAPI.updateTodoItemStatus(item, token);

      dispatch(actionCreatos.getTodoLists(item.apartamentId));
    }catch (response) {
      console.log(response);
    }
  },

  updateTodoItemDetails: (item: ITodoItemDetailsUpdateRequest) => async (dispatch, getState) => {
    try{
      const token = localStorage.getItem('token');
      await TodoItemsAPI.updateTodoItemDetails(item, token);

      dispatch(actionCreatos.getTodoLists(item.apartamentId));
    }catch (response) {
      console.log(response);
    }
  },

  deleteTodoItem: (item: ITodoItemDeleteRequest) => async (dispatch, getState) => {
    try{
      const token = localStorage.getItem('token');
      await TodoItemsAPI.deleteTodoItem(item, token);

      dispatch(actionCreatos.getTodoLists(item.apartamentId));
    }catch (response) {
      console.log(response);
    }
  },

};
