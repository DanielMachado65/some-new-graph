/**
* @api {get} /api/query/by-id/:queryid Buscar Consulta por ID (Completa)
* @apiVersion 5.27.1
* @apiName GetQueryById
* @apiGroup Consultas
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.
*
* @apiSuccess {String} queryid ID da consulta.
*
* @apiDescription O parâmetro QUERY_ID deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX:  /api/query/by-id/<QUERY_ID></b>
* <br>A diferença maior desta requisição para a requisição /api/query/:queryid consiste em que o retorno para essa requisição, traz o objeto de consulta com todos os dados disponíveis.

* @apiSuccessExample Success-Response:
{
  "status": {
    "cod": 200,
    "msg": "ok"
  },
  "body": {
    "_id": "XXXXXXXXXXXXXXXXXXXXXXXX",
    "__v": 6,
    "log": "XXXXXXXXXXXXXXXXXXXXXXXX",
    "code": 99,
    "status": true,
    "failedServices": [],
    "stackResult": [
      {
        "_id": "XXXXXXXXXXXXXXXXXXXXXXXX",
        "dataFound": true,
        "serviceLog": "XXXXXXXXXXXXXXXXXXXXXXXX",
        "rawData": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<RESPOSTA><RETORNO><EXISTE_ERRO>0</EXISTE_ERRO><MSG_ERRO></MSG_ERRO><MSG_ERRO2></MSG_ERRO2><CHAVERETORNO>180730185741313</CHAVERETORNO><SITUACAOVEIC>CIRCULACAO</SITUACAOVEIC><OCORRENCIA>VEICULO NAO INDICA OCORRENCIA DE ROUBO/FURTO</OCORRENCIA><PLACA>DMP5463</PLACA><MUNICIPIO>COTIA</MUNICIPIO><UF>SP</UF><RENAVAM>00939388278</RENAVAM><CPF_CNPJ_PROPRIETARIO>02323572857</CPF_CNPJ_PROPRIETARIO><VEIANOFABR>2007</VEIANOFABR><VEIANOMODELO>2008</VEIANOMODELO><MODELO>CORSA HATCH JOY</MODELO><MARCA>GM</MARCA><ULTIMAATUALIZACAO>18/03/2014</ULTIMAATUALIZACAO><MOTOR>H70055741</MOTOR><CHASSI>9BGXL68608C134866</CHASSI><TIPOREMARCCHASSI>NORMAL</TIPOREMARCCHASSI><TIPO>AUTOMOVEL</TIPO><TIPOMONTAGEM>COMPLETA</TIPOMONTAGEM><CARROCERIA>INEXISTENTE</CARROCERIA><COR>PRATA</COR><COMBUSTIVEL>ALCOOL/GASOLINA</COMBUSTIVEL><POTENCIA>79</POTENCIA><CILINDRADA>1000</CILINDRADA><CAPACIDADECARGA>0,00</CAPACIDADECARGA><VEIPROCEDENCIA>NACIONAL</VEIPROCEDENCIA><CAPACIDADEPASSAG>5</CAPACIDADEPASSAG><NUMERO_CAIXACAMBIO>070460900</NUMERO_CAIXACAMBIO><NUMERO_CARROCERIA>999</NUMERO_CARROCERIA><NUMERO_EIXOTRASEIRODIF></NUMERO_EIXOTRASEIRODIF><NUMERO_TERCEIROEIXO></NUMERO_TERCEIROEIXO><CMT>210</CMT><PBT>0,00</PBT><EIXOS>0</EIXOS><TIPODOCUMENTOFATURADO>JURIDICA</TIPODOCUMENTOFATURADO><CPFCNPJFATURADO>59275792000826</CPFCNPJFATURADO><UFFATURADO>SP</UFFATURADO><TIPODOCUMENTOIMPORTADORA></TIPODOCUMENTOIMPORTADORA><RESTRICAO01>NADA CONSTA</RESTRICAO01><RESTRICAO02>NADA CONSTA</RESTRICAO02><RESTRICAO03>NADA CONSTA</RESTRICAO03><RESTRICAO04>NADA CONSTA</RESTRICAO04><INDICADORCOMUNICACAODEVENDAS>NAO</INDICADORCOMUNICACAODEVENDAS><INDICADORRESTRICAORENAJUD>NAO</INDICADORRESTRICAORENAJUD><NUMERO_DI>0000000000</NUMERO_DI><RESTRICAOTIPOTRANSACAO>NADA CONSTA</RESTRICAOTIPOTRANSACAO><RESTRICOESRESTRICAOFINAN> NADA CONSTA </RESTRICOESRESTRICAOFINAN><RESTRICAONOMEAGENTE></RESTRICAONOMEAGENTE><RESTRICAOFINANCIADO></RESTRICAOFINANCIADO><RESTRICAOCPFCNPJFINANCIADO></RESTRICAOCPFCNPJFINANCIADO><RESTRICAODATAINCLUSAO></RESTRICAODATAINCLUSAO><OUTRAS_RESTRICOES_01>NADA CONSTA</OUTRAS_RESTRICOES_01><OUTRAS_RESTRICOES_02>NADA CONSTA</OUTRAS_RESTRICOES_02><OUTRAS_RESTRICOES_03>NADA CONSTA</OUTRAS_RESTRICOES_03><OUTRAS_RESTRICOES_04>NADA CONSTA</OUTRAS_RESTRICOES_04><OUTRAS_RESTRICOES_05>NADA CONSTA</OUTRAS_RESTRICOES_05><OUTRAS_RESTRICOES_06>NADA CONSTA</OUTRAS_RESTRICOES_06><OUTRAS_RESTRICOES_07>NADA CONSTA</OUTRAS_RESTRICOES_07><OUTRAS_RESTRICOES_08>NADA CONSTA</OUTRAS_RESTRICOES_08><CATEGORIA>PARTICULAR</CATEGORIA><ESPECIE>PASSAGEIRO</ESPECIE><TEMPOEXECUCAO>3</TEMPOEXECUCAO></RETORNO></RESPOSTA>"
      },
      {
        "_id": "XXXXXXXXXXXXXXXXXXXXXXXX",
        "dataFound": true,
        "serviceLog": "XXXXXXXXXXXXXXXXXXXXXXXX",
        "rawData": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<RESPOSTA><RETORNO><EXISTE_ERRO>0</EXISTE_ERRO><MSG_ERRO>DMP5463 9BGXL68608C134866</MSG_ERRO><CHAVERETORNO>180730185745576</CHAVERETORNO><SITUACAOVEICULO>CIRCULACAO</SITUACAOVEICULO><PLACA>DMP5463</PLACA><MUNICIPIO>COTIA-SP</MUNICIPIO><RENAVAM>00939388278</RENAVAM><CPF_CNPJ_PROPRIETARIO>2323572857</CPF_CNPJ_PROPRIETARIO><TIPODOCUMENTOPROPRIETARIO>FISICA</TIPODOCUMENTOPROPRIETARIO><PRONOME>02323572857 EDMEA CLEMENTINA VICENTE DE REZENDE</PRONOME><LICDATA>22/01/2018</LICDATA><CHASSI>9BGXL68608C134866</CHASSI><TIPOREMARCACAOCHASSI>NORMAL</TIPOREMARCACAOCHASSI><MARCA>GM</MARCA><MODELO>CORSA HATCH JOY</MODELO><VEIANOFABR>2007</VEIANOFABR><VEIANOMODELO>2008</VEIANOMODELO><TIPO>AUTOMOVEL</TIPO><CARROCERIA>INEXISTENTE</CARROCERIA><COR>PRATA</COR><ESPECIE>PASSAGEIRO</ESPECIE><VEICATEGORIA>PARTICULAR</VEICATEGORIA><COMBUSTIVEL>ALCOOL/GASOLINA</COMBUSTIVEL><POTENCIA>79</POTENCIA><CILINDRADA>1000</CILINDRADA><CAPACIDADECARGA>0,00</CAPACIDADECARGA><VEIPROCEDENCIA>NACIONAL</VEIPROCEDENCIA><CAPACIDADEPASSAG>5</CAPACIDADEPASSAG><MOTOR>H70055741</MOTOR><NUMERO_CAIXACAMBIO>070460900</NUMERO_CAIXACAMBIO><NUMERO_CARROCERIA></NUMERO_CARROCERIA><NUMERO_EIXOTRASEIRODIF></NUMERO_EIXOTRASEIRODIF><NUMERO_TERCEIROEIXO></NUMERO_TERCEIROEIXO><CMT>210</CMT><PBT>0</PBT><EIXOS>0</EIXOS><TIPODOCUMENTOFATURADO>JURIDICA</TIPODOCUMENTOFATURADO><CPFCNPJFATURADO>59275792000826</CPFCNPJFATURADO><UFFATURADO>SP</UFFATURADO><TIPODOCUMENTOIMPORTADORA></TIPODOCUMENTOIMPORTADORA><RESTRICAOFINAN>NADA CONSTA</RESTRICAOFINAN><RESTRICAONOMEAGENTE></RESTRICAONOMEAGENTE><RESTRICAOARRENDATARIO></RESTRICAOARRENDATARIO><RESTRICAODATAINCLUSAO></RESTRICAODATAINCLUSAO><NUMEROCONTRATOFINANCEIRA></NUMEROCONTRATOFINANCEIRA><CODIGOAGENTEFINANCEIRO></CODIGOAGENTEFINANCEIRO><DATAVIGENCIACONTRATOFINANCEIRA></DATAVIGENCIACONTRATOFINANCEIRA><EXISTEDEBITODEIPVA>NAO EXISTE DEBITO DE IPVA</EXISTEDEBITODEIPVA><EXISTEDEBITOMULTA>NAO EXISTE DEBITO DE MULTA</EXISTEDEBITOMULTA><DEBIPVA>0,00</DEBIPVA><EXISTEDEBITODELICENCIAMENTO>NAO EXISTE DEBITO DE LICENCIAMENTO</EXISTEDEBITODELICENCIAMENTO><EXISTEDEBITODELICENCIAMENTOVL>0,00</EXISTEDEBITODELICENCIAMENTOVL><VALORTOTALDEBITOMULTA>0,00</VALORTOTALDEBITOMULTA><EXISTEDEBITODEDPVAT>NAO EXISTE DEBITO DE DPVAT</EXISTEDEBITODEDPVAT><DPVAT>0,00</DPVAT><OUTRAS_RESTRICOES_01>NADA CONSTA</OUTRAS_RESTRICOES_01><OUTRAS_RESTRICOES_02>NADA CONSTA</OUTRAS_RESTRICOES_02><OUTRAS_RESTRICOES_03>NADA CONSTA</OUTRAS_RESTRICOES_03><OUTRAS_RESTRICOES_04>NADA CONSTA</OUTRAS_RESTRICOES_04><PRONOMEANTERIOR>pedro nobre junior</PRONOMEANTERIOR><RESTRICAOCPFCNPJARRENDATAR></RESTRICAOCPFCNPJARRENDATAR><INTENCAORESTRICAOFINAN></INTENCAORESTRICAOFINAN><INTENCAONOMEAGENTE></INTENCAONOMEAGENTE><INTENCAONOMEFINANC></INTENCAONOMEFINANC><INTENCAOCPFCNPJFINANC></INTENCAOCPFCNPJFINANC><INTENCAODATAINCLUSAO></INTENCAODATAINCLUSAO><DEBDERSA>0,00</DEBDERSA><DEBDER>0,00</DEBDER><DEBDETRAN>0,00</DEBDETRAN><DEBCETESB>0,00</DEBCETESB><DEBRENAINF>0,00</DEBRENAINF><DEBMUNICIPAIS>0,00</DEBMUNICIPAIS><DEBPOLRODFED>0,00</DEBPOLRODFED><RESFURTO>NADA CONSTA</RESFURTO><RESGUINCHO>NADA CONSTA</RESGUINCHO><RESADMINISTRATIVA>NADA CONSTA</RESADMINISTRATIVA><RESJUDICIAL>NADA CONSTA</RESJUDICIAL><RESTRIBUTARIA>NADA CONSTA</RESTRIBUTARIA><RESRENAJUD>NADA CONSTA</RESRENAJUD><RESAMBIENTAL>veiculo com inspecao veicular ok</RESAMBIENTAL><LICEXELIC>2018</LICEXELIC><DATAEMISSAOCRV>18/03/2014</DATAEMISSAOCRV><CCOMUNICACAOVENDA>NAO CONSTA COMUNICACAO DE VENDAS </CCOMUNICACAOVENDA><CCOMUNICINCLUSAO></CCOMUNICINCLUSAO><TIPODOCCOMPRADOR></TIPODOCCOMPRADOR><CPFCNPJCOMPRADOR></CPFCNPJCOMPRADOR><DATAVENDA></DATAVENDA><NOTAFISCAL></NOTAFISCAL><PROTOCOLODETRAN></PROTOCOLODETRAN><INSPECAOANO/><INSPECAOCENTRO/><INSPECAODATA/><INSPECAOSELO/><INSPECAOSTATUS/><CODIGOFINANCEIRA></CODIGOFINANCEIRA><DATAINCLUSAOINTENCAOTROCAFINANCEIRA></DATAINCLUSAOINTENCAOTROCAFINANCEIRA><DATALIMITERESTRICAOTRIBUTARIA></DATALIMITERESTRICAOTRIBUTARIA><TEMPOEXECUCAO>4</TEMPOEXECUCAO></RETORNO></RESPOSTA>"
      },
      {
        "_id": "XXXXXXXXXXXXXXXXXXXXXXXX",
        "dataFound": false,
        "serviceLog": "XXXXXXXXXXXXXXXXXXXXXXXX",
        "rawData": "{\"MensagemRetorno\":\"Não Retornou Dados\",\"StatusRetorno\":\"6\",\"ParametroPesquisa\":\"DMP5463\",\"TipoParametro\":\"Placa\",\"ObjetoRetorno\":null}"
      },
      {
        "_id": "XXXXXXXXXXXXXXXXXXXXXXXX",
        "dataFound": false,
        "serviceLog": "XXXXXXXXXXXXXXXXXXXXXXXX",
        "rawData": "<?xml version=\"1.0\" encoding=\"utf-8\"?>\r\n<struct_RespostaRst xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns=\"http://webservices.absolutasolucoes.com.br/absoluta/\">\r\n  <Identificacao>\r\n    <NomeDaTransacao>1032 clsLeilao.InputVsRst</NomeDaTransacao>\r\n    <DescricaoDaTransacao>Retorna dados dos veiculos em formato string XML</DescricaoDaTransacao>\r\n    <VersaoDaTransacao>2.34</VersaoDaTransacao>\r\n    <DataDaPublicacao>2018-03-28T00:00:00</DataDaPublicacao>\r\n    <Autor>Absoluta Solucoes Ltda.</Autor>\r\n  </Identificacao>\r\n  <Controle>\r\n    <Cliente>ABSOLUTA</Cliente>\r\n    <Login>ABSOLUTA042</Login>\r\n    <PlacaDeEntrada>DMP5463</PlacaDeEntrada>\r\n    <ChassiDeEntrada>9BGXL68608C134866</ChassiDeEntrada>\r\n    <IPdoComputadorConsumidor>138.94.53.193</IPdoComputadorConsumidor>\r\n    <NomeDoComputadorProvedor>vma302</NomeDoComputadorProvedor>\r\n    <CodigoDeControle>0</CodigoDeControle>\r\n    <Severidade>e1_MensagemDeInformacaoSimples</Severidade>\r\n    <Descricao>Sucesso</Descricao>\r\n    <AcaoAdotada>e1_TrasacaoFoiExecutada</AcaoAdotada>\r\n    <ResultadoDaPesquisa>e2_RegistrosNaoForamLocalizados</ResultadoDaPesquisa>\r\n    <GravacaoDoLog>e1_TransacaoFoiLogada</GravacaoDoLog>\r\n    <DataExecucao>2018-07-30T23:28:45.7322545-03:00</DataExecucao>\r\n    <NrTransacao>57483192</NrTransacao>\r\n    <Observacao />\r\n  </Controle>\r\n</struct_RespostaRst>"
      },
      {
        "_id": "XXXXXXXXXXXXXXXXXXXXXXXX",
        "dataFound": true,
        "serviceLog": "XXXXXXXXXXXXXXXXXXXXXXXX",
        "rawData": "<?xml version=\"1.0\" encoding=\"utf-8\"?>\r\n<struct_RespostaRst xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns=\"http://webservices.absolutasolucoes.com.br/absoluta/\">\r\n  <Identificacao>\r\n    <NomeDaTransacao>1351 clsParecerTecnico.InputParecerTecnicoRst</NomeDaTransacao>\r\n    <DescricaoDaTransacao>Retorna os dados do Parecer Tecnico do veiculo em formato XML.</DescricaoDaTransacao>\r\n    <VersaoDaTransacao>1.1</VersaoDaTransacao>\r\n    <DataDaPublicacao>2017-11-28T00:00:00</DataDaPublicacao>\r\n    <Autor>Absoluta Solucoes Ltda.</Autor>\r\n  </Identificacao>\r\n  <Controle>\r\n    <Cliente>ABSOLUTA</Cliente>\r\n    <Login>ABSOLUTA042</Login>\r\n    <PlacaDeEntrada>DMP5463</PlacaDeEntrada>\r\n    <ChassiDeEntrada>9BGXL68608C134866</ChassiDeEntrada>\r\n    <IPdoComputadorConsumidor>138.94.53.193</IPdoComputadorConsumidor>\r\n    <NomeDoComputadorProvedor>VMA202</NomeDoComputadorProvedor>\r\n    <CodigoDeControle>0</CodigoDeControle>\r\n    <Severidade>e1_MensagemDeInformacaoSimples</Severidade>\r\n    <Descricao>Sucesso</Descricao>\r\n    <AcaoAdotada>e1_TransacaoFoiExecutada</AcaoAdotada>\r\n    <ResultadoDaPesquisa>e1_RegistrosForamLocalizados</ResultadoDaPesquisa>\r\n    <GravacaoDoLog>e1_TransacaoFoiLogada</GravacaoDoLog>\r\n    <DataExecucao>2018-07-30T23:28:46.31097-03:00</DataExecucao>\r\n    <NrTransacao>1895499</NrTransacao>\r\n    <Observacao />\r\n  </Controle>\r\n  <Resposta>\r\n    <ParecerTecnico>1</ParecerTecnico>\r\n    <Semaforo>verde</Semaforo>\r\n    <Imagem>http://images.absolutasolucoes.com.br/fotos/01.jpg</Imagem>\r\n  </Resposta>\r\n</struct_RespostaRst>"
      },
      {
        "_id": "XXXXXXXXXXXXXXXXXXXXXXXX",
        "dataFound": true,
        "serviceLog": "XXXXXXXXXXXXXXXXXXXXXXXX",
        "rawData": {
          "OKIntegradorResult": {
            "checkok": {
              "dados_consulta": {
                "codigo_consulta": "000000",
                "tipo_consulta": "Veículo Sinistro Checktudo",
                "data_consulta": "30/07/2018",
                "hora_consulta": "23:28:46",
                "placa": "XXX0000"
              },
              "Acidentes": {
                "DataHoraConsulta": "30/07/201823:28:46",
                "CodigoRetorno": "0",
                "DescricaoRetorno": "SISTEMA INDISPONIVEL TEMPORARIAMENTE",
                "DataRegistroSinistro": "-"
              }
            }
          }
        }
      }
    ],
    "responseJSON": {
      "_id": "XXXXXXXXXXXXXXXXXXXXXXXX",
      "__v": 1,
      "dtAtualizacao": "Tue Mar 18 2014 00:00:00 GMT-0300 (Hora oficial do Brasil)",
      "codigoMunicipio": "6361",
      "leilao": {
        "DescricaoRetorno": "NENHUMA OCORRENCIA ENCONTRADA"
      },
      "analiseRisco": {
        "indiceRisco": "1",
        "parecer": "NÃO FOI ENCONTRADO RISCO 😃"
      },
      "historicoProprietarios2": [],
      "rouboFurto": {
        "historico": [],
        "municipioEmplacamento": null,
        "indicadorProcedencia": null,
        "constaOcorrencia": false
      },
      "indicioSinistro": {
        "classificacao": null,
        "descricao": "NÃO CONSTA INDÍCIO DE SINISTRO PARA O VEÍCULO INFORMADO 😃"
      },
      "perdaTotal": {
        "dataProtocolo": null,
        "dataOcorrencia": "-",
        "protocolo": null,
        "descricao": "SISTEMA INDISPONIVEL TEMPORARIAMENTE"
      },
      "baseEstadual": {
        "combustivel": "ALCOOL/GASOLINA",
        "tipoDocProprietario": "FISICA",
        "motor": "X00000000",
        "categoria": "PARTICULAR",
        "especie": "PASSAGEIRO",
        "cor": "PRATA",
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
        "dataEmissaoCrv": "18/03/2014",
        "exercicioLicenciamento": "2018",
        "outrasRestricoes4": "NADA CONSTA",
        "outrasRestricoes3": "NADA CONSTA",
        "outrasRestricoes2": "NADA CONSTA",
        "outrasRestricoes1": "NADA CONSTA",
        "restricaoAmbiental": "veiculo com inspecao veicular ok",
        "restricaoRenajud": "NADA CONSTA",
        "restricaoTributaria": "NADA CONSTA",
        "restricaoJudicial": "NADA CONSTA",
        "restricaoAdminisrativa": "NADA CONSTA",
        "restricaoGuincho": "NADA CONSTA",
        "restricaoRouboFurto": "NADA CONSTA",
        "debitoPoliciaRodoviariaFederal": "0,00",
        "debitoMunicipais": "0,00",
        "debitoRenainf": "0,00",
        "debitoCetesb": "0,00",
        "debitoDetran": "0,00",
        "debitoDer": "0,00",
        "debitoDersa": "0,00",
        "debitoDpvat": "0,00",
        "debitoMultas": "0,00",
        "debitoLicenciamento": "0,00",
        "debitoIpva": "0,00",
        "existeDebitoDpvat": "NAO EXISTE DEBITO DE DPVAT",
        "existeDebitoLicenciamento": "NAO EXISTE DEBITO DE LICENCIAMENTO",
        "existeDebitoMulta": "NAO EXISTE DEBITO DE MULTA",
        "existeDebitoIpva": "NAO EXISTE DEBITO DE IPVA",
        "restricaoDataInclusao": "",
        "restricaoArrendatario": "",
        "restricaoNomeAgente": "",
        "restricaoFinanceira": "NADA CONSTA",
        "licdata": "22/01/2018",
        "intencaoDocFinanceira": "",
        "intencaoDataInslusao": "",
        "intencaoNomeFinanceira": "",
        "intencaoNomeAgente": "",
        "intencaoRestricaoFinanceira": "",
        "restricaoDocArrendatario": "",
        "pronomeAnterior": "XXXXXXXXXXXX",
        "pronome": "00000000000 XXXXXXXXXXXXXXXXXXX",
        "dataVigenciaContratoFinanceira": "",
        "codigoAgenteFinanceiro": "",
        "numContratoFinanceira": "",
        "tipoMarcacaoChassi": "NORMAL",
        "renavam": "00000000",
        "chassi": "XXXXXXXXXXXXXXXX",
        "placa": "XXX0000"
      },
      "baseNacional": {
        "anoFabricacao": "0000",
        "anoModelo": "0000",
        "renavam": "00000000",
        "chassi": "XXXXXXXXXXXXXXXX",
        "placa": "DMP5463",
        "docFaturado": "00000000",
        "di": "00000000",
        "tipoDocImportadora": null,
        "ufFaturado": "SP",
        "tipoDocFaturado": "JURIDICA",
        "uf": "SP",
        "municipio": "COTIA",
        "situacaoVeiculo": "CIRCULACAO",
        "tipoVeiculo": "AUTOMOVEL",
        "especieVeiculo": "PASSAGEIRO",
        "restricao4": "NADA CONSTA",
        "restricao3": "NADA CONSTA",
        "restricao2": "NADA CONSTA",
        "restricao1": "NADA CONSTA",
        "dtUltimaAtualizacao": "18/03/2014",
        "docProprietario": "00000000",
        "combustivel": "ALCOOL/GASOLINA",
        "tipoDocProprietario": null,
        "motor": "X00000000",
        "categoria": "PARTICULAR",
        "especie": "PRATA",
        "cor": "PRATA",
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
      "docFaturado": "00000000",
      "tipoDocProprietario": "FISICA",
      "docProprietario": "00000000",
      "situacaoVeiculo": "S",
      "pesoBrutoTotal": "0",
      "capMaxTracao": "210",
      "cilindradas": "1000",
      "limiteRestricaoTrib": "",
      "dtUltimaAtualizacao": "18/03/2014",
      "unidadeLocalSRF": "0000000",
      "registroDi": "",
      "di": "00000000",
      "identImportadora": "",
      "tipoDocImportadora": "",
      "tipoMontagem": "COMPLETA",
      "eixos": "0",
      "situacaoChassi": "N",
      "qtdPax": "5",
      "corVeiculo": "Prata",
      "tipoCarroceria": "INEXISTENTE",
      "especieVeiculo": "Passageiro",
      "tipoVeiculo": "Automovel",
      "numTerceiroEixo": "",
      "numMotor": "00000000",
      "eixoTraseiroDif": "",
      "caixaCambio": "00000000",
      "numCarroceria": "000",
      "linha": "00000000",
      "nacionalidade": "Nacional",
      "capacidadeCarga": "0",
      "potencia": "79",
      "combustivel": "Álcool / Gasolina",
      "codigoCombustivel": "16",
      "marcaModelo": "XX/XXXXX XXX",
      "codigoMarcaModelo": "000000",
      "municipio": "COTIA-SP",
      "anoModelo": "0000",
      "anoFabricacao": "0000",
      "numFaturado": "00000000",
      "ultimaDataInclusao": null,
      "km": 0,
      "historicoKm": [],
      "cidade": null,
      "uf": "SP",
      "renavam": "00000000",
      "placa": "XXX0000",
      "chassi": "00000000",
      "createAt": "2018-01-11T03:21:11.978Z"
    },
    "refClass": "Veiculo Basico",
    "keys": {
      "cnpj": null,
      "cpf": "00000000000",
      "uf": null,
      "renavam": "00000000",
      "motor": "X00000000000",
      "chassi": "00000000",
      "placa": "XXX0000"
    },
    "documentType": "PLACA",
    "documentQuery": "XXX0000",
    "user": {
      "_id": "XXXXXXXXXXXX",
      "name": "XXXXXXXXXXXX",
      "email": "XXXXXXXXXXXX",
      "__v": 0,
      "hierarchy": {
        "owner": null
      },
      "company": {
        "socialName": "teste",
        "cnpj": null
      },
      "generalData": {
        "birthDate": "1992-03-05T03:00:00.000Z",
        "phoneNumber2": "00000000000",
        "phoneNumber1": "00000000000",
        "address": {
          "number": "00",
          "complement": "XXXX",
          "street": "XXXXXXXXXXXX",
          "neighborhood": "XXXXXXXXXXXX",
          "state": "SP",
          "city": "XXXXXXXXXXXX",
          "zipcode": "00000000"
        }
      },
      "security": {
        "blacklist": [],
        "whitelist": []
      },
      "google": {
        "email": "",
        "name": "XXXXXXXXXXX",
        "token": "XXXXXXXXXXXXX",
        "id": "00000000"
      },
      "facebook": {
        "email": null,
        "name": null,
        "token": null,
        "id": null
      },
      "status": true,
      "createAt": "2018-03-06T21:38:56.483Z",
      "lastLogin": "2018-07-31T12:12:50.485Z",
      "type": 1,
      "billing": "XXXXXXXXXXXX",
      "cpf": "00000000"
    },
    "createAt": "2018-07-31T02:28:33.459Z"
  }
}
*
*/
