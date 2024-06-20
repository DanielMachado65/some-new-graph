(async function () {
    'use strict';

    const logModule = require('../../../domain/log/logModule');

    let getById = async (id) => {
        let response = null;
        try {
            response = await logModule.getById(id);
        } catch (err) {
            response = err;
        } finally {
            return response;
        }
    };

    const getTotalByUser = async (user) => {
        let response = null;
        try {
            response = await logModule.getTotalByUser(user);
        } catch (err) {
            response = err;
        } finally {
            return response;
        }
    };

    const getByQuery = async (id) => {
        let response = null;
        try {
            response = await logModule.getByQuery(id);
        } catch (err) {
            response = err;
        } finally {
            return response;
        }
    };

    module.exports = {
        getTotalByUser,
        getById,
        getByQuery,
    };
})();
