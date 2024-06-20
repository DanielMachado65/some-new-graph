
    'use strict';

    const util = require('../utils/utils');

    module.exports = (code) => {
      code = (typeof (code) === 'string') ? util.tryParseInt(code) : code;
      switch (code) {
        case 1:
          return 'Vehicular Query';
        case 2:
          return 'Person Query';
        case 3:
          return 'Person Group Query'
        default:
          return null;
      }
    }
