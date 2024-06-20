(async function () {
    'use strict';

    const quizModule = require('../../../domain/quiz/quizModule');
    const quizAnswerHelper = require('../../../infrastructure/helpers/quizAnswer/quizAnswerHelper');
    const quizAnswerModule = require('../../../domain/quiz/quizAnswerModule');
    const couponModule = require('../../../domain/coupon/couponModule');
    const paymentModule = require('../../../domain/billing/payment/payment.module');
    const {
        responseObject,
    } = require('../../../infrastructure/helpers/routerHelper');
    const HttpCode = require('../../../infrastructure/enumerators/httpCode.enum');

    const createQuizAnswer = async (
        quizId,
        { email, answers, isEmailChecked },
    ) => {
        try {
            const quizResponse = await quizModule.getQuizById(quizId);
            if (quizResponse.error)
                return quizAnswerHelper.quizAnswerErrorHandler(quizResponse);

            const answersResponse = quizAnswerHelper.validateAnswers(answers);
            if (answersResponse.error)
                return quizAnswerHelper.quizAnswerErrorHandler(answersResponse);

            const totalQuestionsResponse = quizAnswerHelper.getTotalQuestions(
                answers,
            );
            if (totalQuestionsResponse.error)
                return quizAnswerHelper.quizAnswerErrorHandler(
                    totalQuestionsResponse,
                );
            const totalQuestions = totalQuestionsResponse.result;

            const hitsNumberResponse = quizAnswerHelper.getHitsNumber(answers);
            if (hitsNumberResponse.error)
                return quizAnswerHelper.quizAnswerErrorHandler(
                    hitsNumberResponse,
                );
            const hitsNumber = hitsNumberResponse.result;

            const validateHitsNumberResponse = quizAnswerHelper.validateHitsNumber(
                totalQuestions,
                hitsNumber,
            );
            if (validateHitsNumberResponse.error)
                return quizAnswerHelper.quizAnswerErrorHandler(
                    validateHitsNumberResponse,
                );

            const couponResponse = await createCoupon(
                quizResponse.result._doc.couponName,
                quizResponse.result._doc.discountPercentage,
                hitsNumber,
            );
            if (couponResponse.error)
                return quizAnswerHelper.quizAnswerErrorHandler(couponResponse);

            const quizAnswerResponse = await quizAnswerModule.createQuizAnswer(
                quizId,
                {
                    email,
                    totalQuestions,
                    hitsNumber,
                    answers,
                    couponName: couponResponse.result.name,
                    isEmailChecked,
                },
            );
            if (quizAnswerResponse.error)
                return quizAnswerHelper.quizAnswerErrorHandler(
                    quizAnswerResponse,
                );

            await quizAnswerModule.sendEmail(email, couponResponse.result, {
                hitsNumber,
                totalQuestions,
            });

            return {
                result: {
                    quizAnswer: quizAnswerResponse.result,
                    coupon: couponResponse.result,
                },
            };
        } catch (error) {
            return { error: 'CREATE_QUIZ_ANSWER_ERROR', data: error };
        }
    };

    const validateEmail = async ({ quizId, email }) => {
        try {
            const quizAnswerResponse = await quizAnswerModule.getQuizAnswerByEmail(
                { email },
            );
            if (quizAnswerResponse.error)
                return quizAnswerHelper.quizAnswerErrorHandler(
                    quizAnswerResponse,
                );

            if (!quizAnswerResponse.result.length) return { result: true };

            const validateEmailResponse = quizAnswerHelper.isValidEmail({
                quizId,
                quizAnswers: quizAnswerResponse.result,
            });
            if (validateEmailResponse.error)
                return quizAnswerHelper.quizAnswerErrorHandler(
                    validateEmailResponse,
                );

            return { result: validateEmailResponse.result };
        } catch (error) {
            return { error: 'VALIDATE_EMAIL_QUIZ_ANSWER_ERROR', data: error };
        }
    };

    const getQuizAnswerByEmail = async (email) => {
        const response = await quizAnswerModule.getQuizAnswerByEmail({ email });
        if (response.error)
            return quizAnswerHelper.quizAnswerErrorHandler(response);
        return response;
    };

    const getQuizAnswerByQuizId = async (quizAnswerId) => {
        const response = await quizAnswerModule.getQuizAnswerByQuizId(
            quizAnswerId,
        );
        if (response.error)
            return quizAnswerHelper.quizAnswerErrorHandler(response);
        return response;
    };

    const getAllQuizAnswer = async (filter) => {
        const quizAnswers = await quizAnswerModule.getAllQuizAnswer(filter);
        if (quizAnswers.error)
            return quizAnswerHelper.quizAnswerErrorHandler(quizAnswers);
        const couponsIds = await quizAnswers.result.map(
            (quizAnswer) => quizAnswer.coupon._id,
        );
        const payments = await paymentModule.getBatchByCouponsIds(couponsIds);
        const responseDTOObject = await quizAnswerHelper.getDTOData(
            quizAnswers.result,
            payments.result,
        );
        if (responseDTOObject.error)
            return quizAnswerHelper.quizAnswerErrorHandler(responseDTOObject);
        return responseDTOObject;
    };

    const updateDataFacebook = async (quizAnswerId, data) => {
        const objectToSave = await quizAnswerHelper.getDataOfFacebookObject(
            data,
        );
        const quizAnswerResponse = await quizAnswerModule.updateDataFacebook(
            quizAnswerId,
            objectToSave,
        );
        if (quizAnswerResponse.error)
            return quizAnswerHelper.quizAnswerErrorHandler(response);
        return quizAnswerResponse;
    };

    const createCoupon = async (
        couponName,
        hitsNumber,
        discountPercentageByQuestion,
    ) => {
        try {
            const date = new Date();
            const expirationDate = date.setDate(date.getDate() + 2);
            const LIMIT_USAGE = 1;
            const loteNumber = 0;
            const discountPercentage = quizAnswerHelper.getValueOfDiscountPercentage(
                hitsNumber,
                discountPercentageByQuestion,
            );
            const rulesObject = {
                discountPercentage,
                expirationDate,
                limitUsage: LIMIT_USAGE,
            };
            const creator = null;
            couponName = quizAnswerHelper.generateCouponName(couponName);
            const couponResponse = await couponModule.createLote(
                loteNumber,
                rulesObject,
                creator,
                couponName,
            );
            if (!couponResponse || couponResponse.error)
                return { error: 'CREATE_COUPON_QUIZ_ERROR', data: null };
            return {
                result: {
                    ...rulesObject,
                    name: couponName,
                    discountPercentage,
                },
            };
        } catch (error) {
            return { error: 'CREATE_COUPON_QUIZ_ANSWER_ERROR', data: error };
        }
    };

    const sendEmail = async (ctx) => {
        const body = ctx.request.body;
        const email = body.payload ? body.payload.email : body.email;
        const timesSend = body.payload
            ? body.payload.timesSend
                ? 1
                : 2
            : body.timesSend;
        const coupon = body.payload ? body.payload.coupon : body.coupon;
        console.log(body);
        try {
            const response = await quizAnswerModule.sendEmail(
                email,
                coupon,
                null,
                timesSend,
            );
            return responseObject(ctx, HttpCode.SUCCESS, response);
        } catch (e) {
            if (e.statusCode) e.statusCode = HttpCode.INTERNAL_ERROR;
            return responseObject(ctx, HttpCode.SUCCESS, e);
        }
    };

    module.exports = {
        createQuizAnswer,
        validateEmail,
        getQuizAnswerByEmail,
        getQuizAnswerByQuizId,
        getAllQuizAnswer,
        sendEmail,
        updateDataFacebook,
    };
})();
