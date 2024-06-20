const serviceExecutorFacade = require("../../serviceExecutor/serviceExecutor.facade");
const serviceLogFacade = require("../../log/serviceLog.facade");

const successInEssentialServices = function (services, stackResult) {
  if (!stackResult.length) return true;

  const STATE_DATA_SERVICES = [4, 30, 36, 37, 77];
  const NATIONAL_DATA_SERVICES = [3, 35, 38, 76, 83];

  function hasStateDataServiceInQueryComposer() {
    let response = false;
    services.forEach((service) => {
      if (STATE_DATA_SERVICES.includes(service.code)) response = true;
    });
    return response;
  }

  function hasNationalDataServiceInQueryComposer() {
    let response = false;
    services.forEach((service) => {
      if (NATIONAL_DATA_SERVICES.includes(service.code)) response = true;
    });
    return response;
  }

  if (hasStateDataServiceInQueryComposer()) {
    let oneServiceExecutedSuccessfully = false;
    stackResult.forEach((result) => {
      if (
        STATE_DATA_SERVICES.includes(result.serviceCode) &&
        result.dataFound
      ) {
        oneServiceExecutedSuccessfully = true;
      }
    });

    if (!oneServiceExecutedSuccessfully) return false;
  }
  if (hasNationalDataServiceInQueryComposer()) {
    let oneServiceExecutedSuccessfully = false;
    stackResult.forEach((result) => {
      if (
        NATIONAL_DATA_SERVICES.includes(result.serviceCode) &&
        result.dataFound
      ) {
        oneServiceExecutedSuccessfully = true;
      }
    });

    if (!oneServiceExecutedSuccessfully) return false;
  }

  return true;
};

const createStackResultItem = function (
  service,
  serviceLog,
  supplierRawData,
  error,
  dataFound
) {
  const serviceLogId = serviceLog._id.toString();
  const hasError = !!error;

  return {
    rawData: supplierRawData,
    serviceLog: serviceLogId,
    serviceCode: service.code,
    supplierCode: service.supplierCode,
    dataFound,
    hasError,
  };
};

const createFailedServiceItem = function (service, serviceLog) {
  const serviceLogId = serviceLog._id.toString();
  return {
    serviceLog: serviceLogId,
    serviceCode: service.code,
    serviceName: service.name,
    supplierCode: service.supplierCode,
  };
};

const createServiceUnableToExecuteResponse = async function (service, logId) {
  const serviceLog = await serviceLogFacade.create({
    serviceCode: service.code,
    log: logId,
  });

  return {
    result: createStackResultItem(
      service,
      serviceLog,
      {
        err:
          "Essential service was failed ('Base Estadual' or 'Base Nacional'). Unable to continue.",
      },
      true,
      false
    ),
    failed: createFailedServiceItem(service, serviceLog),
  };
};

const executeService = async function (service, queryKeys, logId) {
  const serviceLog = await serviceLogFacade.create({
    serviceCode: service.code,
    log: logId,
  });

  const {
    supplierRawData,
    error,
    dataFound,
  } = await serviceExecutorFacade.executeServiceOnHexagon(
    service.code,
    queryKeys
  );

  return {
    result: createStackResultItem(
      service,
      serviceLog,
      supplierRawData,
      error,
      dataFound
    ),
    failed: error ? createFailedServiceItem(service, serviceLog) : null,
  };
};

const executeAutoSwitching = async function (services, queryKeys, logId) {
  const response = {
    switchStackResult: [],
    switchFailedServices: [],
  };

  const servicesToExecute = services.sort((a, b) => {
    if (a.priority > b.priority) return -1;
    if (b.priority > a.priority) return 1;
    return 0;
  });

  for (let service of servicesToExecute) {
    const { result, failed } = await executeService(service, queryKeys, logId);

    response.switchStackResult.push(result);

    if (failed) {
      response.switchFailedServices.push(failed);
    }

    if (result.dataFound) break;
  }

  return response;
};

const executeServices = async function (services, queryKeys, log) {
  const response = {
    stackResult: [],
    failedServices: [],
    error: null,
  };

  try {
    const logId = log ? log._id.toString() : null;

    const promises = services.map((service) => {
      return executeService(service, queryKeys, logId);
    });
    const resultPromises = await Promise.all(promises);

    for (let resultPromise of resultPromises) {
      if (successInEssentialServices(services, response.stackResult)) {
        const { result, failed } = resultPromise;

        response.stackResult.push(result);

        if (failed) {
          response.failedServices.push(failed);

          // if (service.switching) {
          //   const {
          //     switchStackResult,
          //     switchFailedServices,
          //   } = await executeAutoSwitching(service.switching, queryKeys, logId);

          //   response.stackResult = [
          //     ...response.stackResult,
          //     ...switchStackResult,
          //   ];

          //   if (switchFailedServices.length) {
          //     response.failedServices = [
          //       ...response.failedServices,
          //       ...switchFailedServices,
          //     ];
          //   }
          // }
        }
      } else {
        const { result, failed } = await createServiceUnableToExecuteResponse(
          service,
          logId
        );
        response.stackResult.push(result);
        response.failedServices.push(failed);
      }
    }
  } catch (error) {
    response.error = error.message || true;
  }
  return response;
};

const getVehicle = async function (queryKeys) {
  const response = {
    errorInVehicleFetch: null,
    responseJSON: null,
  };

  try {
    const { body } = await serviceExecutorFacade.getVehicleOnHexagon(queryKeys);
    response.responseJSON = body;
  } catch (error) {
    response.errorInVehicleFetch = error.message;
  }

  return response;
};

module.exports = {
  executeServices,
  getVehicle,
};
