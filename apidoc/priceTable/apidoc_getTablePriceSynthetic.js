/**
* @api {get} /api/price-table/synthetic/:userid Busca Tabela de Preço Sintetica por Usuario
* @apiVersion 5.27.1
* @apiName GetPriceTableSynthetic
* @apiGroup Tabela de Preco
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.
* @apiParam {String} userid Id do usuário.
*
* @apiDescription O parâmetro USER_ID deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX:  /api/price-table/synthetic/<USER_ID></b>
*
*
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
      "query": "Agregados",
      "price": "999.00",
      "querycode": 1
    },
    {
      "query": "Historico de KM",
      "price": "999.00",
      "querycode": 8
    },
    {
      "query": "Renajud",
      "price": "999.00",
      "querycode": 5
    },
    {
      "query": "Consulta Nacional",
      "price": "999.00",
      "querycode": 2
    },
    {
      "query": "Restricao Total",
      "price": "19.90",
      "querycode": 7
    },
    {
      "query": "Credito Simples",
      "price": "9.90",
      "querycode": 6
    },
    {
      "query": "Cadastro Completo",
      "price": "6.90",
      "querycode": 4
    },
    {
      "query": "Consulta de CCF",
      "price": "999.00",
      "querycode": 9
    },
    {
      "query": "Perda Total",
      "price": "999.00",
      "querycode": 10
    },
    {
      "query": "Roubo e Furto",
      "price": "999.00",
      "querycode": 11
    },
    {
      "query": "Historico de Proprietarios",
      "price": "16.90",
      "querycode": 12
    },
    {
      "query": "Decodificador e Precificador",
      "price": "999.00",
      "querycode": 13
    },
    {
      "query": "Recall",
      "price": "9999.00",
      "querycode": 14
    },
    {
      "query": "Gravame Simples",
      "price": "9.90",
      "querycode": 15
    },
    {
      "query": "Leilao Simples",
      "price": "999.00",
      "querycode": 16
    },
    {
      "query": "Debitos e Multas",
      "price": "16.90",
      "querycode": 17
    },
    {
      "query": "Dados Cadastrais do Veiculo",
      "price": "9.90",
      "querycode": 98
    },
    {
      "query": "Veiculo Completo",
      "price": "39.90",
      "querycode": 100
    },
    {
      "query": "Consulta Estadual",
      "price": "999.00",
      "querycode": 3
    },
    {
      "query": "Veiculo Basico",
      "price": "24.90",
      "querycode": 99
    }
  ],
}
*
*
*/
