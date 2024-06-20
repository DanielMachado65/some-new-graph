/**
* @api {get} /api/billing/user/:userid Consultar Tabela de Preço por Usuário
* @apiVersion 5.27.1
* @apiName PriceTableQueryUser
* @apiGroup Tabela de Preco
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.
* @apiParam {String} userId Id do usuário.
*
* @apiDescription O parâmetro USER_ID deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX:  /api/billing/user/<USER_ID></b>
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
{
  "status": {
    "cod": 200,
    "msg": "ok"
  },
  "body": {
    "_id": null,
    "template": [
      {
        "query": "Credito Completo",
        "price": "19.90",
        "querycode": 7
      },
      {
        "query": "Credito Simples",
        "price": "9.90",
        "querycode": 6
      },
      {
        "query": "Localizacao Completa",
        "price": "6.90",
        "querycode": 4
      },
      {
        "query": "Historico de Proprietarios",
        "price": "16.90",
        "querycode": 12
      },
      {
        "query": "Gravame Simples",
        "price": "9.90",
        "querycode": 15
      },
      {
        "query": "Leilao Simples",
        "price": "16.90",
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
        "price": "42.90",
        "querycode": 100
      },
      {
        "query": "Veiculo Basico",
        "price": "29.90",
        "querycode": 99
      },
      {
        "query": "Leilão + Dados do Veículo",
        "price": "18.90",
        "querycode": 18
      },
      {
        "query": "Histórico de Proprietários 2",
        "price": "4.99",
        "querycode": 22
      }
    ],
    "name": "default",
    "id": "XXXXXXXXXXXXXXXXXXXf0"
  }
}
*
*
*/
