/**
* @api {get} /api/invoice/summery/:id Resumo de Fatura
* @apiVersion 0.3.0
* @apiName InvoiceSummeryId
* @apiGroup Fatura
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.
*
* @apiParam {String} Id da fatura.
*
*@apiDescription O parâmetro USER_ID deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX:  /api/invoice/summery/<USER_ID></b>
*Retorna as principais informações da fatura referênciada.
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
{
  {
   "status":{
      "cod":200,
      "msg":"ok"
   },
   "body":[
      {
         "name":"Decodificador e Precificador",
         "value":4.99,
         "amount":1,
         "itemValue":4.99
      }
   ]
}
}
* @apiErrorExample Error-Response:
* HTTP/1.1 500 Invalid Parameters
{ 
  "InternalServerError":"Ops... Algo deu errado! Perdoe-nos pelo inconveniênte. Estamos analisando o problema que causou intermitência nessa requisição, aguarde...",
  "code": 500
}
* 
*/

