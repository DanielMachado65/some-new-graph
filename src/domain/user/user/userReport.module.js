'use strict';

const {
    upload,
    ALL_BUCKETS,
} = require('../../../infrastructure/services/aws/s3Service');
const UserFacade = require('./user.facade');
const PaymentFacade = require('../../billing/payment/payment.facade');
const {
    generateBufferFromDataJson,
    writeNewExcelFromJson,
} = require('../../../infrastructure/utils/excel.util');

async function getPaymentsRealPriceTotalPriceAndDateByBillingsIds(billings) {
    return await PaymentFacade.find(
        { billing: { $in: billings }, paid: true },
        { realPrice: 1, totalPrice: 1, createAt: 1, billing: 1 },
    );
}

async function getPrePaidUsersActives() {
    return UserFacade.find(
        { status: true, type: 1 },
        {
            email: 1,
            name: 1,
            'generalData.phoneNumber1': 1,
            'generalData.phoneNumber2': 1,
            billing: 1,
        },
    );
}

function getBillingsFromUsersArray(users) {
    return [
        ...new Set(
            users.map((user) => user.billing && user.billing.toString()),
        ),
    ].filter((item) => item);
}

const generatePrePaidUserReportWithPaymentData = async () => {
    const users = await getPrePaidUsersActives();
    const billingsIds = getBillingsFromUsersArray(users);
    const payments = await getPaymentsRealPriceTotalPriceAndDateByBillingsIds(
        billingsIds,
    );
    const data = UserFacade.reportUserWithPaymentDataFactory(users, payments);
    writeNewExcelFromJson(data, 'clients.xlsx');
    const buffer = generateBufferFromDataJson(data, 'clients');
    console.log('buffer was generated');
    await upload(ALL_BUCKETS.reports.queries, 'clients.xlsx', buffer);
    console.log('FILE HAS BEEN SENT TO AWS STORAGE');
};

module.exports = {
    generatePrePaidUserReportWithPaymentData,
};
