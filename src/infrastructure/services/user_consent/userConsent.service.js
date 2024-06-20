"use strict";

const axios = require("axios");

const URL =
  "https://lmvg4jubmi.execute-api.us-east-1.amazonaws.com/prod/consent";

async function getUserConsent(externalId) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${URL}?application_id=${process.env.APPLICATION_ID}&external_id=${externalId}`
      )
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

async function createUserConsent(body) {
  return await axios.post(`${URL}`, {
    application_id: process.env.APPLICATION_ID,
    ...body,
  });
}

module.exports = {
  getUserConsent,
  createUserConsent,
};
