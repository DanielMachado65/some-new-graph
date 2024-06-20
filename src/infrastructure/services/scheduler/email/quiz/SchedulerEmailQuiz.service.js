// @DEPRECTED

(async function () {
    'use strict';

    const Q = require('q');
    const request = require('request-promise');
    const apiBaseUrl =
        process.env.URL_API_BASE || 'https://api.olhonocarro.com.br';
    const schedulerUrl =
        process.env.URL_API_SCHEDULER ||
        'http://ec2-18-231-9-226.sa-east-1.compute.amazonaws.com:8888';

    const createScheduler = async (email, coupon, timesSend = 0) => {
        let deferred = Q.defer();
        let url = `${schedulerUrl}/schedule`;
        const timeToLoose = 48 * 60 * 60 * 1000;
        timesSend++;
        let options = {
            method: 'POST',
            uri: url,
            body: {
                hook: `${apiBaseUrl}/api/quiz-answer/send-email`,
                payload: {
                    email,
                    coupon,
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
})();
