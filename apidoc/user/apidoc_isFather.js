/**
* @api {get} /api/user/is-father/:id Usuário Pai
* @apiVersion 5.27.1
* @apiName UserIsFather
* @apiGroup Usuario
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.
*
* @apiDescription O parâmetro "USER_ID" deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX: /api/user/is-father/<USER_ID></b>
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
{
   "status": {
      "cod": 200,
      "msg": "ok"
   },
   "body": 2
}

*@apiError Internal Server Error
*@apiSuccessExample Error-Response:
*HTTP/1.1 500 OK
{
   "InternalServerError": "Ops... Algo deu errado! Perdoe-nos pelo inconveniênte. Estamos analisando o problema que causou intermitência nessa requisição, aguarde...",
   "code": 500
}

*@apiError Invalid Parameters
*@apiSuccessExample Error-Response:
*HTTP/1.1 405 OK
{
   "status": {
      "cod": 405,
      "msg": "invalid parameters"
   },
   "body": null
}
*/
