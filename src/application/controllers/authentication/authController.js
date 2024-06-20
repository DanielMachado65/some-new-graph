"use strict";

const userModule = require("../../../domain/user/user/userModule");
const userModulev2 = require("../../../domain/user/user/user.module");
const authModule = require("../../../domain/authentication/authentication.module");
const HttpStatusEnum = require("../../../infrastructure/enumerators/httpCode.enum");
const {
  responseObject,
} = require("../../../infrastructure/helpers/routerHelper");

const recoveryPassword = async (email, document) => {
  try {
    const user = document
      ? await userModule.getByCpf(document)
      : await userModule.getByEmail(email);

    if (user) await authModule.recoveryPassword(user);
  } catch (e) { }

  return { cod: 200, result: true };
};

const newPasswordConfirmation = async (token, password) => {
  const { id, activeUser } = await authModule.getDataFromToken(token);
  const { result } = await userModule.getUserById(id);

  if (result) {
    const isValidToken = await authModule.isValidTokenToChangePassword(
      token,
      result
    );

    if (isValidToken) await userModule.updatePasswordById(id, password);
    if (activeUser) await userModulev2.undeleteUser(id);
    return { cod: 200, result: isValidToken };
  }

  return { cod: 200, result: false };
};

const sendCodeConfirmationToEmail = async (ctx) => {
  try {
    const { email } = ctx.request.body;
    if (!email)
      return responseObject(
        ctx,
        HttpStatusEnum.INVALID_PARAMETERS,
        "O e-mail precisa ser informado obrigatóriamente."
      );
    return responseObject(
      ctx,
      HttpStatusEnum.SUCCESS,
      await authModule.sendCodeConfirmationToEmail(email)
    );
  } catch (e) {
    return responseObject(ctx, HttpStatusEnum.GONE_ERROR, e.message);
  }
};

const validateCodeByEmail = async (ctx) => {
  try {
    const { email, code } = ctx.request.body;
    if (!email)
      return responseObject(
        ctx,
        HttpStatusEnum.INVALID_PARAMETERS,
        "O e-mail precisa ser informado obrigatóriamente."
      );
    return responseObject(
      ctx,
      HttpStatusEnum.SUCCESS,
      await authModule.validateCodeByEmail(code, email)
    );
  } catch (e) {
    return responseObject(ctx, HttpStatusEnum.GONE_ERROR, e.message);
  }
};

module.exports = {
  recoveryPassword,
  newPasswordConfirmation,
  sendCodeConfirmationToEmail,
  validateCodeByEmail,
};
