"use strict";

const userFacade = require("./user.facade");

const getSignInData = async (userId) => {
  return userFacade.getSignInData(userId);
};

const getById = async (userId) => {
  return userFacade.getById(userId);
};

const deleteUser = async (userId, password) => {
  return userFacade.deleteUser(userId, password);
};

const undeleteUser = async (userId) => {
  return userFacade.undeleteUser(userId);
};

const dataDownload = async (userId) => {
  return userFacade.dataDownload(userId);
};

const userTraker = async (userId, trakerName, body) => {
  return userFacade.userTraker(userId, trakerName, body);
};

const whenUserDeleted = async (userId) => {
  return userFacade.whenUserDeleted(userId);
};

const getConfirmedCarResellers = async (opts) => {
  return userFacade.getConfirmedCarResellers(opts);
};

module.exports = {
  deleteUser,
  dataDownload,
  getSignInData,
  getById,
  undeleteUser,
  userTraker,
  whenUserDeleted,
  getConfirmedCarResellers,
};
