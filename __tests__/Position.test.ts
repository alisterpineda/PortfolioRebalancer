import { Position } from '../src/Position';

describe("getValue()", () => {
    const subject = new Position();
    subject.price = 123;
    subject.quantity = 3;

    test("with includeDelta set to false", () => {
        expect(subject.getValue(false)).toBeCloseTo(369);
    })

    describe("with includeDelta set to true", () => {
        test("and deltaQuantity set to zero", () => {
            subject.deltaQuantity = 0;
            expect(subject.getValue(true)).toBeCloseTo(369);
        })

        test("and deltaQuantity set to one", () => {
            subject.deltaQuantity = 1;
            expect(subject.getValue(true)).toBeCloseTo(492);
        })

        test("and deltaQuantity set to negative one", () => {
            subject.deltaQuantity = -1;
            expect(subject.getValue(true)).toBeCloseTo(246);
        })
    });
})