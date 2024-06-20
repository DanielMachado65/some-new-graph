"use strict";

const { Contract } = require("./handlers.contract");
const {
  Invoice,
  Client,
} = require("../../../../../../infrastructure/services/iugu");

class SuperClassService {
  invoice;
  client;
  constructor() {
    this.invoice = new Invoice();
    this.client = new Client();
  }
}

module.exports.IuguPixHandler = class IuguPixHandler extends Contract {
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

  _getExternalId() {
    super.getExternalId();
  }
  _getStatusPayment() {
    super.getStatusPayment();
  }

  _paymentReceived(status) {
    return status === "paid";
  }

  _paymentOverDue(event) {
    return event === "PAYMENT_OVERDUE";
  }

  _paymentIsNotReleased(event) {
    return !(event === "invoice.released");
  }

  _validatePaymentReleased(event) {
    if (this._paymentIsNotReleased(event)) {
      throw new Error("Payment didnt release yet");
    }
  }

  handleBackpressure = async (args) => {
    const { gateway, paymentData } = args;
    const id = paymentData && paymentData.data && paymentData.data.id;
    const hook = `https://api.olhonocarro.com.br/api/payment/webhook/${gateway}`;
    return this.PutOnBackpressure(id, hook, paymentData);
  };

  doPayment = async (args) => {
    const {
      data: { id, status },
      event,
    } = args;
    let message = "ok";
    try {
      const payment = await this.GetPaymentByChargeId(id);
      this.ValidatePaymentIsNotPaid(payment);
      await this.CreatePaymentLog(id, payment._id, args);
      const billing = await this.GetBilling(payment.billing);
      this.ValidateBilling(billing);
      const user = await this.GetUser(billing.user);
      this.ValidateUser(user);
      const paymentReceived = this._paymentReceived(status);
      this._validatePaymentReleased(event);
      // await super.ValidateOverDue(isOverDue, user, payment);
      if (paymentReceived)
        await this.DoConciliation(billing, payment, user, payment.totalPrice);
    } catch (e) {
      message = e.message;
    }
    return message;
  };
};
