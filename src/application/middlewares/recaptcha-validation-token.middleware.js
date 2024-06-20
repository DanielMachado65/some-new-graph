const {
  siteVerify,
  RECAPTCHA_SECRETS_BY_VERSION,
} = require("../../infrastructure/services/google/recaptcha/googleRecaptcha.service");
const { responseObject } = require("../../infrastructure/helpers/routerHelper");
const HttpStatus = require("../../infrastructure/enumerators/httpCode.enum");

async function validate(gToken, ctx, next) {
  const navigationReviews = await siteVerify(
    gToken,
    RECAPTCHA_SECRETS_BY_VERSION.V2
  );
  if (navigationReviews.error) {
    return responseObject(ctx, HttpStatus.UNAUTHORIZED, "Recaptcha inválido");
  }
  return next();
}
module.exports.validateRecaptchaTokenOnPost = async (ctx, next) => {
  const { gToken } = ctx.request.body;
  return await validate(gToken, ctx, next);
};

module.exports.validateRecaptchaTokenOnGet = async (ctx, next) => {
  const { gToken } = ctx.params;
  return await validate(gToken, ctx, next);
};

module.exports.validateRecaptchaTokenHeader = async (ctx, next) => {
  const gToken = ctx.headers["x-captcha"];
  return await validate(gToken, ctx, next);
};
