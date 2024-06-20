/**
* @api {post} /api/vehicle/:userid Consultar Agregados
* @apiVersion 5.27.1
* @apiName AgregadosQuery
* @apiGroup Consultas Veiculares
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.

* @apiParam {String} userid ID do usuário
* @apiParam {String} querycode Código da consulta. (Código = 1 para consulta de Agregados)
* @apiParam {Object} keys Chaves para realização da consulta
* @apiParam {String} keys.placa A placa para realização da consulta de Agregados
* @apiParam {String} keys.chassi O chassi para realização da consulta de Agregados
* @apiParam {String} keys.renavam O renavam para realização da consulta de Agregados
* @apiParam {String} keys.motor O motor para realização da consulta de Agregados

* @apiDescription O parametro USER_ID deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br><b>EX: /api/vehicle/<USER_ID></b>

* @apiParamExample {json} Request-Example:
{
  "querycode":1,
  "keys" : {
    "placa" : "XXX0000"
  }
}

* @apiParamExample {json} Request-Example:
{
  "querycode":1,
  "keys" : {
    "chassi" : "0DD2928DHD28D2H8D2H8"
  }
}

* @apiParamExample {json} Request-Example:
{
  "querycode":1,
  "keys" : {
    "renavam" : "0000000000000000"
  }
}

* @apiParamExample {json} Request-Example:
{
  "querycode":1,
  "keys" : {
    "motor" : "0DD2928DHD28D2H8D2H8"
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
		"headerInfos": {
			"queryid": "5b3a323nfn2330feannac978676f0f7",
			"name": "Agregados",
			"date": "2019-12-11T14:13:07.428Z",
			"keys": {
				"placa": "XXX0000"
			}
		},
		"data": {
            "cmt": null,
            "pbt": null,
            "restricoes": null,
            "ocorrencia": null,
            "municipioEmplacamento": null,
            "capacidadePassageiro": "5",
            "procedencia": "42913856",
            "categoria": null,
            "ufFaturado": "MG",
            "tipoDocFaturado": "Jurídica",
            "docFaturado": "",
            "situacaoVeiculo": "S",
            "pesoBrutoTotal": ",00",
            "capMaxTracao": "240,00",
            "cilindradas": "1000",
            "limiteRestricaoTrib": null,
            "dtUltimaAtualizacao": "12/06/2007 00:00:00",
            "unidadeLocalSRF": "0",
            "registroDi": null,
            "di": null,
            "identImportadora": "",
            "tipoDocImportadora": "0",
            "tipoMontagem": "1",
            "eixos": "0",
            "situacaoChassi": "N",
            "qtdPax": null,
            "corVeiculo": "Prata",
            "tipoCarroceria": "NAO APLICAVEL",
            "especieVeiculo": "Passageiro",
            "tipoVeiculo": "Automovel",
            "numTerceiroEixo": "",
            "numMotor": "178F1011*6091857*",
            "eixoTraseiroDif": "",
            "caixaCambio": "",
            "numCarroceria": "76624782",
            "linha": null,
            "nacionalidade": "Nacional",
            "capacidadeCarga": ",00",
            "potencia": "65",
            "combustivel": "Gasolina",
            "codigoCombustivel": "2",
            "marcaModelo": "FIAT/SIENA FIRE",
            "codigoMarcaModelo": "153006",
            "municipio": "SANTA RITA DO SAPUCAI",
            "codigoMunicipio": "5191",
            "anoModelo": "2005",
            "anoFabricacao": "2004",
            "numFaturado": null,
            "dtAtualizacao": "09/02/2017 13:35:48",
            "codigoFipe": null,
            "ultimaDataInclusao": "09/02/2017 13:35:48",
            "cidade": null,
            "uf": "MG",
            "renavam": "",
            "placa": "XXX0000",
			"chassi": "0DD2928DHD28D2H8D2H8"
		},
	}
}
*/
