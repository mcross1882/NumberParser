/**
 * A simple number formatting utility for Javascript and Node.js
 *
 * @author  Matthew Cross <blacklightgfx@gmail.com>
 * @package NumberParser
 */
(function() {

var NumberParser = function(options) {
    options = options || {};
    var separator = options.separator ? options.separator : ',';
    var decimalPoint = options.decimalPoint ? options.decimalPoint : '.';

    this.INTEGER_REGEX     = new RegExp('%([-+])?([0-9])?(\\d+)?([s])?d');
    this.FLOAT_REGEX       = new RegExp('%(\\d+)?' + decimalPoint + '?(\\d+)?([s])?f');
    this.FORMAT_REGEX      = new RegExp('%.*?([s])?([df])');
    this.DEFAULT_DIGIT     = '0';
    this.DEFAULT_WIDTH     = null;
    this.DEFAULT_PRECISION = 12;
    this.DEFAULT_SCALE     = 2;

    this.separator = separator;
    this.decimalPoint = decimalPoint;
}

NumberParser.prototype.parseValue = function(value, format) {
    var parts = this.extractFormatParts(format);
    var result = value;
    switch (parts.formatType) {
        case 'd':
            result = this.formatInteger(value, format);
            break;
        case 'f':
            result = this.formatFloat(value, format);
            break;
        default:
            throw new Error('Unknown format type "' + parts.formatType + '" was given');
    }

    if (parts.usingSeparator) {
        result = this.addSeparators(result);
    }

    return result;
}

NumberParser.prototype.extractFormatParts = function(format) {
    var matches = format.match(this.FORMAT_REGEX);
    if (!matches || matches.length < 3 || !matches[2]) {
        throw new Error("Could not parse " + format);
    }

    return {
        usingSeparator: 's' == matches[1],
        formatType: matches[2]
    };
}

NumberParser.prototype.formatInteger = function(value, format) {
    var formatParts = this.extractIntegerFormat(format);
    if (formatParts && formatParts.padLeft) {
        value = this.addLeftPadding(value, formatParts.digit, formatParts.width);
    } else {
        value = this.addRightPadding(value, formatParts.digit, formatParts.width);
    }

    return format.replace(this.INTEGER_REGEX, value);
}

NumberParser.prototype.extractIntegerFormat = function(format) {
    var matches = format.match(this.INTEGER_REGEX);
    if (!matches || matches.length < 4) {
        return null;
    }

    return {
        padLeft: '-' == matches[1],
        digit:   matches[2] ? matches[2] : this.DEFAULT_DIGIT,
        width:   matches[3] ? matches[3] : this.DEFAULT_WIDTH
    };
}

NumberParser.prototype.addLeftPadding = function(value, digit, width) {
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

NumberParser.prototype.addRightPadding = function(value, digit, width) {
    if (!width || width < 0) {
        return value;
    }

    var padding = value.toString();
    var index = padding.length;
    while (index++ < width) {
        padding += digit;
    }
    return padding;
}

NumberParser.prototype.formatFloat = function(value, format) {
    var formatParts = this.extractFloatFormat(format);
    if (!formatParts) {
        return value;
    }

    var newPrecision = parseFloat(value).toPrecision(formatParts.precision);
    var newScale = parseFloat(newPrecision).toFixed(formatParts.scale);
    return format.replace(this.FLOAT_REGEX, newScale).replace(/[,.]/g, this.decimalPoint);
}

NumberParser.prototype.extractFloatFormat = function(format) {
    var matches = format.match(this.FLOAT_REGEX);
    if (!matches || matches.length < 3) {
        return null;
    }

    return {
        precision: matches[1] ? matches[1] : this.DEFAULT_PRECISION,
        scale: matches[2] ? matches[2] : this.DEFAULT_SCALE
    };
}

NumberParser.prototype.addSeparators = function(value) {
    if (!value) {
        return value;
    }

    var splitValue = value.toString().split(this.decimalPoint);
    var tempValue = this.injectSeparators(splitValue[0], this.separator, this.decimalPoint);

    if (splitValue.length == 2) {
        tempValue += this.decimalPoint + splitValue[1];
    }

    return tempValue;
}

NumberParser.prototype.injectSeparators = function(value, separator, decimalPoint) {
    var tempValue = value;
    if (tempValue.length < 4) {
        return tempValue;
    }

    var possibleSymbols = separator + decimalPoint;
    var hasThousand = new RegExp('(\\d\\d\\d\\d)[' + possibleSymbols + ']');
    var partToSplit = new RegExp('([^' + possibleSymbols + '])(\\d\\d\\d)([' + possibleSymbols + '])');
    tempValue = tempValue.replace(/(\d\d\d)$/g, separator + "$1");
    while (hasThousand.test(tempValue)) {
        tempValue = tempValue.replace(partToSplit, "$1" + separator + "$2$3");
    }
    return tempValue;
}

function formatNumber(value, format, options) {
    return new NumberParser(options).parseValue(value, format);
}

if (module && module.exports) {
    module.exports = formatNumber;
}

})();
