'use strict';

const API_CONFIG = {
    port: process.env.PORT || 8080,
    ip: process.env.IP || '0.0.0.0',
};

module.exports = {
    api: API_CONFIG,
    isDevEnv: process.env.NODE_ENV === 'development',
    keys: ['c190f11a32dbc67eec465a320d7fe11d'],
    supper_keys: ['a225g21t56hjm89yye465a320d7fe26z', 'b815g21w56hjz89mne465a320d7my59u'],
    partners_keys: ['t145i21yo6hj789yy1hhj532md7fe26z'],
    app_secret_keys: ['olhonoc@rro_2018-secret-key'],
    jwt_secret: {
        common: 'HS384',
        supper: 'HS512',
        supper2: 'HS256',
    },
};


