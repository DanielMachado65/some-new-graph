/**
* @api {get} /api/coupon/user/:userid Cupom do usuário
* @apiVersion 5.27.1
* @apiName CouponsUser
* @apiGroup Cupom de Desconto
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.
*
* @apiParam {String} userid ID do usuário
*
* @apiDescription O parâmetro userid deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX:  /api/coupon/user/<USER ID> </b>
*
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
{
  "status": {
    "cod": 200,
    "msg": "ok"
  },
  "body": [],
}
*
*@apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
{
  "AuthenticationError": "Acesso negado. Você não tem permissão para prosseguir com essa solicitação",
  "Code": 401
}
*/
