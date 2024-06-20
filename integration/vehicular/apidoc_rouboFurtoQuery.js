/**
* @api {post} /api/vehicle/:userid Consultar Roubo e Furto
* @apiVersion 5.27.1
* @apiName RouboFurtoQuery
* @apiGroup Consultas Veiculares
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.

* @apiParam {String} userid ID do usuário
* @apiParam {String} querycode Código da consulta. (Código = 11 para consulta de Roubo e Furto)
* @apiParam {Object} keys Chaves para realização da consulta
* @apiParam {String} keys.placa A placa para realização da consulta de roubo e furto
* @apiParam {String} keys.chassi O chassi para realização da consulta de roubo e furto

* @apiDescription O parametro USER_ID deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br><b>EX: /api/vehicle/<USER_ID></b>

* @apiParamExample {json} Request-Example:
{
  "querycode":11,
  "keys" : {
    "placa" : "XXX0000"
  }
}

* @apiParamExample {json} Request-Example:
{
  "querycode":11,
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
            "queryid": "XXXXXXXXXXXXXXXX",
            "name": "Roubo e Furto",
            "date": "02/07/2018 14:50:40",
            "keys": {
                "placa": "XXX0000"
            }
        },
        "data": {
        "anoFabricacao": "2001",
            "anoModelo": "2001",
            "caixaCambio": "7763284",
            "capMaxTracao": "6600,00",
            "capacidadeCarga": "0,00",
            "capacidadePassageiro": "0",
            "categoria": "ALUGUEL",
            "chassi": "0DD2928DHD28D2H8D2H8",
            "cidade": null,
            "cilindradas": "0",
            "cmt": "66,00",
            "codigoCombustivel": "3",
            "codigoFipe": [],
            "codigoMarcaModelo": "309517",
            "codigoMunicipio": "6219",
            "combustivel": "DIESEL",
            "corVeiculo": "BRANCA",
            "di": null,
            "docFaturado": "59104901000176",
            "dtAtualizacao": "09/02/2017 13:35:48",
            "dtUltimaAtualizacao": "18/07/2019",
            "eixoTraseiroDif": "764375",
            "eixos": "3",
            "especieVeiculo": "TRACAO",
            "identImportadora": "",
            "limiteRestricaoTrib": null,
            "linha": null,
            "marcaModelo": "SCANIA/R124 GA4X2NZ 420",
            "municipio": "BAURU",
            "municipioEmplacamento": null,
            "nacionalidade": "NACIONAL",
            "numCarroceria": "0",
            "numFaturado": null,
            "numMotor": "8010147",
            "numTerceiroEixo": "764375",
            "ocorrencia": "VEICULO NAO INDICA OCORRENCIA DE ROUBO/FURTO",
            "pbt": "66,00",
            "pesoBrutoTotal": "1820,00",
            "placa": "XXX0000",
            "potencia": "420",
            "procedencia": "Nacional",
            "qtdPax": null,
            "registroDi": null,
            "renavam": "769175422",
            "restricoes": "NADA CONSTA",
            "rouboFurto": {
            "constaOcorrencia": true,
                "constaOcorrenciaAtiva": true,
                "historico": [
                {
                    "_id": "5df15193c1344d0c4f6602e3",
                    "ufOcorrencia": "SP",
                    "placa": "XXX0000",
                    "ocorrencia": "Alerta de Roubo/Furto",
                    "municipioOcorrencia": "IRACEMAPOLIS",
                    "marcaModelo": "SCANIA/R124 GA4X2NZ 420  ",
                    "declaracao": "Roubo",
                    "dataOcorrencia": "19/12/2012",
                    "cor": "BRANCA    ",
                    "chassi": "0DD2928DHD28D2H8D2H8"
                },
                {
                    "_id": "5df15193c1344d0c4f6602e5",
                    "ufOcorrencia": "SP",
                    "placa": "XXX0000",
                    "ocorrencia": "Devolvido",
                    "municipioOcorrencia": "MOCOCA",
                    "marcaModelo": "Não informado",
                    "declaracao": "Não informado",
                    "dataOcorrencia": "21/12/2012",
                    "cor": "Não informado",
                    "chassi": "0DD2928DHD28D2H8D2H8"
                }
            ],
                "indicadorProcedencia": "Não informado",
                "municipioEmplacamento": "BAURU"
        },
        "situacaoChassi": "NORMAL",
            "situacaoVeiculo": "CIRCULACAO",
            "tipoCarroceria": "INEXISTENTE",
            "tipoDocFaturado": "JURIDICA",
            "tipoDocImportadora": null,
            "tipoMontagem": "",
            "tipoVeiculo": "CAMINHÃO TRATOR",
            "uf": "SP",
            "ufFaturado": "PR",
            "ultimaDataInclusao": "09/02/2017 13:35:48",
            "unidadeLocalSRF": "0"
        }
    }
}
*/
