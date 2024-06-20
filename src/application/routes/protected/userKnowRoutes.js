'use strict';

const Router = require('koa-router');
const userKnowController = require('../../controllers/user/userKnowController');
const ResponseStatusEnum = require('../../../infrastructure/dictionaries/ResponseStatusEnum');
const {
    responseObject,
} = require('../../../infrastructure/helpers/routerHelper');
const {
    errorHandler,
} = require('../../../infrastructure/helpers/user/userKnowErrorHelper');
const UserKnowRouter = new Router();

UserKnowRouter.get('/all', async function (ctx, _next) {
    const { result, error } = await userKnowController.getAll();

    const response = error
        ? errorHandler(error, ResponseStatusEnum)
        : { status: ResponseStatusEnum(200), msg: result };

    return responseObject(ctx, response.status, response.msg);
});

module.exports = UserKnowRouter;
