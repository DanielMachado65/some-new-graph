/**
* @api {post} /api/user/auth Autenticar Usuário
* @apiVersion 5.27.1
* @apiName GetUserAuth
* @apiGroup Usuario
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.

* @apiParam {String} username Username único (pode ser utilizado como chave de acesso pelo usuário).
* @apiParam {String} pass Senha de cadastro.
*
* @apiDescription O parâmetro email deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX: /api/user/add-user-interested/<EMAIL></b>
*

* @apiParamExample {json} Request-Example:
{
  "email" : "xxxxxxxxxxxxxxxx@teste.com.br"
  "pass" : "xxxxxxxxxxxxxx"
}

* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
{
  "status": {
    "cod": 200,
    "msg": "ok"
  },
  "body": {
    "token": " XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "user": {
      "_id": "5XXXXXXXXXXXXXXXXXX0473",
      "email": "XXXXXXXXXXXXXXXXXXXXXX@olhonocarro.com.br",
      "name": "XXXXXXXXXXXXXXXX"
    }
  }
}

*@apiSuccessExample Error-Response:
*HTTP/1.1 200 OK
{
  "status": {
    "cod": 404,
    "msg": "not found"
  },
  "body": "Usuário não encontrado."
}
*
*/
