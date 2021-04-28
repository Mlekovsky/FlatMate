import { ReceiptsAPI } from '../../api/ReceiptAPI';
import { ICreateReceiptRequest, ReceiptFilterMode } from '../../types/Receipt';
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
          currentFilter: filterMode
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
};
