import {MainListItemsValues} from '../../components/Menu/MainListItemsValues';

const initialState = {
    selectedValue: MainListItemsValues.Home
}

export const reducer = (state, action) => {
    state = state || initialState;

    switch(action.type){
        case "VALUE_CHANGED":
            return{
                ...state,
                selectedValue : action.payload.selectedValue
            };
        default:
            return state;
    }
}