"use strict";
const { MPriceTable } = require("mongoose").models;
const {
  DEFAULT_CLIENT_TYPE,
} = require("../../../infrastructure/enumerators/userType.enum");
const BillingRepository = require("../billing/components/billing.repository");
const PriceTableRepository = require("./components/priceTable.repository");

const SORT_QUERY_INFO = new Map().set(100, [
  "Dados de Leilão",
  "Batidas",
  "Restrições e Impedimentos",
  "Fotos do Veículo *",
  "Roubo e Furto",
  "Risco de Comercialização",
]);

const sortQueryInfosByName = (queryCode, queryInfos) => {
  const sortQuery = SORT_QUERY_INFO.get(queryCode);
  if (!sortQuery) return queryInfos;

  const ordanateByName = sortQuery.reduce((acc, curr) => {
    const findElement = queryInfos.find(
      (value) => value.name.toUpperCase() === curr.toUpperCase()
    );
    acc.push(findElement);
    return acc;
  }, []);

  const mixQueryInfos = [...ordanateByName, ...queryInfos];
  return mixQueryInfos.filter(
    (item, position) => mixQueryInfos.indexOf(item) === position
  );
};

const getDefaultPriceTable = (projection) => {
  return PriceTableRepository.findOne({ name: "default" }, projection);
};

const retrievePriceTableByUserType = (type) => {
  return type === DEFAULT_CLIENT_TYPE
    ? MPriceTable.findOne({ name: { $eq: "default" } }, { _id: 1 }).lean()
    : MPriceTable.findOne(
        { name: { $eq: "default_pos_paid" } },
        { _id: 1 }
      ).lean();
};

const getById = async (id, projection = {}) =>
  MPriceTable.findById(id, projection).lean();

const validateIfPriceTableExists = (priceTable) => {
  if (!priceTable) throw new Error("Price table not exists");
};

const getByUserId = async ({ userId }) => {
  const billing = await BillingRepository.getBillingByUserId(userId);
  return billing && billing.priceTable;
};

const getQueryProducts = async ({ priceTableId }) => {
  const producs = await PriceTableRepository.getQueryProducts({ priceTableId });
  return producs.map((produc) => {
    return {
      ...produc,
      queryInfos: sortQueryInfosByName(produc.code, produc.queryInfos),
    };
  });
};

const getSignatureProducts = async () => {
  const availableSignatures = await PriceTableRepository.getSignatureProducts();

  if (!Array.isArray(availableSignatures)) return [];

  const defaultPriceTable = await getDefaultPriceTable();
  const defaultPrices = defaultPriceTable.template.reduce((acc, query) => {
    acc[query.querycode] = query.totalPrice;
    return acc;
  }, {});

  return availableSignatures.map((signature) => {
    if (!Array.isArray(signature.availableQueries)) return signature;

    const updatedAvailableQueries = signature.availableQueries.map((query) => {
      return {
        ...query,
        marketingPrice: defaultPrices[query.querycode],
      };
    });

    return {
      ...signature,
      availableQueries: updatedAvailableQueries,
    };
  });
};

module.exports = {
  retrievePriceTableByUserType,
  getById,
  getByUserId,
  getQueryProducts,
  getSignatureProducts,

  validators: {
    validateIfPriceTableExists,
  },
};
