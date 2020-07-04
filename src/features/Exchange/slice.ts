import { createSlice } from "@reduxjs/toolkit";
import { RootState, StoreDispatch } from "../../store/store";
import { API_URL, UPD_INTERVAL } from "../../config";

export interface Currency {
    code: string,
    symbol: string,
    rate: number,
    description: string,
    rate_float: number
}

export interface ExchangeState {
    bpi: Record<string, Currency>,
    updated: string | null,    
    firstLoading: boolean
}

export const initialState: ExchangeState = {
    bpi: {},
    updated: null,
    firstLoading: false
}

let interval: NodeJS.Timeout;

export const slice = createSlice({
    name: "exchange",
    initialState,
    reducers: {
        updateBpi: (state, action) => {
            const { bpi, time } = action.payload;
            // @ts-ignore
            //state.bpi = Object.entries(bpi).reduce((acc, curr) => {acc.push(curr[1]); return acc}, []);
            state.bpi = bpi;
            state.updated = time.updatedISO;
            state.firstLoading = false;
        },
        setFirstLoading: (state, action) => {
            state.firstLoading = action.payload;
        }
    },
});

export const { updateBpi, setFirstLoading } = slice.actions;

export const startCheckInterval = () =>  (dispatch: StoreDispatch) => {
    console.log('startCheckInterval dispatched')
    dispatch(checkApi());
    dispatch(setFirstLoading(true));

    interval = setInterval(() => {
        dispatch(checkApi());
    }, UPD_INTERVAL);
};

export const stopCheckInterval = () => {
    clearInterval(interval);
};

const checkApi = () => async (dispatch: StoreDispatch) => {
    const response = await fetch(API_URL);
    const json = await response.json();
    dispatch(updateBpi(json));
};

export const selectIsLoading = (state: RootState) => state.exchange.firstLoading;
export const selectBpi = (state: RootState) => state.exchange.bpi;

export default slice.reducer;
