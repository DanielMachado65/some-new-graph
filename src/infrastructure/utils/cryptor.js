
  'use strict';

  const crypto = require('crypto');
  const algorithm = 'aes-256-ctr';
  const password = '1qaz2wsx3edc4rfv5tgb!@#$%QWERTASDFGZXCVB0pol-olhonocarro@#';

  function encrypt(text){
    var cipher = crypto.createCipher(algorithm,password)
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
  }

  function decrypt(text){
    var decipher = crypto.createDecipher(algorithm,password)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
  }

  function matchPassword(hash,candidatePass) {
    let decrypted = decrypt(hash);
    if(decrypted === candidatePass)
      return true;
    return false;
  }

  module.exports = {
    encrypt,
    decrypt,
    matchPassword,
  };

