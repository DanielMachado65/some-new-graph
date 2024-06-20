
    'use strict';

    const util = require('../utils/utils');

    module.exports = (code) => {
      code = (typeof(code) === 'string') ? util.tryParseInt(code) : code;
      switch (code) {
        case 11:
        return 'Telefone';
        case 12:
        return 'Email';
        case 13:
        return 'Nome';
        case 14:
        return 'Endereco';

        default:
        return code;
      }
    }


