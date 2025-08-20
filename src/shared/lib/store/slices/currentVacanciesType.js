import {createSlice} from "@reduxjs/toolkit";

const currentVacanciesType = createSlice({
    name: 'currentVacanciesType',
    initialState: {
        value: 'Все вакансии',
    },
    reducers: {
        changeVacanciesType: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const {changeVacanciesType} = currentVacanciesType.actions;

export default currentVacanciesType.reducer;
