"use strict";

const {
  CreditCard,
  Client,
  Address,
  Charge,
  Invoice,
  Item,
  Token,
  PAYMENT_METHODS,
} = require("../../../../../infrastructure/services/iugu");

const PaymentFactory = require("./payment.factory");

function _getCustomerId(user, customer) {
  return (
    (user.externalControls &&
      user.externalControls.iugu &&
      user.externalControls.iugu.id) ||
    (customer && customer.id)
  );
}

function _getBillingEmailFromUser(user) {
  return (
    (user &&
      user.generalData &&
      user.generalData.billingOwner &&
      user.generalData.billingOwner.email) ||
    user.email
  );
}

const createClient = async (user) => {
  const userAddress = user.generalData.address;
  const address = PaymentFactory.AddressFactory(userAddress);
  const client = PaymentFactory.ClientFactory(address, user);
  return client.create();
};

const updateClient = async (user, customer) => {
  const customerId = _getCustomerId(user, customer);
  const userAddress = user.generalData.address;
  Client.ValidateCustomerId(customerId);
  const address = PaymentFactory.AddressFactory(userAddress);
  const client = PaymentFactory.ClientFactory(address, user);
  await client.update();
};

const removeClient = async (user, customer) => {
  const customerId = _getCustomerId(user, customer);
  Client.ValidateCustomerId(customerId);
  const client = PaymentFactory.ClientFactory(user);
  await client.remove();
};

const getClient = async (user) => {
  try {
    const customerId = _getCustomerId(user);
    Client.ValidateCustomerId(customerId);
    const client = new Client();
    return await client.get(customerId);
  } catch (e) {
    return null;
  }
};

const listClients = async () => {
  try {
    const client = new Client();
    return await client.list();
  } catch (e) {
    return null;
  }
};

const createInvoice = async (
  user,
  dueDate,
  itemsDto,
  payableWith,
  orderId,
  customer
) => {
  const userAddress = user.generalData.address;
  const email = _getBillingEmailFromUser(user);
  const customerId = _getCustomerId(user, customer);
  const address = PaymentFactory.AddressFactory(userAddress);
  const client = PaymentFactory.ClientFactory(address, user);
  const items = PaymentFactory.ItemsFactory(itemsDto);
  const invoice = PaymentFactory.InvoiceFactory(
    customerId,
    dueDate,
    email,
    payableWith,
    orderId,
    items,
    client
  );
  return invoice.create();
};

module.exports = {
  createClient,
  updateClient,
  removeClient,
  getClient,
  listClients,
  createInvoice,
  PAYMENT_METHODS,
};
