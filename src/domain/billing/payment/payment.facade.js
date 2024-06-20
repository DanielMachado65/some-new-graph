"use strict";
const {
  getStringDateFormatIn_AAAA_MM_DD,
  getStringDateFormatIn_MM_DD,
  addDaysToDate,
  getStartOfDay,
  getEndOfDay,
} = require("../../../infrastructure/utils/date.util");
const moment = require("moment");
const utils = require("../../../infrastructure/utils/utils");
const couponModule = require("../../coupon/couponModule");
const {
  PaymentRepository,
} = require("./components/reporitory/payment.repository");
const {
  UserRepository,
} = require("../../user/user/components/user.repository");
const frontLogModule = require("../../../domain/log/frontLogModule");
const HandlerSelectionMap = require("./components/webhook/selectorHandler.map");
const paymentRepository = new PaymentRepository();
const userRepository = new UserRepository();
const paymentService = require("./components/paymet_service");
const billingModule = require("../billing/billing.module");

const { upload } = require("../../../infrastructure/services/aws/oncS3Service");
const {
  REPORTS_ONC,
} = require("../../../infrastructure/constants/storages.constant");
const UserEvents = require("../../user/user/user.emitter");
const marketeingSenderService = require("../../mail/marketing/marketingSender.service");
const priceUtils = require("../../../infrastructure/utils/price.util");

const {
  HttpClientService,
} = require("../../../infrastructure/services/http_client");
const { AsaasService } = require("../../../infrastructure/services/asaas");
const userTypeEnum = require("../../../infrastructure/enumerators/userType.enum");
const gatewayEnum = require("../../../infrastructure/enumerators/gateway.enum");
const httpClient = new HttpClientService(
  HttpClientService.strategyBuilder().useAxios()
);
const asaasService = new AsaasService(httpClient, userTypeEnum);
const gerenciaNetService = require("../../../infrastructure/services/gerencia_net/gerenciaNetService");
const iuguService = require("../../../infrastructure/services/iugu/iugu.service");
const mercadoPagoService = require("../../../infrastructure/services/mercado-pago/mercado-pago.service");

const findOneWithSort = async (filter, projection, sortBy) =>
  paymentRepository.findOneWithSort(filter, projection, sortBy);

const getAllPaymentsWithCouponAndUserSortedBy = async (
  filter,
  projection,
  sortBy
) =>
  paymentRepository.getAllPaymentsWithCouponAndUserSortedBy(
    filter,
    projection,
    sortBy
  );

const getCouponByCode = async (code) => couponModule.getByCode(code);

const getCouponsByUser = async (userId) => couponModule.getByUser(userId);

const selectWebhookHandlerByGatewayName = (nameGateway) => {
  const handler = HandlerSelectionMap.get(nameGateway);
  if (!handler)
    throw new Error("Not exists handler to be used to this request");
  return handler;
};

const find = async (query, projection) => {
  return paymentRepository.find(query, projection);
};

const addTraceToFrontLog = async (info) => frontLogModule.addTrace(info);

const updateById = async (id, data) => update({ _id: id }, data);

const update = async (filter, data) =>
  paymentRepository.updateOne(filter, data);

const findOne = async (query, projection) =>
  paymentRepository.findOne(query, projection);

const createOrRetrieveIfExistsClientFromPaymentGateway = async (user) => {
  try {
    let customer = await paymentService.getClient(user);
    if (!customer) {
      customer = await paymentService.createClient(user);
    }
    return customer;
  } catch (e) {
    console.log(e.message);
    return null;
  }
};

const doPaymentWithPix = async (user, items, orderId) => {
  try {
    return await doPaymentWithMercadoPagoPix(user, items);
  } catch (error) {
    return doPaymentWithIuguPix(user, items, orderId);
  }
};

const doPaymentWithMercadoPagoPix = async (user, items) => {
  const amount = items.reduce(
    (acc, item) => acc + item.realValue * item.amount,
    0
  );
  const transactionAmount = Math.trunc(amount * 100) / 100;
  const description = "Consulta Veicular Olho no Carro";
  const paymentMethod = "pix";
  const email = user.email || "";
  const cpf = user.cpf || "";
  const fullName = user.name ? user.name : "";
  const firstName = utils.getPositionName(fullName, "FIRST") || "";
  const lastName = utils.getPositionName(fullName, "LAST") || "";
  const payer = { email, firstName, lastName, cpf };
  const paymentData = { transactionAmount, description, paymentMethod, payer };
  return mercadoPagoService.createPayment(paymentData);
};

const doPaymentWithIuguPix = async (user, items, orderId) => {
  const customer = await createOrRetrieveIfExistsClientFromPaymentGateway(user);
  ValidateCustomer(customer);
  UserEvents.emitter.emit(UserEvents.EVENTS.UPDATE_USER, {
    customer,
    userId: user._id,
  });
  const paymentMethod = paymentService.PAYMENT_METHODS.PIX;
  const date = addDaysToDate(2);
  const dueDate = getStringDateFormatIn_AAAA_MM_DD(date);
  return paymentService.createInvoice(
    user,
    dueDate,
    items,
    paymentMethod,
    orderId,
    customer
  );
};

const createPayment = async (
  billing,
  items,
  status,
  totalPrice,
  realPrice,
  type,
  coupon
) => {
  return paymentRepository.create({
    billing,
    items,
    status,
    totalPrice,
    realPrice,
    type,
    coupon,
  });
};

const setPixDataToPayment = async (paymentId, paymentResponse) => {
  const {
    id,
    pix: { qrcode, qrcode_text },
  } = paymentResponse;
  return update(
    { _id: paymentId },
    {
      chargeId: id,
      "pix.qrcode": qrcode,
      "pix.qrcodeText": qrcode_text,
    }
  );
};

function ValidateCustomer(customer) {
  if (!customer)
    throw new Error(
      "Something wrong to retrieve user from payment gateway... :'("
    );
}

const checkIfPaymentHasBeenDone = async (paymentId) => {
  return await paymentRepository.checkIfPaymentHasBeenDone(paymentId);
};

const getPaymentById = async (paymentId, select) =>
  paymentRepository.getById(paymentId, select);

const getQtdInvoicesDuringTheCurrentMonth = async (
  billingId,
  refMonth,
  refYear
) => {
  return await paymentRepository.countDocuments({
    billing: billingId,
    refMonth,
    refYear,
  });
};

const getTransactionsCountByBilling = async (billingId) => {
  const transactionsCount = await paymentRepository.countDocuments({
    billing: billingId,
  });
  return { transactionsCount };
};

const getSuccessfullyTransactionsCountByBilling = async (billingId) => {
  const transactionsCount = await paymentRepository.getSuccessfullyPaidPaymentsCountByBilling(
    billingId
  );
  return { transactionsCount };
};

const getTransactionsCount = async (userId) => {
  const billing = await billingModule.getByUser(userId);
  return await getTransactionsCountByBilling(billing._id);
};

const getOrdersWithFirstCouponUsedIfHave = async (fromDate, toDate) => {
  return paymentRepository.getOrdersWithFirstCouponUsedIfHave(fromDate, toDate);
};

const storePaymentsReportOnStorage = async (buffer) => {
  const path = REPORTS_ONC + "/payments";
  const hash = Buffer.from(new Date().toString()).toString("base64");
  const key = `${hash}.xlsx`;
  await upload(path, key, buffer);
  const publicUrl = "https://reports-onc.s3-sa-east-1.amazonaws.com/payments/";
  return publicUrl + key;
};

const getNumberOfInstallmentsFromCart = (cart) => {
  const numberOfInstallments =
    cart.installment && cart.installment.numberOfInstallments;
  if (typeof numberOfInstallments !== "number" || numberOfInstallments <= 0)
    throw new Error("O número de parcelas precisa ser maior do que 0 (zero)");
  return numberOfInstallments;
};

const getProtocolFromCart = (cart) => {
  let protocol = null;

  for (let index = 0; index < cart.products.debts.length; index++) {
    const debt = cart.products.debts[index];
    protocol = debt.protocol;
    if (protocol && typeof protocol === "string") break;
  }

  if (!protocol)
    throw new Error(
      "Para o pagamento de débitos, utilize um número de protocolo válido"
    );

  return protocol;
};

const getDebtIdsFromCart = (cart) => {
  if (cart.products.debts.length <= 0)
    throw new Error("Selecione ao menos um débito para realizar o pagamento");
  return cart.products.debts
    .map((debt) => debt.externalId)
    .filter((debtId) => !!debtId);
};

const getInstallmentFromChosenAmount = (installments, numberOfInstallments) => {
  const installment = installments.find(
    (installment) => installment.numberOfInstallments === numberOfInstallments
  );

  return installment || null;
};

const getPaymentInfoAccordingToPaymentType = (paymentType, installment) => {
  return paymentType === "credit_card"
    ? {
      creditCard: {
        token: null,
        installments: installment.numberOfInstallments,
        installmentValue: installment.price,
      },
    }
    : { pix: { qrcode: null, qrcodeText: null } };
};

const moneyFromCents = (value) => {
  return parseFloat((value / 100).toFixed(2));
};

const createNewPaymentOrderForDebts = async (
  billingId,
  paymentType,
  numberOfInstallments,
  protocol,
  debts,
  installments,
  { paymentCreationOrigin }
) => {
  const installment = getInstallmentFromChosenAmount(
    installments,
    numberOfInstallments
  );
  const paymentInfo = getPaymentInfoAccordingToPaymentType(
    paymentType,
    installment
  );
  const totalPrice = moneyFromCents(installment.priceWithInterestInCents);
  return paymentRepository.create({
    billing: billingId,
    debts: {
      installment,
      items: debts,
    },
    items: [],
    chargeId: protocol,
    status: "new",
    totalPrice: totalPrice,
    realPrice: totalPrice,
    type: paymentType,
    creationOrigin: paymentCreationOrigin,
    ...paymentInfo,
  });
};

const updatePaymentStatus = (paymentId, status) => {
  return paymentRepository.updateByIdAndReturnNew(paymentId, { status });
};

const updatePaymentToPendingStatus = (paymentId) => {
  return updatePaymentStatus(paymentId, "pending");
};

const updatePaymentToUnpaidStatus = (paymentId) => {
  return updatePaymentStatus(paymentId, "unpaid");
};

const updatePaymentToPaidStatus = (paymentId) => {
  return updatePaymentStatus(paymentId, "paid");
};

const sendUserToEmailMarketing = async (payment) => {
  const { billing, items } = payment;
  const user = await userRepository.findOne({ billing });
  if (!user) return;

  const createToSend = {
    email: user.email,
    firstName: utils.getPositionName(user.name, "FIRST"),
    lastName: utils.getPositionName(user.name, "LAST"),
    birthday: getStringDateFormatIn_MM_DD(user.createAt) || "01/01",
    phone: (user.generalData && user.generalData.phoneNumber1) || "",
    purchase: (items[0] && items[0].name) || "",
  };

  if (
    payment.debts &&
    Array.isArray(payment.debts.items) &&
    payment.debts.items.length
  )
    return marketeingSenderService.registerUserToPaidDebits(createToSend);

  return marketeingSenderService.registerUserToPaid(createToSend);
};

const getAllPaymentsByPeriod = async ({
  billingId,
  initDate,
  endDate,
  status,
  options,
  paidInDateRange
}) => {
  try {
    if (paidInDateRange) {
      const maybePaidStart = initDate ? new Date(initDate) : null;
      const maybePaidEnd = endDate ? new Date(endDate) : null;
      const payments = await paymentRepository.getAllPaymentsByPeriod({
        billingId,
        maybePaidStart,
        maybePaidEnd,
        status,
      });
      return payments;
    } else {
      const maybeStart = initDate ? new Date(initDate) : null;
      const maybeEnd = endDate ? new Date(endDate) : null;
      const payments = await paymentRepository.getAllPaymentsByPeriod({
        billingId,
        maybeStart,
        maybeEnd,
        status,
      });
      return payments;
    }
  } catch (error) {
    return [];
  }
};

const getUserTransactions = async (billingId, dt) => {
  const transactions = await paymentRepository.getUserTransactions(
    billingId,
    dt
  );

  return {
    data: transactions.map((element) => {
      return {
        ...element,
        totalPaid: priceUtils.toCents(element && element.totalPaid),
        totalPrice: priceUtils.toCents(element && element.totalPrice),
        realPrice: priceUtils.toCents(element && element.realPrice),
      };
    }),
  };
};

function isAsaasGateway({ chargeId }) {
  return chargeId.startsWith("pay_");
}

function isMercadoPagoPixGateway({ chargeId, type }) {
  return type === "pix" && !chargeId.match(/[A-Za-z]/);
}

function isIuguPixGateway({ chargeId, type }) {
  return type === "pix" && chargeId.match(/[A-Za-z]/) && chargeId.length === 32;
}

function isIuguCreditCardGateway({ chargeId, type }) {
  return (
    type === "credit_card" &&
    chargeId.match(/[A-Za-z]/) &&
    chargeId.length === 32
  );
}

function isIuguBankingBilletGateway({ chargeId, type }) {
  return (
    type === "banking_billet" &&
    chargeId.match(/[A-Za-z]/) &&
    chargeId.length === 32
  );
}

function isGerenciaNetUntilDateGateway() {
  const thresholdDate = moment("2018-07-31T01:53:34.926Z");
  return ({ chargeId, createAt }) => {
    return thresholdDate.isSameOrAfter(createAt) && !chargeId.match(/[A-Za-z]/);
  };
}

function isGerenciaNetBankingBilletGateway({ chargeId, type }) {
  return type === "banking_billet" && !chargeId.match(/[A-Za-z]/);
}

function getGatewayFromChargeId(payment) {
  const normalizedChargeId = payment.chargeId.toLowerCase().trim();
  const updatedPayment = { ...payment, chargeId: normalizedChargeId };
  // The conditional were written like that because the order matters
  return isAsaasGateway(updatedPayment)
    ? gatewayEnum.ASAAS
    : isMercadoPagoPixGateway(updatedPayment)
      ? gatewayEnum.MERCADO_PAGO
      : isIuguPixGateway(updatedPayment)
        ? gatewayEnum.IUGU
        : isGerenciaNetUntilDateGateway()(updatedPayment)
          ? gatewayEnum.GERENCIA_NET
          : isIuguCreditCardGateway(updatedPayment) ||
            isIuguBankingBilletGateway(updatedPayment)
            ? gatewayEnum.IUGU
            : isGerenciaNetBankingBilletGateway(updatedPayment)
              ? gatewayEnum.GERENCIA_NET
              : gatewayEnum.UNKNOWN;
}

function isValidDate(value) {
  const date = new Date(value);
  const dateTime = date.getTime();
  return !isNaN(dateTime) && dateTime > 0;
}

async function getPaymentFromGerenciaNet(gatewayName, chargeId) {
  try {
    const payment = await gerenciaNetService.getPayment(chargeId);
    const isValid = typeof payment === "object" && payment;
    const isPaid = isValid && payment.status === "paid";
    const valuePaidInCents = isPaid ? payment.paid_value : 0;
    if (!valuePaidInCents) return null;
    return { gateway: gatewayName, isPaid, valuePaidInCents };
  } catch (error) {
    return null;
  }
}

async function getPaymentFromIugu(gatewayName, chargeId) {
  try {
    const payment = await iuguService.getInvoice(chargeId);
    const isValid = typeof payment === "object" && payment;
    const isPaid = isValid && isValidDate(payment.paid_at);
    const valuePaidInCents = isPaid ? payment.total_paid_cents : 0;
    if (!valuePaidInCents) return null;
    return { gateway: gatewayName, isPaid, valuePaidInCents };
  } catch (error) {
    return null;
  }
}

async function getPaymentFromAsaas(gatewayName, chargeId) {
  try {
    const payment = await asaasService.retrievePaymentByChargeId(chargeId);
    const isValid = typeof payment === "object" && payment;
    const isPaid = isValid && isValidDate(payment.paymentDate);
    const valuePaid = isPaid ? payment.value : 0;
    const valuePaidInCents = priceUtils.toCents(valuePaid);
    if (!valuePaidInCents) return null;
    return { gateway: gatewayName, isPaid, valuePaidInCents };
  } catch (error) {
    return null;
  }
}

async function getPaymentFromMercadoPago(gatewayName, chargeId) {
  try {
    const payment = await mercadoPagoService.getPayment(chargeId);
    const isValid =
      typeof payment === "object" &&
      payment &&
      typeof payment.transaction_details === "object" &&
      payment.transaction_details;
    const isPaid = isValid && isValidDate(payment.date_approved);
    const valuePaid = isPaid
      ? payment.transaction_details.total_paid_amount
      : 0;
    const valuePaidInCents = priceUtils.toCents(valuePaid);
    if (!valuePaidInCents) return null;
    return { gateway: gatewayName, isPaid, valuePaidInCents };
  } catch (error) {
    return null;
  }
}

async function getPaymentInfoFromGateway(chargeId, gatewayName) {
  return gatewayName === gatewayEnum.GERENCIA_NET
    ? getPaymentFromGerenciaNet(gatewayName, chargeId)
    : gatewayName === gatewayEnum.IUGU
      ? getPaymentFromIugu(gatewayName, chargeId)
      : gatewayName === gatewayEnum.ASAAS
        ? getPaymentFromAsaas(gatewayName, chargeId)
        : gatewayName === gatewayEnum.MERCADO_PAGO
          ? getPaymentFromMercadoPago(gatewayName, chargeId)
          : null;
}

async function getUsersWithSignatureActive(month, year) {
  const intervalMonth = month ? parseInt(month) : currentDate.getMonth();
  const intervalYear = year ? parseInt(year) : currentDate.getFullYear();
  const fromDate = new Date(intervalYear, intervalMonth, 1, 0, 0, 0, 0);
  const toDate = new Date(intervalYear, intervalMonth + 1, 0, 23, 59, 59, 999);
  const data = await paymentRepository.getUsersWithSignatureActive(
    fromDate,
    toDate
  );

  return data.map((e) => ({
    dataDoPagamento: new Date(e.createAt).toLocaleString("pt-br", {
      tomeZone: "America/Sao_Paulo",
    }),
    nome: e.user && e.user.name ? e.user.name : null,
    email: e.user && e.user.email ? e.user.email : null,
    telefone:
      e.user && e.user.generalData && e.user.generalData.phoneNumber1
        ? e.user.generalData.phoneNumber1
        : null,
    nomeDaCompra:
      e.items && e.items.length && e.items[0].name ? e.items[0].name : null,
    statusDoPagamento: e.paid ? "PAGO" : "NÃO PAGO",
    formaDePagamento: e.type || null,
    valorPago: e.totalPrice || null,
    statusDaAssinatura:
      e.subscriptions && e.subscriptions.status ? e.subscriptions.status : null,
  }));
}

async function getUserWithPackages(month, year) {
  const intervalMonth = month ? parseInt(month) : currentDate.getMonth();
  const intervalYear = year ? parseInt(year) : currentDate.getFullYear();
  const fromDate = new Date(intervalYear, intervalMonth, 1, 0, 0, 0, 0);
  const toDate = new Date(intervalYear, intervalMonth + 1, 0, 23, 59, 59, 999);

  const data = await paymentRepository.getUserWithPackages(fromDate, toDate);

  return data.map((e) => ({
    dataDoPagamento: new Date(e.createAt).toLocaleString("pt-br", {
      tomeZone: "America/Sao_Paulo",
    }),
    nome: e.user && e.user.name ? e.user.name : null,
    email: e.user && e.user.email ? e.user.email : null,
    telefone:
      e.user && e.user.generalData && e.user.generalData.phoneNumber1
        ? e.user.generalData.phoneNumber1
        : null,
    statusDoPagamento: e.paid ? "PAGO" : "NÃO PAGO",
    formaDePagamento: e.type || null,
    valorPago: e.totalPrice || null,
    nomeDoPacote:
      e.items && e.items[0] && e.items[0].name ? e.items[0].name : null,
  }));
}

module.exports = {
  addTraceToFrontLog,
  find,
  findOne,
  findOneWithSort,
  getAllPaymentsWithCouponAndUserSortedBy,
  getCouponByCode,
  getCouponsByUser,
  selectWebhookHandlerByGatewayName,
  update,
  updateById,
  createOrRetrieveIfExistsClientFromPaymentGateway,
  doPaymentWithPix,
  createPayment,
  setPixDataToPayment,
  ValidateCustomer,
  checkIfPaymentHasBeenDone,
  getAllPaymentsByPeriod,
  getPaymentById,
  getQtdInvoicesDuringTheCurrentMonth,
  getTransactionsCount,
  getTransactionsCountByBilling,
  getSuccessfullyTransactionsCountByBilling,
  getOrdersWithFirstCouponUsedIfHave,
  getUserTransactions,
  sendUserToEmailMarketing,
  storePaymentsReportOnStorage,
  getNumberOfInstallmentsFromCart,
  getProtocolFromCart,
  getDebtIdsFromCart,
  createNewPaymentOrderForDebts,
  updatePaymentToPendingStatus,
  updatePaymentToUnpaidStatus,
  updatePaymentToPaidStatus,
  isAsaasGateway,
  isMercadoPagoPixGateway,
  isIuguPixGateway,
  isIuguCreditCardGateway,
  isIuguBankingBilletGateway,
  isGerenciaNetUntilDateGateway,
  isGerenciaNetBankingBilletGateway,
  getGatewayFromChargeId,
  getPaymentInfoFromGateway,
  getUsersWithSignatureActive,
  getUserWithPackages,
};
