
  'use strict';

  const util = require('../utils/utils');

  module.exports = (code) => {
    code = (typeof (code) === 'string') ? util.tryParseInt(code) : code;
    switch (code) {
      case 1:
        return 'Agregados';
      case 2:
        return 'Consulta Nacional';
      case 3:
        return 'Consulta Estadual';
      case 4:
        return 'Localizacao Completa';
      case 5:
        return 'Renajud';
      case 6:
        return 'Credito Simples';
      case 7:
        return 'Credito Completo';
      case 8:
        return 'Historico de KM';
      case 9:
        return 'Consulta de CCF';
      case 10:
        return 'Perda Total';
      case 11:
        return 'Roubo e Furto';
      case 12:
        return 'Historico de Proprietarios';
      case 13:
        return 'Decodificador e Precificador';
      case 14:
        return 'Recall';
      case 15:
        return 'Gravame Simples';
      case 16:
        return 'Leilao Simples';
      case 17:
        return 'Debitos e Multas';
      case 18:
        return 'Leilão + Dados do Veículo';
      case 21:
        return 'Indício de Sinistro';
      case 22:
        return 'Histórico de Proprietários 2';
      case 23:
        return 'Agregados';
      case 24:
        return 'Localize Pessoa Física';
      case 25:
        return 'Localize Pessoa Jurídica';
      case 26:
        return 'Localize Pessoa por Telefone';
      case 27:
        return 'Localize Pessoa por Email';
      case 28:
        return 'Localize Pessoa por Nome/Endereço';
      case 29:
        return 'Localize Pessoa Relacionadas';
      case 98:
        return 'Dados Cadastrais do Veiculo';
      case 99:
        return 'Veiculo Basico';
      case 100:
        return 'Veiculo Completo';
      case 999:
        return 'Consulta teste integração';
      default:
        return null;
    }
  }
