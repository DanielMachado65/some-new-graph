/**
* @api {get} /api/log/user/:userid Busca Log por ID de Usuário
* @apiVersion 5.27.1
* @apiName LogUser
* @apiGroup Log
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.
* @apiParam {String} userId Id do usuário.
*
* @apiDescription O parâmetro userid deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX:  /api/log/user/<USER_ID></b>
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
  "body": [
    {
      "_id": "XXXXXXXe2b5cd12320c851c36",
      "__v": 0,
      "code": 998,
      "error": "Código de consulta inválido. Não foi possível recuperar o objeto de consulta para o código informado.",
      "status": false,
      "query": "XXXXXXXe2b5cd12320c851c35",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-08-03T16:50:42.607Z"
    },
    {
      "_id": "XXXXXXXc7b5cd12320c851c34",
      "__v": 0,
      "code": 998,
      "error": "Código de consulta inválido. Não foi possível recuperar o objeto de consulta para o código informado.",
      "status": false,
      "query": "XXXXXXXc7b5cd12320c851c33",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-08-03T16:50:15.916Z"
    },
    {
      "_id": "XXXXXXXc4b5cd12320c851c32",
      "__v": 0,
      "code": 998,
      "error": "Código de consulta inválido. Não foi possível recuperar o objeto de consulta para o código informado.",
      "status": false,
      "query": "XXXXXXXc4b5cd12320c851c31",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-08-03T16:50:12.964Z"
    },
    {
      "_id": "XXXXXXXbbb5cd12320c851c30",
      "__v": 0,
      "code": 998,
      "error": "Código de consulta inválido. Não foi possível recuperar o objeto de consulta para o código informado.",
      "status": false,
      "query": "XXXXXXXbbb5cd12320c851c2f",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-08-03T16:50:03.837Z"
    },
    {
      "_id": "XXXXXXXa02227f86c5e9f4e6b",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXXXXXXa02227f86c5e9f4e6a",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-07-27T20:20:48.384Z"
    },
    {
      "_id": "XXXXXXX588b8f5f6bedaf31d9",
      "__v": 0,
      "code": 204,
      "error": null,
      "status": true,
      "query": "XXXXXXX588b8f5f6bedaf31d8",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-07-27T20:19:36.722Z"
    },
    {
      "_id": "XXXXXXXXXXXXXXXXXXXX6",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXXXXXXXXXXXXXXXXXXX5",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-07-27T15:45:33.208Z"
    },
    {
      "_id": "XXXXXXXXXXXXXX8",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXXXXXXXXXXXXX7",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-07-25T21:58:56.556Z"
    },
    {
      "_id": "XXX0daXXXXXXXXXXXX95dd",
      "__v": 0,
      "code": 0,
      "error": "Consulta momentaneamente indisponível, nossa área técnica já está atuando para resolução do problema. Realize novamente a pesquisa dentro de alguns minutos, caso precise entre em contato conosco via chat-online.",
      "status": false,
      "query": "XXX0da1b3XXXXXXXXXXXXXb095dc",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-07-19T18:36:11.803Z"
    },
    {
      "_id": "XXX0afe4980XXXXXXXXXXXXXXXXXbf",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXX0afe4980a3XXXXXXXXXXXXXbe",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-07-19T15:36:04.806Z"
    },
    {
      "_id": "XXX0a36c27441XXXXXXXXXXXXX5517",
      "__v": 0,
      "code": 204,
      "error": null,
      "status": true,
      "query": "XXX0a36b27441XXXXXXXXXXX516",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-07-19T14:42:52.008Z"
    },
    {
      "_id": "XXX087XXXXXXXXXXXXXX5e",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXX087XXXXXXXXXXXXXX5d",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-07-19T12:43:06.880Z"
    },
    {
      "_id": "XXX086998b4XXXXXXXXXXXXXa4b",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXX08699XXXXXXXXXXX4a",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-07-19T12:39:53.883Z"
    },
    {
      "_id": "XXXXbXXXXXXXXXXXb",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXXXbXXXXXXXXXXXa",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-07-05T21:20:18.615Z"
    },
    {
      "_id": "XXXX881ab634749059d98f9",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXXX881ab634749059d98f8",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-07-05T21:07:13.464Z"
    },
    {
      "_id": "XXXXXXXXXXXX1",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXXXXXXXXXXX0",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-06-21T23:16:59.934Z"
    },
    {
      "_id": "XXXXXXXXXXXXc",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXXXXXXXXXXXb",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-05-17T16:46:58.718Z"
    },
    {
      "_id": "XXXXXXXXXXXXc",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXXXXXXXXXXXb",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-05-15T20:29:44.173Z"
    },
    {
      "_id": "XXXXXXXXXXXXa",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXXXXXXXXXXX9",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-05-15T18:26:33.081Z"
    },
    {
      "_id": "XXXXXXXXXXXX7",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXXXXXXXXXXX6",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-05-15T17:27:26.356Z"
    },
    {
      "_id": "XXXXXXXXXXXX5",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXXXXXXXXXXX4",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-05-15T17:23:41.605Z"
    },
    {
      "_id": "XXXXXXXXXXXX8",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXXXXXXXXXXX7",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-05-15T17:22:52.439Z"
    },
    {
      "_id": "XXXXXXXXXXXX8",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXXXXXXXXXXX7",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-05-15T11:29:54.348Z"
    },
    {
      "_id": "XXXXXXXXXXXX7",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXXXXXXXXXXX6",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-05-13T13:37:28.258Z"
    },
    {
      "_id": "XXXXXXXXXXXX6",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXXXXXXXXXXX5",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-05-09T02:57:21.630Z"
    },
    {
      "_id": "XXXXXXXXXXXXXXXX3",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXXXXXXXXXXXXXXX2",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-05-09T02:54:24.530Z"
    },
    {
      "_id": "XXXXXXXXXXXXXXXX2",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXXXXXXXXXXXXXXX1",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-05-03T15:09:32.425Z"
    },
    {
      "_id": "XXXXXXXXXXXXXXXX4",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXXXXXXXXXXXXXXX3",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-04-30T19:48:16.585Z"
    },
    {
      "_id": "XXXXXXXXXXXXXXXXf",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXXXXXXXXXXXXXXXe",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-04-30T15:37:55.897Z"
    },
    {
      "_id": "XXXXXXXXXXXXXXXX5",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXXXXXXXXXXXXXXX4",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-04-30T13:54:10.734Z"
    },
    {
      "_id": "XXXXXXXXXXXXXXXX2",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXXXXXXXXXXXXXXX1",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-04-30T13:53:19.270Z"
    },
    {
      "_id": "XXXXXXXXXXXXXXXXd",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXXXXXXXXXXXXXXXc",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-04-30T13:50:51.184Z"
    },
    {
      "_id": "XXXXXXXXXXXXXXXXc",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": false,
      "query": "XXXXXXXXXXXXXXXXb",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-04-25T21:04:53.335Z"
    },
    {
      "_id": "XXXXXXXXXXXXXXXX4",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": false,
      "query": "XXXXXXXXXXXXXXXX3",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-04-25T20:16:49.631Z"
    },
    {
      "_id": "XXXXXXXXXXXXXXXXc",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXXXXXXXXXXXXXXXb",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-04-24T17:08:04.586Z"
    },
    {
      "_id": "XXXXXXXXXXXXXXXX3",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXXXXXXXXXXXXXXX2",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-03-27T19:39:31.592Z"
    },
    {
      "_id": "XXXXXXXXXXXXXXXXc",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXXXXXXXXXXXXXXXb",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-03-26T13:56:29.110Z"
    },
    {
      "_id": "XXXXXXXXXXXXXXXXXX9",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXXXXXXXXXXXXXXXXX8",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-03-26T13:45:28.663Z"
    },
    {
      "_id": "XXXXXXXXXXXXXXXXXXe",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXXXXXXXXXXXXXXXXXd",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-03-26T13:38:30.450Z"
    },
    {
      "_id": "XXXb8f13a67e2cf18777d62ca",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXXb8f13a67e2cf18777d62c9",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-03-26T13:10:18.712Z"
    },
    {
      "_id": "XXXb3dd66a1b7d7189aeca2fc",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXXb3dd66a1b7d7189aeca2fb",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-03-22T16:44:22.600Z"
    },
    {
      "_id": "XXXb3d7de67e2cf18777d62c8",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXXb3d7de67e2cf18777d62c7",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-03-22T16:20:46.440Z"
    },
    {
      "_id": "XXXXXXXXXXXXXXXXXXd",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXXXXXXXXXXXXXXXXXc",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-03-21T16:34:42.739Z"
    },
    {
      "_id": "XXXXXXXXXXXXXXXXXXc",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXXXXXXXXXXXXXXXXXb",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-02-23T14:34:47.451Z"
    },
    {
      "_id": "XXXXXXXXXXXXXXXXXX5",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXXXXXXXXXXXXXXXXX4",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-02-17T13:06:13.054Z"
    },
    {
      "_id": "XXXXXdc5f97bbf1300bba363",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXXXXdc5f97bbf1300bba362",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-02-15T17:05:09.733Z"
    },
    {
      "_id": "XXXXXd79f4a9c769301dd580",
      "__v": 0,
      "code": 0,
      "error": "Cannot read property 'rawData' of undefined",
      "status": false,
      "query": "XXXXXd79f4a9c769301dd57f",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-02-15T17:03:53.640Z"
    },
    {
      "_id": "XXXXXd12172fa88bdc7df384",
      "__v": 0,
      "code": 0,
      "error": "Cannot read property 'rawData' of undefined",
      "status": false,
      "query": "XXXXXd12172fa88bdc7df383",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-02-15T17:02:10.782Z"
    },
    {
      "_id": "XXXXXceff500b483441a46d8",
      "__v": 0,
      "code": 0,
      "error": "Cannot read property 'rawData' of undefined",
      "status": false,
      "query": "XXXXXceff500b483441a46d7",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-02-15T17:01:35.920Z"
    },
    {
      "_id": "XXXXXa735bf5c0d2f0a49995",
      "__v": 0,
      "code": 0,
      "error": "Cannot read property 'rawData' of undefined",
      "status": false,
      "query": "XXXXXa725bf5c0d2f0a49994",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-02-15T16:50:59.080Z"
    },
    {
      "_id": "XXXXX5cb6XXXXXXXXXXXXXXXX85",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXXXX5cb6XXXXXXXXXXXXXXXX84",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-02-15T16:31:07.913Z"
    },
    {
      "_id": "XXXXXXXX76XXXXXXXXXXXXXXXX80",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXXXXXXX76XXXXXXXXXXXXXXXX7f",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-02-15T16:30:31.598Z"
    },
    {
      "_id": "XXX75bbdXXXXXXXXXXXXXXX3",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXX75bbdXXXXXXXXXXXXXXX2",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-02-03T13:40:32.688Z"
    },
    {
      "_id": "XXXXXX03cdc0XXXXXXXXXXXXXXXe3",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXXXXX03cdc0XXXXXXXXXXXXXXXe2",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-01-13T13:04:13.465Z"
    },
    {
      "_id": "XXX564e58fcXXXXXXXXXXXXXXXa9f",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXX564e58fcXXXXXXXXXXXXXXXa9e",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-01-10T17:33:12.040Z"
    },
    {
      "_id": "XXX563ff8fcXXXXXXXXXXXXXXXa9d",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXX563ff8fcXXXXXXXXXXXXXXXa9c",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-01-10T16:31:52.365Z"
    },
    {
      "_id": "XXX54b200c1XXXXXXXXXXXXXXXab4",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXX54b200c1XXXXXXXXXXXXXXXab3",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-01-09T12:13:52.114Z"
    },
    {
      "_id": "XXX54b1cf6XXXXXXXXXXXXXXX748ac13",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXX54b1cf6XXXXXXXXXXXXXXX748ac12",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-01-09T12:13:03.465Z"
    },
    {
      "_id": "XXX54aff5XXXXXXXX1113188",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXX54aff5XXXXXXXX1113187",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-01-09T12:05:09.659Z"
    },
    {
      "_id": "XXX54afd40XXXXXXXX62f6",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXX54afd40XXXXXXXX62f5",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-01-09T12:04:36.359Z"
    },
    {
      "_id": "XXX54ac7a0XXXXXXXX62f4",
      "__v": 0,
      "code": 0,
      "error": null,
      "status": true,
      "query": "XXX54ac7a0XXXXXXXX62f3",
      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "createAt": "2018-01-09T11:50:18.349Z"
    }
  ]
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
