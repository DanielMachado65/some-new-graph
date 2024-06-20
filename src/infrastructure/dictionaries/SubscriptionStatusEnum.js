
  'use strict';

  const util = require('../utils/utils');

  let subscriptionStatusEnum = (code) => {
    code = (typeof (code) === 'string') ? util.tryParseInt(code) : code;
    switch (code) {
      case 1:
        return 'AGUARDANDO';
      case 2:
        return 'ATIVO';
      case 3 :
        return 'CANCELADO';
      default:
        return 'AGUARDANDO';
    }
  };

  module.exports = subscriptionStatusEnum;

