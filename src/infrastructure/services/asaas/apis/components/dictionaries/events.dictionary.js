'use strict';

const EventsMap = new Map();
EventsMap.set('PAYMENT_CREATED', null);
EventsMap.set('PAYMENT_UPDATED', null);
EventsMap.set('PAYMENT_CONFIRMED', null);
EventsMap.set('PAYMENT_RECEIVED', null);
EventsMap.set('PAYMENT_OVERDUE', null);
EventsMap.set('PAYMENT_DELETED', null);
EventsMap.set('PAYMENT_RESTORED', null);
EventsMap.set('PAYMENT_REFUNDED', null);
EventsMap.set('PAYMENT_RECEIVED_IN_CASH_UNDONE', null);
EventsMap.set('PAYMENT_CHARGEBACK_REQUESTED', null);
EventsMap.set('PAYMENT_CHARGEBACK_DISPUTE', null);
EventsMap.set('PAYMENT_AWAITING_CHARGEBACK_REVERSAL', null);

module.exports = EventsMap;
