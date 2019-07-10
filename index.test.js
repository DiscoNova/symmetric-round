
const symmetricRound = require('./index.js').default;

expect(symmetricRound).toBeDefined();

describe('symmetricRound() is nice because it does', () => {

    test('round numbers symmetrically', () => {
        expect(symmetricRound(0.5)).toBe(1);
        expect(symmetricRound(-0.5)).toBe(-1); // Symmetric result for negative input
        expect(symmetricRound(1234.5)).toBe(1235);
        expect(symmetricRound(-1234.5)).toBe(-1235); // Symmetric result for negative input
        expect(symmetricRound(0.1)).toBe(0);
        expect(symmetricRound(-0.1)).toBe(-0);
    });

    test('not get spooked too easily', () => {
        expect(symmetricRound(Infinity)).toBe(Infinity);
        expect(symmetricRound(Number.NaN)).toBe(NaN);
        expect(symmetricRound(Number.POSITIVE_INFINITY)).toBe(Infinity);
        expect(symmetricRound(Number.NEGATIVE_INFINITY)).toBe(-Infinity);
    });

    test('handle type coercions properly', () => {
        expect(symmetricRound('0.5')).toBe(1);
        expect(symmetricRound('-0.5')).toBe(-1); // Symmetric result for negative input
        expect(symmetricRound({ toString: () => '0.5' })).toBe(1);
        expect(symmetricRound({ toString: () => '-0.5' })).toBe(-1); // Symmetric result for negative input
        expect(symmetricRound([] + .5)).toBe(1);
        expect(symmetricRound([] - .5)).toBe(-1); // Symmetric result for negative input
        expect(symmetricRound({} + .5)).toBe(NaN);
        expect(symmetricRound({} - .5)).toBe(NaN);
        // This may look like asymmetric, but it is not...
        expect(symmetricRound(true + false + .5)).toBe(2); // true + false = 1
        expect(symmetricRound(false + true + .5)).toBe(2); // false + true = 1
        expect(symmetricRound(true - false - .5)).toBe(1); // true - false = 1
        expect(symmetricRound(false - true - .5)).toBe(-2); // (false - true) = -1
    });
});

// For comparison's sake (plus - to assert that JavaScript's internal implementation doesn't change...)

describe('Math.round() - on the other hand - does', () => {
    test('round numbers _asymmetrically_', () => {
        expect(Math.round(0.5)).toBe(1);
        expect(Math.round(-0.5)).toBe(-0); // Asymmetric result for negative input
        expect(Math.round(1234.5)).toBe(1235);
        expect(Math.round(-1234.5)).toBe(-1234); // Asymmetric result for negative input
        expect(Math.round(0.1)).toBe(0);
        expect(Math.round(-0.1)).toBe(-0);
    });

    test('not get spooked too easily', () => {
        expect(Math.round(Infinity)).toBe(Infinity);
        expect(Math.round(Number.NaN)).toBe(NaN);
        expect(Math.round(Number.POSITIVE_INFINITY)).toBe(Infinity);
        expect(Math.round(Number.NEGATIVE_INFINITY)).toBe(-Infinity);
    });

    test('handle type coercions properly', () => {
        expect(Math.round('0.5')).toBe(1);
        expect(Math.round('-0.5')).toBe(-0); // Asymmetric result for negative input
        expect(Math.round({ toString: () => '0.5' })).toBe(1);
        expect(Math.round({ toString: () => '-0.5' })).toBe(-0); // Asymmetric result for negative input
        expect(Math.round([] + .5)).toBe(1);
        expect(Math.round([] - .5)).toBe(-0); // Asymmetric result for negative input
        expect(Math.round({} + .5)).toBe(NaN);
        expect(Math.round({} - .5)).toBe(NaN);
        // This may look like symmetric, but it is not...
        expect(Math.round(true + false + .5)).toBe(2); // true + false = 1
        expect(Math.round(false + true + .5)).toBe(2); // false + true = 1
        expect(Math.round(true - false - .5)).toBe(1); // true - false = 1
        expect(Math.round(false - true - .5)).toBe(-1); // (false - true) = -1
    });
});
