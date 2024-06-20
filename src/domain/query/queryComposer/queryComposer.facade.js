"use strict";

const { MQueryComposer } = require("mongoose").models;
const QueryTypesEnum = require("../../../infrastructure/dictionaries/QueryTypesEnum");
const {
  getBrazilianDateFormat,
} = require("../../../infrastructure/utils/utils");

const getByQueryCode = async (code) => {
  return MQueryComposer.findOne({
    queryCode: code,
  }).populate("queryMap queryRules");
};

const getByQueryCodeWithServices = (code) => {
  return MQueryComposer.findOne({
    queryCode: code,
  })
    .populate([
      {
        path: "services",
        select: "code supplier name switching",
      },
    ])
    .lean();
};

const addServicesToCompositionQuery = async (code, services) => {
  let composition = await MQueryComposer.findOne({
    queryCode: code,
  });
  if (composition) {
    for (let service of services) {
      composition.services.push(service);
    }
    await composition.save();
    return composition;
  } else return "Consulta inexistente ou inválida.";
};

const queriesUseRespectiveService = async (serviceCode) => {
  let opts = {
    path: "services",
    match: {
      code: serviceCode,
    },
  };
  return await MQueryComposer.find(
    {},
    {
      queryCode: 1,
      services: 1,
    }
  ).populate(opts);
};

const updateData = async (id, data) => {
  await MQueryComposer.updateOne(
    {
      _id: id,
    },
    {
      type: QueryTypesEnum(data.type),
      name: data.name,
    }
  );
};

const getById = async (id) => {
  return MQueryComposer.findById(id).populate("services queryMap queryRules");
};

const getNameQueryByCode = async (querycode) => {
  const query = await MQueryComposer.findOne({
    queryCode: querycode,
  })
    .select("name")
    .lean();
  return query.name;
};

const getQueriesNamesAndCodes = async () => {
  return MQueryComposer.find({
    status: true,
  })
    .select("name queryCode")
    .lean();
};

const getQueryComposerMap = async (queryCode) => {
  return MQueryComposer.findOne(
    {
      queryCode,
    },
    {
      type: 1,
      queryMap: 1,
    }
  )
    .populate("queryMap")
    .lean();
};

const getBatchByCodes = async (queriesCodes) => {
  if (
    !queriesCodes ||
    !Array.isArray(queriesCodes) ||
    queriesCodes.length === 0
  )
    return { result: [] };

  try {
    const preQueries = await MQueryComposer.find({
      queryCode: { $in: queriesCodes },
    })
      .lean()
      .exec();
    const hasAllQueries = preQueries.length === new Set(queriesCodes).size;

    if (hasAllQueries) {
      const queries = queriesCodes.map((queryCode) => {
        return preQueries.find((preQuery) => preQuery.queryCode === queryCode);
      });

      return { result: queries };
    } else {
      return { error: "INVALID_QUERY_ERROR", data: { hasAllQueries } };
    }
  } catch (error) {
    const data =
      error instanceof Error
        ? { stack: error.stack, message: error.message }
        : error;
    return { error: "UNKNOWN_QUERY_ERROR", data: data };
  }
};

async function getQueriesActiveIsNotInArray(queriesCodes) {
  return await MQueryComposer.find({
    $and: [
      {
        status: true,
      },
      {
        queryCode: {
          $not: {
            $in: queriesCodes,
          },
        },
      },
    ],
  })
    .lean()
    .populate("queryMap queryRules");
}

async function getQueryCompositionEnablesToUser(filter, othersQueries) {
  let queriesCompositionsEnables = await MQueryComposer.find(filter)
    .populate("queryMap queryRules")
    .lean()
    .exec();
  queriesCompositionsEnables = othersQueries
    ? [...queriesCompositionsEnables, ...othersQueries]
    : queriesCompositionsEnables;
  return queriesCompositionsEnables;
}

const getAllQueriesEnablesByOwner = async (queriesEnableToOwner = []) => {
  const filter = {
    $and: [
      {
        status: true,
      },
    ],
  };
  let othersQueries = null;
  if (queriesEnableToOwner && queriesEnableToOwner.length) {
    filter.$and.push({
      queryCode: {
        $in: queriesEnableToOwner.map((q) => {
          return q.queryComposition && q.queryComposition.queryCode;
        }),
      },
    });
    const queriesCodes = queriesEnableToOwner.map((q) => {
      return q.queryComposition.queryCode;
    });
    othersQueries = await getQueriesActiveIsNotInArray(queriesCodes);
  }
  const queriesCompositionsEnables = await getQueryCompositionEnablesToUser(
    filter,
    othersQueries
  );
  return convertCreateAtAndParametrizeCostByPartnerToQueries(
    queriesCompositionsEnables,
    queriesEnableToOwner
  );
};

function convertCreateAtAndParametrizeCostByPartnerToQueries(
  queriesCompositionsEnables,
  queriesEnablesToOwner
) {
  return queriesCompositionsEnables.map((query) => {
    query.createAt = getBrazilianDateFormat(query.createAt);
    const queryEnable =
      (queriesEnablesToOwner &&
        queriesEnablesToOwner.find(
          (x) => x.queryComposition.queryCode === query.queryCode
        )) ||
      null;
    query.cost = queryEnable ? queryEnable.cost : 0;
    return query;
  });
}

const getMinimumCostByQueryCode = async (code) => {
  const queryComposition = await MQueryComposer.findOne(
    { queryCode: code },
    { services: 1 }
  )
    .lean()
    .populate("services", "minimumPrice");
  return queryComposition.services.reduce((acc, curr) => {
    acc += curr.minimumPrice;
    return acc;
  }, 0);
};

module.exports = {
  getAllQueriesEnablesByOwner,
  addServicesToCompositionQuery,
  queriesUseRespectiveService,
  updateData,
  getById,
  getByQueryCode,
  getBatchByCodes,
  getQueryComposerMap,
  getQueriesNamesAndCodes,
  getNameQueryByCode,
  getMinimumCostByQueryCode,
  getByQueryCodeWithServices,
};
