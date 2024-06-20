'use strict';

const aknaModule = require('../../../domain/akna/akna.module');

const getUserDataFromList = async (listTitle, email) => {
    return await aknaModule.getUserDataFromList(listTitle, email);
};

const getLists = async () => {
    return await aknaModule.getLists();
};

const importUserToList = async (user) => {
    return await aknaModule.importUserToList(user);
};

const getAllTransactionalActions = async () => {
    return await aknaModule.getAllTransactionalActions();
};

const createTransactionalAction = async (transactionalAction) => {
    return await aknaModule.createTransactionalAction(transactionalAction);
};

const mailSenderTestAction = async (testAction) => {
    return await aknaModule.mailSenderTestAction(testAction);
};

const getTotalsAction = async (actionTitle) => {
    return await aknaModule.getTotalsAction(actionTitle);
};

const actionInformation = async (actionTitle) => {
    return await aknaModule.actionInformation(actionTitle);
};

const addInterestedArea = async (nameArea) => {
    return await aknaModule.addInterestedArea(nameArea);
};

const deleteInterestedArea = async (nameArea) => {
    return await aknaModule.deleteInterestedArea(nameArea);
};

const listAllInterestedArea = async () => {
    return await aknaModule.listAllInterestedArea();
};

const updateInterestedArea = async (name, newName) => {
    return await aknaModule.updateInterestedArea(name, newName);
};

const createNewMessage = async (message) => {
    return await aknaModule.createNewMessage(message);
};

const listAllMessage = async () => {
    return await aknaModule.listAllMessage();
};

const getMessage = async (title) => {
    return await aknaModule.getMessage(title);
};

const shootTransactionalAction = async (users, actionName) => {
    return await aknaModule.shootTransactionalAction(users, actionName);
};

const shootTransactionalActionSMSCorporate = async (
    sender,
    phones,
    message,
) => {
    return await aknaModule.shootTransactionalActionSMSCorporate(
        sender,
        phones,
        message,
    );
};

const verifyStatusSent = async (code) => {
    return await aknaModule.verifyStatusSent(code);
};

const verifyRecipientResponse = async (code) => {
    return await aknaModule.verifyRecipientResponse(code);
};

module.exports = {
    getUserDataFromList,
    getLists,
    importUserToList,
    getAllTransactionalActions,
    createTransactionalAction,
    mailSenderTestAction,
    getTotalsAction,
    actionInformation,
    addInterestedArea,
    deleteInterestedArea,
    listAllInterestedArea,
    updateInterestedArea,
    createNewMessage,
    listAllMessage,
    getMessage,
    shootTransactionalAction,
    shootTransactionalActionSMSCorporate,
    verifyStatusSent,
    verifyRecipientResponse,
};
