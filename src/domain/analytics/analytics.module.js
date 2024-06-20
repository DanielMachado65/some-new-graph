"use strict";

const analyticsFacade = require("./analytics.facade");
const queryFacade = require("../query/query/query.facade");
const userFacade = require("../user/user/user.facade");
const testDriveFacade = require("../query/testDrive/testDrive.facade");
const marketingSenderModule = require("../mail/marketing/marketingSender.module");

const getUser = async (maybeUserId) => {
  try {
    return await userFacade.getById(maybeUserId);
  } catch (error) {
    return null;
  }
};

const getQuery = async (maybeQueryId) => {
  try {
    const query = await queryFacade.getById(maybeQueryId);
    return query ? query : await testDriveFacade.findById(maybeQueryId);
  } catch (error) {
    return null;
  }
};

const createAnalytics = async (userId, queryId, link) => {
  const user = await getUser(userId);
  const query = await getQuery(queryId);
  const email = (user && user.email) || null;
  const plate = (query && query.keys && query.keys.placa) || null;
  marketingSenderModule.registerClickOnButtonDebts({
    email,
    plate,
    user,
    query,
  });
  return analyticsFacade.createAnalytics(email, link, plate, queryId);
};

module.exports = {
  createAnalytics,
};
