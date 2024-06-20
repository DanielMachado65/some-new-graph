"use strict";

const { Contract } = require("./handlers.contract");
const {
  sendEmailApprovedOrderOfDebts,
} = require("../../../../../mail/mailSender.service");

class SuperClassService {
  invoice;
  client;
  constructor() {
    // this.invoice = new Invoice();
    this.client = new Client();
  }
}

module.exports.ZapayHandler = class ZapayHandler extends Contract {
  constructor(
    paymentEmitter,
    paymentLogFacade,
    billingFacade,
    paymentFacade,
    userFacade,
    creditsLogFacade,
    packageFacade,
    invoiceFacade,
    mailSenderService,
    consumptionFacade,
    backpressureService,
    _mercadoPagoService
  ) {
    super(
      SuperClassService,
      paymentEmitter,
      paymentLogFacade,
      billingFacade,
      paymentFacade,
      userFacade,
      creditsLogFacade,
      packageFacade,
      invoiceFacade,
      mailSenderService,
      consumptionFacade,
      backpressureService
    );
  }

  async updatePaymentAccordingToState(payment, paid, state, user, protocol) {
    if (paid && state === "CHECKOUT_SUCCESS") {
      await this._updateStatusToPaid(payment, payment.totalPrice);
      const userName = user.name ? user.name.split(" ")[0].trim() || "" : "";
      const userEmail = user.email;
      await sendEmailApprovedOrderOfDebts(userEmail, userName, protocol);
    } else if (!paid && state === "CHECKOUT_FAIL") {
      await this._updateStatusToUnpaid(payment);
    } else {
      this._throwNewException("Payment received with unknown status");
    }
  }

  doPayment = async (args) => {
    const {
      data: { protocol, paid, state },
    } = args;
    try {
      const payment = await this.GetPaymentByChargeId(protocol);
      this.ValidatePaymentIsPending(payment);
      await this.CreatePaymentLog(protocol, payment._id, args);
      const billing = await this.GetBilling(payment.billing);
      this.ValidateBilling(billing);
      const user = await this.GetUser(billing.user);
      this.ValidateUser(user);
      await this.updatePaymentAccordingToState(
        payment,
        paid,
        state,
        user,
        protocol
      );
    } catch (e) {
      return e.message;
    }
    return "ok";
  };
};
