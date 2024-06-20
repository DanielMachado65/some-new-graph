const jwt = require("../../infrastructure/utils/jsonwebtokenLogicLayer");

const identifyUser = async (ctx) => {
  let _auth = ctx.request.headers["authorization"];
  let resultAuth = await jwt.isACommonSecureRequest(_auth);
  if (resultAuth && resultAuth.data) ctx.auth_user_id = resultAuth.data;
}

const basicIdentificationMiddleware = async (ctx, next) => {
  try {
    await identifyUser(ctx);
    await next();
  } catch (err) {
    await next();
  }
}

const basicAuthenticationMiddleware = async (ctx, next) => {
  try {
    await identifyUser(ctx);
    if (ctx.auth_user_id) await next();
  } catch (err) {
    ctx.response.type = "json";
    ctx.response.status = 401;
    ctx.response.body = {
      AuthenticationError:
        "Acesso negado. Você não tem permissão para prosseguir com essa solicitação",
      Code: 401,
    };
    ctx.response.app.emit("error", err, this);
  }
}

module.exports = {
  basicIdentificationMiddleware,
  basicAuthenticationMiddleware,
}