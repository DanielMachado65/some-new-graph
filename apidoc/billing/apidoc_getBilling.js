/**
* @api {get} /api/billing/:billing_id Buscar Dados da Faturamento
* @apiVersion 5.27.1
* @apiName GetBillingById
* @apiGroup Faturamento
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.
* @apiParam {String} billing_id Id do faturamento.
*
* @apiDescription O parâmetro deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX:  /api/billing/<BILLING_ID></b>
*<br>
<br>

 O nó INVOICE, será populado apenas para clientes PÓS PAGO, o mesmo trará informações a respeito da fatura aberta corrente, e das demais
 faturas fechadas para este mesmo cliente.

* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
{
  "status": {
    "cod": 200,
    "msg": "ok"
  },
  "body": {
    "user": "XXXXXXXeXXXXXXXXXXXXe",
    "billingType": 2,
    "invoices": [
      {
        "_id": "XXXXX2XXXXXXXXXXX",
        "insertDate": "2018-02-10T19:05:51.246Z",
        "invoice": {
          "_id": "XXXXX2XXXXXXXXXXX",
          "__v": 3,
          "paymenteDate": null,
          "value": 3.9000000000000004,
          "status": "Expirada",
          "consumptionStatementLote": [
            "XXXXXXXXXXXXXXXXXXXXXX",
            "XXXXXXXXXXXXXXXXXXXXXX",
            "XXXXXXXXXXXXXXXXXXXXXX"
          ],
          "billing": "XXXXXXXXXXXXXXXXXXXXXX",
          "expirationDate": "2018-02-28T00:00:00.000Z",
          "initialDate": "2018-02-01T00:00:00.000Z",
          "createAt": "2018-02-10T19:05:51.243Z"
        }
      },
      {
        "_id": "XXXXXXXXXXXXXXXXXXXXXXX",
        "insertDate": "2018-04-09T05:53:52.680Z",
        "invoice": {
          "_id": "XXXXXXXXXXXXXXXXXXXXXX",
          "__v": 1,
          "paymenteDate": null,
          "value": 1.3,
          "status": "Aberta",
          "consumptionStatementLote": [
            "XXXXXXXXXXXXXXXXXXXXXX"
          ],
          "billing": "XXXXXXXXXXXXXXXXXXXXXX",
          "expirationDate": "2018-04-30T03:00:00.000Z",
          "initialDate": "2018-04-01T03:00:00.000Z",
          "createAt": "2018-04-09T05:53:52.525Z"
        }
      }
    ],
    "accountFunds": 59.80,
    "packages": [],
    "price_table": "XXXXXXXXXXXXXXXXXXXXXX"
  }
}
*
*
*/
