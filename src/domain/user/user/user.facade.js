"use strict";

const { UserRepository } = require("./components/user.repository");
const utils = require("../../../infrastructure/utils/utils");
const dateUtils = require("../../../infrastructure/utils/date.util");
const cryptor = require("../../../infrastructure/utils/cryptor");

const userRepository = new UserRepository();
const {
  getBrazilianDateFormat,
} = require("../../../infrastructure/utils/date.util");
const {
  isValidCpf,
  capitalizeAll,
} = require("../../../infrastructure/utils/utils");
const {
  generateBufferFromDataJson,
} = require("../../../infrastructure/utils/excel.util");
const UserTypeEnum = require("../../../infrastructure/enumerators/userType.enum");
const {
  ConsentService,
} = require("../../../infrastructure/services/consent/consent.service");
const {
  HttpClientService,
} = require("../../../infrastructure/services/http_client");
const marketingSender = require("../../../domain/mail/marketing/marketingSender.service");
const { util } = require("prettier");

const applicationId = process.env.APPLICATION_ID;
const baseUrl = process.env.UCC_URL;

const httpClient = new HttpClientService(
  HttpClientService.strategyBuilder().useAxios()
);
const consentService = new ConsentService(httpClient, baseUrl);

const getById = (id, projection) => userRepository.getById(id, projection);
const getByBilling = (billingId, select) =>
  userRepository.getByBilling(billingId, select);
const getByEmail = (email, projection) =>
  userRepository.findOne({ email }, projection);
const findOne = (filter, projection) =>
  userRepository.findOne(filter, projection);
const find = (filter, projection) => userRepository.find(filter, projection);
const updateOne = (filter, data, options) => userRepository.updateOne(filter, data, options);
const updateMany = async (filter, data) => {
  const response = await userRepository.updateMany(filter, data);
  return {
    ...response,
    n: response.matchedCount,
    nModified: response.modifiedCount,
    upserted: response.upsertedCount,
  }
};

function reportUserWithPaymentDataFactory(users, payments) {
  let count = 1;
  return users.map((user) => {
    const userPayments = payments.filter(
      (payment) =>
        user.billing && payment.billing.toString() === user.billing.toString()
    );
    const totalValue = userPayments.reduce((acc, curr) => {
      acc += curr.totalPrice;
      return acc;
    }, 0);
    const lastPayment =
      (userPayments.length && userPayments[userPayments.length - 1]) || "-";
    console.log(
      "process user => " + ((count / users.length) * 100).toFixed(2) + " (%) "
    );
    count++;
    return {
      email: user.email,
      name: user.name,
      phone1: user.generalData.phoneNumber1,
      phone2: user.generalData.phoneNumber2,
      amount: userPayments.length,
      totalValue,
      lastPaymentDate: getBrazilianDateFormat(lastPayment.createAt),
    };
  });
}

const validateUserExists = (user) => {
  if (!user) throw new Error("this user not exists");
};

const updateExternalControls = async (_id, clientId) => {
  return userRepository.updateOne(
    { _id },
    { "externalControls.iugu.id": clientId }
  );
};

const getSignInData = async (userId) => {
  const userData = await userRepository.findOne({ _id: userId });

  if (!userData) throw new Error("Not found");

  const generalData = userData.generalData || {};
  return {
    _id: userData._id,
    name: userData.name,
    email: userData.email,
    cpf: userData.cpf,
    phone: generalData.phoneNumber1 || null,
    address: generalData.address || {},
    addressState:
      (generalData.address && userData.generalData.address.state) || null,
  };
};

const getUsersInHierarchy = async (userId) => {
  const user = await userRepository.getById(userId);
  if (user.hierarchy && user.hierarchy.owner) {
    return userRepository.find({
      $or: [
        {
          _id: user.hierarchy.owner,
        },
        {
          "hierarchy.owner": user.hierarchy.owner,
        },
      ],
    });
  } else {
    return userRepository.find({
      $or: [
        {
          _id: userId,
        },
        {
          "hierarchy.owner": userid,
        },
      ],
    });
  }
};

const isUserAnIntegrator = async (user) => {
  return user.type === UserTypeEnum.INTEGRATION_CLIENT_TYPE;
};

const getBillingAddress = (user) => {
  const address = user && user.generalData && user.generalData.address;
  if (!address || typeof address !== "object")
    throw new Error(
      "Para realizar a compra, atualize seu endereço de cobrança"
    );
  return {
    zipCode: address.zipcode,
    address: address.street,
    neighborhood: address.neighborhood,
    city: address.city,
    number: address.number,
  };
};

const deleteUser = async (userId, password) => {
  const pass = await userRepository.getPassByUserId(userId);
  const isValidPass = cryptor.matchPassword(pass, password);
  if (!isValidPass) throw new Error("Parâmetros ou senha invalidos");

  const date = {
    threeDays: utils.calculateDays(3, "d"),
    fiveYears: utils.calculateDays(5, "y"),
    today: new Date(),
  };

  const isSoftDeleted = await userRepository.deleteUser(userId, date);
  if (isSoftDeleted) return "Usuário desativado com sucesso";
  throw new Error("Erro ao desativar usuário!");
};

const undeleteUser = async (userId) => {
  const isActive = await userRepository.undeleteUser(userId);
  if (isActive) return "Usuário ativado com sucesso";

  throw new Error("Erro ao ativar usuário!");
};

const dataDownload = async (userId) => {
  const data = await userRepository.dataDownload(userId);
  const buffer = generateBufferFromDataJson([data], "dados");
  const reportName = "dados.xlsx";
  return [reportName, buffer];
};

const addNewUser = async (cpf, email, name) => {
  if (!isValidCpf(cpf)) throw new Error("CPF inválido!");

  return {
    cpf: cpf,
    email: email.toLowerCase(),
    name: capitalizeAll(name),
  };
};

const createUserConsentBatch = (userId, consentVariations = []) => {
  return consentService.createUserConsentBatch(
    userId,
    applicationId,
    consentVariations
  );
};

const registerNewClient = async (email, fullName, createAt, phoneNumber1) => {
  return marketingSender.registerNewClient({
    email,
    firstName: utils.getPositionName(fullName, "FIRST"),
    lastName: utils.getPositionName(fullName, "LAST"),
    birthday: dateUtils.getStringDateFormatIn_MM_DD(createAt),
    phone: phoneNumber1,
  });
};

const traker = {
  async save_user_on_email_marketing(userId, body) {
    const user = await userRepository.findOne({ _id: userId });
    if (!user && !body) return;

    return marketingSender.registerUserInitPaid({
      email: user.email,
      firstName: utils.getPositionName(user.name, "FIRST"),
      lastName: utils.getPositionName(user.name, "LAST"),
      birthday: dateUtils.getStringDateFormatIn_MM_DD(user.createAt) || "01/01",
      phone: (user.generalData && user.generalData.phoneNumber1) || "",
      purchase: body.queries
        .map((e) => e.title)
        .toString()
        .replace(/[,]/g, " - "),
      pricePay: (body.totalPriceInCents / 100).toFixed(2),
    });
  },
};

const userTraker = async (userId, trakerName, body) => {
  const functionTraker = traker[trakerName];
  if (functionTraker) return functionTraker(userId, body);
};

const whenUserDeleted = async (userId) => {
  const date = {
    threeDays: utils.calculateDays(3, "d"),
    fiveYears: utils.calculateDays(5, "y"),
    today: new Date(),
  };

  return userRepository.whenUserDeleted(userId, date);
};

const getConfirmedCarResellers = async ({ initDate, endDate }) => {
  const initDay = initDate.getDate();
  const initMonth = initDate.getMonth();
  const initYear = initDate.getFullYear();
  const fromDate = new Date(initYear, initMonth, initDay, 0, 0, 0, 0);

  const endDay = endDate.getDate() + 1;
  const endMonth = endDate.getMonth();
  const endYear = endDate.getFullYear();
  const toDate = new Date(endYear, endMonth, endDay, 0, 0, 0, 0);

  return userRepository.getCarResellerUsers({
    initDate: fromDate,
    endDate: toDate,
  });
};

module.exports = {
  addNewUser,
  createUserConsentBatch,
  dataDownload,
  deleteUser,
  getById,
  getByEmail,
  getByBilling,
  findOne,
  find,
  updateOne,
  updateMany,
  reportUserWithPaymentDataFactory,
  updateExternalControls,
  validators: {
    validateUserExists,
  },
  getSignInData,
  getUsersInHierarchy,
  isUserAnIntegrator,
  getBillingAddress,
  undeleteUser,
  registerNewClient,
  userTraker,
  whenUserDeleted,
  getConfirmedCarResellers,
};
