'use strict';

const Router = require('koa-router');
const billingController = require('../../controllers/billing/billingController');
const ResponseStatusEnum = require('../../../infrastructure/dictionaries/ResponseStatusEnum');
const {
    responseObject,
} = require('../../../infrastructure/helpers/routerHelper');
let billingRouter = new Router();

billingRouter.patch('/change-fatmin/:billingid', async function (ctx, next) {
    let billingid = ctx.params.billingid;
    let params = ctx.request.body;
    let fatmin = params.fatmin;
    fatmin = Number.isNaN(parseFloat(fatmin)) ? 0 : parseFloat(fatmin);
    if ((billingid && fatmin) || (billingid && fatmin == 0))
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await billingController.updateFatmin(billingid, fatmin),
        );
    return responseObject(ctx, ResponseStatusEnum(405), null);
});

billingRouter.patch('/change-dspac/:billingid', async function (ctx, next) {
    let billingid = ctx.params.billingid;
    let params = ctx.request.body;
    let dspac = params.dspac;
    dspac = Number.isNaN(parseFloat(dspac)) ? 0 : parseFloat(dspac);
    if ((billingid && dspac) || (billingid && dspac == 0))
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await billingController.updateDspac(billingid, dspac),
        );
    return responseObject(ctx, ResponseStatusEnum(405), null);
});

billingRouter.patch('/change-accf/:billingid', async function (ctx, next) {
    let billingid = ctx.params.billingid;
    let params = ctx.request.body;
    let credits = params.credits;
    let assigner = ctx.auth_user_id;
    credits = Number.isNaN(parseFloat(credits)) ? 0 : parseFloat(credits);
    if (billingid)
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await billingController.updateAccountFunds(
                billingid,
                credits,
                assigner,
            ),
        );
    return responseObject(ctx, ResponseStatusEnum(405), null);
});

billingRouter.patch('/change-accf/v2/:billingid', async function (ctx, next) {
    const billingid = ctx.params.billingid;
    const params = ctx.request.body;
    const assigner = ctx.auth_user_id;
    const password = params.password;
    const billingUserId = params.billingUserId;
    let credits = params.credits;

    credits = Number.isNaN(parseFloat(credits)) ? 0 : parseFloat(credits);

    if (billingid)
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await billingController.updateAccountFundsv2(
                billingid,
                billingUserId,
                credits,
                assigner,
                password
            ),
        );
    return responseObject(ctx, ResponseStatusEnum(405), null);
});


billingRouter.patch('/update-hierarchy/:userid', async function (ctx, next) {
    let userid = ctx.params.userid;
    let params = ctx.request.body;
    let ownerid = params.ownerid;
    if (userid && ownerid)
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await billingController.updateBillingHierarchy(userid, ownerid),
        );
    return responseObject(ctx, ResponseStatusEnum(405), null);
});

billingRouter.patch('/change-financial-lock/:billingid', async function (
    ctx,
    next,
) {
    let billingid = ctx.params.billingid;
    let params = ctx.request.body;
    let financialLock = params.f;
    if (billingid && financialLock)
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await billingController.updateFinancialLock(
                billingid,
                financialLock,
            ),
        );
    return responseObject(ctx, ResponseStatusEnum(405), null);
});

billingRouter.patch('/update-deadline-to-pay/:billingid', async function (
    ctx,
    next,
) {
    let billingid = ctx.params.billingid;
    let params = ctx.request.body;
    if (billingid && params && params.endDate)
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await billingController.updateDeadlineToPay(
                billingid,
                params.initDate,
                params.endDate,
            ),
        );
    return responseObject(ctx, ResponseStatusEnum(405), null);
});

billingRouter.get('/update-invoice/:userid', async function (ctx, next) {
    let invoiceid = ctx.request.query.i;
    if (invoiceid) {
        let response = await billingController.updateInvoiceBillingStatus(
            invoiceid,
        );
        return responseObject(
            ctx,
            ResponseStatusEnum(response.cod),
            response.data,
        );
    }
    return responseObject(ctx, ResponseStatusEnum(405), null);
});

billingRouter.post('/report/all-user-data/', async function (ctx, next) {
    const {
        billingType,
        initDate,
        endDate,
        minBuyout,
        maxBuyout,
    } = ctx.request.body;
    const userId = ctx.auth_user_id;
    const args = {
        userId,
        billingType,
        initDate,
        endDate,
        minBuyout: typeof minBuyout === 'number' ? minBuyout : 0,
        maxBuyout:
            typeof maxBuyout === 'number' ? maxBuyout : Number.MAX_SAFE_INTEGER,
    };
    const response = await billingController.getAllUserDataToReport(args);
    return responseObject(ctx, ResponseStatusEnum(200), response);
});

billingRouter.get('/report/comercial-data/', async function (ctx, next) {
    let month = ctx.query.month;
    let year = ctx.query.year;

    let pospaid = ctx.query.pospaid != 0;
    let prepaid = ctx.query.prepaid != 0;
    return responseObject(
        ctx,
        ResponseStatusEnum(200),
        await billingController.getPartnerComissionConsumptionrDataToReportByPeriod(
            month,
            year,
            prepaid,
            pospaid,
        ),
    );
});

billingRouter.get(
    '/report/consumption-forecast-data/:partnerid',
    async function (ctx, next) {
        let partner = ctx.params.partnerid;
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await billingController.getPartnerConsumptionForecastDataToReport(
                partner,
            ),
        );
    },
);

billingRouter.get('/unblock-user/:userId', async function (ctx, next) {
    let uId = ctx.params.userId;
    if (uId) {
        let response = await billingController.unblockUser(uId);
        return responseObject(
            ctx,
            ResponseStatusEnum(response.cod),
            response.data,
        );
    }
    return responseObject(ctx, ResponseStatusEnum(405), null);
});

billingRouter.get('/block-user/:userId', async function (ctx, next) {
    let uId = ctx.params.userId;
    if (uId) {
        let response = await billingController.blockUser(uId);
        return responseObject(
            ctx,
            ResponseStatusEnum(response.cod),
            response.error,
        );
    }
    return responseObject(ctx, ResponseStatusEnum(405), null);
});

billingRouter.put('/subscriptions/:id', async function (ctx, next) {
    const id = ctx.params.id;
    const body = ctx.request.body;
    if (id && body) {
        const response = await billingController.updateSubscriptions(id, body);
        return responseObject(
            ctx,
            ResponseStatusEnum(ResponseStatusEnum(200)),
            response,
        );
    }
    return responseObject(ctx, ResponseStatusEnum(405), null);
});

billingRouter.patch(
    '/update-payment-expiration-day/:billingid',
    async function (ctx, next) {
        let billingid = ctx.params.billingid;
        let params = ctx.request.body;
        if (billingid && params && params.expirationDay)
            return responseObject(
                ctx,
                ResponseStatusEnum(200),
                await billingController.updatePaymentExpirationDay(
                    billingid,
                    params.expirationDay,
                ),
            );
        return responseObject(ctx, ResponseStatusEnum(405), null);
    },
);

module.exports = billingRouter;
