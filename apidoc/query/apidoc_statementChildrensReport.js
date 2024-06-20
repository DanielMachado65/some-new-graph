/**
* @api {get} /api/query/statement-childrens/report/:userid Relatório das Consultas dos Clientes Filhos
* @apiVersion 0.3.0
* @apiName StatementChildrensReport
* @apiGroup Consultas
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.
*
* @apiParam {String} userid ID do cliente mãe
*
* @apiDescription O parâmetro USER_ID deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX:  /api/query/statement-childrens/report/<USER_ID></b>
*<br>Faz o download em formato .xlsx(EXCEL) do histórico referente mês escolhido dos filhos desse id de cliente mãe  .

* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
{
   "status":{
      "cod":200,
      "msg":"ok"
   },
   "body": null
}
*
@apiErrorExample Error-Response:
* HTTP/1.1 500 Invalid-Parameters
{
   "InternalServerError":"Ops... Algo deu errado! Perdoe-nos pelo inconveniênte. Estamos analisando o problema que causou intermitência nessa requisição, aguarde...",
   "code":500
}
*/
