"use strict";

const Router = require("koa-router");
const userController = require("../../controllers/user/userController");
const userConvertedController = require("../../controllers/user/userConvertedController");
const ResponseStatusEnum = require("../../../infrastructure/dictionaries/ResponseStatusEnum");
const HttpCodes = require("../../../infrastructure/enumerators/httpCode.enum");

const {
  basicAuthenticationMiddleware,
} = require("../../middlewares/authMiddleware");
const {
  validateRecaptchaTokenHeader,
} = require("../../middlewares/recaptcha-validation-token.middleware");
const {
  responseObject,
} = require("../../../infrastructure/helpers/routerHelper");
const {
  weakValidation,
  tokenMatchesUserId,
} = require("../../../infrastructure/utils/weakValidator.util");
const {
  routeTracker,
} = require("../../../infrastructure/services/route_tracker_service/route-tracker.service");
const {
  downloadUserLogs,
} = require("../../../domain/utilization-log/utilization-log.module");
let userRouter = new Router();

userRouter.post("/test-upload", async (ctx, next) => {
  console.log(ctx);
  return responseObject(ctx, ResponseStatusEnum(200), null);
});

userRouter.get("/add-user-interested/:email", async function (ctx, next) {
  let ip = ctx.request.headers["x-forwarded-for"];
  let email = ctx.params.email;
  if (email) {
    let response = await userConvertedController.insertNewUserConverted(
      email,
      ip
    );
    return responseObject(
      ctx,
      ResponseStatusEnum(response.status ? 200 : 410),
      response
    );
  }
  return responseObject(ctx, ResponseStatusEnum(405), null);
});

userRouter.get(
  "/pre-paid-with-payment-data",
  userController.generatePrePaidUserReportWithPaymentData
);

userRouter.patch("/update-pass-by-id/:id", async function (ctx, next) {
  let id = ctx.params.id;
  let params = ctx.request.body;
  if (!id || !params.password)
    return responseObject(ctx, ResponseStatusEnum(405), null);
  return responseObject(
    ctx,
    ResponseStatusEnum(200),
    await userController.updatePasswordById(id, params.password)
  );
});

userRouter.patch(
  "/update-phone-number/",
  basicAuthenticationMiddleware,
  routeTracker.trackRoute(
    "Atualização de cadastro",
    "Usuário alterou o telefone de contato"
  ),
  async function (ctx, next) {
    const userId = ctx.auth_user_id;
    const { phoneNumber } = ctx.request.body;
    if (!userId || !phoneNumber)
      return responseObject(ctx, ResponseStatusEnum(405), null);
    return responseObject(
      ctx,
      ResponseStatusEnum(200),
      await userController.updatePhoneNumberById(userId, phoneNumber)
    );
  }
);

userRouter.get(
  "/agree-terms/:termid",
  basicAuthenticationMiddleware,
  routeTracker.trackRoute(
    "Aceite dos termos de uso",
    "Alteração no aceite de termos de uso"
  ),
  async (ctx, nxt) => {
    let termid = ctx.params.termid;
    let userid = ctx.auth_user_id;
    if (termid && userid)
      return responseObject(
        ctx,
        ResponseStatusEnum(200),
        await userController.agreeTermsAndConditions(userid, termid)
      );
    return responseObject(ctx, ResponseStatusEnum(405), null);
  }
);

userRouter.patch("/undelete-user", async (ctx) => {
  try {
    const { email } = ctx.request.body;
    const response = await userController.undeleteUser(email);
    return responseObject(ctx, HttpCodes.SUCCESS, { msg: response });
  } catch (error) {
    return responseObject(ctx, HttpCodes.BAD_REQUEST, { msg: error.message });
  }
});

userRouter.patch("/delete-user", basicAuthenticationMiddleware, async (ctx) => {
  try {
    const userId = ctx.auth_user_id;
    const { password } = ctx.request.body;
    const response = await userController.deleteUser(userId, password);
    return responseObject(ctx, HttpCodes.SUCCESS, { msg: response });
  } catch (error) {
    return responseObject(ctx, HttpCodes.BAD_REQUEST, { msg: error.message });
  }
});

userRouter.get("/is-father/:id", basicAuthenticationMiddleware, async function (
  ctx,
  next
) {
  let _id = ctx.params.id;
  if (_id)
    return responseObject(
      ctx,
      ResponseStatusEnum(200),
      await userController.isFather(_id)
    );
  return responseObject(ctx, ResponseStatusEnum(405), null);
});

userRouter.post("/new", async function (
  ctx,
  next
) {
  let params = ctx.request.body;
  if (!params) return responseObject(ctx, ResponseStatusEnum(405), null);
  let response = await userController.addNewUser(params);
  if (
    response &&
    response.result &&
    response.result.user &&
    response.result.user._doc
  ) {
    routeTracker.sendLog(
      response.result.user._doc._id,
      "Cadastro de usuário",
      "Novo usuário cadastrado"
    );
  }
  return responseObject(ctx, ResponseStatusEnum(response.cod), response.result);
});

userRouter.post("/auth", async function (ctx, next) {
  let params = ctx.request.body;
  if (!params || !params.email || !params.pass)
    return responseObject(ctx, ResponseStatusEnum(405), null);
  let response = await userController.login(params.email, params.pass);
  return responseObject(ctx, ResponseStatusEnum(response.cod), response.result);
});

userRouter.get(
  "/sign-in-data/:userId",
  basicAuthenticationMiddleware,
  async function (ctx, next) {
    try {
      const { userId } = ctx.params;

      weakValidation(userId, "User ID must be sent");
      tokenMatchesUserId(userId, ctx);

      const response = await userController.getSignInData(userId);
      return responseObject(ctx, HttpCodes.SUCCESS, response);
    } catch (e) {
      return responseObject(ctx, HttpCodes.GONE_ERROR, e.message);
    }
  }
);

userRouter.patch(
  "/:id",
  basicAuthenticationMiddleware,
  routeTracker.trackRoute(
    "Atualização de cadastro",
    "Usuário atualizou o cadastro"
  ),
  async function (ctx, next) {
    const params = ctx.request.body;
    const id = ctx.params.id;
    //todo need to check if is user itself and create a protected to change the user password.
    /*    const userId = ctx.auth_user_id;
        if(userId !== id) return responseObject(ctx,ResponseStatusEnum(401),
            'você não pode alterar outro usuário');*/
    if (!params || !id)
      return responseObject(ctx, ResponseStatusEnum(405), null);
    let response = await userController.update(params, id);
    return responseObject(
      ctx,
      ResponseStatusEnum(response.cod),
      response.result
    );
  }
);

userRouter.get("/data-download", basicAuthenticationMiddleware, async function (
  ctx
) {
  try {
    const userId = ctx.auth_user_id;
    const [name, buffer] = await userController.dataDownload(userId);
    ctx.response.attachment(name);
    ctx.body = buffer;
    ctx.status = HttpCodes.SUCCESS;
    return ctx;
  } catch (error) {
    return responseObject(ctx, ResponseStatusEnum(500), { msg: error.message });
  }
});

userRouter.get(
  "/when-user-deleted",
  basicAuthenticationMiddleware,
  async (ctx) => {
    try {
      const userId = ctx.auth_user_id;
      const deleteDate = await userController.whenUserDeleted(userId);
      return responseObject(ctx, ResponseStatusEnum(200), deleteDate);
    } catch (error) {
      return responseObject(ctx, ResponseStatusEnum(500), null);
    }
  }
);

userRouter.get("/:id", basicAuthenticationMiddleware, async function (
  ctx,
  next
) {
  let _id = ctx.params.id;
  if (_id)
    return responseObject(
      ctx,
      ResponseStatusEnum(200),
      await userController.getById(_id)
    );
  return responseObject(ctx, ResponseStatusEnum(405), null);
});

userRouter.post("/new-contact", userController.newContact);

userRouter.post("/traker", basicAuthenticationMiddleware, async (ctx) => {
  try {
    const userId = ctx.auth_user_id;
    const trakerName = ctx.query.trakerName;
    const body = ctx.request.body;

    userController.userTraker(userId, trakerName, body);
    return responseObject(ctx, ResponseStatusEnum(200), null);
  } catch (error) {
    return responseObject(ctx, ResponseStatusEnum(500), null);
  }
});

module.exports = userRouter;
