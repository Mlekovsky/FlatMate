import { ReceiptsAPI } from '../../api/ReceiptAPI';
import {
  ICreateReceiptPositionRequest,
  ICreateReceiptRequest,
  IDeleteReceiptPositionRequest,
  IDeleteReceiptRequest,
  IUpdateReceiptPositionRequest,
  IUpdateReceiptRequest,
  IUpdateReceiptStatusRequest,
  ReceiptFilterMode,
} from '../../types/Receipt';
import { LOAD_RECEIPTS } from './receiptActionTypes';

export const receiptActionCreator = {
  getReceipts: (apartamentId: number, filterMode: ReceiptFilterMode) => async (dispatch, getState) => {
    try {
      const token = localStorage.getItem('token');
      const result = await ReceiptsAPI.getReceipts(token, apartamentId, filterMode);

      dispatch({
        type: LOAD_RECEIPTS,
        payload: {
          receipts: result.data.receipts,
          users: result.data.users,
          currentFilter: filterMode,
        },
      });
    } catch (response) {
      console.log(response);
    }
  },

  createReceipt: (request: ICreateReceiptRequest) => async (dispatch, getState) => {
    try {
      const token = localStorage.getItem('token');
      const result = await ReceiptsAPI.createReceipt(request, token);

      const state = getState();
      dispatch(receiptActionCreator.getReceipts(request.apartamentId, state.receipts.currentFilter));
    } catch (response) {
      console.log(response);
    }
  },

  updateReceipt: (request: IUpdateReceiptRequest) => async (dispatch, getState) => {
    try {
      const token = localStorage.getItem('token');
      const result = await ReceiptsAPI.updateReceipt(request, token);

      const state = getState();
      dispatch(receiptActionCreator.getReceipts(request.apartamentId, state.receipts.currentFilter));
    } catch (response) {
      console.log(response);
    }
  },

  deleteReceipt: (request: IDeleteReceiptRequest) => async (dispatch, getState) => {
    try {
      const token = localStorage.getItem('token');
      const result = await ReceiptsAPI.deleteReceipt(request, token);

      const state = getState();
      dispatch(receiptActionCreator.getReceipts(request.apartamentId, state.receipts.currentFilter));
    } catch (response) {
      console.log(response);
    }
  },

  updateReceiptStatus: (request: IUpdateReceiptStatusRequest) => async (dispatch, getState) => {
    try {
      const token = localStorage.getItem('token');
      const result = await ReceiptsAPI.updateReceiptStatus(request, token);

      const state = getState();
      dispatch(receiptActionCreator.getReceipts(request.apartamentId, state.receipts.currentFilter));
    } catch (response) {
      console.log(response);
    }
  },

  //RECEIPT POSITIONS

  createReceiptPosition: (request: ICreateReceiptPositionRequest) => async (dispatch, getState) => {
    try {
      const token = localStorage.getItem('token');
      const result = await ReceiptsAPI.createReceiptPosition(request, token);

      const state = getState();
      dispatch(receiptActionCreator.getReceipts(request.apartamentId, state.receipts.currentFilter));
    } catch (response) {
      console.log(response);
    }
  },

  updateReceiptPosition: (request: IUpdateReceiptPositionRequest) => async (dispatch, getState) => {
    try {
      const token = localStorage.getItem('token');
      const result = await ReceiptsAPI.updateReceiptPosition(request, token);

      const state = getState();
      dispatch(receiptActionCreator.getReceipts(request.apartamentId, state.receipts.currentFilter));
    } catch (response) {
      console.log(response);
    }
  },

  deleteReceiptPosition: (request: IDeleteReceiptPositionRequest) => async (dispatch, getState) => {
    try {
      const token = localStorage.getItem('token');
      const result = await ReceiptsAPI.deleteReceiptPosition(request, token);

      const state = getState();
      dispatch(receiptActionCreator.getReceipts(request.apartamentId, state.receipts.currentFilter));
    } catch (response) {
      console.log(response);
    }
  },
};
