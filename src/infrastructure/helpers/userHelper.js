"use strict";

const { MUser } = require("mongoose").models;
const {
  generateResetToken,
  sendEmailToExistingUser,
} = require("../../domain/authentication/authentication.facade");

const userValidationToCreate = async ({ cpf, email }) => {
  try {
    return await Promise.all([alreadyHaveEmail(email), alreadyHaveCpf(cpf)]);
  } catch (e) {
    if (e.message == alreadyHaveEmailErrorMsg) {
      const user = await MUser.findOne({ email });
      sendEmailIfExistingUser(user);
    } else if (e.message == alreadyHaveCpfErrorMsg) {
      const user = await MUser.findOne({ cpf });
      sendEmailIfExistingUser(user);
    }   
    throw e;
  }
};

const alreadyHaveEmailErrorMsg = "Já existe uma conta cadastrada com o e-mail informado."
const alreadyHaveEmail = async (email) => {
  const user = await MUser.countDocuments({
    email,
  });
  if (user) {
    throw new Error(alreadyHaveEmailErrorMsg);
  }
};

const alreadyHaveCpfErrorMsg = "Já existe uma conta cadastrada para o CPF informado."
const alreadyHaveCpf = async (cpf) => {
  const user = await MUser.countDocuments({
    cpf,
  });
  if (user) {
    throw new Error(alreadyHaveCpfErrorMsg);
  }
};

const sendEmailIfExistingUser = (user) => {
  const resetToken = generateResetToken(user);
  sendEmailToExistingUser(user.email, user.name, resetToken).finally();
};

module.exports = {
  userValidationToCreate,
};
