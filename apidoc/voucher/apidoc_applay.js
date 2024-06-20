/**
* @api {post} /api/voucher/applay Aplicar voucher 
* @apiVersion 0.3.0
* @apiName ApplayVoucher
* @apiGroup Voucher
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.
*
* @apiParam {String} code Código do cupom
* @apiParam {String} email E-mail do usuário
*
* @apiDescription Atribui a um usuário o voucher com o código enviado.
* <br> <b>EX:  /api/voucher/applay </b>
*
* @apiParamExample {json} Request-Example:
{
  "email":"teste@teste.com.br"
  "code":"00000000"
}

* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
{
   "status": null,
   "body": {
      "data": {
         "_id": "xxxxxxxxxxxxxxxxxxxxx",
         "__v": 0,
         "dateOfUse": null,
         "creditsToApply": 42.9,
         "code": "1000376",
         "status": true,
         "createAt": "2018-05-24T13:18:51.057Z",
         "creator": null
      },
      "status": 200
   }
}

* @apiErrorExample Error-Response:
* HTTP/1.1 405 Invalid Parameters
{
    "status": null,
    "body": {
        "data": null,
        "status": 404
    }
}
*/
