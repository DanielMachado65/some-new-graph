const BILLING_ERRORS = require("../../infrastructure/constants/message/billing/billing.errors.message");
const COUPONS_ERRORS = require("../../infrastructure/constants/message/billing/coupons.errors.message");
const QUERIES_ERRORS = require("../../infrastructure/constants/message/quiz.errors.message");
const PACKAGES_ERRORS = require("../../infrastructure/constants/message/billing/packages.errors.message");
const PRICE_TABLE_ERRORS = require("../../infrastructure/constants/message/billing/priceTable.errors.message");
const SYSTEM_ERRORS = require("../../infrastructure/constants/message/system.error.message");
const USER_ERRORS = require("../../infrastructure/constants/message/user/user.error.message");
const ResponseStatusEnum = require("../../infrastructure/dictionaries/ResponseStatusEnum");

module.exports.errorHandler = (error) => {
  switch (error) {
    case "INVALID_PARAMS":
      return {
        status: ResponseStatusEnum(405),
        msg: SYSTEM_ERRORS.INVALID_PARAMS,
      };

    case "ROBOT_SECURITY_ERROR":
      return {
        status: ResponseStatusEnum(401),
        msg: SYSTEM_ERRORS.ROBOT_ACTION_PERFORMED,
      };

    case "PAYMENT_FRAUD_ERROR":
      return {
        status: ResponseStatusEnum(401),
        msg: BILLING_ERRORS.ERROR_IN_PAYMENT_PROCCESSING,
      };

    case "ANALYSIS_FRAUD_ERROR":
      return {
        status: ResponseStatusEnum(401),
        msg: BILLING_ERRORS.CREDIT_CART_IN_ANALISIS,
      };

    case "INVALID_USER_ERROR":
      return {
        status: ResponseStatusEnum(405),
        msg: USER_ERRORS.INVALID_USER,
      };

    case "INVALID_BILLING_ERROR":
      return {
        status: ResponseStatusEnum(405),
        msg: BILLING_ERRORS.INVALID_ID,
      };

    case "INVALID_PRICE_TABLE_ERROR":
      return {
        status: ResponseStatusEnum(405),
        msg: PRICE_TABLE_ERRORS.TABLE_NOT_EXISTS,
      };

    case "INVALID_PACKAGE_ERROR":
      return {
        status: ResponseStatusEnum(405),
        msg: PACKAGES_ERRORS.INVALID_PACKAGE,
      };

    case "INVALID_QUERY_ERROR":
      return {
        status: ResponseStatusEnum(405),
        msg: QUERIES_ERRORS.INVALID_CODE,
      };

    case "INVALID_COUPON_ERROR":
      return {
        status: ResponseStatusEnum(405),
        msg: COUPONS_ERRORS.INVALID_CODE,
      };

    case "PACKAGE_BUILD_PAYMENT_ERROR":
      return {
        status: ResponseStatusEnum(405),
        msg: BILLING_ERRORS.INVALID_BUYOUT_PAYMENT_BUILD,
      };

    case "QUERY_BUILD_PAYMENT_ERROR":
      return {
        status: ResponseStatusEnum(405),
        msg: BILLING_ERRORS.INVALID_BUYOUT_PAYMENT_BUILD,
      };

    case "INVALID_PAYMENT_ERROR":
      return {
        status: ResponseStatusEnum(405),
        msg: BILLING_ERRORS.INVALID_BUYOUT_PAYMENT_BUILD,
      };

    case "UPDATE_PAYMENT_ERROR":
      return {
        status: ResponseStatusEnum(405),
        msg: BILLING_ERRORS.UPDATE_PAYMENT,
      };

    case "NOT_PAID_PAYMENT_ERROR":
      return {
        status: ResponseStatusEnum(405),
        msg: BILLING_ERRORS.NOT_PAID,
      };

    case "CREATE_BALANCE_ERROR":
      return {
        status: ResponseStatusEnum(405),
        msg: BILLING_ERRORS.CREATE_BALANCE,
      };

    case "ADD_FUNDS_BILLING_ERROR":
      return {
        status: ResponseStatusEnum(405),
        msg: BILLING_ERRORS.ADD_FUNDS,
      };

    case "UPDATE_BILLING_ERROR":
      return {
        status: ResponseStatusEnum(405),
        msg: BILLING_ERRORS.UPDATE_BILLING,
      };

    case "UNKNOWN_SECURITY_ERROR":
      return {
        status: ResponseStatusEnum(500),
        msg: SYSTEM_ERRORS.UNKNOWN_ERROR,
      };

    case "UNKNOWN_USER_ERROR":
      return {
        status: ResponseStatusEnum(500),
        msg: USER_ERRORS.UNKNOWN_ERROR,
      };

    case "UNKNOWN_BILLING_ERROR":
      return {
        status: ResponseStatusEnum(500),
        msg: BILLING_ERRORS.UNKNOWN_ERROR,
      };

    case "UNKNOWN_CART_ITEMS_ERROR":
      return {
        status: ResponseStatusEnum(500),
        msg: BILLING_ERRORS.UNKNOWN_ERROR,
      };

    case "UNKNOWN_PAYMENT_ERROR":
      return {
        status: ResponseStatusEnum(500),
        msg: BILLING_ERRORS.UNKNOWN_ERROR,
      };

    case "UNKNOWN_BALANCE_ERROR":
      return {
        status: ResponseStatusEnum(500),
        msg: BILLING_ERRORS.UNKNOWN_ERROR,
      };

    default:
      return {
        status: ResponseStatusEnum(500),
        msg: SYSTEM_ERRORS.UNKNOWN_ERROR,
      };
  }
};
