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

UserKnowRouter.post('/create', async function (ctx, _next) {
    const { name, document, email, phoneNumber, address } = ctx.request.body;

    const isValidParams = name && document && email && phoneNumber && address;

    if (!isValidParams) {
        const response = errorHandler('INVALID_PARAMS', ResponseStatusEnum);
        return responseObject(ctx, response.status, response.msg);
    }

    const { result, error } = await userKnowController.create({
        name,
        document,
        email,
        phoneNumber,
        address,
    });

    const response = error
        ? errorHandler(error, ResponseStatusEnum)
        : { status: ResponseStatusEnum(204), msg: null };

    return responseObject(ctx, response.status, response.msg);
});

module.exports = UserKnowRouter;
