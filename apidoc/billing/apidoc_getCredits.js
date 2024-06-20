/**
* @api {get} /api/billing/user-credits/:userid Buscar Créditos por Usuário
* @apiVersion 5.27.1
* @apiName BillingGetCredits
* @apiGroup Faturamento
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.
* @apiParam {String} userId Id do usuário.
*
* @apiDescription O parâmetro USER_ID deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX:  /api/billing/user-credits/<USER_ID></b>
*
* @apiDescription O parâmetro p deve ser passado no formato "Query String" de acordo com a implementação REST.
* <br> <b>EX:  /api/billing/user-credits/<USER_ID></b>
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
  {
    "status": {
      "cod": 200,
      "msg": "ok"
    },
    "body": {
      "data": "156.02"
    }
  }
*
*
*
* @apiError AddCreditsError Usuário não encontrado
*
* @apiErrorExample Error-Response:
*  HTTP/1.1 404 Not Found
  {
    "status": {
      "cod": 404,
      "msg": "not found"
    },
    "body": "Usuário inválido ou inexistente."
  }
*
*/
