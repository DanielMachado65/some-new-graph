/**
* @api {post} /api/collback/payment Notificação de pagamento
* @apiVersion 5.27.1
* @apiName PaymantNotification
* @apiGroup Notification
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.
*
* @apiParam {String} code Código do cupom
*
* <br> <b>EX:  /api/voucher/applay </b>
*
* @apiParamExample {json} Request-Example:
{
  "token":"00000000"
}

* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
{
    "status": {
        "cod": 200,
        "msg": "ok"
    },
    "body": "ok"
}

* @apiErrorExample Error-Response:
* HTTP/1.1 405 Invalid Parameters
{
    "status": null,
    "body": {
        "data": null,
        "status": 405
    }
}
*/
