"use strict";

const voucher_codes = require("voucher-code-generator");
const _ = require("lodash");
const mongoose = require("mongoose");

const PARTNER_ERRORS = require("../../infrastructure/constants/message/partner/coupon.rules.message");

const partnerModule = require("../user/partnerModule");
const excelGeneratorModule = require("../support/excelGeneratorModule");
const priceTableModule = require("../billing/priceTableModule");
const packageModule = require("../billing/package/package.module");
const {
  COUPON_MESSAGES: { COUPON_MAX_USAGE_PER_USER, INVALID_COUPON },
} = require("../../infrastructure/constants/messagesHandler");
const CouponFacade = require("./coupon.facade");
const CouponFactory = require("./components/coupon.factory");
const CouponHelper = require("./components/coupon.helper");
const MCoupon = mongoose.models.MCoupon;
const MUser = mongoose.models.MUser;
const MPayment = mongoose.models.MPayment;

const VOUCHER_LENGHT = 6;

const createCoupon = async (rules, creator, couponName, generator) => {
  const alreadyExistCoupon = await CouponFacade.findByNameWithoutLimitation(
    couponName
  );
  CouponFacade.errorHandler.couponAlreadyExist(alreadyExistCoupon);
  const newCoupon = CouponFacade.factory.createCouponDto({
    rules,
    couponName,
    creator,
    generator,
  });
  await CouponFacade.create(newCoupon);
};

const userCanUseThisCoupon = async (userId, couponId) => {
  const response = { canUseCoupon: false, message: null };
  const projection = { "rules.usageMaxToUser": 1 };
  const coupon = await CouponFacade.getById(couponId, projection);
  if (coupon) {
    if (coupon.rules && coupon.rules.usageMaxToUser) {
      const user = await MUser.findById(userId, {
        billing: 1,
      }).lean();
      const paymentsUsedThisCoupon = await MPayment.find({
        status: { $ne: "canceled" },
        coupon: couponId,
        billing: user.billing,
      }).lean();
      response.canUseCoupon =
        paymentsUsedThisCoupon.length < coupon.rules.usageMaxToUser;
      if (!response.canUseCoupon) {
        response.message = COUPON_MAX_USAGE_PER_USER;
      }
      return response;
    }
    response.canUseCoupon = true;
    return response;
  }
  response.message = INVALID_COUPON;
  return response;
};

//@TODO: Improve Code !Urgent
const createLote = async (loteNumber, rules, creator, couponName) => {
  let response = {
    msg: null,
    error: false,
    code: 200,
    file: null,
  };
  let coupons = [];
  let partner = creator ? await partnerModule.getByUser(creator) : null;
  try {
    if (couponName) {
      let couponObject = {
        creator: creator,
        code: couponName,
        rules: {
          discountPercentage: rules.discountPercentage,
          discountValue: rules.discountValue,
          minValueToApply: rules.minValueToApply,
          expirationDate: rules.expirationDate
            ? new Date(rules.expirationDate)
            : null,
          limitUsage: rules.limitUsage ? rules.limitUsage : 1,
          authorized: {
            queries:
              rules.authorized && rules.authorized.queries
                ? rules.authorized.queries
                : [],
            packages:
              rules.authorized && rules.authorized.packages
                ? rules.authorized.packages
                : [],
          },
        },
      };
      coupons.push(couponObject);
    } else if (loteNumber > 10) {
      if (partner && partner.rules.coupons) {
        let pRules = partner.rules.coupons;
        if (pRules.discountPercentage < rules.discountPercentage) {
          response.msg = PARTNER_ERRORS.INVALID_DISCOUNT_PERCENTAGE;
          response.error = true;
          response.code = 410;
          return response;
        } else if (pRules.discountValue < rules.discountValue) {
          response.msg = PARTNER_ERRORS.INVALID_DISCOUNT_VALUE;
          response.error = true;
          response.code = 410;
          return response;
        } else if (pRules.minValueToApply > rules.minValueToApply) {
          response.msg = PARTNER_ERRORS.INVALID_MIN_VALUE_TO_APPLY;
          response.error = true;
          response.code = 410;
          return response;
        } else if (pRules.limitUsage < rules.limitUsage) {
          response.msg = PARTNER_ERRORS.INVALID_LIMIT_USAGE;
          response.error = true;
          response.code = 410;
          return response;
        }
      }
      let opts = {
        count: loteNumber,
        length: VOUCHER_LENGHT,
        charset: voucher_codes.charset("alphanumeric"),
      };
      let vouchers = voucher_codes.generate(opts);
      for (let voucher of vouchers) {
        let couponObject = {
          creator: creator,
          code: voucher,
          rules: {
            discountPercentage: rules.discountPercentage,
            discountValue: rules.discountValue,
            minValueToApply: rules.minValueToApply,
            expirationDate: rules.expirationDate
              ? new Date(rules.expirationDate)
              : null,
            limitUsage: rules.limitUsage ? rules.limitUsage : 1,
            authorized: {
              queries:
                rules.authorized && rules.authorized.queries
                  ? rules.authorized.queries
                  : [],
              packages:
                rules.authorized && rules.authorized.packages
                  ? rules.authorized.packages
                  : [],
            },
          },
        };
        coupons.push(couponObject);
      }
    } else {
      response.error = true;
      response.code = 410;
      response.msg = "Logica de geração de cupons inválida";
      return response;
    }
  } catch (e) {
    response.msg = e.message;
    response.error = true;
    response.code = 500;
  } finally {
    if (coupons.length) {
      await MCoupon.insertMany(coupons);
      let mapped = _.map(coupons, _.partialRight(_.pick, ["code"]));
      let report = excelGeneratorModule.generateCouponsXlsx(
        mapped,
        rules.discountPercentage,
        rules.discountValue,
        rules.limitUsage,
        rules.minValueToApply,
        rules.expirationDate
      );
      response.msg = "Cupons criados com sucesso!";
      response.file = report;
    }
  }
  return response;
};

// @todo all the functions above needs to stay at the right place

const validateIfUserCanUseCoupon = async (userId, couponId, response) => {
  if (!userId) return response;
  const userCanUseCoupon = await userCanUseThisCoupon(userId, couponId);
  if (!userCanUseCoupon.canUseCoupon)
    response = CouponHelper.invalidUseCouponByUserResponse(response);
  return response;
};
const getCouponData = async (couponCode) => {
  return MCoupon
    .findOne({ code: couponCode })
    .sort({ status: -1 })
    .collation({ locale: 'pt', strength: 2 })
    .exec();
};
const getTotalPriceWithoutDiscount = async (itemsCart, userId) => {
  const TOTAL_PRICE_QUERIES = await calculateTotalPriceOfQueries(
    itemsCart.queries,
    userId
  );
  const TOTAL_PRICE_PACKAGES = await calculateTotalPriceOfPackages(
    itemsCart.packages
  );
  return CouponHelper.sumTotalPrice(TOTAL_PRICE_QUERIES, TOTAL_PRICE_PACKAGES);
};
const calculateTotalPriceOfQueries = async (queries, userId) => {
  const priceTableData = await getPriceTableData(userId);
  let totalPrice = 0;
  for (let query of queries) {
    const queryOfPriceTable = priceTableData.template.find(
      (queryTemplate) => queryTemplate.querycode === query.code
    );
    if (!queryOfPriceTable) continue;
    const AMOUNT = query.amount;
    const PRICE =
      parseFloat(queryOfPriceTable.totalPrice) ||
      parseFloat(queryOfPriceTable.price);
    query.price = PRICE;
    totalPrice += AMOUNT * PRICE;
  }
  return totalPrice;
};
const calculateTotalPriceOfPackages = async (packages) => {
  let totalPrice = 0;
  for (let pack of packages) {
    const packageData = await packageModule.getById(pack.id);
    if (!packageData) continue;
    const AMOUNT = pack.amount;
    const PRICE = packageData.purchasePrice;
    totalPrice += AMOUNT * PRICE;
  }
  return totalPrice;
};
const getPriceTableData = async (userId) => {
  if (userId) return await priceTableModule.getByUser(userId);
  return await priceTableModule.getByName("default");
};

const couponValidation = async (couponCode, itemsCart, userId) => {
  let response = CouponFactory.response();
  const couponData = await getCouponData(couponCode);

  if (!couponData || !couponData.status)
    response = CouponHelper.invalidCouponResponse(response);
  if (!response.status) return response;

  const COUPON_ID = couponData._id;

  response = await validateIfUserCanUseCoupon(userId, COUPON_ID, response);
  if (!response.status) return response;

  response = CouponHelper.validationCouponDate(couponData, response);
  if (!response.status) return response;

  response = CouponHelper.validationCouponLimitUsage(couponData, response);
  if (!response.status) return response;

  const totalPriceWithoutDiscount = await getTotalPriceWithoutDiscount(
    itemsCart,
    userId
  );

  response = CouponHelper.validationCouponMinValueToApply(
    totalPriceWithoutDiscount,
    couponData,
    response
  );
  if (!response.status) return response;

  const totalPriceWithDiscount = CouponHelper.calculateTotalPriceWithDiscount(
    totalPriceWithoutDiscount,
    couponData
  );

  const discountValue = CouponHelper.calculateDiscount(
    totalPriceWithoutDiscount,
    totalPriceWithDiscount
  );

  response.result = CouponFactory.cartDto(
    totalPriceWithDiscount,
    discountValue,
    totalPriceWithoutDiscount,
    COUPON_ID,
    itemsCart.queries,
    itemsCart.packages
  );

  return response;
};

const getByCode = async (code) => {
  return await MCoupon.findOne({
    $text: {
      $search: code,
    },
  })
    .lean()
    .exec();
};

const getByUser = async (userid) => {
  return await MCoupon.find({
    creator: userid,
  })
    .limit(100)
    .lean()
    .exec();
};

const testeGenerateXlsx = () => {
  return excelGeneratorModule.generateCouponsXlsx();
};

const apply = async (couponId, value) => {
  return CouponFacade.apply(couponId, value);
};

//@TODO: Improve Code !Urgent
const getAll = async (creator, mainCoupons) => {
  if (mainCoupons) {
    return await MCoupon.find({ "rules.limitUsage": { $gt: 1 } })
      .limit(100)
      .lean();
  }

  const filter = creator
    ? {
      creator: creator,
    }
    : {};
  if (await partnerModule.getByUser(creator))
    return await MCoupon.find(filter).limit(100).select().lean().exec();
  else return await MCoupon.find({}).limit(100).select().lean().exec();
};

//@TODO: Improve Code !Urgent
const getLasts = async (limit) => {
  limit = parseInt(limit);
  //@todo create a constant Max_Limit
  limit = limit <= 100 ? limit : 100;
  return await MCoupon.find({})
    .sort({
      createAt: -1,
    })
    .limit(limit)
    .lean()
    .exec();
};

//@TODO: Improve Code !Urgent
const filterBy = async (iDt, eDt, code) => {
  let response = {
    status: 200,
    data: null,
  };
  try {
    let filter = {};
    if (code) {
      filter.code = { $regex: new RegExp(`.*${code}.*`) };
    } else {
      let init = new Date(iDt);
      let end = new Date(eDt);

      filter.$and = [{ createAt: { $gte: init } }, { createAt: { $lte: end } }];
    }

    response.data = await MCoupon.find(filter).lean();
  } catch (error) {
    response.status = 405;
  }
  return response;
};

const getBatchByIds = async (couponsIds) => {
  if (!couponsIds || !Array.isArray(couponsIds) || couponsIds.length === 0)
    return { result: [] };

  try {
    const setCouponsIds = new Set(couponsIds);
    const couponsIdsArray = [...setCouponsIds];
    const preCoupons = await MCoupon.find({
      _id: { $in: couponsIdsArray },
    })
      .lean()
      .exec();
    const hasAllCoupons = !!preCoupons.length;

    if (hasAllCoupons) {
      const coupons = couponsIds.map((couponId) => {
        return preCoupons.find(
          (preCoupon) => preCoupon._id.toString() === couponId
        );
      });
      return { result: coupons };
    } else {
      return { error: "INVALID_COUPON_ERROR", data: { hasAllCoupons } };
    }
  } catch (error) {
    return { error: "UNKNOWN_COUPON_ERROR", data: error };
  }
};

const decreaseUsageFromCouponsIds = async (couponsIds) => {
  try {
    await MCoupon.updateMany(
      {
        _id: { $in: couponsIds },
        "rules.limitUsage": { $ne: 0 },
      },
      {
        $inc: { "rules.limitUsage": -1 },
      }
    );
  } catch (e) {
    console.error(e);
  }
};

const getById = async (couponId) => {
  try {
    if (!couponId) return { result: null };
    const coupon = await MCoupon.findById(couponId).lean();
    if (!coupon) return { error: "INVALID_COUPON_ERROR", data: { coupon } };
    return { result: coupon };
  } catch (error) {
    const data =
      error instanceof Error
        ? { stack: error.stack, message: error.message }
        : error;
    return { error: "UNKNOWN_COUPON_ERROR", data: data };
  }
};

const validateIfCouponExists = (coupon) => {
  if (!coupon) throw new Error("Cupom inválido ou inexistente!");
};

module.exports = {
  createCoupon,
  createLote,
  apply,
  getByCode,
  userCanUseThisCoupon,
  getByUser,
  testeGenerateXlsx,
  getAll,
  getLasts,
  filterBy,
  getBatchByIds,
  decreaseUsageFromCouponsIds,
  getById,
  couponValidation,
  validators: {
    validateIfCouponExists,
  },
};
