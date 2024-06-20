"use strict";

const clientFacade = require("../client/client.facade");
const paymentFacade = require("./payment.facade");

const createPaymentMethod = async (user, data) => {
  let response = null;
  const clientId = await clientFacade.getClientId(user);
  if (!clientId) {
    return response;
  }
  try {
    response = await paymentFacade.createPaymentMethod(
      clientId,
      data,
      clientId
    );
  } catch (error) {
    return response;
  }
  return response;
};

module.exports = {
  createPaymentMethod,
};
