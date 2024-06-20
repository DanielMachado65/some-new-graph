"use strict";

const { MIndication } = require("mongoose").models;

const createIndication = async ({
  client,
  indicator,
  indicateTemplate,
  payment,
}) => {
  try {
    await MIndication.createCollection();
    await MIndication.create([
      {
        client,
        indicator,
        indicateTemplate,
        payment,
      },
    ]);
  } catch (_error) {
    return { error: "CREATE_MODEL_INDICATION_ERROR", data: _error };
  }
  return { result: "ok" };
};

const updateIndication = async (
  indicationId,
  { client, indicator, indicateTemplate, payment }
) => {
  let indicationResponse = null;
  try {
    await MIndication.createCollection();
    const updatedAt = new Date();
    indicationResponse = await MIndication.findOneAndUpdate(
      {
        _id: indicationId,
      },
      {
        $set: {
          client,
          indicator,
          indicateTemplate,
          payment,
          updatedAt,
        },
      },
      {
        upsert: true,
      }
    );
  } catch (_error) {
    return { error: "UPDATE_MODEL_INDICATION_ERROR", data: _error };
  }
  return { result: indicationResponse };
};

const getIndicationById = async (indicationId) => {
  try {
    const filter = { _id: indicationId };
    const response = await filterByCustomId(filter);
    return { result: response };
  } catch (_error) {
    return { error: "GET_INDICATION_BY_ID_ERROR", data: _error };
  }
};

const getIndicationByIndicatorId = async (indicatorId) => {
  try {
    const filter = { indicator: indicatorId };
    const response = await filterByCustomId(filter);
    return { result: response };
  } catch (_error) {
    return {
      error: "GET_INDICATION_BY_INDICATOR_ID_ERROR",
      data: _error,
    };
  }
};

const getIndicationByClientId = async (clientId) => {
  try {
    const filter = { client: clientId };
    const response = await filterByCustomId(filter);
    return { result: response };
  } catch (_error) {
    return { error: "GET_INDICATION_BY_CLIENT_ID_ERROR", data: _error };
  }
};

const getIndicationByIndicateTemplateId = async (indicateTemplateId) => {
  try {
    const filter = { indicateTemplate: indicateTemplateId };
    const response = await filterByCustomId(filter);
    return { result: response };
  } catch (_error) {
    return {
      error: "GET_INDICATION_BY_INDICATE_TEMPLATE_ID_ERROR",
      data: _error,
    };
  }
};

const getIndicationByPaymentId = async (paymentId) => {
  try {
    const filter = { payment: paymentId };
    const response = await filterByCustomId(filter);
    return { result: response };
  } catch (_error) {
    return {
      error: "GET_INDICATION_BY_PAYMENT_ID_ERROR",
      data: _error,
    };
  }
};

const getAllIndications = async () => {
  try {
    const filter = {};
    const response = await filterByCustomId(filter);
    return { result: response };
  } catch (_error) {
    return { error: "GET_ALL_INDICATION_ERROR", data: _error };
  }
};

const filterByCustomId = async (filter) =>
  await MIndication.find(filter)
    .populate("client", "name email")
    .populate("indicator", "name email")
    .populate("indicateTemplate")
    .populate("payment")
    .exec();

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
