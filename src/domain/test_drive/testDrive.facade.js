"use strict";

const testDriveRepository = require("./components/modelNotFound.repositoy");
const testDriveQueryRepository = require("../query/testDrive/components/testDrive.repository");
const dateUtil = require("../../infrastructure/utils/date.util");
const excelUtil = require("../../infrastructure/utils/excel.util");

const addModelNotFound = async (queryId, userModelInformation) => {
  const responseQuery = await testDriveQueryRepository.getById(queryId);
  if (!responseQuery) throw new Error("Veiculo não encontrado");

  const plate = responseQuery && responseQuery.documentQuery;
  const basicDataVehicle =
    responseQuery &&
    responseQuery.responseJSON &&
    responseQuery.responseJSON.dadosBasicos;
  const brand = basicDataVehicle.marca;
  const model = basicDataVehicle.modelo;
  const fipeId =
    responseQuery.responseJSON &&
    responseQuery.responseJSON.fichaTecnica[0] &&
    responseQuery.responseJSON.fichaTecnica[0].fipeId;
  const codModelBrand =
    responseQuery.responseJSON && responseQuery.responseJSON.codigoMarcaModelo;

  return testDriveRepository.addModelNotFound({
    plate,
    brand,
    model,
    fipeId,
    queryId,
    codModelBrand,
    userModelInformation,
  });
};

const getModelsNotFoundByDate = async ({ month = "", year = "" }) => {
  const { startDate, endDate } = dateUtil.getMonthStartEndDateOrDefault(
    month,
    year
  );

  const response = await testDriveRepository.getModelsNotFoundByDate({
    start: startDate,
    end: endDate,
  });

  const parseToBuffer = excelUtil.generateBufferFromDataJson(
    response,
    "Modelos não encontrados"
  );

  return parseToBuffer.toString("base64");
};

const getTestDriveQuery = (queryId) =>
  testDriveQueryRepository.getById(queryId);

module.exports = {
  addModelNotFound,
  getModelsNotFoundByDate,
  getTestDriveQuery,
};
