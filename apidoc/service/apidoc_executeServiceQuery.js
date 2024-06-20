/**
* @api {post} /api/service Reconsultar Serviço (Quando um serviço falhar na consulta)
* @apiVersion 5.27.1
* @apiName ExecuteService
* @apiGroup Servico
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.
* @apiParam {String} queryid ID da consulta que falhou
* @apiParam {String} serviceLog ID do log de serviço que falhou
*

* @apiParamExample {json} Request-Example:
* {
*    "queryid": "XXXXXXXXXXXXXX",
     "serviceLog" : "XXXXXXXXXXXXX"
* }
*
* @apiDescription OBSERVAÇÃO: A reconsulta por serviço poderá ser realizada até duas vezes consecutivamente, e caso falhe nas 2 vezes, o usuário terá que
aguardar por 1 hora para tentar reconsultar novamente. O JSON de retorno irá depender do serviço que precisa ser reprocessado.
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
{
  "status": {
    "cod": 200,
    "msg": "ok"
  },
  "body": {
    "headerInfos": {
      "serviceCode": 5,
      "supplierCode": 20,
      "serviceName": "Renajud",
      "date": "2018-03-14T15:04:09.261Z"
    },
    "data": {
      "__v": 0,
      "renajud": {
        "processo": "",
        "tribunal": "",
        "restricoes": "",
        "orgaoJudicial": "",
        "detalheRenajud": "VEICULO NAO POSSUI RESTRICAO",
        "nomeProprietario": ""
      },
      "numMotor": null,
      "combustivel": "Álcool / Gasolina",
      "marcaModelo": "XXXXXXXX",
      "anoModelo": "2012",
      "anoFabricacao": "2011",
      "cidade": "SÃ£o Paulo",
      "uf": "SP",
      "renavam": "XXXXX",
      "placa": "XXXXXXXXX",
      "chassi": "XXXXXXXXXX"
    }
  }
}


* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
{
  "status": {
    "cod": 200,
    "msg": "ok"
  },
  "body": {
    "error": "Ops... Você atingiu o limite de solicitações temporariamente... Nosso fornecedor primário esta temporariamente indisponível, volte em alguns instantes"
  }
}

* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
{
  "status": {
    "cod": 200,
    "msg": "ok"
  },
  "body": {
    "error": "Aguarde por mais alguns minutos para reprocessar essa consulta...",
  }
}
*

@apiError ExecuteServiceErrorBad Referência de serviço inválida
* @apiSuccessExample Success-Response:
* HTTP/1.1 410 BAD REQUEST
{
  "status": {
    "cod": 410,
    "msg": "bad request"
  },
  "body": {
    "error": "Referência de serviço inválida. O serviço pode ter sido processado anteriormente para esta consulta"
  }
}
*

@apiError ExecuteServiceErrorBad Falha na consulta
* @apiSuccessExample Success-Response:
* HTTP/1.1 410 BAD REQUEST
{
  "status": {
    "cod": 410,
    "msg": "bad request"
  },
  "body": {
    "error": "Ops... Falhou! Desculpe-nos, mas nosso fornecedor primário esta temporariamente indisponível... Retorne em alguns instantes..."
  }
}
*

@apiError ExecuteServiceErrorBad Não encontrado
* @apiSuccessExample Success-Response:
* HTTP/1.1 404 NOT FOUND
{
  "status": {
    "cod": 404,
    "msg": "not found"
  },
  "body": {
    "error": "Referência de serviço inválida. O serviço pode ter sido processado anteriormente para esta consulta"
  }
}
*
*/
