import {createSlice} from "@reduxjs/toolkit";

const stocksListSorting = createSlice({
    name: 'stocksListSorting',
    initialState: {
        value: {
            selectedTypeSort: 'start_date',
        },
    },
    reducers: {
        changeStocksTypeSort: (state, action) => {
            state.value.selectedTypeSort = action.payload;
        },
    },
});

export const {changeStocksTypeSort} = stocksListSorting.actions;

export default stocksListSorting.reducer;
