"use strict";

const { AsaasHandler } = require("./handlers/asaas.handler");
const { IuguPixHandler } = require("./handlers/iuguPix.handler");
const { MercadoPagoPixHandler } = require("./handlers/mercadoPagoPix.handler");
const { ZapayHandler } = require("./handlers/zapay.handler");
const Handlers = require("../../../../../infrastructure/dictionaries/PaylmentHandlersName.dictionary");
const SelectorHandlerMap = new Map();
SelectorHandlerMap.set(Handlers.ASAAS, AsaasHandler);
SelectorHandlerMap.set(Handlers.IUGU_PIX, IuguPixHandler);
SelectorHandlerMap.set(Handlers.MERCADO_PAGO_PIX, MercadoPagoPixHandler);
SelectorHandlerMap.set(Handlers.ZAPAY, ZapayHandler);

module.exports = SelectorHandlerMap;
