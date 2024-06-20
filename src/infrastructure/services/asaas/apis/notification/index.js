'use strict';

module.exports.Notification = class Notification {
    constructor(
        config,
        httpClient,
        notificationValidator,
        notificationFactory,
    ) {
        this.config = config;
        this.httpClient = httpClient;
        this.notificationValidator = notificationValidator;
        this.notificationFactory = notificationFactory;
        this.CUSTOMER_URL_BASE = this.config.URL_BASE_API + '/notifications/';
    }
};
