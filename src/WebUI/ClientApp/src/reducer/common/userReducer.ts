import { LOGIN, REGISTER } from '../../actions/user/UserActionTypes';

const initialState = {
  currentApartamentId: 0,
  firstName: '',
  lastName: '',
  email: '',
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
      };
    default:
      return state;
  }
};
