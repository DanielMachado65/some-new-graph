'use strict';

const { PaymentErrorHandler } = require('./paymentError.handler');

module.exports.PaymentValidator = class PaymentValidator extends PaymentErrorHandler {
    validateCustomerId(customerId) {
        if (!customerId && typeof customerId !== 'string')
            this.InvalidCustomerIdException();
        return this;
    }

    validateChargeId(chargeId) {
        if (!chargeId && typeof chargeId !== 'string')
            this.InvalidChargeIdException();
        return this;
    }

    validatePaymentId(paymentId) {
        if (!paymentId || !paymentId.toString) this.InvalidPaymentIDException();
        return this;
    }

    validateBillingType(billingType) {
        if (!billingType || !Number.isInteger(billingType))
            this.InvalidBillingTypeException();
        return this;
    }

    validateValueToCharge(value) {
        if (!value && value !== 0) this.InvalidValueToChargeException();
        return this;
    }

    validateDueDate(dueDate) {
        if (!dueDate) this.InvalidDueDateException();
        const dateNow = new Date();
        const dueDateRef = new Date(dueDate);
        if (dateNow >= dueDateRef) this.InvalidDueDateException();
        return this;
    }

    validateUserToCharge({ name, cpf, email }) {
        if (!name)
            this.GenericException('Invalid user name. User name must be sent.');
        if (!cpf)
            this.GenericException('Invalid user CPF. The CPF must be sent.');
        if (!email)
            this.GenericException(
                'Invalid user e-mail. The e-mail must be sent.',
            );
        return this;
    }

    validateHolderName(holderName) {
        if (!holderName || typeof holderName !== 'string')
            this.GenericException(
                'Invalid holder name to credit card. Please, change the holder name',
            );
        return this;
    }

    validateCardNumber(number) {
        if (!number || typeof number !== 'string')
            this.GenericException(
                'Invalid number to credit card. Please, check the number of card',
            );
        return this;
    }

    validateExpiryYear(expiryYear) {
        if (!expiryYear || typeof expiryYear !== 'string')
            this.GenericException(
                'Invalid expire year. The credit cart must be valid with valid expiry year',
            );
        return this;
    }

    validateExpiryMonth(expiryMonth) {
        if (!expiryMonth || typeof expiryMonth !== 'string')
            this.GenericException(
                'Invalid expire month. The credit cart must be valid with valida expiry month',
            );
        return this;
    }
};
