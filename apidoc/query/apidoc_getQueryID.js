/**
* @api {get} /api/query/:queryid Buscar Consulta por ID (Simplificada)
* @apiVersion 5.27.1
* @apiName GetQueryId
* @apiGroup Consultas
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.
*
* @apiSuccess {String} queryid ID da consulta.
*
* @apiDescription O parâmetro QUERY_ID deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX:  /api/query/<QUERY_ID></b>
* <br> A diferença maior desta requisição para a requisição /api/query/json-response/:queryid consiste em que o retorno para essa requisição, traz exatamente o mesmo template
retornado na requisição de execução de uma consulta.

* @apiSuccessExample Success-Response:
{
  "status": {
    "cod": 200,
    "msg": "ok"
  },
  "body": {
    "headerInfos": {
      "queryid": "XXXXXXXX",
      "name": "Agregados",
      "date": "2018-03-08T22:10:58.421Z"
    },
    "data": {
      "chassi": "XXXXXXXX",
      "placa": "XXXXXXXX",
      "renavam": "XXXXXXXX",
      "uf": "SP",
      "cidade": "XXXXXXXX",
      "numFaturado": "03470727001607",
      "anoFabricacao": "2011",
      "anoModelo": "2012",
      "municipio": "SAO PAULO",
      "codigoMarcaModelo": "XXXXXXXX",
      "marcaModelo": "XXXXXXXX",
      "codigoCombustivel": "16",
      "combustivel": "XXXXXXXX / XXXXXXXX",
      "potencia": "148",
      "capacidadeCarga": "0",
      "nacionalidade": "XXXXXXXX",
      "linha": "XXXXXXXX",
      "numCarroceria": null,
      "caixaCambio": null,
      "eixoTraseiroDif": null,
      "numMotor": null,
      "numTerceiroEixo": null,
      "tipoDocFaturado": "XXXXXXXX",
      "ufFaturado": "XXXXXXXX",
      "tipoDocProprietario": "XXXXXXXX",
      "tipoVeiculo": "XXXXXXXX",
      "especieVeiculo": "Passageiro",
      "tipoCarroceria": "NAO APLICAVEL",
      "corVeiculo": "XXXXXXXX",
      "qtdPax": "5",
      "situacaoChassi": "N",
      "eixos": "2",
      "tipoMontagem": "1",
      "tipoDocImportadora": null,
      "identImportadora": null,
      "di": "XXXXXXXX",
      "registroDi": null,
      "unidadeLocalSRF": "XXXXXXXX",
      "dtUltimaAtualizacao": "2012-03-15T03:00:00.000Z",
      "restricao1": "SEM RESTRICAO",
      "restricao2": "SEM RESTRICAO",
      "restricao3": "SEM RESTRICAO",
      "restricao4": "SEM RESTRICAO",
      "limiteRestricaoTrib": null,
      "cilindradas": "1999",
      "capMaxTracao": "237",
      "pesoBrutoTotal": "177",
      "situacaoVeiculo": "S",
      "__v": 0,
      "dtAtualizacao": "2013-03-28T03:00:00.000Z",
      "codigoMunicipio": "XXXXXXXX"
    },
    "servicesBroken": [],
  }
}
*
*/
