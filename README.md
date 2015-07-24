# NumberParser
A simple number formatting utility for Javascript and Node.js

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
assert.equal('123',       formatNumber(123, "%d"));
assert.equal('123.46',    formatNumber(123.4567, "%.2f"));
assert.equal('1,000,000', formatNumber(1000000, "%d", ","));
assert.equal('$123.456',  formatNumber(123.456, "$%.3f"));
```

