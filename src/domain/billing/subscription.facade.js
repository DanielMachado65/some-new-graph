"use strict";
const {
  SubscriptionRepository,
} = require("./components/subscription.repository");
const subscriptionRepository = new SubscriptionRepository();
const iuguService = require("../../infrastructure/services/iugu");
const subscriptionService = new iuguService.Subscription();
function checkExistsData(dataForCheck) {
  if (!dataForCheck) {
    responseData.error = `The ${dataForCheck} doesn't exist or not possible to get data of iugu`;
    return responseData;
  }
}

async function createSubscriptionOnDatabase(creatorId, data, statusToSet) {
  return await subscriptionRepository.createSubscriptionOnDatabase(
    creatorId,
    data,
    statusToSet
  );
}

async function tryCreateSubscription(clientId, creatorId, data) {
  await subscriptionRepository.createCollection();
  const response = await createSubscriptionOnIugu(clientId, data);
  checkExistsData(response);
  const externalId = response.id;
  const statusToSet = iuguService.Subscription.subscriptionStatusEnum(1);
  const subscriptionObject = await subscriptionFacade.createSubscriptionOnDatabase(
    creatorId,
    data,
    statusToSet
  );
  checkExistsData(subscriptionObject);
  const match = { _id: user.billing._id };
  const objectToSave = { subscription: subscriptionObject._id };
  const responseData = setResponseData(
    { subscriptionObject, objectToSave, match },
    responseData
  );
  return responseData;
}
async function createSubscriptionOnIugu(clientId, data) {
  return await subscriptionService.createSubscription({
    customer_id: clientId,
    plan_identifier: data.plan,
    expires_at: data.expireAt,
    payable_with: data.payableWith,
    ignore_canceled_email: true,
    ignore_due_email: true,
  });
}

async function activateSubscription(externalId) {
  return await subscriptionService.activateSubscription(externalId);
}

async function getExternalIdSubscription(subscriptionId) {
  const subscriptionChecked = await subscriptionRepository.searchBySubscriptionId(
    subscriptionId
  );
  return subscriptionChecked.externalId;
}

async function getBySubscriptionId(subscriptionId) {
  return await subscriptionRepository.searchBySubscriptionId(subscriptionId);
}

async function setActivatedSignatureOnDatabase(subscriptionId, statusToSet) {
  return await subscriptionRepository.setActivatedSignatureOnDatabase(
    subscriptionId,
    statusToSet
  );
}

async function setDeactivatedSignatureOnDatabase(subscriptionId, statusToSet) {
  return await subscriptionRepository.setDeactivatedSignatureOnDatabase(
    subscriptionId,
    statusToSet
  );
}

async function updateSubscriptionOnDatabase(subscriptionId, data, statusToSet) {
  return await subscriptionRepository.updateSubscriptionOnDatabase(
    subscriptionId,
    data,
    statusToSet
  );
}

async function deleteOneById(id) {
  return await subscriptionRepository.deleteOne({ _id: subscriptionId });
}

async function saveInsertedPayment(subscription) {
  subscription.payments = subscription.payments || [];
  subscription.payments.push({
    payment: paymentId,
    refMonth: date.getMonth(),
    refYear: date.getFullYear(),
    renewedAt: date,
  });
  await subscriptionRepository.save(subscription);
}

async function searchByCreator(creatorId) {
  return await subscriptionRepository.searchByCreator(creatorId);
}

async function searchBySubscriptionId(SubscriptionId) {
  return await subscriptionRepository.searchBySubscriptionId(SubscriptionId);
}

async function getAllSubscriptions() {
  return await subscriptionRepository.getAllSubscriptions();
}

async function subscriptionStatusEnum(cod) {
  return await subscriptionRepository.subscriptionStatusEnum(cod);
}

async function getAllSubscriptionsPendingByPlanIds(planIds) {
  return await subscriptionRepository.find({
    plan: { $in: planIds },
    status: iuguService.Subscription.Status.AGUARDANDO,
  });
}

async function deactivateSubscritpion(externalId) {
  return await subscriptionService.deactivateSubscription(externalId);
}

async function updateSubscriptionOnIugu(externalId, data) {
  return await subscriptionService.updateSubscription(externalId, {
    plan_identifier: data.plan,
    expires_at: data.expireAt,
    payable_with: data.payableWith,
    ignore_canceled_email: true,
    ignore_due_email: true,
  });
}

async function deleteSubscritpion(externalId) {
  return await subscriptionService.deleteSubscritpion(externalId);
}

module.exports = {
  createSubscriptionOnDatabase,
  getExternalIdSubscription,
  setActivatedSignatureOnDatabase,
  getBySubscriptionId,
  setDeactivatedSignatureOnDatabase,
  updateSubscriptionOnDatabase,
  deleteOneById,
  saveInsertedPayment,
  searchByCreator,
  searchBySubscriptionId,
  getAllSubscriptions,
  getAllSubscriptionsPendingByPlanIds,
  tryCreateSubscription,
  activateSubscription,
  subscriptionStatusEnum,
  deactivateSubscritpion,
  updateSubscriptionOnIugu,
  deleteSubscritpion,
};
