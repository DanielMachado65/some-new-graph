"use strict";
const { isDevEnv } = require("../../../config/config");

const api_keys = {
  account_id: process.env.IUGU_ACCOUNT_ID,
  production: process.env.IUGU_PRODUCTION_API_KEY,
  test: process.env.IUGU_TEST_API_KEY,
};

const apiKey = isDevEnv ? api_keys.test : api_keys.production;

const authBasicEncoded = () => {
  return "Basic " + `${Buffer.from(apiKey + ": ").toString("base64")}`;
};

function makeHeader() {
  return {
    headers: {
      Authorization: authBasicEncoded(),
    },
  };
}

module.exports = {
  makeHeader,
};
