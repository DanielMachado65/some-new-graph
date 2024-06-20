'use strict';
const {
    getBrazilianDateFormat,
    getLiteralMonth,
} = require('../../../infrastructure/utils/date.util');

function _reportDataObjectToReportQueryFactory(
    user,
    consumption,
    documentQuery,
) {
    return {
        email: user.email,
        data: getBrazilianDateFormat(consumption.createAt),
        documento: documentQuery,
        tag: consumption.tag,
        desc: consumption.description,
        codigoConsulta: consumption.querycode,
    };
}

function prepareDataToReportQueryMonthly(consumptions, queries, usersRelated) {
    return consumptions
        .map((consumption) => {
            const query = consumption.query
                ? queries.find(
                      (query) =>
                          consumption.query.toString() === query._id.toString(),
                  )
                : null;
            const user = usersRelated.find(
                (user) =>
                    user.billing.toString() === consumption.billing.toString(),
            );
            const documentQuery = (query && query.documentQuery) || String();
            return user
                ? _reportDataObjectToReportQueryFactory(
                      user,
                      consumption,
                      documentQuery,
                  )
                : null;
        })
        .filter((reg) => reg);
}

function extractAllQueryIdsFromConsumptions(invoices) {
    const queries = invoices
        .map((invoice) => {
            return invoice.consumptionStatementLote.map(
                (consumption) => consumption.query,
            );
        })
        .flat(Infinity)
        .filter((query) => query);
    return [...new Set(queries)];
}

function getReportNameByMonth(month, year, id) {
    return `${id.substring(0, 6)}_${getLiteralMonth(month)}_${year}.xlsx`;
}

module.exports = {
    getReportNameByMonth,
    prepareDataToReportQueryMonthly,
    extractAllQueryIdsFromConsumptions,
};
