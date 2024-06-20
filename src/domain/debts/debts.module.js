"use strict";

const debtsFacade = require("./debts.facade");

const searchDebts = (plate) => {
  return debtsFacade.searchDebts(plate);
};

const retrieveInstallments = (protocol, debts) => {
  return debtsFacade.retrieveInstallments(protocol, debts);
};

module.exports = {
  searchDebts,
  retrieveInstallments,
};
