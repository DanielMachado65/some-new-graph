'use strict';

module.exports.CustomerFactory = class CustomerFactory {
    constructor(userTypeEnum, customersGroupName) {
        this.userTypeEnum = userTypeEnum;
        this.customersGroupName = customersGroupName;
    }
    __getGroupNameByUserType(type) {
        return type === this.userTypeEnum.DEFAULT_CLIENT_TYPE
            ? this.customersGroupName.PRE_PAID_ONC_GROUP
            : this.customersGroupName.POS_PAID_ONC_GROUP;
    }
    createCustomer(user) {
        const address = user.generalData.address || {};
        return {
            externalReference: user._id.toString(),
            name: user.name,
            cpfCnpj: user.cpf,
            email: user.email,
            phone:
                user.generalData.phoneNumber1 || user.generalData.phoneNumber2,
            mobilePhone:
                user.generalData.phoneNumber1 || user.generalData.phoneNumber2,
            address: address.city,
            addressNumber: address.number,
            complement: address.complement,
            province: address.neighborhood,
            postalCode: address.zipcode,
            notificationDisabled: true,
            additionalEmails:
                user.generalData.billingOwner &&
                user.generalData.billingOwner.email,
            groupName: this.__getGroupNameByUserType(user.type),
        };
    }
};
