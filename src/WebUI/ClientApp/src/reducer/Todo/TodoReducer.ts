import React from 'react';

export const reducer = (state: any, action: { type: any; }) => {
    switch (action.type){
        case 'FETCH_DATA':
            return {...state, value: action.payload.testObject};
        default:
            return state;
    }
}