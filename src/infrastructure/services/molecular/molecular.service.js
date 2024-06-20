"use strict";

const request = require("axios").default;

const URL_BASE = process.env.MOLECULAR_URL_BASE;
const USER_ID = process.env.MOLECULAR_USER_ID;

function factoryRequestData(keys, serviceCodes, features) {
  return {
    serviceCodes,
    keys,
    features,
  };
}

const executeService = async (keys, serviceCodes, features) => {
  const url = URL_BASE + "/api/query/by-data-integrations/" + USER_ID;
  return await request.post(
    url,
    factoryRequestData(keys, serviceCodes, features)
  );
};

module.exports = {
  executeService,
};
