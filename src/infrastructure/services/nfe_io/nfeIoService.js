(function(){
    'use strict';
    //DOC: https://nfe.io/doc/integracao/clientes-sdk/nodejs/
    const Q = require('q');
    const request = require('request-promise');

    const COMPANY_ID = "5b9bf7822093d919783aad78";
    const API_KEY = "UzSTDkKngoYINgTq78yLVkc3KNVgT6wYmVFe6idL5CsjyEFTtsLDBNvAHZokbgq7iEE";

    const listActiveCompanies = async () => {
        let deferred = Q.defer();
        
        return deferred.promise;
    };

    const createCompany = async () => {
        let deferred = Q.defer();
        
        return deferred.promise;
    };

    const getCompanyDetails = async () => {
        let deferred = Q.defer();
        
        return deferred.promise;
    };

    const updateCompany = async () => {
        let deferred = Q.defer();
        
        return deferred.promise;
    };

    const removeCompany = async () => {
        let deferred = Q.defer();
        
        return deferred.promise;
    };

    const listLegalPeople = async () => {
        let deferred = Q.defer();
        
        return deferred.promise;
    };

    const getDetailsLegalPeople = async () => {
        let deferred = Q.defer();
        
        return deferred.promise;
    };

    const listNaturalPeople = async () => {
        let deferred = Q.defer();
        
        return deferred.promise;
    };


    const getDetailsNaturalPeople = async () => {
        let deferred = Q.defer();
        
        return deferred.promise;
    };

    const listServiceInvoices = async () => {
        let deferred = Q.defer();
        
        return deferred.promise;
    };

    const emitServiceInvoice = async () => {
        let deferred = Q.defer();
        
        return deferred.promise;
    };

    const cancelServiceInvoice = async () => {
        let deferred = Q.defer();
        
        return deferred.promise;
    };

    const sendServiceInvoiceToEmail = async () => {
        let deferred = Q.defer();
        
        return deferred.promise;
    };

    const downloadServiceInvoice = async () => {
        let deferred = Q.defer();
        
        return deferred.promise;
    };

    const downloadXmlServiceInvoice = async () => {
        let deferred = Q.defer();
        
        return deferred.promise;
    };
    const getDetailsServiceInvoice = async () => {
        let deferred = Q.defer();

        return deferred.promise;
    };
    module.exports = {
        listActiveCompanies,
        createCompany,
        getCompanyDetails,
        updateCompany,
        removeCompany,
        listLegalPeople,
        getDetailsLegalPeople,
        listNaturalPeople,
        getDetailsNaturalPeople,
        listServiceInvoices,
        emitServiceInvoice,
        getDetailsServiceInvoice,
        cancelServiceInvoice,
        sendServiceInvoiceToEmail,
        downloadServiceInvoice,
        downloadXmlServiceInvoice,
    }
})();