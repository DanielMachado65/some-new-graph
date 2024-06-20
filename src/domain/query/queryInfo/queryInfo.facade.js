"use strict";

const QueryInfoRepository = require("./components/queryInfo.repository");

const getAllQueryInfos = async () => {
  const queryInfos = await QueryInfoRepository.getAllQueryInfos();
  return { queryInfos };
};

const createQueryInfo = QueryInfoRepository.createQueryInfo.bind(
  QueryInfoRepository
);

const updateQueryInfo = QueryInfoRepository.updateQueryInfo.bind(
  QueryInfoRepository
);

const removeQueryInfo = QueryInfoRepository.removeQueryInfo.bind(
  QueryInfoRepository
);

module.exports = {
  getAllQueryInfos,
  createQueryInfo,
  updateQueryInfo,
  removeQueryInfo,
};
