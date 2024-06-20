'use strict';

const {
    INVALID_PARAMS,
    INTERNAL_SERVER_ERROR_MESSAGE,
} = require('../../constants/message/system.error.message');

const errorHandler = (error, ResponseStatusEnum) => {
    switch (error) {
        case 'INVALID_PARAMS':
            return {
                status: ResponseStatusEnum(405),
                msg: INVALID_PARAMS,
            };
        case 'GET_SERVICES_LOG_BY_MONTH_AND_YEAR_ERROR':
            return {
                status: ResponseStatusEnum(401),
                msg:
                    'Não foi possível fazer a busca dos serviços na base de dados.',
            };
        default:
            return {
                status: ResponseStatusEnum(500),
                msg: INTERNAL_SERVER_ERROR_MESSAGE,
            };
    }
};

module.exports = {
    errorHandler,
};
