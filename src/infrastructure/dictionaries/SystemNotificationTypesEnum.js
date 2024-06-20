
  'use strict';

  const util = require('../utils/utils');

  const systemNotificationTypesEnum = (code) => {
    code = (typeof (code) === 'string') ? util.tryParseInt(code) : code;
    switch (code) {
      case 1:
        return {
          type: "new_user",
          IconCssClass: "fa fa-user fa-2x text-info",
          redirectTo: "app.clients",
          title: "Novo usuário cadastrado"
        };
      case 2:
        return {
          type: "new_order_closed",
          IconCssClass: "fa fa-shopping-cart fa-2x text-warning",
          redirectTo: "app.payments",
          title: "Novo pagamento realizado"
        };
      case 3:
        return {
          type: "new_query",
          IconCssClass: "fa fa-tasks fa-2x text-success",
          redirectTo: "app.queries",
          title: "Consulta realizada"
        };
      case 4:
        return {
          type: "new_price_table",
          IconCssClass: "fa fa-table fa-2x text-danger",
          redirectTo: "app.priceTables",
          title: "Nova tabela adicionada"
        };
      case 5:
        return {
          type: "new_query_composition",
          IconCssClass: "fa fa-plus-square-o fa-2x text-primary",
          redirectTo: "app.queriesEnable",
          title: "Nova consulta criada"
        };
      case 6:
        return {
          type: "order_failed",
          IconCssClass: "fa fa-times-circle fa-2x text-danger",
          redirectTo: "app.payments",
          title: "Falha no pagamento"
        };
      case 100:
        return {
          type: "new_recommendation",
          IconCssClass: "fa fa-user fa-2x text-info",
          redirectTo: "app.clients",
          title: "Nova Recomendação de Cliente"
        };
      default:
        return null;
    }
  }

  module.exports = systemNotificationTypesEnum;

