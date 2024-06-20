/**
* @apiIgnore Método acessível somente com privilégios de administrador.
* @api {get} /api/billing/total-by-price-table/:pt Total da Tabela de Preços
* @apiVersion 5.27.1
* @apiName BillingTotalByPrice
* @apiGroup Faturamento
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.
* @apiParam {String} tableId Id da tabela de preços.
*
* @apiDescription O parâmetro deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX:  /api/billing/total-by-price-table/<TABLE_ID></b>
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
  {
    {
      "status": {
        "cod" : 200,
        "msg" : "ok"
      },
      "body" : 1281
    }
  }
*
*
*/
