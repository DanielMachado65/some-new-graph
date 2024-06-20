"use strict";

const userFacade = require("../../user/user/user.facade");
const billingFacade = require("../billing/billing.facade");
const couponFacade = require("../../coupon/coupon.facade");
const partnerIncomingFacade = require("../../billing/partner_incoming/partnerIncoming.facade");
const paymentFacade = require("./payment.facade");
const nfeEmitter = require("../../nfes/nfe.emitter");
const userType = require("../../../infrastructure/enumerators/userType.enum");
const indicateAndEarnFacade = require("../../../domain/indicate-and-earn/indicateAndEarn.facade");

const {
  weakValidation,
} = require("../../../infrastructure/utils/weakValidator.util");

const Emitter = require("events");
class PaymentEmitter extends Emitter {
  static PAYMENT_SUCCEEDED = "PAYMENT_SUCCEEDED";
}
const paymentEmitter = new PaymentEmitter();

function loadEmitterInterface() {
  paymentEmitter.on(PaymentEmitter.PAYMENT_SUCCEEDED, paymentSucceeded);
}

async function getUser(userId) {
  if (!userId) return null;
  const user = await userFacade.getById(userId);
  weakValidation(user);
  return user;
}

async function getPayment(paymentId) {
  const payment = await paymentFacade.getPaymentById(paymentId);
  weakValidation(payment);
  return payment;
}

async function getBilling(billingId) {
  const billing = await billingFacade.getByBillingId(billingId);
  weakValidation(billing);
  return billing;
}

async function getSuccessfullyPaymentsCount(billingId) {
  const paymentsCount = await paymentFacade.getSuccessfullyTransactionsCountByBilling(
    billingId
  );
  weakValidation(paymentsCount);
  return paymentsCount.transactionsCount;
}

async function getCoupon(couponId) {
  if (!couponId) return null;
  const coupon = await couponFacade.getById(couponId);
  weakValidation(coupon);
  return coupon;
}

async function setOrderRolesIfCoupon(
  billing,
  maybeCoupon,
  isPartnerCouponCreator
) {
  if (maybeCoupon) {
    billing.orderRoles = {
      hasUsedCouponOnFirstOrder: true,
      coupon: maybeCoupon._id,
      couponCode: maybeCoupon.code,
      isPartnerCoupon: isPartnerCouponCreator,
    };
    billing.save();
  }
}

function isPartner(maybeUser) {
  return !!maybeUser && maybeUser.type !== userType.MASTER_USER_TYPE;
}

function needToUpdateBillingOrderRoles(billing, paymentsCount) {
  return (
    (!billing.orderRoles ||
      (billing.orderRoles && !billing.orderRoles.hasUsedCouponOnFirstOrder)) &&
    paymentsCount === 1
  );
}

function isEligibleToTurnIntoPartnerIncoming(billing, isPartnerCouponCreator) {
  return (
    billing &&
    billing.orderRoles &&
    billing.orderRoles.isPartnerCoupon &&
    isPartnerCouponCreator
  );
}

async function setPartnerIncoming(payment) {
  const billing = await getBilling(payment.billing);
  const paymentsCount = await getSuccessfullyPaymentsCount(billing._id);
  const maybeCoupon = await getCoupon(payment && payment.coupon);
  const maybeCouponCreator = await getUser(maybeCoupon && maybeCoupon.creator);
  const isPartnerCouponCreator = isPartner(maybeCouponCreator);

  if (needToUpdateBillingOrderRoles(billing, paymentsCount))
    await setOrderRolesIfCoupon(billing, maybeCoupon, isPartnerCouponCreator);

  if (isEligibleToTurnIntoPartnerIncoming(billing, isPartnerCouponCreator)) {
    await partnerIncomingFacade.createPartnerIncoming(
      maybeCouponCreator._id,
      billing.user,
      payment._id,
      maybeCoupon._id,
      maybeCoupon.code,
      payment.totalPaid
    );
  }
}

async function addGatewayToPayment(payment) {
  return delay(30000, async () => {
    const gatewayName = paymentFacade.getGatewayFromChargeId(payment);
    const defaultPaymentInfo = {
      gateway: gatewayName,
      isPaid: false,
      valuePaidInCents: 0,
    };
    const paymentInfo = await paymentFacade.getPaymentInfoFromGateway(
      payment.chargeId,
      gatewayName
    );
    const {
      gateway,
      isPaid: isPaidInGateway,
      valuePaidInCents: gatewayValuePaidInCents,
    } = paymentInfo || defaultPaymentInfo;
    await paymentFacade.updateById(payment._id, {
      gateway,
      isPaidInGateway,
      gatewayValuePaidInCents,
    });
  });
}

async function delay(delay, fn) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fn()
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    }, delay);
  });
}

async function paymentSucceeded(paymentId) {
  try {
    const payment = await getPayment(paymentId);
    if (payment.paid) {
      nfeEmitter.createNfe(paymentId).finally();
      setPartnerIncoming(payment).finally();
      paymentFacade.sendUserToEmailMarketing(payment).finally();
      indicateAndEarnFacade
        .indicateAndEarnSetTransactionCredit(payment)
        .finally();
      addGatewayToPayment(payment).finally();
    }
  } catch (error) {
    throw new Error(error);
    //trackError(error);
  }
}

loadEmitterInterface();

module.exports = {
  paymentSucceeded: (paymentId) => {
    paymentEmitter.emit(PaymentEmitter.PAYMENT_SUCCEEDED, paymentId);
  },
};
