var formatNumber = require('./numberparser');
var assert = require('assert');

describe('formatNumber(value, format, separator)', function() {
    it('should format numbers without separators', function() {
        assert.equal('0058', formatNumber(58, "%04d"));
        assert.equal('$2.35', formatNumber(2.3456, "$%.2f"));
    });

    it('should format numbers with separators', function() {
        assert.equal('0,000,058', formatNumber(58, "%08d", ","));
        assert.equal('$2,456.79', formatNumber(23456.789, "$%.2f", ","));
    });
});
