'use strict';

const _ = require('lodash');
const { MConsumptionStatement } = require('mongoose').models;

const createNew = async (obj) => {
    return MConsumptionStatement.create(obj);
};

const getById = async (id) => {
    return MConsumptionStatement.findOne({ _id: id });
};

const getTotalConsumption = async (billing, dt) => {
    let dtRef = dt ? new Date(dt) : new Date();
    let response = { data: null, dt: null };
    let filter = {
        $and: [{ billing: billing }, { createAt: { $lte: dtRef } }],
    };
    let result = await MConsumptionStatement.find(filter)
        .sort({ createAt: -1 })
        .limit(51);
    if (result && result.length === 51) {
        let dataToReturn = JSON.parse(JSON.stringify(result));
        let last = _.last(dataToReturn);
        _.pullAt(dataToReturn, [dataToReturn.length - 1]);
        response.dt = last.createAt;
        response.data = dataToReturn;
    } else response.data = result;
    return response;
};

const getByQuery = async (queryid) => {
    return await MConsumptionStatement.findOne(
        { query: queryid },
        {
            value: 1,
            billing: 1,
            createAt: 1,
            querycode: 1,
        },
    )
        .lean()
        .exec();
};

const find = async (filter) => {
    return await MConsumptionStatement.find(filter);
};

const getByArrayBilling = async (billings, initDate, endDate) => {
    return await MConsumptionStatement.find({
        $and: [
            { billing: { $in: billings } },
            { createAt: { $gte: initDate } },
            { createAt: { $lte: endDate } },
            { status: true },
        ],
    }).populate('query', 'refClass createAt');
};

function extractAllConsumptionIdsFromInvoices(invoices) {
    return [
        ...new Set(
            invoices
                .map((invoice) => {
                    return invoice.consumptionStatementLote.map(
                        (consumption) => consumption,
                    );
                })
                .flat(Infinity),
        ),
    ];
}

const updateMany = async (query, data) =>
    MConsumptionStatement.updateMany(query, { $set: data });

module.exports = {
    createNew,
    getById,
    getTotalConsumption,
    getByQuery,
    find,
    getByArrayBilling,
    extractAllConsumptionIdsFromInvoices,
    updateMany,
};
