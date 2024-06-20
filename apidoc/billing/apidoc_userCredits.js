/**
* @api {get} /api/billing/user-credits/:userid Creditos do Usuário
* @apiVersion 5.27.1
* @apiName BillingUserCredits
* @apiGroup Faturamento
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.
* @apiParam {String} userId Id do usuário.
*
* @apiDescription O parâmetro userid deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX:  /api/billing/user-credits/<USER_ID></b>
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
{
  "status": {
    "cod": 200,
    "msg": "ok"
  },
  "body": "694.30"
}
*@apiSuccessExample Error-Response:
*HTTP/1.1 200 ok
{
  "InternalServerError": "Ops... Algo deu errado! Perdoe-nos pelo inconveniênte. Estamos analisando o problema que causou intermitência nessa requisição, aguarde...",
  "code": 500
}
*/
