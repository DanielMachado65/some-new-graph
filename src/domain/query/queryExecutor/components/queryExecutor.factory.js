const {
  getBrazilianDateFormat,
} = require("../../../../infrastructure/utils/date.util");

const DUPLICITY_MESSAGE =
  "Você realizou a consulta deste veículo recentemente! Deseja realizar uma nova consulta, ou acessar a consulta já realizada? Caso você opte por fazer uma nova consulta, será cobrado o valor integral da mesma.";

const createDuplicatedQueryResponse = function (query, queryKeys) {
  return {
    headerInfos: {
      queryid: query._id.toString(),
      name: query.refClass,
      date: getBrazilianDateFormat(query.createAt),
      keys: queryKeys,
    },
    duplicity_checking: DUPLICITY_MESSAGE,
  };
};

const createQueryObject = function (queryComposer, user, keys) {
  const queryObj = {
    user: user._id.toString(),
    documentQuery: null,
    documentType: null,
    refClass: queryComposer.name,
    code: queryComposer.queryCode,
    keys,
  };

  if (keys.placa) {
    queryObj.documentQuery = keys.placa;
    queryObj.documentType = "PLACA";
  } else if (keys.chassi) {
    queryObj.documentQuery = keys.chassi;
    queryObj.documentType = "CHASSI";
  } else if (keys.motor) {
    queryObj.documentQuery = keys.motor;
    queryObj.documentType = "MOTOR";
  } else if (keys.renavam) {
    queryObj.documentQuery = keys.renavam;
    queryObj.documentType = "RENAVAM";
  }

  return queryObj;
};

const createTestDriveQueryObject = function (queryComposer, keys, ip, maybeUser) {
  const queryObj = {
    documentQuery: null,
    documentType: null,
    refClass: queryComposer.name,
    code: queryComposer.queryCode,
    control: {
      requestIp: ip,
    },
    user: maybeUser || null,
    keys,
  };

  if (keys.placa) {
    queryObj.documentQuery = keys.placa;
    queryObj.documentType = "PLACA";
  } else if (keys.chassi) {
    queryObj.documentQuery = keys.chassi;
    queryObj.documentType = "CHASSI";
  } else if (keys.motor) {
    queryObj.documentQuery = keys.motor;
    queryObj.documentType = "MOTOR";
  } else if (keys.renavam) {
    queryObj.documentQuery = keys.renavam;
    queryObj.documentType = "RENAVAM";
  }

  return queryObj;
};

const createLogObject = function (user) {
  const logObj = {
    user: user._id.toString(),
  };

  return logObj;
};

const createPaymentErrorResponse = function (
  paymentResponse,
  query,
  queryKeys
) {
  return {
    headerInfos: {
      queryid: query._id,
      name: query.refClass,
      date: getBrazilianDateFormat(query.createAt),
      keys: queryKeys,
    },
    error: {
      msg: paymentResponse.err,
      type: "BILLING_EXECUTION_ERROR",
    },
  };
};

const createTestDriveResponse = function (testDriveQuery, parsedData, vehicleReview) {
  return {
    headerInfos: {
      id: testDriveQuery._id.toString(),
      code: testDriveQuery.code,
      documentQuery: testDriveQuery.documentQuery,
    },
    data: { ...vehicleReview, ...parsedData },
  };
};

module.exports = {
  createDuplicatedQueryResponse,
  createQueryObject,
  createLogObject,
  createPaymentErrorResponse,
  createTestDriveQueryObject,
  createTestDriveResponse,
};
