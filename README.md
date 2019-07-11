# symmetric-round

[![Build Status](https://travis-ci.org/DiscoNova/symmetric-round.svg?branch=master)](https://travis-ci.org/DiscoNova/symmetric-round)

A tiny utility function to perform symmetric rounding to integer Numbers.

## Install

`npm install --save symmetric-round`

## Use

If your project only "speaks" CommonJS, you can use:

`const symmetricRound = require('symmetricRound');` 

...but if you're transpiling with (or otherwise have) full ES6 support:

`import symmetricRound from 'symmetricRound';'`

...**should** work as well. At the time of writing (July 2019), native full ES6 import/export support on JavaScript-engines was still making its entrance to the JavaScript ergosphere.

### Why this package exists?

`Math.round()` - is defined in the latest definition of [ECMA-262](http://www.ecma-international.org/ecma-262/10.0/index.html#sec-math.round) (as well as the earlier versions thereof - at the time of writing) - i.e. "The JavaScript Standard" - in such way that

* when the input value is exactly half way between two integer Numbers, the result is the Number value that is closer to positive infinity.

This means that the standard states that the *absolute* value of rounding negative and positive values **is** *asymmetric* by definition; e.g.:

* `Math.round(99.5)` results in `100` while
* `Math.round(-99.5)` results in `-99` ... and ...
 
...this is just one of the weirdnesses of JavaScript that may sometimes come to bite you in the hindside when you least expect it.

In practice - this leads to all sorts of hard-to-pinpoint bugs in your code like:

* calculating discount reimbursements might get a different value than what the original discount was
* drawing charts *may* be "a pixel off" when they reside on the the negative side of chart origo, etc.

...and those are just examples of the situations I have _personally_ witnessed. All because `Math.round()` does not work the way I was taught at school back in the day when dinosaurs roamed the Earth.

### So... Let's round numbers symmetrically instead!

This "tie-breaking method" of rounding Numbers to Integers is known by many names, such as *"round half away from zero"*, *"round half towards nearest infinity"*, *"commercial rounding"* or *"symmetric rounding"*.

With "symmetric rounding", the positive and negative numbers are treated symmetrically and therefore the method is free of overall positive/negative bias (assuming the original numbers are positive or negative with equal probability).

Furthermore, this method of rounding is often used for currency conversions and price roundings etc.

```js
import symmetricRound from 'symmetricRound';

symmetricRound(99.5);  // 100
symmetricRound(-99.5); // -100
```

#### Caveats?

For input values which round to "exactly zero", it must be kept in mind that even while using this function, the output value *does* retain the sign of the input value. While this might *seem* as a blemish, it is a feature caused by the way JavaScript handles Numbers and ... since it actually **does** retain the symmetricity of rounding I saw no reason to change that behaviour.

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
