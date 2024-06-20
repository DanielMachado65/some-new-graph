'use strict';

module.exports.PaymentAdapter = class PaymentAdapter {
    constructor(asaasBillingTypeEnum, discountTypeEnum, paymentStatusConstant) {
        this.asaasBillingTypeEnum = asaasBillingTypeEnum;
        this.discountTypeEnum = discountTypeEnum;
        this.paymentStatusConstant = paymentStatusConstant;
    }

    __translateBillingTypeToNumberFormat(billingType) {
        if (billingType === 'BOLETO')
            return this.asaasBillingTypeEnum.BANK_BILLET;
        if (billingType === 'CREDIT_CARD')
            return this.asaasBillingTypeEnum.CREDIT_CARD;
        if (billingType === 'UNDEFINED')
            return this.asaasBillingTypeEnum.UNDEFINED;
    }

    __translateDiscountTypeToNumberFormat(discountType) {
        if (discountType === 'FIXED') return this.discountTypeEnum.FIXED;
        if (discountType === 'PERCENTAGE')
            return this.discountTypeEnum.PERCENTAGE;
    }
    __translatePaymentStatusToBrFormat(paymentStatus) {
        return (
            this.paymentStatusConstant[paymentStatus] ||
            'Status de pagamento desconhecido'
        );
    }

    transformPaymentResponseToCreating(paymentResponse, error) {
        return error
            ? {
                  error: (error.response && error.response.data) || error.message,
              }
            : paymentResponse.response;
    }

    transformPaymentResponseToRetrieving(paymentResponse) {
        if (paymentResponse) {
            const payment = paymentResponse.payment;
            this.event = paymentResponse.event;
            return {
                chargeId: payment.id,
                createtAt: payment.dateCreated,
                customer: payment.customer,
                dueDate: payment.dueDate,
                paymentDate: payment.paymentDate,
                clientPaymentDate: payment.clientPaymentDate,
                originalDueDate: payment.originalDueDate,
                originalValue: payment.originalValue,
                value: payment.value,
                netValue: payment.netValue,
                billingType: this.__translateBillingTypeToNumberFormat(
                    payment.billingType,
                ),
                status: payment.status,
                statusTranslated: this.__translatePaymentStatusToBrFormat(
                    payment.status,
                ),
                discount: {
                    ...payment.discount,
                    type: this.__translateDiscountTypeToNumberFormat(
                        payment.discount.type,
                    ),
                },
                interestPercentage: payment.interest.value,
                interestValue: payment.interestValue,
                finePercentage: payment.fine.value,
                description: payment.description,
                externalReference: payment.externalReference,
                confirmedDate: payment.confirmedDate,
                invoiceUrl: payment.invoiceUrl,
                bankSlipUrl: payment.bankSlipUrl,
                wasDeleted: payment.deleted,
                wasAnticipated: payment.anticipated,
                invoiceNumber: payment.invoiceNumber,
            };
        }
    }
};
