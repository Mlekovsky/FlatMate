import { LOGIN, SWITCH_APARTAMENT, LOGOUT, SET_USER_INFO, SET_CURRENT_APARTAMENT } from '../../actions/user/UserActionTypes';

const initialState = {
  currentApartamentId: 0,
  firstName: '',
  lastName: '',
  email: '',
  token: '',
};

export const reducer = (state, action) => {
  state = state || initialState;

  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        token: action.payload.token,
      };
    case SWITCH_APARTAMENT:
      return {
        ...state,
        currentApartamentId: action.payload.selectedApartamentId,
      };
    case LOGOUT:
      return {
        ...state,
        currentApartamentId: 0,
        firstName: '',
        lastName: '',
        email: '',
        token: '',
      };
    case SET_USER_INFO:
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
      };
      case SET_CURRENT_APARTAMENT:
        return {
          ...state,
          currentApartamentId: action.payload.currentApartamentId
        }
    default:
      return state;
  }
};
