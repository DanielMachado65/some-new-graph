"use strict";

const axios = require("axios");

const URL =
  "https://lmvg4jubmi.execute-api.us-east-1.amazonaws.com/prod/whatsapp-data-assignment";

async function getPopupAssing(userId) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${URL}/get?application_id=${process.env.APPLICATION_ID}&external_id=${userId}`
      )
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

async function postPopupAssing({ userId, whatsappNumber, reject }) {
  return await axios.post(`${URL}/assign`, {
    application_id: process.env.APPLICATION_ID,
    external_id: userId,
    whatsapp_number: whatsappNumber,
    has_been_rejected: reject,
  });
}

async function postPopupReject({ userId, whatsappNumber, reject }) {
  return await axios.post(`${URL}/reject`, {
    application_id: process.env.APPLICATION_ID,
    external_id: userId,
    whatsapp_number: whatsappNumber,
    has_been_rejected: reject,
  });
}

module.exports = {
  getPopupAssing,
  postPopupAssing,
  postPopupReject,
};
