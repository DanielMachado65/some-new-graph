"use strict";

const { isDevEnv } = require("../../config/config");

const URL_CALLBACK =
  "https://api.olhonocarro.com.br/api/notification/callback2/payment";

const api_keys = {
  account_id: "CF6FF08D6979476EB725493737A19D58",
  production: "8b83fe0ab6bfe3f1b1236110ae9322b6",
  test: "78379aaef3e257c937a64af99e2a99c5",
};

const apiKey = isDevEnv ? api_keys.test : api_keys.production;

const request = require("request-promise");

const BASE_URL = "https://api.iugu.com/v1/";

const authBasicEncoded = () => {
  return "Basic " + `${Buffer.from(apiKey + ": ").toString("base64")}`;
};

const getInvoice = async (id) => {
  return request({
    method: "GET",
    url: BASE_URL + "invoices/" + id,
    json: true,
    timeout: 10000,
    headers: {
      Authorization: authBasicEncoded(),
    },
  });
};

const createInvoice = async (data) => {
  return request({
    method: "POST",
    uri: BASE_URL + "invoices",
    body: {
      keep_dunning: true,
      email: data.costumer.email,
      due_date: data.expireAt,
      ensure_workday_due_date: true,
      items: data.items,
      notification_url: URL_CALLBACK,
      ignore_canceled_email: true,
      ignore_due_email: true,
      payable_with: data.type, //credit_card, bank_slip, pix
      payer: {
        cpf_cnpj: data.costumer.document,
        name: data.costumer.name,
        phone_prefix: data.costumer.phonePrefix,
        phone: data.costumer.phone,
        email: data.costumer.email,
        address: {
          street: data.costumer.address.street,
          number: data.costumer.address.number,
          district: data.costumer.address.neighborhood,
          city: data.costumer.address.city,
          state: data.costumer.address.state,
          zip_code: data.costumer.address.zipcode,
          complement: data.costumer.address.complement,
        },
      },
      order_id: data.payment,
    },
    json: true,
    timeout: 60000,
    headers: {
      Authorization: authBasicEncoded(),
    },
  });
};

//              * API DE COBRANÇA DIRETA *
const directCharge = async (data) => {
  return request({
    method: "POST",
    uri: "https://api.iugu.com/v1/charge",
    body: {
      token: data.token,
      email: data.costumer.email,
      months: data.months,
      items: data.items,
      keep_dunning: true,
      discount_cents: data.discount_cents,
      order_id: data.payment,
    },
    json: true,
    headers: {
      Authorization: authBasicEncoded(),
    },
  });
};

const createClient = async (client) => {
  return request({
    method: "POST",
    uri: "https://api.iugu.com/v1/customers",
    body: client,
    json: true,
    headers: {
      Authorization: authBasicEncoded(),
    },
  });
};

const updateClient = async (id, clientData) => {
  const opts = {
    method: "PUT",
    uri: `https://api.iugu.com/v1/customers/${id}`,
    body: clientData,
    json: true,
    headers: {
      Authorization: authBasicEncoded(),
    },
  };
  return request(opts);
};

const removeClient = async (id) => {
  const opts = {
    method: "DELETE",
    uri: `https://api.iugu.com/v1/customers/${id}`,
    json: true,
    headers: {
      Authorization: authBasicEncoded(),
    },
  };
  return request(opts);
};

const getClient = async (id) => {
  const opts = {
    method: "GET",
    uri: `https://api.iugu.com/v1/customers/${id}`,
    json: true,
    headers: {
      Authorization: authBasicEncoded(),
    },
  };
  return request(opts);
};

const getClients = async () => {
  const opts = {
    method: "GET",
    uri: `https://api.iugu.com/v1/customers`,
    json: true,
    headers: {
      Authorization: authBasicEncoded(),
    },
  };
  return request(opts);
};

const createPlan = async (plan) => {
  const opts = {
    method: "POST",
    uri: `https://api.iugu.com/v1/plans`,
    body: plan,
    json: true,
    headers: {
      Authorization: authBasicEncoded(),
    },
  };
  return request(opts);
};

const updatePlan = async (id, plan) => {
  const opts = {
    method: "PUT",
    uri: `https://api.iugu.com/v1/plans/${id}`,
    body: plan,
    json: true,
    headers: {
      Authorization: authBasicEncoded(),
    },
  };
  return request(opts);
};

const deletePlan = async (id) => {
  const opts = {
    method: "DELETE",
    uri: `https://api.iugu.com/v1/plans/${id}`,
    json: true,
    headers: {
      Authorization: authBasicEncoded(),
    },
  };
  return request(opts);
};

const getPlan = async (id) => {
  const opts = {
    method: "GET",
    uri: `https://api.iugu.com/v1/plans/${id}`,
    json: true,
    headers: {
      Authorization: authBasicEncoded(),
    },
  };
  return request(opts);
};

const getPlanByIdentifier = async (id) => {
  const opts = {
    method: "GET",
    uri: `https://api.iugu.com/v1/plans/identifier/${id}`,
    json: true,
    headers: {
      Authorization: authBasicEncoded(),
    },
  };
  return request(opts);
};

const getPlans = async () => {
  const opts = {
    method: "GET",
    uri: `https://api.iugu.com/v1/plans`,
    json: true,
    headers: {
      Authorization: authBasicEncoded(),
    },
  };
  return request(opts);
};

const createSubscritpion = async (subscription) => {
  const opts = {
    method: "POST",
    uri: `https://api.iugu.com/v1/subscriptions`,
    body: subscription,
    json: true,
    headers: {
      Authorization: authBasicEncoded(),
    },
  };
  return request(opts);
};

const activateSubscription = async (id) => {
  const opts = {
    method: "POST",
    uri: `https://api.iugu.com/v1/subscriptions/${id}/activate`,
    json: true,
    headers: {
      Authorization: authBasicEncoded(),
    },
  };
  return request(opts);
};

const deactivateSubscritpion = async (id) => {
  const opts = {
    method: "POST",
    uri: `https://api.iugu.com/v1/subscriptions/${id}/suspend`,
    json: true,
    headers: {
      Authorization: authBasicEncoded(),
    },
  };
  return request(opts);
};

const updateSubscritpion = async (id, subscription) => {
  const opts = {
    method: "PUT",
    uri: `https://api.iugu.com/v1/subscriptions/${id}`,
    body: subscription,
    json: true,
    headers: {
      Authorization: authBasicEncoded(),
    },
  };
  return request(opts);
};

const addCreditsToSubscritpion = async (id, quantity) => {
  const opts = {
    method: "PUT",
    uri: `https://api.iugu.com/v1/subscriptions/${id}/add_credits`,
    body: {
      quantity,
    },
    json: true,
    headers: {
      Authorization: authBasicEncoded(),
    },
  };
  return request(opts);
};

const removeCreditsToSubscritpion = async (id, quantity) => {
  const opts = {
    method: "PUT",
    uri: `https://api.iugu.com/v1/subscriptions/${id}/remove_credits`,
    body: {
      quantity,
    },
    json: true,
    headers: {
      Authorization: authBasicEncoded(),
    },
  };
  return request(opts);
};

const deleteSubscritpion = async (id) => {
  const opts = {
    method: "DELETE",
    uri: `https://api.iugu.com/v1/subscriptions/${id}`,
    json: true,
    headers: {
      Authorization: authBasicEncoded(),
    },
  };
  return request(opts);
};

const getSubscritpion = async (id) => {
  const opts = {
    method: "GET",
    uri: `https://api.iugu.com/v1/subscriptions/${id}`,
    json: true,
    headers: {
      Authorization: authBasicEncoded(),
    },
  };
  return request(opts);
};

const getSubscritpions = async () => {
  const opts = {
    method: "GET",
    uri: `https://api.iugu.com/v1/subscriptions`,
    json: true,
    headers: {
      Authorization: authBasicEncoded(),
    },
  };
  return request(opts);
};

const createPaymentMethod = async (customerId, data) => {
  const opts = {
    method: "POST",
    uri: `https://api.iugu.com/v1/customers/${customerId}/payment_methods`,
    body: data,
    json: true,
    headers: {
      Authorization: authBasicEncoded(),
    },
  };
  return request(opts);
};

module.exports = {
  getInvoice,
  createInvoice,
  directCharge,
  /**
   * User Interface
   */
  createClient,
  updateClient,
  removeClient,
  getClient,
  getClients,
  /**
   * Plan Interface
   */
  createPlan,
  updatePlan,
  deletePlan,
  getPlan,
  getPlanByIdentifier,
  getPlans,
  /**
   * Subscription Interface
   */
  createSubscritpion,
  activateSubscription,
  deactivateSubscritpion,
  updateSubscritpion,
  addCreditsToSubscritpion,
  removeCreditsToSubscritpion,
  deleteSubscritpion,
  getSubscritpion,
  getSubscritpions,
  /**
   * Payment Method Interface
   */
  createPaymentMethod,
};
