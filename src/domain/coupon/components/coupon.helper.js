const {
  COUPON_MESSAGES: {
    COUPON_MAX_USAGE_PER_USER,
    INVALID_COUPON,
    HAS_EXPIRED,
    MINIMUM_VALUE_NOT_REACHED,
  },
} = require("../../../infrastructure/constants/messagesHandler");

const invalidCouponResponse = (response) => {
  response.status = false;
  response.msg = INVALID_COUPON;
  return response;
};
const invalidUseCouponByUserResponse = (response) => {
  response.status = false;
  response.msg = COUPON_MAX_USAGE_PER_USER;
  return response;
};
const invalidDateCouponResponse = (response) => {
  response.status = false;
  response.msg = HAS_EXPIRED;
  return response;
};
const invalidLimitUsageCouponResponse = (response) => {
  response.status = false;
  response.msg = HAS_EXPIRED;
  return response;
};
const invalidMinValueToApplyCouponResponse = (response, couponRulesData) => {
  const MIN_VALUE_MESSAGE = ` Valor mínimo => R$  ${couponRulesData.minValueToApply.toFixed(
    2
  )} `;
  response.status = false;
  response.msg = MINIMUM_VALUE_NOT_REACHED + MIN_VALUE_MESSAGE;
  return response;
};

const validationCouponDate = (couponData, response) => {
  const DATE_NOW = new Date();
  const EXPIRATION_DATE = couponData.rules.expirationDate
    ? new Date(couponData.rules.expirationDate)
    : null;
  if (EXPIRATION_DATE && EXPIRATION_DATE < DATE_NOW)
    response = invalidDateCouponResponse(response);
  return response;
};
const validationCouponLimitUsage = (couponData, response) => {
  if (couponData.rules.limitUsage === 0)
    return invalidLimitUsageCouponResponse(response);
  return response;
};
const validationCouponMinValueToApply = (totalPrice, couponData, response) => {
  if (couponData.rules.minValueToApply > totalPrice)
    response = invalidMinValueToApplyCouponResponse(response, couponData.rules);
  return response;
};
const calculateDiscountValue = (totalPriceWithoutDiscount, couponData) => {
  let VALUE_DISCOUNT = 0;
  if (couponData.rules.discountValue)
    VALUE_DISCOUNT = couponData.rules.discountValue;
  if (couponData.rules.discountPercentage)
    VALUE_DISCOUNT =
      totalPriceWithoutDiscount * (couponData.rules.discountPercentage / 100);
  return parseFloat(VALUE_DISCOUNT.toFixed(2));
};
const getTotalPrice = (totalPrice, discountValue) => {
  const totalDiscountedPrice = parseFloat(
    (totalPrice - discountValue).toFixed(2)
  );
  return totalDiscountedPrice || 0;
};

const calculateTotalPriceWithDiscount = (
  totalPriceWithoutDiscount,
  couponData
) => {
  if (couponData.rules.discountValue) {
    const totalPriceWithDiscountStr = (
      totalPriceWithoutDiscount - couponData.rules.discountValue
    ).toFixed(2);
    return parseFloat(totalPriceWithDiscountStr);
  }

  if (couponData.rules.discountPercentage) {
    const percentageToKeep = 100 - couponData.rules.discountPercentage;
    const totalPriceWithDiscountStr = (
      (totalPriceWithoutDiscount * percentageToKeep) /
      100
    ).toFixed(2);
    return parseFloat(totalPriceWithDiscountStr);
  }

  return totalPriceWithoutDiscount;
};

const calculateDiscount = (
  totalPriceWithoutDiscount,
  totalPriceWithDiscount
) => {
  const discountStr = (
    totalPriceWithoutDiscount - totalPriceWithDiscount
  ).toFixed(2);
  return parseFloat(discountStr);
};

const sumTotalPrice = (totalPriceQueries, totalPricePackages) =>
  parseFloat((totalPriceQueries + totalPricePackages).toFixed(2));

module.exports = {
  invalidCouponResponse,
  invalidUseCouponByUserResponse,
  invalidDateCouponResponse,
  invalidLimitUsageCouponResponse,
  invalidMinValueToApplyCouponResponse,
  validationCouponDate,
  validationCouponLimitUsage,
  validationCouponMinValueToApply,
  calculateDiscount,
  calculateDiscountValue,
  calculateTotalPriceWithDiscount,
  getTotalPrice,
  sumTotalPrice,
};
