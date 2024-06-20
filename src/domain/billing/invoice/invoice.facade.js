'use strict';
const d3 = require('d3-collection');
const _ = require('lodash');
const numeral = require('numeral');
const mongoose = require('mongoose');
const utils = require('../../../infrastructure/utils/utils');
const queryComposerModule = require('../../query/queryComposer/queryComposerModule');
const consumptionStatementModule = require('../consumption/consumptionStatement.module');
const ParallelConsumptionEnum = require('../../../infrastructure/dictionaries/ParallelConsumptionEnum');
const MInvoice = mongoose.models.MInvoice;
const invoiceRepository = require('./components/invoice.repository');

const createNew = async (obj) => {
    return MInvoice.create(obj);
};

const getJsonById = async (id) => {
    let jsonObject = null;
    let opts = {
        path: 'consumptionStatementLote',
        populate: {
            path: 'query',
            select: {
                _id: 1,
                code: 1,
                keys: 1,
                createAt: 1,
            },
        },
    };
    let invoice = await MInvoice.findOne({
        _id: id,
    }).populate(opts);
    if (invoice) {
        jsonObject = JSON.parse(JSON.stringify(invoice));
        for (let o of jsonObject.consumptionStatementLote) {
            if (o.query) {
                let query = {
                    name: await queryComposerModule.getNameQueryByCode(
                        o.query.code,
                    ),
                    _id: o.query._id,
                    keys: o.query.keys,
                    createAt: utils.getBrazilianDateFormat(o.query.createAt),
                };
                o.query = query;
            }
        }
    }
    return jsonObject;
};

const getById = async (id) => {
    return MInvoice.findOne({
        _id: id,
    }).populate('consumptionStatementLote');
};

const getByPayment = async (payment) => {
    return MInvoice.findOne({
        payment: payment,
    })
        .populate('consumptionStatementLote')
        .populate({
            path: 'accumulatedInvoices.refInvoice',
            select: 'status consumptionStatementLote',
            populate: {
                path: 'consumptionStatementLote',
                select: 'status payday',
            },
        });
};

const getSummary = async (invoiceid) => {
    let itens = [];
    let invoice = await MInvoice.findOne({
        _id: invoiceid,
    }).populate('consumptionStatementLote');
    if (invoice) {
        let consumptionStatementLote = invoice.consumptionStatementLote;
        var entries = d3
            .nest()
            .key(function (d) {
                return d.tag;
            })
            .entries(consumptionStatementLote);

        for (let entry of entries) {
            let value = entry.values[0].value;
            let amount = entry.values.length;
            let obj = {
                name: entry.key,
                value: value * amount,
                amount: amount,
                itemValue: value,
            };
            itens.push(obj);
        }
    }
    return itens;
};

const find = async (filter, opts) => {
    if (opts) return await MInvoice.find(filter).populate(opts);
    return await MInvoice.find(filter);
};

const grantDiscount = async (invoiceId, motive, value, userId) => {
    let invoice = await MInvoice.findOne({
        _id: invoiceId,
    }).populate('billing payment consumptionStatementLote');
    if (invoice) {
        if (!invoice.discounts) {
            invoice.discounts = [];
        }
        let consumption = null;
        if (value <= invoice.value) {
            consumption = await consumptionStatementModule.createNew(
                ParallelConsumptionEnum(
                    'discount',
                    numeral(value).format('$0,0.00'),
                ),
            );
            consumption.invoice = invoice._id;
            consumption.billing = invoice.billing._id;
            consumption.value = -1 * value;
        } else {
            consumption = await consumptionStatementModule.createNew(
                ParallelConsumptionEnum(
                    'discount',
                    numeral(invoice.value).format('$0,0.00'),
                ),
            );
            consumption.invoice = invoice._id;
            consumption.billing = invoice.billing._id;
            consumption.value = -1 * invoice.value;
        }
        await consumption.save();
        invoice.consumptionStatementLote.push(consumption);
        invoice.value = _.sumBy(invoice.consumptionStatementLote, (c) => {
            return c.value;
        });
        invoice.discounts.push({
            motive: motive,
            value: value,
            user: userId,
            createAt: new Date(),
        });
        await invoice.save();
    }
    return invoice;
};

const getPopulatedInvoicesWithConsumptionsAndQueriesToReportQueries = async (
    refMonth,
    refYear,
    billings,
) => {
    return MInvoice.aggregate([
        {
            $match: {
                refMonth,
                refYear,
                billing: {
                    $in: billings,
                },
            },
        },
        {
            $lookup: {
                from: 'mconsumptionstatements',
                let: { consumptions_ids: '$consumptionStatementLote' },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $in: ['$_id', '$$consumptions_ids'],
                            },
                        },
                    },
                    {
                        $project: {
                            value: true,
                            querycode: true,
                            tag: true,
                            description: true,
                            billing: true,
                            query: true,
                            createAt: true,
                        },
                    },
                    // {
                    //     $lookup : {
                    //         from : "mqueries",
                    //         let : {query_id : "$query"},
                    //         pipeline : [
                    //             {
                    //                 $match : {
                    //                     $expr : {
                    //                         $eq : ["$_id","$$query_id"]
                    //                     }
                    //                 }
                    //             },
                    //             {
                    //                 $project : {
                    //                     documentQuery : true
                    //                 }
                    //             }
                    //         ],
                    //         as : "query"
                    //     }
                    // }
                ],
                as: 'consumptionStatementLote',
            },
        },
    ]);
    // .lean()
    // .populate({
    //     path: 'consumptionStatementLote',
    //     select: 'value querycode tag description billing query createAt',
    //     populate: {
    //         path: 'query',
    //         select: "documentQuery"
    //     }
    // })
};

const findOne = async (query, projection = {}) =>
    MInvoice.findOne(query, projection).lean();

const updateOne = async (query, data) =>
    invoiceRepository.updateOne(query, data);

const getInvoicesByRefMonthAndRefYearAndBillingIds = async (
    billingIds,
    refMonth,
    refYear,
    projection = {},
) => {
    return MInvoice.find(
        {
            billing: { $in: billingIds },
            refYear,
            refMonth,
        },
        projection,
    ).lean();
};

module.exports = {
    createNew,
    getJsonById,
    getById,
    getByPayment,
    getSummary,
    find,
    grantDiscount,
    getPopulatedInvoicesWithConsumptionsAndQueriesToReportQueries,
    findOne,
    updateOne,
    getInvoicesByRefMonthAndRefYearAndBillingIds,
};
