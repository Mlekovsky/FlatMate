import { ApartamentsAPI } from '../../api/ApartamentAPI';
import { SET_INFO, UPDATE_MODULES } from './apartamentActionTypes';
import {} from 'src/types/Apartament';

export const actionCreators = {
  getApartamentInfo: (apartamentId: number) => async (dispatch, getState) => {
    try {
      const result = await ApartamentsAPI.getApartamentInfo(apartamentId);

      if (result.data.succeeded) {
        dispatch({
          type: SET_INFO,
          payload: {
            shortName: result.data.response.shortName,
            city: result.data.response.city,
            address: result.data.response.address,
          },
        });
      } else {
        console.log(result.data.errors);
      }

      console.log(result);
    } catch (response) {
      console.log(response);
    }
  },
};
