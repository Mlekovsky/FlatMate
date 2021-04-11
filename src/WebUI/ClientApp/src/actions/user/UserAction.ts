import { actionCreators as loaderActionsCreator } from '../common/loaderAction';
import { UsersAPI } from '../../api/UserAPI';
import { LOGIN, REGISTER } from './UserActionTypes';
import { IUser, IUserLoginRequest, IUserRegisterRequest } from 'src/types/User';

export const actionCreatos = {
  loginUser: (request: IUserLoginRequest) => async (dispatch, getState) => {
    dispatch(loaderActionsCreator.showLoaderWithPleaseWaitText());

    try {
      const result = await UsersAPI.login(request);

      if (result.data.succeded) {
        localStorage.setItem('token', result.data.response.token);
        dispatch({
          type: LOGIN,
          payload: {
            firstName: result.data.response.firstName,
            lastName: result.data.response.lastName,
            email: result.data.response.email,
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

      if (result.data.succeded) {
        localStorage.setItem('token', result.data.response.token);
        dispatch({
          type: REGISTER,
          payload: {
            success: result.data.response,
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
};
