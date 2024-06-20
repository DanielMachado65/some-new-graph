"use strict";

const { UserRepository } = require("../user/user/components/user.repository");
const mailSender = require("../mail/mailSender.service");
const jwt = require("../../infrastructure/utils/jsonwebtokenLogicLayer");

const userRepository = new UserRepository();

const generateChangePasswordSecret = ({ pass, createAt }) => {
  return `${pass}-${new Date(createAt).getTime()}`;
};

const recoveryPassword = async (email, name, resetToken) => {
  const urlToRedirect = `https://olhonocarro.com.br/redefinir-senha?resetToken=${resetToken}`;
  await mailSender.sendRecoveryPasswordMail(email, name, urlToRedirect);
};

const undeleteUser = async (email, resetToken) => {
  const user = await userRepository.findOne({ email: email });

  const urlToRedirect = `https://olhonocarro.com.br/redefinir-senha?resetToken=${resetToken}`;
  await mailSender.sendEmailToReactiveUser(email, user.name, urlToRedirect);
};

const sendEmailToExistingUser = async (email, name, resetToken) => {
  const urlToRedirect = `https://olhonocarro.com.br/redefinir-senha?resetToken=${resetToken}`;
  mailSender.sendEmailToExistingUser(email, name, urlToRedirect).finally();
};

const generateResetToken = (user) => {
  const secret = generateChangePasswordSecret(user);
  return jwt.generateToken(secret, {
    id: user._id,
    activeUser: false,
  });
}

module.exports = {
  generateChangePasswordSecret,
  generateResetToken,
  recoveryPassword,
  sendEmailToExistingUser,
  undeleteUser,
};
