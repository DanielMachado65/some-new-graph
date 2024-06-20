'use strict';

module.exports = {
    WEBHOOK: Object.freeze(
        ' https://api.olhonocarro.com.br/webhoook/callback/payment/asaas',
    ),
    ENVIRONMENT: Object.freeze(process.env.ASAAS_ENVIRONMENT),
    URL_BASE_API:
        process.env.ASAAS_ENVIRONMENT === 'dev'
            ? Object.freeze('https://sandbox.asaas.com/api/v3')
            : Object.freeze('https://www.asaas.com/api/v3'),
    VERSION: Object.freeze('v3'),
    ENDPOINT: Object.freeze('https://www.asaas.com/'),
    REQUEST_SETUP: {
        DEFAULT_HEADERS: {
            'Content-Type': 'application/json',
            access_token:
                process.env.ASAAS_ENVIRONMENT === 'dev'
                    ? Object.freeze(
                          'c1d5e0d56f1679de61333f2a2e116a72331e683354204519dbe6c7942ad3a843',
                      )
                    : Object.freeze(
                          'a21f9dbe02bc875d557fe959d56bc5bab494bdad28c1df1cec6f0b10b69dc5bb',
                      ),
        },
    },
};
