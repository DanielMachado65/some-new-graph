'use strict';

module.exports.Customer = class Customer {
    constructor(config, httpClient, customerValidator, customerFactory) {
        this.config = config;
        this.httpClient = httpClient;
        this.customerValidator = customerValidator;
        this.customerFactory = customerFactory;
        this.CUSTOMER_URL_BASE = this.config.URL_BASE_API + '/customers/';
    }

    createNewCustomer = async (user) => {
        this.customerValidator.validateIfIsValidUser(user);
        const customer = this.customerFactory.createCustomer(user);
        return this.httpClient.post(
            this.CUSTOMER_URL_BASE,
            customer,
            this.config.REQUEST_SETUP.DEFAULT_HEADERS,
        );
    };

    retrieveCustomerByCustomerID = async (externalId) => {
        this.customerValidator.validateExternalId(externalId);
        const uri = this.CUSTOMER_URL_BASE + externalId;
        //@TODO call adapter interface to map user context before call  upstream
        return this.httpClient.get(
            uri,
            this.config.REQUEST_SETUP.DEFAULT_HEADERS,
        );
    };

    updateCustomerByCustomerID = async (externalId, user) => {
        this.customerValidator.validateIfIsValidUser(user);
        this.customerValidator.validateExternalId(externalId);
        const customer = this.customerFactory.createCustomer(user);
        const uri = this.CUSTOMER_URL_BASE + externalId;
        return this.httpClient.post(
            uri,
            customer,
            this.config.REQUEST_SETUP.DEFAULT_HEADERS,
        );
    };

    deleteCustomerByCustomerID = async (externalId) => {
        this.customerValidator.validateExternalId(externalId);
        const uri = this.CUSTOMER_URL_BASE + externalId;
        return this.httpClient.delete(
            uri,
            this.config.REQUEST_SETUP.DEFAULT_HEADERS,
        );
    };

    restoreDeletedCustomerByCustomerID = async (externalId) => {
        this.customerValidator.validateExternalId(externalId);
        const uri = this.CUSTOMER_URL_BASE + externalId + '/restore';
        return this.httpClient.post(
            uri,
            null,
            this.config.REQUEST_SETUP.DEFAULT_HEADERS,
        );
    };
};
