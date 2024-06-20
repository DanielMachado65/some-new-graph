"use strict";

const {
  DebtsService,
} = require("../../infrastructure/services/debts/debts.service");
const {
  HttpClientService,
} = require("../../infrastructure/services/http_client");

const httpClient = new HttpClientService(
  HttpClientService.strategyBuilder().useAxios()
);
const debtsService = new DebtsService(
  httpClient,
  process.env.APPLICATION_ID,
  process.env.DEBTS_SERVICE_URL
);

const debtTypeName = {
  none: "Outros",
  licensing: "Licenciamento",
  ipva: "IPVA",
  ticket: "Infrações de trânsito",
};

const parseDebt = (debt) => {
  if (!debt || typeof debt !== "object") return null;
  return {
    protocol: debt.protocol || null,
    externalId: debt.externalId || null,
    title: debt.title,
    description: debt.description,
    amountInCents: debt.amountInCents,
    dueDate: debt.dueDate,
    required: debt.required,
    distinct: debt.distinct,
    dependsOn: debt.dependsOn,
  };
};

const parseDebtGroup = (debtGroup) => {
  const debtType = debtTypeName[debtGroup.type || "none"] || "Outros";
  const debts = Array.isArray(debtGroup.records) ? debtGroup.records : [];
  return {
    type: debtType,
    totalAmountInCents: debts.reduce(
      (total, record) => total + record.amountInCents,
      0
    ),
    debts: debts
      .filter(
        (debt) =>
          debt &&
          typeof debt === "object" &&
          !!debt.externalId &&
          !!debt.protocol
      )
      .filter((debt) => {
        const pattern = /cota [0-9]$/;
        return (
          debt.type !== "ipva" ||
          (debt.type === "ipva" && !pattern.test(debt.title.toLowerCase()))
        );
      })
      .map(parseDebt),
  };
};

const parseMoney = (value) => Math.floor(value * 100);

const parseInstallment = (installment) => {
  return {
    priceWithInterestInCents: parseMoney(installment.priceWithInterest),
    priceInCents: parseMoney(installment.price),
    numberOfInstallments: installment.amount,
    fee: installment.fee,
    monthlyFee: installment.monthlyFee,
    type: installment.type,
    mayUseCoupon: installment.coupon,
  };
};

const searchDebts = async (plate) => {
  const data = await debtsService.searchDebts(plate);
  if (!data.protocol) throw new Error("No debts found for this plate");
  const debtsGroup = data && Array.isArray(data.debts) ? data.debts : [];
  return {
    protocol: data.protocol,
    debtsGroup: debtsGroup
      .filter((debtGroup) => debtGroup && typeof debtGroup === "object")
      .map(parseDebtGroup),
  };
};

const retrieveDebtsByProtocolAndExternalIds = async (protocol, debtIds) => {
  const data = await debtsService.retrieveDebtsByProtocolAndExternalIds(
    protocol,
    debtIds
  );
  const debts = Array.isArray(data) ? data : [];
  return {
    debts: debts
      .filter(
        (debt) =>
          debt &&
          typeof debt === "object" &&
          !!debt.externalId &&
          !!debt.protocol
      )
      .map(parseDebt),
  };
};

const retrieveInstallments = async (protocol, debtIds) => {
  const data = await debtsService.retrieveInstallments(protocol, debtIds);
  const installments = Array.isArray(data) ? data : [];
  return {
    installmentsPlan: installments
      .filter((installment) => installment && typeof installment === "object")
      .map(parseInstallment),
  };
};

const executeCheckout = async (
  userId,
  userCpf,
  protocol,
  debtIds,
  numberOfInstallments,
  debtsCreditCard,
  billingAddress,
  customer
) => {
  return debtsService.executeCheckout(
    userId,
    userCpf,
    protocol,
    debtIds,
    numberOfInstallments,
    debtsCreditCard,
    billingAddress,
    customer
  );
};

module.exports = {
  executeCheckout,
  searchDebts,
  retrieveDebtsByProtocolAndExternalIds,
  retrieveInstallments,
};
