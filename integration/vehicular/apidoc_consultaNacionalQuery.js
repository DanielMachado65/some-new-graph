/**
* @api {post} /api/vehicle/:userid Consulta Nacional
* @apiVersion 5.27.1
* @apiName ConsultaNacionalQuery
* @apiGroup Consultas Veiculares
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.

* @apiParam {String} userid ID do usuário
* @apiParam {String} querycode Código da consulta. (Código = 2 para Consulta Nacional)
* @apiParam {Object} keys Chaves para realização da consulta
* @apiParam {String} keys.placa A placa para realização da Consulta Nacional
* @apiParam {String} keys.chassi O chassi para realização da Consulta Nacional
* @apiParam {String} keys.motor O motor para realização da Consulta Nacional

* @apiDescription O parametro USER_ID deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br><b>EX: /api/vehicle/<USER_ID></b>

* @apiParamExample {json} Request-Example:
{
  "querycode":2,
  "keys" : {
    "placa" : "XXX0000"
  }
}

* @apiParamExample {json} Request-Example:
{
  "querycode":2,
  "keys" : {
    "chassi" : "0DD2928DHD28D2H8D2H8"
  }
}

* @apiParamExample {json} Request-Example:
{
  "querycode":2,
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
			"name": "Consulta Nacional",
			"date": "2019-12-11T16:29:55.531Z",
			"keys": {
				"placa": "XXX0000"
			}
		},
		"data": {
			"anoFabricacao": "2004",
            "anoModelo": "2005",
            "baseNacional": {
                "placa": "XXX0000",
                "chassi": "0DD2928DHD28D2H8D2H8",
                "renavam": "0000000000000000",
                "anoFabricacao": "2004",
                "anoModelo": "2005",
                "categoria": null,
                "combustivel": "GASOLINA",
                "cor": "PRATA",
                "di": null,
                "docFaturado": null,
                "dtEmissaoCrv": null,
                "dtUltimaAtualizacao": "03/08/2011",
                "especie": "PASSAGEIRO",
                "especieVeiculo": null,
                "indicadorComunicacaoVendas": null,
                "indicadorRestricaoRenajud": null,
                "motor": "178F10116091857",
                "municipio": "SANTA RITA DO SAPUCAI",
                "ocorrencia": "VEICULO NAO INDICA OCORRENCIA DE ROUBO/FURTO",
                "outrasRestricoes1": null,
                "outrasRestricoes2": null,
                "outrasRestricoes3": null,
                "outrasRestricoes4": null,
                "outrasRestricoes5": null,
                "outrasRestricoes6": null,
                "outrasRestricoes7": null,
                "outrasRestricoes8": null,
                "restricao1": "ALIENACAO FIDUCIARIA",
                "restricao2": null,
                "restricao3": null,
                "restricao4": null,
                "restricaoDataInclusao": null,
                "restricaoFinanciadora": null,
                "restricaoFinanciamento": null,
                "restricaoNomeAgente": null,
                "restricaoTipoTransacao": null,
                "situacaoVeiculo": "CIRCULACAO",
                "tipoDocFaturado": null,
                "tipoDocImportadora": null,
                "tipoMarcacaoChassi": null,
                "tipoVeiculo": "AUTOMOVEL",
                "uf": "MG",
                "ufFaturado": null
            },
            "caixaCambio": "",
            "capMaxTracao": "240,00",
            "capacidadeCarga": ",00",
            "capacidadePassageiro": "5",
            "categoria": "PARTICULAR",
            "chassi": "0DD2928DHD28D2H8D2H8",
            "cidade": null,
            "cilindradas": "1000",
            "cmt": "2.4",
            "codigoCombustivel": "2",
            "codigoFipe": null,
            "codigoMarcaModelo": "153006",
            "codigoMunicipio": "5191",
            "combustivel": "Gasolina",
            "corVeiculo": "Prata",
            "di": null,
            "docFaturado": "02.xxx.5x2/xxxx-14",
            "dtAtualizacao": "09/02/2017 13:35:48",
            "dtUltimaAtualizacao": "12/06/2007 00:00:00",
            "eixoTraseiroDif": "",
            "eixos": "0",
            "especieVeiculo": "Passageiro",
            "identImportadora": "",
            "limiteRestricaoTrib": null,
            "linha": null,
            "marcaModelo": "FIAT/SIENA FIRE",
            "municipio": "SANTA RITA DO SAPUCAI",
            "municipioEmplacamento": null,
            "nacionalidade": "Nacional",
            "numCarroceria": "999",
            "numFaturado": null,
            "numMotor": "178F10116091857",
            "numTerceiroEixo": "",
            "ocorrencia": null,
            "pbt": "0.0",
            "pesoBrutoTotal": ",00",
            "placa": "XXX0000",
            "potencia": "65",
            "procedencia": "NACIONAL",
            "qtdPax": null,
            "registroDi": null,
            "renavam": "0000000000000000",
            "restricoes": null,
            "situacaoChassi": "N",
            "situacaoVeiculo": "S",
            "tipoCarroceria": "INEXISTENTE",
            "tipoDocFaturado": "JURIDICA",
            "tipoDocImportadora": null,
            "tipoMontagem": "1",
            "tipoVeiculo": "Automovel",
            "uf": "MG",
            "ufFaturado": "MG",
            "ultimaDataInclusao": "09/02/2017 13:35:48",
            "unidadeLocalSRF": "0"
		}
	}
}
*/
