/**
* @api {get} /api/voucher/code/:code Recuperar Voucher por Código
* @apiVersion 0.3.0
* @apiName VoucherCode
* @apiGroup Voucher
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.
*
* @apiParam {String} code Código do voucher
*
* @apiDescription O parâmetro CODE_VOUCHER deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX:  /api/voucher/code/<CODE_VOUCHER> </b>
* Será retornado as informações do voucher requisitado pelo código.
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
{
   "status": {
      "cod": 200,
      "msg": "ok"
   },
   "body": {
      "_id": "xxxxxxxxxxxxxxxxxxxx",
      "__v": 0,
      "dateOfUse": "2018-06-25T15:45:40.637Z",
      "creditsToApply": 42.9,
      "code": "0570069",
      "status": false,
      "createAt": "2018-05-24T13:18:54.160Z",
      "user": "xxxxxxxxxxxxxxxxxxxx"
   }
}
*/
