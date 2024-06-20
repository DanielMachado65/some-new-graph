/**
* @api {post} /api/vehicle/:userid Consulta Veiculo Basico
* @apiVersion 5.25.4
* @apiName ConsultaVeiculoBasicoQuery
* @apiGroup Consultas Veiculares
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.

* @apiParam {String} userid ID do usuário
* @apiParam {String} querycode Código da consulta. (Código = 99 para Consulta Veiculo Basico)
* @apiParam {Object} keys Chaves para realização da consulta
* @apiParam {String} keys.placa A placa para realização da Consulta Veiculo Basico
* @apiParam {String} keys.chassi O chassi para realização da Consulta Veiculo Basico

* @apiDescription O parametro USER_ID deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br><b>EX: /api/vehicle/<USER_ID></b>

* @apiParamExample {json} Request-Example:
{
  "querycode": 99,
  "keys" : {
    "placa" : "XXX0000"
  }
}

* @apiParamExample {json} Request-Example:
{
  "querycode": 99,
  "keys" : {
    "chassi" : "0XX0000XXX00X0X0X0X0"
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
			"queryid": "555555555555555555555555555",
			"name": "Consulta Veiculo Basico",
			"date": "2000-01-01T00:00:01.404Z",
			"keys": {
				"placa": "XXX0000"
			}
		},
		"data": {
      "analiseRisco": {
        "imageLink": "",
        "indiceRisco": "",
        "parecer": ""
      },
      "anoFabricacao": "",
      "anoModelo": "",
      "baseEstadual": {
        "categoria": "",
        "chassi": "",
        "codigoAgenteFinanceiro": "",
        "codigoFinanceira": "",
        "combustivel": "",
        "comunicacaoInclusao": "",
        "comunicacaoVenda": "",
        "cor": "",
        "dataAlteracaoMotor": "",
        "dataEmissaoCrv": "",
        "dataInclusaoIntencaoTrocaFinanceira": "",
        "dataLimiteRestricaoTributaria": "",
        "dataVenda": "",
        "dataVigenciaContratoFinanceira": "",
        "debitoCetesb": "",
        "debitoDer": "",
        "debitoDersa": "",
        "debitoDetran": "",
        "debitoDpvat": "",
        "debitoIpva": "",
        "debitoLicenciamento": "",
        "debitoMultas": "",
        "debitoMunicipais": "",
        "debitoPoliciaRodoviariaFederal": "",
        "debitoRenainf": "",
        "docComprador": "",
        "especie": "",
        "exercicioLicenciamento": "",
        "existeDebitoDpvat": "",
        "existeDebitoIpva": "",
        "existeDebitoLicenciamento": "",
        "existeDebitoMulta": "",
        "inspecaoAno": "",
        "inspecaoCentro": "",
        "inspecaoData": "",
        "inspecaoSelo": "",
        "inspecaoStatus": "",
        "intencaoDataInslusao": "",
        "intencaoDocFinanceira": "",
        "intencaoNomeAgente": "",
        "intencaoNomeFinanceira": "",
        "intencaoRestricaoFinanceira": "",
        "licdata": "",
        "motor": "",
        "notaFiscal": "",
        "numContratoFinanceira": "",
        "outrasRestricoes1": "",
        "outrasRestricoes2": "",
        "outrasRestricoes3": "",
        "outrasRestricoes4": "",
        "placa": "",
        "pronome": "",
        "pronomeAnterior": "",
        "protocoloDetran": "",
        "renavam": "",
        "restricaoAdminisrativa": "",
        "restricaoAmbiental": "",
        "restricaoArrendatario": "",
        "restricaoDataInclusao": "",
        "restricaoDocArrendatario": "",
        "restricaoFinanceira": "",
        "restricaoGuincho": "",
        "restricaoJudicial": "",
        "restricaoNomeAgente": "",
        "restricaoRenajud": "",
        "restricaoRouboFurto": "",
        "restricaoTributaria": "",
        "situacaoVeiculo": "",
        "tipoDocComprador": "",
        "tipoMarcacaoChassi": "",
        "uf": "",
        "municipio": "",
        "tipo": ""
      },
      "baseNacional": {
        "anoFabricacao": "",
        "anoModelo": "",
        "categoria": "",
        "chassi": "",
        "combustivel": "",
        "cor": "",
        "di": "",
        "docFaturado": "",
        "dtEmissaoCrv": "",
        "dtUltimaAtualizacao": "",
        "especie": "",
        "especieVeiculo": "",
        "indicadorComunicacaoVendas": "",
        "indicadorRestricaoRenajud": "",
        "motor": "",
        "municipio": "",
        "ocorrencia": "",
        "outrasRestricoes1": "",
        "outrasRestricoes2": "",
        "outrasRestricoes3": "",
        "outrasRestricoes4": "",
        "outrasRestricoes5": "",
        "outrasRestricoes6": "",
        "outrasRestricoes7": "",
        "outrasRestricoes8": "",
        "placa": "",
        "renavam": "",
        "restricao1": "",
        "restricao2": "",
        "restricao3": "",
        "restricao4": "",
        "restricaoDataInclusao": "",
        "restricaoFinanciadora": "",
        "restricaoFinanciamento": "",
        "restricaoNomeAgente": "",
        "restricaoTipoTransacao": "",
        "situacaoVeiculo": "",
        "tipoDocFaturado": "",
        "tipoDocImportadora": "",
        "tipoMarcacaoChassi": "",
        "tipoVeiculo": "",
        "uf": "",
        "ufFaturado": ""
      },
      "caixaCambio": "",
      "capMaxTracao": "",
      "capacidadeCarga": "",
      "capacidadePassageiro": "",
      "categoria": "",
      "chassi": "",
      "cidade": "",
      "cilindradas": "",
      "cmt": "",
      "codigoCombustivel": "",
      "codigoFipe": [""],
      "codigoMarcaModelo": "",
      "codigoMunicipio": "",
      "combustivel": "",
      "corVeiculo": "",
      "di": "",
      "docFaturado": "",
      "dtAtualizacao": "",
      "dtUltimaAtualizacao": "",
      "eixoTraseiroDif": "",
      "eixos": "",
      "especieVeiculo": "",
      "identImportadora": "",
      "indicioSinistro": {
        "classificacao": "",
        "descricao": ""
      },
      "km": "",
      "leilao": {
        "score": {
          "aceitacao": "",
          "exigenciaVistoriaEspecial": "",
          "percentualSobreRef": "",
          "pontuacao": "",
          "score": ""
        },
        "descricao": "",
        "registros": []
      },
      "limiteRestricaoTrib": "",
      "linha": "",
      "marcaModelo": "",
      "municipio": "",
      "municipioEmplacamento": "",
      "nacionalidade": "",
      "numCarroceria": "",
      "numFaturado": "",
      "numMotor": "",
      "numTerceiroEixo": "",
      "ocorrencia": "",
      "pbt": "",
      "pesoBrutoTotal": "",
      "placa": "",
      "potencia": "",
      "procedencia": "",
      "qtdPax": "",
      "registroDi": "",
      "renavam": "",
      "restricao1": "",
      "restricao2": "",
      "restricao3": "",
      "restricao4": "",
      "restricoes": "",
      "situacaoChassi": "",
      "situacaoVeiculo": "",
      "tipoCarroceria": "",
      "tipoDocFaturado": "",
      "tipoDocImportadora": "",
      "tipoMontagem": "",
      "tipoVeiculo": "",
      "uf": "",
      "ufFaturado": "",
      "ultimaDataInclusao": "",
      "unidadeLocalSRF": ""
    }
	}
}
*/
