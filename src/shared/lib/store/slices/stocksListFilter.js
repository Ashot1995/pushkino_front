import {createSlice} from "@reduxjs/toolkit";

const stocksListFilter = createSlice({
    name: 'stocksListFilter',
    initialState: {
        value: {
            selectedSubCategory: '',
        },
    },
    reducers: {
        changeStocksSubCategory: (state, action) => {
            state.value.selectedSubCategory = action.payload;
        },
    },
});

export const {changeStocksSubCategory} = stocksListFilter.actions;

export default stocksListFilter.reducer;
