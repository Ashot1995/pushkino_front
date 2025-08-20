import {createSlice} from "@reduxjs/toolkit";

const choiceNewsEvents = createSlice({
    name: 'choiceNewsEvents',
    initialState: {
        value: 'all',
    },
    reducers: {
        chooseNewsEvents: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const {chooseNewsEvents} = choiceNewsEvents.actions;
export default choiceNewsEvents.reducer;
