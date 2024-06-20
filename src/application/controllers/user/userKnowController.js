(async function () {
    'use strict';

    const userKnowHelper = require('../../../infrastructure/helpers/user/userKnowHelper');
    const userKnowModule = require('../../../domain/user/userKnowModule');

    const create = async ({ name, document, email, phoneNumber, address }) => {
        try {
            let findEmailResponse = await userKnowModule.getByEmail(email);
            const emailResponse = userKnowHelper.validateEmail(
                email,
                findEmailResponse.result,
            );
            if (emailResponse.error)
                return userKnowHelper.errorHandler(emailResponse);

            const nameResponse = userKnowHelper.validateName(name);
            if (nameResponse.error)
                return userKnowHelper.errorHandler(nameResponse);

            const documentResponse = userKnowHelper.validateDocument(document);
            if (documentResponse.error)
                return userKnowHelper.errorHandler(documentResponse);

            const phoneNumberResponse = userKnowHelper.validatePhoneNumber(
                phoneNumber,
            );
            if (phoneNumberResponse.error)
                return userKnowHelper.errorHandler(phoneNumberResponse);

            const addressResponse = userKnowHelper.validateAddress(address);
            if (addressResponse.error)
                return userKnowHelper.errorHandler(addressResponse);

            const userKnowCreatedResponse = await userKnowModule.create({
                name: nameResponse.result,
                document: documentResponse.result,
                email: emailResponse.result,
                phoneNumber: phoneNumberResponse.result,
                address: addressResponse.result,
            });

            if (userKnowCreatedResponse.error)
                return userKnowHelper.errorHandler(userKnowCreatedResponse);

            return { result: userKnowCreatedResponse.result };
        } catch (error) {
            return { error: 'CREATE_QUIZ_ERROR', data: error };
        }
    };

    const getAll = async () => {
        const response = await userKnowModule.getAll();
        if (response.error) return userKnowHelper.errorHandler(response);
        return response;
    };

    module.exports = {
        create,
        getAll,
    };
})();
