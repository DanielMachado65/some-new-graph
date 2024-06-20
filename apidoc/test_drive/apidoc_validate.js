/**
* @api {post} /api/test-drive Executar Test-Drive
* @apiVersion 5.27.1
* @apiName TestDriveApi
* @apiGroup Test-Drive
*
*
* @apiParam {String} key chave de consulta (placa, chassi, motor ou renavam).
* @apiParam {String} email E-mail do usuário que deseja realziar o test-drive
*
* @apiParamExample {json} Request-Example:
{
  "key" : "AAA1234"
  "email" : "XXXXXXXX@teste.com.br"
}
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
{
  "status": {
    "cod": 200,
    "msg": "ok"
  },
  "body": {
    "tipoMarcacaoChassi": "NORMAL",
    "capacidadePassageiro": "5",
    "categoria": "PARTICULAR",
    "corVeiculo": "PRETA",
    "especieVeiculo": "PASSAGEIRO",
    "tipoVeiculo": "AUTOMOVEL",
    "potencia": "148",
    "combustivel": "ALCOOL/GASOLINA",
    "marcaModelo": "I/FORD/FOCUS TI 2LHCFLEX",
    "municipio": "SAO PAULO-SP",
    "anoModelo": "2012",
    "anoFabricacao": "2011",
    "placa": "XXX000",
    "chassi": "XXXXXXXXXXXXXXX99924"
  }
}

* @apiError TestDriveApiError Limite atingido para o IP requisitante
*
* @apiErrorExample Error-Response:
*  HTTP/1.1 410 Bad Request
{
  "status": {
    "cod": 410,
    "msg": "bad request"
  },
    "body": "Falhou!! Percebemos que esse endereço de IP realizou o número máximo de consultas. Não será possível prosseguir com esta solicitação."
}

* @apiError TestDriveApiError E-mail utilizado anteriormente
*
* @apiErrorExample Error-Response:
*  HTTP/1.1 410 Bad Request
{
  "status": {
    "cod": 410,
    "msg": "bad request"
  },
  "body": "Ops falhou!! Esse e-mail ja foi utilizado anteriormente!"
}
*/
