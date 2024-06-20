const validateQueryKeys = (keys) => {
  if (keys.plate) return true;
  return false;
};

const getDefault = ({ keys, refClass, code }) => {
  const documentQuery = keys.plate;
  const documentType = keys.plate ? "PLACA" : "";

  return {
    documentQuery,
    documentType,
    keys: {
      plate: keys.plate,
    },
    refClass,
    code,
    responseJSON: null,
    stackResult: [],
    failedServices: [],
    status: true,
  };
};

const validateIfServiceExecutionHasError = (executionResponse) => {
  return !!executionResponse.error;
};

const createStackResultRegistry = (executionResponse, service) => {
  return {
    rawData: executionResponse.returnedDataVendor,
    dataFound: executionResponse.dataFound,
    hasError: !!executionResponse.error,
    service: {
      name: service.name,
      code: service.code,
      supplierCode: service.supplier.supplierCode,
      supplierName: service.supplier.name,
    },
  };
};

const createFailedServiceRegistry = (service) => {
  return {
    serviceName: service.name,
    serviceCode: service.code,
    supplierCode: service.supplier.supplierCode,
    supplierName: service.supplier.name,
  };
};

const clearTestDriveQueryDocument = (document) => {
  const query = JSON.parse(JSON.stringify(document));
  const { stackResult, failedServices, __v, ...cleanObject } = query;
  return cleanObject;
};

module.exports = {
  validateQueryKeys,
  getDefault,
  validateIfServiceExecutionHasError,
  createStackResultRegistry,
  createFailedServiceRegistry,
  clearTestDriveQueryDocument,
};
