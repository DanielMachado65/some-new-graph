
    'use strict';

    const util = require('../utils/utils');

    let partnerTypesEnum = (code) => {
      code = (typeof(code) === 'string') ? util.tryParseInt(code) : code;
      switch (code) {
        case 1:
          return "fixed_cost"; //Custo fixo
        case 2:
          return "percentage"; //porcentagem
        default:
          return null;
      }
    }

    module.exports = partnerTypesEnum;

