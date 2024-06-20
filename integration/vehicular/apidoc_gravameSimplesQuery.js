/**
* @api {post} /api/vehicle/:userid Consultar Gravame Simples
* @apiVersion 5.27.1
* @apiName GravameSimplesQuery
* @apiGroup Consultas Veiculares
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.

* @apiParam {String} userid ID do usuário
* @apiParam {String} querycode Código da consulta. (Código = 15 para consulta de Gravame Simples)
* @apiParam {Object} keys Chaves para realização da consulta
* @apiParam {String} keys.placa O placa para realização da consulta de Gravame Simples
* @apiParam {String} keys.chassi O chassi para realização da consulta de Gravame Simples
* @apiParam {String} keys.uf A UF para realização da consulta de Gravame Simples


* @apiDescription O parametro USER_ID deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br><b>EX: /api/vehicle/<USER_ID></b>


* @apiParamExample {json} Request-Example:
{
  "querycode":15,
  "keys" : {
    "placa" : "XXX0000",
    "uf":"SP"
  }
}

* @apiParamExample {json} Request-Example:
{
  "querycode":15,
  "keys" : {
    "chassi" : "0DD2928DHD28D2H8D2H8",
    "uf":"SP"
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
			"name": "Gravame",
			"date": "2019-12-11T17:43:34.830Z",
			"keys": {
				"placa": "XXX0000",
				"uf": "SP"
			}
		},
		"data": {
			"anoFabricacao": "2000",
            "anoModelo": "2001",
            "caixaCambio": "000921202",
            "capMaxTracao": "0",
            "capacidadeCarga": "0.0",
            "capacidadePassageiro": "5",
            "categoria": "PARTICULAR",
            "chassi": "0DD2928DHD28D2H8D2H8",
            "cidade": null,
            "cilindradas": "1000",
            "cmt": "0.0",
            "codigoCombustivel": "2",
            "codigoFipe": [
                {
                    "_id": "5df0570b3101c16298594cb5",
                    "valorZeroKM": "15723",
                    "codigo": "004001-0"
                },
                {
                    "_id": "5df0570b3101c16298594cb7",
                    "valorZeroKM": "16810",
                    "codigo": "004173-4"
                },
                {
                    "_id": "5df0570b3101c16298594cb9",
                    "valorZeroKM": "18079",
                    "codigo": "004173-4"
                }
            ],
            "codigoMarcaModelo": "149502",
            "codigoMunicipio": "6509",
            "combustivel": "GASOLINA",
            "corVeiculo": "BRANCA",
            "di": null,
            "docFaturado": "50507300000130",
            "dtAtualizacao": "25/04/2018 09:36:04",
            "dtUltimaAtualizacao": "14/12/2018",
            "eixoTraseiroDif": "",
            "eixos": "0",
            "especieVeiculo": "PASSAGEIRO",
            "gravame": [
                {
                    "_id": "5df12e6f6ed3416293278640",
                    "ufPlaca": "PR",
                    "uf": "PR",
                    "situacao": "VEÍCULO TEVE GRAVAME BAIXADO PELO AGENTE FINANCEIRO",
                    "placa": "XXX0000",
                    "observacoes": null,
                    "numero": "05320814",
                    "intencao": null,
                    "informante": null,
                    "documentoFinanciado": "12609611000110",
                    "documentoAgente": "47193149000106",
                    "dataSituacao": "02/05/2012",
                    "dataInclusao": null,
                    "contrato": null,
                    "codigoAgente": null,
                    "chassi": "0DD2928DHD28D2H8D2H8",
                    "arrendatarioFinanciado": "CARLOS ROBERTO DE SOUSA ME",
                    "anoModelo": "2001",
                    "anoFabricacao": "2000",
                    "agente": "REAL LEASING SA ARRENDAMENTO MERCANTIL"
                }
            ],
            "identImportadora": "",
            "limiteRestricaoTrib": null,
            "linha": null,
            "marcaModelo": "GM/CORSA WIND",
            "municipio": "CARAGUATATUBA-SP",
            "municipioEmplacamento": null,
            "nacionalidade": "NACIONAL",
            "numCarroceria": "",
            "numFaturado": null,
            "numMotor": "NM0091931",
            "numTerceiroEixo": "",
            "ocorrencia": "VEICULO NAO INDICA OCORRENCIA DE ROUBO/FURTO",
            "pbt": "0.0",
            "pesoBrutoTotal": "0,00",
            "placa": "XXX0000",
            "potencia": "60",
            "procedencia": "NACIONAL",
            "qtdPax": null,
            "registroDi": null,
            "renavam": "0000000000000000",
            "restricoes": null,
            "situacaoChassi": "NORMAL",
            "situacaoVeiculo": "CIRCULACAO",
            "tipoCarroceria": "INEXISTENTE",
            "tipoDocFaturado": "JURIDICA",
            "tipoDocImportadora": null,
            "tipoMontagem": "",
            "tipoVeiculo": "AUTOMOVEL",
            "uf": "PR",
            "ufFaturado": "SP",
            "ultimaDataInclusao": "09/02/2017 13:35:48",
            "unidadeLocalSRF": "0"
		}
	}
}
*/
