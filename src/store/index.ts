import { combineReducers, configureStore } from '@reduxjs/toolkit';
import boardReducer from "../features/Board/slice";
import exchangeReducer from "../features/Exchange/slice";

export const reducer = combineReducers({
    board: boardReducer,
    exchange: exchangeReducer
})

const store = configureStore({
    reducer
})

export default store;