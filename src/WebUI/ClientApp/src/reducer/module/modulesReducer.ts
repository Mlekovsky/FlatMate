import { GET_MODULES } from '../../actions/module/moduleActionType';

const initialState = {
  modulesList: [],
};

export const reducer = (state, action) => {
  state = state || initialState;

  switch (action.type) {
    case GET_MODULES:
      return {
        ...state,
        modulesList: action.payload.modulesList,
      };
    default:
      return state;
  }
};
