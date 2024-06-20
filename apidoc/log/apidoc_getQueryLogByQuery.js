/**
* @api {get} /api/log/query/:queryid Busca Log por ID de Consulta
* @apiVersion 5.27.1
* @apiName LogQuery
* @apiGroup Log
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.
* @apiParam {String} queryId Id da consulta.
*
* @apiDescription O parâmetro queryid deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX:  /api/log/query/<QUERY_ID></b>
*<br> Essa requisição deverá ser feita, nos casos em que o usuário solicitar ver o erro pelo qual sua consulta veicular não foi executada com sucesso.
*<br> Para toda consulta realizada na API, o sistema gera um log, o qual carrega as informações pertinentes ao status dessa consulta, também guarda uma mensagem de erro, caso a consulta tenha falhado.
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
{
  "status": {
    "cod": 200,
    "msg": "ok"
  },
  "body": {
    "_id": "XXXXXXXXxxxxxxxxxxxx8",
    "__v": 0,
    "code": 0,
    "error": null,
    "status": true,
    "query": "XXXXXXXXxxxxxxxxxxxx7",
    "user": "xxxxxxxxxxxxxxxxxxxxx94",
    "createAt": "2018-08-01T13:52:02.346Z"
  }
}

* @apiErrorExample Error-Response:
*  HTTP/1.1 410 Bad Request
{
  "status": {
    "cod": 200,
    "msg": "ok"
  },
  "body": {
    "_id": "XXXXXXXX20c851c36",
    "__v": 0,
    "code": 998,
    "error": "Código de consulta inválido. Não foi possível recuperar o objeto de consulta para o código informado.",
    "status": false,
    "query": "XXXXXXXX20c851c35",
    "user": "XXXXXXXX98202b86b0427",
    "createAt": "2018-08-03T16:50:42.607Z"
  }
}
*
*
*/
