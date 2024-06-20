/**
* @api {get} /api/coupon/code/:code Código do cupom
* @apiVersion 5.27.1
* @apiName CouponsCode
* @apiGroup Cupom de Desconto
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.
*
* @apiParam {String} code Código do cupom
*
* @apiDescription O parâmetro code deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX:  /api/coupon/code/<CODE_COUPON> </b>
*
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
{
  "status": {
    "cod": 200,
    "msg": "ok"
  },
  "body": {
    "_id": "XXXXXXXXXXXXXXXXc145",
    "__v": 0,
    "rules": {
      "authorized": {
        "packages": [],
        "queries": []
      },
      "limitUsage": 1,
      "expirationDate": null,
      "minValueToApply": 150,
      "discountValue": null,
      "discountPercentage": 20
    },
    "code": "xxxxx",
    "status": true,
    "createAt": "2018-06-14T21:15:19.624Z"
  }
}
*/
