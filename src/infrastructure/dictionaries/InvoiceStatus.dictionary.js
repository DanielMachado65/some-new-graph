
  'use strict';
  const InvoiceStatusEnum = require('../enumerators/invoiceStatus.enum')
  const InvoiceStatusMap = new Map();
  InvoiceStatusMap.set(InvoiceStatusEnum.OPENED,'Aberta')
  InvoiceStatusMap.set(InvoiceStatusEnum.PAID,'Pago')
  InvoiceStatusMap.set(InvoiceStatusEnum.PARTIALLY_PAID,'Parcialmente pago')
  InvoiceStatusMap.set(InvoiceStatusEnum.REFUNDED,'Reembolsada')
  InvoiceStatusMap.set(InvoiceStatusEnum.DELAYED,'Atrasada')
  InvoiceStatusMap.set(InvoiceStatusEnum.IN_PROTEST,'Em protesto')
  InvoiceStatusMap.set(InvoiceStatusEnum.CHARGEBACK,'Chargeback')
  InvoiceStatusMap.set(InvoiceStatusEnum.IN_ANALYSIS,'Em analise')
  InvoiceStatusMap.set(InvoiceStatusEnum.CANCELED,'Cancelada')
  module.exports = InvoiceStatusMap;

