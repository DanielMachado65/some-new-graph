/**
* @api {get} /api/billing/summery-extract/:userid Resumo do Extrato de Consumo
* @apiVersion 5.27.1
* @apiName BillingSummeryExtract
* @apiGroup Faturamento
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.
* @apiParam {String} userId Id do usuário.
*
* @apiDescription O parâmetro deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX:  /api/billing/summery-extract/<USER_ID></b>
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
{
  "status": {
    "cod": 200,
    "msg": "ok"
  },
  "body": {
    "summeryExtract": [
      {
        "query": "Debitos e Multas",
        "price": "1.17",
        "queriesNumber": 1
      },
      {
        "query": "Leilao Simples",
        "price": "38.55",
        "queriesNumber": 15
      },
      {
        "query": "Decodificador e Precificador",
        "price": "3.20",
        "queriesNumber": 16
      },
      {
        "query": "Historico de Proprietarios",
        "price": "17.00",
        "queriesNumber": 17
      },
      {
        "query": "Roubo e Furto",
        "price": "11.00",
        "queriesNumber": 11
      },
      {
        "query": "Perda Total",
        "price": "8.00",
        "queriesNumber": 8
      },
      {
        "query": "Credito Simples",
        "price": "12.20",
        "queriesNumber": 4
      },
      {
        "query": "Consulta de CCF",
        "price": "21.32",
        "queriesNumber": 26
      },
      {
        "query": "Restricao Total",
        "price": "85.00",
        "queriesNumber": 20
      },
      {
        "query": "Gravame Simples",
        "price": "14.25",
        "queriesNumber": 25
      },
      {
        "query": "Cadastro Completo",
        "price": "23.20",
        "queriesNumber": 16
      },
      {
        "query": "Agregados",
        "price": "9.48",
        "queriesNumber": 3
      }
    ],
    "totalToPay": "244.37"
  }
}
*
*
*/
