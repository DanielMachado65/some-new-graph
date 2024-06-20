(async function () {
    'use strict';

    const Router = require('koa-router');
    const voucherController = require('../../controllers/voucher/voucherController');
    const ResponseStatusEnum = require('../../../infrastructure/dictionaries/ResponseStatusEnum');
    const {
        responseObject,
    } = require('../../../infrastructure/helpers/routerHelper');
    let voucherRouter = new Router();

    voucherRouter.post('/', async function (ctx, next) {
        let params = ctx.request.body;
        if (params.rules) {
            let response = await voucherController.createLote(params.rules);
            if (response.error)
                return responseObject(
                    ctx,
                    ResponseStatusEnum(response.code),
                    response.msg,
                );
            else {
                ctx.response.attachment('vouchers_olhonocarro.xlsx');
                return (ctx.body = response.file);
            }
        }
        return responseObject(ctx, ResponseStatusEnum(405), null);
    });

    voucherRouter.get('/user/:userid', async function (ctx, next) {
        let userid = ctx.params.userid;
        if (userid)
            return responseObject(
                ctx,
                ResponseStatusEnum(200),
                await voucherController.getByUser(userid),
            );
        return responseObject(ctx, ResponseStatusEnum(405), null);
    });

    voucherRouter.get('/code/:code', async function (ctx, next) {
        let code = ctx.params.code;
        if (code)
            return responseObject(
                ctx,
                ResponseStatusEnum(200),
                await voucherController.getByCode(code),
            );
        return responseObject(ctx, ResponseStatusEnum(405), null);
    });

    voucherRouter.post('/validate', async function (ctx, next) {
        let params = ctx.request.body;
        if (params.code) {
            let response = await voucherController.validate(params.code);
            return responseObject(
                ctx,
                ResponseStatusEnum(response.code),
                response,
            );
        }
        return responseObject(ctx, ResponseStatusEnum(405), null);
    });

    voucherRouter.post('/apply', async function (ctx, next) {
        let params = ctx.request.body;
        if (params.email && params.voucher) {
            let response = await voucherController.apply(
                params.email,
                params.voucher,
            );
            if (response)
                return responseObject(
                    ctx,
                    ResponseStatusEnum(response.status),
                    response,
                );
            else return responseObject(ctx, ResponseStatusEnum(405), null);
        }
        return responseObject(ctx, ResponseStatusEnum(405), null);
    });

    module.exports = voucherRouter;
})();
