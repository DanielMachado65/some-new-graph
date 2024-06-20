'strict mode';

const Router = require('koa-router');
const ResponseStatusEnum = require('../../../infrastructure/dictionaries/ResponseStatusEnum');
const queryContextController = require('../../controllers/context/queryContextController');
const personInformationController = require('../../controllers/person_information/personInformationController');
const {
    responseObject,
} = require('../../../infrastructure/helpers/routerHelper');
const userController = require('../../controllers/user/userController');

let personInformationRouter = new Router();

personInformationRouter.post('/:userid', async function (ctx, next) {
    let _userid = ctx.params.userid;
    let _params = ctx.request.body;
    let _queryCode = _params ? _params.querycode : null;
    let _keys = _params ? _params.keys : null;
    let _duplicityChecker = _params ? _params.duplicity : null;
    if (_userid && _queryCode && _keys) {
        if (await userController.hasClientPermission(_userid, ctx)) {
            let response = await queryContextController.executeQueryContext(
                _userid,
                _queryCode,
                _keys,
                _duplicityChecker,
            );
            return responseObject(
                ctx,
                ResponseStatusEnum(response.cod),
                response.data,
            );
        }
        return responseObject(
            ctx,
            ResponseStatusEnum(401),
            'Ops...O IP o qual você esta utilizando para realizar a consulta, não é um IP habilitado pelo(a) gerente desta conta. Contate-nos para mais informações...',
        );
    }
    return responseObject(ctx, ResponseStatusEnum(405), 'Invalid params');
});

personInformationRouter.get('/:id', async function (ctx, next) {
    let _id = ctx.params.id;
    if (_id)
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await personInformationController.getById(_id),
        );
    return responseObject(ctx, ResponseStatusEnum(405), 'Invalid params');
});

personInformationRouter.get('/doc/:doc', async function (ctx, next) {
    let doc = ctx.params.doc;
    if (doc)
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await personInformationController.getByDoc(doc),
        );
    return responseObject(ctx, ResponseStatusEnum(405), 'Invalid params');
});

personInformationRouter.delete('/:doc', async function (ctx, next) {
    let doc = ctx.params.doc;
    if (doc)
        return responseObject(
            ctx,
            ResponseStatusEnum(200),
            await personInformationController.removeByDoc(doc),
        );
    return responseObject(ctx, ResponseStatusEnum(405), 'Invalid params');
});

module.exports = personInformationRouter;
