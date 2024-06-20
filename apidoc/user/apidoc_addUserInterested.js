/**
* @api {get} /api/user/add-user-interested/:email Usuarios Interessados
* @apiVersion 5.27.1
* @apiName GetUserInterested
* @apiGroup Usuario
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.
*
* @apiDescription O parâmetro email deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX: /api/user/add-user-interested/<EMAIL></b>
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
 {
  "status": {
    "cod": 200,
    "msg": "ok"
  },
  "body": {
    "status": true,
    "msg": null
  }
}

*@apiError UserInterestedError Limite atingido para o IP requisitante
*@apiSuccessExample Error-Response:
*HTTP/1.1 200 OK
{
  "status": {
    "cod": 410,
    "msg": "bad request"
  },
  "body": {
    "status": false,
    "msg": "Falhou!! 🤨 Percebemos que esse endereço de IP realizou o número máximo de consultas. Não será possível prosseguir com esta solicitação. 🤪"
  }
}
*/
