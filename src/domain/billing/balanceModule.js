'use strict';

const mongoose = require('mongoose');
const MBalance = mongoose.models.MBalance;
const queryComposerModule = require('../query/queryComposer/queryComposerModule');

const createNew = async (obj) => {
    let result = null;
    try {
        result = await MBalance.create(obj);
    } catch (err) {
        result = err.message;
    }
    return result;
};

const createNewBalance = async (userId, assigner, accountFunds, credits) => {
    try {
        const preBalance = {
            user: userId,
            assigner: {
                isSystem: !assigner,
                user: assigner,
            },
            lastBalance: accountFunds,
            currentBalance: accountFunds + credits,
            attributedValue: credits,
        };
        const balanceDoc = await MBalance.create(preBalance);
        const balance = balanceDoc.toObject();

        if (balance) {
            return { result: balance };
        } else {
            return { error: 'CREATE_BALANCE_ERROR', data: { balance } };
        }
    } catch (error) {
        const data =
            error instanceof Error
                ? { stack: error.stack, message: error.message }
                : error;
        return { error: 'UNKNOWN_BALANCE_ERROR', data: data };
    }
};

const getById = async (id) => {
    return MBalance.findById(id);
};

const getByUser = async (userid, initDate, endDate) => {
    if (initDate) {
        initDate = new Date(initDate);
        initDate = new Date(
            initDate.getFullYear(),
            initDate.getMonth(),
            initDate.getDate(),
            0,
            0,
            0,
        );
    }
    if (endDate) {
        endDate = new Date(endDate);
        endDate = new Date(
            endDate.getFullYear(),
            endDate.getMonth(),
            endDate.getDate(),
            23,
            59,
            59,
        );
    }

    const filter =
        initDate && endDate
            ? {
                $and: [
                    { user: userid },
                    { createAt: { $gte: initDate } },
                    { createAt: { $lte: endDate } },
                ],
            }
            : { user: userid };

    return await priveExecutionBalanceQueryHelper(filter);
};

const getByAssigner = async (userid, initDate, endDate) => {
    if (initDate) {
        initDate = new Date(initDate);
        initDate = new Date(
            initDate.getFullYear(),
            initDate.getMonth(),
            initDate.getDate(),
            0,
            0,
            0,
        );
    }

    if (endDate) {
        endDate = new Date(endDate);
        endDate = new Date(
            endDate.getFullYear(),
            endDate.getMonth(),
            endDate.getDate(),
            23,
            59,
            59,
        );
    }

    const filter =
        initDate && endDate
            ? {
                $and: [
                    { 'assigner.user': userid },
                    { createAt: { $gte: initDate } },
                    { createAt: { $lte: endDate } },
                ],
            }
            : { 'assigner.user': userid };

    return await priveExecutionBalanceQueryHelper(filter);
};

const getByConsumption = async (consumptionid) => {
    return MBalance.findOne({
        consumptionItem: consumptionid,
    });
};

const getLasts = async (initDate, endDate) => {
    let filter = {};
    if (initDate && endDate) {
        initDate = new Date(initDate);
        endDate = new Date(endDate);

        initDate = new Date(
            initDate.getFullYear(),
            initDate.getMonth(),
            initDate.getDate(),
            0,
            0,
            0,
            0,
        );
        endDate = new Date(
            endDate.getFullYear(),
            endDate.getMonth(),
            endDate.getDate(),
            23,
            59,
            59,
            999,
        );

        filter = {
            $and: [
                { createAt: { $gte: initDate } },
                { createAt: { $lte: endDate } },
            ],
        };
    }
    return await priveExecutionBalanceQueryHelper(filter);
};

const priveExecutionBalanceQueryHelper = async (filter) => {
    let balances = await MBalance.find(filter)
        .populate('user assigner.user consumptionItem', 'email querycode value')
        .sort({ createAt: -1 })
        .limit(25)
        .lean()
        .exec();

    const queries = await queryComposerModule.getQueriesNamesAndCodes();
    return balances.map((o) => {
        const relatedQuery = queries.find(
            (q) =>
                o.consumptionItem && q.queryCode == o.consumptionItem.querycode,
        );
        return {
            attributedValue: o.attributedValue,
            currentBalance: o.currentBalance ? o.currentBalance.toFixed(2) : 0,
            lastBalance: o.lastBalance ? o.lastBalance.toFixed(2) : 0,
            createAt: o.createAt,
            consumptionItem: {
                value: (o.consumptionItem && o.consumptionItem.value) || 0,
                query: relatedQuery
                    ? relatedQuery.name
                    : (o.consumptionItem && o.consumptionItem.description) || 0,
            },
            assigner: o.assigner,
            user: o.user,
        };
    });
};

module.exports = {
    createNew,
    createNewBalance,
    getById,
    getByUser,
    getByAssigner,
    getByConsumption,
    getLasts,
};
