import { CLEAR_INFO, SET_INFO, UPDATE_INFO, UPDATE_MODULES } from '../../actions/apartament/apartamentActionTypes';

const initialState = {
  id: 0,
  shortName: '',
  city: '',
  address: '',
  currentModules: [],
};

export const reducer = (state, action) => {
  state = state || initialState;

  switch (action.type) {
    case SET_INFO:
      return {
        ...state,
        shortName: action.payload.shortName,
        city: action.payload.city,
        address: action.payload.address,
        currentModules: action.payload.currentModules,
        id: action.payload.id,
      };
    case UPDATE_MODULES:
      return {
        ...state,
        currentModules: action.payload.currentModules,
      };
    case CLEAR_INFO:
      return {
        ...state,
        id: 0,
        shortName: '',
        city: '',
        address: '',
        currentModules: [],
      };
      case UPDATE_INFO:
        return {
          ...state,
          shortName: action.payload.shortName,
          city: action.payload.city,
          address: action.payload.address
        };
      
    default:
      return state;
  }
};
