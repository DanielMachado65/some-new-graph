'use strict';

const IndicationModule = require('../../../domain/indicate/indicationModule');
const IndicationHelper = require('../../../infrastructure/helpers/indicate/indicationHelper');

const createIndication = async (data) => {
    try {
        const indicateValidationResponse = await IndicationHelper.validateAllData(
            data,
        );
        if (indicateValidationResponse.error)
            return IndicationHelper.indicationErrorHandler(
                indicateValidationResponse,
            );

        const indicateResponse = await IndicationModule.createIndication(data);
        if (indicateResponse.error)
            return IndicationHelper.indicationErrorHandler(indicateResponse);

        return { result: 'ok' };
    } catch (error) {
        return { error: 'CREATE_INDICATION_ERROR', data: error };
    }
};

const updateIndication = async (indicationId, data) => {
    try {
        const indicateValidationResponse = await IndicationHelper.validateAllData(
            data,
        );
        if (indicateValidationResponse.error)
            return IndicationHelper.indicationErrorHandler(
                indicateValidationResponse,
            );

        const indicateResponse = await IndicationModule.updateIndication(
            indicationId,
            data,
        );
        if (indicateResponse.error)
            return IndicationHelper.indicationErrorHandler(indicateResponse);

        return { result: indicateResponse };
    } catch (error) {
        return { error: 'UPDATE_INDICATION_ERROR', data: error };
    }
};

const getIndicationById = async (indicationId) => {
    const response = await IndicationModule.getIndicationById(indicationId);
    if (response.error)
        return IndicationHelper.indicationErrorHandler(response);
    return response;
};

const getIndicationByIndicatorId = async (indicatorId) => {
    const response = await IndicationModule.getIndicationByIndicatorId(
        indicatorId,
    );
    if (response.error)
        return IndicationHelper.indicationErrorHandler(response);
    return response;
};

const getIndicationByClientId = async (clientId) => {
    const response = await IndicationModule.getIndicationByClientId(clientId);
    if (response.error)
        return IndicationHelper.indicationErrorHandler(response);
    return response;
};

const getIndicationByIndicateTemplateId = async (indicateTemplateId) => {
    const response = await IndicationModule.getIndicationByIndicateTemplateId(
        indicateTemplateId,
    );
    if (response.error)
        return IndicationHelper.indicationErrorHandler(response);
    return response;
};

const getIndicationByPaymentId = async (paymentId) => {
    const response = await IndicationModule.getIndicationByPaymentId(paymentId);
    if (response.error)
        return IndicationHelper.indicationErrorHandler(response);
    return response;
};

const getAllIndications = async () => {
    const response = await IndicationModule.getAllIndications();
    if (response.error)
        return IndicationHelper.indicationErrorHandler(response);
    return response;
};

module.exports = {
    createIndication,
    updateIndication,
    getIndicationById,
    getIndicationByIndicatorId,
    getIndicationByClientId,
    getIndicationByIndicateTemplateId,
    getIndicationByPaymentId,
    getAllIndications,
};
