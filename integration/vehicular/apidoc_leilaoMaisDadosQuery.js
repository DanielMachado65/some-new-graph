/**
* @api {post} /api/vehicle/:userid Consultar Leilão + Dados
* @apiVersion 5.27.1
* @apiName LeilaoMaisDadosQuery
* @apiGroup Consultas Veiculares
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.

* @apiParam {String} userid ID do usuário
* @apiParam {String} querycode Código da consulta. (Código = 18 para consulta de Leilão + Dados)
* @apiParam {Object} keys Chaves para realização da consulta
* @apiParam {String} keys.placa O placa para realização da consulta de Leilão + Dados
* @apiParam {String} keys.chassi O chassi para realização da consulta de Leilão + Dados


* @apiDescription O parametro USER_ID deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br><b>EX: /api/vehicle/<USER_ID></b>


* @apiParamExample {json} Request-Example:
{
  "querycode":18,
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
			"name": "Leilão + Dados do Veículo",
			"date": "03/07/2018 14:51:32",
			"keys": {
				"placa": "XXX0000",
				"chassi": "0DD2928DHD28D2H8D2H8"
			}
		},
		"data": {
			"leilao": {
				"Registro": [
					{
						"Patio": "NC",
						"Comitente": "NC",
						"DataLeilao": "2003-11-21T00:00:00",
						"QuantidadeDeEixo": "0",
						"NumeroMotor": "28DHD28D2H8D",
						"CondicaoGeralDoVeiculo": null,
						"CategoriaDoVeiculo": "AUTOMOVEL AHAG",
						"Combustivel": "GASOLINA",
						"Cor": "BRANCA",
						"Chassi": "0DD2928DHD28D2H8D2H8",
						"Placa": "XXX0000",
						"AnoFabricacao": "2000",
						"AnoModelo": "2001",
						"Modelo": "CORSA WIND 1.0",
						"Marca": "CHEVROLET",
						"IdLeilao": "5008",
						"Lote": "0",
						"Leiloeiro": "NC"
					},
					{
						"Patio": "NC",
						"Comitente": "NC",
						"DataLeilao": "2003-11-21T00:00:00",
						"QuantidadeDeEixo": "0",
						"NumeroMotor": "0D28D2H8D2H8",
						"CondicaoGeralDoVeiculo": "",
						"CategoriaDoVeiculo": "AUTOMOVEL AHAG",
						"Combustivel": "GASOLINA",
						"Cor": "BRANCA",
						"Chassi": "0DD2928DHD28D2H8D2H8",
						"Placa": "XXX0000",
						"AnoFabricacao": "2000",
						"AnoModelo": "2001",
						"Modelo": "CORSA WIND 1.0",
						"Marca": "CHEVROLET",
						"IdLeilao": "5008",
						"Lote": "0",
						"Leiloeiro": "NC"
					},
					{
						"Patio": "NC",
						"Comitente": "NC",
						"DataLeilao": "2003-11-21T00:00:00",
						"QuantidadeDeEixo": "0",
						"NumeroMotor": "8D2H8D2H8",
						"CondicaoGeralDoVeiculo": "",
						"CategoriaDoVeiculo": "AUTOMOVEL AHAG",
						"Combustivel": "GASOLINA",
						"Cor": "BRANCA",
						"Chassi": "0DD2928DHD28D2H8D2H8",
						"Placa": "XXX0000",
						"AnoFabricacao": "2000",
						"AnoModelo": "2001",
						"Modelo": "CORSA WIND 1.0",
						"Marca": "CHEVROLET",
						"IdLeilao": "12571",
						"Lote": "0",
						"Leiloeiro": "NC"
					}
				],
				"DescricaoRetorno": "Consta Registro de Leilao para o veiculo informado"
			},
			"analiseRisco": {
				"indiceRisco": "3",
				"parecer": "VEÍCULO COM INDÍCIO DE GRANDES DANOS 😒"
			},
			"baseEstadual": {
				"combustivel": "GASOLINA",
				"motor": "0DD28D2H8D2H8",
				"categoria": "PARTICULAR",
				"especie": "PASSAGEIRO",
				"cor": "BRANCA",
				"situacaoVeiculo": "CIRCULACAO",
				"codigoFinanceira": "",
				"dataLimiteRestricaoTributaria": "",
				"dataInclusaoIntencaoTrocaFinanceira": "",
				"inspecaoStatus": "",
				"inspecaoSelo": "",
				"inspecaoData": "",
				"inspecaoCentro": "",
				"inspecaoAno": "",
				"protocoloDetran": "",
				"notaFiscal": "",
				"dataVenda": "",
				"docComprador": "",
				"tipoDocComprador": "",
				"comunicacaoInclusao": "",
				"comunicacaoVenda": "NAO CONSTA COMUNICACAO DE VENDAS ",
				"dataEmissaoCrv": "24/11/2016",
				"exercicioLicenciamento": "2017",
				"outrasRestricoes4": "NADA CONSTA",
				"outrasRestricoes3": "NADA CONSTA",
				"outrasRestricoes2": "NADA CONSTA",
				"outrasRestricoes1": "NADA CONSTA",
				"restricaoAmbiental": "veiculo com inspecao veicular ok",
				"restricaoRenajud": "NADA CONSTA",
				"restricaoTributaria": "NADA CONSTA",
				"restricaoJudicial": "NADA CONSTA",
				"restricaoAdminisrativa": "SINISTRADO/RECUPERADO INDICIO DE SINISTRO ENCONTRADO",
				"restricaoGuincho": "NADA CONSTA",
				"restricaoRouboFurto": "NADA CONSTA",
				"debitoPoliciaRodoviariaFederal": "0,00",
				"debitoMunicipais": "0,00",
				"debitoRenainf": "0,00",
				"debitoCetesb": "0,00",
				"debitoDetran": "195,23",
				"debitoDer": "0,00",
				"debitoDersa": "0,00",
				"debitoDpvat": "45,72",
				"debitoMultas": "195.23",
				"debitoLicenciamento": "0,00",
				"debitoIpva": "464,11",
				"existeDebitoDpvat": "EXISTE DEBITO DE DPVAT",
				"existeDebitoLicenciamento": "NAO EXISTE DEBITO DE LICENCIAMENTO",
				"existeDebitoMulta": "EXISTE DEBITO DE MULTA",
				"existeDebitoIpva": "EXISTE DEBITO DE IPVA",
				"restricaoDataInclusao": "",
				"restricaoArrendatario": "",
				"restricaoNomeAgente": "",
				"restricaoFinanceira": "NADA CONSTA",
				"licdata": "19/10/2017",
				"intencaoDocFinanceira": "",
				"intencaoDataInslusao": "",
				"intencaoNomeFinanceira": "",
				"intencaoNomeAgente": "",
				"intencaoRestricaoFinanceira": "",
				"restricaoDocArrendatario": "",
				"pronomeAnterior": "igo",
				"pronome": "0 CRISLEIDE CARDOSO DE SOUZA",
				"dataVigenciaContratoFinanceira": "",
				"codigoAgenteFinanceiro": "",
				"numContratoFinanceira": "",
				"tipoMarcacaoChassi": "NORMAL",
				"renavam": "0000000000000000",
				"chassi": "0DD2928DHD28D2H8D2H8",
				"placa": "XXX0000"
			},
			"baseNacional": {
				"anoFabricacao": "2000",
				"anoModelo": "2001",
				"renavam": "0000000000000000",
				"chassi": "0DD2928DHD28D2H8D2H8",
				"placa": "XXX0000",
				"docFaturado": "50xxx50xx00xx1xx30xxx",
				"di": "0000000000",
				"tipoDocImportadora": null,
				"ufFaturado": "SP",
				"tipoDocFaturado": "JURIDICA",
				"uf": "SP",
				"municipio": "ILHABELA",
				"situacaoVeiculo": "CIRCULACAO",
				"tipoVeiculo": "AUTOMOVEL",
				"especieVeiculo": "PASSAGEIRO",
				"restricao4": "INDICIO DE SINISTRO ENCONTRADO",
				"restricao3": "NADA CONSTA",
				"restricao2": "NADA CONSTA",
				"restricao1": "SINISTRADO/RECUPERADO",
				"dtUltimaAtualizacao": "24/11/2006",
				"combustivel": "GASOLINA",
				"motor": "0DD22H8D2H8",
				"categoria": "PARTICULAR",
				"especie": "BRANCA",
				"cor": "BRANCA",
				"outrasRestricoes8": "NADA CONSTA",
				"outrasRestricoes7": "NADA CONSTA",
				"outrasRestricoes6": "NADA CONSTA",
				"outrasRestricoes5": "NADA CONSTA",
				"outrasRestricoes4": "NADA CONSTA",
				"outrasRestricoes3": "NADA CONSTA",
				"outrasRestricoes2": "NADA CONSTA",
				"outrasRestricoes1": "NADA CONSTA",
				"restricaoDataInclusao": "",
				"restricaoFinanciamento": "",
				"restricaoNomeAgente": "",
				"restricaoFinanciadora": " NADA CONSTA ",
				"restricaoTipoTransacao": "NADA CONSTA",
				"indicadorRestricaoRenajud": "NAO",
				"indicadorComunicacaoVendas": "NAO",
				"ocorrencia": "VEICULO NAO INDICA OCORRENCIA DE ROUBO/FURTO",
				"tipoMarcacaoChassi": "NORMAL"
			},
			"ocorrencia": null,
			"municipioEmplacamento": null,
			"capacidadePassageiro": "5",
			"procedencia": "NACIONAL",
			"categoria": "PARTICULAR",
			"ufFaturado": "SP",
			"tipoDocFaturado": "JURIDICA",
			"docFaturado": "xx12xxxx3x4xxx4x4x2x",
			"situacaoVeiculo": null,
			"pesoBrutoTotal": "0,00",
			"capMaxTracao": "0",
			"cilindradas": "1000",
			"limiteRestricaoTrib": null,
			"registroDi": null,
			"di": null,
			"identImportadora": null,
			"tipoDocImportadora": null,
			"tipoMontagem": "COMPLETA",
			"eixos": "0",
			"corVeiculo": "BRANCA",
			"tipoCarroceria": "INEXISTENTE",
			"especieVeiculo": "PASSAGEIRO",
			"tipoVeiculo": "AUTOMOVEL",
			"numTerceiroEixo": "",
			"numMotor": "0DD29H8D2H8",
			"eixoTraseiroDif": "",
			"caixaCambio": "xx0x0xx09xx202",
			"numCarroceria": "0",
			"nacionalidade": null,
			"capacidadeCarga": "0,00",
			"potencia": "60",
			"combustivel": "GASOLINA",
			"marcaModelo": "GM/CORSA WIND",
			"municipio": "ILHABELA-SP",
			"anoModelo": "2001",
			"anoFabricacao": "2000",
			"numFaturado": null,
			"ultimaDataInclusao": null,
			"renavam": "0000000000000000",
			"placa": "XXX0000",
			"chassi": "0DD2928DHD28D2H8D2H8",
			"createAt": "2018-07-03T14:24:19.285Z"
		}
	}
}
*/
