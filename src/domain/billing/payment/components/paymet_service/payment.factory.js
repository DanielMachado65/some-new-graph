"use strict";

const {
  CreditCard,
  Client,
  Address,
  Charge,
  Invoice,
  Item,
  Token,
} = require("../../../../../infrastructure/services/iugu");

function _getUserDocument(user) {
  return (user.company && user.company.cnpj) || user.cpf;
}

function _getUserPhoneNumber(user) {
  const phone = user.generalData.phoneNumber1 || user.generalData.phoneNumber2;
  return phone ? [phone.substring(0, 2), phone.substring(2, phone.length)] : [];
}

function _getCustomVariables(user) {
  return [{ name: "userId", value: user._id.toString() }];
}

function AddressFactory(userAddress) {
  const {
    city,
    complement,
    neighborhood,
    number,
    state,
    zipcode,
    street,
  } = userAddress;
  const hasAllInfo =
    city && complement && neighborhood && number && state && zipcode && street;
  return (
    hasAllInfo &&
    new Address()
      .setCity(city)
      .setComplement(complement)
      .setDistrict(neighborhood)
      .setNumber(number)
      .setState(state)
      .setZipCode(zipcode)
      .setStreet(street)
  );
}

function ClientFactory(address, user) {
  const document = _getUserDocument(user);
  const [phonePrefix, phone] = _getUserPhoneNumber(user);
  const customVariables = _getCustomVariables(user);
  const client = new Client();
  client
    .setDocument(document)
    .setEmail(user.email)
    .setName(user.name)
    .setPhone(phone)
    .setPhonePrefix(phonePrefix)
    .setCustomVariables(customVariables);
  return address ? client.setAddress(address) : client;
}

function ItemsFactory(itemsDto) {
  return itemsDto.map(
    (item) => new Item(item.name, item.amount, Math.trunc(item.realValue * 100))
  );
}

function InvoiceFactory(
  customerId,
  dueDate,
  email,
  payableWith,
  orderId,
  items,
  client
) {
  const invoice = new Invoice();
  invoice
    .setCustomerId(customerId)
    .setDueDate(dueDate)
    .setEmail(email)
    .setPayableWith(payableWith)
    .setOrderId(orderId)
    .setItems(items)
    .setPayer(client);
  return invoice;
}

module.exports = {
  AddressFactory,
  ClientFactory,
  ItemsFactory,
  InvoiceFactory,
};
