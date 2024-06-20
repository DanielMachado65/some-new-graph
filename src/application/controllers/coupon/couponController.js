"use strict";

const couponModule = require("../../../domain/coupon/couponModule");

const createCoupon = async (rules, creator, couponName, generator) => {
  await couponModule.createCoupon(rules, creator, couponName, generator);
};

const createLote = async (loteNumber, rules, creator, couponName) => {
  return await couponModule.createLote(loteNumber, rules, creator, couponName);
};

const userCanUseThisCoupon = async (userId, couponId) => {
  return couponModule.userCanUseThisCoupon(userId, couponId);
};

const couponValidation = async (code, items, userId) => {
  let response = { data: null, code: 200, error: null };
  try {
    response.data = await couponModule.couponValidation(code, items, userId);
  } catch (e) {
    console.log(e);
    response.code = 410;
    response.error = "Não foi possível aplicar este cupom de desconto.";
  }
  return response;
};

const getByCode = async (code) => {
  return await couponModule.getByCode(code);
};

const getByUser = async (userid) => {
  return await couponModule.getByUser(userid);
};

const getAll = async (creator, mainCoupons) => {
  return await couponModule.getAll(creator, mainCoupons);
};

const filterBy = async (iDt, eDt, code) => {
  return await couponModule.filterBy(iDt, eDt, code);
};

module.exports = {
  createLote,
  userCanUseThisCoupon,
  couponValidation,
  getByCode,
  getByUser,
  getAll,
  filterBy,
  createCoupon,
};
