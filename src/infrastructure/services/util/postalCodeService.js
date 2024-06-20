'use strict';

const Q = require('q');
const request = require('request-promise');

const getDataAddressByZipcode = async (postalCode) => {
    let deferred = Q.defer();
    let url = `https://viacep.com.br/ws/${postalCode}/json/`;
    let options = {
        method: 'GET',
        uri: url,
    }
    request(options)
        .then((result) => {
            return deferred.resolve(result);
        })
        .catch((err) => {
            return deferred.reject(err);
        });

    return deferred.promise;
}

module.exports = {
    getDataAddressByZipcode,
}


