import { actionCreators as loaderActionsCreator } from '../common/loaderAction';
import { TodoItemsAPI } from '../../api/TodoItemAPI';
import { FETCH_DATA } from './TodoActionTypes';
import { ITodoItemSave } from 'src/types/ToDoItem';

export const actionCreatos = {
  getTodoLists: () => async (dispatch, getState) => {
    dispatch(loaderActionsCreator.showLoaderWithPleaseWaitText());

    try {
      const result = await TodoItemsAPI.getTodoLists();

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

  saveTodoItem: (item: ITodoItemSave) => async (dispatch, getState) => {
    dispatch(loaderActionsCreator.showLoaderWithPleaseWaitText());

    await TodoItemsAPI.saveTodoItem(item);

    dispatch(actionCreatos.getTodoLists());

    try {
    } catch (response) {
      console.log(response);
    } finally {
      dispatch(loaderActionsCreator.hideLoader());
    }
  },
};
