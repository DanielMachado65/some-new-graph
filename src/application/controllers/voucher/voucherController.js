'use strict';

const voucherModule = require('../../../domain/voucher/voucherModule');
const userModule = require('../../../domain/user/user/userModule');

const createLote = async (vouchersRules) => {
    return await voucherModule.createLote(vouchersRules);
};

const validate = async (code) => {
    return await voucherModule.validate(code);
};

const getByCode = async (code) => {
    return await voucherModule.getByCode(code);
};

const getByUser = async (userid) => {
    return await voucherModule.getByUser(userid);
};

const apply = async (email, code) => {
    let response = null;
    let user = await userModule.getByEmail(email);
    if (user) {
        let voucher = await voucherModule.getByCode(code);
        if (voucher) {
            response = await voucherModule.apply(voucher._id, user._id);
        } else {
            response = { msg: 'Voucher inválido ou inexistente.', status: 404 };
        }
    }
    return response;
};

const getAll = async () => {
    return await voucherModule.getAll();
};

module.exports = {
    createLote,
    validate,
    getByCode,
    getByUser,
    apply,
    getAll,
};
