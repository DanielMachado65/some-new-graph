/**
* @api {get} /api/user/:id Buscar Usuário pelo ID
* @apiVersion 5.27.1
* @apiName GetUser
* @apiGroup Usuario
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.

* @apiParam {String} userid ID do usuário.
*
* @apiDescription O parâmetro USER_ID deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX: /api/user/<USER_ID></b>
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
{
  "status": {
    "cod": 200,
    "msg": "ok"
  },
  "body": {
    "_id": "XXXXXXXXXXX",
    "email": "XXXXXXXXXXX@XXXXXXXXXXX.com.br",
    "cpf": "XXXXXXXXXXX",
    "company": null,
    "generalData": {
      "address": {
        "zipcode": null,
        "city": null,
        "state": null,
        "neighborhood": null,
        "street": null,
        "complement": null,
        "number": null
      },
      "phoneNumber1": 0,
      "phoneNumber2": 0,
      "birthDate": null
    },
    "security": {
      "whitelist": [],
      "blacklist": [],
    },
    "google": {
      "email": null
    },
    "facebook": {
      "email": null
    },
    "status": true,
    "createAt": "2017-12-22T19:06:11.409Z",
    "lastLogin": "2018-03-14T18:21:37.761Z",
    "type": 1
  }
}

*@apiSuccessExample Error-Response:
*HTTP/1.1 200 OK
{
  "AuthenticationError": "Acesso negado. Você não tem permissão para prosseguir com essa solicitação",
  "Code": 401
}
*
*/
