"use strict";

const { InvoiceService, NFe } = require("@diegomoura637/enotas-service");
const paymentFacade = require("../billing/payment/payment.facade");
const userFacade = require("../user/user/user.facade");
const nfeFacade = require("../nfes/nfe.facade");

const {
  weakValidation,
} = require("../../infrastructure/utils/weakValidator.util");

const HttpCodes = require("../../infrastructure/enumerators/httpCode.enum");

const Emitter = require("events");
class NfeEmitter extends Emitter {}
const nfeEmitter = new NfeEmitter();

const EVENTS = {
  CREATE_NFE: "create",
  UPDATE_NFE: "update",
};

function loadEmitterInterface() {
  nfeEmitter.on(EVENTS.CREATE_NFE, createNfe);
  nfeEmitter.on(EVENTS.UPDATE_NFE, updateNfe);
}

async function getUser(billingId) {
  const user = await userFacade.getByBilling(billingId);
  weakValidation(user);
  return user;
}

async function getPayment(paymentId) {
  const payment = await paymentFacade.getPaymentById(paymentId);
  weakValidation(payment);
  return payment;
}

async function updatePayment(paymentId, nfeId) {
  await paymentFacade.update({ _id: paymentId }, { nfe: nfeId });
}

function validateUser(user) {
  weakValidation(user, "user can't be null or undefined");
  weakValidation(user.name, "user.name can't be null or undefined");
  weakValidation(
    user.generalData,
    "user.generalData can't be null or undefined"
  );
  weakValidation(
    user.generalData.address,
    "user.generalData can't be null or undefined"
  );
}

function nfeDataFactory(value, description, user, paymentId) {
  const nfe = new NFe();
  nfe
    .setClientName(user.name)
    .setClientEmail(user.email)
    .setClientCpfCnpj(user.cpf)
    .setClientAddressUf(user.generalData.address.state)
    .setClientAddressCity(user.generalData.address.city)
    .setClientAddressPlace(user.generalData.address.street)
    .setClientAddressNumber(user.generalData.address.number)
    .setClientAddressComplement(user.generalData.address.complement)
    .setClientAddressNeighborhood(user.generalData.address.neighborhood)
    .setClientAddressCep(user.generalData.address.zipcode)
    .setNfe_external_id(paymentId)
    .setDescription(description)
    .setTotalValue(value)
    .setPersonType("F")
    .setClientAddressCountry("Brasil")
    .setCofins(0)
    .setCsll(0)
    .setInss(0)
    .setIr(0)
    .setPis(0)
    .setIisAliquota(0)
    .setIssRetido(false)
    .setSendByEmail(false)
    .setEmissionAmbient("Producao"); //Homologacao

  return nfe.getDtoToCreateNfeOnGateway();
}

function createNfeDtoToDataBase(
  externalNfeId,
  description,
  value,
  xmlLink,
  pdfLink
) {
  return {
    status: NFe.Status.HOPE_FOR_AUTHORIZATION,
    externalNfeId,
    description,
    value,
    xmlLink,
    pdfLink,
  };
}

function validateResponseWasSuccess(response) {
  if (response && response.status !== HttpCodes.SUCCESS) {
    const errorMessage =
      response.data && response.data[0] && response.data[0].mensagem;
    throw new Error(
      "Error to generate nfe on gateway. Error => %s",
      errorMessage
    );
  }
}

async function updateNfe() {
  throw new Error("Not implemented yet");
}

async function createNfe(paymentId) {
  try {
    console.log(`Nova Emissão de nota iniciada: ${paymentId}`);
    const invoiceService = new InvoiceService();
    const payment = await getPayment(paymentId);
    weakValidation(payment);
    const user = await getUser(payment.billing);
    validateUser(user);
    const value = payment.totalPaid;
    const description = "CONSULTA VEICULAR - OLHO NO CARRO";
    const nfeData = nfeDataFactory(value, description, user, paymentId);
    const response = await invoiceService.generateInvoice(nfeData);
    validateResponseWasSuccess(response);
    const nfeDto = createNfeDtoToDataBase(
      response.data.nfeId,
      description,
      value
    );
    const nfe = await nfeFacade.createNfe(user._id, paymentId, nfeDto);
    await updatePayment(paymentId, nfe._id);
    console.log("nfe created to " + paymentId);
  } catch (err) {
    throw new Error(JSON.stringify(err.response.data[0]));
  }
}

loadEmitterInterface();

module.exports = {
  createNfe: async (paymentId) => {
    // nfeEmitter.emit(EVENTS.CREATE_NFE, paymentId);
    return createNfe(paymentId);
  },
  updateNfe: (nfeId, args) => {
    nfeEmitter.emit(EVENTS.UPDATE_NFE, nfeId, args);
  },
};
