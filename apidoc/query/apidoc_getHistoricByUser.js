/**
* @api {get} /api/query/historic-by-user/:userid Buscar Histórico de Consultas por Usuário
* @apiVersion 5.27.1
* @apiName GetHistoricQueries
* @apiGroup Consultas
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.
*
* @apiSuccess {String} userid  ID do usuário
*

* @apiDescription O parâmetro USER_ID deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX:  /api/query/historic-by-user/<USER_ID></b>

* @apiDescription ATENÇÃO: Este método retorna os valores em lotes. Lotes de 25 consultas. Sempre observar o parametro de retorno "dateReference",
* pois quando o mesmo for retornado da API, ele deverá ser passado na próxima consulta, ára trazer o próximo lote de 25 consultas com base na data.

* @apiSuccessExample Success-Response:
  {
    "status": 200,
    "body": {
      "dateReference": null,
      "queries": [
        {
          "_id": "XXXXXXXXXXX2388db",
          "code": 1,
          "status": true,
          "refClass": "Agregados",
          "keys": {
            "cnpj": null,
            "cpf": null,
            "renavam": null,
            "motor": null,
            "chassi": null,
            "placa": "XXXXX"
          },
          "createAt": "2018-03-08T22:10:58.421Z"
        },
        {...},
        {...},
        {...}
      ],
    }
  }
*
*/
