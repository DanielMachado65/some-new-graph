/**
 * @api {post} /api/service/ Reconsultar serviços que falharam
 * @apiVersion 5.27.1
 * @apiName Query
 * @apiGroup Gerenciar Consultas
 *
 * @apiHeader {String} Authorization - Token de acesso retornado após autenticação.

 * @apiParam {String} queryid - Id da consulta
 * @apiParam {String} serviceLog - Id do log de serviço que é retornado quando uma consulta é realizada
 *
 * @apiDescription ATENÇÃO: Só é possível reconsultar insumos que falharam 2 vezes em intervalos de 15 minutos para evitar sobrecarga nas APIs durante a execução da reconsulta. Este caso de uso se faz valer apenas em casos onde a indisponibilidade do insumo persista após as tentativas de execução subsequentes às duas primeiras tentativas que falharem.
 *
 * @apiParamExample {json} Request-Example:
 {
  "queryid": "ID_DA_CONSULTA_AQUI",
  "serviceLog": "ID_DO_LOG_DE_SERVICO_AQUI"
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
            "tipoDocProprietario": "Jurídica",
            "docProprietario": null,
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

 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 {
    "status": {
        "cod": 200,
        "msg": "ok"
    },
        "body": {
        "error": "Você atingiu o limite de reconsultas, tente reprocessar a consulta novamente em 15 minutos. Obrigado!"
    }
 }

 * @apiErrorExample {json} Error-Response
 * HTTP/1.1 410 GONE
    {
        "status": {
            "cod": 410,
            "msg": "bad request"
        },
        "body": {
            "error": "Ops... Falhou! Desculpe-nos, mas nosso fornecedor primário esta temporariamente indisponível... Retorne em alguns instantes..."
        }
    }
 */
