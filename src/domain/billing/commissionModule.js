'use strict';

const mongoose = require('mongoose');
const _ = require('lodash');

const PartnerTypesEnum = require('../../infrastructure/dictionaries/PartnerTypesEnum');
const InvoiceStatusDict = require('../../infrastructure/dictionaries/InvoiceStatus.dictionary');

const userModule = require('../user/user/userModule');
const invoiceModule = require('./invoice/invoice.module');
const consumptionStatementModule = require('./consumption/consumptionStatement.module');

const MCommission = mongoose.models.MCommission;

const createNew = async (obj) => {
    return MCommission.create(obj);
};

const getById = async (id) => {
    return MCommission.findOne({
        _id: id,
    }).populate('user consumptionStatements');
};

const getCommisionsByPeriod = async (month, year) => {
    const filter = {
        $and: [
            {
                referenceMonth: month,
            },
            {
                referenceYear: year,
            },
        ],
    };

    return await MCommission.find(filter)
        .sort({
            createAt: -1,
        })
        .lean()
        .exec();
};

const getCommissionByUser = async (userId, month, year) => {
    const filter = {
        $and: [
            {
                user: userId,
            },
            {
                referenceMonth: month,
            },
            {
                referenceYear: year,
            },
        ],
    };
    return MCommission.findOne(filter);
};

const executeCommissioning = async (month, year) => {
    let responseObject = {
        data: null,
        error: null,
        code: 200,
    };
    let initialDate = new Date(year, month - 1, 1, 0, 0, 0, 0);
    let endDate = new Date(year, month, 0, 23, 59, 59, 999);
    try {
        let partners = await userModule.getAllPartners(); //cara objeto dentro do array de partners é um USUARIO logo _partner == MUser insantce
        if (partners.length > 0) {
            for (let _partner of partners) {
                // _partner é um objeto MUser
                if (_partner.partner) {
                    let commission = await getCommissionByUser(
                        _partner._id,
                        month,
                        year,
                    );
                    if (!commission) {
                        commission = new MCommission();
                        commission.registrationFee =
                            _partner.partner.rules.billing.registerRate;
                        commission.user = _partner._id;
                        commission.referenceMonth = month;
                        commission.referenceYear = year;
                        commission = await MCommission.create(commission);
                    }

                    let posPaidChildrens = await userModule.getAllPosPaidPartnerChildren(
                        _partner._id,
                    );
                    let prePaidChildrens = await userModule.getAllPrePaidPartnerChildren(
                        _partner._id,
                    );

                    //Preenche lista de consumo para clientes PRE PAGO
                    let arrayBillingsChildrensPrePaid = _.map(
                        prePaidChildrens,
                        (c) => {
                            return c.billing._id;
                        },
                    );
                    let filterConsumption = {
                        $and: [
                            {
                                billing: {
                                    $in: arrayBillingsChildrensPrePaid,
                                },
                            },
                            {
                                status: true,
                            },
                            {
                                payday: {
                                    $ne: null,
                                },
                            },
                            {
                                createAt: {
                                    $gte: initialDate,
                                },
                            },
                            {
                                createAt: {
                                    $lte: endDate,
                                },
                            },
                        ],
                    };
                    let consumptionItens = await consumptionStatementModule.find(
                        filterConsumption,
                    );
                    commission.consumptionStatements = _.map(
                        consumptionItens,
                        (c) => {
                            return c._id;
                        },
                    );

                    //Preenche lista de consumo para clientes POS PAGO
                    let arrayBillingsChildrensPosPaid = _.map(
                        posPaidChildrens,
                        (c) => {
                            return c.billing._id;
                        },
                    );
                    let filterInvoice = {
                        $and: [
                            {
                                billing: {
                                    $in: arrayBillingsChildrensPosPaid,
                                },
                            },
                            {
                                paymenteDate: {
                                    $gte: initialDate,
                                },
                            },
                            {
                                paymenteDate: {
                                    $lte: endDate,
                                },
                            },
                            {
                                status: InvoiceStatusDict.get(2),
                            },
                        ],
                    };
                    let invoicesItens = await invoiceModule.find(filterInvoice);
                    // Realiza a população do array commission.consumptionStatements respeitando todas as regras definida para o parceiro: CLIENTES POS PAGO
                    for (let invoice of invoicesItens) {
                        let __user = _.find(posPaidChildrens, (p) => {
                            return (
                                p.billing._id.toString() ===
                                invoice.billing._id.toString()
                            );
                        });
                        const __payday = new Date(endDate);
                        __payday.setMilliseconds(0);
                        if (
                            __user &&
                            __user.billing.fatmin &&
                            invoice.value < __user.billing.fatmin
                        ) {
                            let __consumptionFatminItem = await consumptionStatementModule.createNew(
                                {
                                    billing: __user.billing._id,
                                    status: true,
                                    value:
                                        _partner.partner.partnerType ==
                                            PartnerTypesEnum(1)
                                            ? __user.billing.fatmin
                                            : __user.billing.fatmin *
                                            (_partner.partner.percentage /
                                                100),
                                    commission: {
                                        value:
                                            _partner.partner.partnerType ==
                                                PartnerTypesEnum(1)
                                                ? __user.billing.fatmin
                                                : __user.billing.fatmin *
                                                (_partner.partner.percentage /
                                                    100),
                                        fixedBaseValue:
                                            _partner.partner.partnerType ==
                                                PartnerTypesEnum(1)
                                                ? __user.billing.fatmin
                                                : 0,
                                        percentage: _partner.partner.percentage,
                                        fixedCosts: {
                                            isFatmin: true,
                                        },
                                    },
                                    payday: __payday,
                                },
                            );
                            commission.consumptionStatements.push(
                                __consumptionFatminItem._id,
                            );
                        } else {
                            commission.consumptionStatements = [
                                ...commission.consumptionStatements,
                                ...invoice.consumptionStatementLote,
                            ];
                        }
                        if (__user && __user.billing.dspac) {
                            let __consumptionDspacItem = await consumptionStatementModule.createNew(
                                {
                                    billing: __user.billing._id,
                                    status: true,
                                    value:
                                        _partner.partner.partnerType ===
                                            PartnerTypesEnum(1)
                                            ? __user.billing.dspac
                                            : __user.billing.dspac *
                                            (_partner.partner.percentage /
                                                100),
                                    commission: {
                                        value:
                                            _partner.partner.partnerType ===
                                                PartnerTypesEnum(1)
                                                ? __user.billing.dspac
                                                : __user.billing.dspac *
                                                (_partner.partner.percentage /
                                                    100),
                                        fixedBaseValue:
                                            _partner.partner.partnerType ===
                                                PartnerTypesEnum(1)
                                                ? __user.billing.dspac
                                                : __user.billing.dspac *
                                                (_partner.partner.percentage /
                                                    100),
                                        percentage: _partner.partner.percentage,
                                        fixedCosts: {
                                            isDspac: true,
                                        },
                                    },
                                    payday: __payday,
                                },
                            );
                            commission.consumptionStatements.push(
                                __consumptionDspacItem._id,
                            );
                        }
                    }
                    await commission.save();
                    commission = await MCommission.findById(
                        commission._id,
                    ).populate('consumptionStatements');

                    commission.commissionTotalValue = _.sumBy(
                        commission.consumptionStatements,
                        (o) => {
                            return parseFloat(o.commission.value);
                        },
                    );
                    commission.commissionTotalValue =
                        commission.commissionTotalValue -
                            commission.registrationFee >
                            0
                            ? commission.commissionTotalValue -
                            commission.registrationFee
                            : 0;
                    commission.commissionTotalValue = commission.commissionTotalValue.toFixed(
                        2,
                    );
                    await commission.save();
                }
            }
            responseObject.data = true;
            delete responseObject.error;
        }
    } catch (error) {
        console.log(error);
        responseObject.error = error.message;
        responseObject.code = 500;
        delete responseObject.data;
    } finally {
        return responseObject;
    }
};

const getDataCommissionToReport = async (month, year) => {
    const filter = {
        $and: [
            {
                referenceMonth: month,
            },
            {
                referenceYear: year,
            },
        ],
    };
    const opts = {
        path: 'user',
        populate: {
            path: 'billing partner',
        },
    };
    return await MCommission.find(filter)
        .populate(opts)
        .populate('consumptionStatements')
        .lean();
};

module.exports = {
    getById,
    getCommissionByUser,
    executeCommissioning,
    getCommisionsByPeriod,
    getDataCommissionToReport,
};
