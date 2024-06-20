"use strict";

const config = require("../config/config");
const jwt = require("jsonwebtoken");
const MAX_AGE = "24h";
const MAX_AGE_SUPPER = "8h";

const decodeToken = (token) => {
  return jwt.decode(token);
};

const generateToken = (
  secret,
  data,
  algorithm = config.jwt_secret.common,
  expiresIn = MAX_AGE
) => {
  return jwt.sign({ data }, secret, { expiresIn });
};

const generateTokenToCommonUser = (userId) => {
  return generateToken(config.keys[0], userId);
};

const generateTokenToSupperUser = (userId) => {
  return generateToken(
    config.supper_keys[0],
    userId,
    config.jwt_secret.supper,
    MAX_AGE_SUPPER
  );
};

const generateTokenToPartnerUser = (userId) => {
  return generateToken(
    config.partners_keys[0],
    userId,
    config.jwt_secret.supper2,
    MAX_AGE_SUPPER
  );
};

const isASecureRequest = (token, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      secret,
      { ignoreExpiration: false },
      (error, dataDecoded) => {
        return error
          ? reject("Token de navegação inválido ou expirado!")
          : resolve(dataDecoded);
      }
    );
  });
};

const isACommonSecureRequest = (token) => {
  return isASecureRequest(token, config.keys[0]);
};

const isASupperSecureRequest = (token) => {
  return isASecureRequest(token, config.supper_keys[0]);
};

const isASupperSecurePartnerRequest = (token) => {
  return isASecureRequest(token, config.partners_keys[0]);
};

module.exports = {
  decodeToken,
  generateToken,
  generateTokenToCommonUser,
  generateTokenToSupperUser,
  generateTokenToPartnerUser,
  isASecureRequest,
  isACommonSecureRequest,
  isASupperSecureRequest,
  isASupperSecurePartnerRequest,
};
