"use strict";

const { MPaymentErrorLog } = require("mongoose").models;
const CodesTranslatorDict = require("../../infrastructure/dictionaries/IuguCodesTranslator.dictionary");
const _ = require("lodash");

const getById = async (id) => {
  return MPaymentErrorLog.findOne({ _id: id });
};

const createNewLog = async (log) => {
  return MPaymentErrorLog.create(log);
};

//@TODO meu deus, refazer
const getErrorsLogs = async () => {
  let result = [];
  let filter = {
    "error.LR": { $ne: null },
  };
  let opts = {
    path: "billing",
    populate: {
      path: "user",
    },
  };
  let errorsLog = await MPaymentErrorLog.find(filter)
    .populate(opts)
    .sort({ createAt: -1 })
    .limit(500)
    .lean();
  if (errorsLog) {
    result = _.map(errorsLog, (el) => {
      return {
        client: el.billing.user.email,
        translator: CodesTranslatorDict.get(el.error.LR),
        success: el.error.success,
        message: el.error.message,
        itens: el.payment.items,
        date: el.createAt,
      };
    });
  }
  return result;
};

module.exports = {
  getById,
  createNewLog,
  getErrorsLogs,
};
