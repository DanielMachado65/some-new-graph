/**
* @api {get} /api/package/:packageid Buscar Pacote por ID
* @apiVersion 5.27.1
* @apiName GetById
* @apiGroup Pacotes
*
* @apiParam {String} packageid ID do pacote.
*
* @apiDescription O parâmetro PACKAGE_ID deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX: /api/package/<PACKAGE_ID></b>

* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
{
  "status": {
    "cod": 200,
    "msg": "ok"
  },
  "body": {
    "_id": "5XXXXXXXXXXXXXXXXXXa3",
    "name": "Pacote 150",
    "__v": 0,
    "discountPercent": 15,
    "attributedValue": 172.5,
    "purchasePrice": 150,
    "createAt": "2018-03-30T22:42:32.369Z",
    "status": true
  }
}
*
*/
