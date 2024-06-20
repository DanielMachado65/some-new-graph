"use strict";

const hexagonModule = require("../hexagon/hexagon.module");
const billingModule = require("../billing/billing/billing.module");
const userModule = require("../user/user/userModule");
const queriesModule = require("../query/query/queriesModule");
const logModule = require("../log/logModule");
const vehicleFacade = require("./vehicle.facade");

const dataCleaner = {
  agregados: (data) => {
    if (data) {
      delete data._id;
      delete data._v;
      delete data.createAt;
      delete data.historicoKm;
      delete data.km;
      delete data.ultimaDataInclusao;
      delete data.codigoFipe;
      delete data.renajud;
      delete data.debitosVeiculares;
      delete data.leilao;
      delete data.analiseRisco;
      delete data.gravame;
      delete data.recall;
      delete data.decodificadorPrecificador;
      delete data.historicoProprietarios;
      delete data.rouboFurto;
      delete data.perdaTotal;
      delete data.baseEstadual;
      delete data.baseNacional;
      delete data.restricao1;
      delete data.restricao2;
      delete data.restricao3;
      delete data.restricao4;
      delete data.codigoMarcaModelo;
      delete data.linha;
      delete data.situacaoChassi;
      delete data.unidadeLocalSRF;
      delete data.dtUltimaAtualizacao;
      delete data.situacaoVeiculo;
      delete data.docProprietario;
      delete data.tipoDocFaturado;
      delete data.tipoDocProprietario;
      delete data.codigoCombustivel;
      delete data.historicoProprietarios2;
      delete data.indicioSinistro;
      delete data.multasRenainf;
      delete data.historicoConsultas;
    }
    return data;
  },
  testDrive: (data) => {
    data = dataCleaner.agregados(data);
    delete data.dtAtualizacao;
    delete data.__v;
    delete data.ocorrencia;
    delete data.municipioEmplacamento;
    delete data.procedencia;
    delete data.ufFaturado;
    delete data.docFaturado;
    delete data.pesoBrutoTotal;
    delete data.capMaxTracao;
    delete data.cilindradas;
    delete data.limiteRestricaoTrib;
    delete data.registroDi;
    delete data.di;
    delete data.identImportadora;
    delete data.tipoDocImportadora;
    delete data.tipoMontagem;
    delete data.eixos;
    delete data.qtdPax;
    delete data.tipoCarroceria;
    delete data.numTerceiroEixo;
    delete data.numMotor;
    delete data.eixoTraseiroDif;
    delete data.caixaCambio;
    delete data.numCarroceria;
    delete data.nacionalidade;
    delete data.capacidadeCarga;
    delete data.numFaturado;
    delete data.uf;
    delete data.renavam;
    return data;
  },
};

const executeBillingParallel = async (keys, user) => {
  const query = await queriesModule.createNewQuery({
    documentType: keys.placa ? "PLACA" : "CHASSI",
    documentQuery: keys.placa ? keys.placa : keys.chassi,
    keys: keys,
    user: user._id,
    code: 1,
    refClass: "Agregados",
  });
  const log = await logModule.createNewLog({
    query: query._id,
    user: user._id,
    status: true,
  });
  query.log = log._id;
  await query.save();
  await billingModule.executePaymentOperation(user._id, query, log);
};

const getVehicle = async (key, userid) => {
  let user = await userModule.getById(userid);
  if (!user) {
    return {
      error: "Usuário inválido!",
    };
  }
  let plateRegexMatch = /(^[a-zA-Z]{3}\d{4}$)|(^[a-zA-Z]{3}[0-9]{1}[a-zA-Z]{1}[0-9]{2}$)/;
  let keys = plateRegexMatch.exec(key)
    ? {
        placa: key,
      }
    : {
        chassi: key,
      };
  executeBillingParallel(keys, user).finally();
  let vehicle = await hexagonModule.executeQuery(keys, 1);
  vehicle =
    vehicle && vehicle.data && vehicle.data.body
      ? vehicle.data.body.data
      : null;
  vehicle = dataCleaner.agregados(vehicle);
  return vehicle;
};

const vehicleAggregate = async (keys) => {
  return await vehicleFacade.vehicleAggregateFacade(keys);
};

const getVehicleVersionsByPlate = async (plate) => {
  const VERSIONS_VEHICLE_SERVICE_CODE = 116;
  const response = await vehicleFacade.executeServiceQuery(
    { placa: plate },
    VERSIONS_VEHICLE_SERVICE_CODE
  );
  vehicleFacade.validateSuccessOnResponse(response);
  vehicleFacade.validateDataNotFound(response);
  return vehicleFacade.extractVehicleVersionsFromQuery(response);
};

module.exports = {
  dataCleaner,
  getVehicle,
  vehicleAggregate,
  getVehicleVersionsByPlate,
};
