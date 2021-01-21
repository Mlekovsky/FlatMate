import React from 'react';
import produce from 'immer';
import { FETCH_DATA } from 'src/actions/Todo/TodoActionTypes';

interface ITodoState {
    todoItems: []
}

const initialState: ITodoState = {
    todoItems: []
}

export const reducer = (state: ITodoState, action) => {
    state = state || initialState;

    return produce(state, nextState => {
        switch(action.type){
            case FETCH_DATA:
                nextState.todoItems = action.payload.todoItems
            break;
        }
    });
}

