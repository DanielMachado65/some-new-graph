"use strict";

const userModule = require("../../../domain/user/user/userModule");
const userModuleNEW = require("../../../domain/user/user/user.module");
const userReportModule = require("../../../domain/user/user/userReport.module");
const weakValidator = require("../../../infrastructure/utils/weakValidator.util");
const UserTypeEnum = require("../../../infrastructure/dictionaries/UserTypeEnum");
const validator = require("validator");
const _ = require("lodash");

const authenticationModule = require("../../../domain/authentication/authentication.module");
const queryExecutorValidator = require("../../../domain/query/queryExecutor/components/queryExecutor.validator");

const USER_TYPES_ENUM = require("../../../infrastructure/enumerators/userType.enum");
const HttpCodes = require("../../../infrastructure/enumerators/httpCode.enum");
const {
  responseObject,
} = require("../../../infrastructure/helpers/routerHelper");

const getUserAuthenticated = async (id, hasOutControl) => {
  let response = { cod: 200, result: null };
  let user = await userModule.getById(id);
  if (hasOutControl) {
    if (user) {
      const userObject = {
        _id: user._id,
        email: user.email,
        cpf: user.cpf,
        name: user.name,
        status: user.status,
        lastLogin: user.lastLogin,
        generalData: user.generalData,
        company: user.company,
        security: user.security,
        type: UserTypeEnum(user.type),
        hierarchy: user.hierarchy,
        conditions: user.conditions,
      };
      let obj = {
        token: authenticationModule.generateCommonJWT(user._id),
        user: userObject,
      };
      if (user.type === USER_TYPES_ENUM.MASTER_USER_TYPE) {
        obj.supper_token = authenticationModule.generateSupperJWT(user._id);
      } else if (user.type === USER_TYPES_ENUM.PARTNER_CLIENT_TYPE) {
        obj.supper_token = authenticationModule.generateSupperJWTForPartners(
          user._id
        );
        obj.user.partner = user.partner;
      }
      response.cod = 200;
      response.result = obj;
    } else {
      response.cod = 401;
    }
  } else {
    if (user && user.status) {
      const userObject = {
        _id: user._id,
        email: user.email,
        cpf: user.cpf,
        name: user.name,
        status: user.status,
        lastLogin: user.lastLogin,
        generalData: user.generalData,
        company: user.company,
        security: user.security,
        type: UserTypeEnum(user.type),
        hierarchy: user.hierarchy,
      };
      let obj = {
        token: authenticationModule.generateCommonJWT(user._id),
        user: userObject,
      };
      if (user.type === USER_TYPES_ENUM.MASTER_USER_TYPE) {
        obj.supper_token = authenticationModule.generateSupperJWT(user._id);
      } else if (user.type === USER_TYPES_ENUM.PARTNER_CLIENT_TYPE) {
        obj.supper_token = authenticationModule.generateSupperJWTForPartners(
          user._id
        );
        obj.user.partner = user.partner;
        obj.user.conditions = user.conditions;
      } else if (
        user.type === USER_TYPES_ENUM.POS_PAID_CLIENT_TYPE ||
        user.type === USER_TYPES_ENUM.INTEGRATION_CLIENT_TYPE
      ) {
        obj.user.conditions = user.conditions;
      }
      response.cod = 200;
      response.result = obj;
    } else {
      response.cod = 401;
    }
  }
  return response;
};

const getAll = async () => {
  return await userModule.getAll();
};

const getById = async (id) => {
  let user = await userModule.getById(id);
  if (user) {
    return {
      _id: user._id,
      email: user.email,
      cpf: user.cpf,
      name: user.name,
      company: user.company,
      generalData: user.generalData,
      security: user.security,
      google: {
        email: user.google.email,
      },
      facebook: {
        email: user.facebook.email,
      },
      documents: user.documents,
      status: user.status,
      createAt: user.createAt,
      lastLogin: user.lastLogin,
      type: user.type,
    };
  }
  return null;
};

const login = async (email, pass) => {
  let response = { cod: 200, result: null };
  if (!email || !pass) {
    response.cod = 401;
    response.result = null;
    return response;
  }
  let obj = await userModule.login(email, pass);
  if (!obj.error) {
    response.cod = 200;
    response.result = obj;
  } else {
    response.cod = obj.error;
    response.result = obj.msg;
  }
  return response;
};

const addNewUser = async (params, userid) => {
  let response = { cod: 0, result: null };
  if (!params.type) params.type = 1;
  if (
    params.email &&
    params.name &&
    params.pass &&
    params.cpf &&
    // params.consents &&
    validator.isEmail(params.email)
  ) {
    let obj = await userModule.addNewUser(params, userid);
    if (obj.err) {
      response.cod = 410;
      response.result = obj.err;
    } else {
      response.cod = 200;
      response.result = obj;
    }
  } else response.cod = 405;

  return response;
};

const update = async (obj, id) => {
  let response = { cod: 0, result: null };
  let result = await userModule.update(obj, id);
  if (!result) {
    response.cod = 404;
    response.result = "Usuário não encontrado.";
  } else if (result.error) {
    response.cod = result.error;
    response.result = result.msg;
    return response;
  } else {
    response.cod = result.email ? 200 : 410;
    response.result = result;
  }
  return response;
};

const hasClientPermission = async function (userid, ctx) {
  let user = await userModule.getById(userid);
  let permission;
  if (user) {
    let requesterIp = ctx.request.headers["x-forwarded-for"];
    if (user.security && user.security.whitelist.length > 0) {
      permission = _.indexOf(user.security.whitelist, requesterIp) >= 0;
    } else if (user.security && user.security.blacklist.length > 0) {
      permission = _.indexOf(user.security.blacklist, requesterIp) < 0;
    } else permission = true;
  } else permission = false;
  return permission;
};

const getTotalPrePaid = async () => {
  return await userModule.getTotalPrePaid();
};

const getTotalPosPaid = async () => {
  return await userModule.getTotalPosPaid();
};

const getAllPrePaid = async () => {
  return await userModule.getAllPrePaid();
};

const getAllPosPaid = async () => {
  return await userModule.getAllPosPaid();
};

const getAllIntegrators = async () => {
  return await userModule.getAllIntegrators();
};

const disableUser = async (uid) => {
  return await userModule.disableUser(uid);
};

const setCancellationReason = async (
  userId,
  reason,
  anotherReason,
  message,
  isDebtor
) => {
  return await userModule.setCancellationReason(
    userId,
    reason,
    anotherReason,
    message,
    isDebtor
  );
};

const enableUser = async (uid) => {
  return await userModule.enableUser(uid);
};

let changeUserType = async (uid, data) => {
  return await userModule.changeUserType(uid, data);
};

const getAllAdms = async () => {
  return await userModule.getAllAdms();
};

const getTotalPartners = async () => {
  return await userModule.getTotalPartners();
};

const getAllPartners = async () => {
  return await userModule.getAllPartners();
};

const getAllPrePaidPartnerChildren = async (partnerid) => {
  return await userModule.getAllPrePaidPartnerChildren(partnerid);
};

const getAllPosPaidPartnerChildren = async (partnerid) => {
  return await userModule.getAllPosPaidPartnerChildren(partnerid);
};

const getAllIntegratorsPartnerChildren = async (partnerid) => {
  return await userModule.getAllIntegratorsPartnerChildren(partnerid);
};

const uploadDocuments = async (userid, documents) => {
  return await userModule.uploadDocuments(userid, documents);
};

const deletePicture = async (userid, picture) => {
  return await userModule.deletePicture(userid, picture);
};

const isFather = async (userid) => {
  return await userModule.isFather(userid);
};

const agreeTermsAndConditions = async (userid, termid) => {
  return await userModule.agreeTermsAndConditions(userid, termid);
};

const search = async (
  name,
  email,
  document,
  _id,
  socialName,
  mEmail,
  type,
  lastLogin
) => {
  return await userModule.search(
    name,
    email,
    document,
    _id,
    socialName,
    mEmail,
    type,
    lastLogin
  );
};

const generatePartnerReportDataRepass = async (
  partnersid,
  initDate,
  endDate
) => {
  return await userModule.generatePartnerReportDataRepass(
    partnersid,
    initDate,
    endDate
  );
};

const uploadPicture = async (userid, picture) => {
  return await userModule.uploadPicture(userid, picture);
};

const generateBreakdownRepassReport = async (partnerid, dt) => {
  return await userModule.generateBreakdownRepassReport(partnerid, dt);
};

const checkPhoneNumber = async (telefone) => {
  return await userModule.checkPhoneNumber(telefone);
};

const updatePasswordById = async (id, password) => {
  return await userModule.updatePasswordById(id, password);
};

const getByEmail = async (email, projection) => {
  return await userModule.getByEmail(email, projection);
};

const updatePhoneNumberById = async (userId, phoneNumber) => {
  return await userModule.updatePhoneNumberById(userId, phoneNumber);
};

const generatePrePaidUserReportWithPaymentData = async (ctx) => {
  setTimeout(async () => {
    await userReportModule.generatePrePaidUserReportWithPaymentData();
  });
  ctx.status = 200;
  ctx.response.body = "ok";
  return ctx;
};

const addAfterSalesInformation = async (operator, message, id) => {
  return userModule.addAfterSalesInformation(operator, message, id);
};

const getAfterSalesInformations = async (id) => {
  return await userModule.getAfterSalesInformations(id);
};

const deleteAfterSalesInformation = async (user, id) => {
  return await userModule.deleteAfterSalesInformation(user, id);
};

const editAfterSalesInformation = async (user, id, body) => {
  return await userModule.editAfterSalesInformation(user, id, body);
};

const getSignInData = async (userId) => {
  return userModuleNEW.getSignInData(userId);
};

const dataDownload = async (userId) => {
  if (!userId) throw new Error("É nessesário informar o user id");

  return await userModuleNEW.dataDownload(userId);
};

const newContact = async (ctx) => {
  try {
    const body = ctx.request.body;

    weakValidator.weakValidationToNVariables(
      body.email,
      body.name,
      body.message
    );
    await queryExecutorValidator.validateCaptchaToken(body.token);

    userModule.newContact(body);
    return responseObject(ctx, HttpCodes.SUCCESS, "ok");
  } catch (error) {
    const errorResponse = error && error.response;
    const status =
      (errorResponse && errorResponse.status) || HttpCodes.GONE_ERROR;
    const statusText = errorResponse && errorResponse.statusText;
    return responseObject(ctx, status, statusText);
  }
};

const deleteUser = async (userId, password) => {
  if (!userId && !password && typeof password !== "string")
    throw new Error("Parâmetros invalidos");

  return userModuleNEW.deleteUser(userId, password);
};

const undeleteUser = async (email) => {
  if (!email) throw new Error("Parâmetros invalidos");

  const user = await userModule.getByEmail(email);
  if (user) await authenticationModule.recoveryPassword(user, true);
};

const userTraker = async (userId, trakerName, body) => {
  return userModuleNEW.userTraker(userId, trakerName, body);
};

const whenUserDeleted = async (userId) => {
  return userModuleNEW.whenUserDeleted(userId);
};

const getConfirmedCarResellers = async (opts) => {
  return userModuleNEW.getConfirmedCarResellers(opts);
};

module.exports = {
  generatePrePaidUserReportWithPaymentData,
  getAll,
  getById,
  getByEmail,
  addNewUser,
  login,
  update,
  getUserAuthenticated,
  hasClientPermission,
  getTotalPrePaid,
  getTotalPosPaid,
  getAllPrePaid,
  getAllPosPaid,
  getAllIntegrators,
  disableUser,
  deleteUser,
  setCancellationReason: async (userId, data) => {
    return await setCancellationReason(
      userId,
      data.reason,
      data.anotherReason,
      data.message,
      data.isDebtor
    );
  },
  enableUser,
  changeUserType,
  getAllAdms,
  getTotalPartners,
  getAllPartners,
  getAllPrePaidPartnerChildren,
  getAllPosPaidPartnerChildren,
  getAllIntegratorsPartnerChildren,
  uploadDocuments,
  isFather,
  agreeTermsAndConditions,
  search,
  generatePartnerReportDataRepass,
  uploadPicture,
  deletePicture,
  generateBreakdownRepassReport,
  updatePasswordById,
  checkPhoneNumber,
  updatePhoneNumberById,
  undeleteUser,
  userTraker,
  addAfterSalesInformation,
  getAfterSalesInformations,
  dataDownload,
  deleteAfterSalesInformation,
  editAfterSalesInformation,
  newContact,
  getSignInData,
  whenUserDeleted,
  getConfirmedCarResellers,
};
