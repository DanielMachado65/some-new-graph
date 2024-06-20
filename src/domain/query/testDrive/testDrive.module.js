const testDriveFacade = require("./testDrive.facade");
const servicesEnum = require("../../../infrastructure/dictionaries/ServicesEnum");

const TEN_MINUTES = 1000 * 60 * 10
const testDriveCache = {
  updatedAt: null,
  count: Number.MIN_SAFE_INTEGER,
};

const updateTestDriveQuery = async ({ queryId, userActions }) => {
  if (!userActions.chosenFipeId) {
    throw new Error("Nenhum dado a ser atualizado.");
  }

  const testDriveQuery = await testDriveFacade.findById(queryId);
  if (!testDriveQuery) {
    throw new Error("Nenhuma consulta encontrada.");
  }

  if (testDriveQuery.userActions && testDriveQuery.userActions.chosenFipeId)
    return false;

  const dataToUpdate = {};
  if (userActions.chosenFipeId) {
    const versions =
      testDriveQuery.responseJSON &&
        testDriveQuery.responseJSON.dadosBasicosDoVeiculo &&
        Array.isArray(
          testDriveQuery.responseJSON.dadosBasicosDoVeiculo.informacoesFipe
        )
        ? testDriveQuery.responseJSON.dadosBasicosDoVeiculo.informacoesFipe
        : [];
    const version = versions.find((o) => o.fipeId === userActions.chosenFipeId);
    dataToUpdate["userActions.chosenFipeId"] = userActions.chosenFipeId;
    dataToUpdate["userActions.chosenVersion"] =
      (version && version.versao) || "";
  }

  await testDriveFacade.update(queryId, dataToUpdate);
  return true;
};

const getTestDriveQueriesAlreadyDone = (filters) => {
  return testDriveFacade.getTestDriveQueriesAlreadyDone(filters);
};

const getTestDriveQueryById = async (id) => {
  const testDriveQuery = await testDriveFacade.findById(id);
  if (testDriveQuery) {
    const stackResult = testDriveQuery.stackResult;
    const failedServices = testDriveQuery.failedServices;

    testDriveQuery.stackResult = stackResult.map((service) => {
      const serviceData = servicesEnum(service.serviceCode);
      return { ...service, serviceName: serviceData ? serviceData.name : null };
    });

    testDriveQuery.failedServices = failedServices.map((service) => {
      const serviceData = servicesEnum(service.serviceCode);
      return { ...service, serviceName: serviceData ? serviceData.name : null };
    });
  }

  return testDriveQuery;
};

const getTestDriveQueriesCount = () => testDriveFacade.count();

/** @deprecated */
const userCount = async () => {
  const now = new Date().getTime();

  if (testDriveCache.updatedAt === null || now - testDriveCache.updatedAt < TEN_MINUTES) {
    const yagoMagikNumber = 2;
    const count = (await getTestDriveQueriesCount()) || 0;
    const result = Math.round(count / yagoMagikNumber);
    testDriveCache.count = result;
    testDriveCache.updatedAt = now;
  }

  return { count: testDriveCache.count };
};

module.exports = {
  updateTestDriveQuery,
  getTestDriveQueriesAlreadyDone,
  getTestDriveQueryById,
  getTestDriveQueriesCount,
  userCount,
};
