"use strict";

const suvService = require("../../infrastructure/services/suv/suv.service");

async function getSuvLogs(month, year) {
  return suvService.getSuvLogs(month, year);
}

module.exports = {
  getSuvLogs,
};
