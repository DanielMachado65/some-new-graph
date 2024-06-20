(async function () {
    'use strict';

    const Router = require('koa-router');
    const aknaController = require('../../controllers/akna/aknaController');
    const ResponseStatusEnum = require('../../../infrastructure/dictionaries/ResponseStatusEnum');
    const {
        responseObject,
    } = require('../../../infrastructure/helpers/routerHelper');
    const _aknaRouter = new Router();

    _aknaRouter.get('/interested-area/', async function (ctx, net) {
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await aknaController.listAllInterestedArea(),
        );
    });

    _aknaRouter.post('/interested-area/:name', async function (ctx, net) {
        let name = ctx.params.name;
        if (!name) return responseObject(ctx, ResponseStatusEnum(405), null);
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await aknaController.addInterestedArea(name),
        );
    });

    _aknaRouter.delete('/interested-area/:name', async function (ctx, net) {
        let name = ctx.params.name;
        if (!name) return responseObject(ctx, ResponseStatusEnum(405), null);
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await aknaController.deleteInterestedArea(name),
        );
    });

    _aknaRouter.patch('/interested-area/:name', async function (ctx, net) {
        let name = ctx.params.name;
        let newName = ctx.query.newName;
        if (!name && !newName)
            return responseObject(ctx, ResponseStatusEnum(405), null);
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await aknaController.updateInterestedArea(name, newName),
        );
    });

    _aknaRouter.get('/list/', async function (ctx, net) {
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await aknaController.getLists(),
        );
    });

    _aknaRouter.get('/list/data-user/', async function (ctx, net) {
        let listTitle = ctx.query.listTitle;
        let email = ctx.query.email;
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await aknaController.getUserDataFromList(listTitle, email),
        );
    });

    _aknaRouter.post('/list/insert-user/', async function (ctx, net) {
        let user = ctx.request.body;
        if (!user) return responseObject(ctx, ResponseStatusEnum(405), null);
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await aknaController.importUserToList(user),
        );
    });

    _aknaRouter.get('/message/', async function (ctx, net) {
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await aknaController.listAllMessage(),
        );
    });

    _aknaRouter.post('/message/', async function (ctx, net) {
        let message = ctx.request.body;
        if (!message) return responseObject(ctx, ResponseStatusEnum(405), null);
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await aknaController.createNewMessage(message),
        );
    });

    _aknaRouter.get('/message/:message', async function (ctx, net) {
        let message = ctx.params.message;
        if (!message) return responseObject(ctx, ResponseStatusEnum(405), null);
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await aknaController.getMessage(message),
        );
    });

    _aknaRouter.get('/transactional-action/all/', async function (ctx, net) {
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await aknaController.getAllTransactionalActions(),
        );
    });

    _aknaRouter.get('/transactional-action/status-list/:title', async function (
        ctx,
        net,
    ) {
        let title = ctx.params.title;
        if (!title) return responseObject(ctx, ResponseStatusEnum(405), null);
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await aknaController.getTotalsAction(title),
        );
    });

    _aknaRouter.post('/transactional-action/create-list/', async function (
        ctx,
        net,
    ) {
        let transactionalAction = ctx.request.body;
        if (!transactionalAction)
            return responseObject(ctx, ResponseStatusEnum(405), null);
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await aknaController.createTransactionalAction(transactionalAction),
        );
    });

    _aknaRouter.post(
        '/transactional-action/shoot-emails/:actionName',
        async function (ctx, net) {
            let users = ctx.request.body;
            let actionName = ctx.params.actionName;
            if (!users || !actionName)
                return responseObject(ctx, ResponseStatusEnum(405), null);
            return responseObject(
                ctx,
                ResponseStatusEnum(200),
                await aknaController.shootTransactionalAction(
                    users,
                    actionName,
                ),
            );
        },
    );

    _aknaRouter.post('/email/send-test/', async function (ctx, net) {
        let testAction = ctx.request.body;
        if (!testAction)
            return responseObject(ctx, ResponseStatusEnum(405), null);
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await aknaController.mailSenderTestAction(testAction),
        );
    });

    _aknaRouter.get('/actions/detail/:title', async function (ctx, net) {
        let actionTitle = ctx.params.title;
        if (!actionTitle)
            return responseObject(ctx, ResponseStatusEnum(405), null);
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await aknaController.actionInformation(actionTitle),
        );
    });

    // _aknaRouter.get('/action/invalid-email/:actionTitle', async function (ctx, net) {
    //   let actionTitle = ctx.params.actionTitle;
    //   if(!actionTitle) return responseObject(ctx, ResponseStatusEnum(405), null);
    //   return responseObject(ctx, ResponseStatusEnum(200), await aknaController.invalidEmailsAction(actionTitle));
    // });

    _aknaRouter.post('/sms/send/', async function (ctx, net) {
        let data = ctx.request.body;
        if (!data || !(data.sender && data.phones && data.message))
            return responseObject(ctx, ResponseStatusEnum(405), null);
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await aknaController.shootTransactionalActionSMSCorporate(
                data.sender,
                data.phones,
                data.message,
            ),
        );
    });

    _aknaRouter.get('/sms/status/:code', async function (ctx, net) {
        let code = ctx.params.code;
        if (!code) return responseObject(ctx, ResponseStatusEnum(405), null);
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await aknaController.verifyStatusSent(code),
        );
    });

    _aknaRouter.get('/sms/recipient-response/:code', async function (ctx, net) {
        let code = ctx.params.code;
        if (!code) return responseObject(ctx, ResponseStatusEnum(405), null);
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await aknaController.verifyRecipientResponse(code),
        );
    });

    module.exports = _aknaRouter;
})();
