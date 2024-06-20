/**
* @api {post} /api/coupon/validate/:cuponCode Validar Cupom de Desconto
* @apiVersion 5.27.1
* @apiName CouponsValidation
* @apiGroup Cupom de Desconto
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.
*
* @apiParam {String} code Código do cupom de desconto.
* @apiParam {String} items Item que será aplicado o cupom de desconto.
* @apiParam {String} items.queries Consultas que serão adicionadas ao carrinho.
* @apiParam {String} items.queries.code Código da consulta.
* @apiParam {String} items.queries.amount Quantidade da consulta referida.
* @apiParam {String} items.packages Pacotes que serão adicionados ao carrinho.
* @apiParam {String} items.packages.id ID do pacote.
* @apiParam {String} items.packages.amount Quantidade do pacote referido.
*
* @apiDescription O parâmetro cuponCode deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX:  /api/coupon/validate/<cuponCode></b>
*
* @apiParamExample {json} Request-Example:
{
	"items":{
        "queries":[
           { "code" : 1 , "amount" : 1},
           { "code" : 8 , "amount" : 1},
        	 { "code" : 99 , "amount" : 30}
      	],
      	"packages" : [
          	{ "id" : "XXXXXXXXXXXXXXX6",
               "amount" : 5
            }
        ]
    }
}
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
{
  "status": {
    "cod": 200,
    "msg": "ok"
  },
  "body": {
    "data": {
      "result": {
        "queries": [
          {
            "code": 1,
            "haveDiscount": true,
            "msg": null,
            "finalPrice": 4.95,
            "discountData": {
              "discountedValue": 4.95,
              "coupon": "XXXXXXXXXXXXXXXXXXXXXXXXX",
              "discountPercentage": 10,
              "fixedDiscountValue": 0
            }
          },
          {
            "code": 8,
            "haveDiscount": true,
            "msg": null,
            "finalPrice": 2.69,
            "discountData": {
              "discountedValue": 2.69,
              "coupon": "XXXXXXXXXXXXXXXXXXXXXXXXX",
              "discountPercentage": 10,
              "fixedDiscountValue": 0
            }
          },
          {
            "code": 99,
            "haveDiscount": true,
            "msg": null,
            "finalPrice": 135,
            "discountData": {
              "discountedValue": 135,
              "coupon": "XXXXXXXXXXXXXXXXXXXXXXXXX",
              "discountPercentage": 10,
              "fixedDiscountValue": 0
            }
          }
        ],
        "packages": [
          {
            "packageid": "XXXXXXXXXXXXXXXXXXXXXXXXX",
            "haveDiscount": true,
            "msg": null,
            "finalPrice": 4500,
            "discountData": {
              "discountedValue": 4500,
              "coupon": "XXXXXXXXXXXXXXXXXXXXXXXXX",
              "discountPercentage": 10,
              "fixedDiscountValue": 0
            }
          }
        ],
        "totalDiscountedPrice": "4642.64",
        "totalPrice": "5158.49"
      },
      "status": true
    },
    "code": 200,
    "error": null
  }
}
*
*
* @apiSuccessExample Error-Response:
*  HTTP/1.1 200 OK
{
  "status": {
    "cod": 200,
    "msg": "ok"
  },
  "body": {
    "data": {
      "result": null,
      "status": false,
      "msg": "O limite de uso desse cupom foi atingido"
    },
    "code": 200,
    "error": null
  }
}
*
* @apiError CoupouValidateError Parâmetros de entrada inválidos
* @apiErrorExample Error-Response:
*  HTTP/1.1 404 Not Found
  {
    "status": {
      "cod": 405,
      "msg": "invalid parameters"
    },
    "body": null
  }
*/
