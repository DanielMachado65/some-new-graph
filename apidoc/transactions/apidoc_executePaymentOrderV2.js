/**
* @api {post} /api/purchase/v2/:userid Executar Ordem de Pagamento V2
* @apiVersion 5.27.1
* @apiName ExecutePaymentV2
* @apiGroup Pagamento
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.
* @apiParam {String} userid ID do usuário.
* @apiParam {String} products Lista de produtos.
* @apiParam {String} products.packages Pacotes a serem comprados.
* @apiParam {String} products.packages.id ID do pacote.
* @apiParam {String} products.packages.amount Quantidade por pacote.
* @apiParam {String} products.packages.coupon ID do cupom de desconto caso seja um cupom válido para a consulta referida.
* @apiParam {String} products.queries Consultas a serem compradas.
* @apiParam {String} products.queries.code Código da consulta.
* @apiParam {String} products.queries.amount Quantidade por consulta.
* @apiParam {String} products.queries.coupon ID do cupom de desconto caso seja um cupom válido para a consulta referida.
* @apiParam {String} installments (Somente para pagamentos no cartão de crédito =>  Número de vezes que será parcelado. Obs: MAX 12 x).
* @apiParam {String} type Tipo de pagamento ("banking_billet" ou "credit_card").
* @apiParam {String} paymentToken (Somente para pagamentos no cartão de crédito =>  Token que será gerado pelo GerenciaNet para efetuar transação via cartão de crédito. <a href="https://dev.gerencianet.com.br/docs/pagamento-cartao">Clique aqui para ver a implementação</a>).

* @apiParamExample {json} Request-Example:
{
	"products" : {
    	"packages" : [{
        	"id" : "XXXXXXXXXXXXXXXXXXXXXXXXX6",
          	"amount" : 1
        }],
      	"queries" : [{
        	"code" : 99,
          	"amount" : 5,
            "coupon" : "XXXXXXXXXXXXXXXXXXXXXXXXX1"
        },
        {
        	"code" : 100,
          	"amount" : 8
        }]
    },
  	"installments" : 1,
  	"type" : "banking_billet"
}

* @apiDescription O parâmetro USER_ID deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX: /api/user/<USER_ID></b>
*<br>
<br>
Somente para os pagamentos utilizando o cartão de crédito, se deve utilizar o formato de documentação do iugu.js
<a href="https://dev.iugu.com/docs/iugu-js"> que pode ser encontrado aqui</a>
<br>
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
{
  "status": {
    "cod": 200,
    "msg": "ok"
  },
  "body": {
    "__v": 0,
    "billing": "XXXXXXXXXXXXXXXXXXXXXXXXX",
    "_id": "XXXXXXXXXXXXXXXXXXXXXXXXXb",
    "type": "banking_billet",
    "paid": false,
    "realPrice": 1492.7,
    "totalPaid": 0,
    "totalPrice": 1292.7,
    "status": null,
    "chargeId": null,
    "items": [
      {
        "_id": "XXXXXXXXXXXXXXXXXXXXXXXXXe",
        "packageid": "XXXXXXXXXXXXXXXXXXXXXXXXX6",
        "amount": 1,
        "value": 800,
        "name": "Pacote 1000"
      },
      {
        "_id": "XXXXXXXXXXXXXXXXXXXXXXXXXd",
        "packageid": null,
        "amount": 5,
        "value": 29.9,
        "name": "Veiculo Basico"
      },
      {
        "_id": "XXXXXXXXXXXXXXXXXXXXXXXXXc",
        "packageid": null,
        "amount": 8,
        "value": 42.9,
        "name": "Veiculo Completo"
      }
    ],
    "createAt": "2018-08-03T17:49:40.251Z"
  }
}
* @apiSuccessExample Error-Response:
*  HTTP/1.1 200 OK
{
  "status": {
    "cod": 410,
    "msg": "bad request"
  },
  "body": {
    "error": "Usuário inválido ou inexistente."
  }
}
*
*/
