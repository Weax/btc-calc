import { roundToCents } from "./utils";

describe('Utils', () => {
    describe('roundToCents', () => {
        it('should round up to 2 decimals', () => {
            const res = roundToCents(1.2195);
            expect(res).toEqual("1.22");
        });
        it('should round down to 2 decimals', () => {
            const res = roundToCents(1.2146);
            expect(res).toEqual("1.21");
        });
        it('should have zero at the end', () => {
            const res = roundToCents(1.20001);
            expect(res).toEqual("1.20");
        });
    });
});