'use strict';
const TranslatorCodesConstant = require('../constants/iugu/translatorCodes.constant')
const CodesTranslatorMap = new Map();
CodesTranslatorMap.set('00',TranslatorCodesConstant.NATIONAL_TRANSACTION_AUTHORIZED_WITH_SUCCESS);
CodesTranslatorMap.set('01',TranslatorCodesConstant.TRANSACTION_REFER_BY_EMITTER);
CodesTranslatorMap.set('02',TranslatorCodesConstant.TRANSACTION_REFER_BY_EMITTER);
CodesTranslatorMap.set('03',TranslatorCodesConstant.NOT_FOUND_TRANSACTION);
CodesTranslatorMap.set('04',TranslatorCodesConstant.RESTRICTION_ON_CARD);
CodesTranslatorMap.set('05',TranslatorCodesConstant.TRANSACTION_NOT_AUTHORIZED);
CodesTranslatorMap.set('06',TranslatorCodesConstant.TRY_AGAIN);
CodesTranslatorMap.set('07',TranslatorCodesConstant.RESTRICTION_ON_CARD);
CodesTranslatorMap.set('08',TranslatorCodesConstant.SECURITY_CODE_INVALID);
CodesTranslatorMap.set('10',TranslatorCodesConstant.NOT_AVAILABLE_SENT_CART);
CodesTranslatorMap.set('11',TranslatorCodesConstant.INTERNATIONAL_TRANSACTION_AUTHORIZED);
CodesTranslatorMap.set('12',TranslatorCodesConstant.INVALID_TRANSACTION);
CodesTranslatorMap.set('13',TranslatorCodesConstant.INVALID_VALUE);
CodesTranslatorMap.set('14',TranslatorCodesConstant.INVALID_CREDIT_CARD);
CodesTranslatorMap.set('15',TranslatorCodesConstant.INVALID_EMITTER);
CodesTranslatorMap.set('19',TranslatorCodesConstant.MUST_REMAKE_TRANSACTION_AGAIN);
CodesTranslatorMap.set('21',TranslatorCodesConstant.WAS_NOT_CANCELED);
CodesTranslatorMap.set('22',TranslatorCodesConstant.INVALID_INSTALLMENTS);
CodesTranslatorMap.set('24',TranslatorCodesConstant.INVALID_AMOUNT_INSTALLMENTS);
CodesTranslatorMap.set('30',TranslatorCodesConstant.TRANSACTION_UNPROCESSED);
CodesTranslatorMap.set('39',TranslatorCodesConstant.TRANSACTION_NOT_AUTHORIZED_ERROR_ON_EMITTER_AGENT);
CodesTranslatorMap.set('41',TranslatorCodesConstant.RESTRICTION_ON_CARD);
CodesTranslatorMap.set('43',TranslatorCodesConstant.RESTRICTION_ON_CARD);
CodesTranslatorMap.set('51',TranslatorCodesConstant.INSUFFICIENT_FUNDS);
CodesTranslatorMap.set('52',TranslatorCodesConstant.SECURITY_CODE_INVALID);
CodesTranslatorMap.set('54',TranslatorCodesConstant.EXPIRED_CARD);
CodesTranslatorMap.set('55',TranslatorCodesConstant.INVALID_PASSWORD);
CodesTranslatorMap.set('57',TranslatorCodesConstant.TRANSACTION_NOT_AUTHORIZED_OR_PERMITTED);
CodesTranslatorMap.set('58',TranslatorCodesConstant.TRANSACTION_NOT_PERMITTED);
CodesTranslatorMap.set('60',TranslatorCodesConstant.TRANSACTION_NOT_AUTHORIZED);
CodesTranslatorMap.set('61',TranslatorCodesConstant.UNAVAILABLE_AGENT_EMITTER);
CodesTranslatorMap.set('62',TranslatorCodesConstant.RESTRICTION_ON_CARD);
CodesTranslatorMap.set('63',TranslatorCodesConstant.RESTRICTION_ON_CARD);
CodesTranslatorMap.set('65',TranslatorCodesConstant.RESTRICTION_ON_CARD);
CodesTranslatorMap.set('67',TranslatorCodesConstant.TRANSACTION_NOT_AUTHORIZED);
CodesTranslatorMap.set('70',TranslatorCodesConstant.LIMIT_EXCEEDED);
CodesTranslatorMap.set('74',TranslatorCodesConstant.TRANSACTION_NOT_AUTHORIZED);
CodesTranslatorMap.set('75',TranslatorCodesConstant.RESTRICTION_ON_CARD);
CodesTranslatorMap.set('76',TranslatorCodesConstant.TRY_AGAIN);
CodesTranslatorMap.set('77',TranslatorCodesConstant.WAS_NOT_CANCELED);
CodesTranslatorMap.set('78',TranslatorCodesConstant.CARD_NOT_BLOCKED_BY_OWNER);
CodesTranslatorMap.set('80',TranslatorCodesConstant.TRANSACTION_NOT_AUTHORIZED);
CodesTranslatorMap.set('81',TranslatorCodesConstant.TRANSACTION_DENIED);
CodesTranslatorMap.set('82',TranslatorCodesConstant.INVALID_TRANSACTION);
CodesTranslatorMap.set('85',TranslatorCodesConstant.TRANSACTION_NOT_PERMITTED_WITH_FAIL);
CodesTranslatorMap.set('88',TranslatorCodesConstant.ERROR_ON_TRANSACTION);
CodesTranslatorMap.set('90',TranslatorCodesConstant.TRANSACTION_NOT_PERMITTED_WITH_FAIL);
CodesTranslatorMap.set('91',TranslatorCodesConstant.UNAVAILABLE_BANK);
CodesTranslatorMap.set('92',TranslatorCodesConstant.TRANSACTION_NOT_AUTHORIZED_TIME_EXCEEDED);
CodesTranslatorMap.set('94',TranslatorCodesConstant.TRANSACTION_NOT_AUTHORIZED);
CodesTranslatorMap.set('96',TranslatorCodesConstant.TRY_AGAIN);
CodesTranslatorMap.set('99',TranslatorCodesConstant.SYSTEM_UNAVAILABLE);
CodesTranslatorMap.set('AA',TranslatorCodesConstant.TIME_EXCEEDED);
CodesTranslatorMap.set('AC',TranslatorCodesConstant.DEBIT_CARD_USED_AS_CREDIT_CARD);
CodesTranslatorMap.set('AE',TranslatorCodesConstant.TRY_LATER);
CodesTranslatorMap.set('AF',TranslatorCodesConstant.TRANSACTION_NOT_PERMITTED_WITH_FAIL);
CodesTranslatorMap.set('AG',TranslatorCodesConstant.TRANSACTION_NOT_PERMITTED_WITH_FAIL);
CodesTranslatorMap.set('AI',TranslatorCodesConstant.TRANSACTION_NOT_AUTHORIZED_AUTHENTICATION_NOT_DOES);
CodesTranslatorMap.set('AV',TranslatorCodesConstant.TRANSACTION_NOT_AUTHORIZED_INVALID_DATA);
CodesTranslatorMap.set('BD',TranslatorCodesConstant.TRANSACTION_NOT_PERMITTED_WITH_FAIL);
CodesTranslatorMap.set('BL',TranslatorCodesConstant.TRANSACTION_NOT_PERMITTED_DAILY_LIMIT_EXCEEDED);
CodesTranslatorMap.set('BM',TranslatorCodesConstant.INVALID_CREDIT_CARD);
CodesTranslatorMap.set('BN',TranslatorCodesConstant.TRANSACTION_NOT_AUTHORIZED_CARD_OR_ACCOUNT_HAS_BEEN_BLOCKED);
CodesTranslatorMap.set('BV',TranslatorCodesConstant.EXPIRED_CARD);
CodesTranslatorMap.set('CF',TranslatorCodesConstant.TRANSACTION_NOT_AUTHORIZED_VALIDATION_FAIL);
CodesTranslatorMap.set('EE',TranslatorCodesConstant.NOT_PERMITTED_TRANSACTION_INSTALLMENTS_VALUE_TOO_SMALL);
CodesTranslatorMap.set('FA',TranslatorCodesConstant.NOT_AUTHORIZED_TRANSACTION_AMEX);
CodesTranslatorMap.set('FC',TranslatorCodesConstant.TRANSACTION_NOT_AUTHORIZED_CALL_TO_EMITTER);
CodesTranslatorMap.set('GA',TranslatorCodesConstant.TRANSACTION_NOT_AUTHORIZED);
CodesTranslatorMap.set('GD',TranslatorCodesConstant.TRANSACTION_NOT_PERMITTED);
CodesTranslatorMap.set('KA',TranslatorCodesConstant.TRANSACTION_NOT_AUTHORIZED_VALIDATION_FAIL);
CodesTranslatorMap.set('KE',TranslatorCodesConstant.TRANSACTION_NOT_AUTHORIZED_VALIDATION_FAIL);
CodesTranslatorMap.set('N7',TranslatorCodesConstant.SECURITY_CODE_INVALID);
module.exports = CodesTranslatorMap;

