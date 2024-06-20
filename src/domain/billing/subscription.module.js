"use strict";
const userFacade = require("../user/user/user.facade");
const clientFacade = require("../iugu/client/client.facade");
const billingFacade = require("../../domain/billing/billing/billing.facade");
const subscriptionFacade = require("./subscription.facade");
let responseData = {
  error: null,
  data: null,
};

function checkExistsData(dataForCheck) {
  if (!dataForCheck) {
    responseData.error = `The ${dataForCheck} doesn't exist or not possible to get data of iugu`;
    return responseData;
  }
}
function setResponseData(data, responseData) {
  responseData.data = data;
  return responseData;
}

const createSubscription = async (creatorId, data) => {
  try {
    const user = await userFacade.getById(creatorId);
    checkExistsData(user);

    const clientId = await clientFacade.getClientId(user);
    checkExistsData(clientId);

    const responseFromTryCreate = await subscriptionFacade.tryCreateSubscription(
      clientId,
      creatorId,
      data
    );
    checkExistsData(responseFromTryCreate);

    //@TODO CHECK IT LATER
    const saveSubscriptionOnBilling = await billingFacade.updateOne(
      responseFromTryCreate.match,
      {
        $push: { subscriptions: responseFromTryCreate.objectToSave },
      }
    );
    checkExistsData(saveSubscriptionOnBilling);

    responseData = setResponseData(
      responseFromTryCreate.subscriptionObject,
      responseData
    );
  } catch (error) {
    responseData.error = error.message;
  }

  return responseData;
};

const activateSubscription = async (subscriptionId) => {
  try {
    const externalId = await subscriptionFacade.getExternalIdSubscription(
      subscriptionId
    );
    checkExistsData(externalId);

    const response = await subscriptionFacade.activateSubscription(externalId);
    checkExistsData(response);

    const statusToSet = subscriptionFacade.subscriptionStatusEnum(2);
    const updateOnDatabase = await subscriptionFacade.setActivatedSignatureOnDatabase(
      subscriptionId,
      statusToSet
    );
    checkExistsData(updateOnDatabase);

    responseData = setResponseData(
      { msg: "Assinatura ativada com sucesso" },
      responseData
    );
  } catch (error) {
    responseData.error = error.message;
  }

  return responseData;
};

const deactivateSubscription = async (subscriptionId) => {
  try {
    const externalId = await subscriptionFacade.getExternalIdSubscription(
      subscriptionId
    );
    checkExistsData(externalId);

    const response = await subscriptionFacade.deactivateSubscritpion(
      externalId
    );
    checkExistsData(response);

    const statusToSet = subscriptionFacade.subscriptionStatusEnum(3);
    const updateOnDatabase = await subscriptionFacade.setDeactivatedSignatureOnDatabase(
      subscriptionId,
      statusToSet
    );
    checkExistsData(updateOnDatabase);

    responseData = setResponseData(
      { msg: "Assinatura desativada com sucesso" },
      responseData
    );
  } catch (error) {
    responseData.error = error.message;
  }
  return responseData;
};

const updateSubscription = async (subscriptionId, data) => {
  try {
    let subscription = await subscriptionFacade.getBySubscriptionId(
      subscriptionId
    );
    checkExistsData(subscription);

    const externalId = await subscriptionFacade.getExternalIdSubscription(
      subscriptionId
    );
    checkExistsData(externalId);

    const updateOnIugu = await subscriptionFacade.updateSubscriptionOnIugu(
      externalId,
      data
    );
    checkExistsData(updateOnIugu);

    const statusToSet = subscriptionFacade.subscriptionStatusEnum(data.status);
    const updateOnDatabase = await subscriptionFacade.updateSubscriptionOnDatabase(
      subscriptionId,
      data,
      statusToSet
    );
    checkExistsData(updateOnDatabase);

    responseData = setResponseData(updateOnDatabase, responseData);
  } catch (error) {
    responseData.error = error.message;
  }
  return responseData;
};

const deleteSubscriptionById = async (subscriptionId) => {
  try {
    const externalId = await subscriptionFacade.getExternalIdSubscription(
      subscriptionId
    );
    checkExistsData(externalId);

    const response = await subscriptionFacade.deleteSubscritpion(externalId);
    checkExistsData(response);

    const deleteOnDatabase = subscriptionFacade.deleteOneById(subscriptionId);
    checkExistsData(deleteOnDatabase);

    responseData = setResponseData(deleteOnDatabase, responseData);
  } catch (error) {
    responseData.error = error;
  }
  return responseData;
};

const getSubscriptionByCreator = async (creatorId) => {
  return await subscriptionFacade.searchByCreator(creatorId);
};

const getSubscriptionById = async (SubscriptionId) => {
  return await subscriptionFacade.searchBySubscriptionId(SubscriptionId);
};

const getAllSubscriptions = async () => {
  return await subscriptionFacade.getAllSubscriptions();
};

const getExternalIdSubscription = async (subscriptionId) => {
  try {
    let subscription = await subscriptionFacade.getBySubscriptionId(
      subscriptionId
    );
    checkExistsData(subscription);
    responseData = setResponseData(subscription.externalId, responseData);
  } catch (error) {
    responseData.error = error;
  }
  return responseData;
};

const getAllSubscriptionsPendingByPlanIds = async (planIds) => {
  return await subscriptionFacade.getAllSubscriptionsPendingByPlanIds(planIds);
};

const insertPaymentIntoSubscription = async function (
  paymentId,
  subscriptionId
) {
  try {
    const subscription = await subscriptionFacade.getBySubscriptionId(
      subscriptionId
    );
    const date = new Date();
    checkExistsData(subscription);

    const savePayment = await subscriptionFacade.saveInsertedPayment(
      subscription
    );
    checkExistsData(savePayment);
    //@TODO CHECK IT LATER

    responseData = setResponseData(savePayment, responseData);
  } catch (error) {
    responseData.error = error;
  }
  return responseData;
};

module.exports = {
  createSubscription,
  getSubscriptionByCreator,
  getSubscriptionById,
  getAllSubscriptions,
  activateSubscription,
  deactivateSubscription,
  updateSubscription,
  deleteSubscriptionById,
  getExternalIdSubscription,
  getAllSubscriptionsPendingByPlanIds,
  insertPaymentIntoSubscription,
};
