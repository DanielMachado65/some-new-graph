const jwt = require("../../infrastructure/utils/jsonwebtokenLogicLayer");

const identifySupper = async (ctx) => {
  let _auth = ctx.request.headers["supper"];
  let _auth2 = ctx.request.headers["supper2"];
  if (_auth) {
    let resultAuth = await jwt.isASupperSecureRequest(_auth);
    if (resultAuth && resultAuth.data) {
      ctx.auth_user_id = resultAuth.data;
      ctx.auth_supper_user_id = resultAuth.data;
    }
  } else if (_auth2) {
    let resultAuth = await jwt.isASupperSecurePartnerRequest(_auth2);
    if (resultAuth && resultAuth.data) {
      ctx.auth_user_id = resultAuth.data;
      ctx.auth_supper_user_id = resultAuth.data;
    }
  } else {
    throw new Error("Acesso negado.");
  }
};

const supperIdentificationMiddleware = async (ctx, next) => {
  try {
    await identifySupper(ctx);
  } catch (err) {
    // nothing
  }
  await next();
};

const supperMiddleware = async (ctx, next) => {
  try {
    await identifySupper(ctx);
    await next();
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
};

module.exports = {
  supperMiddleware,
  supperIdentificationMiddleware,
};
