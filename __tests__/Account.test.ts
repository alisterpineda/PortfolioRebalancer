import { Account } from '../src/Account';
import { Position } from '../src/Position';

describe("Class 'Account'", () => {
    let subject: Account;
    beforeEach(() => {
        subject = new Account();
    });
    
    describe("function 'getTotalValue'", () => {
        beforeEach(() => {
            subject.cash = 1234;
            subject.positions = [
                new Position({symbol: 'abc', quantity: 1, price: 12.34, deltaQuantity: 0}),
                new Position({symbol: 'def', quantity: 3, price: 56.78, deltaQuantity: -1}),
                new Position({symbol: 'ghi', quantity: 5, price: 910.11, deltaQuantity: 1})
            ];
        });
        test("with includeDelta set to false", () => {
            expect(subject.getTotalValue(false)).toBeCloseTo(5967.23);
        });
        test("with includeDelta set to true", () => {
            expect(subject.getTotalValue(true)).toBeCloseTo(6820.56);
        });
    });

    describe("function 'getTotalWeight'", () => {
        beforeEach(() => {
            subject.cash = 1234;
            subject.positions = [
                new Position({symbol: 'abc', weight: 123}),
                new Position({symbol: 'def', weight: 456}),
                new Position({symbol: 'ghi', weight: 789})
            ];
        })
        test("returns sum of Position weights", () => {
            expect(subject.getTotalWeight()).toBeCloseTo(1368);
        });
    });

    describe("function 'getScore'", () => {
        beforeEach(() => {
            subject.cash = 1234.99;
            subject.deltaCash = 12.01;
            subject.positions = [
                new Position({symbol: 'abc', quantity: 1, price: 12.34, deltaQuantity: 0, weight: 123}),
                new Position({symbol: 'def', quantity: 3, price: 56.78, deltaQuantity: -1, weight: 456}),
                new Position({symbol: 'ghi', quantity: 5, price: 910.11, deltaQuantity: 1, weight: 789})
            ];
        });
        test("returns score", () => {
            expect(subject.getScore()).toBeCloseTo(0.4368135380080558);
        });
    });

    describe("function 'balance'", () => {
        beforeEach(() => {
            subject.cash = 50000.00;
            subject.positions = [
                new Position({symbol: 'abc', quantity: 20, price: 1000.00, weight: 10}),
                new Position({symbol: 'def', quantity: 5, price: 2000.00, weight: 30}),
                new Position({symbol: 'ghi', quantity: 4, price: 5000.00, weight: 60})
            ];
        });
        test("with buyOnly set to false", () => {
            const initialScore = subject.getScore();

            subject.balance();

            expect(subject.getTotalValue(true)).toBe(subject.getTotalValue());
            expect(subject.getScore()).toBeLessThan(initialScore);
            expect(subject.getAllocation(subject.positions[0], true)).toBeCloseTo(0.10);
            expect(subject.getAllocation(subject.positions[1], true)).toBeCloseTo(0.30);
            expect(subject.getAllocation(subject.positions[2], true)).toBeCloseTo(0.60);
        });
        test("with buyOnly set to true", () => {
            const initialScore = subject.getScore();

            subject.balance(true);

            expect(subject.getTotalValue(true)).toBe(subject.getTotalValue());
            expect(subject.getScore()).toBeLessThan(initialScore);
        });
    });
})