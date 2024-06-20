"use strict";

const _ = require("lodash");
const { MQueryComposer } = require("mongoose").models;

const queryComposerFacade = require("./queryComposer.facade");

const queryMapperModule = require("../queryMapper/queryMapperModule");
const queryRulesModule = require("../queryRules/queryRulesModule");
const serviceModule = require("../service/serviceModule");
const priceTableModule = require("../../billing/priceTableModule");
const userModule = require("../../user/user/userModule");

const QueryTypesEnum = require("../../../infrastructure/dictionaries/QueryTypesEnum");

const {
  getBrazilianDateFormat,
} = require("../../../infrastructure/utils/utils");

const createNewQueryContext = async (querycode, servicesId, name, type) => {
  let obj = {
    type: QueryTypesEnum(type),
    queryCode: querycode,
    name: name,
    services: servicesId,
  };
  let queryComposer = await MQueryComposer.findOne({
    queryCode: querycode,
  });
  if (queryComposer)
    return "O consulta solicitada ja existe no banco de dados.";
  const queryComposerResult = await MQueryComposer.create(obj);
  delete queryComposerResult.queryMap;
  delete queryComposerResult.queryRules;
  return queryComposerResult;
};

const getAllEnables = async (partnerId) => {
  let filter = {
    $and: [
      {
        status: true,
      },
    ],
  };
  let queriesEnables = null;
  let user = await userModule.getById(partnerId);
  if (user.partner) {
    queriesEnables = user.partner.rules.queries
      ? user.partner.rules.queries
      : null;
    if (queriesEnables) {
      filter.$and.push({
        queryCode: {
          $in: queriesEnables.map((q) => {
            return q.queryComposition.queryCode;
          }),
        },
      });
    }
  }

  let queriesCompositionsEnables = await MQueryComposer.find(filter)
    .lean()
    .populate("services queryMap queryRules");

  for (let o of queriesCompositionsEnables) {
    o.createAt = getBrazilianDateFormat(o.createAt);
  }
  return queriesCompositionsEnables;
};

const getAll = async (userid) => {
  let filter = {
    $and: [
      {
        status: true,
      },
    ],
  };
  let queriesEnables = null,
    othersQueries = null;
  let user = await userModule.getById(userid);
  if (user && user.partner) {
    queriesEnables = user.partner.rules.queries
      ? user.partner.rules.queries
      : null;
    if (queriesEnables) {
      filter.$and.push({
        queryCode: {
          $in: queriesEnables.map((q) => {
            return q.queryComposition.queryCode;
          }),
        },
      });
    }
  }

  if (queriesEnables) {
    let inverseFilter = {
      $and: [
        {
          status: true,
        },
        {
          queryCode: {
            $not: {
              $in: queriesEnables.map((q) => {
                return q.queryComposition.queryCode;
              }),
            },
          },
        },
      ],
    };
    othersQueries = await MQueryComposer.find(inverseFilter)
      .populate("services queryMap queryRules")
      .lean()
      .exec();
  }
  let queriesCompositionsEnables = await MQueryComposer.find(filter)
    .populate("services queryMap queryRules")
    .lean()
    .exec();
  queriesCompositionsEnables = othersQueries
    ? [...queriesCompositionsEnables, ...othersQueries]
    : queriesCompositionsEnables;
  for (let o of queriesCompositionsEnables) {
    o.createAt = getBrazilianDateFormat(o.createAt);
    const objRef =
      user && user.partner
        ? user.partner.rules.queries.find(
            (x) => x.queryComposition.queryCode === o.queryCode
          )
        : null;
    o.cost = objRef ? objRef.cost : 0;
    delete o.__v;
  }
  return queriesCompositionsEnables;
};

const getMinimumCostByQueryCode = async (code) => {
  let minimumPrice = 0;
  let composition = await getByQueryCode(code);
  if (composition) {
    for (let item of composition.services) {
      let service = await serviceModule.getById(item);
      if (service && service.minimumPrice) {
        minimumPrice += service.minimumPrice;
      }
    }
  }
  return minimumPrice;
};

const updateServicesToQueryComposition = async (_id, services) => {
  const response = {
    data: null,
    error: null,
    cod: 200,
  };
  const composition = await MQueryComposer.findById(_id).populate("services");
  if (composition) {
    composition.services = await Promise.all(
      services.map((serviceId) => serviceModule.getLeanById(serviceId))
    );
    await composition.save();
    response.data = composition;
  } else {
    response.error = "Consulta inexistente ou inválida.";
    response.cod = 410;
  }
  return response;
};

const updateMap = async (id, map) => {
  return await queryMapperModule.update(id, map);
};

const updateRules = async (id, rules) => {
  return await queryRulesModule.update(id, rules);
};

const deleteQueryComposer = async (id) => {
  let queryComposition = await MQueryComposer.findOne({
    _id: id,
  });
  if (queryComposition) {
    queryComposition.status = false;
    await queryComposition.save();
    return await priceTableModule.removeQueryFromTables(
      queryComposition.queryCode
    );
  }
  return null;
};

const getByQueryCode = async (code) => {
  return queryComposerFacade.getByQueryCode(code);
};

const addServicesToCompositionQuery = async (code, services) => {
  return queryComposerFacade.addServicesToCompositionQuery(code, services);
};

const queriesUseRespectiveService = async (serviceCode) => {
  return queryComposerFacade.queriesUseRespectiveService(serviceCode);
};

const updateData = async (id, data) => {
  await queryComposerFacade.updateData(id, data);
};

const getById = async (id) => {
  return queryComposerFacade.getById(id);
};

const getNameQueryByCode = async (querycode) => {
  return queryComposerFacade.getNameQueryByCode(querycode);
};

const getQueriesNamesAndCodes = async () => {
  return queryComposerFacade.getQueriesNamesAndCodes();
};

const getQueryComposerMap = async (queryCode) => {
  return queryComposerFacade.getQueryComposerMap(queryCode);
};

const getBatchByCodes = async (queriesCodes) => {
  return queryComposerFacade.getBatchByCodes(queriesCodes);
};

module.exports = {
  createNewQueryContext,
  getAllEnables,
  getAll,
  getByQueryCode,
  addServicesToCompositionQuery,
  updateServicesToQueryComposition,
  queriesUseRespectiveService,
  getMinimumCostByQueryCode,
  updateMap,
  updateRules,
  updateData,
  deleteQueryComposer,
  getById,
  getNameQueryByCode,
  getQueriesNamesAndCodes,
  getQueryComposerMap,
  getBatchByCodes,
};
