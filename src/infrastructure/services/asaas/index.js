'use strict';

//@todo-start strong dependency, must be replaced to container injection, or dependency injection, or inversion of control across inversion of dependency
const { shallowCopy } = require('../../utils/utils');
//@todo-end

const config = require('./apis/components/constants/config.constant');
const billingTypeEnum = require('./apis/components/enums/billingType.enum');
const discountTypeEnum = require('./apis/components/enums/discountType.enum');

const { Customer } = require('./apis/customer');
const { CustomerValidator } = require('./apis/customer/customer.validator');
const { CustomerFactory } = require('./apis/customer/customer.factory');
const CustomerGroupNameConstant = require('./apis/customer/customerGroupName.constant');

const { Payment } = require('./apis/payment');
const { PaymentValidator } = require('./apis/payment/payment.validator');
const { PaymentFactory } = require('./apis/payment/payment.factory');
const { PaymentAdapter } = require('./apis/payment/payment.adatper');
const PaymentStatusConstant = require('./apis/payment/paymentStatus.constant');

module.exports.AsaasService = class AsaasService {
    constructor(httpClient, userTypeEnum) {
        this.httpClient = httpClient;

        this.customer = new Customer(
            config,
            httpClient,
            new CustomerValidator(),
            new CustomerFactory(userTypeEnum, CustomerGroupNameConstant),
        );

        this.payment = new Payment(
            config,
            httpClient,
            new PaymentValidator(),
            new PaymentFactory(billingTypeEnum, discountTypeEnum),
            new PaymentAdapter(
                billingTypeEnum,
                discountTypeEnum,
                PaymentStatusConstant,
            ),
        );
    }

    createNewCustomer = async (user) =>
        this.customer.createNewCustomer(shallowCopy(user));
    retrieveCustomerByCustomerID = async (externalId) =>
        this.customer.retrieveCustomerByCustomerID(externalId);
    updateCustomerByCustomerID = async (externalId, user) =>
        this.customer.updateCustomerByCustomerID(externalId, shallowCopy(user));
    deleteCustomerByCustomerID = async (externalId) =>
        this.customer.deleteCustomerByCustomerID(externalId);
    restoreDeletedCustomerByCustomerID = async (externalId) =>
        this.customer.restoreDeletedCustomerByCustomerID(externalId);

    createPaymentWithBankingBillet = async (
        customerId,
        externalReference,
        value,
        description,
        dueDate,
        discountValue,
        discountDueDateLimitDays,
        discountType,
        fineValue,
    ) =>
        this.payment.createPaymentWithBankingBillet(
            customerId,
            externalReference,
            value,
            description,
            dueDate,
            discountValue,
            discountDueDateLimitDays,
            discountType,
            fineValue,
        );

    createPaymentWithCreditCard = async (
        customerId,
        externalReference,
        value,
        description,
        dueDate,
        user,
        holderName,
        number,
        expiryMonth,
        expiryYear,
        ccv,
        remoteIp,
        discountValue,
        discountType,
        installmentCount,
        installmentValue,
        interestValue,
        fineValue,
    ) =>
        this.payment.createPaymentWithCreditCard(
            customerId,
            externalReference,
            value,
            description,
            dueDate,
            user,
            holderName,
            number,
            expiryMonth,
            expiryYear,
            ccv,
            remoteIp,
            discountValue,
            discountType,
            installmentCount,
            installmentValue,
            interestValue,
            fineValue,
        );

    retrievePaymentByChargeId = async (chargeId) =>
        this.payment.retrievePaymentByChargeId(chargeId);

    updatePaymentByChargeId = async () =>
        this.payment.updatePaymentByChargeId();

    refundPaymentByChargeId = async () =>
        this.payment.refundPaymentByChargeId();
};
