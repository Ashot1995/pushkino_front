import {createSlice} from "@reduxjs/toolkit";

const setSubscribeEmail = createSlice({
    name: 'setSubscribeEmail',
    initialState: {
        value: {
            puk: false
        },
    },
    reducers: {
        changeSetSubscribeEmail: (state) => {
            state.value.puk =  !state.value.puk;
        },
    },
});

export const {changeSetSubscribeEmail} = setSubscribeEmail.actions;
export default setSubscribeEmail.reducer;
