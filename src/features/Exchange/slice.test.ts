import reducer, { initialState, updateBpi, setFirstLoading, selectIsLoading, selectBpi } from './slice';
import { initialState as boardState } from "../Board/slice";

const mockJson = {
    time: {
        updated: "Jul 2, 2020 08:42:00 UTC",
        updatedISO: "2020-07-02T08:42:00+00:00",
        updateduk: "Jul 2, 2020 at 09:42 BST"
    },
    disclaimer: "This data was produced from the CoinDesk Bitcoin Price Index (USD). Non-USD currency data converted using hourly conversion rate from openexchangerates.org",
    chartName: "Bitcoin",
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
    }
}


describe('Exchange slice', () => {
      
    describe('reducer, actions and selectors', () => {
        it('should return the initial state on first run', () => {
            // Arrange
            const nextState = initialState;
            // Act
            const result = reducer(undefined, {});
            // Assert
            expect(result).toEqual(nextState);
        });

        it('should set loading to true', () => {
            const nextState = reducer(initialState, setFirstLoading(true));
            const rootState = { exchange: nextState, board: boardState };
            expect(selectIsLoading(rootState)).toBe(true);
        });

        it('should update BPI whith right JSON data', () => {
            const nextState = reducer(initialState, updateBpi(mockJson));
            const rootState = { exchange: nextState, board: boardState };
            expect(selectBpi(rootState)).toBe(mockJson.bpi);
        });

    })
});