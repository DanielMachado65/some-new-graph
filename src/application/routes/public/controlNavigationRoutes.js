'use strict';

const Router = require('koa-router');
const ControlUserNavigationController = require('../../controllers/control/controlUserNavigationController');
const ResponseStatusEnum = require('../../../infrastructure/dictionaries/ResponseStatusEnum');
const {
    responseObject,
} = require('../../../infrastructure/helpers/routerHelper');
const {
    errorHandlerControlUserNavigation,
} = require('../../../infrastructure/helpers/control/controlUserNavigationErrorHelper');
const ControlNavigationRouter = new Router();

ControlNavigationRouter.patch('/user/dialog-phone-number/', async function (
    ctx,
    _next,
) {
    const userId = ctx.auth_user_id;
    const data = ctx.request.body;

    if (!data || !userId) {
        const response = errorHandlerControlUserNavigation(
            'INVALID_PARAMS',
            ResponseStatusEnum,
        );
        return responseObject(ctx, response.status, response.msg);
    }

    const {
        result,
        error,
    } = await ControlUserNavigationController.updateDialogPhoneNumberByUserId(
        userId,
        data,
    );

    const response = error
        ? errorHandlerControlUserNavigation(error, ResponseStatusEnum)
        : { status: ResponseStatusEnum(200), msg: result };

    return responseObject(ctx, response.status, response.msg);
});

ControlNavigationRouter.post('/user/', async function (ctx, _next) {
    const userId = ctx.auth_user_id;
    const data = ctx.request.body;

    if (!userId) {
        const response = errorHandlerControlUserNavigation(
            'INVALID_PARAMS',
            ResponseStatusEnum,
        );
        return responseObject(ctx, response.status, response.msg);
    }

    const {
        result,
        error,
    } = await ControlUserNavigationController.createControlUserNavigation(
        userId,
        data,
    );

    const response = error
        ? errorHandlerControlUserNavigation(error, ResponseStatusEnum)
        : { status: ResponseStatusEnum(200), msg: result };

    return responseObject(ctx, response.status, response.msg);
});

ControlNavigationRouter.get('/user/:userId', async function (ctx, _next) {
    const userId = ctx.params.userId;

    if (!userId) {
        const response = errorHandlerControlUserNavigation(
            'INVALID_PARAMS',
            ResponseStatusEnum,
        );
        return responseObject(ctx, response.status, response.msg);
    }

    const { result, error } = await ControlUserNavigationController.getByUserId(
        userId,
    );

    const response = error
        ? errorHandlerControlUserNavigation(error, ResponseStatusEnum)
        : { status: ResponseStatusEnum(200), msg: result };

    return responseObject(ctx, response.status, response.msg);
});

module.exports = ControlNavigationRouter;
