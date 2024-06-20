"use strict";

module.exports.Payment = class Payment {
  constructor(
    config,
    httpClient,
    paymentValidator,
    paymentFactory,
    paymentAdapter
  ) {
    this.config = config;
    this.httpClient = httpClient;
    this.paymentValidator = paymentValidator;
    this.paymentFactory = paymentFactory;
    this.paymentAdapter = paymentAdapter;
    this.CUSTOMER_URL_BASE = this.config.URL_BASE_API + "/payments/";
  }

  async __createResponseFromPaymentObject(payment) {
    try {
      const paymentResponse = await this.httpClient.post(
        this.CUSTOMER_URL_BASE,
        payment,
        this.config.REQUEST_SETUP.DEFAULT_HEADERS
      );
      return this.paymentAdapter.transformPaymentResponseToCreating(
        paymentResponse
      );
    } catch (e) {
      return this.paymentAdapter.transformPaymentResponseToCreating(null, e);
    }
  }

  createPaymentWithBankingBillet = async (
    customerId,
    externalReference,
    value,
    description,
    dueDate,
    discountValue,
    discountDueDateLimitDays,
    discountType,
    fineValue,
    interestValue
  ) => {
    this.paymentValidator
      .validateCustomerId(customerId)
      .validatePaymentId(externalReference)
      .validateValueToCharge(value)
      .validateDueDate(dueDate);
    const payment = this.paymentFactory.createBankBilletBilling(
      customerId,
      externalReference,
      value,
      description,
      dueDate,
      discountValue,
      discountDueDateLimitDays,
      discountType,
      fineValue,
      interestValue
    );
    return this.__createResponseFromPaymentObject(payment);
  };

  createPaymentWithCreditCard = async (
    customerId,
    externalReference,
    value,
    description,
    dueDate,
    user,
    holderName,
    number,
    expiryMonth,
    expiryYear,
    ccv,
    remoteIp,
    discountValue,
    discountType,
    installmentCount,
    installmentValue,
    interestValue,
    fineValue
  ) => {
    this.paymentValidator
      .validateCustomerId(customerId)
      .validatePaymentId(externalReference)
      .validateValueToCharge(value)
      .validateDueDate(dueDate)
      .validateUserToCharge(user)
      .validateHolderName(holderName)
      .validateCardNumber(number)
      .validateExpiryMonth(expiryMonth)
      .validateExpiryYear(expiryYear);
    const payment = this.paymentFactory.createCreditCardBilling(
      customerId,
      externalReference,
      value,
      description,
      dueDate,
      user,
      holderName,
      number,
      expiryMonth,
      expiryYear,
      ccv,
      remoteIp,
      discountValue,
      discountType,
      installmentCount,
      installmentValue,
      interestValue,
      fineValue
    );
    return this.__createResponseFromPaymentObject(payment);
  };

  retrievePaymentByChargeId = async (chargeId) => {
    this.paymentValidator.validateChargeId(chargeId);
    const uri = this.CUSTOMER_URL_BASE + chargeId;
    const { response: paymentResponse } = await this.httpClient.get(uri, {
      headers: this.config.REQUEST_SETUP.DEFAULT_HEADERS,
    });
    return this.paymentAdapter.transformPaymentResponseToRetrieving({
      payment: paymentResponse,
      event: null,
    });
  };

  updatePaymentByChargeId = async () => {
    throw new Error("Not implemented yet");
  };

  refundPaymentByChargeId = async () => {
    throw new Error("Not implemented yet");
  };
};
