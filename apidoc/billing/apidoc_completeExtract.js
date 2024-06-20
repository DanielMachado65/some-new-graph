/**
* @apiDeprecated
* @apiDeprecated Utilize a nova versão para implementação do extrato completo. Vá para (#Faturamento:BillingCompleteExtract2).
* @api {get} /api/billing/complete-extract/:userid Extrato Completo
* @apiVersion 5.27.1
* @apiName BillingCompleteExtract
* @apiGroup Faturamento
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.
* @apiParam {String} userId Id do usuário.
*
* @apiDescription O parâmetro deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX:  /api/billing/complete-extract/<USER_ID></b>
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
  {
    "status": {
      "cod": 200,
      "msg": "ok"
    },
    "body": [
      {
        "query": "Agregados",
        "date": "2018-03-08T22:10:59.542Z",
        "cost": 1.99,
        "status": false,
        "payday": null
      },
      {
        "query": "Agregados",
        "date": "2018-03-08T22:08:29.370Z",
        "cost": 1.99,
        "status": false,
        "payday": null
      }
    ],
  }
*
*
*/
