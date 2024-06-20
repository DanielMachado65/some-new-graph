"use strict";

const _ = require("lodash");
const mongoose = require("mongoose");

const queryComposerFacade = require("../query/queryComposer/queryComposer.facade");

const userModule = require("../user/user/userModule");
const systemNotificationModule = require("../notification/systemNotificationModule");
const utils = require("../../infrastructure/utils/utils");
const priceTableFacade = require("./price_table/priceTable.facade");
const UserTypeEnum = require("../../infrastructure/enumerators/userType.enum");

const MPriceTable = mongoose.models.MPriceTable;
const MPlan = mongoose.models.MPlan;
const MQueryComposer = mongoose.models.MQueryComposer;
const MBilling = mongoose.models.MBilling;

const getByName = async (name) => {
  return MPriceTable.findOne({
    name: {
      $eq: name,
    },
  });
};

const getById = async (id) => {
  return MPriceTable.findOne({
    _id: id,
  });
};

const getPriceTableById = async (priceTableId) => {
  try {
    const priceTable = await MPriceTable.findById(priceTableId).lean().exec();

    if (priceTable) {
      return { result: priceTable };
    } else {
      return { error: "INVALID_PRICE_TABLE_ERROR", data: { priceTable } };
    }
  } catch (error) {
    const data =
      error instanceof Error
        ? { stack: error.stack, message: error.message }
        : error;
    return { error: "UNKNOWN_PRICE_TABLE_ERROR", data: data };
  }
};

const getPriceTableByPlanId = async (planId) => {
  return await MPriceTable.findOne({
    plan: planId,
  }).lean();
};

const getAll = async () => {
  let priceTables = await MPriceTable.find().lean().exec();
  let readOnlyObjectPriceTables = JSON.parse(JSON.stringify(priceTables));
  let queries = await queryComposerFacade.getQueriesNamesAndCodes();
  for (let _pt of readOnlyObjectPriceTables) {
    const queriesToRemove = [];
    for (let temp of _pt.template) {
      const _query = _.find(queries, ["queryCode", temp.querycode]);
      if (_query) {
        temp.query = _query.name;
        temp.price = temp.totalPrice;
        delete temp.totalPrice;
      } else {
        queriesToRemove.push(temp.querycode);
      }
    }
    if (queriesToRemove.length) {
      _.remove(_pt.template, (temp) =>
        queriesToRemove.includes(temp.querycode)
      );
    }
    _pt.createAt = utils.getBrazilianDateFormat(_pt.createAt);
    _pt.usersWillBeAffected = await MBilling.find({
      priceTable: _pt._id,
    }).countDocuments();
  }
  return readOnlyObjectPriceTables;
};

const createNew = async (priceTable, userid) => {
  let result = {
    data: null,
    error: null,
  };
  if (priceTable) {
    let checkObject = await MPriceTable.findOne({
      name: {
        $eq: priceTable.name,
      },
    });
    if (checkObject) {
      result.error = "Já existe uma tabela de preço com o nome especificado.";
      return result;
    }

    let _priceTableOjbect = {
      creator: userid,
      name: priceTable.name,
      template: [],
    };

    let template = priceTable.template;
    _.forEach(template, (elem) => {
      let obj = {
        querycode: null,
        totalPrice: 0,
      };
      obj.querycode = elem.querycode;
      obj.totalPrice = 0;
      _priceTableOjbect.template.push(obj);
    });

    for (let queryComposition of _priceTableOjbect.template) {
      let object = await MQueryComposer.findOne({
        queryCode: queryComposition.querycode,
      });
      if (!object) {
        result.error = "Consulta inexistente ou inválida.";
        return result;
      }
    }
    result.data = await MPriceTable.create(_priceTableOjbect);
  } else {
    result.error = "O produto não foi encontrado na nossa tabela de preços!";
  }
  if (result.data) {
    let aux = await MPriceTable.findOne({
      _id: result.data._id,
    });
    aux = JSON.parse(JSON.stringify(aux));
    for (let temp of aux.template) {
      temp.query = await queryComposerFacade.getNameQueryByCode(temp.querycode);
      temp.price = temp.totalPrice;
      delete temp.totalPrice;
    }
    aux.usersWillBeAffected = 0;
    result.data = aux;

    try {
      let notification = {
        type: 4,
        description: `Tabela de preço: ${aux.name}`,
      };
      await systemNotificationModule.createNew(notification);
    } catch (error) {
      console.log("Error to create notification => ");
      console.log(error);
    }
  }
  return result;
};

const getQueryInPriceTable = async (priceTableId, querycode) => {
  let priceTable = await MPriceTable.findOne({
    _id: priceTableId,
  });
  return priceTable.template.find((o) => {
    return o.querycode === querycode;
  });
};

const getDefaultQueries = async (tableName) => {
  let priceDefaultTable = await MPriceTable.findOne({
    name: tableName,
  });
  let activesQueries = [];
  if (priceDefaultTable) {
    for (let elem of priceDefaultTable.template) {
      let queryComposition = await queryComposerFacade.getByQueryCode(
        elem.querycode
      );
      let obj = {
        query: queryComposition.name,
        price: elem.totalPrice.toFixed(2),
        querycode: elem.querycode,
        type: queryComposition.type,
      };
      activesQueries.push(obj);
    }
  }
  return activesQueries;
};

const addQueryToTemplate = async (id, query) => {
  let result = {
    data: null,
    cod: 200,
    error: null,
  };
  let priceTable = await MPriceTable.findOne({
    _id: id,
  });
  if (priceTable) {
    let existsQueryAlready = _.find(priceTable.template, (o) => {
      return o.querycode === query.querycode;
    });
    if (existsQueryAlready) {
      result.cod = 409;
      result.error = "A consulta já existe na tabela de preço referida";
    } else {
      let object = await MQueryComposer.findOne({
        queryCode: query.querycode,
      });
      if (!object) {
        result.cod = 404;
        result.error = "Consulta inexistente ou inválida.";
      } else {
        let obj = {
          querycode: query.querycode,
          totalPrice: 0,
        };
        priceTable.template.push(obj);
        result.data = await priceTable.save();
      }
    }
  } else {
    result.cod = 404;
    result.error = "O produto não foi encontrado na nossa tabela de preços!";
  }
  return result;
};

function getQueryFromQueriesArray(queries, o) {
  return queries.find((q) => {
    return q.queryCode === o.querycode;
  });
}

function priceTableTemplateItemFactory(query, o) {
  return {
    query: query.name,
    price: o.totalPrice.toFixed(2),
    querycode: o.querycode,
    type: query.type,
  };
}
//@TODO refazer essa merda
const getByUser = async (userid) => {
  const user = await userModule.getById(userid);
  const partnerUser = await userModule.findOneLean(
    { _id: user.hierarchy.partner },
    { partner: 1 },
    {
      path: "partner",
      select: "rules",
      populate: { path: "rules.queries.queryComposition" },
    }
  );
  const billing = user.billing;
  const priceTable = await getById(billing.priceTable);
  const referredPriceTable = {
    _id: priceTable._id,
    template: [],
    name: priceTable.name,
  };
  const queryEnables =
    (partnerUser &&
      partnerUser.partner &&
      partnerUser.partner.rules.queries &&
      partnerUser.partner.rules.queries.filter((q) => q.queryComposition)) ||
    null;
  const queries = await queryComposerFacade.getAllQueriesEnablesByOwner(
    queryEnables
  );
  if (queries.length > 0) {
    for (let templateItem of priceTable.template) {
      let query = getQueryFromQueriesArray(queries, templateItem);
      if (query) {
        let obj = priceTableTemplateItemFactory(query, templateItem);
        if (!queryEnables) referredPriceTable.template.push(obj);
        else if (
          queryEnables.find((q) => {
            return q.queryComposition.queryCode === templateItem.querycode;
          })
        )
          referredPriceTable.template.push(obj);
      }
    }
  }
  return referredPriceTable;
};

const getSummarizedPriceTable = async (userid) => {
  let billing = await MBilling.findOne({
    user: userid,
  });
  let template = [];
  if (billing) {
    let priceTable = await MPriceTable.findOne({
      _id: billing.priceTable,
    })
      .lean()
      .exec();
    if (priceTable) {
      let queries = await queryComposerFacade.getQueriesNamesAndCodes();
      for (let o of priceTable.template) {
        let price = o.totalPrice;
        const __query = queries.find((x) => x.queryCode === o.querycode);
        if (__query) {
          let obj = {
            query: __query.name,
            price: price.toFixed(2),
            querycode: o.querycode,
          };
          template.push(obj);
        }
      }
    }
  }
  return template;
};

const deletePriceTableConsumptionRange = async (
  rangestart,
  querycode,
  pricetableid
) => {
  const result = {
    data: null,
    cod: 200,
    error: null,
  };
  let priceTable = await MPriceTable.findOne({
    _id: pricetableid,
  });
  if (priceTable) {
    let item = priceTable.template.find((o) => {
      return o.querycode === querycode;
    });
    if (item) {
      let rangeIndex = item.consumptionRanges.findIndex((o) => {
        return o.rangeStart === rangestart;
      });
      if (rangeIndex >= 0) {
        item.consumptionRanges.splice(rangeIndex, 1);
      }
      result.data = item.consumptionRanges;
      await priceTable.save();
    }
  }
  return result;
};

const updatePriceTableConsumptionRange = async (
  rangestart,
  price,
  querycode,
  pricetableid
) => {
  let result = {
    data: null,
    cod: 200,
    error: null,
  };
  const minValue = await queryComposerFacade.getMinimumCostByQueryCode(
    querycode
  );

  if (price >= minValue) {
    let priceTable = await MPriceTable.findOne({
      _id: pricetableid,
    });
    if (priceTable) {
      let item = priceTable.template.find((o) => {
        return o.querycode === querycode;
      });
      if (item) {
        let range = item.consumptionRanges.find((o) => {
          return o.rangeStart === rangestart;
        });
        if (range) {
          range.price = price;
        } else {
          item.consumptionRanges.push({
            rangeStart: rangestart,
            price: price,
          });
        }
        await priceTable.save();
        result.data = item.consumptionRanges;
      }
    }
  } else {
    result.cod = 409;
    result.error = `O preço para a consulta está abaixo do mínimo de R$ ${minValue} parametrizad`;
  }
  return result;
};

const setPriceTablePlan = async function (params, priceTableId) {
  const result = {
    data: null,
    cod: 200,
    error: null,
  };

  const priceTable = await MPriceTable.findOne({ _id: priceTableId });
  let plan = null;
  if (params.plan) plan = await MPlan.findOne({ _id: params.plan }).lean();

  if (priceTable && (!params.plan || (params.plan && plan))) {
    const PLAN_ID = params.plan || null;
    priceTable.plan = PLAN_ID;
    await priceTable.save();
    result.data = JSON.parse(JSON.stringify(priceTable));
  } else {
    result.error = "Invalid params: Price table or Plan not found";
  }
  return result;
};

const updatePriceTableItem = async (item, pricetableid) => {
  let result = {
    data: null,
    cod: 200,
    error: null,
  };
  let priceTable = await MPriceTable.findOne({
    _id: pricetableid,
  });
  if (priceTable) {
    let itemTableIndex = priceTable.template.findIndex((o) => {
      return o.querycode === item.querycode;
    });
    if (itemTableIndex >= 0) {
      let minimo = await queryComposerFacade.getMinimumCostByQueryCode(
        item.querycode
      );

      if (item.price >= minimo) {
        priceTable.template[itemTableIndex].oldPrice =
          priceTable.template[itemTableIndex].totalPrice;
        priceTable.template[itemTableIndex].totalPrice = item.price;
        result.data = await priceTable.save();
        // return true;
      } else {
        result.cod = 409;
        result.error = `O preço para a consulta está abaixo do mínimo de R$ ${minimo} parametrizad`;
        //return false;
      }
    }
  }
  //return false;
  return result;
};

const deletePriceTable = async (id) => {
  let priceTable = await MPriceTable.findOne({
    _id: id,
  });
  if (priceTable.name !== "default") {
    let defaultPriceTable = await MPriceTable.findOne({
      name: "default",
    });
    if (defaultPriceTable) {
      await MBilling.updateMany(
        {
          priceTable: priceTable._id,
        },
        {
          $set: {
            priceTable: defaultPriceTable._id,
          },
        }
      );
      await priceTable.deleteOne();
      return true;
    }
  } else {
    return {
      err: "Não é possível apagar a tabela de preço padrão.",
    };
  }
  return false;
};

const updatePriceTable = async (template, pricetableid) => {
  const priceTable = await MPriceTable.findOneAndUpdate(
    {
      _id: pricetableid,
    },
    {
      $set: {
        template,
      },
    },
    {
      new: true,
    }
  );
  if (priceTable) {
    const jsonObject = JSON.parse(JSON.stringify(priceTable));
    jsonObject.usersWillBeAffected = await MBilling.countDocuments({
      priceTable: priceTable._id,
    });
    const queries = await queryComposerFacade.getQueriesNamesAndCodes();
    jsonObject.template = jsonObject.template.map((o) => {
      const _query = queries.find((x) => x.queryCode === o.querycode);
      return {
        query: _query ? _query.name : null,
        price: o.totalPrice,
        querycode: o.querycode,
        oldPrice: o.oldPrice,
      };
    });
    return jsonObject;
  }
  return null;
};

const getAllByCreator = async (creatorId) => {
  const priceTables = await MPriceTable.find({
    creator: creatorId,
  });
  const defaults = await MPriceTable.find({
    $or: [
      {
        name: "default",
      },
      {
        name: "default_pos_paid",
      },
    ],
  })
    .lean()
    .exec();
  const readOnlyObjectPriceTables = [...defaults, ...priceTables];
  const queriesEnables = await queryComposerFacade.getQueriesNamesAndCodes();
  const cursor = MBilling.aggregate([
    {
      $match: {
        priceTable: {
          $in: readOnlyObjectPriceTables.map((ro) => ro._id),
        },
      },
    },
    {
      $group: {
        _id: "$price_table",
        count: {
          $sum: 1,
        },
      },
    },
  ])
    .cursor({
      batchSize: 0,
    });

  let doc,
    cursorBillingAggregation = [];
  if (cursor) {
    while ((doc = await cursor.next())) {
      cursorBillingAggregation.push(doc);
    }
  }

  return readOnlyObjectPriceTables.map((rp) => {
    const counter = cursorBillingAggregation.find(
      (cb) => cb._id.toString() === rp._id.toString()
    );
    return {
      template: rp.template.map((t) => {
        const queryRelated = queriesEnables.find(
          (x) => x.queryCode === t.querycode
        );
        return {
          query: (queryRelated && queryRelated.name) || null,
          price: t.totalPrice,
          oldPrice: t.oldPrice,
          querycode: t.querycode,
        };
      }),
      name: rp.name,
      createAt: utils.getBrazilianDateFormat(rp.createAt),
      usersWillBeAffected: counter ? counter.count : 0,
    };
  });
};

const removeQueryFromTables = async (queryCode) => {
  const filter = {
    "template.querycode": {
      $eq: queryCode,
    },
  };
  const update = {
    $pull: {
      template: {
        querycode: queryCode,
      },
    },
  };
  const response = await MPriceTable.updateMany(filter, update);
  return response.modifiedCount;
};

const getQueryProducts = ({ priceTable }) => {
  const priceTableId = priceTable && priceTable._id;
  return priceTableId
    ? priceTableFacade.getQueryProducts({ priceTableId })
    : [];
};

const getQueryProductsByUser = async ({ userId }) => {
  const priceTable = await priceTableFacade.getByUserId({ userId });
  return getQueryProducts({ priceTable });
};

const getDefaultQueryProducts = async () => {
  const priceTable = await priceTableFacade.retrievePriceTableByUserType(
    UserTypeEnum.DEFAULT_CLIENT_TYPE
  );
  return getQueryProducts({ priceTable });
};

const getDefaultQueryProductsComparison = async () => {
  const queryProducts = await getDefaultQueryProducts();
  return queryProducts.filter(
    (queryProduct) => queryProduct.showInComparisonTable
  );
};

const getSignatureProducts = () => priceTableFacade.getSignatureProducts();

module.exports = {
  getById,
  getPriceTableById,
  getByName,
  createNew,
  getAll,
  getQueryInPriceTable,
  getDefaultQueries,
  addQueryToTemplate,
  getSummarizedPriceTable,
  getByUser,
  updatePriceTableItem,
  updatePriceTable,
  deletePriceTable,
  getAllByCreator,
  removeQueryFromTables,
  updatePriceTableConsumptionRange,
  deletePriceTableConsumptionRange,
  getPriceTableByPlanId,
  setPriceTablePlan,
  getQueryProductsByUser,
  getDefaultQueryProducts,
  getDefaultQueryProductsComparison,
  getSignatureProducts,
};
