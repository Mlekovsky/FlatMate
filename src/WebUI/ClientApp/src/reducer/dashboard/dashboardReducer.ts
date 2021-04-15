import { SET_AVAILABLE_LIST, SET_LIST } from '../../actions/dashboard/dashboardActionTypes';

const initialState = {
  apartamentList: [],
  availableApartamentList: [],
};

export const reducer = (state, action) => {
  state = state || initialState;

  switch (action.type) {
    case SET_AVAILABLE_LIST:
      return {
        ...state,
        availableApartamentList: action.payload.availableApartamentList,
      };
    case SET_LIST:
      return {
        ...state,
        apartamentList: action.payload.apartamentList,
      };
    default:
      return state;
  }
};
