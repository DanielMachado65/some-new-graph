const queryComposerModule = require("../queryComposer/queryComposerModule");
const hexagonModule = require("../../hexagon/hexagon.module");
const QueryTypesEnum = require("../../../infrastructure/dictionaries/QueryTypesEnum");

const isVehicleQuery = (type) => {
  return type === QueryTypesEnum(1);
};

const isPersonQuery = (type) => {
  return type === QueryTypesEnum(2);
};

const isObject = (data) => {
  return typeof data == "object";
};

function mustBeCallDataMapper(query) {
  return query.code === 102 || query.code === 14 || query.code === 11;
}

const dataSanitize = ({ data, query, map, serviceRequery }) => {
  if (!data)
    return {
      msg: "Nenhum registro encontrado para a consulta realizada.",
    };
  const serviceCodes = query.failedServices.map((fail) => fail.serviceCode);
  if (mustBeCallDataMapper(query)) {
    data = queryReturnManager(map, data);
  }
  return removeBrokenServices({
    serviceCodes,
    data,
    serviceRequery,
  });
};

const getVehicleDto = async ({ query }) => {
  return hexagonModule.getVehicle(
    query.keys.placa,
    query.keys.chassi,
    query.keys.renavam,
    query.keys.motor,
    query.keys.numCarroceria,
    query.keys.caixaCambio,
    query.keys.terceiroEixo,
    query.keys.eixoTraseiro
  );
};

const getPersonGroupDto = ({ query }) => {
  return (
    query.stackResult[0].rawData &&
    query.stackResult[0].rawData.body &&
    query.stackResult[0].rawData.body.data
  );
};

const getPersonDto = async ({ query }) => {
  return hexagonModule.getPerson(
    query.keys.cpf ? query.keys.cpf : query.keys.cnpj ? query.keys.cnpj : null
  );
};

const queryMapAndDataFacade = async ({ type, query, queryMap }) => {
  if (isVehicleQuery(type))
    return [
      await getVehicleDto({
        query,
      }),
      queryMap?.vehicularDataMapping || {},
    ];
  else if (isPersonQuery(type))
    return [
      await getPersonDto({
        query,
      }),
      queryMap?.personDataMapping || {},
    ];
  return [
    getPersonGroupDto({
      query,
    }),
    queryMap?.personGroupDataMapping || {},
  ];
};

function getQueryResponseJson(agrs) {
  const { data, query, map, serviceRequery } = agrs;
  return !data
    ? {
      msg: "Nenhum registro encontrado.",
    }
    : data.msg
      ? data
      : dataSanitize({
        data,
        query,
        map,
        serviceRequery,
      });
}

const parse = async (query, serviceRequery = null) => {
  let data, map;
  const { type, queryMap } = await queryComposerModule.getQueryComposerMap(
    query.code
  );
  [data, map] = await queryMapAndDataFacade({
    type,
    query,
    queryMap,
  });
  query.responseJSON = getQueryResponseJson({
    data,
    query,
    map,
    serviceRequery,
  });
  return query;
};

const mappingCleanUp = (map) => {
  return Object.fromEntries(
    Object.entries(map).filter((entry) => {
      let [key, value] = entry;
      if (isObject(value)) {
        value = mappingCleanUp(value);
        return Object.entries(value).length;
      }
      return value;
    })
  );
};

const cleanupMappingInnerQueryData = (innerQueryMap, data) => {
  const result = {};
  Object.keys(innerQueryMap).map((field) => {
    if (innerQueryMap[field])
      result[field] = isObject(innerQueryMap[field])
        ? cleanupMappingInnerQueryData(innerQueryMap[field], data[field])
        : data[field];
  });
  return result;
};

const queryReturnManager = (queryMap, data) => {
  const cleanedQueryMap = mappingCleanUp(queryMap);
  const reducer = (accumulator, currentValue) => {
    accumulator[currentValue] =
      isObject(cleanedQueryMap[currentValue]) &&
        !Array.isArray(data[currentValue])
        ? cleanupMappingInnerQueryData(
          cleanedQueryMap[currentValue],
          data[currentValue]
        )
        : data[currentValue];
    return accumulator;
  };
  return Object.keys(cleanedQueryMap).reduce(reducer, {});
};

const removeBrokenServices = ({ serviceCodes, data, serviceRequery }) => {
  serviceCodes.forEach((serviceCode) => {
    if (serviceCode !== serviceRequery) {
      switch (serviceCode) {
        case 2:
          delete data.km;
          delete data.baseKm;
          break;
        case 3:
        case 35:
        case 38:
        case 76:
        case 83:
          delete data.baseNacional;
          break;
        case 4:
        case 30:
        case 36:
        case 37:
        case 77:
          delete data.baseEstadual;
          break;
        case 5:
        case 89:
          delete data.renajud;
          delete data.renajuds;
          break;
        case 10:
        case 20:
          delete data.perdaTotal;
          break;
        case 11:
        case 33:
          delete data.rouboFurto;
          break;
        case 12:
          delete data.historicoProprietarios;
          break;
        case 13:
        case 56:
          delete data.decodificadorPrecificador;
          break;
        case 14:
          delete data.recall;
          break;
        case 15:
        case 34:
        case 78:
        case 92:
        case 93:
          delete data.gravame;
          break;
        case 16:
        case 18:
        case 32:
        case 40:
          delete data.leilao;
          break;
        case 17:
          delete data.debitosVeiculares;
          break;
        case 19:
        case 31:
          delete data.analiseRisco;
          break;
        case 21:
        case 42:
          delete data.indicioSinistro;
          break;
        case 22:
          delete data.historicoProprietarios2;
          break;
        case 39:
        case 44:
          delete data.multasRenainf;
          break;
        case 60:
          delete data.procedimentos;
          delete data.dadosCriminais;
          delete data.processos;
          delete data.movimentacoes;
          delete data.dadosCriminais;
          break;
        case 61:
          delete data.historicoConsultas;
          break;
        case 70:
          delete data.score;
          break;
        case 6:
        case 7:
        case 9:
        case 43:
        case 45:
        case 46:
        case 47:
        case 48:
          delete data.acoes;
          delete data.baseNegativacao;
          delete data.bloqueios;
          delete data.chequeConsultaOnlineSrs;
          delete data.chequeLojista;
          delete data.chequeSemFundoAcheiCCF;
          delete data.chequeSemFundoVarejo;
          delete data.consultasCredito;
          delete data.contraOrdem;
          delete data.contraOrdemDocumentoDiferente;
          delete data.contumacia;
          delete data.contumaciaSrs;
          delete data.dividaAtiva;
          delete data.historicoConsultas;
          delete data.pefin;
          delete data.pefinBvs;
          delete data.registroConsulta;
          delete data.restricao;
          delete data.spc;
          delete data.ultimasConsultas;
          break;
        case 63:
        case 64:
          delete data.debitosTrabalhistas;
          break;
        case 58:
          delete data.dadosCnh;
          delete data.exames;
          break;
        case 80:
          delete data.anuncio;
          delete data.historicoAnuncios;
          break;
        case 113:
        case 182:
          delete data.proprietarios;
          break;
        case 109:
          delete data.debitosMultas;
          break;
      }
    }
  });
  return data;
};

module.exports = {
  parse,
};
