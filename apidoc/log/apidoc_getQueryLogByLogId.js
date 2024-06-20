/**
* @api {get} /api/log/:logid Busca Log por ID
* @apiVersion 5.27.1
* @apiName Log
* @apiGroup Log
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.
* @apiParam {String} logId Id do LogId.
*
* @apiDescription O parâmetro LOG_ID deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX:  /api/log/<LOG_ID></b>
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
      "_id": "XXXXXXXXXXXXXXXXXXXXXXX1",
      "error": "Créditos insuficiente",
      "status": false,
      "query": "XXXXXXXXXXXXXXXXXXXXXXX0",
      "user": "xxxxxxxxxxxxxxxxxxxxxxx5",
      "createAt": "2018-03-08T22:06:18.878Z"
    }
  }
*
*
*/
