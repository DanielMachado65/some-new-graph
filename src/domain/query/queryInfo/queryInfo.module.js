"use strict";

const queryInfoFacade = require("./queryInfo.facade");

const getAllQueryInfos = queryInfoFacade.getAllQueryInfos;

const createQueryInfo = queryInfoFacade.createQueryInfo;

const updateQueryInfo = queryInfoFacade.updateQueryInfo;

const removeQueryInfo = queryInfoFacade.removeQueryInfo;

module.exports = {
  getAllQueryInfos,
  createQueryInfo,
  updateQueryInfo,
  removeQueryInfo,
};
