export const onChange = (value: string | number) => (dispatch, getState) => {
    dispatch({type: "VALUE_CHANGED", payload: {selectedValue: value}})
};

