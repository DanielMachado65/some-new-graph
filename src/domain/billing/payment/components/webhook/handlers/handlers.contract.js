"use strict";

const InvoiceStatusDict = require("../../../../../../infrastructure/dictionaries/InvoiceStatus.dictionary");
const InvoiceStatusEnum = require("../../../../../../infrastructure/enumerators/invoiceStatus.enum");
const BillingTypeEnum = require("../../../../../../infrastructure/enumerators/billing.enum");
const PaymentTypeEnum = require("../../../../../../infrastructure/enumerators/paymentMethod.enum");

module.exports.Contract = class Contract {
  constructor(
    Service,
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
  ) {
    this._service = new Service();
    this._paymentEmitter = paymentEmitter;
    this._paymentLogFacade = paymentLogFacade;
    this._billingFacade = billingFacade;
    this._paymentFacade = paymentFacade;
    this._creditsLogFacade = creditsLogFacade;
    this._packageFacade = packageFacade;
    this._invoiceFacade = invoiceFacade;
    this._consumptionFacade = consumptionFacade;
    this._userFacade = userFacade;
    this._mailSenderService = mailSenderService;
    this._backpressureService = backpressureService;
  }
  _throwNewException(msg) {
    throw new Error(msg);
  }

  GetPaymentByChargeId = async (chargeId) => {
    return this._paymentFacade.findOne({ chargeId });
  };

  GetPayment = async (_id) => {
    return this._paymentFacade.findOne({ _id });
  };

  GetBilling = async (_id) => {
    return this._billingFacade.findById(_id);
  };

  GetUser = async (_id) => {
    return this._userFacade.getById(_id);
  };

  ValidatePaymentIsNotPaid(payment) {
    if (payment && payment.paid === true)
      this._throwNewException("Payment is paid already");
  }

  ValidatePaymentIsPending(payment) {
    if (payment && payment.status !== "pending")
      this._throwNewException("Payment is not pending");
  }

  ValidateBilling(billing) {
    if (!billing) this._throwNewException("Billing not exists");
  }

  ValidateUser(user) {
    if (!user) this._throwNewException("User not exists");
  }

  ClientIsPrePaid(billing) {
    return billing && billing.billingType === BillingTypeEnum.PRE_PAID;
  }

  ClientIsPostPaid(billing) {
    return billing && billing.billingType === BillingTypeEnum.POS_PAID;
  }

  getExternalId() {}
  getStatusPayment() {}

  CreatePaymentLog = async (chargeId, paymentId, rawData, token) => {
    await this._paymentLogFacade.createNewLog({
      chargeId,
      payment: paymentId,
      raw: rawData,
      token,
    });
  };

  AddCredits = async (billing, payment) => {
    await this._billingFacade.addCreditsByUser(billing.user, payment.realPrice);
    await this._creditsLogFacade.createNewLog(
      this._creditsLogFactory(billing, payment)
    );
  };

  UpdatePaymentStatusToPaidAndAddCredits = async (paymentId, totalPaid) => {
    const payment = await this._paymentFacade.findOne({ _id: paymentId });
    if (payment) {
      const billing = await this._billingFacade.findById(payment.billing, {
        _id: 1,
        user: 1,
      });
      await this._updateStatusToPaid(payment, totalPaid);
      await this.AddCredits(billing, payment);
      await this._addPackagesOnPaymentToBillingPackagesArray(
        billing._id,
        payment.items
      );
      this._paymentEmitter.paymentSucceeded(paymentId);
    }
  };

  async _updateStatusInvoiceToPaidByPayment(paymentId) {
    const invoice = await this._invoiceFacade.findOne(
      { payment: paymentId },
      {
        consumptionStatementLote: 1,
        billing: 1,
        refMonth: 1,
        refYear: 1,
      }
    );
    if (invoice) {
      const childrenIds = await this._billingFacade.distinctChildrenBillingIdsByMotherBilling(
        invoice.billing
      );
      const invoices = await this._invoiceFacade.getInvoicesByRefMonthAndRefYearAndBillingIds(
        childrenIds,
        invoice.refMonth,
        invoice.refYear,
        { consumptionStatementLote: 1, billing: 1 }
      );
      const promises = invoices.map((invoice) =>
        this._updateInvoiceConsumptionsAndBillingActiveAccount(invoice)
      );
      await Promise.all(promises);
      this._paymentEmitter.paymentSucceeded(paymentId);
    }
  }

  async _updateInvoiceConsumptionsAndBillingActiveAccount(invoice) {
    await Promise.all([
      this.setInvoiceToPaid(invoice),
      this.setConsumptionsToPaid(invoice),
      this.doActivateAccount(invoice),
    ]);
  }

  async doActivateAccount(invoice) {
    await this._billingFacade.updateOne(
      { _id: invoice.billing },
      {
        activeAccount: true,
        "deadlineToPay.initDate": null,
        "deadlineToPay.endDate": null,
      }
    );
  }

  async setConsumptionsToPaid(invoice) {
    await this._consumptionFacade.updateMany(
      { _id: { $in: invoice.consumptionStatementLote } },
      { status: true, payday: new Date() }
    );
  }

  async setInvoiceToPaid(invoice) {
    await this._invoiceFacade.updateOne(
      {
        _id: invoice._id,
      },
      {
        status: InvoiceStatusDict.get(InvoiceStatusEnum.PAID),
        paymenteDate: new Date(),
      }
    );
  }

  async _updateStatusToPaid(payment, totalPaid) {
    await this._paymentFacade.update(
      { _id: payment._id },
      { paymentDate: new Date(), paid: true, status: "paid", totalPaid }
    );
  }

  async _updateStatusToUnpaid(payment) {
    await this._paymentFacade.updatePaymentToUnpaidStatus(payment._id);
  }

  _addPackagesOnPaymentToBillingPackagesArray = async (billingId, items) => {
    const promises = items
      .filter((item) => item.packageid)
      .map((pack) => this._packageFacade.getById(pack.packageid));
    if (promises.length) {
      const packages = await Promise.all(promises);
      const itemsToAddOnPackagesArray = this._getItemsToPushOnItemsArray(
        packages,
        items
      );
      await this._updatePackagesOnBilling(billingId, itemsToAddOnPackagesArray);
    }
  };

  async _updatePackagesOnBilling(billingId, itemsToAddOnPackagesArray) {
    await this._billingFacade.updateOne(
      { _id: billingId },
      { $push: { packages: { $each: itemsToAddOnPackagesArray } } }
    );
  }

  _getItemsToPushOnItemsArray(packages, items) {
    return packages
      .map((pack) => {
        return this._itemToAddToPackageArrayFactory(items, pack);
      })
      .filter((item) => item);
  }

  _itemToAddToPackageArrayFactory(items, pack) {
    const item = this._findPackageByIdOnItemsArray(items, pack);
    if (item) {
      return {
        purchasePrice: pack.purchasePrice,
        attributedValue: pack.attributedValue,
        name: pack.name,
        amount: item.amount,
        discountPercent: pack.discountPercent,
      };
    }
  }

  _findPackageByIdOnItemsArray(items, pack) {
    return items.find((item) => item.packageid === pack._id.toString());
  }

  _creditsLogFactory(billing, payment) {
    return {
      billing: billing._id,
      payment: payment._id,
      valueCredited: payment.realPrice,
      status: true,
    };
  }

  _doPrePaidConciliation = async (payment, value) => {
    await this.UpdatePaymentStatusToPaidAndAddCredits(payment._id, value);
  };

  _canBeUpdateInvoiceStatusToPaid(payment, valueToCompare) {
    const valueToCompareUpper = valueToCompare + 1;
    return (
      payment.realPrice <= valueToCompare ||
      payment.realPrice <= valueToCompareUpper
    );
  }

  _doPostPaidConciliation = async (payment, value) => {
    const canBeUpdateInvoice = this._canBeUpdateInvoiceStatusToPaid(
      payment,
      value
    );
    if (canBeUpdateInvoice)
      await this._updateStatusInvoiceToPaidByPayment(payment._id);
  };

  ValidateOverDue = async (isOverDue, user, payment) => {
    if (isOverDue === true && payment.type === PaymentTypeEnum.BANKING_BILLET) {
      await this._mailSenderService.sendMailToOrderDeclinedByBanking(
        user.name,
        payment.bankingBillet && payment.bankingBillet.link,
        user.email
      );
      this._throwNewException("Payment over due");
    }
  };

  DoConciliation = async (billing, payment, user, value) => {
    if (this.ClientIsPrePaid(billing))
      await this._doPrePaidConciliation(payment, value);
    if (this.ClientIsPostPaid(billing))
      await this._doPostPaidConciliation(payment, value);
  };

  PutOnBackpressure = async (id, hook, data) => {
    return this._backpressureService.addToBackpressure(id, hook, data);
  };
};
