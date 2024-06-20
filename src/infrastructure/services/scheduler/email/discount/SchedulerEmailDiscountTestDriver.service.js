// @DEPRECTED
'use strict';

const Q = require('q');
const request = require('request-promise');
const apiBaseUrl = process.env.URL_API_BASE || 'https://api.olhonocarro.com.br';
const schedulerUrl =
    process.env.URL_API_SCHEDULER ||
    'http://ec2-18-231-9-226.sa-east-1.compute.amazonaws.com:8888';

const createScheduler = async (email, timesSend = 0) => {
    let deferred = Q.defer();
    let url = `${schedulerUrl}/schedule`;
    const timeToLoose = timesSend === 0 ? 5 * 60 * 1000 : 24 * 60 * 60 * 1000;

    let options = {
        method: 'POST',
        uri: url,
        body: {
            hook: `${apiBaseUrl}/api/test-drive/send-email`,
            payload: {
                email,
                timesSend,
                timeToLoose,
            },
            options: {
                timeToLoose,
            },
        },
        json: true,
    };
    request(options)
        .then((result) => {
            return deferred.resolve(result);
        })
        .catch((err) => {
            return deferred.reject(err);
        });

    return deferred.promise;
};

module.exports = {
    createScheduler,
};
