/**
* @api {post} /api/purchase/:userid Executar Ordem de Pagamento
* @apiVersion 5.27.1
* @apiName ExecutePayment
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
        	"id" : "XXXXXXXXXXXXXXXXXXXXXX6",
          	"amount" : 1
        }],
      	"queries" : [{
        	"code" : 99,
          	"amount" : 5,
            "coupon" : "XXXXXXXXXXXXXXXXXXXXXX1"
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
Como percebido, será necessário a incorporação do script para geração do token com base nos dados do cartão.Copio o código necessário:<br>
 DESENVOLVIMENTO: <br>
 <textarea rows="10" cols="80" class="form-control"><script type='text/javascript'>var s=document.createElement('script');s.type='text/javascript';var v=parseInt(Math.random()*1000000);s.src='https://sandbox.gerencianet.com.br/v1/cdn/6b98e0eaed7d0046c5d2fb770719ab22/'+v;s.async=false;s.id='6b98e0eaed7d0046c5d2fb770719ab22';if(!document.getElementById('6b98e0eaed7d0046c5d2fb770719ab22')){document.getElementsByTagName('head')[0].appendChild(s);};$gn={validForm:true,processed:false,done:{},ready:function(fn){$gn.done=fn;}};</script></textarea>
 <br>
 <br>
 PRODUÇÃO:<br>
 <textarea rows="10" cols="80" class="form-control"><script type='text/javascript'>var s=document.createElement('script');s.type='text/javascript';var v=parseInt(Math.random()*1000000);s.src='https://api.gerencianet.com.br/v1/cdn/6b98e0eaed7d0046c5d2fb770719ab22/'+v;s.async=false;s.id='6b98e0eaed7d0046c5d2fb770719ab22';if(!document.getElementById('6b98e0eaed7d0046c5d2fb770719ab22')){document.getElementsByTagName('head')[0].appendChild(s);};$gn={validForm:true,processed:false,done:{},ready:function(fn){$gn.done=fn;}};</script></textarea>
<br>
<br>
<a href="https://api.olhonocarro.com.br/test">Clique aqui para visualizar o exemplo prático</a>
<br>
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
    "billing": "XXXXXXXXXXXXXXXXXXXXXX",
    "_id": "XXXXXXXXXXXXXXXXXXXXXX",
    "bankingBillet": {
      "link": "https://visualizacaosandbox.gerencianet.com.br/emissao/160599_6_MACA8/A4XB-160599-272390-DACA6",
      "barcode": "00000.00000 00000.000000 00000.000000 0 00000000000000"
    },
    "type": "banking_billet",
    "paid": false,
    "totalPaid": 0,
    "totalPrice": 89,
    "status": "waiting",
    "chargeId": "397727",
    "items": [
    {
      "_id": "XXXXXXXXXXXXXXXXXXXXXX3",
      "packageid": null,
      "amount": 5,
      "value": 5,
      "name": "Veiculo Basico"
    },
    {
      "_id": "XXXXXXXXXXXXXXXXXXXXXX2",
      "packageid": null,
      "amount": 8,
      "value": 8,
      "name": "Veiculo Completo"
    }
    ],
    "createAt": "2018-04-09T04:26:13.084Z"
  }
}
*
*/
