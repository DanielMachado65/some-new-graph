'use strict';

const ResponseStatusEnum = require('../../../infrastructure/dictionaries/ResponseStatusEnum');

const settingsController = require('../../controllers/settings/settingsController');
const Router = require('koa-router');
const settingsRouter = new Router();
const {
    basicAuthenticationMiddleware,
} = require('../../middlewares/authMiddleware');
const {
    responseObject,
} = require('../../../infrastructure/helpers/routerHelper');
const navigationContext = require('../../../infrastructure/constants/navigationContext');

settingsRouter.get('/:id', basicAuthenticationMiddleware, async (ctx) => {
    let id = ctx.params.id;
    if (!id) return responseObject(ctx, ResponseStatusEnum(404), null);
    return responseObject(
        ctx,
        ResponseStatusEnum(200),
        await settingsController.getById(id),
    );
});

settingsRouter.get(
    '/user/:userid',
    basicAuthenticationMiddleware,
    async (ctx) => {
        let userid = ctx.params.userid;
        if (!userid) return responseObject(ctx, ResponseStatusEnum(404), null);
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await settingsController.getByUser(userid),
        );
    },
);

settingsRouter.post(
    '/upsert/:userid',
    basicAuthenticationMiddleware,
    async (ctx) => {
        let userid = ctx.params.userid;
        let params = ctx.request.body;
        if (!userid || !params)
            return responseObject(ctx, ResponseStatusEnum(404), null);
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await settingsController.updateByUser(userid, params),
        );
    },
);

settingsRouter.get('/navigation-context/:p', async (ctx) => {
    let p = ctx.params.p;
    if (!p) return responseObject(ctx, ResponseStatusEnum(404), null);
    else {
        switch (parseInt(p)) {
            case 1:
                return responseObject(
                    ctx,
                    ResponseStatusEnum(200),
                    navigationContext.onc,
                );
            case 2:
                return responseObject(
                    ctx,
                    ResponseStatusEnum(200),
                    navigationContext.checktudo,
                );
            default:
                return responseObject(ctx, ResponseStatusEnum(404), null);
        }
    }
});

module.exports = settingsRouter;
