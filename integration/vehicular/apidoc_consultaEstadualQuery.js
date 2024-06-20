/**
* @api {post} /api/vehicle/:userid Consulta Estadual
* @apiVersion 5.27.1
* @apiName ConsultaEstadualQuery
* @apiGroup Consultas Veiculares
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.

* @apiParam {String} userid ID do usuário
* @apiParam {String} querycode Código da consulta. (Código = 3 para Consulta Estadual)
* @apiParam {Object} keys Chaves para realização da consulta
* @apiParam {String} keys.placa A placa para realização da Consulta Estadual
* @apiParam {String} keys.chassi O chassi para realização da Consulta Estadual
* @apiParam {String} keys.motor O motor para realização da Consulta Estadual

* @apiDescription O parametro USER_ID deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br><b>EX: /api/vehicle/<USER_ID></b>

* @apiParamExample {json} Request-Example:
{
  "querycode":3,
  "keys" : {
    "placa" : "XXX0000"
  }
}

* @apiParamExample {json} Request-Example:
{
  "querycode":3,
  "keys" : {
    "chassi" : "0DD2928DHD28D2H8D2H8"
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
			"name": "Consulta Estadual",
			"date": "2019-12-11T16:14:48.404Z",
			"keys": {
				"placa": "XXX0000"
			}
		},
		"data": {
			"anoFabricacao": "2004",
            "anoModelo": "2005",
            "baseEstadual": {
                "placa": "XXX0000",
                "chassi": "9BD17203753116958",
                "renavam": "0000000000000000",
                "categoria": "PARTICULAR",
                "combustivel": "GASOLINA",
                "comunicacaoInclusao": null,
                "comunicacaoVenda": "NAO CONSTA COMUNICACAO DE VENDAS",
                "cor": "PRATA",
                "dataAlteracaoMotor": null,
                "dataEmissaoCrv": "03/08/2011",
                "dataInclusaoIntencaoTrocaFinanceira": null,
                "dataLimiteRestricaoTributaria": null,
                "dataVenda": null,
                "dataVigenciaContratoFinanceira": null,
                "debitoCetesb": null,
                "debitoDer": null,
                "debitoDersa": null,
                "debitoDetran": null,
                "debitoDpvat": "0,00",
                "debitoIpva": "0,00",
                "debitoLicenciamento": "0,00",
                "debitoMultas": "0,00",
                "debitoMunicipais": "0,00",
                "debitoPoliciaRodoviariaFederal": null,
                "debitoRenainf": null,
                "especie": "PASSAGEIRO",
                "exercicioLicenciamento": "",
                "existeDebitoDpvat": "NAO EXISTE DEBITO DE DPVAT",
                "existeDebitoIpva": "NAO EXISTE DEBITO DE IPVA",
                "existeDebitoLicenciamento": "NAO EXISTE DEBITO DE LICENCIAMENTO ",
                "existeDebitoMulta": "NAO EXISTE DEBITO DE MULTA",
                "intencaoDataInslusao": null,
                "intencaoDocFinanceira": null,
                "intencaoNomeAgente": null,
                "intencaoNomeFinanceira": null,
                "intencaoRestricaoFinanceira": null,
                "licdata": "03/08/2011",
                "motor": "178F10116091857",
                "outrasRestricoes1": "NADA CONSTA",
                "outrasRestricoes2": "NADA CONSTA",
                "outrasRestricoes3": "NADA CONSTA",
                "outrasRestricoes4": "ALIENACAO FIDUCIARIA",
                "pronome": "XXXXXXXXXX MARCEL",
                "pronomeAnterior": null,
                "restricaoAdminisrativa": "NADA CONSTA",
                "restricaoAmbiental": null,
                "restricaoArrendatario": null,
                "restricaoDataInclusao": null,
                "restricaoDocArrendatario": null,
                "restricaoFinanceira": "ALIENACAO FIDUCIARIA",
                "restricaoGuincho": "NADA CONSTA",
                "restricaoJudicial": "NADA CONSTA",
                "restricaoNomeAgente": null,
                "restricaoRenajud": "NADA CONSTA",
                "restricaoRouboFurto": "NADA CONSTA",
                "restricaoTributaria": "NADA CONSTA",
                "situacaoVeiculo": "CIRCULACAO",
                "tipoMarcacaoChassi": "NORMAL",
                "uf": "MG",
                "municipio": "SANTA RITA DO SAPUCAI-MG",
                "tipo": "AUTOMOVEL"
            },
            "caixaCambio": "",
            "capMaxTracao": "240,00",
            "capacidadeCarga": ",00",
            "capacidadePassageiro": "5",
            "categoria": "PARTICULAR",
            "chassi": "0DD2928DHD28D2H8D2H8",
            "cidade": null,
            "cilindradas": "1000",
            "cmt": null,
            "codigoCombustivel": "2",
            "codigoFipe": null,
            "codigoMarcaModelo": "153006",
            "codigoMunicipio": "5191",
            "combustivel": "Gasolina",
            "corVeiculo": "Prata",
            "di": null,
            "docFaturado": "00.000.000/0001-00",
            "dtAtualizacao": "09/02/2017 13:35:48",
            "dtUltimaAtualizacao": "12/06/2007 00:00:00",
            "eixoTraseiroDif": "",
            "eixos": "0",
            "especieVeiculo": "Passageiro",
            "identImportadora": "",
            "limiteRestricaoTrib": null,
            "linha": null,
            "marcaModelo": "FIAT/SIENA FIRE",
            "municipio": "SANTA RITA DO SAPUCAI-MG",
            "municipioEmplacamento": null,
            "nacionalidade": "Nacional",
            "numCarroceria": "76624782",
            "numFaturado": null,
            "numMotor": "CCNBAAA55669",
            "numTerceiroEixo": "",
            "ocorrencia": null,
            "pbt": null,
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
