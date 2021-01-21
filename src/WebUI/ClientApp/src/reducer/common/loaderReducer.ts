import {
    SET_LOADER_ACTIVITY,
  } from '../../actions/common/loaderAction';
  
  const initialState = {
    isVisible: false,
    text: null,
  };
  
  export const reducer = (state, action) => {
    state = state || initialState;
  
    switch (action.type) {
      case SET_LOADER_ACTIVITY:
        return {
          ...state,
          isVisible: action.payload.isVisible,
          text: action.payload.text
        };
      default:
        return state;
    }
  };
  