'use strict'

const isNumber = (data) => (typeof data === 'number');
const isString = (data) => (typeof data === 'string');
const isBoolean = (data) => (typeof data === 'boolean');
const isObject = (data) => (typeof data === 'object');

module.exports = {
    isNumber,
    isString,
    isBoolean,
    isObject,
}
