/**
* @apiIgnore Método acessível somente com privilégios de administrador.
* @api {get} /api/service/new/:code Criar Novo Serviço
* @apiVersion 5.27.1
* @apiName CreateNewService
* @apiGroup Servico
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.
* @apiParam {Number} code Código do serviço
*
* @apiDescription O parâmetro CODE deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX:  /api/service/new/<CODE></b>
*
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
  {
    "status": {
      "cod": 200,
      "msg": "ok"
    },
    "body": {
      "__v": 0,
      "_id": "5aa7114fbb92df3c2cb99547",
      "switching": [],
      "hasAutoSwitching": false,
      "supplier": {
        "supplierCode": 1,
        "name": "Olho no Carro"
      },
      "name": "Base Nacional",
      "code": 3,
      "status": true,
      "createAt": "2018-03-12T23:46:23.739Z"
    }
  }
*
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
  {
    "status": {
      "cod": 200,
      "msg": "ok"
    },
    "body": "O serviço solicitado já existe no banco de dados."
  }
*
* @apiError CreateServiceError Parâmetros de entrada inválidos
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
  {
    "status": {
      "cod": 200,
      "msg": "ok"
    },
    "body": "O serviço não existe ou não foi previamente parametrizado na API."
  }
*
*/
