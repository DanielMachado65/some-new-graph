"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MBillingSchema = new Schema(
  {
    createAt: { type: Date, default: Date.now },
    billingType: { type: Number, default: 1 }, // 1 = pre pago,  2 = pós pago
    user: {
      type: Schema.Types.ObjectId,
      ref: "MUser",
      default: null,
      unique: true,
    },
    priceTable: {
      type: Schema.Types.ObjectId,
      ref: "MPriceTable",
      default: null,
    },
    fatmin: { type: Number, default: 0.0 },
    dspac: { type: Number, default: 0.0 },
    invoices: [
      {
        invoice: {
          type: Schema.Types.ObjectId,
          ref: "MInvoice",
          default: null,
        },
        insertDate: { type: Date, default: null },
      },
    ],
    packages: [
      {
        purchasePrice: { type: Number, default: 0.0 }, // preço do pacote que o cliente irá pagar
        attributedValue: { type: Number, default: 0.0 }, // valor para ser atribuido em créditos para o cliente
        name: { type: String, deafult: null }, // nome do pacote
        accessionDate: { type: Date, default: Date.now }, // data de adesão
        amount: { type: Number, default: 1 },
        discountPercent: { type: Number, default: 0.0 }, // percentual de desconto
      },
    ],
    accountFunds: { type: Number, default: 0.0 },
    financialLock: {
      value: { type: Number, default: 0.0 },
    },
    activeAccount: { type: Boolean, default: true },
    billingHierarchy: {
      mothersWallet: {
        type: Schema.Types.ObjectId,
        ref: "MBilling",
        default: null,
      },
    },
    payment: {
      expirationDay: { type: Number, default: 10 },
    },
    deadlineToPay: {
      initDate: { type: Date, default: null },
      endDate: { type: Date, default: null },
    },
    isReliable: { type: Boolean, default: false }, //  se o cliente é confiavel ou não para analise de risco - konduto
    subscriptions: [
      {
        subscription: {
          type: Schema.Types.ObjectId,
          ref: "MSubscription",
          default: null,
        },
      },
    ],
    orderRoles: {
      hasUsedCouponOnFirstOrder: { type: Boolean, default: false },
      coupon: { type: Schema.Types.ObjectId, ref: "MCoupon", default: null },
      couponCode: { type: String, default: null },
      isPartnerCoupon: { type: Boolean, default: null },
    },
  },
  {
    usePushEach: true,
  }
);

module.exports.MBillingSchema = MBillingSchema;
module.exports.MBilling = mongoose.model("MBilling", MBillingSchema);
