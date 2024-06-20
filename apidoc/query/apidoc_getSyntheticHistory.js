/**
* @api {get} /api/query/synthetic-history/:userid Buscar Histórico Sintético de Consultas
* @apiVersion 5.27.1
* @apiName GetSyntheticHistory
* @apiGroup Consultas
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.
*
* @apiSuccess {String} userid  ID do usuário
*

* @apiDescription O parâmetro USER_ID deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX:  /api/query/synthetic-history/<USER_ID></b>
*<br> Esta requisição terá como retorno o resumo das operações do usuário. Categorizado por tipos e total de consultas realizadas para cada tipo de consulta.

* @apiSuccessExample Success-Response:
{
  "status": {
    "cod": 200,
    "msg": "ok"
  },
  "body": [
    {
      "_id": {
        "refClass": "Agregados"
      },
      "totalQueries": 3
    },
    {
      "_id": {
        "refClass": "Renajud"
      },
      "totalQueries": 1
    }
  ],
}
*
*/
