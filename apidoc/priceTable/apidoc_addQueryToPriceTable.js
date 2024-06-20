/**
* @apiIgnore Método acessível somente com privilégios de administrador.
* @api {post} /api/price-table/add-query/:pricetableid Adicionar Consulta à Tabela de Preço
* @apiVersion 5.27.1
* @apiName PriceTableAddQuery
* @apiGroup Tabela de Preco
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.
* @apiParam {String} pricetableid Nome da tabela de preço.
* @apiParam {String} querycode Código da consulta que deseja associar a uma tabela de preço ja existente.
* @apiParam {Object} apis
* @apiParam {String} apis.service ID do serviço
* @apiParam {String} apis.billingPrice preço de cobrança por serviço
*
* @apiDescription O parâmetro PRICE_TABLE_ID deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX:  /api/price-table/add-query/<PRICE_TABLE_ID></b>

* @apiParamExample {json} Request-Example:
  {
    "querycode" : 1,
    "apis" : [
       { "service" : "XXXXXXXX0b0c4d34c2", "billingPrice" : 0.05 },
       { "service" : "5XXXXXXXX55309021300d", "billingPrice" : 0.55 }
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
      "_id": "5a936125bXXXXXXbc89b4c88",
      "__v": 4,
      "template": [
        {...},
        {...},
        {...},
        {...}
      ],
      "name": "default_teste_table",
      "createAt": "2018-02-26T01:21:41.151Z"
    }
  }
*
* @apiError PriceTableAddQueryErrorBadRequest Código de consulta inválido
*
* @apiErrorExample Error-Response:
*  HTTP/1.1 410 Bad Request
  {
    "status": {
      "cod": 410,
      "msg": "bad request"
    },
    "body": "Consulta inexistente ou inválida."
  }
*
*
* @apiError PriceTableAddQueryErrorConflict A consulta já existe na tabela de preço referida
*
* @apiErrorExample Error-Response:
*  HTTP/1.1 409 Conflict
  {
    "status": {
      "cod": 409,
      "msg": "content already exists"
    },
    "body": "A consulta já existe na tabela de preço referida"
  }
*/
