/**
* @api {post} /api/coupon/ Geração de Cupom
* @apiVersion 5.27.1
* @apiName CouponsArquive
* @apiGroup Cupom de Desconto
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.
*
* @apiParam {Number} number numero do cupom.
* @apiParam {Number} discountPercentage Porcentagen do desconto.
* @apiParam {Number} minValueToApply Valor Mínimo para o Desconto.
* @apiParam {Number} limitUsage Limite de uso.
* @apiParam {Number} code Código do Cupom.
* @apiParam {Number} limitUsage Limite do Cupom.

* @apiParamExample {json} Request-Example:
{
  "number": 11,
  "rules": {
    "discountPercentage": 15,
    "minValueToApply": 50,
    "limitUsage": 10,
    "authorized": {
      "queries": [
        {
          "code": 1,
          "limit": 5
        },
        {
          "code": 8,
          "limit": 5
        }
      ]
    }
  }
}
*
* @apiDescription O retorno é um arquivo .xlsx de o nome 'cupons_olhonocarro.xlsx'
*
*/
