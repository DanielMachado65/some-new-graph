/**
* @api {post} /api/vehicle/:userid Consultar Veículo Completo
* @apiVersion 5.27.1
* @apiName VeiculoCompletoQuery
* @apiGroup Consultas Veiculares
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.

* @apiParam {String} userid ID do usuário
* @apiParam {String} querycode Código da consulta. (Código = 100 para consulta de Veículo Completo)
* @apiParam {Object} keys Chaves para realização da consulta
* @apiParam {String} keys.placa A placa para realização da consulta de roubo e furto
* @apiParam {String} keys.chassi O chassi para realização da consulta de roubo e furto

* @apiDescription O parametro USER_ID deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br><b>EX: /api/vehicle/<USER_ID></b>

* @apiParamExample {json} Request-Example:
{
  "querycode":100,
  "keys" : {
    "placa" : "XXX0000"
  }
}

* @apiParamExample {json} Request-Example:
{
  "querycode":100,
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
            "__v": 1,
            "chassi" : "0DD2928DHD28D2H8D2H8",
            "placa" : "XXX0000",
            "renavam" : "000000000",
            "uf" : "SP",
            "cidade" : null,
            "historicoAnuncios": [],
            "historicoKm" : [],
            "anoFabricacao" : "1999",
            "anoModelo" : "1999",
            "caixaCambio" : "0XX00000",
            "capacidadeCarga" : "00",
            "capacidadePassageiro" : "5",
            "capMaxTracao" : "0",
            "categoria" : "PARTICULAR",
            "cilindradas" : "1762",
            "cmt" : "0.0",
            "codigoCombustivel" : "2",
            "codigoFipe" : null,
            "codigoMarcaModelo" : "000000",
            "combustivel" : "2 - GASOLINA",
            "corVeiculo" : "Verde",
            "docFaturado" : "00000000000000",
            "dtUltimaAtualizacao" : "06/01/2009",
            "eixos" : "2",
            "eixoTraseiroDif" : "",
            "especieVeiculo" : "Passageiro",
            "identImportadora" : "",
            "limiteRestricaoTrib" : null,
            "linha" : null,
            "marca" : "TOYOTA",
            "modelo" : "COROLLA XEI 1.8/1.8 FLEX 16V AUT.",
            "marcaModelo" : "TOYOTA/COROLLA XEI",
            "municipio" : "SAO PAULO",
            "municipioEmplacamento" : null,
            "nacionalidade" : "NACIONAL",
            "numCarroceria" : "0",
            "numFaturado" : null,
            "numMotor" : "X000000",
            "numTerceiroEixo" : "",
            "ocorrencia" : "VEICULO NAO INDICA OCORRENCIA DE ROUBO/FURTO",
            "pbt" : "1,20",
            "pesoBrutoTotal" : "12000",
            "potencia" : "114",
            "procedencia" : "NACIONAL",
            "qtdPax" : null,
            "registroDi" : null,
            "restricoes" : "NADA CONSTA",
            "situacaoChassi" : "N",
            "situacaoVeiculo" : "S",
            "tipoCarroceria" : "INEXISTENTE",
            "tipoDocFaturado" : "JURIDICA",
            "tipoDocImportadora" : "0",
            "tipoMontagem" : "COMPLETA",
            "tipoVeiculo" : "AUTOMOVEL/CAMINHONETE/UTILITARIO",
            "ufFaturado" : "SP",
            "ultimaDataInclusao" : "09/02/2017 13:35:48",
            "unidadeLocalSRF" : "0",
            "fotos" : [],
            "opcionais" : [],
            "valorAnunciado" : null,
            "anuncio": {
                "placa": null,
                "km": null,
                "valor": null,
                "data": null,
                "observacao": null,
                "opcionais": [],
                "fotos": []
            },
            "baseNacional" : {
                "anoFabricacao" : "1999",
                "anoModelo" : "1999",
                "categoria" : "PARTICULAR",
                "chassi" : "0DD2928DHD28D2H8D2H8",
                "combustivel" : "GASOLINA",
                "cor" : "VERDE",
                "di" : "0",
                "docFaturado" : "00000000000000",
                "dtUltimaAtualizacao" : "06/01/2009",
                "especie" : "PASSAGEIRO",
                "especieVeiculo" : "PASSAGEIRO",
                "indicadorComunicacaoVendas" : "NAO",
                "indicadorRestricaoRenajud" : "NAO",
                "motor" : "X000000",
                "municipio" : "SAO PAULO",
                "ocorrencia" : "VEICULO NAO INDICA OCORRENCIA DE ROUBO/FURTO",
                "outrasRestricoes1" : "NADA CONSTA",
                "outrasRestricoes2" : "NADA CONSTA",
                "outrasRestricoes3" : "NADA CONSTA",
                "outrasRestricoes4" : "NADA CONSTA",
                "outrasRestricoes5" : "NADA CONSTA",
                "outrasRestricoes6" : "NADA CONSTA",
                "outrasRestricoes7" : "NADA CONSTA",
                "outrasRestricoes8" : "NADA CONSTA",
                "placa" : "XXX0000",
                "renavam" : "00000000000",
                "restricao1" : "ARRENDAMENTO",
                "restricao2" : null,
                "restricao3" : "NADA CONSTA",
                "restricao4" : "NADA CONSTA",
                "restricaoDataInclusao" : "",
                "restricaoFinanciadora" : " NADA CONSTA ",
                "restricaoFinanciamento" : "",
                "restricaoNomeAgente" : "",
                "restricaoTipoTransacao" : "NADA CONSTA",
                "situacaoVeiculo" : "CIRCULACAO",
                "tipoDocFaturado" : "JURIDICA",
                "tipoDocImportadora" : null,
                "tipoMarcacaoChassi" : "NORMAL",
                "tipoVeiculo" : "AUTOMOVEL",
                "uf" : "SP",
                "ufFaturado" : "SP"
            },
            "baseEstadual" : {
                "categoria" : "PARTICULAR",
                "chassi" : "0DD2928DHD28D2H8D2H8",
                "codigoAgenteFinanceiro" : "",
                "codigoFinanceira" : "",
                "combustivel" : "GASOLINA",
                "comunicacaoInclusao" : "",
                "comunicacaoVenda" : "VEÍCULO COM COMUNICAÇÃO DE VENDA",
                "cor" : "VERDE",
                "dataAlteracaoMotor" : "NAO INFORMADO",
                "dataEmissaoCrv" : "06/01/2009",
                "dataInclusaoIntencaoTrocaFinanceira" : "",
                "dataLimiteRestricaoTributaria" : "",
                "dataVenda" : "17/01/2013",
                "dataVigenciaContratoFinanceira" : "",
                "debitoCetesb" : "0,00",
                "debitoDer" : "0,00",
                "debitoDersa" : "0,00",
                "debitoDetran" : "0,00",
                "debitoDpvat" : "0,00",
                "debitoIpva" : "2.871,10",
                "debitoLicenciamento" : "87,38",
                "debitoMultas" : "0,00",
                "debitoMunicipais" : "0,00",
                "debitoPoliciaRodoviariaFederal" : "0,00",
                "debitoRenainf" : "0,00",
                "especie" : "PASSAGEIRO",
                "exercicioLicenciamento" : "14/03/2012",
                "existeDebitoDpvat" : "NADA CONSTA",
                "existeDebitoIpva" : "2.871,10",
                "existeDebitoLicenciamento" : "NAO EXISTE DEBITO DE LICENCIAMENTO",
                "existeDebitoMulta" : "NADA CONSTA",
                "inspecaoAno" : "",
                "inspecaoCentro" : "",
                "inspecaoData" : "",
                "inspecaoSelo" : "",
                "inspecaoStatus" : "",
                "intencaoDataInslusao" : "",
                "intencaoDocFinanceira" : "",
                "intencaoNomeAgente" : "",
                "intencaoNomeFinanceira" : "",
                "intencaoRestricaoFinanceira" : "",
                "licdata" : "14/03/2012",
                "motor" : "X000000",
                "notaFiscal" : "",
                "numContratoFinanceira" : "",
                "outrasRestricoes1" : "NADA CONSTA",
                "outrasRestricoes2" : "NADA CONSTA",
                "outrasRestricoes3" : "NADA CONSTA",
                "outrasRestricoes4" : "NADA CONSTA",
                "placa" : "XXX0000",
                "pronome" : "BANCO XXXXXXXX",
                "pronomeAnterior" : "CLAUDIO",
                "protocoloDetran" : "23/11/2015",
                "renavam" : "000000000",
                "restricaoAdminisrativa" : "NADA CONSTA",
                "restricaoAmbiental" : "veiculo com inspecao veicular ok",
                "restricaoArrendatario" : "",
                "restricaoDataInclusao" : "",
                "restricaoDocArrendatario" : "",
                "restricaoFinanceira" : "NADA CONSTA",
                "restricaoGuincho" : "NADA CONSTA",
                "restricaoJudicial" : "NADA CONSTA",
                "restricaoNomeAgente" : "",
                "restricaoRenajud" : "NADA CONSTA",
                "restricaoRouboFurto" : "NADA CONSTA",
                "restricaoTributaria" : "NADA CONSTA",
                "situacaoVeiculo" : "CIRCULACAO",
                "tipoMarcacaoChassi" : "NORMAL",
                "uf" : "SP",
                "municipio" : "SAO PAULO - SP",
                "tipo" : "AUTOMOVEL",
                "restricoes" : "NADA CONSTA",
                "procedencia" : "NACIONAL",
                "potencia" : "114",
                "pbt" : "12000",
                "ocorrenciaComunicacaoVenda" : "true",
                "numCaixaCambio" : "0XX00000",
                "montagem" : "COMPLETA",
                "marcaModelo" : "114805 - TOYOTA/COROLLA XEI",
                "inspecaoMunicipal" : "Veículo com Inspeção Veicular OK",
                "gravame" : "NADA CONSTA",
                "gare" : "NADA CONSTA",
                "eixos" : "2",
                "cmt" : "0",
                "cilindrada" : "1762",
                "carroceria" : "NAO IDENTIFICADO",
                "capacidadePassageiros" : "5",
                "anoModelo" : "1999",
                "anoFabricacao" : "1999"
            },
            "indicioSinistro" : {
                "descricao" : "NÃO CONSTA INDÍCIO DE SINISTRO PARA O VEÍCULO INFORMADO 😃",
                "classificacao" : null
            },
            "rouboFurto" : {
                "constaOcorrencia" : false,
                "constaOcorrenciaAtiva" : false,
                "indicadorProcedencia" : null,
                "municipioEmplacamento" : null,
                "historico" : []
            },
            "decodificadorPrecificador" : {
                "localFabricacao" : null,
                "marca" : "TOYOTA",
                "modelo" : "COROLLA XEI",
                "potenciaMotor" : null,
                "pais" : "BRASIL",
                "regiao" : "BRASIL / PARAGUAI / COLOMBIA / URUGUAI",
                "tipoCarroceria" : "SEDAN",
                "categoria" : "AUTOMOVEL",
                "origem" : "NACIONAL",
                "versao" : "XEI",
                "chassi" : "0DD2928DHD28D2H8D2H8",
                "anoModelo" : "1999",
                "precificadorI" : [
                    {
                        "codigo" : "002061-3",
                        "combustivel" : "G",
                        "marca" : "Toyota",
                        "modelo" : "Corolla XEi 1.8/1.8 Flex 16V Aut.",
                        "valor" : "14787",
                        "dataRefFipe" : null,
                        "valorZeroKM" : null,
                        "graphMes1" : null,
                        "graphMes2" : null,
                        "graphMes3" : null,
                        "graphMes4" : null,
                        "graphMes5" : null,
                        "graphMes6" : null,
                        "graphMes7" : null,
                        "graphMes8" : null,
                        "graphMes9" : null,
                        "graphMes10" : null,
                        "graphMes11" : null,
                        "graphMes12" : null,
                        "graphValor1" : null,
                        "graphValor2" : null,
                        "graphValor3" : null,
                        "graphValor4" : null,
                        "graphValor5" : null,
                        "graphValor6" : null,
                        "graphValor7" : null,
                        "graphValor8" : null,
                        "graphValor9" : null,
                        "graphValor10" : null,
                        "graphValor11" : null,
                        "graphValor12" : null,
                        "_id" : "5d710cbdb574f4001f582d9b"
                    },
                    {
                        "codigo" : "002028-1",
                        "combustivel" : "G",
                        "marca" : "Toyota",
                        "modelo" : "Corolla XEi 1.8/1.8 Flex 16V Mec.",
                        "valor" : "13832",
                        "dataRefFipe" : null,
                        "valorZeroKM" : null,
                        "graphMes1" : null,
                        "graphMes2" : null,
                        "graphMes3" : null,
                        "graphMes4" : null,
                        "graphMes5" : null,
                        "graphMes6" : null,
                        "graphMes7" : null,
                        "graphMes8" : null,
                        "graphMes9" : null,
                        "graphMes10" : null,
                        "graphMes11" : null,
                        "graphMes12" : null,
                        "graphValor1" : null,
                        "graphValor2" : null,
                        "graphValor3" : null,
                        "graphValor4" : null,
                        "graphValor5" : null,
                        "graphValor6" : null,
                        "graphValor7" : null,
                        "graphValor8" : null,
                        "graphValor9" : null,
                        "graphValor10" : null,
                        "graphValor11" : null,
                        "graphValor12" : null,
                        "_id" : "5d710cbdb574f4001f582d9c"
                    }
                ]
            },
            "recall" : {
                "chassi" : "0DD2928DHD28D2H8D2H8",
                "marca" : "TOYOTA",
                "modelo" : "COROLLA XEI",
                "anoModelo" : "1999",
                "descricaoRetorno" : "Veiculo encontrado sem Recall",
                "detalhes" : []
            },
            "analiseRisco" : {
                "parecer" : "Veículo com baixo risco de recusa em comercialização/seguro 😃",
                "indiceRisco" : "1",
                "imageLink" : null
            },
            "leilao" : {
                "descricao" : "Não consta registro de leilão para o veículo informado",
                "registros" : []
            },
            "localizadorAgregados" : [
                {
                    "_id" : "5d3705db8e5a2431fa4b1414",
                    "observacao" : null,
                    "parte" : "VEICULO FRENTE",
                    "imagemUrl" : "HTTPS://IMAGENS.AUTOCORP.COM.BR/AGREGADOS/23072019/AD5187D2EBC04D4393C76717741D3BF523072019092717.JPG"
                },
                {
                    "_id" : "5d3705db8e5a2431fa4b1415",
                    "observacao" : null,
                    "parte" : "VEICULO TRASEIRA",
                    "imagemUrl" : "HTTPS://IMAGENS.AUTOCORP.COM.BR/AGREGADOS/23072019/9E55D0E373474AB29708BB6C940CB08A23072019092717.JPG"
                },
                {
                    "_id" : "5d3705db8e5a2431fa4b1416",
                    "observacao" : null,
                    "parte" : "MORFOLOGIA NR CHASSI 1",
                    "imagemUrl" : "HTTPS://IMAGENS.AUTOCORP.COM.BR/AGREGADOS/23072019/344436E72FF0452997893765CDBED94023072019092717.JPG"
                },
                {
                    "_id" : "5d3705db8e5a2431fa4b1417",
                    "observacao" : "PAINEL CORTA-FOGO (LADO DIREITO)",
                    "parte" : "INDICACAO NR CHASSI 1",
                    "imagemUrl" : "HTTPS://IMAGENS.AUTOCORP.COM.BR/AGREGADOS/23072019/F74925469FE3453BAE6DA0DD6B1C2CC523072019092717.JPG"
                },
                {
                    "_id" : "5d3705db8e5a2431fa4b1418",
                    "observacao" : null,
                    "parte" : "MORFOLOGIA NR MOTOR",
                    "imagemUrl" : "HTTPS://IMAGENS.AUTOCORP.COM.BR/AGREGADOS/23072019/1F67B84C7AC145E1A5CD668DF9E7133E23072019092717.JPG"
                },
                {
                    "_id" : "5d3705db8e5a2431fa4b1419",
                    "observacao" : "LATERAL ESQUERDA, FINAL DO BLOCO",
                    "parte" : "INDICACAO NR MOTOR",
                    "imagemUrl" : "HTTPS://IMAGENS.AUTOCORP.COM.BR/AGREGADOS/23072019/602B4234D1974AB49A1592E8F3D2CB2D23072019092717.JPG"
                },
                {
                    "_id" : "5d3705db8e5a2431fa4b141a",
                    "observacao" : null,
                    "parte" : "ETIQUETAS DESTRUTIVEIS",
                    "imagemUrl" : "HTTPS://IMAGENS.AUTOCORP.COM.BR/AGREGADOS/23072019/ECEF2563848F4331BA3927BC3EB5D5EE23072019092717.JPG"
                },
                {
                    "_id" : "5d3705db8e5a2431fa4b141b",
                    "observacao" : null,
                    "parte" : "MORFOLOGIA GRAVACAO VIDROS",
                    "imagemUrl" : "HTTPS://IMAGENS.AUTOCORP.COM.BR/AGREGADOS/23072019/E3D35E936EFA47D090ECA531B2B6E39223072019092717.JPG"
                }
            ],
            "di" : null,
            "dtAtualizacao" : "04/04/2018 09:40:53",
            "codigoMunicipio" : "7107"
        }
    }
}
*/
