const CouponFactory = require("./components/coupon.factory");
const CouponRepository = require("./components/coupon.repository");
const CouponErrorHandler = require("./components/coupon.errorHandler");

const create = async (coupon) => {
  return CouponRepository.create(coupon);
};

const findByNameWithoutLimitation = async (couponName) => {
  return CouponRepository.findByNameWithoutLimitation(couponName);
};

const getById = async (couponId, projection) => {
  return CouponRepository.getById(couponId, projection);
};

const applyCouponToCartItems = (items, couponData) => {
  let itemsDto = items;
  if (couponData && couponData.status) {
  }
  return itemsDto;
};

function applyDiscountOverValue(coupon, value) {
  if (!coupon) return value;
  if (coupon.rules.discountPercentage)
    value = value - value * (coupon.rules.discountPercentage / 100);
  else if (coupon.rules.discountValue && value - coupon.rules.discountValue > 0)
    value = value - coupon.rules.discountValue;
  return parseFloat(value.toFixed(2));
}

const apply = async (couponId, value) => {
  let coupon = await CouponRepository.getById(couponId);
  return applyDiscountOverValue(coupon, value);
};

const applySync = (coupon, value) => {
  return applyDiscountOverValue(coupon, value);
};

const findCoupons = ({ code, percentage, discount, status }) => {
  const filters = [{ creator: { $ne: null } }];

  if (status === 'enabled' || status === 'disabled') {
    filters.push({ status: status === 'enabled' ? true : false });
  }
  if (code) {
    filters.push({ code: { $regex: new RegExp(`.*${code}.*`) } });
  }
  if (percentage) {
    filters.push({ "rules.discountPercentage": percentage });
  }
  if (discount && !isNaN(discount)) {
    const value = parseInt(discount) / 100;
    filters.push({ "rules.discountValue": value });
  }

  return CouponRepository.findWithCreatorEmailLean(filters);
};

const couponsLinkedToUser = (userId) => {
  return CouponRepository.countByUserID(userId);
};

const update = (couponId, data) => {
  const dataToUpdate = {};

  if (data.status === true || data.status === false)
    dataToUpdate.status = data.status;
  if (data.userId || data.userId === null) dataToUpdate.creator = data.userId;
  if (data.limitUsage || !isNaN(data.limitUsage))
    dataToUpdate["rules.limitUsage"] = data.limitUsage;
  if (!isNaN(data.usageMaxToUser))
    dataToUpdate["rules.usageMaxToUser"] = data.usageMaxToUser;

  return CouponRepository.updateOne({ _id: couponId }, dataToUpdate);
};

module.exports = {
  apply,
  applySync,
  create,
  getById,
  findByNameWithoutLimitation,
  factory: CouponFactory,
  errorHandler: CouponErrorHandler,
  applyCouponToCartItems,
  findCoupons,
  couponsLinkedToUser,
  update,
};
