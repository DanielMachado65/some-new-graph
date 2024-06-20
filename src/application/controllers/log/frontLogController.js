(async function () {
    'use strict';

    const moment = require('moment');
    const frontLogModule = require('../../../domain/log/frontLogModule');

    const getById = async (id) => {
        try {
            return frontLogModule.getById(id);
        } catch (error) {
            return error;
        }
    };

    const getByIp = async (ip) => {
        try {
            return frontLogModule.getByIp({ ip });
        } catch (error) {
            return error;
        }
    };

    const getByUser = async (user) => {
        try {
            return frontLogModule.getByUser(user);
        } catch (error) {
            return error;
        }
    };

    const getLogs = async (params) => {
        try {
            const maybeInitDate = !!params.initDate
                ? moment(params.initDate)
                : moment(null);
            const initDate = maybeInitDate.isValid()
                ? maybeInitDate.toDate()
                : moment().startOf('day');
            const maybeEndDate = !!params.endDate
                ? moment(params.endDate)
                : moment(null);
            const endDate = maybeEndDate.isValid()
                ? maybeEndDate.toDate()
                : undefined;
            const maybePageSize = params.pageSize || '';
            const pageSize =
                (maybePageSize.match(/^\d+$/g) || []).length > 0
                    ? parseInt(maybePageSize)
                    : undefined;
            const maybePage = params.page || '';
            const page =
                (maybePage.match(/^\d+$/g) || []).length > 0
                    ? parseInt(maybePage)
                    : undefined;

            const newParams = {
                userId: params.userId,
                ip: params.ip,
                email: params.email,
                document: params.document,
                initDate,
                endDate,
                pageSize,
                page,
            };
            return frontLogModule.getLogs(newParams);
        } catch (error) {
            return error;
        }
    };

    const createLog = async (log) => {
        try {
            return frontLogModule.createLog(log);
        } catch (error) {
            return error;
        }
    };

    module.exports = {
        createLog,
        getById,
        getByIp,
        getByUser,
        getLogs,
    };
})();
