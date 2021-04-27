import { ReceiptsAPI } from '../../api/ReceiptAPI';
import { ReceiptFilterMode } from '../../types/Receipt';
import { LOAD_RECEIPTS } from './receiptActionTypes';

export const receiptActionCreator = {
  getTodoLists: (apartamentId: number, filterMode: ReceiptFilterMode) => async (dispatch, getState) => {
    try {
      const token = localStorage.getItem('token');
      const result = await ReceiptsAPI.getReceipts(token, apartamentId, filterMode);

      dispatch({
        type: LOAD_RECEIPTS,
        payload: {
          receipts: result.data.receipts,
          users: result.data.users
        },
      });
    } catch (response) {
      console.log(response);
    }
  },
};
