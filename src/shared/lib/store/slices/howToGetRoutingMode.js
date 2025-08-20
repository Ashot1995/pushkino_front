import {createSlice} from "@reduxjs/toolkit";

const howToGetRoutingMode = createSlice({
    name: 'howToGetRoutingMode',
    initialState: {
        value: 'auto',
    },
    reducers: {
        changeRoutingMode: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const {changeRoutingMode} = howToGetRoutingMode.actions;
export default howToGetRoutingMode.reducer;
