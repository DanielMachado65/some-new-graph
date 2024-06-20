/**
* @api {post} /api/package/ Criar Novo Pacote
* @apiVersion 5.27.1
* @apiName GetNewPackage
* @apiGroup Pacotes

* @apiParam {String} purchasePrice Preço de compra.
* @apiParam {String} attributedValue Valor atribuido.
* @apiParam {String} name Nome do pacote.
* @apiParam {String} discountPercent Desconto do pacote.

*@apiDescription O parâmetro name deve ser único.
* <br> <b>EX:  /auth/user/context/<USER_ID></b>

*@apiParamExample {json} Request-Example:
{
  "purchasePrice" : 1001,
   "attributedValue" : 1150,
   "name" : "Pacote 1000",
   "discountPercent" : 15
}

* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
{
  "status": {
    "cod": 200,
    "msg": "ok"
  },
  "body": {
    "__v": 0,
    "name": "Pacote 1001",
    "_id": "XXXXXXXXXXXXXXXXXXX2e97",
    "discountPercent": 15,
    "attributedValue": 1150,
    "purchasePrice": 100,
    "createAt": "2018-08-06T17:07:16.431Z",
    "status": true
  }
}
* @apiSuccessExample Error-Response:
* HTTP/1.1 200 OK
{
  "status": {
    "cod": 200,
    "msg": "ok"
  },
  "body": "E11000 duplicate key error collection: olhonocarroApiDb.mpackages index: name_1 dup key: { : \"Pacote 1000\" }"
}
*
*/
