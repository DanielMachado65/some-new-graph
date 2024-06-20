const hexagonService = require("../../../infrastructure/services/hexagon/hexagon.service");

const responseObject = function (
  supplierRawData = null,
  serviceData = null,
  error = true,
  dataFound = false
) {
  return {
    supplierRawData,
    serviceData,
    error,
    dataFound,
  };
};

const successObject = function (data) {
  const response = data && data.body && data.body.data ? data.body.data : {};
  const responseStatus = data && data.status ? data.status : {};

  const supplierRawData = response.rawData;
  const serviceData = response.data;
  let error = null;
  let dataFound = null;
  if (response.error) {
    error = response.error;
    dataFound = false;
  } else if (responseStatus.cod !== 200 && responseStatus.msg) {
    error = responseStatus.msg;
    dataFound = false;
  } else if (responseStatus.cod === 200 && serviceData && serviceData.msg) {
    dataFound = false;
  } else if (responseStatus.cod === 200 && serviceData) {
    dataFound = true;
  } else {
    error = true;
    dataFound = false;
  }

  return responseObject(supplierRawData, serviceData, error, dataFound);
};

const errorObject = function (error) {
  return responseObject(null, null, error.message, false);
};

const executeServiceOnHexagon = async function (code, keys) {
  try {
    await hexagonService.sanitizeVehicle(keys.placa,keys.chassi,keys.motor)
    const data = await hexagonService.executeService(keys, code);
    return successObject(data);
  } catch (error) {
    return errorObject(error);
  }
};

const getVehicleOnHexagon = function (queryKeys) {
  return hexagonService.getVehicle(
    queryKeys.placa,
    queryKeys.chassi,
    queryKeys.renavam,
    queryKeys.motor
  );
};

module.exports = {
  executeServiceOnHexagon,
  getVehicleOnHexagon,
};
