/**
* @api {get} /api/invoice/:id Fatura Completa
* @apiVersion 0.3.0
* @apiName InvoiceId
* @apiGroup Fatura
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.
*
* @apiParam {String} id  Id da fatura.
*
*@apiDescription O parâmetro USER_ID deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX:  /api/invoice/<USER_ID></b>
*Retorna todas as informações referentes a fatura referênciada.
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
  {
   "status":{
      "cod":200,
      "msg":"ok"
   },
   "body":{
      "_id":"5b7xxxxxxxxxxxxxxx",
      "__v":2,
      "accumulatedInvoices":[

      ],
      "notification":{
         "lastNotificationDate":null,
         "hasBeenNotified":false,
         "sentEmails":0
      },
      "paymenteDate":null,
      "value":4.99,
      "status":"Cancelada",
      "consumptionStatementLote":[
         {
            "_id":"5b7c4decxxxxxxxxxxxxxxxxxd",
            "__v":0,
            "payday":null,
            "value":4.99,
            "status":false,
            "querycode":13,
            "query":{
               "name":"Decodificador e Precificador",
               "_id":"5b7c4debxxxxxxxxxxxxxxxxx9",
               "keys":{
                  "cnpj":null,
                  "cpf":null,
                  "uf":null,
                  "renavam":"00457410167",
                  "motor":"TJDACJ499924",
                  "chassi":"8AFTZZFHCCJ499924",
                  "placa":"FAN3137"
               },
               "createAt":"21/08/2018 14:37:47"
            },
            "billing":"xxxxxxxxxxxxxxxxx",
            "createAt":"2018-08-21T17:37:48.909Z"
         }
      ],
      "payment":null,
      "billing":"xxxxxxxxxxxxxxxxx",
      "expirationDate":"2018-09-01T02:59:59.000Z",
      "initialDate":"2018-08-01T03:00:00.000Z",
      "createAt":"2018-08-21T17:37:48.458Z"
   }
}

* @apiErrorExample Error-Response:
* HTTP/1.1 500 Invalid Parameters
{
   "InternalServerError":"Ops... Algo deu errado! Perdoe-nos pelo inconveniênte. Estamos analisando o problema que causou intermitência nessa requisição, aguarde...",
   "code":500
}
* 
*/

