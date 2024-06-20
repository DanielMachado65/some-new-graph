/**
* @api {get} /api/billing/complete-comsumption/:userid Extrato Completo de Consumo
* @apiVersion 0.3.0
* @apiName BillingCompleteConsumption
* @apiGroup Faturamento
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.
* @apiParam {String} userid Id do usuário.
*
* @apiDescription O parâmetro USER_ID deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX:  /api/billing/complete-comsumption/<USER_ID></b>
*<br>
<br>
A requisição retorna o extrato com todos os dados referentes ao consumo do usuário referênciado.

* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
{
  "status": {
    "cod": 200,
    "msg": "ok"
  },
  "body": {
    "data": [
      {
        "_id": "XXXXXXXXXXXXXXXXXXX0005",
        "__v": 0,
        "payday": null,
        "value": 4.25,
        "status": false,
        "querycode": 7,
        "query": "XXXXXXXXXXXXXXX7208fb611",
        "billing": "XXXXXXXXXXXXXXX44bb0ea7b36",
        "createAt": "2018-03-21T02:37:56.667Z"
      },
      {
        "_id": "XXXXXXXXXX2b430ff7cff30005",
        "__v": 0,
        "payday": null,
        "value": 4.25,
        "status": false,
        "querycode": 7,
        "query": "XXXXXXXXXX534144a127f6",
        "billing": "XXXXXXXXXXXXXf44bb0ea7b36",
        "createAt": "2018-03-21T02:34:20.134Z"
      },
      {
        "_id": "XXXXXXXXXXX590cd437285a",
        "__v": 0,
        "payday": null,
        "value": 4.25,
        "status": false,
        "querycode": 7,
        "query": "XXXXXXXXXXXXX90cd4372858",
        "billing": "XXXXXXXXXXXXXX44bb0ea7b36",
        "createAt": "2018-03-21T02:33:03.954Z"
      },
      {
        "_id": "XXXXXXXXXXXXXX3c41f0b906d5",
        "__v": 0,
        "payday": null,
        "value": 4.25,
        "status": false,
        "querycode": 7,
        "query": "5aXXXXXXXXXXXXXXXXXb906d3",
        "billing": "XXXfXXXXXXXXXXXXXXXXXea7b36",
        "createAt": "2018-03-21T02:31:26.374Z"
      },
      {
        "_id": "5ab1c3734ff9ea0d10a9ada2",
        "__v": 0,
        "payday": null,
        "value": 4.25,
        "status": false,
        "querycode": 7,
        "query": "5XXXXXXXXXXXXXXXXX0d10a9ada0",
        "billing": "XXXf0a70aXXXXXXXXXXXXXXXXa7b36",
        "createAt": "2018-03-21T02:29:07.068Z"
      },
      {
        "_id": "5XXXXXXXXXXXXXXXXXXXXXXcdad12",
        "__v": 0,
        "payday": null,
        "value": 4.25,
        "status": false,
        "querycode": 7,
        "query": "XXXXXXXXXXXXXXXXXXXXXXa10cdad10",
        "billing": "XXXXXXXXXXXXXXXXXX4bb0ea7b36",
        "createAt": "2018-03-21T02:28:13.784Z"
      },
      {
        "_id": "5XXXXXXXXXXXXXXXXXXXXXb1838d263",
        "__v": 0,
        "payday": null,
        "value": 4.25,
        "status": false,
        "querycode": 7,
        "query": "5ab1cXXXXXXXXXXXXXXXXXXXXX",
        "billing": "XXXf0aXXXXXXXXXXXXXa7b36",
        "createAt": "2018-03-21T02:24:07.430Z"
      },
      {
        "_id": "5XXXXXXXXXXXXXXXXXd18dc449c97",
        "__v": 0,
        "payday": null,
        "value": 4.25,
        "status": false,
        "querycode": 7,
        "query": "XXXXXXXXXXXXXX8dc449c95",
        "billing": "XXXf0a70XXXXXXXXXXXXXXXXX",
        "createAt": "2018-03-21T02:23:01.509Z"
      },
      {
        "_id": "5ab1c139XXXXXXXXXXXXXX",
        "__v": 0,
        "payday": null,
        "value": 4.25,
        "status": false,
        "querycode": 7,
        "query": "XXXXXXXXXXXXXXXX698ef88d0",
        "billing": "XXXXXXXXXXXXXXXXXXXXXX",
        "createAt": "2018-03-21T02:19:37.393Z"
      },
      {
        "_id": "5ab075XXXXXXXXXXXXXXXXXXX",
        "__v": 0,
        "payday": null,
        "value": 4.25,
        "status": false,
        "querycode": 7,
        "query": "XXXXXXXXXXXXXXXXXXed889e",
        "billing": "XXXXXXXXXXXXXXXXXXXXXX",
        "createAt": "2018-03-20T02:42:52.884Z"
      },
      {
        "_id": "XXXXXXXXXXXXXXXXXXXff82388dd",
        "__v": 0,
        "payday": null,
        "value": 1.99,
        "status": false,
        "querycode": 1,
        "query": "5aa1b4f2aXXXXXXXXXXXXXXXXXXXb",
        "billing": "XXXf0XXXXXXXXXXXXXXXXXXXXXXX",
        "createAt": "2018-03-08T22:10:59.542Z"
      },
      {
        "_id": "5XXXXXXXXXXXXXXXXXXXXXXXXXX4",
        "__v": 0,
        "payday": null,
        "value": 1.99,
        "status": false,
        "querycode": 1,
        "query": "XXXXXXXXXXXX82388d2",
        "billing": "5XXXXXXXXXXXXXa7b36",
        "createAt": "2018-03-08T22:08:29.370Z"
      }
    ],
    "dt": null
  }
}
*
*
*/
