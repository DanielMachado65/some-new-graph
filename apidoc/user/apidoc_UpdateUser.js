/**
* @api {patch} /api/user/:userid Atualizar Dados do Usuário
* @apiVersion 5.27.1
* @apiName UpadteUser
* @apiGroup Usuario
*
* @apiParam {String} email E-mail de cadastro utilizado pelo usuário (pode ser utilizado como chave de acesso pelo usuário).
* @apiParam {String} cpf CPF do usuário.
* @apiParam {String} pass Senha de cadastro.
* @apiParam {String} name Nome.
* @apiParam {String} type O tipo de usuário (Pré-pago = 1, Pós-pago= 5).
* @apiParam {String} company Somente para clientes PJ
* @apiParam {String} company.cnpj Cnpj da empresa
* @apiParam {String} company.socialName Razão social da empresa
* @apiParam {String} generalData Dados gerais do usuario
* @apiParam {String} generalData.address Dados de endereço
* @apiParam {String} generalData.address.zipcode CEP
* @apiParam {String} generalData.address.city Cidade
* @apiParam {String} generalData.address.state Estado
* @apiParam {String} generalData.address.neighborhood Bairro
* @apiParam {String} generalData.address.street Rua
* @apiParam {String} generalData.address.complement Complemento
* @apiParam {String} generalData.address.number Número
* @apiParam {String} generalData.phoneNumber1 Telefone 1
* @apiParam {String} generalData.phoneNumber2 Telefone 2
* @apiParam {String} generalData.birthDate Data de nascimento
*
* @apiDescription O parâmetro USER_ID deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX: /api/user/<USER_ID></b>
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
  },
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
    "name": "Diego Moura 2",
    "email": "desenv@olhonocarro.com.br",
    "cpf": 12345678900,
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
    "type": 1,
    "lastLogin": "2018-03-28T03:10:52.896Z",
    "createAt": "2017-12-22T19:02:21.007Z",
    "status": true
  }
}

* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
{
  "status": {
    "cod": 200,
    "msg": "ok"
  },
  "body": "Já existe uma conta cadastrada com o e-mail informado."
}
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
{
  "status": {
    "cod": 200,
    "msg": "ok"
  },
  "body": "Já existe uma conta cadastrada o username informado."
}

* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
{
  "status": {
    "cod": 200,
    "msg": "ok"
  },
  "body": "Já existe uma conta cadastrada o CPF informado."
}
*/
