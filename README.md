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

```js
var parser = new NumberParser();

// Format decimal numbers
assert.equal('123',        parser.parseValue(123, "%d"));
assert.equal('0045',       parser.parseValue(45, "%-04d"));

// Format floating point numbers
assert.equal('123.46',     parser.parseValue(123.4567, "%.2f"));
assert.equal('45.000',     parser.parseValue(45, "%.3f"));

// Format a currency value (symbols can be freely appended or prepended to the format)
assert.equal('$123.46',    parser.parseValue(123.456, "$%.2f"));

// Format a percentage value
assert.equal('45.20%',     parser.parseValue(45.2, "%.2f%"));

// Add thousands separators using the "s" flag
assert.equal('10,000',     parser.parseValue(10000, "%sd"));
assert.equal('2,345.67',   parser.parseValue(2345.67, "%sf"));

// You can also customize the formatting by passing in an options object
var customParser = new NumberParser({ separator: '.', decimalPoint: ',' });
assert.equal('€10.500,25', customParser.parseValue(10500.25, "€%sf"));
```

