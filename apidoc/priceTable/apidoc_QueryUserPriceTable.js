/**
* @apiIgnore Método acessível somente com privilégios de administrador.
* @api {get} /api/billing/change-user-price-table/:userid Alterar Tabela de Preço por Usuário
* @apiVersion 5.27.1
* @apiName PriceTableQuery
* @apiGroup Tabela de Preco
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.
* @apiParam {String} userId Id do usuário.
* @apiParam {String} p O parâmetro p trata-se do id da nova tabela de preço que o usuário será inserido.
*
* @apiDescription O parâmetro USER_ID deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX:  /api/billing/change-user-price-table/<USER_ID></b>
*
* @apiDescription O parâmetro p deve ser passado no formato "Query String" de acordo com a implementação REST.
* <br> <b>EX:  /api/billing/change-user-price-table/<USER_ID>?p=<ID_TABELA_PRECO></b>
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
  {
    "status": {
      "cod": 200,
      "msg": "ok"
    },
    "body": {
      "error": null,
      "data": {
        "ok": 1,
        "nModified": 0,
        "n": 1
      }
    }
  }
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
      "error": "Não existe a tabela de preço para o ID informado",
      "data": null
    }
  }
*
* @apiError ChangeUserPriceTableError Parâmetros de entrada inválidos
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
