'use strict';

module.exports = {
    'facebookAuth': {
        'clientID': '337209806775392',
        'clientSecret': '36a534d6bd982cec8bcda0dee66bd388',
        'callbackURL': 'https://api.olhonocarro.com.br/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields': ['id', 'email', 'name'],
    },
    'googleAuth': {
        'clientID': '377022407202-se2vndjkl6o1ghqgdi7751578elhekno.apps.googleusercontent.com',
        'clientSecret': 'p6d-Fn7ATPM2muYV8Vmb0QI9',
        'callbackURL': 'https://api.olhonocarro.com.br/auth/google/callback',
        'passReqToCallback': true,
        'apiKey': 'AIzaSyBBwCDbaRemozgWOM349o1RfxTTC5b-Jrs',
    },
    SECURTY_KEY: '52be833a515ec7ffad67bd6001c698e67bb55aa4ebd5ac48d5ce85401028c293', //SHA256. SECRET PASS = PALMEIRAS NÃO TEM MUNDIAL :D
};


