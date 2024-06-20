"use strict";

const iuguService = require("../../../infrastructure/services/iugu/iugu.service");

const createPaymentMethod = async (user, data, customerId) => {
  const { token, description } = data;
  return iuguService.createPaymentMethod(customerId, { token, description });
};

const createInvoice = async (data) => {
  const response = await iuguService.createInvoice(data);
};

module.exports = {
  createPaymentMethod,
};
