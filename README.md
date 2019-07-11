# symmetric-round

[![Build Status](https://travis-ci.org/DiscoNova/symmetric-round.svg?branch=master)](https://travis-ci.org/DiscoNova/symmetric-round)

A tiny utility function to perform symmetric rounding to integer Numbers.

## Why?

ECMA-262 defines `Math.round()` in such way that when the input value is exactly half way between two integer Numbers, the result is the Number value that is closer to positive infinity. This means that the absolute value of rounding negative and positive values is asymmetric; for example:

`Math.round(99.5)` results in `100` while `Math.round(-99.5)` results in `-99` ... and this is just one of the weirdnesses of JavaScript that may sometimes come to bite you in the hindside when you least expect it.

This leads to all sorts of hard-to-pinpoint bugs like:

* calculating discount reimbursements may get a different value than what the original discount was
* drawing charts may be "a pixel off" on the on the negative side of chart origo, etc.

...and those are just examples of the situations I have personally witnessed. All because `Math.round()` does not work the way I was taught at school back in the day when dinosaurs roamed the Earth.

## Let's round numbers symmetrically

This tie-breaking method of rounding is known by many names, such as "round half away from zero", "round half towards nearest infinity", "commercial rounding" or "symmetric rounding". Positive and negative numbers are treated symmetrically and therefore the method is free of overall positive/negative bias (assuming the original numbers are positive or negative with equal probability). This method of rounding is often used for currency conversions and price roundings etc.

```js
import symmetricRound from 'symmetricRound';

symmetricRound(99.5);  // 100
symmetricRound(-99.5); // -100
```

For input values which round to zero, it must be kept in mind that the output value retains the sign of the input value. While this might *seem* as a blemish, it is a feature caused by the way JavaScript handles Numbers and ... since it actually does retain the symmetricity of rounding I saw no reason to change that behaviour.

In real life, this is insignificant since:

```js
(-0) === (+0); // true
(-0) === (0);  // true
(+0) === (0);  // true
```

However, it is good to keep in mind that:

```js
Object.is((-0), (+0)); // false
Object.is((-0), (0));  // false
Object.is((+0), (0));  // true
```
