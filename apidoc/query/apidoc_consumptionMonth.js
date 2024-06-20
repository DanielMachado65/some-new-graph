/**
* @api {get} /api/query/consumption-month/:id Buscar Histórico de Consumo mensal por Usuário
* @apiVersion 5.27.1
* @apiName ConsumptionMonth
* @apiGroup Consultas
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.
*
* @apiSuccess {String} userid  ID do usuário
*

* @apiDescription O parâmetro USER_ID deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX:  /api/query/consumption-month/<USER_ID></b>

* @apiSuccessExample Success-Response:
  {
    {
  "status": 200,
  "body": {
    "queries": [
      {
        "_id": "5XXXXXXXXXXXXXXXXXXXXXXXb",
        "code": 1,
        "status": true,
        "refClass": "Agregados",
        "keys": [
          "fan3137"
        ],
        "createAt": "2018-02-23T14:34:47.286Z",
        "responseJSON": true
      },
      {
        "_id": "XXXXXXXXXXXXXXXXXXXXXXa4",
        "code": 0,
        "status": true,
        "refClass": "Credito Simples",
        "keys": [
          "02785357710"
        ],
        "createAt": "2018-02-17T13:06:13.037Z",
        "responseJSON": true
      },
      {
        "_id": "5a85b5cbXXXXXXXXXXXX84",
        "code": 1,
        "status": true,
        "refClass": "Agregados",
        "keys": [
          "fan3137"
        ],
        "createAt": "2018-02-15T16:31:07.776Z",
        "responseJSON": true
      },
      {
        "_id": "5a85b5a7XXXXXXXXXXXX7f",
        "code": 1,
        "status": true,
        "refClass": "Agregados",
        "keys": [
          "fan3137"
        ],
        "createAt": "2018-02-15T16:30:31.438Z",
        "responseJSON": true
      }
    ]
  }
}
  }
*
*/
