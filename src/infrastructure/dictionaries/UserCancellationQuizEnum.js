
    'use strict';

    const util = require('../utils/utils');

    const cancellationReasonEnum = (code) => {
      code = (typeof (code) === 'string') ? util.tryParseInt(code) : code;
     switch (code) {
        case 1:
          return "Outros";
        case 2:
          return "Valor dos serviços";
        case 3:
          return "Não estou mais utilizando o sistema";
        case 4:
          return "Fechei minha empresa";
        case 5:
          return "Estou insatisfeito com os serviços";
        case 6:
          return "Tive problemas com o atendimento";
        case 7:
          return "Débitos em aberto";
        case 8:
          return "Suspeita de fraude";
        default:
          return null;
      }
    }

    module.exports = cancellationReasonEnum;
