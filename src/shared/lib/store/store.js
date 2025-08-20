import {configureStore} from "@reduxjs/toolkit";
import howToGetRoutingMode from "./slices/howToGetRoutingMode";
import choiceNewsEvents from "./slices/choiceNewsEvents";
import throughContactsData from "./slices/throughContactsData";
import rentersListFilter from "./slices/rentersListFilter";
import currentVacanciesType from "./slices/currentVacanciesType";
import stocksListFilter from './slices/stocksListFilter';
import stocksListSorting from "./slices/stocksListSorting";
import whatModalShowInStocksPage from "./slices/whatModalShowInStocksPage";

export const store = configureStore({
    reducer: {
        howToGetRoutingMode,
        choiceNewsEvents,
        throughContactsData,
        rentersListFilter,
        currentVacanciesType,
        stocksListFilter,
        stocksListSorting,
        whatModalShowInStocksPage
    }
})
