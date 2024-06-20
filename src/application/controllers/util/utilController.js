(async function () {
  'use strict';

  const EMOJIS = require('../../../infrastructure/constants/emojis');
  const utils = require('../../../infrastructure/utils/utils');

  const getDataAddressByZipcode = async (postalCode) => {
    let response = { cod: 200, data : null};
    try {
      let result = await utils.getDataAddressByZipcode(postalCode);
      if(result.error){
        response.cod = 410;
        response.data = result.error;
      }
      else{
        let objectReturned = JSON.parse(result.data);
        let objAddressData = {
          zipcode : (objectReturned.cep) ? objectReturned.cep.replaceAll('-','') : null,
          city : (objectReturned.localidade) ? objectReturned.localidade : null,
          state : (objectReturned.uf) ? objectReturned.uf : null,
          neighborhood : (objectReturned.bairro) ? objectReturned.bairro : null,
          street : (objectReturned.logradouro) ? objectReturned.logradouro : null,
          complement : (objectReturned.complemento) ? objectReturned.complemento : null
        }
        response.data = objAddressData;
      }
    } catch (err) {
      response.cod = 500;
      response.data = err.message
    } finally {
      return response;
    }
  }

  const getEmojis = () => {
    return EMOJIS;
  };

  module.exports = {
    getDataAddressByZipcode,
    getEmojis,
  }
})();
