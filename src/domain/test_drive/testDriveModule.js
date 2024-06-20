"use strict";

const userModule = require("../user/user/userModule");
const userConvertedModule = require("../user/userConvertedModule");
const priceTableModule = require("../billing/priceTableModule");
const hexagonModule = require("../hexagon/hexagon.module");
const vehicleCleanerHelper = require("../../infrastructure/helpers/dataCleaner/vehiclesCleanerHelper");
const couponCode = require("../../infrastructure/constants/couponCode/TesteDriver");
const { MTestDriveQuery } = require("mongoose").models;
const _ = require("lodash");

const {
  UnprocessableEntityException,
  BadRequestException,
} = require("../../infrastructure/helpers/Error.helper");

const mailSender = require("../mail/mailSender.service");
const utils = require("../../infrastructure/utils/utils");
const testDriveFacade = require("./testDrive.facade");

const schedulerService = require("../../infrastructure/services/scheduler/scheduler.service");

function getTimeToLoose(timesSend) {
  return timesSend === 0 ? 5 * 60 * 1000 : 24 * 60 * 60 * 1000;
}

const scheduleEmailDiscount = async (email, timesSend = 0) => {
  try {
    const isRegistered = await userModule.emailAreRegistered(email);
    if (!isRegistered) {
      const timeToLoose = getTimeToLoose(timesSend);
      schedulerService.emit({
        endpoint: "/api/test-drive/send-email",
        payload: {
          email,
          timesSend,
          timeToLoose,
        },
        timeToLoose,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const sendEmailDiscount = async (email, timesSend = 1) => {
  const isRegistered = await userModule.emailAreRegistered(email);
  if (!isRegistered && (timesSend === 1 || timesSend === 2)) {
    try {
      if (timesSend < 2) {
        const timeToLoose = getTimeToLoose(timesSend);
        schedulerService.emit({
          endpoint: "/api/test-drive/send-email",
          payload: {
            email,
            timesSend,
          },
          timeToLoose,
        });
      }
    } catch (e) {}
  } else {
    return UnprocessableEntityException(
      "email not register or invalid timesSend"
    );
  }
};

const enrichTheDataForEmail = async (email) => {
  const user = await userConvertedModule.findUserConvertedByEmail(email);
  if (!user) throw BadRequestException("user isn´t in ours databases");
  const vehicle = await runTestDriverEmail(user.key);
  if (!vehicle) throw BadRequestException("vehicles isn´t in ours databases");
  const priceTables = await priceTableModule.getDefaultQueries("default");
  if (!priceTables)
    throw BadRequestException("unable to get defaultPriceTable");
  const pricesQuery = enrichVeicular(priceTables);
  return { vehicle, pricesQuery };
};

const enrichVeicular = (priceTable) => {
  let result = {};
  let object = priceTable.find((o) => o.querycode === 100);
  result.priceVeiculoCompleto = object ? object.price : "Preco nao definido";
  object = priceTable.find((o) => o.querycode === 99);
  result.priceVeiculoBasico = object ? object.price : "Preco nao definido";
  object = priceTable.find((o) => o.querycode === 18);
  result.priceLeilao = object ? object.price : "Preco nao definido";
  return result;
};

const runTestDriver = async (key) => {
  try {
    const QUERY_CODE_ANUNCIO = 80;
    await hexagonModule.executeQuery({ placa: key }, QUERY_CODE_ANUNCIO);
    const vehicle = utils.shallowCopy(await hexagonModule.getVehicle(key));
    return vehicleCleanerHelper.testDrive(vehicle);
  } catch (error) {
    console.log(error);
    return null;
  }
};

const runTestDriverEmail = async (key) => {
  const vehicle = await hexagonModule.getVehicle(key);
  if (vehicle) {
    let jsonData = JSON.parse(JSON.stringify(vehicle));
    return vehicleCleanerHelper.testDriveEmail(jsonData);
  } else {
    return null;
  }
};

const addModelNotFound = async (queryId, userModelInformation) => {
  return testDriveFacade.addModelNotFound(queryId, userModelInformation);
};

const getTestDriveQuery = async (queryId) => {
  const testDriveQuery = await testDriveFacade.getTestDriveQuery(queryId);
  if (!testDriveQuery)
    return {
      headerInfos: { id: null, code: null, documentQuery: null },
      data: null,
    };

  return {
    headerInfos: {
      id: testDriveQuery._id.toString(),
      code: testDriveQuery.code,
      documentQuery: testDriveQuery.documentQuery,
    },
    data: testDriveQuery.responseJSON,
  };
};

const getAll = async ({
  userId,
  initDate,
  endDate,
  queryDocument,
  email,
  ptid,
  queryId,
}) => {
  let filter = {
    $and: [],
  };
  if (ptid) {
    const users = await userModule.getChildrensPartnerFrom(ptid);
    filter.$and.push({
      user: {
        $in: users.map((u) => u._id),
      },
    });
  }
  if (email) {
    let user = await userModule.getByEmail(email);
    if (user) {
      filter.$and.push({
        user: user._id,
      });
    }
  } else if (userId) {
    let users = await userModule.getLeanParentSiblingsChildrensUsers(
      userId,
      false
    );
    filter.$and.push({
      user: { $in: users },
    });
  }
  if (initDate && endDate) {
    initDate = new Date(initDate);
    endDate = new Date(endDate);
    filter.$and.push({
      createAt: {
        $gte: new Date(initDate),
        $lte: new Date(endDate),
      },
    });
  }
  if (queryDocument) {
    filter.$and.push({
      documentQuery: {
        $eq: queryDocument.toUpperCase(),
      },
    });
  }
  if (queryId) {
    filter.$and.push({
      _id: queryId,
    });
  }
  let dt = new Date();
  let firstDay = new Date(dt.getFullYear(), dt.getMonth(), 1, 0, 0, 0, 0);
  if (!initDate) initDate = firstDay;
  filter =
    filter.$and.length > 0
      ? filter
      : {
          createAt: {
            $gte: initDate,
          },
        };

  let closureExecuteQuery = async (filter) => {
    return await MTestDriveQuery.find(
      filter,
      {
        _id: 1,
        createAt: 1,
        user: 1,
        code: 1,
        refClass: 1,
        status: 1,
        log: 1,
        documentQuery: 1,
        documentType: 1,
        executionTime: 1,
        failedServices: 1,
      },
      {
        keys: 1,
      }
    )
      .populate("user log", "name email code type")
      .sort({
        createAt: -1,
      })
      .limit(100);
  };
  let queries = await closureExecuteQuery(filter);
  let auxArray = _.clone(queries);
  while (auxArray.length > 0 && queries.length < 500) {
    let lastQueryArray = _.last(auxArray);
    let isEmptyFilter = !!!Object.keys(filter).length;
    if (filter.$and) {
      _.remove(filter.$and, (o) => {
        return o.createAt;
      });
      filter.$and.push({
        createAt: {
          $lt: new Date(lastQueryArray.createAt),
        },
      });
      if (initDate)
        filter.$and.push({
          createAt: {
            $gte: new Date(initDate),
          },
        });
    } else if (Object.keys(filter).length > 0) {
      filter = {
        $and: [
          filter,
          {
            createAt: {
              $lt: new Date(lastQueryArray.createAt),
            },
          },
        ],
      };
    } else {
      filter = {
        createAt: {
          $lt: new Date(lastQueryArray.createAt),
        },
      };
    }
    auxArray = await closureExecuteQuery(filter);
    if (auxArray.length > 0 && queries.length < 3000) {
      queries = _.concat(queries, auxArray);
    }
    if (isEmptyFilter) filter = {};
  }
  return queries;
};

module.exports = {
  addModelNotFound,
  getAll,
  getTestDriveQuery,
  runTestDriver,
  scheduleEmailDiscount,
  sendEmailDiscount,
};
