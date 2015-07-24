# NumberParser
A simple number formatting utility for `Javascript` and `Node.js`

#### Installation

Installation via NPM

```
TODO
```

Installation via Bower

```
TODO
```

#### Using the library

`NumberParser` is extremely easy to use and introduces a global method that can be imported called.
`formatNumber`. It can be executed similar to a `sprintf` statement in `C`.

```js
// Format decimal numbers
assert.equal('123',       formatNumber(123, "%d"));
assert.equal('0045',      formatNumber(45, "%04d"));

// Format floating point numbers
assert.equal('123.46',    formatNumber(123.4567, "%.2f"));
assert.equal('45.000',    formatNumber(45, "%.3f"));

// Format a currency value (symbols can be freely appended or prepended to the format)
assert.equal('$123.46',   formatNumber(123.456, "$%.2f"));

// Format a percentage value
assert.equal('45.20%',    formatNumber(45.2, "%.2f%"));

// Add thousands separators using the "s" flag
assert.equal('10,000',    formatNumber(10000, "%sd"));
assert.equal('2,345.67',  formatNumber(2345.67, "%sf"));

// You can also customize the formatting by passing in an options object
assert.equal('$10.500,25', formatNumber(10500.25, "$%sf", { separator: '.', decimalPoint: ',' }));
```

