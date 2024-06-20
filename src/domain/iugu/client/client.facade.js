"use strict";

const iuguService = require("../../../infrastructure/services/iugu/iugu.service");

const clientDataFactory = (user) => {
  let cc_emails =
    process.env.NODE_ENV === "production"
      ? `${
          user.generalData &&
          user.generalData.billingOwner &&
          user.generalData.billingOwner.email
            ? user.generalData.billingOwner.email + ","
            : ""
        }contato@olhonocarro.com.br`
      : null;
  return {
    email: user.email,
    name: (user.company && user.company.socialName) || user.name,
    cpf_cnpj: (user.company && user.company.cnpj) || user.cpf,
    cc_emails,
    zip_code: "" + user.generalData.address.zipcode,
    number: "" + user.generalData.address.number,
    street: "" + user.generalData.address.street,
    city: "" + user.generalData.address.city,
    state: "" + user.generalData.address.state,
    district: "" + user.generalData.address.neighborhood,
    complement: "" + user.generalData.address.complement,
    custom_variables: [
      {
        name: "internalId",
        value: user._id.toString(),
      },
    ],
    default_payment_method_id: user.defaultPaymentMethodId || null,
  };
};

const createClient = async (user) => {
  const userDto = clientDataFactory(user);
  const { id } = await iuguService.createClient(userDto);
  return id;
};

const getClientById = async (userId) => {
  return iuguService.getClient(userId);
};

const updateClient = async (clientId, user) => {
  const userDto = await clientDataFactory(user);
  await iuguService.updateClient(clientId, userDto);
};

const getClientId = async (user) => {
  const clientId =
    user.externalControls &&
    user.externalControls.iugu &&
    user.externalControls.iugu.id;
  if (clientId) {
    return clientId;
  }
  return createClient(user);
};

module.exports = {
  createClient,
  getClientById,
  updateClient,
  clientDataFactory,
  getClientId,
};
