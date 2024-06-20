(async function () {
    'use strict';

    const recommendationModule = require('../../../domain/user/recommendationModule');
    const validator = require('validator');

    const addNewRecommendation = async (params, idUser) => {
        let response = { cod: 0, result: null };
        if (!params.type) params.type = 1;

        if (
            idUser &&
            params.nominative &&
            params.nominative.name &&
            params.nominative.email &&
            params.nominative.phoneNumber &&
            validator.isEmail(params.nominative.email)
        ) {
            params.user = idUser;

            let obj = await recommendationModule.addNewRecommendation(params);
            if (obj.err) {
                response.cod = 410;
                response.result = obj.err;
            } else {
                response.cod = 200;
                response.result = obj;
            }
        } else response.cod = 405;
        return response;
    };
    const getAll = async () => {
        return await recommendationModule.getAll();
    };

    module.exports = {
        addNewRecommendation,
        getAll,
    };
})();
