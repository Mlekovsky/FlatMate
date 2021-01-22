import React from 'react';
import produce from 'immer';
import { FETCH_DATA } from 'src/actions/Todo/TodoActionTypes';
import { ITodosVM } from 'src/types/ToDoItem';

interface ITodoState {
  todoItems: ITodosVM[];
}

const initialState: ITodoState = {
  todoItems: [],
};

export const reducer = (state: ITodoState, action) => {
  state = state || initialState;

  return produce(state, (nextState) => {
    switch (action.type) {
      case FETCH_DATA:
        nextState.todoItems = action.payload.todoItems;
        break;
    }
  });
};
