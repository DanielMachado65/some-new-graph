
    'use strict';

    const util = require('../utils/utils');

    let phoneTypesEnum = (code) => {
      code = (typeof(code) === 'string') ? util.tryParseInt(code) : code;
      switch (code) {
        case 0:
          return "indefinido";
        case 1:
          return "fixo";
        case 2:
          return "móvel";
        default:
          return null;
      }
    }

    module.exports = phoneTypesEnum;

