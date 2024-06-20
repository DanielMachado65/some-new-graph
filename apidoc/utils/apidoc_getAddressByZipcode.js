/**
* @api {get} /api/utils/address-data-by-zip-code/:zipcode Buscar Dados de Endereço por CEP
* @apiVersion 5.27.1
* @apiName GetAddressData
* @apiGroup Utils
*
* @apiParam {String} zipcode CEP de qualquer cidade brasileira.
*
* @apiDescription O parâmetro ZIPCODE deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX: /api/utils/address-data-by-zip-code/<ZIPCODE></b>

* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
{
  "status": {
    "cod": 200,
    "msg": "ok"
  },
  "body": {
    "zipcode": "01331020",
    "city": "São Paulo",
    "state": "SP",
    "neighborhood": "Bela Vista",
    "street": "Rua Doutor Seng",
    "complement": null
  }
}
*
*/
