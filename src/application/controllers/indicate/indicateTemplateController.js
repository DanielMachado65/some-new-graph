'use strict';

const indicateTemplateModule = require('../../../domain/indicate/indicateTemplateModule');
const IndicateTemplateHelper = require('../../../infrastructure/helpers/indicate/indicateTemplateHelper');

const createIndicateTemplate = async (userId, data) => {
    try {
        const indicateValidationResponse = await IndicateTemplateHelper.validateAllData(
            data,
        );
        if (indicateValidationResponse.error)
            return IndicateTemplateHelper.indicateErrorHandler(
                indicateValidationResponse,
            );

        const deactivatedAllTermsResponse = await indicateTemplateModule.deactivateAllIndicateTemplate();
        if (deactivatedAllTermsResponse.error)
            return IndicateTemplateHelper.indicateErrorHandler(
                deactivatedAllTermsResponse,
            );

        const lastVersionResponse = await indicateTemplateModule.getLastVersionIndicateTemplate();
        if (lastVersionResponse.error)
            return IndicateTemplateHelper.indicateErrorHandler(
                lastVersionResponse,
            );

        const indicateDataToCreateResponse = await IndicateTemplateHelper.getObjectToCreate(
            data,
            lastVersionResponse.result,
        );
        if (indicateDataToCreateResponse.error)
            return IndicateTemplateHelper.indicateErrorHandler(
                indicateDataToCreateResponse,
            );

        const indicateResponse = await indicateTemplateModule.createIndicateTemplate(
            userId,
            indicateDataToCreateResponse.result,
        );
        if (indicateResponse.error)
            return IndicateTemplateHelper.indicateErrorHandler(
                indicateResponse,
            );

        return { result: 'ok' };
    } catch (error) {
        return { error: 'CREATE_INDICATE_TEMPLATE_ERROR', data: error };
    }
};

const getAllIndicateTemplate = async () => {
    const response = await indicateTemplateModule.getAllIndicateTemplate();
    if (response.error)
        return IndicateTemplateHelper.indicateErrorHandler(response);
    return response;
};

const getIndicateTemplateById = async (indicateTemplateId) => {
    const response = await indicateTemplateModule.getIndicateTemplateById(
        indicateTemplateId,
    );
    if (response.error)
        return IndicateTemplateHelper.indicateErrorHandler(response);
    return response;
};

const getIndicateTemplateByUserId = async (userId) => {
    const response = await indicateTemplateModule.getIndicateTemplateByCreator(
        userId,
    );
    if (response.error)
        return IndicateTemplateHelper.indicateErrorHandler(response);
    return response;
};

const getIndicateTemplateActivate = async () => {
    const response = await indicateTemplateModule.getIndicateTemplateActivate();
    if (response.error)
        return IndicateTemplateHelper.indicateErrorHandler(response);
    return response;
};

module.exports = {
    createIndicateTemplate,
    getAllIndicateTemplate,
    getIndicateTemplateById,
    getIndicateTemplateByUserId,
    getIndicateTemplateActivate,
};
