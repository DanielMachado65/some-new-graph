'use strict';

const Router = require('koa-router');
const ResponseStatusEnum = require('../../../infrastructure/dictionaries/ResponseStatusEnum');
const {
    responseObject,
} = require('../../../infrastructure/helpers/routerHelper');
const {
    basicAuthenticationMiddleware,
} = require('../../middlewares/authMiddleware');
const recognitionController = require('../../controllers/recognition/recognition.controller');
const Rx = require('rxjs/Rx');

const {
    INVALID_PARAMS,
    INTERNAL_SERVER_ERROR,
} = require('../../../infrastructure/constants/message/system.error.message');

const createRoutes = (router) => {
    router.post('/plates', basicAuthenticationMiddleware, plates);
    return router;
};

const plates = (context, _next) => {
    return new Promise((resolve, reject) => {
        Rx.Observable.of(context.request.body.image)
            .map((maybeImage) => {
                if (!maybeImage) throw new Error('INVALID_PARAMS');
                return maybeImage;
            })
            .flatMap((image) => recognitionController.getPossiblePlates(image))
            .map((detectedPlates) => ({
                status: ResponseStatusEnum(200),
                msg: { result: detectedPlates },
            }))
            .catch((error) => Rx.Observable.of(errorHandler(error)))
            .map((response) =>
                responseObject(context, response.status, response.msg),
            )
            .subscribe(
                (success) => resolve(success),
                (error) => reject(error),
            );
    });
};

const errorHandler = (error) => {
    switch (error.message) {
        case 'INVALID_PARAMS':
            return {
                status: ResponseStatusEnum(405),
                msg: { error: INVALID_PARAMS },
            };

        case 'UPLOAD_ERROR':
            return {
                status: ResponseStatusEnum(200),
                msg: { error: 'Não foi possível realizar o upload da imagem.' },
            };

        case 'RECOGNITION_ERROR':
            return {
                status: ResponseStatusEnum(200),
                msg: {
                    error:
                        'Não foi possível fazer o reconhecimento da placa informada.',
                },
            };

        default:
            return {
                status: ResponseStatusEnum(500),
                msg: { error: INTERNAL_SERVER_ERROR },
            };
    }
};

module.exports = createRoutes(new Router());
