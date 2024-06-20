(async function () {
    'use strict';

    const Router = require('koa-router');
    const couponController = require('../../controllers/coupon/couponController');
    const ResponseStatusEnum = require('../../../infrastructure/dictionaries/ResponseStatusEnum');
    const WeakValidator = require('../../../infrastructure/utils/weakValidator.util');
    const {
        responseObject,
    } = require('../../../infrastructure/helpers/routerHelper');
    let couponRouter = new Router();

    couponRouter.get('/', async function (ctx) {
        const creator = ctx.auth_user_id;
        const mainCoupons = ctx.request.query.main;
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await couponController.getAll(creator, mainCoupons),
        );
    });

    couponRouter.post('/create-coupon', async (ctx) => {
        const generator = ctx.auth_user_id;
        const { creator, rules, couponName } = ctx.request.body;
        const status = ResponseStatusEnum(200);
        WeakValidator.weakValidationToNVariables(rules, couponName, generator);
        await couponController.createCoupon(
            rules,
            creator,
            couponName,
            generator,
        );
        return responseObject(ctx, status, '');
    });

    couponRouter.get('/filter-by', async function (ctx) {
        const iDt = ctx.request.query.iDt;
        const eDt = ctx.request.query.eDt;
        const code = ctx.request.query.code;

        if (!iDt && !eDt && !code)
            return responseObject(ctx, ResponseStatusEnum(405), null);

        const response = await couponController.filterBy(iDt, eDt, code);
        return responseObject(
            ctx,
            ResponseStatusEnum(response.status),
            response.data,
        );
    });

    module.exports = couponRouter;
})();
