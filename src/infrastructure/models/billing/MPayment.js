"use strict";

const { Schema, model } = require("mongoose");
const gatewayEnum = require("../../enumerators/gateway.enum");

function getMonth() {
  return new Date().getMonth();
}

function getYear() {
  return new Date().getFullYear();
}

const PaymentSchema = new Schema(
  {
    createAt: { type: Date, default: Date.now },
    billing: {
      type: Schema.Types.ObjectId,
      ref: "MBilling",
      required: true,
    },
    debts: {
      installment: {
        fee: { type: Number, default: 0 },
        numberOfInstallments: { type: Number, default: 0 },
        coupon: { type: String, default: null },
        type: { type: String, default: null },
        priceInCents: { type: Number, default: 0 },
        monthlyFee: { type: Number, default: 0 },
        priceWithInterestInCents: { type: Number, default: 0 },
      },
      items: [
        {
          protocol: { type: String, default: null },
          externalId: { type: String, default: null },
          title: { type: String, default: null },
          description: { type: String, default: null },
          amountInCents: { type: Number, default: 0 },
          dueDate: { type: Date, default: null },
          required: { type: Boolean, default: false },
          distinct: [String],
          dependsOn: [String],
        },
      ],
    },
    items: [
      {
        // itens a serem pagos
        name: { type: String, default: null },
        realValue: { type: Number, default: 0 },
        value: { type: Number, default: 0 },
        amount: { type: Number, default: 0 },
        queryId: {
          type: Schema.Types.ObjectId,
          ref: "MQueryComposer",
          default: null,
        },
        packageid: {
          type: Schema.Types.ObjectId,
          ref: "MPackage",
          default: null,
        },
        signatureId: {
          type: Schema.Types.ObjectId,
          ref: "MPlan",
          default: null,
        },
      },
    ],
    chargeId: { type: String, default: null }, // codigo da transação
    status: { type: String, default: null }, // status do pagamento "new", "paid", "unpaid", etc...
    totalPrice: { type: Number, default: 0 }, // total que deve ser pago
    totalPaid: { type: Number, default: 0 }, // total pago de fato
    realPrice: { type: Number, default: 0 }, // valor sem descontos
    paid: { type: Boolean, default: false }, // se o pagamento foi pago ou não
    type: { type: String, default: null }, // tipo de pagamento "banking_billet", "credit_card" ou "pix"
    cnpj: { type: String, default: '25400804000109' },
    paymentDate: { type: Date, default: null },
    creditCard: {
      token: { type: String },
      installments: { type: Number },
      installmentValue: { type: Number },
    },
    bankingBillet: {
      barcode: { type: String },
      link: { type: String },
      expireAt: { type: Date, default: null },
    },
    pix: {
      qrcode: { type: String },
      qrcodeText: { type: String },
    },
    gateway: {
      type: String,
      enum: Object.values(gatewayEnum),
      default: gatewayEnum.UNKNOWN,
    },
    isPaidInGateway: { type: Boolean, default: false },
    gatewayValuePaidInCents: { type: Number, default: 0 },
    nfe: { type: Schema.Types.ObjectId, ref: "MNFe", default: null },
    coupon: { type: Schema.Types.ObjectId, ref: "MCoupon", default: null },
    refMonth: { type: Number, default: getMonth },
    refYear: { type: Number, default: getYear },
    creationOrigin: { type: String, enum: ['website', 'mobile', 'unknown'], default: 'unknown' },
  },
  {
    usePushEach: true,
  }
);

model("MPayment", PaymentSchema);
