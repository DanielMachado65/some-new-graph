"use strict";

const queryRulesRepository = require('./components/queryRules.repository');

const update = async (id, rules) => {
  return queryRulesRepository.updateOne({ _id: id }, { rules });
};

module.exports = {
  update,
};
