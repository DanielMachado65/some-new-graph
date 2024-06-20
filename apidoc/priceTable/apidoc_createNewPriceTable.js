/**
* @apiIgnore Método acessível somente com privilégios de administrador.
* @api {post} /api/price-table/new Criar Tabela de Preço
* @apiVersion 5.27.1
* @apiName PriceTableCreate
* @apiGroup Tabela de Preco
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.
* @apiParam {String} name Nome da tabela de preço.
* @apiParam {Object} template Objeto utilizado para criar o contexto da tabela de preço com base nas consultas que serão contidas na tabela.
* @apiParam {Number} template.querycode Código da consulta
*
* @apiParamExample {json} Request-Example:
  {
  	"name" : "default_price_table",
    	"template" : [
        {
        	"querycode" : "1",
          "apis" : [ { "service" : "5a6f2d870f8e940b0c4d34c2", "billingPrice" : 0.5 } ]
        }
      ]
  }

* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
{
  "status": {
    "cod": 200,
    "msg": "ok"
  },
  "body": {
    "__v": 0,
    "_id": "5aa5c7fa9755c82f54d466cc",
    "template": [
      {
      "_id": "5aa5c7fa9755c82f54d466cd",
      "totalPrice": 0.8,
      "querycode": 1
      }
    ],
    "name": "default_teste",
    "createAt": "2018-03-12T00:21:14.338Z"
  }
}
* @apiError PriceTableCreateErrorBadRequest Tabela de preço existente
*
* @apiErrorExample Error-Response:
*  HTTP/1.1 410 Bad Request
  {
    "status": {
      "cod": 200,
      "msg": "ok"
    },
    "body": {
      "err": "Já existe uma tabela de preço com o nome especificado."
    }
  }
*
*
*
*
*/
