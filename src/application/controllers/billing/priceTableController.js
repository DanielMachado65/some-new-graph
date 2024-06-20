"use strict";
const priceTableModule = require("../../../domain/billing/priceTableModule");

const createNew = async (priceTable, userid) => {
  let response = { data: null, cod: 200 };
  let _result = null;
  try {
    _result = await priceTableModule.createNew(priceTable, userid);
    response.data = _result.error ? _result.error : _result.data;
    response.cod = _result.error ? 410 : 200;
  } catch (err) {
    response.data = err.message;
    response.cod = 500;
  }
  return response;
};

const getSummarizedPriceTable = async (id) => {
  return priceTableModule.getSummarizedPriceTable(id);
};

const getById = async (id) => {
  return priceTableModule.getById(id);
};

const getByPlanId = async (planId) => {
  return priceTableModule.getPriceTableByPlanId(planId);
};

const getAll = async () => {
  return priceTableModule.getAll();
};

const getDefaultQueries = async (tableName) => {
  return priceTableModule.getDefaultQueries(tableName);
};

const addQueryToTemplate = async (id, query) => {
  let response = { cod: 200, data: null };
  let result = await priceTableModule.addQueryToTemplate(id, query);
  if (result.error) {
    response.cod = result.cod;
    response.data = result.error;
  } else {
    response.data = result.data;
  }
  return response;
};

const getByUser = async (userid) => {
  return priceTableModule.getByUser(userid);
};

const updatePriceTableItem = async (item, priceTableId) => {
  return priceTableModule.updatePriceTableItem(item, priceTableId);
};

const updatePriceTable = async (template, priceTableId) => {
  return priceTableModule.updatePriceTable(template, priceTableId);
};

const setPriceTablePlan = async (params, priceTableId) => {
  return priceTableModule.setPriceTablePlan(params, priceTableId);
};

const deletePriceTable = async (id) => {
  return priceTableModule.deletePriceTable(id);
};

const getAllByCreator = async (creatorId) => {
  return priceTableModule.getAllByCreator(creatorId);
};

const updatePriceTableConsumptionRange = async (
  rangeStart,
  price,
  queryCode,
  priceTableId
) => {
  return priceTableModule.updatePriceTableConsumptionRange(
    rangeStart,
    price,
    queryCode,
    priceTableId
  );
};

const deletePriceTableConsumptionRange = async (
  rangeStart,
  queryCode,
  priceTableId
) => {
  return priceTableModule.deletePriceTableConsumptionRange(
    rangeStart,
    queryCode,
    priceTableId
  );
};

const getQueryProducts = async (params) => {
  try {
    const CREDIT_SCORE_QUERY_CODE = 27;

    const products =
      params && params.userId
        ? await priceTableModule.getQueryProductsByUser(params)
        : await priceTableModule.getDefaultQueryProducts();

    return products.filter(
      (product) => product.code !== CREDIT_SCORE_QUERY_CODE
    ); // remove credit score query on app requests
  } catch (error) {
    return [];
  }
};

const getQueryProductsComparison = async () => {
  try {
    return await priceTableModule.getDefaultQueryProductsComparison();
  } catch (error) {
    return [];
  }
};

const getSignatureProducts = async () => {
  try {
    return await priceTableModule.getSignatureProducts();
  } catch (error) {
    return [];
  }
};

module.exports = {
  getById,
  getAll,
  createNew,
  getDefaultQueries,
  addQueryToTemplate,
  getSummarizedPriceTable,
  getByUser,
  updatePriceTableItem,
  updatePriceTable,
  deletePriceTable,
  getAllByCreator,
  updatePriceTableConsumptionRange,
  deletePriceTableConsumptionRange,
  getByPlanId,
  setPriceTablePlan,
  getQueryProducts,
  getQueryProductsComparison,
  getSignatureProducts,
};
