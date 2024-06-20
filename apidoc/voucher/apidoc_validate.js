/**
* @api {post} /api/voucher/validate Validar voucher 
* @apiVersion 0.3.0
* @apiName ValidateVoucher
* @apiGroup Voucher
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.
*
* @apiParam {String} code Código do voucher
* @apiDescription Faz a verificação se um voucher é valido pelo código.
* <br> <b>EX:  /api/voucher/validate </b>
*
* @apiParamExample {json} Request-Example:
{
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
