"use strict";

const USER_ERRORS = require("../../infrastructure/constants/message/user/user.error.message");
const encryptor = require("../../infrastructure/utils/cryptor");
const jwt = require("../../infrastructure/utils/jsonwebtokenLogicLayer");
const Utils = require("../../infrastructure/utils/utils");
const authenticationFacade = require("./authentication.facade");

const { MUser, MAuthenticationConfirmation } = require("mongoose").models;

const getDataFromToken = (token) => {
  const data = jwt.decodeToken(token);
  return data && data.data;
};

const isValidTokenToChangePassword = async (token, user) => {
  try {
    const secret = authenticationFacade.generateChangePasswordSecret(user);
    const { data } = await jwt.isASecureRequest(token, secret);
    return data.id === user._id.toString();
  } catch (error) {
    return false;
  }
};

const recoveryPassword = async (user, activeUser = false) => {
  const { name, email } = user;
  const resetToken = authenticationFacade.generateResetToken(user);

  if (activeUser) return authenticationFacade.undeleteUser(email, resetToken);
  return authenticationFacade.recoveryPassword(email, name, resetToken);
};

const comparePass = function (hash, candidatePassword) {
  return encryptor.matchPassword(hash, candidatePassword);
};

const generateSupperJWTForPartners = function (userId) {
  return jwt.generateTokenToPartnerUser(userId);
};

const generateSupperJWT = function (userId) {
  return jwt.generateTokenToSupperUser(userId);
};

const generateCommonJWT = function (userId) {
  return jwt.generateTokenToCommonUser(userId);
};

function invalidCredentialError() {
  return { error: 401, msg: USER_ERRORS.INVALID_CREDENTIALS };
}

function userBlockedError() {
  return { error: 404, msg: USER_ERRORS.USER_BLOCKED };
}

const matchUser = async (accessKey, password) => {
  const user = await MUser.findOne({ email: accessKey.toLowerCase() }).exec();
  if (!user) return invalidCredentialError();
  if (user && !user.status) return userBlockedError();
  if (password && user.pass && comparePass(user.pass, password)) {
    user.lastLogin = new Date();
    await user.save();
    return user;
  }
  return invalidCredentialError();
};

async function _flushConfirmationOnDatabaseByEmail(email) {
  await MAuthenticationConfirmation.deleteOne({
    email,
  });
}

const sendCodeConfirmationToEmail = async (email) => {
  const adjustedEmail = _adjustEmailToAuthentication(email);
  await _flushConfirmationOnDatabaseByEmail(adjustedEmail);
  const code = Utils.getRandNumberByDefinedLength(1000, 9999);
  const expireAt = new Date();
  expireAt.setMinutes(expireAt.getMinutes() + 15);
  const authenticationConfirmationDto = new MAuthenticationConfirmation({
    code,
    email: adjustedEmail,
    expireAt,
  });
  const authenticationConfirmationObj = await MAuthenticationConfirmation.create(
    authenticationConfirmationDto
  );
  return { code: authenticationConfirmationObj.code };
};

function _validateExpirationCode(expireAt) {
  const date = new Date();
  if (date > expireAt)
    throw new Error(
      "O codigo expirou! Por favor, realize o processo novamente!"
    );
}

function _validateAuthenticationConfirmation(auth) {
  if (!auth || !auth.code)
    throw new Error(
      "Processo de autenticação falhou. O código informado expirou ou não é um código válido."
    );
}

function _adjustEmailToAuthentication(email) {
  return email && email.toLowerCase().trim();
}

const validateCodeByEmail = async (code, email) => {
  const adjustedEmail = _adjustEmailToAuthentication(email);
  const authenticationConfirmation = await MAuthenticationConfirmation.findOne({
    code,
    email: adjustedEmail,
  });
  _validateAuthenticationConfirmation(authenticationConfirmation);
  if (authenticationConfirmation.expireAt)
    _validateExpirationCode(authenticationConfirmation.expireAt);
  await _flushConfirmationOnDatabaseByEmail(adjustedEmail);
  return "ok";
};

module.exports = {
  getDataFromToken,
  isValidTokenToChangePassword,
  recoveryPassword,
  matchUser,
  generateCommonJWT,
  generateSupperJWT,
  generateSupperJWTForPartners,
  comparePass,
  sendCodeConfirmationToEmail,
  validateCodeByEmail,
};
