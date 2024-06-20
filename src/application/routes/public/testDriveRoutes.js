(async function () {
  "use strict";

  const { isDevEnv } = require("../../../infrastructure/config/config");
  const Router = require("koa-router");
  const testDriverController = require("../../controllers/test_drive/testDriveController");
  const ResponseStatusEnum = require("../../../infrastructure/dictionaries/ResponseStatusEnum");
  const {
    responseObject,
  } = require("../../../infrastructure/helpers/routerHelper");
  const {
    validateRecaptchaTokenOnGet,
  } = require("../../middlewares/recaptcha-validation-token.middleware");

  const testDriverRouter = new Router();

  testDriverRouter.post("/", async function (ctx, next) {
    const body = ctx.request.body;
    const key = body.key;
    // TODO: remove body.navitagionToken after new site release
    const token = isDevEnv
      ? true
      : body.navitagionToken || body.navigationToken;
    if (key && token) {
      const response = await testDriverController.executeTestDrive(key, token);
      return responseObject(
        ctx,
        ResponseStatusEnum(response.status),
        response.result
      );
    }
    return responseObject(ctx, ResponseStatusEnum(405), null);
  });

  testDriverRouter.get(
    "/representation/:queryId",
    testDriverController.testDriveQueryRepresentation
  );

  testDriverRouter.get("/:email", async function (ctx, next) {
    const email = ctx.params.email;
    if (email) {
      return responseObject(
        ctx,
        ResponseStatusEnum(200),
        await testDriverController.addUserConverted(email)
      );
    }
    return responseObject(ctx, ResponseStatusEnum(405), null);
  });

  testDriverRouter.post("/vehicle", async function (ctx, next) {
    const body = ctx.request.body;
    if (body.key) {
      const response = await testDriverController.executeTestDriveToTestOnly(
        body.key
      );
      return responseObject(
        ctx,
        ResponseStatusEnum(response.status),
        response.result
      );
    }
    return responseObject(ctx, ResponseStatusEnum(405), null);
  });

  testDriverRouter.post(
    "/send-email",
    testDriverController.sendEmailWithDiscount
  );

  testDriverRouter.post(
    "/model-not-found/:gToken",
    validateRecaptchaTokenOnGet,
    async (ctx) => {
      try {
        const { queryId, userModelInformation } = ctx.request.body;

        await testDriverController.addModelNotFound(
          queryId,
          userModelInformation
        );
        return responseObject(ctx, ResponseStatusEnum(201), null);
      } catch (error) {
        return responseObject(ctx, ResponseStatusEnum(500), {
          msg: error.message,
        });
      }
    }
  );

  module.exports = testDriverRouter;
})();
