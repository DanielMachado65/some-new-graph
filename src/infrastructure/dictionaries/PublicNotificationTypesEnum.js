
  'use strict';

  const util = require('../utils/utils');

  let PublicNotificationTypesEnum = (code) => {
    code = (typeof (code) === 'string') ? util.tryParseInt(code) : code;
    switch (code) {
      case 1:
        return {
          type: "Teste",
          IconCssClass: "bg-primary",
        };
      case 2:
        return {
          type: "Teste 2",
          IconCssClass: "bg-danger",
        };
      default:
        return null;
    }
  }

  module.exports = PublicNotificationTypesEnum;

