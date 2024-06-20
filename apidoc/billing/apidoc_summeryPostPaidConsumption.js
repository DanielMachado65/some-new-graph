/**
* @api {get} /api/billing/summery-post-paid-consumption/ Resumo do Consumo de Usuário Pós-pago
* @apiVersion 0.3.0
* @apiName BillingSummeryPostPaidConsumption
* @apiGroup Faturamento
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.
*
* @apiDescription É um modelo de retorno para uma consulta de consumo de Usuário Pós-pago.
* <br> <b>EX:  /api/billing/summery-post-paid-consumption/></b>
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
{
   "status":{
      "cod":200,
      "msg":"ok"
   },
   "body":[
      {
         "name":"ftestefilho",
         "email":"testefilho@teste.com.br",
         "consumption":17.8,
         "totalQueries":2,
         "query":"Dados Cadastrais do Veiculo",
         "creditsAvailable":999999982.2
      },
      {
         "name":"testeMae",
         "email":"testemae@teste.com.br",
         "consumption":133.5,
         "totalQueries":15,
         "query":"Dados Cadastrais do Veiculo",
         "creditsAvailable":9999999991.1
      }
   ]
}
*
*
*/
