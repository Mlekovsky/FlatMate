import React from 'react';
import produce from 'immer';
import { IReceiptListDto, ReceiptFilterMode } from '../../types/Receipt';
import { IAssignableUserDto } from '../../types/common';
import { LOAD_RECEIPTS } from '../../actions/receipt/receiptActionTypes';

interface ITodoState {
  receipts: IReceiptListDto[];
  users: IAssignableUserDto[];
  currentFilter: ReceiptFilterMode;
}

const initialState: ITodoState = {
  receipts:[],
  users:[],
  currentFilter: ReceiptFilterMode.NotPaid
};

export const reducer = (state: ITodoState, action) => {
  state = state || initialState;

  return produce(state, (nextState) => {
    switch (action.type) {
      case LOAD_RECEIPTS:
        nextState.receipts = action.payload.receipts;
        nextState.users = action.payload.users;
        nextState.currentFilter = action.payload.currentFilter
        break;
    }
  });
};
