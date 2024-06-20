/**
* @api {get} /api/query/content/:name Buscar Consultas Disponíveis
* @apiVersion 5.27.1
* @apiName GetEnablesQueries
* @apiGroup Consultas
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.
*
* @apiSuccess {String} name  O name refere-se as tabelas de preço pós e pre-pago. Logo, a propriedade "name" poderá ser "default" (para consultas disponiveis para clientes pré-pago) ou "default_pos_paid" (para consultas disponíveis para clientes pós-pago)
*

* @apiDescription O parâmetro NAME deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX:  /api/query/content/<_NAME></b>

* @apiSuccessExample Success-Response:
{
  "status": {
    "cod": 200,
    "msg": "ok"
  },
  "body": [
    {
      "query": "Agregados",
      "price": "1.99",
      "querycode": 1
    },
    {
      "query": "Historico de KM",
      "price": "2.99",
      "querycode": 8
    },
    {
      "query": "Renajud",
      "price": "0.60",
      "querycode": 5
    },
    {
      "query": "Consulta Nacional",
      "price": "0.80",
      "querycode": 2
    },
    {
      "query": "Veiculo Completo",
      "price": "2.75",
      "querycode": 100
    },
    {
      "query": "Restricao Total",
      "price": "4.25",
      "querycode": 7
    },
    {
      "query": "Credito Simples",
      "price": "3.05",
      "querycode": 6
    },
    {
      "query": "Cadastro Completo",
      "price": "1.45",
      "querycode": 4
    },
    {
      "query": "Consulta de CCF",
      "price": "0.82",
      "querycode": 9
    },
    {
      "query": "Perda Total",
      "price": "1.00",
      "querycode": 10
    },
    {
      "query": "Roubo e Furto",
      "price": "1.00",
      "querycode": 11
    },
    {
      "query": "Historico de Proprietarios",
      "price": "1.00",
      "querycode": 12
    }
  ]
}
*
*/
