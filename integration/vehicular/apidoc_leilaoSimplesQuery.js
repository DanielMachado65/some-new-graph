/**
* @api {post} /api/vehicle/:userid Consultar Leilão Simples
* @apiVersion 5.27.1
* @apiName LeilaoSimplesQuery
* @apiGroup Consultas Veiculares
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.

* @apiParam {String} userid ID do usuário
* @apiParam {String} querycode Código da consulta. (Código = 16 para consulta de Leilão Simples)
* @apiParam {Object} keys Chaves para realização da consulta
* @apiParam {String} keys.placa O placa para realização da consulta de Leilão Simples
* @apiParam {String} keys.chassi O chassi para realização da consulta de Leilão Simples


* @apiDescription O parametro USER_ID deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br><b>EX: /api/vehicle/<USER_ID></b>


* @apiParamExample {json} Request-Example:
{
  "querycode":16,
  "keys" : {
    "placa" : "XXX0000",
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
			"name": "Leilao Simples",
			"date": "03/07/2018 13:15:46",
			"keys": {
				"placa": "XXX0000",
				"chassi": "0DD2928DHD28D2H8D2H8"
			}
		},
		"data": {
		"analiseRisco": {
			"imageLink": null,
				"indiceRisco": "3",
				"parecer": "Veículo com alto risco de recusa em comercialização/seguro 😒"
		},
		"anoFabricacao": "2000",
			"anoModelo": "2001",
			"caixaCambio": "000921202",
			"capMaxTracao": "0",
			"capacidadeCarga": "0.0",
			"capacidadePassageiro": "5",
			"categoria": "PARTICULAR",
			"chassi": "9BGSC08Z01C147623",
			"cidade": null,
			"cilindradas": "1000",
			"cmt": "0.0",
			"codigoCombustivel": "2",
			"codigoFipe": [
			{
				"_id": "5df0570b3101c162gg594cb5",
				"valorZeroKM": "15723",
				"codigo": "004001-0"
			},
			{
				"_id": "5df0570b3101c162gg594cb7",
				"valorZeroKM": "16810",
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
			"identImportadora": "",
			"indicioSinistro": {
				"classificacao": null,
				"descricao": "CONSTA INDÍCIO DE SINISTRO PARA O VEÍCULO INFORMADO 😑"
			},
		"leilao": {
			"descricao": "Consta histórico de leilão para o veículo informado",
				"registros": [
				{
					"_id": "5df057093101c12020594ca8",
					"placa": "XXX0000",
					"modelo": "CORSA WIND 1.0",
					"marca": "CHEVROLET",
					"lote": "1707",
					"leiloeiro": "NC",
					"dataLeilao": "2003-11-21T00:00:00",
					"cor": "BRANCA",
					"condicaoGeral": null,
					"comitente": null,
					"chassi": "9BGSC08Z01C142020",
					"anoModelo": "2001",
					"anoFabricacao": "2000"
				},
				{
					"_id": "5df057093101c12020594ca8",
					"placa": "XXX0000",
					"modelo": "CORSA WIND 1.0",
					"marca": "CHEVROLET",
					"lote": "1707",
					"leiloeiro": "NC",
					"dataLeilao": "2003-11-21T00:00:00",
					"cor": "BRANCA",
					"condicaoGeral": "",
					"comitente": null,
					"chassi": "9BGSC08Z01C142020",
					"anoModelo": "2001",
					"anoFabricacao": "2000"
				}
			]
		},
		"limiteRestricaoTrib": null,
			"linha": null,
			"marcaModelo": "GM/CORSA WIND",
			"municipio": "CARAGUATATUBA-SP",
			"municipioEmplacamento": null,
			"nacionalidade": "NACIONAL",
			"numCarroceria": "0",
			"numFaturado": null,
			"numMotor": "NM0091959",
			"numTerceiroEixo": "",
			"ocorrencia": "VEICULO NAO INDICA OCORRENCIA DE ROUBO/FURTO",
			"pbt": "0.0",
			"pesoBrutoTotal": "0,00",
			"placa": "XXX0000",
			"potencia": "60",
			"procedencia": "NACIONAL",
			"qtdPax": null,
			"registroDi": null,
			"renavam": "00743112644",
			"restricoes": null,
			"situacaoChassi": "NORMAL",
			"situacaoVeiculo": "CIRCULACAO",
			"tipoCarroceria": "INEXISTENTE",
			"tipoDocFaturado": "JURIDICA",
			"tipoDocImportadora": null,
			"tipoMontagem": "COMPLETA",
			"tipoVeiculo": "AUTOMOVEL",
			"uf": "SP",
			"ufFaturado": "SP",
			"ultimaDataInclusao": "09/02/2017 13:35:48",
			"unidadeLocalSRF": "0"
		}
	}
}
*/
