'use strict';

const ROMAN_NUMERALS = {
    1: 'I',
    4: 'IV',
    5: 'V',
    9: 'IX',
    10: 'X',
    40: 'XL',
    50: 'L',
    90: 'XC',
    100: 'C',
    400: 'CD',
    500: 'D',
    900: 'CM',
    1000: 'M'
};

const LOOKUP = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];

/**
 * @param {String} time – время в формате HH:MM (например, 09:05)
 * @returns {String} – время римскими цифрами (IX:V)
 */
function romanTime(time) {
    if (!time) {
        throw new TypeError('Parameter "time" is blank');
    }

    if (!(typeof time === 'string' || time instanceof String)) {
        throw new TypeError(`Wrong type of parameter "time": ${typeof time}`);
    }

    if (time.match(/^\d{2}:\d{2}$/i).length !== 1) {
        throw new TypeError('Mismatching format');
    }

    let timeValues = time.split(':')
        .map(x => parseInt(x))
        .filter(x => !isNaN(x));

    if (!(timeValues.length === 2 &&
        timeValues[0] >= 0 && timeValues[0] < 24 &&
        timeValues[1] >= 0 && timeValues[1] < 60)) {
        throw new TypeError(`Mismatching values: ${timeValues[0]}, ${timeValues[1]}`);
    }

    let romanTimeValues = timeValues.map(romanNumber);

    return romanTimeValues.join(':');
}

// MARK: - Translating

function romanNumber(number) {
    if (number === null) {
        throw new TypeError('Parameter "number" is null');
    }

    if (!(typeof number === 'number' || number instanceof Number)) {
        throw new TypeError(`Wrong type of parameter "number": ${typeof number}`);
    }

    let result = [];

    LOOKUP.forEach(function (lookedup) {
        while (number >= lookedup) {
            result.push(ROMAN_NUMERALS[lookedup]);
            number -= lookedup;
        }
    });

    return result.length === 0 ? 'N' : result.join('');
}

module.exports = romanTime;
