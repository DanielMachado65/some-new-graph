"use strict";

const {InsuranceFinancingPopupControlRepository} = require("./components/insuranceFinancingPopupControl.repository");

const insuranceFinancingRepository = new InsuranceFinancingPopupControlRepository();

const findByQueryId = (queryId) => {
    return insuranceFinancingRepository.findByQueryId(queryId);
}

const create = (queryId) => {
    return insuranceFinancingRepository.create(
        { query: queryId }
    );
}

module.exports = {
    findByQueryId,
    create,
};
