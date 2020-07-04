import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { Currency} from "../Exchange/slice"

interface BoardState {
    btcInput: string,
    ddCurrencyCodes: string[],
}

const initialState: BoardState = {
    btcInput: "1",
    ddCurrencyCodes: [],
}

export const slice = createSlice({
    name: "board",
    initialState,
    reducers: {
        setBtcInputValue: (state, action) => {
            state.btcInput = action.payload;
        },
        addToDropdown: (state, action) => {
            state.ddCurrencyCodes = [...state.ddCurrencyCodes, action.payload];
        },
        removeFromDropdown: (state, action) => {
            state.ddCurrencyCodes = state.ddCurrencyCodes.filter(code => code !== action.payload);
        }
    },
});

export const { setBtcInputValue, addToDropdown, removeFromDropdown } = slice.actions;

export const selectActiveCurrencies = (state: RootState) => {
    const bpi = state.exchange.bpi;
    const bpiArray:Currency[] = Object.values(bpi);
    const dd = state.board.ddCurrencyCodes;
    return bpiArray.filter(curr => !dd.some(code => code === curr.code));
}
export const selectCurrenciesDropdown = (state: RootState) => state.board.ddCurrencyCodes;
export const selectBtcInput = (state: RootState) => state.board.btcInput;

export default slice.reducer;
