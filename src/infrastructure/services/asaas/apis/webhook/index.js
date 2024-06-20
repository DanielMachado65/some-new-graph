'use strict';

module.exports.WebHook = class WebHook {
    constructor(config, httpClient, webHookValidator, webHookFactory) {
        this.config = config
        this.httpClient = httpClient;
        this.webHookValidator = webHookValidator;
        this.webHookFactory = webHookFactory;
        this.CUSTOMER_URL_BASE = this.config.URL_BASE_API + '/webhook/';
    }
}
