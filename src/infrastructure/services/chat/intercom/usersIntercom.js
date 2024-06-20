(function functionName() {
    'use strict';

    const Q = require('q');

    //PRODUÇÃO
    const clientId = 'Client_Id_ad3f696ffa0bad62e1e681b615d852944b960f1e';
    const clientSecret = 'Client_Secret_c05ef72ddbad1cdc2a4650d229a30deae7f211e7';

    var options = {
        client_id: clientId,
        client_secret: clientSecret,
        sandbox: false //dev = true, production = false
    };

    const getContextPayment = (account) => {
        if(account){
            return {
                client_id: account.clientId,
                client_secret: account.clientSecret,
                sandbox: false
            }
        }
        return options;
    }

    const definePaymentType = async (chargeid,body,account) => {
        let deferred = Q.defer();
        let params = {
            id : chargeid
        };
        let gerencianet = new Gerencianet(getContextPayment(account));

        gerencianet
            .payCharge(params, body)
            .then((data)=>{
                return deferred.resolve(data);
            })
            .catch((err)=>{
                return deferred.reject(err);
            })
            .done();
        return deferred.promise;
    }

    const createTransaction = async (transactionObject,account) => {
        let deferred = Q.defer();
        let gerencianet = new Gerencianet(getContextPayment(account));
        gerencianet
            .createCharge({}, transactionObject)
            .then((data)=>{
                return deferred.resolve(data);
            })
            .catch((err)=>{
                return deferred.reject(err);
            })
            .done();
        return deferred.promise;
    }

    const getNotification = async (token,account) => {
        let deferred = Q.defer();
        let gerencianet = new Gerencianet(getContextPayment(account));
        gerencianet
            .getNotification({token:token})
            .then((data)=>{
                return deferred.resolve(data);
            })
            .catch((err)=>{
                return deferred.reject(err);
            })
            .done();
        return deferred.promise;
    }

    module.exports = {
        createTransaction,
        definePaymentType,
        getNotification,
    }

})();
