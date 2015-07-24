/**
 * A simple number formatting utility for Javascript and Node.js
 *
 * @author  Matthew Cross <blacklightgfx@gmail.com>
 * @package NumberParser
 */
(function() {

var NumberParser = function() {
    this.INTEGER_REGEX     = /%([0-9])?(\d+)?d/;
    this.FLOAT_REGEX       = /%(\d+)?\.?(\d+)?f/;
    this.FORMAT_REGEX      = /%.*([df])/;
    this.DEFAULT_DIGIT     = '0';
    this.DEFAULT_WIDTH     = null;
    this.DEFAULT_PRECISION = 12;
    this.DEFAULT_SCALE     = 2;
}

NumberParser.prototype.parseValue = function(value, format, separator) {
    var matches = format.match(this.FORMAT_REGEX);
    if (!matches || matches.length < 2 || !matches[1]) {
        throw new Error("Could not parse " + format);
    }

    var result = value;
    switch (matches[1]) {
        case 'd':
            result = this.formatInteger(value, format);
            break;
        case 'f':
            result = this.formatFloat(value, format);
            break;
        default:
            throw new Error('Unknown format type "' + matches[1] + '" was given');
    }

    if (separator) {
        result = this.addSeparators(result, separator);
    }
    return result;
}

NumberParser.prototype.formatInteger = function(value, format) {
    var formatParts = this.extractIntegerFormat(format);
    if (formatParts) {
        value = this.zeroFillValue(value, formatParts.digit, formatParts.width);
    }
    return format.replace(this.INTEGER_REGEX, value);
}

NumberParser.prototype.extractIntegerFormat = function(format) {
    var matches = format.match(this.INTEGER_REGEX);
    if (!matches || matches.length < 3) {
        return null;
    }

    return {
        digit: matches[1] ? matches[1] : this.DEFAULT_DIGIT,
        width: matches[2] ? matches[2] : this.DEFAULT_WIDTH
    };
}

NumberParser.prototype.zeroFillValue = function(value, digit, width) {
    if (!width || width < 0) {
        return value;
    }

    var padding = "";
    var index = 0;
    while (index++ < width) {
        padding += digit;
    }
    return (padding + value).slice(-width);
}

NumberParser.prototype.formatFloat = function(value, format) {
    var formatParts = this.extractFloatFormat(format);
    if (!formatParts) {
        return value;
    }

    var newPrecision = parseFloat(value).toPrecision(formatParts.precision);
    var newScale = parseFloat(newPrecision).toFixed(formatParts.scale);
    return format.replace(this.FLOAT_REGEX, newScale);
}

NumberParser.prototype.extractFloatFormat = function(format) {
    var matches = format.match(this.FLOAT_REGEX);
    if (!matches || matches.length < 3 || (!matches[1] && !matches[2])) {
        return null;
    }

    return {
        precision: matches[1] ? matches[1] : this.DEFAULT_PRECISION,
        scale: matches[2] ? matches[2] : this.DEFAULT_SCALE
    };
}

NumberParser.prototype.addSeparators = function(value, separator) {
    if (!value) {
        return value;
    }

    var splitValue = value.toString().split(".");
    var tempValue = this.injectSeparators(splitValue[0], separator);

    if (splitValue.length == 2) {
        tempValue += "." + splitValue[1];
    }

    return tempValue;
}

NumberParser.prototype.injectSeparators = function(value, separator) {
    var tempValue = value;
    if (tempValue.length < 4) {
        return tempValue;
    }

    tempValue = tempValue.replace(/(\d\d\d)$/g, separator + "$1");
    while (/(\d\d\d\d)[,.]/g.test(tempValue)) {
        tempValue = tempValue.replace(/([^,.])(\d\d\d)([,.])/g, "$1" + separator + "$2$3");
    }
    return tempValue;
}

var cachedNumberParser = null;

function formatNumber(value, format, separator) {
    if (!cachedNumberParser) {
        cachedNumberParser = new NumberParser();
    }
    return cachedNumberParser.parseValue(value, format, separator);
}

if (module && module.exports) {
    module.exports = formatNumber;
}

})();
