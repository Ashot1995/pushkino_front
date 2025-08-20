import {createSlice} from "@reduxjs/toolkit";

const whatModalShowInStocksPage = createSlice({
    name: 'stocksListSorting',
    initialState: {
        value: {
            showModal: '',
        },
    },
    reducers: {
        changeStocksModal: (state, action) => {
            state.value.showModal = action.payload;
        },
    },
});

export const {changeStocksModal} = whatModalShowInStocksPage.actions;

export default whatModalShowInStocksPage.reducer;
