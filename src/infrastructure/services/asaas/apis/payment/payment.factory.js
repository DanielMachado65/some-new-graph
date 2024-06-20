'use strict';

module.exports.PaymentFactory = class PaymentFactory {
    asaasBillingTypeEnum;
    discountTypeEnum;

    customer = null;
    billingType = 0;
    value = 0;
    dueDate = new Date();
    description = null;
    externalReference = null;
    postalService = false;
    remoteIp = null;
    installmentCount = 0;
    installmentValue = 0;
    discount = {
        value: 0,
        dueDateLimitDays: 0,
        type: 0,
    };
    fine = {
        value: 0,
    };
    interest = {
        value: 0,
    };
    creditCardHolderInfo = {
        name: null,
        email: null,
        cpfCnpj: null,
        postalCode: null,
        addressNumber: null,
        addressComplement: null,
        phone: null,
        mobilePhone: null,
    };
    creditCard = {
        holderName: null,
        number: null,
        expiryMonth: null,
        expiryYear: null,
        ccv: null,
    };

    constructor(asaasBillingTypeEnum, discountTypeEnum) {
        this.asaasBillingTypeEnum = asaasBillingTypeEnum;
        this.discountTypeEnum = discountTypeEnum;
    }

    setCustomer(customer) {
        if (customer) this.customer = customer;
        return this;
    }
    setBillingType(billingType) {
        if (billingType)
            this.billingType = this.__translateBillingTypeToAsaasDescription(
                billingType,
            );
        return this;
    }
    setValue(value) {
        if (PaymentFactory.classValidator.isValidNumber(value))
            this.value = value;
        return this;
    }
    setDueDate(dueDate) {
        if (dueDate) this.dueDate = this.__translateDueDateAsNeeded(dueDate);
        return this;
    }
    setDescription(description) {
        if (description) this.description = description;
        return this;
    }
    setExternalReference(externalReference) {
        if (externalReference) this.externalReference = externalReference;
        return this;
    }

    setDiscountDueDateLimitDays(dueDateLimitDays) {
        if (PaymentFactory.classValidator.isValidNumber(dueDateLimitDays))
            this.discount.dueDateLimitDays = dueDateLimitDays;
        return this;
    }

    setDiscountType(type) {
        if (PaymentFactory.classValidator.isValidNumber(type))
            this.discount.type = this.__translateDiscountType(type);
        return this;
    }

    setDiscountValue(discountValue) {
        if (PaymentFactory.classValidator.isValidNumber(discountValue))
            this.discount.value = discountValue;
        return this;
    }

    setFineValue(fineValue) {
        if (PaymentFactory.classValidator.isValidNumber(fineValue))
            this.fine.value = fineValue;
        return this;
    }

    setInterestValue(interestValue) {
        if (PaymentFactory.classValidator.isValidNumber(interestValue))
            this.interest.value = interestValue;
        return this;
    }

    setCreditCartHolderName(name) {
        if (name) this.creditCardHolderInfo.name = name;
        return this;
    }

    setCreditCartHolderEmail(email) {
        if (email) this.creditCardHolderInfo.email = email;
        return this;
    }

    setCreditCartHolderDocument(document) {
        if (document) this.creditCardHolderInfo.cpfCnpj = document;
        return this;
    }

    setCreditCartHolderPostalCode(postalCode) {
        if (postalCode)
            this.creditCardHolderInfo.postalCode = this.__preparePostalCode(
                postalCode,
            );
        return this;
    }

    setCreditCartHolderAddressComplement(addressComplement) {
        if (addressComplement)
            this.creditCardHolderInfo.addressComplement = addressComplement;
        return this;
    }

    setCreditCartHolderAddressNumber(addressNumber) {
        if (addressNumber)
            this.creditCardHolderInfo.addressNumber = addressNumber;
        return this;
    }

    setCreditCartHolderMobilePhone(mobilePhone) {
        if (mobilePhone) this.creditCardHolderInfo.mobilePhone = mobilePhone;
        return this;
    }

    setCreditCartHolderPhone(phone) {
        if (phone) this.creditCardHolderInfo.phone = phone;
        return this;
    }

    setCreditCartName(holderName) {
        if (holderName) this.creditCard.holderName = holderName;
        return this;
    }

    setCreditCartNumber(number) {
        if (number) this.creditCard.number = number;
        return this;
    }

    setCreditCartExpiryMonth(expiryMonth) {
        if (expiryMonth) this.creditCard.expiryMonth = expiryMonth;
        return this;
    }

    setCreditCartExpiryYear(expiryYear) {
        if (expiryYear) this.creditCard.expiryYear = expiryYear;
        return this;
    }

    setCreditCartCcv(ccv) {
        if (ccv) this.creditCard.ccv = ccv;
        return this;
    }

    setInstallmentCount(installmentCount) {
        if (PaymentFactory.classValidator.isValidNumber(installmentCount))
            this.installmentCount = installmentCount;
        return this;
    }

    setInstallmentValue(installmentValue) {
        if (PaymentFactory.classValidator.isValidNumber(installmentValue))
            this.installmentValue = installmentValue;
        return this;
    }

    setRemoteIp(ip) {
        if (ip) this.remoteIp = ip;
        return this;
    }

    getPaymentObject() {
        const payment = JSON.parse(JSON.stringify(this));
        delete payment.discountTypeEnum;
        delete payment.asaasBillingTypeEnum;
        return payment;
    }

    static classValidator = {
        isValidNumber(num) {
            return num && !Number.isNaN(num);
        },
    };

    __translateBillingTypeToAsaasDescription(billingType) {
        if (billingType === this.asaasBillingTypeEnum.BANK_BILLET)
            return 'BOLETO';
        if (billingType === this.asaasBillingTypeEnum.CREDIT_CARD)
            return 'CREDIT_CARD';
        if (billingType === this.asaasBillingTypeEnum.UNDEFINED)
            return 'UNDEFINED';
    }

    __translateDiscountType(discountType) {
        if (discountType === this.discountTypeEnum.FIXED) return 'FIXED';
        if (discountType === this.discountTypeEnum.PERCENTAGE)
            return 'PERCENTAGE';
    }

    __translateDueDateAsNeeded(dueDate) {
        const date = new Date(dueDate);
        return `${date.getFullYear()}-${this.__getCorrectMonth(
            date.getMonth(),
        )}-${date.getDate()}`;
    }

    __getCorrectMonth(month) {
        const correctMonth = month + 1;
        return correctMonth >= 10 ? correctMonth : `0${correctMonth}`;
    }

    __preparePostalCode(postalCode) {
        if (postalCode && postalCode.length === 8) {
            return postalCode.slice(0, 5) + '-' + postalCode.slice(5);
        }
        return postalCode;
    }

    createBankBilletBilling(
        customerId,
        externalReferenceId,
        value,
        description,
        dueDate,
        discountValue,
        discountDueDateLimitDays,
        discountType,
        fineValue = 0,
        interestValue = 0,
    ) {
        return this.setCustomer(customerId)
            .setExternalReference(externalReferenceId)
            .setBillingType(this.asaasBillingTypeEnum.BANK_BILLET)
            .setValue(value)
            .setDescription(description)
            .setDueDate(dueDate)
            .setDiscountValue(discountValue)
            .setDiscountType(discountType)
            .setDiscountDueDateLimitDays(discountDueDateLimitDays)
            .setFineValue(fineValue)
            .setInterestValue(interestValue)
            .getPaymentObject();
    }

    createCreditCardBilling(
        customerId,
        externalReferenceId,
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
    ) {
        return this.setCustomer(customerId)
            .setExternalReference(externalReferenceId)
            .setBillingType(this.asaasBillingTypeEnum.CREDIT_CARD)
            .setValue(value)
            .setDescription(description)
            .setDueDate(dueDate)
            .setCreditCartName(holderName)
            .setCreditCartNumber(number)
            .setCreditCartCcv(ccv)
            .setCreditCartExpiryMonth(expiryMonth)
            .setCreditCartExpiryYear(expiryYear)
            .setCreditCartHolderEmail(user.email)
            .setCreditCartHolderName(user.name)
            .setCreditCartHolderAddressComplement(
                user.generalData.address.complement,
            )
            .setCreditCartHolderAddressNumber(user.generalData.address.number)
            .setCreditCartHolderPostalCode(user.generalData.address.zipcode)
            .setCreditCartHolderDocument(user.cpf)
            .setCreditCartHolderMobilePhone(
                user.generalData.phoneNumber1 || user.generalData.phoneNumber2,
            )
            .setCreditCartHolderPhone(
                user.generalData.phoneNumber2 || user.generalData.phoneNumber1,
            )
            .setRemoteIp(remoteIp)
            .setDiscountValue(discountValue)
            .setDiscountType(discountType)
            .setInstallmentValue(installmentValue)
            .setInstallmentCount(installmentCount)
            .setInterestValue(interestValue)
            .setFineValue(fineValue)
            .getPaymentObject();
    }
};
