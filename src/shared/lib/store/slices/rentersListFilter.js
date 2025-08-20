import {createSlice} from "@reduxjs/toolkit";

const rentersListFilter = createSlice({
    name: 'rentersListFilter',
    initialState: {
        value: {
            viewMode: 'tiles',
            selectedCategories: '',
            selectedFloors: '',
            hasNew: false,
            hasStock: false,
            searchInputValue: ''
        },
    },
    reducers: {
        changeViewModeRentersList: (state, action) => {
            state.value.viewMode = action.payload;
        },

        changeRentersCategories: (state, action) => {
            state.value.selectedCategories = action.payload;
        },

        changeRentersFloors: (state, action) => {
            state.value.selectedFloors = action.payload;
        },

        changeHasNewRentersList: (state, action) => {
            state.value.hasNew = action.payload;
        },

        changeHasStockRentersList: (state, action) => {
            state.value.hasStock = action.payload;
        },

        changeSearchRentersInputValue: (state, action) => {
            state.value.searchInputValue = action.payload;
        },
    },
});

export const {
    changeViewModeRentersList,
    changeRentersCategories,
    changeRentersFloors,
    changeHasNewRentersList,
    changeHasStockRentersList,
    changeSearchRentersInputValue,
} = rentersListFilter.actions;

export default rentersListFilter.reducer;
