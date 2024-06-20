/**
* @api {post} /api/user/new Criar Novo Usuário
* @apiVersion 5.27.1
* @apiName CreateUser
* @apiGroup Usuario
*
* @apiParam {String} username Username único (pode ser utilizado como chave de acesso pelo usuário).
* @apiParam {String} email E-mail de cadastro utilizado pelo usuário (pode ser utilizado como chave de acesso pelo usuário).
* @apiParam {String} cpf CPF do usuário.
* @apiParam {String} pass Senha de cadastro.
* @apiParam {String} name Nome.
* @apiParam {String} type O tipo de usuário (Pré-pago = 1, Pós-pago= 5).
* @apiParam {String} company Somente para clientes PJ
* @apiParam {String} company.cnpj Cnpj da empresa
* @apiParam {String} company.socialName Razão social da empresa
*
*
* @apiParamExample {json} Request-Example:
{
  	"name" : "Fulano da Silva",
  	"cpf" : "11XXXXXX0669",
  	"email" : "XXXXXXn@hotmail.com",
  	"pass" :  "123456",
    "type" : 5,
  	"company" : {
        "cnpj" : "1231231231233",
    	  "socialName" : "XXXXXXXX LTDA"
    }
}

* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
{
  "status": {
    "cod": 200,
    "msg": "ok"
  },
  "body": {
    "user": {
      "__v": 0,
      "name": "Fulano da Silva",
      "email": "XXXXXXn@hotmail.com",
      "_id": "5aba4af0cfe9e0742c8116e5",
      "company": {
        "socialName": "XXXXX LTDA",
        "cnpj": 1231231231233
      },
      "generalData": {
        "birthDate": null,
        "phoneNumber2": 0,
        "phoneNumber1": 0,
        "address": {
          "number": null,
          "complement": null,
          "street": null,
          "neighborhood": null,
          "state": null,
          "city": null,
          "zipcode": null
        }
      },
      "security": {
        "blacklist": [],
        "whitelist": [],
      },
      "google": {
        "email": null,
        "name": null,
        "token": null,
        "id": null
      },
      "facebook": {
        "email": null,
        "name": null,
        "token": null,
        "id": null
      },
      "status": true,
      "createAt": "2018-03-27T13:45:20.333Z",
      "lastLogin": "2018-03-27T13:45:20.333Z",
      "type": 5,
      "billing": null,
      "cpf": XXXXXXXX0639,
    },
    "token": "eyJhbGciOiXXXXXXXXXXVCJ9.eyJzZWNyZXQiOlsiYzE5MGYxMWEzMmRiYzY3ZWVjNDY1YTMyMGQ3ZmUxMWQiXSwiaWF0IjoxNTIyMTU4MzIwLCJleHAiOjE1MjIyNDQ3MjB9.eBk2KLS6KQbrZslg7F-G1I_BXZNJOTuCy3KgeFq2NOo"
  }
}

* @apiError CreateUserError Parâmetros de entrada inválidos
* @apiErrorExample Error-Response:
* HTTP/1.1 410 BAD REQUEST
{
  "status": {
    "cod": 410,
    "msg": "bad request"
  },
  "body": "Já existe uma conta cadastrada o username informado."
}

*

* @apiError CreateUserError Parâmetros de entrada inválidos
* @apiErrorExample Error-Response:
* HTTP/1.1 410 BAD REQUEST
{
  "status": {
    "cod": 410,
    "msg": "bad request"
  },
  "body": "Já existe uma conta cadastrada para o CPF informado."
}
*/
