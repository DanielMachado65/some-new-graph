"use strict";

const Router = require("koa-router");
const userController = require("../../controllers/user/userController");
const ResponseStatusEnum = require("../../../infrastructure/dictionaries/ResponseStatusEnum");
const userConvertedController = require("../../controllers/user/userConvertedController");
const WeakValidator = require("../../../infrastructure/utils/weakValidator.util");
const {
  responseObject,
} = require("../../../infrastructure/helpers/routerHelper");
const _userRouter = new Router();

_userRouter.get("/get-total-pre-paid", async function (ctx) {
  return responseObject(
    ctx,
    ResponseStatusEnum(200),
    await userController.getTotalPrePaid()
  );
});

_userRouter.get("/get-total-pos-paid", async function (ctx) {
  return responseObject(
    ctx,
    ResponseStatusEnum(200),
    await userController.getTotalPosPaid()
  );
});

_userRouter.get("/get-total-partners", async function (ctx) {
  return responseObject(
    ctx,
    ResponseStatusEnum(200),
    await userController.getTotalPartners()
  );
});

_userRouter.get("/get-all-administrators", async function (ctx) {
  return responseObject(
    ctx,
    ResponseStatusEnum(200),
    await userController.getAllAdms()
  );
});

_userRouter.get("/get-all-integrators", async function (ctx) {
  return responseObject(
    ctx,
    ResponseStatusEnum(200),
    await userController.getAllIntegrators()
  );
});

_userRouter.get("/get-all-pre-paid", async function (ctx) {
  return responseObject(
    ctx,
    ResponseStatusEnum(200),
    await userController.getAllPrePaid()
  );
});

_userRouter.get("/get-all-pos-paid", async function (ctx) {
  return responseObject(
    ctx,
    ResponseStatusEnum(200),
    await userController.getAllPosPaid()
  );
});

_userRouter.get("/get-all-partners", async function (ctx) {
  return responseObject(
    ctx,
    ResponseStatusEnum(200),
    await userController.getAllPartners()
  );
});

_userRouter.get("/partners-clients-pre/:id", async function (ctx) {
  let partnerid = ctx.params.id;
  if (!partnerid) return responseObject(ctx, ResponseStatusEnum(405), null);
  return responseObject(
    ctx,
    ResponseStatusEnum(200),
    await userController.getAllPrePaidPartnerChildren(partnerid)
  );
});

_userRouter.get("/partners-clients-post/:id", async function (ctx) {
  let partnerid = ctx.params.id;
  if (!partnerid) return responseObject(ctx, ResponseStatusEnum(405), null);
  return responseObject(
    ctx,
    ResponseStatusEnum(200),
    await userController.getAllPosPaidPartnerChildren(partnerid)
  );
});

_userRouter.get("/partners-clients-integrators/:id", async function (ctx) {
  const partnerid = ctx.params.id;
  if (!partnerid) return responseObject(ctx, ResponseStatusEnum(405), null);
  return responseObject(
    ctx,
    ResponseStatusEnum(200),
    await userController.getAllIntegratorsPartnerChildren(partnerid)
  );
});

_userRouter.get("/disable/:uid", async function (ctx) {
  let uid = ctx.params.uid;
  if (uid)
    return responseObject(
      ctx,
      ResponseStatusEnum(200),
      await userController.disableUser(uid)
    );
  return responseObject(ctx, ResponseStatusEnum(405), null);
});

_userRouter.get("/enable/:uid", async function (ctx) {
  let uid = ctx.params.uid;
  if (uid)
    return responseObject(
      ctx,
      ResponseStatusEnum(200),
      await userController.enableUser(uid)
    );
  return responseObject(ctx, ResponseStatusEnum(405), null);
});

_userRouter.patch("/set-cancellation-reason/:uid", async function (ctx) {
  let uid = ctx.params.uid;
  let data = ctx.request.body;
  if (uid && data)
    return responseObject(
      ctx,
      ResponseStatusEnum(200),
      await userController.setCancellationReason(uid, data)
    );
  return responseObject(ctx, ResponseStatusEnum(405), null);
});

_userRouter.patch("/change-type/:uid", async function (ctx) {
  let uid = ctx.params.uid;
  let data = ctx.request.body;
  if (uid && data)
    return responseObject(
      ctx,
      ResponseStatusEnum(200),
      await userController.changeUserType(uid, data)
    );
  return responseObject(ctx, ResponseStatusEnum(405), null);
});

_userRouter.get("/get-all-users-test-drive", async function (ctx) {
  const initDate = ctx.request.query.idt;
  const endDate = ctx.request.query.edt;
  return responseObject(
    ctx,
    ResponseStatusEnum(200),
    await userConvertedController.getAllUsersConverteds(initDate, endDate)
  );
});

_userRouter.post("/new", async function (ctx) {
  let params = ctx.request.body;
  let userid = ctx.auth_user_id;
  if (!params || !userid)
    return responseObject(ctx, ResponseStatusEnum(405), null);
  let response = await userController.addNewUser(params, userid);
  return responseObject(ctx, ResponseStatusEnum(response.cod), response.result);
});

_userRouter.post("/upload-docs/:uid", async function (ctx) {
  let params = ctx.request.body;
  let userid = ctx.params.uid;
  if (!params || !params.documents || !userid)
    return responseObject(ctx, ResponseStatusEnum(405), null);
  let response = await userController.uploadDocuments(userid, params.documents);
  return responseObject(ctx, ResponseStatusEnum(response.cod), response.result);
});

_userRouter.post("/upload-picture/:uid", async function (ctx) {
  let params = ctx.request.body;
  let userid = ctx.params.uid;
  if (!params || !userid)
    return responseObject(ctx, ResponseStatusEnum(405), null);
  let response = await userController.uploadPicture(userid, params);
  return responseObject(ctx, ResponseStatusEnum(response.cod), response.result);
});

_userRouter.post("/delete-picture/:uid", async function (ctx) {
  let params = ctx.request.body;
  let userid = ctx.params.uid;
  if (!params || !userid)
    return responseObject(ctx, ResponseStatusEnum(405), null);
  let response = await userController.deletePicture(userid, params);
  return responseObject(ctx, ResponseStatusEnum(response.cod), response.result);
});

_userRouter.get("/search", async function (ctx) {
  let name = ctx.request.query.name;
  let email = ctx.request.query.email;
  let doc = ctx.request.query.doc;
  let _id = ctx.request.query.id;
  let type = ctx.request.query.type;
  let lastLogin = ctx.request.query.lastLogin;
  if (name || email || doc || _id || lastLogin)
    return responseObject(
      ctx,
      ResponseStatusEnum(200),
      await userController.search(
        name,
        email,
        doc,
        _id,
        null,
        null,
        type,
        lastLogin
      )
    );
  return responseObject(ctx, ResponseStatusEnum(405), null);
});

_userRouter.get("/user-id", async (ctx) => {
  const { email } = ctx.request.query;
  try {
    WeakValidator.weakValidation(email);
    const user = await userController.getByEmail(email, { _id: 1 });
    return responseObject(ctx, ResponseStatusEnum(200), user);
  } catch (err) {
    return responseObject(
      ctx,
      ResponseStatusEnum(err.status || 500),
      err.message
    );
  }
});

_userRouter.post("/report-repass-partners", async function (ctx) {
  let params = ctx.request.body;
  let initDate = params.initDate;
  let endDate = params.endDate;
  let partnersids = params.ids;
  if (!partnersids || partnersids.length === 0 || !endDate || !initDate)
    return responseObject(ctx, ResponseStatusEnum(405), null);
  let response = await userController.generatePartnerReportDataRepass(
    partnersids,
    initDate,
    endDate
  );
  return responseObject(ctx, ResponseStatusEnum(200), response);
});

_userRouter.post("/report-repass-breakdown/:partnerid", async function (ctx) {
  let partnerid = ctx.params.partnerid;
  let dt = ctx.request.query.dt;
  if (!partnerid || !dt)
    return responseObject(ctx, ResponseStatusEnum(405), null);
  let response = await userController.generateBreakdownRepassReport(
    partnerid,
    dt
  );
  return responseObject(ctx, ResponseStatusEnum(200), response);
});

_userRouter.get("/check-telefone", async function (ctx) {
  let telefone = ctx.request.query.telefone;
  if (telefone)
    return responseObject(
      ctx,
      ResponseStatusEnum(200),
      await userController.checkPhoneNumber(telefone)
    );
  return responseObject(ctx, ResponseStatusEnum(405), null);
});

_userRouter.get("/after-sales-info/:userId", async function (ctx) {
  const { userId } = ctx.params;

  const response = await userController.getAfterSalesInformations(userId);
  return responseObject(ctx, ResponseStatusEnum(200), response);
});
_userRouter.post("/after-sales-info/:id", async function (ctx) {
  const { operator, message } = ctx.request.body;
  const { id } = ctx.params;

  const response = await userController.addAfterSalesInformation(
    id,
    operator,
    message
  );
  return responseObject(ctx, ResponseStatusEnum(200), response);
});
_userRouter.delete("/after-sales-info/:user/:id", async function (ctx) {
  const { user, id } = ctx.params;
  const response = await userController.deleteAfterSalesInformation(user, id);
  return responseObject(ctx, ResponseStatusEnum(200), response);
});

_userRouter.patch("/after-sales-info/:user/:id", async function (ctx) {
  const { user, id } = ctx.params;
  const { body } = ctx.request;
  const response = await userController.editAfterSalesInformation(
    user,
    id,
    body
  );
  return responseObject(ctx, ResponseStatusEnum(200), response);
});

_userRouter.patch("/:id", async function (ctx) {
  const params = ctx.request.body;
  const id = ctx.params.id;
  if (!params || !id) return responseObject(ctx, ResponseStatusEnum(405), null);
  let response = await userController.update(params, id);
  return responseObject(ctx, ResponseStatusEnum(response.cod), response.result);
});

_userRouter.get("/car-resellers", async function (ctx) {
  const initDate = new Date(ctx.request.query.initDate);
  const endDate = new Date(ctx.request.query.endDate);
  const isDatesValid =
    initDate instanceof Date &&
    endDate instanceof Date &&
    !isNaN(initDate.getTime()) &&
    !isNaN(endDate.getTime());

  if (!isDatesValid)
    return responseObject(
      ctx,
      ResponseStatusEnum(405),
      "Invalid `initDate` and `endDate` query params"
    );

  let result = await userController.getConfirmedCarResellers({
    initDate,
    endDate,
  });
  return responseObject(ctx, ResponseStatusEnum(200), result);
});

module.exports = _userRouter;
