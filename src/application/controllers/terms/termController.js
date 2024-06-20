(function () {
    'use strict';

    const termModule = require('../../../domain/terms/termModule');

    const updateTerm = async (data) => {
        return await termModule.updateTerm(data);
    };

    const getAllTerms = async () => {
        return await termModule.getAllTerms();
    };

    const getDetailsTerm = async (id) => {
        return await termModule.getDetailsTerm(id);
    };

    const activateTerm = async (id) => {
        return await termModule.activateTerm(id);
    };

    const getTerm = async () => {
        return await termModule.getTerm();
    };

    module.exports = {
        updateTerm,
        getAllTerms,
        getDetailsTerm,
        activateTerm,
        getTerm,
    };
})();
