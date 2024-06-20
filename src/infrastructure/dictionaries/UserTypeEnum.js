
  'use strict';

  const util = require('../utils/utils');

  const userTypeEnum = (code) => {
    code = (typeof (code) === 'string') ? util.tryParseInt(code) : code;
    switch (code) {
      case 1:
        return "default_client"; //pre-pago
      case 2:
        return "integration_client"; //integrador
      case 3:
        return "partner_client"; //parceiro
      case 4:
        return "resale_client"; //revendedor
      case 5:
        return "pos_paid_client"; //pos-pago
      case 6:
        return "operator_client"; //operador
      case 7:
        return "operator_adm"; //operador administrativo
      case 10:
        return "master_user"; //adm
      default:
        return null;
    }
  }

  module.exports = userTypeEnum;
