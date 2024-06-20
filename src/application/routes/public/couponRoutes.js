'use strict';

const Router = require('koa-router');
const couponController = require('../../controllers/coupon/couponController');
const ResponseStatusEnum = require('../../../infrastructure/dictionaries/ResponseStatusEnum');
const {
    basicAuthenticationMiddleware,
} = require('../../middlewares/authMiddleware');
const {
    responseObject,
} = require('../../../infrastructure/helpers/routerHelper');
const couponRouter = new Router();

couponRouter.post('/', basicAuthenticationMiddleware, async function (ctx) {
    let params = ctx.request.body;
    let creator = params.creator || ctx.auth_user_id;

    if (params.rules) {
        let response = await couponController.createLote(
            params.number,
            params.rules,
            creator,
            params.couponName,
        );
        if (response.error)
            return responseObject(
                ctx,
                ResponseStatusEnum(response.code),
                response.msg,
            );
        else {
            ctx.response.attachment('cupons_olhonocarro.xlsx');
            return (ctx.body = response.file);
        }
    }
    return responseObject(ctx, ResponseStatusEnum(405), null);
});
couponRouter.get(
    '/validate-user-usage/:couponId',
    basicAuthenticationMiddleware,
    async (ctx) => {
        const userId = ctx.auth_user_id;
        const { couponId } = ctx.params;
        if (userId && couponId) {
            const result = await couponController.userCanUseThisCoupon(
                userId,
                couponId,
            );
            return responseObject(ctx, ResponseStatusEnum(200), result);
        }
        return responseObject(ctx, ResponseStatusEnum(405), null);
    },
);
couponRouter.get('/user/:userid', async function (ctx) {
    let userid = ctx.params.userid;
    if (userid)
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await couponController.getByUser(userid),
        );
    return responseObject(ctx, ResponseStatusEnum(405), null);
});

couponRouter.get('/code/:code', async function (ctx) {
    let code = ctx.params.code;
    if (code)
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await couponController.getByCode(code),
        );
    return responseObject(ctx, ResponseStatusEnum(405), null);
});

couponRouter.post('/validate/:code', async function (ctx) {
    let code = ctx.params.code;
    let { items, userId } = ctx.request.body;
    if (code && items) {
        let response = await couponController.couponValidation(
            code,
            items,
            userId,
        );
        return responseObject(ctx, ResponseStatusEnum(response.code), response);
    }
    return responseObject(ctx, ResponseStatusEnum(405), null);
});

module.exports = couponRouter;
