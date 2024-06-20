/**
* @api {get} /api/query/json-response/:queryid Buscar JSON das Consultas por ID
* @apiVersion 0.1.0
* @apiName GetQueriesJSON
* @apiGroup Consultas
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.
*
* @apiSuccess {String} queryid  ID da consulta.
*
* @apiDescription O parâmetro QUERY_ID deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX:  /api/query/json-response/<QUERY_ID></b>

* @apiSuccessExample Success-Response:
{
  "status": {
    "cod": 200,
    "msg": "ok"
  },
  "body": {
    "_id": "XXXXXXX",
    "code": 1,
    "status": true,
    "responseJSON": {
      "codigoMunicipio": "XXXXXXX",
      "dtAtualizacao": "2013-03-28T03:00:00.000Z",
      "__v": 0,
      "situacaoVeiculo": "S",
      "pesoBrutoTotal": "177",
      "capMaxTracao": "237",
      "cilindradas": "1999",
      "limiteRestricaoTrib": null,
      "restricao4": "SEM RESTRICAO",
      "restricao3": "SEM RESTRICAO",
      "restricao2": "SEM RESTRICAO",
      "restricao1": "SEM RESTRICAO",
      "dtUltimaAtualizacao": "2012-03-15T03:00:00.000Z",
      "unidadeLocalSRF": "1010500",
      "registroDi": null,
      "di": "1202708775",
      "identImportadora": null,
      "tipoDocImportadora": null,
      "tipoMontagem": "1",
      "eixos": "2",
      "situacaoChassi": "N",
      "qtdPax": "5",
      "corVeiculo": "Preta",
      "tipoCarroceria": "NAO APLICAVEL",
      "especieVeiculo": "Passageiro",
      "tipoVeiculo": "Automovel",
      "tipoDocProprietario": "Jurídica",
      "ufFaturado": "BA",
      "tipoDocFaturado": "Jurídica",
      "numTerceiroEixo": null,
      "numMotor": null,
      "eixoTraseiroDif": null,
      "caixaCambio": null,
      "numCarroceria": null,
      "linha": "XXXXXXX",
      "nacionalidade": "Importado",
      "capacidadeCarga": "0",
      "potencia": "148",
      "combustivel": "Álcool / Gasolina",
      "codigoCombustivel": "16",
      "marcaModelo": "XXXXXXX",
      "codigoMarcaModelo": "XXXXXXX",
      "municipio": "SAO PAULO",
      "anoModelo": "XXXXXXX",
      "anoFabricacao": "XXXXXXX",
      "numFaturado": "XXXXXXX",
      "cidade": "SÃ£o Paulo",
      "uf": "SP",
      "renavam": "XXXXXXX",
      "placa": "XXXXXXX",
      "chassi": "XXXXXXX"
    },
    "refClass": "Agregados",
    "keys": {
      "cnpj": null,
      "cpf": null,
      "renavam": null,
      "motor": null,
      "chassi": null,
      "placa": "XXXXXXX"
    },
    "createAt": "2018-03-08T22:10:58.421Z"
  }
}
*
*/
