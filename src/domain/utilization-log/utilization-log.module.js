"use strict";

const utilizationLogFacade = require("./utilization-log.facade.js");

const APP_ID = process.env.APPLICATION_ID;

const getAllUserLogs = async (userId, limit = 10, page = 1) => {
  return await utilizationLogFacade.getUserLogs(userId, APP_ID, limit, page);
};

const downloadUserLogs = async (userId) => {
  return await utilizationLogFacade.downloadUserLogs(userId, APP_ID);
};

module.exports = {
  getAllUserLogs,
  downloadUserLogs,
};
