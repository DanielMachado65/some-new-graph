/**
* @api {get} /api/price-table/:pricetableid Busca Tabela de Preço por ID
* @apiVersion 5.27.1
* @apiName GetPriceTableById
* @apiGroup Tabela de Preco
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.
* @apiParam {String} priceTableId Id da tabela de preço.
*
* @apiDescription O parâmetro PRICE_TABLE_ID deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX:  /api/billing/change-user-price-table/<PRICE_TABLE_ID></b>
*
* @apiDescription O parâmetro p deve ser passado no formato "Query String" de acordo com a implementação REST.
* <br> <b>EX:  /api/price-table/<PRICE_TABLE_ID></b>
*
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
      "_id": "XXXXXXXXXXXXXXXXXXXXXX0",
      "__v": 0,
      "template": [
        {
          "_id": "XXXXXXXXXXXXXXXXXXXXXX3",
          "totalPrice": 1.99,
          "querycode": 1
        },
        {
          "_id": "XXXXXXXXXXXXXXXXXXXXXX1",
          "totalPrice": 2.99,
          "querycode": 8
        }
      ],
      "name": "default",
      "createAt": "2018-01-31T20:17:46.611Z"
    }
  }
*
*
*/
