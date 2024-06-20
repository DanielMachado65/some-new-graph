"use strict";
const request = require("request");

const { isDevEnv } = require("../../../config/config");
const URL = "https://www.google.com/recaptcha/api/siteverify";

const checkSiteSecurity = (token, secret) => {
  return new Promise((res, rej) => {
    request(
      {
        method: "POST",
        uri: URL,
        body: `secret=${secret}&response=${token}`,
        json: true,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
      (err, data) => {
        if (err) return rej(err);
        return res(data.body);
      }
    );
  });
};

const RECAPTCHA_SECRETS_BY_VERSION = {
  V1: null,
  V2: "6LfFIr0ZAAAAABR3kiIE_pudk_gyXNTNuVuzGcDg",
  V3: "6LcmL64UAAAAABJS2S_12Twun4RcPAHqove2S96h",
};

function callbackValidatorReCaptchaChallengeV3() {
  return (response) => {
    const minScore = 0.5;
    return response.success && response.score >= minScore;
  };
}

function callbackValidatorReCaptchaChallengeV2() {
  return (response) => {
    return response.success;
  };
}

function reCaptchaChallengeValidatorStrategy(secret) {
  const validator = {
    validate: null,
  };
  switch (secret) {
    case RECAPTCHA_SECRETS_BY_VERSION.V1:
      throw new Error("Not implemented yet");
    case RECAPTCHA_SECRETS_BY_VERSION.V2:
      validator.validate = callbackValidatorReCaptchaChallengeV2();
      break;
    case RECAPTCHA_SECRETS_BY_VERSION.V3:
      validator.validate = callbackValidatorReCaptchaChallengeV3();
      break;
  }
  return validator;
}

const siteVerify = async (token, secret = RECAPTCHA_SECRETS_BY_VERSION.V3) => {
  if (isDevEnv) return { result: token };
  try {
    const challengeResponse = await checkSiteSecurity(token, secret);
    const isValidRecaptchaToken = reCaptchaChallengeValidatorStrategy(
      secret
    ).validate(challengeResponse);
    if (isValidRecaptchaToken) {
      return { result: token };
    } else {
      return {
        error: "ROBOT_SECURITY_ERROR",
        data: { isValidRecaptchaToken },
      };
    }
  } catch (error) {
    return { error: "UNKNOWN_SECURITY_ERROR", data: error };
  }
};

const validateTestDriveToken = async (token) => {
  const navigationReviews = await siteVerify(
    token,
    RECAPTCHA_SECRETS_BY_VERSION.V2
  );
  return { invalidToken: !!navigationReviews.error };
};

module.exports = {
  siteVerify,
  validateTestDriveToken,
  RECAPTCHA_SECRETS_BY_VERSION,
};
