const {
  PartnerIncomingRepository,
} = require("./components/partnerIncoming.repository");
const partnerIncomingRepository = new PartnerIncomingRepository();
const DateUtil = require("../../../infrastructure/utils/date.util");

const createPartnerIncoming = async (
  partnerId,
  userId,
  paymentId,
  couponId,
  couponCode,
  incomingRefValue
) => {
  return partnerIncomingRepository.create({
    partner: partnerId,
    user: userId,
    payment: paymentId,
    coupon: couponId,
    couponCode,
    incomingRefValue,
  });
};

const getAllPartnersIncomingsByDate = (maybeMonth, maybeYear) => {
  const { startDate, endDate } = DateUtil.getMonthStartEndDateOrDefault(
    maybeMonth,
    maybeYear
  );
  return partnerIncomingRepository.getAllPartnersIncomingsByDate(
    startDate,
    endDate
  );
};

const getSinglePartnerIncomingsByDate = (
  partnerUserId,
  maybeMonth,
  maybeYear
) => {
  const { startDate, endDate } = DateUtil.getMonthStartEndDateOrDefault(
    maybeMonth,
    maybeYear
  );
  return partnerIncomingRepository.getSinglePartnerIncomingsByDate(
    partnerUserId,
    startDate,
    endDate
  );
};

module.exports = {
  createPartnerIncoming,
  getAllPartnersIncomingsByDate,
  getSinglePartnerIncomingsByDate,
};
