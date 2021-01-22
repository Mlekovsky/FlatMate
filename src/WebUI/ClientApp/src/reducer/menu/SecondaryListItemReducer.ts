import {SecondaryListItemsValues} from '../../components/Menu/SecondaryListItemsValues';

const initialState = {
    selectedValue: SecondaryListItemsValues.Login
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