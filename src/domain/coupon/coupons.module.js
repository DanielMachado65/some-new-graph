"use strict";

const couponsFacade = require("./coupon.facade");

const findCoupons = couponsFacade.findCoupons;

const couponsLinkedToUser = couponsFacade.couponsLinkedToUser;

const updateCoupon = couponsFacade.update;

module.exports = {
  findCoupons,
  couponsLinkedToUser,
  updateCoupon,
};
