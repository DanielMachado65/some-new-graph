
  'use strict';

  const util = require('../utils/utils');

  module.exports = (code) => {
    code = (typeof(code) === 'string') ? util.tryParseInt(code) : code;
    switch (code) {
      case 200:
        return {cod:200, msg: 'ok'};
      case 201:
          return {cod:201, msg: 'created'};
      case 204 :
        return {cod:204, msg: 'no content'};
      case 206 :
        return {cod : 206, msg: 'partial content'};
      case 401:
          return {cod:401, msg: 'unauthorized'};
      case 403:
        return { cod: 403, msg: 'forbidden' };
      case 404:
        return {cod:404, msg: 'not found'};
      case 405:
        return  {cod:405, msg: 'invalid parameters'};
      case 407:
        return  {cod:407, msg: 'invalid password'};
      case 408:
        return  {cod:408, msg: 'invalid credentials'};
      case 409:
        return  {cod:409, msg: 'content already exists'};
      case 410:
        return  {cod:410, msg: 'bad request'};
      case 501:
        return {cod:501, msg: 'system temporarily unavailable'};
      case 500:
        return {cod:500, msg: 'internal error'};
      default:
        return null;
    }
  }

