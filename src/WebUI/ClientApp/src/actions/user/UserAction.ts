import { actionCreators as loaderActionsCreator } from '../common/loaderAction';
import { UsersAPI } from '../../api/UserAPI';
import { LOGIN, REGISTER, SWITCH_APARTAMENT, LOGOUT } from './UserActionTypes';
import { IUserLoginRequest, IUserRegisterRequest } from 'src/types/User';
import { push } from 'connected-react-router';

export const actionCreatos = {
  loginUser: (request: IUserLoginRequest) => async (dispatch, getState) => {
    dispatch(loaderActionsCreator.showLoaderWithPleaseWaitText());

    try {
      const result = await UsersAPI.login(request);

      if (result.data.succeeded) {
        localStorage.setItem('token', result.data.response.token);
        dispatch({
          type: LOGIN,
          payload: {
            firstName: result.data.response.firstName,
            lastName: result.data.response.lastName,
            email: result.data.response.email,
            token: result.data.response.token,
          },
        });
      } else {
        console.log(result.data.errors);
      }

      console.log(result);
    } catch (response) {
      console.log(response);
    } finally {
      dispatch(loaderActionsCreator.hideLoader());
    }
  },

  registerUser: (request: IUserRegisterRequest) => async (dispatch, getState) => {
    dispatch(loaderActionsCreator.showLoaderWithPleaseWaitText());

    try {
      const result = await UsersAPI.register(request);

      if (result.data.succeeded) {
        dispatch({
          type: REGISTER,
          payload: {
            success: result.data.response,
          },
        });
        dispatch(push('/login'));
      } else {
        console.log(result.data.errors);
      }

      console.log(result);
    } catch (response) {
      console.log(response);
    } finally {
      dispatch(loaderActionsCreator.hideLoader());
    }
  },

  changeApartament: (apartamentId: number) => async (dispatch, getState) => {
    try {
      if (apartamentId && apartamentId != 0) {
        dispatch({
          type: SWITCH_APARTAMENT,
          payload: {
            selectedApartamentId: apartamentId,
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  authorizeToken: (token: string) => async (dispatch, getState) => {
    try {
      //sprawdzić, czy token różni się od tokena z storage
      const result = await UsersAPI.authorize(token);

      if (!result.data.succeeded) {
        localStorage.removeItem('token');
        dispatch({
          type: LOGOUT,
        });
        dispatch(push('/login'));
      }
    } catch (e) {
      console.log(e);
    }
  },
};
