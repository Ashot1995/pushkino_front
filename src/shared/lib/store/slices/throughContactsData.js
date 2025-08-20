import {createSlice} from "@reduxjs/toolkit";

const throughContactsData = createSlice({
    name: 'throughContactsData',
    initialState: {
        value: {},
    },
    reducers: {
        addThroughContactsData: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const {addThroughContactsData} = throughContactsData.actions;
export default throughContactsData.reducer;
