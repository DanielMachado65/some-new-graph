"use strict";

const mount = require("koa-mount");
const Router = require("koa-router");
const TestDriveRoutes = new Router();

const testDriveModule = require("../../../domain/query/testDrive/testDrive.module");
const HttpCodes = require("../../../infrastructure/enumerators/httpCode.enum");
const {
  weakValidation,
} = require("../../../infrastructure/utils/weakValidator.util");
const {
  responseObject,
} = require("../../../infrastructure/helpers/routerHelper");
const {
  supperMiddleware,
} = require("../../middlewares/authSupperUserMiddleware");

const errorHandler = (ctx, error, msg) => {
  const errorResponse = error && error.response;
  const status =
    (errorResponse && errorResponse.status) || HttpCodes.GONE_ERROR;
  const statusText = (errorResponse && errorResponse.statusText) || msg;
  return responseObject(ctx, status, statusText);
};

TestDriveRoutes.get(
  "/already-done",
  supperMiddleware,
  getTestDriveQueriesAlreadyDone
);
async function getTestDriveQueriesAlreadyDone(ctx) {
  try {
    const { id, plate, dateStart, dateEnd } = ctx.query;

    const response = await testDriveModule.getTestDriveQueriesAlreadyDone({
      id,
      plate,
      dateStart,
      dateEnd,
    });

    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (error) {
    errorHandler(ctx, error, error.message);
  }
}

TestDriveRoutes.get("/count", supperMiddleware, getTestDriveQueriesCount);
async function getTestDriveQueriesCount(ctx) {
  try {
    const response = await testDriveModule.getTestDriveQueriesCount();

    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (error) {
    errorHandler(ctx, error, error.message);
  }
}

TestDriveRoutes.get("/:id", supperMiddleware, getTestDriveQueryById);
async function getTestDriveQueryById(ctx) {
  try {
    const { id } = ctx.params;

    const response = await testDriveModule.getTestDriveQueryById(id);

    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (error) {
    errorHandler(ctx, error, error.message);
  }
}

TestDriveRoutes.patch("/:queryId", updateTestDriveQuery);
async function updateTestDriveQuery(ctx) {
  try {
    const { queryId } = ctx.params;
    const { userActions } = ctx.request.body;

    weakValidation(queryId, "Query ID must be sent");

    await testDriveModule.updateTestDriveQuery({
      queryId,
      userActions,
    });

    return responseObject(ctx, HttpCodes.SUCCESS, true);
  } catch (error) {
    errorHandler(ctx, error, error.message);
  }
}

TestDriveRoutes.get("/user/count", userCount);
/** @deprecated */
async function userCount(ctx) {
  try {
    const response = await testDriveModule.userCount();
    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (error) {
    errorHandler(ctx, error, error.message);
  }
}

module.exports = mount("/api/test-drive-query", TestDriveRoutes.routes());
