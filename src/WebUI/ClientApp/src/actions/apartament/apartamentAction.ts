import { ApartamentsAPI } from '../../api/ApartamentAPI';
import { SET_INFO, UPDATE_MODULES } from './apartamentActionTypes';
import { SET_AVAILABLE_LIST, SET_LIST } from '../dashboard/dashboardActionTypes';
import { IApartamentCreateRequest } from '../../types/Apartament';

export const actionCreators = {
  getApartamentInfo: (apartamentId: number) => async (dispatch, getState) => {
    try {
      const token = localStorage.getItem('token');
      const result = await ApartamentsAPI.getApartamentInfo(apartamentId, token);

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

  getApartamentList: () => async (dispatch, getState) => {
    try {
      const token = localStorage.getItem('token');
      const result = await ApartamentsAPI.getApartamentList({ order: 0, searchField: '' }, token);

      if (result.data.succeeded) {
        dispatch({
          type: SET_LIST,
          payload: {
            apartamentList: result.data.response.apartaments,
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  getAvailableApartamentsList: () => async(dispatch, getState) => {
    try {
      const token = localStorage.getItem('token');
      const result = await ApartamentsAPI.getAvailableApartaments(token);

      if (result.data.succeeded) {
        dispatch({
          type: SET_AVAILABLE_LIST,
          payload: {
            availableApartamentList: result.data.response,
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  createApartament: (request: IApartamentCreateRequest) => async(dispatch, getState) => {
    try{
      const token = localStorage.getItem('token');
      const result = await ApartamentsAPI.createApartament(request, token);

      if(result.data.succeeded){
        dispatch(actionCreators.getApartamentList());
        dispatch(actionCreators.getAvailableApartamentsList());
      }
    }
    catch(e){
      console.log(e);
    }
  }
};