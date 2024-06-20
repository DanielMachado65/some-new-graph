(async function () {
    'use strict';

    const Router = require('koa-router');
    const priceTableController = require('../../controllers/billing/priceTableController');
    const ResponseStatusEnum = require('../../../infrastructure/dictionaries/ResponseStatusEnum');
    const {
        responseObject,
    } = require('../../../infrastructure/helpers/routerHelper');
    let _priceTableRouter = new Router();

    _priceTableRouter.get('/', async (ctx) => {
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await priceTableController.getAll(),
        );
    });

    _priceTableRouter.get('/get-all-by-creator/:uid', async (ctx) => {
        let userid = ctx.params.uid;
        if (!userid) return responseObject(ctx, ResponseStatusEnum(405), null);
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await priceTableController.getAllByCreator(userid),
        );
    });

    _priceTableRouter.delete('/d/:p', async (ctx) => {
        let id = ctx.params.p;
        if (id)
            return responseObject(
                ctx,
                ResponseStatusEnum(200),
                await priceTableController.deletePriceTable(id),
            );
        return responseObject(ctx, ResponseStatusEnum(405), null);
    });

    _priceTableRouter.patch('/update-item/:pricetableid', async function (
        ctx,
        net,
    ) {
        let params = ctx.request.body;
        let pricetableid = ctx.params.pricetableid;
        if (params.price && params.querycode && pricetableid) {
            let result = await priceTableController.updatePriceTableItem(
                params,
                pricetableid,
            );
            if (!result.error) {
                return responseObject(ctx, ResponseStatusEnum(200), true);
            } else {
                return responseObject(
                    ctx,
                    ResponseStatusEnum(405),
                    result.error,
                );
            }
        }
        return responseObject(ctx, ResponseStatusEnum(405), null);
    });

    _priceTableRouter.patch('/set-plan/:pricetableid', async function (
        ctx,
        net,
    ) {
        const params = ctx.request.body;
        const pricetableid = ctx.params.pricetableid;
        if (
            params &&
            params.hasOwnProperty &&
            params.hasOwnProperty('plan') &&
            pricetableid
        ) {
            const result = await priceTableController.setPriceTablePlan(
                params,
                pricetableid,
            );
            if (!result.error) {
                return responseObject(ctx, ResponseStatusEnum(200), true);
            } else {
                return responseObject(
                    ctx,
                    ResponseStatusEnum(405),
                    result.error,
                );
            }
        }
        return responseObject(ctx, ResponseStatusEnum(405), null);
    });

    _priceTableRouter.patch(
        '/update-consumption-range/:pricetableid',
        async function (ctx, net) {
            let params = ctx.request.body;
            let pricetableid = ctx.params.pricetableid;
            if (
                params.rangestart &&
                params.price &&
                params.querycode &&
                pricetableid
            ) {
                let result = await priceTableController.updatePriceTableConsumptionRange(
                    params.rangestart,
                    params.price,
                    params.querycode,
                    pricetableid,
                );
                if (!result.error) {
                    return responseObject(
                        ctx,
                        ResponseStatusEnum(200),
                        result.data,
                    );
                } else {
                    return responseObject(
                        ctx,
                        ResponseStatusEnum(405),
                        result.error,
                    );
                }
            }
            return responseObject(ctx, ResponseStatusEnum(405), null);
        },
    );

    _priceTableRouter.post(
        '/delete-consumption-range/:pricetableid',
        async function (ctx, net) {
            let params = ctx.request.body;
            let pricetableid = ctx.params.pricetableid;
            if (params.rangestart && params.querycode && pricetableid) {
                let result = await priceTableController.deletePriceTableConsumptionRange(
                    params.rangestart,
                    params.querycode,
                    pricetableid,
                );
                if (!result.error) {
                    return responseObject(
                        ctx,
                        ResponseStatusEnum(200),
                        result.data,
                    );
                } else {
                    return responseObject(
                        ctx,
                        ResponseStatusEnum(405),
                        result.error,
                    );
                }
            }
            return responseObject(ctx, ResponseStatusEnum(405), null);
        },
    );

    _priceTableRouter.patch('/update-template/:pricetableid', async function (
        ctx,
        net,
    ) {
        let params = ctx.request.body;
        let pricetableid = ctx.params.pricetableid;
        if (params.template) {
            return responseObject(
                ctx,
                ResponseStatusEnum(200),
                await priceTableController.updatePriceTable(
                    params.template,
                    pricetableid,
                ),
            );
        }
        return responseObject(ctx, ResponseStatusEnum(405), null);
    });

    module.exports = _priceTableRouter;
})();
