"use strict";

const { Contract } = require("./handlers.contract");

class SuperClassService {
  constructor() {}
}

module.exports.MercadoPagoPixHandler = class MercadoPagoPixHandler extends Contract {
  mercadoPagoService = null;

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
    mercadoPagoService
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

    this.mercadoPagoService = mercadoPagoService;
  }

  _paymentReceived(status) {
    return status === "approved";
  }

  _validateHasValidateArgs(id, action) {
    const isValidId = typeof id === "string" && id.trim().length > 0;
    const isValidAction =
      action === "payment.updated" || action === "payment.created";
    if (!isValidId || !isValidAction)
      throw new Error("Payment didnt release yet");
  }

  async _getPaymentStatus(id) {
    const payment = await this.mercadoPagoService.getPayment(id);
    return payment.status;
  }

  doPayment = async (args) => {
    const { action, data } = args;
    const { id } = data ? data : {};

    try {
      this._validateHasValidateArgs(id, action);
      const payment = await this.GetPaymentByChargeId(id);
      this.ValidatePaymentIsNotPaid(payment);
      await this.CreatePaymentLog(id, payment._id, args);
      const billing = await this.GetBilling(payment.billing);
      this.ValidateBilling(billing);
      const user = await this.GetUser(billing.user);
      this.ValidateUser(user);
      const paymentStatus = await this._getPaymentStatus(id);
      const paymentReceived = this._paymentReceived(paymentStatus);
      if (paymentReceived)
        await this.DoConciliation(billing, payment, user, payment.totalPrice);
    } catch (e) {
      return e.message;
    }
    return "ok";
  };
};
