/**
* @api {post} /api/test-drive/vehicle [TESTE] Executar Test-Drive
* @apiVersion 5.27.1
* @apiName TestDriveVehicle
* @apiGroup Test-Drive
*
*
* @apiParam {String} key chave de consulta (placa, chassi, motor ou renavam).
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
    "codigoMunicipio": "XX",
    "restricoes": null,
    "pbt": null,
    "cmt": null,
    "combusivel": null,
    "capacidadePassageiro": null,
    "categoria": null,
    "corVeiculo": "Outros ou Desconhecido",
    "especieVeiculo": "Desconhecido",
    "tipoVeiculo": "Nao Identificado",
    "potencia": "0",
    "combustivel": "Álcool",
    "marcaModelo": "FORD/ESCORT 1.8 XR3",
    "municipio": "CURITIBA",
    "anoModelo": "0",
    "anoFabricacao": "1990",
    "cidade": "JundiaÃ­",
    "placa": "AAA0001",
    "chassi": "9XXXXXXXXXXXXXX00"
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
    "cod": 404,
    "msg": "not found"
  },
  "body": "Veículo não encontrado"
}
*/
