"use strict";

const hexagonService = require("../../infrastructure/services/hexagon/hexagon.service");
const HttpStatus = require("../../infrastructure/enumerators/httpCode.enum");
const molecularService = require("../../infrastructure/services/molecular/molecular.service");
const {
  HttpExceptionHandler,
} = require("../../infrastructure/handlers/http-exeption.handler");

const vehicleAggregateFacade = async (keys) => {
  try {
    const response = await molecularService.executeService(keys, [1]);
    const { placa, marca, modelo, chassi } = response.data.body.vehicle;
    return {
      placa: keys.placa && placa ? placa : keys.placa || null,
      chassi: keys.chassi && chassi ? chassi : keys.chassi || null,
      marca: marca || null,
      modelo: modelo || null,
    };
  } catch (error) {
    return {
      placa: null,
      chassi: null,
      marca: null,
      modelo: null,
    };
  }
};

const executeServiceQuery = async (keys, code) =>
  hexagonService.executeService(keys, code);

function extractVehicleVersionsFromQuery(response) {
  const data =
    response && response.body && response.body.data && response.body.data.data;
  const basicData = data && data.dadosBasicosDoVeiculo;
  const fipeInfo = basicData && basicData["informacoesFipe"];
  if (fipeInfo) {
    const brandYear = basicData.anoFabricacao;
    const modelYear = basicData.anoModelo;
    const codModelBrand = data.codigoMarcaModelo;
    const vehicleVersions =
      fipeInfo &&
      Array.isArray(fipeInfo) &&
      fipeInfo.map(
        ({ historicoPreco, valorAtual, combustivel, ano, ...infos }) => infos
      );
    return {
      brandYear,
      modelYear,
      codModelBrand,
      vehicleVersions,
    };
  }
  return null;
}

function validateSuccessOnResponse(response) {
  if (response.status.cod !== HttpStatus.SUCCESS) {
    throw new HttpExceptionHandler(
      "Sistem indisponivel no momento",
      HttpStatus.INTERNAL_ERROR
    );
  }
}

function validateDataNotFound(response) {
  const dataNotFound = !!(
    response &&
    response.body &&
    response.body.data &&
    response.body.data.data &&
    response.body.data.data.msg
  );
  if (dataNotFound) {
    throw new HttpExceptionHandler(
      "Nenhum registro encontrado",
      HttpStatus.NOT_FOUND
    );
  }
}

module.exports = {
  vehicleAggregateFacade,
  executeServiceQuery,
  extractVehicleVersionsFromQuery,
  validateSuccessOnResponse,
  validateDataNotFound,
};
