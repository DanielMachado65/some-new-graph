'use strict';
const {DispatcherError} = require('../components/handlers/dispatcherError.handler')
module.exports.PaymentErrorHandler = class PaymentErrorHandler extends DispatcherError{
    constructor() {
        super();
    }

    GenericException(msg){
        super.throwException(msg);
    }

    InvalidCustomerIdException(){
        super.throwException("Invalid user. Customer ID must be a valid ID.");
    }

    InvalidChargeIdException(){
        super.throwException("Invalid charge id. The charge ID must be sent and need be a valida ID.");
    }

    InvalidPaymentIDException(){
        super.throwException("Invalid payment id from business API");
    }

    InvalidBillingTypeException(){
        super.throwException("Invalid billing type. Must be BOLETO, CREDIT_CARD or UNDEFINED");
    }

    InvalidValueToChargeException(){
        super.throwException("Value must be number bigger than zero");
    }

    InvalidDueDateException(){
        super.throwException("Due date is invalid date. Must be bigger then today");
    }

}
