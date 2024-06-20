"use strict";

const { Contract } = require("./handlers.contract");
const {
  AsaasService,
} = require("../../../../../../infrastructure/services/asaas");

module.exports.AsaasHandler = class AsaasHandler extends Contract {
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
      AsaasService,
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
    this.getExternalId();
  }
  _getStatusPayment() {
    this.getStatusPayment();
  }

  _paymentReceived(status) {
    return status === "RECEIVED" || status === "RECEIVED_IN_CASH";
  }

  _paymentOverDue(event) {
    return event === "PAYMENT_OVERDUE";
  }

  handleBackpressure = async (args) => {
    const { gateway, paymentData } = args;
    const id =
      paymentData &&
      paymentData.payment &&
      paymentData.payment.externalReference;
    const hook = `${
      process && process.env && process.env.IUGU_CALLBACK_URL
    }/${gateway}`;
    return this.PutOnBackpressure(id, hook, paymentData);
  };

  doPayment = async (args) => {
    const {
      event,
      payment: { externalReference, status, value, id },
    } = args;
    let message = "ok";
    try {
      const payment = await this.GetPayment(externalReference);
      this.ValidatePaymentIsNotPaid(payment);
      await this.CreatePaymentLog(id, externalReference, args);
      const billing = await this.GetBilling(payment.billing);
      this.ValidateBilling(billing);
      const user = await this.GetUser(billing.user);
      this.ValidateUser(user);
      const paymentReceived = this._paymentReceived(status);
      const isOverDue = this._paymentOverDue(event);
      await this.ValidateOverDue(isOverDue, user, payment);
      if (paymentReceived)
        await this.DoConciliation(billing, payment, user, value);
    } catch (e) {
      message = e.message;
    }
    return message;
  };
};
