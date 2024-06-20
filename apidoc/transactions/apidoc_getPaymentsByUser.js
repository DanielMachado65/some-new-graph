/**
* @api {get} /api/purchase/transactions/:userid?dt=<DATE_REFERENCE> Buscar Todas as Transações de um Usuario
* @apiVersion 5.27.1
* @apiName GetPayment
* @apiGroup Pagamento
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.

* @apiParam {String} userid ID do usuário.
* @apiParam {Date} dt Data de retorno da API para buscar o proximo lote.

* @apiDescription O parâmetro USER_ID deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX: /api/purchase/transactions/<USER_ID></b>
* @apiDescription O parâmetro DATE_REFERENCE deve ser passado no formato "Query String" de acordo com a implementação REST.
* <br> <b>EX:  /api/purchase/transactions/<USER_ID>?dt=<DATE_REFERENCE></b>
<br>
<br>
Essa requisição trabalha com a busca em lote de registros. Os lotes serão retornados de 25 em 25, sendo indexado pela data de criação do ultimo registro do ultimo lote buscado.
Logo, para executar essa operação, passe sempre na primeira requisição o parametro "dt" vazio ou nulo. Caso haja mais de 25 registros, a API retornará o nó "dt"
o qual deverá ser passado nas próximas requisições para esse mesmo endpoint.

* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
{
  "status": {
    "cod": 200,
    "msg": "ok"
  },
  "body": {
    "transactions": {
      "data": [
        {
          "_id": "XXXXXXXXXXXXXXXXXXX1",
          "billing": "5XXXXXXXXXXXXXXXXXXX",
          "__v": 0,
          "type": "banking_billet",
          "paid": false,
          "totalPaid": 0,
          "totalPrice": 89,
          "status": "waiting",
          "items": [
            {
              "_id": "XXXXXXXXXXXXXXXXXXX3",
              "packageid": null,
              "amount": 5,
              "value": 5,
              "name": "Veiculo Basico"
            },
            {
              "_id": "XXXXXXXXXXXXXXXXXXX2",
              "packageid": null,
              "amount": 8,
              "value": 8,
              "name": "Veiculo Completo"
            }
          ],
          "createAt": "2018-04-09T04:26:13.084Z"
        },
        {
          "_id": "XXXXXXXXXXXXXXXXXXX1",
          "billing": "5XXXXXXXXXXXXXXXXXXX",
          "__v": 0,
          "type": "credit_card",
          "paid": true,
          "totalPaid": 5.5,
          "totalPrice": 5.5,
          "status": "paid",
          "items": [
            {
              "_id": "XXXXXXXXXXXXXXXXXXX2",
              "packageid": null,
              "amount": 1,
              "value": 5.5,
              "name": "Agregados"
            }
          ],
          "createAt": "2018-04-09T02:03:29.296Z"
        },
        {
          "_id": "XXXXXXXXXXXXXXXXXXXd",
          "billing": "5XXXXXXXXXXXXXXXXXXX",
          "__v": 0,
          "type": "credit_card",
          "paid": true,
          "totalPaid": 5.5,
          "totalPrice": 5.5,
          "status": "paid",
          "items": [
            {
              "_id": "XXXXXXXXXXXXXXXXXXXe",
              "packageid": null,
              "amount": 1,
              "value": 5.5,
              "name": "Agregados"
            }
          ],
          "createAt": "2018-04-09T01:58:56.740Z"
        },
        {
          "_id": "XXXXXXXXXXXXXXXXXXXd",
          "billing": "5XXXXXXXXXXXXXXXXXXX",
          "__v": 0,
          "type": "credit_card",
          "paid": false,
          "totalPaid": 0,
          "totalPrice": 5.5,
          "status": "new",
          "items": [
            {
              "_id": "XXXXXXXXXXXXXXXXXXXe",
              "packageid": null,
              "amount": 1,
              "value": 5.5,
              "name": "Agregados"
            }
          ],
          "createAt": "2018-04-09T01:57:55.509Z"
        },
        {
          "_id": "XXXXXXXXXXXXXXXXXXX3",
          "billing": "5XXXXXXXXXXXXXXXXXXX",
          "__v": 0,
          "type": "credit_card",
          "paid": false,
          "totalPaid": 0,
          "totalPrice": 0.6,
          "status": null,
          "items": [
            {
              "_id": "XXXXXXXXXXXXXXXXXXX4",
              "packageid": null,
              "amount": 1,
              "value": 0.6,
              "name": "Renajud"
            }
          ],
          "createAt": "2018-04-09T01:55:15.906Z"
        }
      ],
      "dt": null
    },
    "error": null
  }
}
*
*/
