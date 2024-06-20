'use strict';

const CONSTANTS = require('../constants/constants');

const Q = require('q');
const googl = require('goo.gl');

googl.setKey(CONSTANTS.googleAuth.apiKey);
googl.getKey();

const shorten = async (url) => {
    let deferred = Q.defer();
    googl.shorten(url)
        .then(function(shortUrl) {
            deferred.resolve(shortUrl);
        })
        .catch(function(err) {
            deferred.reject(err.message);
        });
    return deferred.promise;
};

const expand = async (shortUrl) => {
    let deferred = Q.defer();
    googl.expand(shortUrl)
        .then(function(expandUrl) {
            deferred.resolve(expandUrl);
        })
        .catch(function(err) {
            deferred.reject(err.message);
        });
    return deferred.promise;
};

module.exports = {
    shorten,
    expand,
};

