/**
* @apiIgnore Método acessível somente com privilégios de administrador.
* @api {post} /api/billing/add-credits/:userid Adicionar Créditos
* @apiVersion 5.27.1
* @apiName BillingAddCredits
* @apiGroup Faturamento
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.
* @apiParam {String} userId Id do usuário.
* @apiParam {String} credits Total de créditos a ser adicionado para o cliente.
*
* @apiDescription O parâmetro USER_ID deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX:  /api/billing/add-credits/<USER_ID></b>
*
* @apiDescription O parâmetro p deve ser passado no formato "Query String" de acordo com a implementação REST.
* <br> <b>EX:  /api/billing/add-credits/<USER_ID></b>
*

* @apiParamExample {json} Request-Example:
*   {
*      "credits": 150.0
*   }


* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
  {
    "status": {
      "cod": 200,
      "msg": "ok"
    },
    "body": {
      "error": null,
      "data": "Parabéns! 😄 Seus créditos adicionados com sucesso!"
    }
  }
*
*
*
* @apiError AddCreditsError Parâmetros de entrada inválidos
*
* @apiErrorExample Error-Response:
*  HTTP/1.1 404 Not Found
  {
    "status": {
      "cod": 405,
      "msg": "invalid parameters"
    },
    "body": null
  }
*
*/
