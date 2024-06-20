(async function () {
    'use strict';

    const queryComposerModule = require('../../../domain/query/queryComposer/queryComposerModule');

    const createNewQueryContext = async (querycode, servicesId, name, type) => {
        let _result = null;
        try {
            _result = queryComposerModule.createNewQueryContext(
                querycode,
                servicesId,
                name,
                type,
            );
        } catch (err) {
            _result = err;
        } finally {
            return _result;
        }
    };

    const getAllEnables = async (partnerId) => {
        try {
            return queryComposerModule.getAllEnables(partnerId);
        } catch (err) {
            return err;
        }
    };

    const getAll = async (userId) => {
        try {
            return queryComposerModule.getAll(userId);
        } catch (err) {
            return err;
        }
    };

    const getMinimumCostByQueryCode = async (code) => {
        let _result = null;
        try {
            _result = queryComposerModule.getMinimumCostByQueryCode(code);
        } catch (err) {
            _result = err;
        } finally {
            return _result;
        }
    };

    const addServicesToCompositionQuery = async (querycode, services) => {
        let _result = null;
        try {
            _result = queryComposerModule.addServicesToCompositionQuery(
                querycode,
                services,
            );
        } catch (err) {
            _result = err;
        } finally {
            return _result;
        }
    };

    const updateServicesToQueryComposition = async (id, services) => {
        return await queryComposerModule.updateServicesToQueryComposition(
            id,
            services,
        );
    };

    const updateMap = async (id, map) => {
        return await queryComposerModule.updateMap(id, map);
    };

    const updateRules = async (id, rules) => {
        return await queryComposerModule.updateRules(id, rules);
    };

    const updateData = async (id, data) => {
        return await queryComposerModule.updateData(id, data);
    };

    const deleteQueryComposer = async (id) => {
        return await queryComposerModule.deleteQueryComposer(id);
    };

    const getById = async (id) => {
        return await queryComposerModule.getById(id);
    };

    const getByCode = async (code) => {
        return await queryComposerModule.getByQueryCode(code);
    };

    module.exports = {
        createNewQueryContext,
        getAllEnables,
        getAll,
        getMinimumCostByQueryCode,
        addServicesToCompositionQuery,
        updateServicesToQueryComposition,
        updateMap,
        updateRules,
        updateData,
        deleteQueryComposer,
        getById,
        getByCode,
    };
})();
