var NumberParser = require('./numberparser');
var assert = require('assert');

var globalParser = new NumberParser();

function testSuccessCall(expected, value, format) {
    assert.equal(expected, globalParser.parseValue(value, format));
}

function testErrorCall(value, format) {
    assert.throws(function() {
        globalParser.parseValue(value, format);
    }, Error);
}

describe('value, format, options)', function() {
    it('should format decimal values', function() {
        testSuccessCall('123', 123, "%d");
        testSuccessCall('123000', 123, "%06d");
        testSuccessCall('000123', 123, "%-06d");
        testSuccessCall('999999123', 123, "%-99d");
    });

    it('should format floating values', function() {
        testSuccessCall('123.45', 123.45, "%f");
        testSuccessCall('123.46', 123.4567, "%.2f");
        testSuccessCall('100.0',  123.45, "%1.1f");
        testSuccessCall('123.45', 123.45, "%12f");
        testSuccessCall('123.45000000', 123.45, "%.8f");
    });

    it('should format value with symbols', function() {
        testSuccessCall('$123.456', 123.456, "$%.3f");
        testSuccessCall('45.75%', 45.75, "%.2f%");
    });

    it('should format integers with separators', function() {
        testSuccessCall('100', 100, "%sd");
        testSuccessCall('1,000', 1000, "%sd");
        testSuccessCall('10,000', 10000, "%sd");
        testSuccessCall('100,000', 100000, "%sd");
        testSuccessCall('1,000,000', 1000000, "%sd");
        testSuccessCall('1,000,000,000', 1000000000, "%sd");
        testSuccessCall('1,000,000,000,000', 1000000000000, "%sd");
    });

    it('should format floats with separators', function() {
        testSuccessCall('100.55', 100.55, "%sf");
        testSuccessCall('1,000.55', 1000.55, "%sf");
        testSuccessCall('10,000.55', 10000.55, "%sf");
        testSuccessCall('100,000.55', 100000.55, "%sf");
        testSuccessCall('1,000,000.55', 1000000.55, "%sf");
        testSuccessCall('1,000,000,000.55', 1000000000.55, "%sf");
        testSuccessCall('1,000,000,000,000.55', 1000000000000.55, "%16sf");
    });

    it('should not add separators to the remainder', function() {
        testSuccessCall('1,000.555555', 1000.555555, "%.6sf");
    });

    it('should allow of overriding of default symbol formatting', function() {
        var customParser = new NumberParser({ separator: '.', decimalPoint: ',' });
        assert.equal('€10.500,25', customParser.parseValue(10500.25, "€%sf"));
    });

    it('should throw an error if the format cannot be parsed', function() {
        testErrorCall(123, "%x");
        testErrorCall(123, "%abcd");
        testErrorCall(123, "%&92d");
        testErrorCall(123, "%2.2d");
        testErrorCall(123, "%2.2.2f");
    });
});
