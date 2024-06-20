"use strict";

const { tryParseInt } = require("../utils/utils");

const serviceObj = (name, supplierCode) => ({ name, supplierCode });

module.exports = (code) => {
  code = typeof code === "string" ? tryParseInt(code) : code;
  switch (code) {
    case 1:
      return serviceObj("Agregados", 1);
    case 2:
      return serviceObj("Base KM", 1);
    case 3:
      return serviceObj("Base Nacional", 10);
    case 4:
      return serviceObj("Base Estadual", 10);
    case 5:
      return serviceObj("Renajud", 20);
    case 6:
      return serviceObj("Credito Simples", 40);
    case 7:
      return serviceObj("Restricao Total", 40);
    case 8:
      return serviceObj("Indício de Sinistro", 250);
    case 9:
      return serviceObj("Risco Comercial", 250);
    case 10:
      return serviceObj("Perda Total", 70);
    case 11:
      return serviceObj("Roubo e Furto", 70);
    case 12:
      return serviceObj("Historico de Proprietarios", 70);
    case 13:
      return serviceObj("Decodificador e Precificador", 80);
    case 14:
      return serviceObj("Recall", 80);
    case 15:
      return serviceObj("Gravame", 60);
    case 16:
      return serviceObj("Leilao", 250);
    case 17:
      return serviceObj("Remarketing", 250);
    case 18:
      return serviceObj("Leilao", 90);
    case 19:
      return serviceObj("Parecer Tecnico", 90);
    case 20:
      return serviceObj("Perda Total", 30);
    case 21:
      return serviceObj("Indicio Sinistro", 90);
    case 22:
      return serviceObj("Historico de Proprietarios 2", 50);
    case 23:
      return serviceObj("Agregados", 60);
    case 24:
      return serviceObj("Localize Pessoa Fisica/Juridica", 100);
    case 26:
      return serviceObj("Localize Pessoa por Telefone", 100);
    case 27:
      return serviceObj("Localize Pessoa por Email", 100);
    case 28:
      return serviceObj("Localize Pessoa por Nome/Endereço", 100);
    case 29:
      return serviceObj("Localize Pessoa Relacionadas", 100);
    case 30:
      return serviceObj("Base Estadual", 20);
    case 31:
      return serviceObj("Parecer Tecnico", 20);
    case 32:
      return serviceObj("Leilao", 20);
    case 33:
      return serviceObj("Roubo e Furto", 50);
    case 34:
      return serviceObj("Gravame", 50);
    case 35:
      return serviceObj("Base Nacional", 60);
    case 36:
      return serviceObj("Base Estadual", 60);
    case 37:
      return serviceObj("Gravame", 10);
    case 38:
      return serviceObj("Base Nacional", 20);
    case 39:
      return serviceObj("Multas Renainf", 60);
    case 40:
      return serviceObj("Leilao", 1);
    case 41:
      return serviceObj("Historico de Proprietarios", 1);
    case 42:
      return serviceObj("Sinistro", 1);
    case 43:
      return serviceObj("Cadastro Integrado PF/PJ", 40);
    case 44:
      return serviceObj("Multas", 10);
    case 45:
      return serviceObj("Cheque Completo", 40);
    case 46:
      return serviceObj("Cheque Simples", 40);
    case 47:
      return serviceObj("Credito Completo", 40);
    case 48:
      return serviceObj("Credito Plus Mais", 40);
    case 49:
      return serviceObj("Empresarial", 40);
    case 50:
      return serviceObj("Sinistro", 110);
    case 51:
      return serviceObj("Localiza PF/PJ", 110);
    case 52:
      return serviceObj("Localiza PF/PJ Mais", 110);
    case 55:
      return serviceObj("Analise de Risco", 120);
    case 56:
      return serviceObj("Decodificador e Precificador Mais Fipe", 80);
    case 57:
      return serviceObj("Nome da Mae", 110);
    case 58:
      return serviceObj("CNH", 40);
    case 59:
      return serviceObj("Dívida Ativa", 130);
    case 60:
      return serviceObj("Pesquisa Nacional", 140);
    case 61:
      return serviceObj("Histórico de Consultas", 1);
    case 62:
      return serviceObj("Score", 150);
    case 63:
      return serviceObj("Debitos Trabalhistas TST", 160);
    case 64:
      return serviceObj("Negativa de Debitos Trabalhistas", 160);
    case 65:
      return serviceObj("Localização PF/PJ", 170);
    case 66:
      return serviceObj("Localizador de Agregados", 180);
    case 67:
      return serviceObj("Biometria Facial", 130);
    case 68:
      return serviceObj("Agregados Plus", 1);
    case 69:
      return serviceObj("Detalhe Renajud", 10);
    case 70:
      return serviceObj("Score - Veiculo", 1);
    case 71:
      return serviceObj("Score PF/PJ", 1);
    case 72:
      return serviceObj("Nome da Mae", 170);
    case 73:
      return serviceObj("Enriquecimento", 190);
    case 74:
      return serviceObj("Laudo Vistoria SP", 10);
    case 75:
      return serviceObj("CNH", 100);
    case 76:
      return serviceObj("Base Nacional", 50);
    case 77:
      return serviceObj("Base Estadual", 50);
    case 79:
      return serviceObj("Protesto", 200);
    case 80:
      return serviceObj("Informações de Parceiros", 190);
    case 81:
      return serviceObj("Histórico de Veículos", 50);
    case 83:
      return serviceObj("Base Nacional Simplificada", 51);
    case 89:
      return serviceObj("Renajud", 50);
    case 92:
      return serviceObj("Gravame", 20);
    case 93:
      return serviceObj("Gravame Completo", 20);
    case 94:
      return serviceObj("Gravame", 10);
    case 101:
      return serviceObj("CSV", 290);
    case 102:
      return serviceObj("Ficha Tecnica Especial", 280);
    case 109:
      return serviceObj("Debitos e multas", 310);
    case 111:
      return serviceObj("Localizador de Agregados", 90);
    case 113:
      return serviceObj("Histórico de proprietários sintético", 10);
    case 115:
      return serviceObj("Cotação de Seguro", 320);
    case 116:
      return serviceObj("Ficha Técnica Test-Drive", 280);
    case 117:
      return serviceObj("Opinião do Dono Score", 1);
    case 118:
      return serviceObj("Ficha Técnica Hexagon", 1);
    case 119:
      return serviceObj("Comparativo especificações", 1);
    case 120:
      return serviceObj("Comparativo especificações + Opinião do dono", 1);
    case 135:
      return serviceObj("Recall Mais", 80);
    case 136:
      return serviceObj("Diaginóstico do veiculo", 330);
    case 139:
      return serviceObj("Base Nacional", 70);
    case 140:
      return serviceObj("Base Estadual", 70);
    case 141:
      return serviceObj("Renajud", 250);
    case 143:
      return serviceObj("Gravame", 50);
    case 146:
      return serviceObj("Multas Renainf em Cobrança", 10);
    case 150:
      return serviceObj("Roubo e Furto", 250);
    case 152:
      return serviceObj("Gravame", 350);
    case 153:
      return serviceObj("Renajud", 350);
    case 154:
      return serviceObj("Base Estadual", 360);
    case 155:
      return serviceObj("Base Nacional", 350);
    case 159:
      return serviceObj("Agregados", 10);
    case 161:
      return serviceObj("Ficha Tecnica Especial", 390);
    case 162:
      return serviceObj("Roubo e Furto", 350);
    case 163:
      return serviceObj("Base Nacional", 380);
    case 164:
      return serviceObj("Multas Renainf", 350);
    case 165:
      return serviceObj("Base Nacional - Motor Cambio", 350);
    case 168:
      return serviceObj("Consulta Renavam", 350);
    case 182:
      return serviceObj("Histórico de proprietários sintético opcional", 1);
    case 184:
      return serviceObj("Custo Médio", 280);
    case 185:
      return serviceObj("Avaliação veicular", 1);
    case 186:
      return serviceObj("Agregados", 410);
    case 187:
      return serviceObj("Agregados Online - Tetris", 1);
    case 189:
      return serviceObj("Renajud", 380);
    default:
      return null;
  }
};
