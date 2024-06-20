"use strict";

const systemNotificationModule = require("../../../domain/notification/systemNotificationModule");

const getLasts = async () => {
  return await systemNotificationModule.getLasts();
};

const getLot = async (dt) => {
  return await systemNotificationModule.getLot(dt);
};

const setVisualized = async (id) => {
  return await systemNotificationModule.setVisualized(id);
};

module.exports = {
  getLasts,
  getLot,
  setVisualized,
};
