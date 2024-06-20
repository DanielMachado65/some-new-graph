"use strict";

//REFERENCE: https://github.com/dmourainatel/koa-passport-example

const Router = require("koa-router");
const passport = require("passport");
const SYSTEM_ERRORS = require("../../../infrastructure/constants/message/system.error.message");
const userController = require("../../controllers/user/userController");
const authController = require("../../controllers/authentication/authController");

const ResponseStatusEnum = require("../../../infrastructure/dictionaries/ResponseStatusEnum");
const {
  basicAuthenticationMiddleware,
} = require("../../middlewares/authMiddleware");
const fs = require("fs");

const {
  responseObject,
} = require("../../../infrastructure/helpers/routerHelper");

const {
  routeTracker,
} = require("../../../infrastructure/services/route_tracker_service/route-tracker.service");
const authRouter = new Router();

const USER_TYPES_ENUM = require("../../../infrastructure/enumerators/userType.enum");
const URL_REDIRECT = "https://www.olhonocarro.com.br/redirect-login";

authRouter.get("/", async (ctx) => {
  ctx.type = "html";
  ctx.body = fs.createReadStream(__dirname + "../../../test/login.html");
});

authRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  async (ctx, next) => {
    let params = ctx.request.body;
    let data = ctx.req.user;
    //TEMP solução temporária para evitar que usuários indevidos acessem o ambiente restrito.
    if (params.z && data.type !== USER_TYPES_ENUM.MASTER_USER_TYPE)
      return responseObject(
        ctx,
        ResponseStatusEnum(401),
        SYSTEM_ERRORS.AUTHENTICATION_ERROR
      );
    if (data.error)
      return responseObject(ctx, ResponseStatusEnum(data.error), data.msg);
    let response = await userController.getUserAuthenticated(data._id);
    routeTracker.sendLog(
      data._id,
      "Registro de acesso",
      "O usuário acessou o sistema"
    );

    return responseObject(
      ctx,
      ResponseStatusEnum(response.cod),
      response.result
    );
  }
);

authRouter.post(
  "/login/partners",
  passport.authenticate("local", { session: false }),
  async (ctx, next) => {
    //TEMP solução temporária para evitar que usuários indevidos acessem o ambiente restrito.
    let params = ctx.request.body;
    let data = ctx.req.user;
    if (params.z && data.type !== 3)
      return responseObject(
        ctx,
        ResponseStatusEnum(401),
        SYSTEM_ERRORS.AUTHENTICATION_ERROR
      );
    if (data.error)
      return responseObject(ctx, ResponseStatusEnum(data.error), data.msg);
    let response = await userController.getUserAuthenticated(data._id);
    return responseObject(
      ctx,
      ResponseStatusEnum(response.cod),
      response.result
    );
  }
);

authRouter.get("/facebook", async (ctx) => {
  return passport.authenticate("facebook", (err, user, info, status) => {
    if (user === false) {
      ctx.body = { success: false };
      ctx.throw(401);
    } else {
      ctx.body = { success: true };
      return ctx.login(user);
    }
  })(ctx);
});

authRouter.get(
  "/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  async (ctx, next) => {
    if (ctx.isAuthenticated()) {
      let user = ctx.req.user;
      let response = await userController.getUserAuthenticated(user._id, true);
      if (response.cod == 200) {
        //necessário ter rota de redirecionamento no front para captiruar os dados de TOKEN e user ID
        //Essa rota é apenas uma toda de teste para eu mostrar pro leonardo como vai funcionar o trem
        //let urlRedirect = `/test/redirect-login/index.html?token=${response.result.token}&uid=${response.result.user._id}`;
        let urlRedirect = `${URL_REDIRECT}?token=${response.result.token}&uid=${response.result.user._id}`; //`/test/redirect-login/index.html?token=${response.result.token}&uid=${response.result.user._id}`;
        ctx.redirect(urlRedirect);
        return;
      }
    }
    return responseObject(ctx, ResponseStatusEnum(401), null);
  }
);

authRouter.get("/google", async (ctx) => {
  return passport.authenticate(
    "google",
    {
      scope: [
        "https://www.googleapis.com/auth/plus.login",
        "https://www.googleapis.com/auth/plus.profile.emails.read",
      ],
    },
    (err, user, info, status) => {
      if (user === false) {
        ctx.body = { success: false };
        ctx.throw(401);
      } else {
        ctx.body = { success: true };
        return ctx.login(user);
      }
    }
  )(ctx);
});

authRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  async (ctx, next) => {
    if (ctx.isAuthenticated()) {
      let user = ctx.req.user;
      let response = await userController.getUserAuthenticated(user._id, true);
      if (response.cod === 200) {
        //necessário ter rota de redirecionamento no front para captiruar os dados de TOKEN e user ID
        //Essa rota é apenas uma toda de teste para eu mostrar pro leonardo como vai funcionar o trem
        let urlRedirect = `${URL_REDIRECT}?token=${response.result.token}&uid=${response.result.user._id}`; //`/test/redirect-login/index.html?token=${response.result.token}&uid=${response.result.user._id}`;
        ctx.redirect(urlRedirect);
        return;
      }
    }
    return responseObject(ctx, ResponseStatusEnum(401), null);
  }
);

authRouter.get(
  "/user/context/:id",
  basicAuthenticationMiddleware,
  async (ctx) => {
    let userid = ctx.params.id;
    if (userid) {
      if (userid !== ctx.auth_user_id)
        return responseObject(
          ctx,
          ResponseStatusEnum(401),
          SYSTEM_ERRORS.AUTHENTICATION_ERROR
        );
      let response = await userController.getUserAuthenticated(userid);
      return responseObject(
        ctx,
        ResponseStatusEnum(response.cod),
        response.result
      );
    }
    return responseObject(ctx, ResponseStatusEnum(405), null);
  }
);

authRouter.get("/password-recovery", async (ctx) => {
  let email = ctx.request.query.email;
  let document = ctx.request.query.document;
  if (email || document) {
    email = email && email.toLowerCase();
    let response = await authController.recoveryPassword(email, document);
    return responseObject(
      ctx,
      ResponseStatusEnum(response.cod),
      response.result
    );
  }
  return responseObject(ctx, ResponseStatusEnum(405), null);
});

authRouter.post("/new-password-confirmation", async (ctx) => {
  const request = ctx.request;
  const token = request && request.headers && request.headers["authorization"];
  const body = request && request.body;
  const password = body && body.password;

  if (token && password) {
    const response = await authController.newPasswordConfirmation(
      token,
      password
    );
    return responseObject(
      ctx,
      ResponseStatusEnum(response.cod),
      response.result
    );
  }

  return responseObject(ctx, ResponseStatusEnum(405), null);
});

authRouter.post(
  "/send-code-confirmation",
  authController.sendCodeConfirmationToEmail
);

authRouter.post(
  "/validate-code-confirmation",
  authController.validateCodeByEmail
);

module.exports = authRouter;
