import reducer, { initialState, setBtcInputValue, addToDropdown, removeFromDropdown, selectActiveCurrencies, selectCurrenciesDropdown, selectBtcInput } from './slice';
import { ExchangeState } from "../Exchange/slice";

const exchangeInitialState: ExchangeState = {
    bpi: {
        USD: {
            code: "USD",
            symbol: "&#36;",
            rate: "9,190.5056",
            description: "United States Dollar",
            rate_float: 9190.5056
        },
        GBP: {
            code: "GBP",
            symbol: "&pound;",
            rate: "7,359.4076",
            description: "British Pound Sterling",
            rate_float: 7359.4076
        },
        EUR: {
            code: "EUR",
            symbol: "&euro;",
            rate: "8,159.4411",
            description: "Euro",
            rate_float: 8159.4411
        }
    },
    updated: "2020-07-02T08:42:00+00:00",
    firstLoading: false
}

describe('Board slice', () => {
    describe('reducer, actions and selectors', () => {
        it('should return the initial state on first run', () => {
            // Arrange
            const nextState = initialState;
            // Act
            const result = reducer(undefined, {});
            // Assert
            expect(result).toEqual(nextState);
        });

        it('should set input value', () => {
            const nextState = reducer(initialState, setBtcInputValue("11.25"));
            const rootState = { board: nextState, exchange: exchangeInitialState };
            expect(selectBtcInput(rootState)).toBe("11.25");
        });

        it('should add text item to dropdown list', () => {
            const nextState = reducer(initialState, addToDropdown("ANY"));
            const rootState = { board: nextState, exchange: exchangeInitialState };
            expect(selectCurrenciesDropdown(rootState)).toContain("ANY");
        });

        it('should remove item from dropdown list', () => {
            const nextState = reducer(initialState, addToDropdown("EUR"));
            const nextState2 = reducer(nextState, removeFromDropdown("EUR"));
            const rootState = { board: nextState2, exchange: exchangeInitialState };
            expect(selectCurrenciesDropdown(rootState)).not.toContain("EUR");
        });

        it('should select all currencies', () => {
            const rootState = { board: initialState, exchange: exchangeInitialState };
            expect(selectActiveCurrencies(rootState)).toEqual(Object.values(exchangeInitialState.bpi));
        });

        it('should select all currencies except EUR', () => {
            const nextState = reducer(initialState, addToDropdown("EUR"));
            const rootState = { board: nextState, exchange: exchangeInitialState };
            expect(selectActiveCurrencies(rootState)).toEqual(Object.values(exchangeInitialState.bpi).filter(curr => curr.code !== "EUR"));
        });
    })
});