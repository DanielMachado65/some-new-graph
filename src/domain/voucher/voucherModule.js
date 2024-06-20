"use strict";
//@TODO refazer
const { MVoucher, MBilling } = require("mongoose").models;

const excelGeneratorModule = require("../support/excelGeneratorModule");
const voucher_codes = require("voucher-code-generator");
const _ = require("lodash");

const createLote = async (vouchersRules) => {
  let response = { msg: null, error: false, code: 200, file: null };
  /* vouchers = [
        {
            credits : 39.9,
            count : 1000,
            prefix : 'olho-',
            postfix : '-2018',
            length : 4 ~ 8
        }
    ]; */
  try {
    let vouchersCodes = null;
    let vouchers = [];
    vouchersRules.forEach((voucherRule) => {
      voucherRule.length =
        voucherRule && voucherRule.length >= 4 && voucherRule.length <= 8
          ? voucherRule.length
          : 8;
      let opts = {
        count: voucherRule.count,
        length: voucherRule.length,
        charset: voucher_codes.charset("numbers"),
        prefix: voucherRule.prefix,
        postfix: voucherRule.postfix,
      };
      vouchersCodes = voucher_codes.generate(opts);
      for (let _voucher of vouchersCodes) {
        let voucherObject = {
          code: _voucher,
          creditsToApply: voucherRule.credits,
        };
        vouchers.push(voucherObject);
      }
    });
    let chuncker = 1000;
    let chunckedVouchersArray = _.chunk(vouchers, chuncker);
    for (let _voucher of chunckedVouchersArray) {
      await MVoucher.insertMany(_voucher);
    }

    let report = excelGeneratorModule.generateVouchersXlsx(vouchers);
    response.msg = "Vouchers criados com sucesso!";
    response.file = report;
  } catch (e) {
    response.msg = e.message;
    response.error = true;
    response.code = 500;
  }
  return response;
};

const validate = async (code) => {
  let response = { data: null, status: 200 };
  let voucher = await MVoucher.findOne({
    $and: [{ code: { $eq: code } }, { status: true }],
  });
  voucher ? (response.data = voucher) : (response.status = 404);
  return response;
};
const validateAndApply = async (voucher, userId) => {
  let voucherValidation = await validate(voucher);
  if (voucherValidation && voucherValidation.data) {
    const result = await apply(voucherValidation.data._id, userId);
    console.log(result);
  }
};
const getByCode = async (code) => {
  return MVoucher.findOne({ code: { $eq: code } }).lean();
};

const getByUser = async (userid) => {
  return MVoucher.find({ user: userid }).lean().exec();
};

const getByCreator = async (creator) => {
  return MVoucher.find({ creator: creator }).lean().exec();
};

const apply = async (voucherId, userid) => {
  let response = { msg: null, error: null, status: 200 };
  let voucher = await MVoucher.findOne({
    $and: [{ _id: voucherId }, { status: true }],
  }).exec();
  if (voucher) {
    let billing = await MBilling.findOneAndUpdate(
      {
        user: userid,
      },
      {
        $inc: {
          accountFunds: voucher.creditsToApply,
        },
      },
      {
        projection: {
          _id: 0,
          user: 1,
        },
      }
    ).lean();
    if (billing) {
      voucher.status = false;
      voucher.dateOfUse = new Date();
      voucher.user = billing.user;
      await voucher.save();
      response.msg = "O voucher foi aplicado com sucesso!";
    } else {
      response.error =
        "O usuário é inválido para o pagamento. Entre em contato com o suporte!";
      response.status = 410;
    }
  } else {
    response.error = "Voucher inválido ou inexistente.";
    response.status = 404;
  }
  return response;
};

const getAll = async () => {
  const _total = await MVoucher.estimatedDocumentCount();
  const _used = await MVoucher.find({ status: false }).lean().exec();
  return {
    availables: _total - _used.length,
    used: _used,
  };
};

const getLasts = async (limit) => {
  limit = parseInt(limit);
  limit = limit <= 1000 ? limit : 1000;
  return MVoucher.find({}).sort({ createAt: -1 }).limit(limit).lean();
};

module.exports = {
  createLote,
  validate,
  validateAndApply,
  apply,
  getByCode,
  getByUser,
  getByCreator,
  getAll,
  getLasts,
};
