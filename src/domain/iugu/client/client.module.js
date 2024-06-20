"use strict";

const userFacade = require("../../user/user/user.facade");
const clientFacade = require("./client.facade");

const createClient = async (user) => {
  try {
    let clientId = await clientFacade.createClient(user);
    return userFacade.updateExternalControls(user._id, clientId);
  } catch (error) {
    return false;
  }
};

const getClientById = async (userId) => {
  try {
    return clientFacade.getClientById(userId);
  } catch (error) {
    return error.message;
  }
};

const updateClient = async (clientId, user) => {
  try {
    await clientFacade.updateClient(clientId, user);
  } catch (error) {
    return false;
  }
  return true;
};

const clientDataFactory = async (user) => {
  return clientFacade.clientDataFactory(user);
};

const getClientId = async (user) => {
  try {
    let response = await clientFacade.getClientId(user);
    if (!response) {
      return false;
    }
    return response;
  } catch (error) {
    return false;
  }
};

module.exports = {
  createClient,
  getClientById,
  updateClient,
  clientDataFactory,
  getClientId,
};
