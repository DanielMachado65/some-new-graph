'use strict';

module.exports.Signature = class Signature {
    constructor(config, httpClient, signatureValidator, signatureFactory) {
        this.config = config
        this.httpClient = httpClient;
        this.signatureValidator = signatureValidator;
        this.paymentFactory = signatureFactory;
        this.CUSTOMER_URL_BASE = this.config.URL_BASE_API + '/subscriptions/';
    }
}
