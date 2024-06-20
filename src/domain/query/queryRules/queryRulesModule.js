'use strict';

const queryRulesFacade = require('./queryRules.facade');

const update = async (id, rules) => {
    return queryRulesFacade.update(id, rules);
};

module.exports = {
    update,
};
