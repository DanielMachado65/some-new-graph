/**
* @api {get} /api/billing/update-invoice/:userid Atualizar Fatura
* @apiVersion 5.27.1
* @apiName BillingUpdateInvoice
* @apiGroup Faturamento
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.
* @apiParam {String} userId Id do usuário.
*
* @apiDescription O parâmetro userid deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX:  /api/billing/update-invoice/<USER_ID></b>
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
{
  "status": {
    "cod": 200,
    "msg": "ok"
  },
  "body": {
    "itensLotePaid": 0,
    "paymentDate": null,
    "status": null
  }
}
*@apiSuccessExample Error-Response:
*HTTP/1.1 200 ok
{
  "InternalServerError": "Ops... Algo deu errado! Perdoe-nos pelo inconveniênte. Estamos analisando o problema que causou intermitência nessa requisição, aguarde...",
  "code": 500
}
*/
