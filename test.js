var formatNumber = require('./numberparser');
var assert = require('assert');

describe('formatNumber(value, format, separator)', function() {
    it('should format decimal values', function() {
        assert.equal('123', formatNumber(123, "%d"));
        assert.equal('000123', formatNumber(123, "%06d"));
        assert.equal('999999123', formatNumber(123, "%99d"));
    });

    it('should format floating values', function() {
        assert.equal('123.45', formatNumber(123.45, "%f"));
        assert.equal('123.46', formatNumber(123.4567, "%.2f"));
        assert.equal('100.0',  formatNumber(123.45, "%1.1f"));
        assert.equal('123.45', formatNumber(123.45, "%12f"));
        assert.equal('123.45000000', formatNumber(123.45, "%.8f"));
    });

    it('should format value with symbols', function() {
        assert.equal('$123.456', formatNumber(123.456, "$%.3f"));
        assert.equal('45.75%', formatNumber(45.75, "%.2f%"));
        assert.equal('$10.500,25', formatNumber(10500.25, "$%sf", { separator: '.', decimalPoint: ',' }));
    });

    it('should format integers with separators', function() {
        assert.equal('100', formatNumber(100, "%sd"));
        assert.equal('1,000', formatNumber(1000, "%sd"));
        assert.equal('10,000', formatNumber(10000, "%sd"));
        assert.equal('100,000', formatNumber(100000, "%sd"));
        assert.equal('1,000,000', formatNumber(1000000, "%sd"));
        assert.equal('1,000,000,000', formatNumber(1000000000, "%sd"));
        assert.equal('1,000,000,000,000', formatNumber(1000000000000, "%sd"));
    });

    it('should format floats with separators', function() {
        assert.equal('100.55', formatNumber(100.55, "%sf"));
        assert.equal('1,000.55', formatNumber(1000.55, "%sf"));
        assert.equal('10,000.55', formatNumber(10000.55, "%sf"));
        assert.equal('100,000.55', formatNumber(100000.55, "%sf"));
        assert.equal('1,000,000.55', formatNumber(1000000.55, "%sf"));
        assert.equal('1,000,000,000.55', formatNumber(1000000000.55, "%sf"));
        assert.equal('1,000,000,000,000.55', formatNumber(1000000000000.55, "%16sf"));
    });

    it('should not add separators to the remainder', function() {
        assert.equal('100.555555', formatNumber(100.555555, "%.6f"));
    });
});
