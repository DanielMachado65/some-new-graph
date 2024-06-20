define({
  api: [
    {
      type: "post",
      url: "/auth/login",
      title: "Básica",
      version: "5.27.1",
      name: "AuthLogin",
      group: "Autenticacao",
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "username",
              description:
                "<p>Username utilizado pelo usuário. Pode ser um email.</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "password",
              description: "<p>Senha cadastrada previamente pelo usuário.</p>",
            },
          ],
        },
        examples: [
          {
            title: "Request-Example:",
            content: '{\n  "username":"email",\n  "password" : "password"\n}',
            type: "json",
          },
        ],
      },
      description:
        "<p>O parametro _id retornado após a autenticação ter sida executada com sucesso, corresponde ao identificador único do usuário.<br> O parametro token corresponde ao token de segurança JWT que é a chave de segurança da API, essa chave deve ser enviada no header da requisição através do parametro <b>Authorization</b>. <br></p>",
      success: {
        examples: [
          {
            title: "Success-Response:",
            content:
              'HTTP/1.1 200 OK\n{\n  "status":\n  {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body":\n  {\n      "token": "eyJhbGciOiJIUzI1NiInR5cCI6IkpXVCJ9.eyJzZWNyZXQiOlsiYzE5MGYxMWEzMmRiYzY3ZWVjNDY1YTMyMGQ3ZmUxMWQiXSwiaWF0IjoxNTIwNDUxMzE5LCJleHAiOjE1MjA1Mzc3MTl9.w0OM46_AY4D8SAvY8I2vP0gVbqeomdsoF4L1U9lxau0",\n      "user":\n      {\n        "_id": "XXXXXXXXXXXXXXXXXXX",\n        "name": "Nome Usuario",\n        "status": true,\n        "last_login": "2018-03-07T19:35:18.877Z",\n        "type": "default_client"\n    }\n  }\n}',
            type: "json",
          },
        ],
      },
      error: {
        fields: {
          "Error 4xx": [
            {
              group: "Error 4xx",
              optional: false,
              field: "AuthError",
              description: "<p>Falha na autenticação</p>",
            },
          ],
        },
        examples: [
          {
            title: "Error-Response:",
            content:
              '  HTTP/1.1 401 UnauthorizeD\n{\n    "status": {\n        "cod": 401,\n        "msg": "unauthorized"\n    },\n    "body": "Usuário ou senha inválidos."\n}',
            type: "json",
          },
        ],
      },
      filename: "integration/auth/apidoc_basicAuth.js",
      groupTitle: "Autenticacao",
    },
    {
      type: "post",
      url: "/api/vehicle/:userid",
      title: "Consultar Agregados",
      version: "5.27.1",
      name: "AgregadosQuery",
      group: "Consultas_Veiculares",
      header: {
        fields: {
          Header: [
            {
              group: "Header",
              type: "String",
              optional: false,
              field: "Authorization",
              description:
                "<p>Token de acesso retornado após autenticação.</p>",
            },
          ],
        },
      },
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "userid",
              description: "<p>ID do usuário</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "querycode",
              description:
                "<p>Código da consulta. (Código = 1 para consulta de Agregados)</p>",
            },
            {
              group: "Parameter",
              type: "Object",
              optional: false,
              field: "keys",
              description: "<p>Chaves para realização da consulta</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "keys.placa",
              description:
                "<p>A placa para realização da consulta de Agregados</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "keys.chassi",
              description:
                "<p>O chassi para realização da consulta de Agregados</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "keys.renavam",
              description:
                "<p>O renavam para realização da consulta de Agregados</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "keys.motor",
              description:
                "<p>O motor para realização da consulta de Agregados</p>",
            },
          ],
        },
        examples: [
          {
            title: "Request-Example:",
            content:
              '{\n  "querycode":1,\n  "keys" : {\n    "placa" : "XXX0000"\n  }\n}',
            type: "json",
          },
          {
            title: "Request-Example:",
            content:
              '{\n  "querycode":1,\n  "keys" : {\n    "chassi" : "0DD2928DHD28D2H8D2H8"\n  }\n}',
            type: "json",
          },
          {
            title: "Request-Example:",
            content:
              '{\n  "querycode":1,\n  "keys" : {\n    "renavam" : "0000000000000000"\n  }\n}',
            type: "json",
          },
          {
            title: "Request-Example:",
            content:
              '{\n  "querycode":1,\n  "keys" : {\n    "motor" : "0DD2928DHD28D2H8D2H8"\n  }\n}',
            type: "json",
          },
        ],
      },
      description:
        "<p>O parametro USER_ID deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br><b>EX: /api/vehicle/&lt;USER_ID&gt;</b></p>",
      success: {
        examples: [
          {
            title: "Success-Response:",
            content:
              'HTTP/1.1 200 OK\n{\n\t"status": {\n\t\t"cod": 200,\n\t\t"msg": "ok"\n\t},\n\t"body": {\n\t\t"headerInfos": {\n\t\t\t"queryid": "5b3a323nfn2330feannac978676f0f7",\n\t\t\t"name": "Agregados",\n\t\t\t"date": "2019-12-11T14:13:07.428Z",\n\t\t\t"keys": {\n\t\t\t\t"placa": "XXX0000"\n\t\t\t}\n\t\t},\n\t\t"data": {\n            "cmt": null,\n            "pbt": null,\n            "restricoes": null,\n            "ocorrencia": null,\n            "municipioEmplacamento": null,\n            "capacidadePassageiro": "5",\n            "procedencia": "42913856",\n            "categoria": null,\n            "ufFaturado": "MG",\n            "tipoDocFaturado": "Jurídica",\n            "docFaturado": "",\n            "situacaoVeiculo": "S",\n            "pesoBrutoTotal": ",00",\n            "capMaxTracao": "240,00",\n            "cilindradas": "1000",\n            "limiteRestricaoTrib": null,\n            "dtUltimaAtualizacao": "12/06/2007 00:00:00",\n            "unidadeLocalSRF": "0",\n            "registroDi": null,\n            "di": null,\n            "identImportadora": "",\n            "tipoDocImportadora": "0",\n            "tipoMontagem": "1",\n            "eixos": "0",\n            "situacaoChassi": "N",\n            "qtdPax": null,\n            "corVeiculo": "Prata",\n            "tipoCarroceria": "NAO APLICAVEL",\n            "especieVeiculo": "Passageiro",\n            "tipoVeiculo": "Automovel",\n            "numTerceiroEixo": "",\n            "numMotor": "178F1011*6091857*",\n            "eixoTraseiroDif": "",\n            "caixaCambio": "",\n            "numCarroceria": "76624782",\n            "linha": null,\n            "nacionalidade": "Nacional",\n            "capacidadeCarga": ",00",\n            "potencia": "65",\n            "combustivel": "Gasolina",\n            "codigoCombustivel": "2",\n            "marcaModelo": "FIAT/SIENA FIRE",\n            "codigoMarcaModelo": "153006",\n            "municipio": "SANTA RITA DO SAPUCAI",\n            "codigoMunicipio": "5191",\n            "anoModelo": "2005",\n            "anoFabricacao": "2004",\n            "numFaturado": null,\n            "dtAtualizacao": "09/02/2017 13:35:48",\n            "codigoFipe": null,\n            "ultimaDataInclusao": "09/02/2017 13:35:48",\n            "cidade": null,\n            "uf": "MG",\n            "renavam": "",\n            "placa": "XXX0000",\n\t\t\t"chassi": "0DD2928DHD28D2H8D2H8"\n\t\t},\n\t}\n}',
            type: "json",
          },
        ],
      },
      filename: "integration/vehicular/apidoc_agregadosQuery.js",
      groupTitle: "Consultas_Veiculares",
    },
    {
      type: "post",
      url: "/api/vehicle/:userid",
      title: "Consulta Estadual",
      version: "5.27.1",
      name: "ConsultaEstadualQuery",
      group: "Consultas_Veiculares",
      header: {
        fields: {
          Header: [
            {
              group: "Header",
              type: "String",
              optional: false,
              field: "Authorization",
              description:
                "<p>Token de acesso retornado após autenticação.</p>",
            },
          ],
        },
      },
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "userid",
              description: "<p>ID do usuário</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "querycode",
              description:
                "<p>Código da consulta. (Código = 3 para Consulta Estadual)</p>",
            },
            {
              group: "Parameter",
              type: "Object",
              optional: false,
              field: "keys",
              description: "<p>Chaves para realização da consulta</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "keys.placa",
              description:
                "<p>A placa para realização da Consulta Estadual</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "keys.chassi",
              description:
                "<p>O chassi para realização da Consulta Estadual</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "keys.motor",
              description:
                "<p>O motor para realização da Consulta Estadual</p>",
            },
          ],
        },
        examples: [
          {
            title: "Request-Example:",
            content:
              '{\n  "querycode":3,\n  "keys" : {\n    "placa" : "XXX0000"\n  }\n}',
            type: "json",
          },
          {
            title: "Request-Example:",
            content:
              '{\n  "querycode":3,\n  "keys" : {\n    "chassi" : "0DD2928DHD28D2H8D2H8"\n  }\n}',
            type: "json",
          },
        ],
      },
      description:
        "<p>O parametro USER_ID deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br><b>EX: /api/vehicle/&lt;USER_ID&gt;</b></p>",
      success: {
        examples: [
          {
            title: "Success-Response:",
            content:
              'HTTP/1.1 200 OK\n{\n\t"status": {\n\t\t"cod": 200,\n\t\t"msg": "ok"\n\t},\n\t"body": {\n\t\t"headerInfos": {\n\t\t\t"queryid": "5b3a323nfn2330feannac978676f0f7",\n\t\t\t"name": "Consulta Estadual",\n\t\t\t"date": "2019-12-11T16:14:48.404Z",\n\t\t\t"keys": {\n\t\t\t\t"placa": "XXX0000"\n\t\t\t}\n\t\t},\n\t\t"data": {\n\t\t\t"anoFabricacao": "2004",\n            "anoModelo": "2005",\n            "baseEstadual": {\n                "placa": "XXX0000",\n                "chassi": "9BD17203753116958",\n                "renavam": "0000000000000000",\n                "categoria": "PARTICULAR",\n                "combustivel": "GASOLINA",\n                "comunicacaoInclusao": null,\n                "comunicacaoVenda": "NAO CONSTA COMUNICACAO DE VENDAS",\n                "cor": "PRATA",\n                "dataAlteracaoMotor": null,\n                "dataEmissaoCrv": "03/08/2011",\n                "dataInclusaoIntencaoTrocaFinanceira": null,\n                "dataLimiteRestricaoTributaria": null,\n                "dataVenda": null,\n                "dataVigenciaContratoFinanceira": null,\n                "debitoCetesb": null,\n                "debitoDer": null,\n                "debitoDersa": null,\n                "debitoDetran": null,\n                "debitoDpvat": "0,00",\n                "debitoIpva": "0,00",\n                "debitoLicenciamento": "0,00",\n                "debitoMultas": "0,00",\n                "debitoMunicipais": "0,00",\n                "debitoPoliciaRodoviariaFederal": null,\n                "debitoRenainf": null,\n                "especie": "PASSAGEIRO",\n                "exercicioLicenciamento": "",\n                "existeDebitoDpvat": "NAO EXISTE DEBITO DE DPVAT",\n                "existeDebitoIpva": "NAO EXISTE DEBITO DE IPVA",\n                "existeDebitoLicenciamento": "NAO EXISTE DEBITO DE LICENCIAMENTO ",\n                "existeDebitoMulta": "NAO EXISTE DEBITO DE MULTA",\n                "intencaoDataInslusao": null,\n                "intencaoDocFinanceira": null,\n                "intencaoNomeAgente": null,\n                "intencaoNomeFinanceira": null,\n                "intencaoRestricaoFinanceira": null,\n                "licdata": "03/08/2011",\n                "motor": "178F10116091857",\n                "outrasRestricoes1": "NADA CONSTA",\n                "outrasRestricoes2": "NADA CONSTA",\n                "outrasRestricoes3": "NADA CONSTA",\n                "outrasRestricoes4": "ALIENACAO FIDUCIARIA",\n                "pronome": "XXXXXXXXXX MARCEL",\n                "pronomeAnterior": null,\n                "restricaoAdminisrativa": "NADA CONSTA",\n                "restricaoAmbiental": null,\n                "restricaoArrendatario": null,\n                "restricaoDataInclusao": null,\n                "restricaoDocArrendatario": null,\n                "restricaoFinanceira": "ALIENACAO FIDUCIARIA",\n                "restricaoGuincho": "NADA CONSTA",\n                "restricaoJudicial": "NADA CONSTA",\n                "restricaoNomeAgente": null,\n                "restricaoRenajud": "NADA CONSTA",\n                "restricaoRouboFurto": "NADA CONSTA",\n                "restricaoTributaria": "NADA CONSTA",\n                "situacaoVeiculo": "CIRCULACAO",\n                "tipoMarcacaoChassi": "NORMAL",\n                "uf": "MG",\n                "municipio": "SANTA RITA DO SAPUCAI-MG",\n                "tipo": "AUTOMOVEL"\n            },\n            "caixaCambio": "",\n            "capMaxTracao": "240,00",\n            "capacidadeCarga": ",00",\n            "capacidadePassageiro": "5",\n            "categoria": "PARTICULAR",\n            "chassi": "0DD2928DHD28D2H8D2H8",\n            "cidade": null,\n            "cilindradas": "1000",\n            "cmt": null,\n            "codigoCombustivel": "2",\n            "codigoFipe": null,\n            "codigoMarcaModelo": "153006",\n            "codigoMunicipio": "5191",\n            "combustivel": "Gasolina",\n            "corVeiculo": "Prata",\n            "di": null,\n            "docFaturado": "00.000.000/0001-00",\n            "dtAtualizacao": "09/02/2017 13:35:48",\n            "dtUltimaAtualizacao": "12/06/2007 00:00:00",\n            "eixoTraseiroDif": "",\n            "eixos": "0",\n            "especieVeiculo": "Passageiro",\n            "identImportadora": "",\n            "limiteRestricaoTrib": null,\n            "linha": null,\n            "marcaModelo": "FIAT/SIENA FIRE",\n            "municipio": "SANTA RITA DO SAPUCAI-MG",\n            "municipioEmplacamento": null,\n            "nacionalidade": "Nacional",\n            "numCarroceria": "76624782",\n            "numFaturado": null,\n            "numMotor": "CCNBAAA55669",\n            "numTerceiroEixo": "",\n            "ocorrencia": null,\n            "pbt": null,\n            "pesoBrutoTotal": ",00",\n            "placa": "XXX0000",\n            "potencia": "65",\n            "procedencia": "NACIONAL",\n            "qtdPax": null,\n            "registroDi": null,\n            "renavam": "0000000000000000",\n            "restricoes": null,\n            "situacaoChassi": "N",\n            "situacaoVeiculo": "S",\n            "tipoCarroceria": "INEXISTENTE",\n            "tipoDocFaturado": "JURIDICA",\n            "tipoDocImportadora": null,\n            "tipoMontagem": "1",\n            "tipoVeiculo": "Automovel",\n            "uf": "MG",\n            "ufFaturado": "MG",\n            "ultimaDataInclusao": "09/02/2017 13:35:48",\n            "unidadeLocalSRF": "0"\n\n\t\t}\n\t}\n}',
            type: "json",
          },
        ],
      },
      filename: "integration/vehicular/apidoc_consultaEstadualQuery.js",
      groupTitle: "Consultas_Veiculares",
    },
    {
      type: "post",
      url: "/api/vehicle/:userid",
      title: "Consulta Nacional",
      version: "5.27.1",
      name: "ConsultaNacionalQuery",
      group: "Consultas_Veiculares",
      header: {
        fields: {
          Header: [
            {
              group: "Header",
              type: "String",
              optional: false,
              field: "Authorization",
              description:
                "<p>Token de acesso retornado após autenticação.</p>",
            },
          ],
        },
      },
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "userid",
              description: "<p>ID do usuário</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "querycode",
              description:
                "<p>Código da consulta. (Código = 2 para Consulta Nacional)</p>",
            },
            {
              group: "Parameter",
              type: "Object",
              optional: false,
              field: "keys",
              description: "<p>Chaves para realização da consulta</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "keys.placa",
              description:
                "<p>A placa para realização da Consulta Nacional</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "keys.chassi",
              description:
                "<p>O chassi para realização da Consulta Nacional</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "keys.motor",
              description:
                "<p>O motor para realização da Consulta Nacional</p>",
            },
          ],
        },
        examples: [
          {
            title: "Request-Example:",
            content:
              '{\n  "querycode":2,\n  "keys" : {\n    "placa" : "XXX0000"\n  }\n}',
            type: "json",
          },
          {
            title: "Request-Example:",
            content:
              '{\n  "querycode":2,\n  "keys" : {\n    "chassi" : "0DD2928DHD28D2H8D2H8"\n  }\n}',
            type: "json",
          },
          {
            title: "Request-Example:",
            content:
              '{\n  "querycode":2,\n  "keys" : {\n    "motor" : "0DD2928DHD28D2H8D2H8"\n  }\n}',
            type: "json",
          },
        ],
      },
      description:
        "<p>O parametro USER_ID deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br><b>EX: /api/vehicle/&lt;USER_ID&gt;</b></p>",
      success: {
        examples: [
          {
            title: "Success-Response:",
            content:
              'HTTP/1.1 200 OK\n{\n\t"status": {\n\t\t"cod": 200,\n\t\t"msg": "ok"\n\t},\n\t"body": {\n\t\t"headerInfos": {\n\t\t\t"queryid": "5b3a323nfn2330feannac978676f0f7",\n\t\t\t"name": "Consulta Nacional",\n\t\t\t"date": "2019-12-11T16:29:55.531Z",\n\t\t\t"keys": {\n\t\t\t\t"placa": "XXX0000"\n\t\t\t}\n\t\t},\n\t\t"data": {\n\t\t\t"anoFabricacao": "2004",\n            "anoModelo": "2005",\n            "baseNacional": {\n                "placa": "XXX0000",\n                "chassi": "0DD2928DHD28D2H8D2H8",\n                "renavam": "0000000000000000",\n                "anoFabricacao": "2004",\n                "anoModelo": "2005",\n                "categoria": null,\n                "combustivel": "GASOLINA",\n                "cor": "PRATA",\n                "di": null,\n                "docFaturado": null,\n                "dtEmissaoCrv": null,\n                "dtUltimaAtualizacao": "03/08/2011",\n                "especie": "PASSAGEIRO",\n                "especieVeiculo": null,\n                "indicadorComunicacaoVendas": null,\n                "indicadorRestricaoRenajud": null,\n                "motor": "178F10116091857",\n                "municipio": "SANTA RITA DO SAPUCAI",\n                "ocorrencia": "VEICULO NAO INDICA OCORRENCIA DE ROUBO/FURTO",\n                "outrasRestricoes1": null,\n                "outrasRestricoes2": null,\n                "outrasRestricoes3": null,\n                "outrasRestricoes4": null,\n                "outrasRestricoes5": null,\n                "outrasRestricoes6": null,\n                "outrasRestricoes7": null,\n                "outrasRestricoes8": null,\n                "restricao1": "ALIENACAO FIDUCIARIA",\n                "restricao2": null,\n                "restricao3": null,\n                "restricao4": null,\n                "restricaoDataInclusao": null,\n                "restricaoFinanciadora": null,\n                "restricaoFinanciamento": null,\n                "restricaoNomeAgente": null,\n                "restricaoTipoTransacao": null,\n                "situacaoVeiculo": "CIRCULACAO",\n                "tipoDocFaturado": null,\n                "tipoDocImportadora": null,\n                "tipoMarcacaoChassi": null,\n                "tipoVeiculo": "AUTOMOVEL",\n                "uf": "MG",\n                "ufFaturado": null\n            },\n            "caixaCambio": "",\n            "capMaxTracao": "240,00",\n            "capacidadeCarga": ",00",\n            "capacidadePassageiro": "5",\n            "categoria": "PARTICULAR",\n            "chassi": "0DD2928DHD28D2H8D2H8",\n            "cidade": null,\n            "cilindradas": "1000",\n            "cmt": "2.4",\n            "codigoCombustivel": "2",\n            "codigoFipe": null,\n            "codigoMarcaModelo": "153006",\n            "codigoMunicipio": "5191",\n            "combustivel": "Gasolina",\n            "corVeiculo": "Prata",\n            "di": null,\n            "docFaturado": "02.xxx.5x2/xxxx-14",\n            "dtAtualizacao": "09/02/2017 13:35:48",\n            "dtUltimaAtualizacao": "12/06/2007 00:00:00",\n            "eixoTraseiroDif": "",\n            "eixos": "0",\n            "especieVeiculo": "Passageiro",\n            "identImportadora": "",\n            "limiteRestricaoTrib": null,\n            "linha": null,\n            "marcaModelo": "FIAT/SIENA FIRE",\n            "municipio": "SANTA RITA DO SAPUCAI",\n            "municipioEmplacamento": null,\n            "nacionalidade": "Nacional",\n            "numCarroceria": "999",\n            "numFaturado": null,\n            "numMotor": "178F10116091857",\n            "numTerceiroEixo": "",\n            "ocorrencia": null,\n            "pbt": "0.0",\n            "pesoBrutoTotal": ",00",\n            "placa": "XXX0000",\n            "potencia": "65",\n            "procedencia": "NACIONAL",\n            "qtdPax": null,\n            "registroDi": null,\n            "renavam": "0000000000000000",\n            "restricoes": null,\n            "situacaoChassi": "N",\n            "situacaoVeiculo": "S",\n            "tipoCarroceria": "INEXISTENTE",\n            "tipoDocFaturado": "JURIDICA",\n            "tipoDocImportadora": null,\n            "tipoMontagem": "1",\n            "tipoVeiculo": "Automovel",\n            "uf": "MG",\n            "ufFaturado": "MG",\n            "ultimaDataInclusao": "09/02/2017 13:35:48",\n            "unidadeLocalSRF": "0"\n\t\t}\n\t}\n}',
            type: "json",
          },
        ],
      },
      filename: "integration/vehicular/apidoc_consultaNacionalQuery.js",
      groupTitle: "Consultas_Veiculares",
    },
    {
      type: "post",
      url: "/api/vehicle/:userid",
      title: "Consulta Veiculo Basico",
      version: "5.25.4",
      name: "ConsultaVeiculoBasicoQuery",
      group: "Consultas_Veiculares",
      header: {
        fields: {
          Header: [
            {
              group: "Header",
              type: "String",
              optional: false,
              field: "Authorization",
              description:
                "<p>Token de acesso retornado após autenticação.</p>",
            },
          ],
        },
      },
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "userid",
              description: "<p>ID do usuário</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "querycode",
              description:
                "<p>Código da consulta. (Código = 99 para Consulta Veiculo Basico)</p>",
            },
            {
              group: "Parameter",
              type: "Object",
              optional: false,
              field: "keys",
              description: "<p>Chaves para realização da consulta</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "keys.placa",
              description:
                "<p>A placa para realização da Consulta Veiculo Basico</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "keys.chassi",
              description:
                "<p>O chassi para realização da Consulta Veiculo Basico</p>",
            },
          ],
        },
        examples: [
          {
            title: "Request-Example:",
            content:
              '{\n  "querycode": 99,\n  "keys" : {\n    "placa" : "XXX0000"\n  }\n}',
            type: "json",
          },
          {
            title: "Request-Example:",
            content:
              '{\n  "querycode": 99,\n  "keys" : {\n    "chassi" : "0XX0000XXX00X0X0X0X0"\n  }\n}',
            type: "json",
          },
        ],
      },
      description:
        "<p>O parametro USER_ID deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br><b>EX: /api/vehicle/&lt;USER_ID&gt;</b></p>",
      success: {
        examples: [
          {
            title: "Success-Response:",
            content:
              'HTTP/1.1 200 OK\n{\n\t"status": {\n\t\t"cod": 200,\n\t\t"msg": "ok"\n\t},\n\t"body": {\n\t\t"headerInfos": {\n\t\t\t"queryid": "555555555555555555555555555",\n\t\t\t"name": "Consulta Veiculo Basico",\n\t\t\t"date": "2000-01-01T00:00:01.404Z",\n\t\t\t"keys": {\n\t\t\t\t"placa": "XXX0000"\n\t\t\t}\n\t\t},\n\t\t"data": {\n      "analiseRisco": {\n        "imageLink": "",\n        "indiceRisco": "",\n        "parecer": ""\n      },\n      "anoFabricacao": "",\n      "anoModelo": "",\n      "baseEstadual": {\n        "categoria": "",\n        "chassi": "",\n        "codigoAgenteFinanceiro": "",\n        "codigoFinanceira": "",\n        "combustivel": "",\n        "comunicacaoInclusao": "",\n        "comunicacaoVenda": "",\n        "cor": "",\n        "dataAlteracaoMotor": "",\n        "dataEmissaoCrv": "",\n        "dataInclusaoIntencaoTrocaFinanceira": "",\n        "dataLimiteRestricaoTributaria": "",\n        "dataVenda": "",\n        "dataVigenciaContratoFinanceira": "",\n        "debitoCetesb": "",\n        "debitoDer": "",\n        "debitoDersa": "",\n        "debitoDetran": "",\n        "debitoDpvat": "",\n        "debitoIpva": "",\n        "debitoLicenciamento": "",\n        "debitoMultas": "",\n        "debitoMunicipais": "",\n        "debitoPoliciaRodoviariaFederal": "",\n        "debitoRenainf": "",\n        "docComprador": "",\n        "especie": "",\n        "exercicioLicenciamento": "",\n        "existeDebitoDpvat": "",\n        "existeDebitoIpva": "",\n        "existeDebitoLicenciamento": "",\n        "existeDebitoMulta": "",\n        "inspecaoAno": "",\n        "inspecaoCentro": "",\n        "inspecaoData": "",\n        "inspecaoSelo": "",\n        "inspecaoStatus": "",\n        "intencaoDataInslusao": "",\n        "intencaoDocFinanceira": "",\n        "intencaoNomeAgente": "",\n        "intencaoNomeFinanceira": "",\n        "intencaoRestricaoFinanceira": "",\n        "licdata": "",\n        "motor": "",\n        "notaFiscal": "",\n        "numContratoFinanceira": "",\n        "outrasRestricoes1": "",\n        "outrasRestricoes2": "",\n        "outrasRestricoes3": "",\n        "outrasRestricoes4": "",\n        "placa": "",\n        "pronome": "",\n        "pronomeAnterior": "",\n        "protocoloDetran": "",\n        "renavam": "",\n        "restricaoAdminisrativa": "",\n        "restricaoAmbiental": "",\n        "restricaoArrendatario": "",\n        "restricaoDataInclusao": "",\n        "restricaoDocArrendatario": "",\n        "restricaoFinanceira": "",\n        "restricaoGuincho": "",\n        "restricaoJudicial": "",\n        "restricaoNomeAgente": "",\n        "restricaoRenajud": "",\n        "restricaoRouboFurto": "",\n        "restricaoTributaria": "",\n        "situacaoVeiculo": "",\n        "tipoDocComprador": "",\n        "tipoMarcacaoChassi": "",\n        "uf": "",\n        "municipio": "",\n        "tipo": ""\n      },\n      "baseNacional": {\n        "anoFabricacao": "",\n        "anoModelo": "",\n        "categoria": "",\n        "chassi": "",\n        "combustivel": "",\n        "cor": "",\n        "di": "",\n        "docFaturado": "",\n        "dtEmissaoCrv": "",\n        "dtUltimaAtualizacao": "",\n        "especie": "",\n        "especieVeiculo": "",\n        "indicadorComunicacaoVendas": "",\n        "indicadorRestricaoRenajud": "",\n        "motor": "",\n        "municipio": "",\n        "ocorrencia": "",\n        "outrasRestricoes1": "",\n        "outrasRestricoes2": "",\n        "outrasRestricoes3": "",\n        "outrasRestricoes4": "",\n        "outrasRestricoes5": "",\n        "outrasRestricoes6": "",\n        "outrasRestricoes7": "",\n        "outrasRestricoes8": "",\n        "placa": "",\n        "renavam": "",\n        "restricao1": "",\n        "restricao2": "",\n        "restricao3": "",\n        "restricao4": "",\n        "restricaoDataInclusao": "",\n        "restricaoFinanciadora": "",\n        "restricaoFinanciamento": "",\n        "restricaoNomeAgente": "",\n        "restricaoTipoTransacao": "",\n        "situacaoVeiculo": "",\n        "tipoDocFaturado": "",\n        "tipoDocImportadora": "",\n        "tipoMarcacaoChassi": "",\n        "tipoVeiculo": "",\n        "uf": "",\n        "ufFaturado": ""\n      },\n      "caixaCambio": "",\n      "capMaxTracao": "",\n      "capacidadeCarga": "",\n      "capacidadePassageiro": "",\n      "categoria": "",\n      "chassi": "",\n      "cidade": "",\n      "cilindradas": "",\n      "cmt": "",\n      "codigoCombustivel": "",\n      "codigoFipe": [""],\n      "codigoMarcaModelo": "",\n      "codigoMunicipio": "",\n      "combustivel": "",\n      "corVeiculo": "",\n      "di": "",\n      "docFaturado": "",\n      "dtAtualizacao": "",\n      "dtUltimaAtualizacao": "",\n      "eixoTraseiroDif": "",\n      "eixos": "",\n      "especieVeiculo": "",\n      "identImportadora": "",\n      "indicioSinistro": {\n        "classificacao": "",\n        "descricao": ""\n      },\n      "km": "",\n      "leilao": {\n        "score": {\n          "aceitacao": "",\n          "exigenciaVistoriaEspecial": "",\n          "percentualSobreRef": "",\n          "pontuacao": "",\n          "score": ""\n        },\n        "descricao": "",\n        "registros": []\n      },\n      "limiteRestricaoTrib": "",\n      "linha": "",\n      "marcaModelo": "",\n      "municipio": "",\n      "municipioEmplacamento": "",\n      "nacionalidade": "",\n      "numCarroceria": "",\n      "numFaturado": "",\n      "numMotor": "",\n      "numTerceiroEixo": "",\n      "ocorrencia": "",\n      "pbt": "",\n      "pesoBrutoTotal": "",\n      "placa": "",\n      "potencia": "",\n      "procedencia": "",\n      "qtdPax": "",\n      "registroDi": "",\n      "renavam": "",\n      "restricao1": "",\n      "restricao2": "",\n      "restricao3": "",\n      "restricao4": "",\n      "restricoes": "",\n      "situacaoChassi": "",\n      "situacaoVeiculo": "",\n      "tipoCarroceria": "",\n      "tipoDocFaturado": "",\n      "tipoDocImportadora": "",\n      "tipoMontagem": "",\n      "tipoVeiculo": "",\n      "uf": "",\n      "ufFaturado": "",\n      "ultimaDataInclusao": "",\n      "unidadeLocalSRF": ""\n    }\n\t}\n}',
            type: "json",
          },
        ],
      },
      filename: "integration/vehicular/apidoc_consultaVeiculoBasicoQuery.js",
      groupTitle: "Consultas_Veiculares",
    },
    {
      type: "post",
      url: "/api/vehicle/:userid",
      title: "Consultar Gravame Simples",
      version: "5.27.1",
      name: "GravameSimplesQuery",
      group: "Consultas_Veiculares",
      header: {
        fields: {
          Header: [
            {
              group: "Header",
              type: "String",
              optional: false,
              field: "Authorization",
              description:
                "<p>Token de acesso retornado após autenticação.</p>",
            },
          ],
        },
      },
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "userid",
              description: "<p>ID do usuário</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "querycode",
              description:
                "<p>Código da consulta. (Código = 15 para consulta de Gravame Simples)</p>",
            },
            {
              group: "Parameter",
              type: "Object",
              optional: false,
              field: "keys",
              description: "<p>Chaves para realização da consulta</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "keys.placa",
              description:
                "<p>O placa para realização da consulta de Gravame Simples</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "keys.chassi",
              description:
                "<p>O chassi para realização da consulta de Gravame Simples</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "keys.uf",
              description:
                "<p>A UF para realização da consulta de Gravame Simples</p>",
            },
          ],
        },
        examples: [
          {
            title: "Request-Example:",
            content:
              '{\n  "querycode":15,\n  "keys" : {\n    "placa" : "XXX0000",\n    "uf":"SP"\n  }\n}',
            type: "json",
          },
          {
            title: "Request-Example:",
            content:
              '{\n  "querycode":15,\n  "keys" : {\n    "chassi" : "0DD2928DHD28D2H8D2H8",\n    "uf":"SP"\n  }\n}',
            type: "json",
          },
        ],
      },
      description:
        "<p>O parametro USER_ID deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br><b>EX: /api/vehicle/&lt;USER_ID&gt;</b></p>",
      success: {
        examples: [
          {
            title: "Success-Response:",
            content:
              'HTTP/1.1 200 OK\n{\n\t"status": {\n\t\t"cod": 200,\n\t\t"msg": "ok"\n\t},\n\t"body": {\n\t\t"headerInfos": {\n\t\t\t"queryid": "5b3a323nfn2330feannac978676f0f7",\n\t\t\t"name": "Gravame",\n\t\t\t"date": "2019-12-11T17:43:34.830Z",\n\t\t\t"keys": {\n\t\t\t\t"placa": "XXX0000",\n\t\t\t\t"uf": "SP"\n\t\t\t}\n\t\t},\n\t\t"data": {\n\t\t\t"anoFabricacao": "2000",\n            "anoModelo": "2001",\n            "caixaCambio": "000921202",\n            "capMaxTracao": "0",\n            "capacidadeCarga": "0.0",\n            "capacidadePassageiro": "5",\n            "categoria": "PARTICULAR",\n            "chassi": "0DD2928DHD28D2H8D2H8",\n            "cidade": null,\n            "cilindradas": "1000",\n            "cmt": "0.0",\n            "codigoCombustivel": "2",\n            "codigoFipe": [\n                {\n                    "_id": "5df0570b3101c16298594cb5",\n                    "valorZeroKM": "15723",\n                    "codigo": "004001-0"\n                },\n                {\n                    "_id": "5df0570b3101c16298594cb7",\n                    "valorZeroKM": "16810",\n                    "codigo": "004173-4"\n                },\n                {\n                    "_id": "5df0570b3101c16298594cb9",\n                    "valorZeroKM": "18079",\n                    "codigo": "004173-4"\n                }\n            ],\n            "codigoMarcaModelo": "149502",\n            "codigoMunicipio": "6509",\n            "combustivel": "GASOLINA",\n            "corVeiculo": "BRANCA",\n            "di": null,\n            "docFaturado": "50507300000130",\n            "dtAtualizacao": "25/04/2018 09:36:04",\n            "dtUltimaAtualizacao": "14/12/2018",\n            "eixoTraseiroDif": "",\n            "eixos": "0",\n            "especieVeiculo": "PASSAGEIRO",\n            "gravame": [\n                {\n                    "_id": "5df12e6f6ed3416293278640",\n                    "ufPlaca": "PR",\n                    "uf": "PR",\n                    "situacao": "VEÍCULO TEVE GRAVAME BAIXADO PELO AGENTE FINANCEIRO",\n                    "placa": "XXX0000",\n                    "observacoes": null,\n                    "numero": "05320814",\n                    "intencao": null,\n                    "informante": null,\n                    "documentoFinanciado": "12609611000110",\n                    "documentoAgente": "47193149000106",\n                    "dataSituacao": "02/05/2012",\n                    "dataInclusao": null,\n                    "contrato": null,\n                    "codigoAgente": null,\n                    "chassi": "0DD2928DHD28D2H8D2H8",\n                    "arrendatarioFinanciado": "CARLOS ROBERTO DE SOUSA ME",\n                    "anoModelo": "2001",\n                    "anoFabricacao": "2000",\n                    "agente": "REAL LEASING SA ARRENDAMENTO MERCANTIL"\n                }\n            ],\n            "identImportadora": "",\n            "limiteRestricaoTrib": null,\n            "linha": null,\n            "marcaModelo": "GM/CORSA WIND",\n            "municipio": "CARAGUATATUBA-SP",\n            "municipioEmplacamento": null,\n            "nacionalidade": "NACIONAL",\n            "numCarroceria": "",\n            "numFaturado": null,\n            "numMotor": "NM0091931",\n            "numTerceiroEixo": "",\n            "ocorrencia": "VEICULO NAO INDICA OCORRENCIA DE ROUBO/FURTO",\n            "pbt": "0.0",\n            "pesoBrutoTotal": "0,00",\n            "placa": "XXX0000",\n            "potencia": "60",\n            "procedencia": "NACIONAL",\n            "qtdPax": null,\n            "registroDi": null,\n            "renavam": "0000000000000000",\n            "restricoes": null,\n            "situacaoChassi": "NORMAL",\n            "situacaoVeiculo": "CIRCULACAO",\n            "tipoCarroceria": "INEXISTENTE",\n            "tipoDocFaturado": "JURIDICA",\n            "tipoDocImportadora": null,\n            "tipoMontagem": "",\n            "tipoVeiculo": "AUTOMOVEL",\n            "uf": "PR",\n            "ufFaturado": "SP",\n            "ultimaDataInclusao": "09/02/2017 13:35:48",\n            "unidadeLocalSRF": "0"\n\t\t}\n\t}\n}',
            type: "json",
          },
        ],
      },
      filename: "integration/vehicular/apidoc_gravameSimplesQuery.js",
      groupTitle: "Consultas_Veiculares",
    },
    {
      type: "post",
      url: "/api/vehicle/:userid",
      title: "Consultar Histórico de KM",
      version: "5.27.1",
      name: "HistoricoKmQuery",
      group: "Consultas_Veiculares",
      header: {
        fields: {
          Header: [
            {
              group: "Header",
              type: "String",
              optional: false,
              field: "Authorization",
              description:
                "<p>Token de acesso retornado após autenticação.</p>",
            },
          ],
        },
      },
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "userid",
              description: "<p>ID do usuário</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "querycode",
              description:
                "<p>Código da consulta. (Código = 8 para consulta de Histórico de KM)</p>",
            },
            {
              group: "Parameter",
              type: "Object",
              optional: false,
              field: "keys",
              description: "<p>Chaves para realização da consulta</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "keys.placa",
              description:
                "<p>A placa para realização da consulta de Histórico de KM</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "keys.chassi",
              description:
                "<p>O chassi para realização da consulta de Histórico de KM</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "keys.renavam",
              description:
                "<p>O renavam para realização da consulta de Histórico de KM</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "keys.motor",
              description:
                "<p>O motor para realização da consulta de Histórico de KM</p>",
            },
          ],
        },
        examples: [
          {
            title: "Request-Example:",
            content:
              '{\n  "querycode":8,\n  "keys" : {\n    "placa" : "XXX0000"\n  }\n}',
            type: "json",
          },
          {
            title: "Request-Example:",
            content:
              '{\n  "querycode":8,\n  "keys" : {\n    "chassi" : "0DD2928DHD28D2H8D2H8"\n  }\n}',
            type: "json",
          },
          {
            title: "Request-Example:",
            content:
              '{\n  "querycode":8,\n  "keys" : {\n    "renavam" : "0000000000000000"\n  }\n}',
            type: "json",
          },
          {
            title: "Request-Example:",
            content:
              '{\n  "querycode":8,\n  "keys" : {\n    "motor" : "0DD2928DHD28D2H8D2H8"\n  }\n}',
            type: "json",
          },
        ],
      },
      description:
        "<p>O parametro USER_ID deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br><b>EX: /api/vehicle/&lt;USER_ID&gt;</b></p>",
      success: {
        examples: [
          {
            title: "Success-Response:",
            content:
              'HTTP/1.1 200 OK\n{\n\t"status": {\n\t\t"cod": 200,\n\t\t"msg": "ok"\n\t},\n\t"body": {\n\t\t"headerInfos": {\n\t\t\t"queryid": "5b3a323nfn2330feannac978676f0f7",\n\t\t\t"name": "Historico de KM",\n\t\t\t"date": "2019-12-11T18:16:03.299Z",\n\t\t\t"keys": {\n\t\t\t\t"placa": "XXX0000"\n\t\t\t}\n\t\t},\n\t\t"data": {\n\t\t\t"__v": 1,\n\t\t\t"historicoKm": [\n\t\t\t\t{\n                    "_id": "5df132663130b10c54346448",\n                    "km": "38000",\n                    "dataInclusao": "25/07/2015 12:39:31"\n                },\n                {\n                    "_id": "5df132663130b10c54346447",\n                    "km": "93000",\n                    "dataInclusao": "07/08/2013 13:19:23"\n                },\n                {\n                    "_id": "5df132663130b10c54346446",\n                    "km": "92000",\n                    "dataInclusao": "17/08/2016 09:23:49"\n                },\n                {\n                    "_id": "5df132663130b10c54346445",\n                    "km": "25000",\n                    "dataInclusao": "23/07/2016 20:53:08"\n                }\n\t\t\t]\n\t\t}\n\t}\n}',
            type: "json",
          },
        ],
      },
      filename: "integration/vehicular/apidoc_historicoKmQuery.js",
      groupTitle: "Consultas_Veiculares",
    },
    {
      type: "post",
      url: "/api/vehicle/:userid",
      title: "Consultar Indício de Sinistro",
      version: "5.27.1",
      name: "IndicioSinistroQuery",
      group: "Consultas_Veiculares",
      header: {
        fields: {
          Header: [
            {
              group: "Header",
              type: "String",
              optional: false,
              field: "Authorization",
              description:
                "<p>Token de acesso retornado após autenticação.</p>",
            },
          ],
        },
      },
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "userid",
              description: "<p>ID do usuário</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "querycode",
              description:
                "<p>Código da consulta. (Código = 21 para consulta de Indício de Sinistro)</p>",
            },
            {
              group: "Parameter",
              type: "Object",
              optional: false,
              field: "keys",
              description: "<p>Chaves para realização da consulta</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "keys.placa",
              description:
                "<p>O placa para realização da consulta de Indício de Sinistro</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "keys.chassi",
              description:
                "<p>O chassi para realização da consulta de Indício de Sinistro</p>",
            },
          ],
        },
        examples: [
          {
            title: "Request-Example:",
            content:
              '{\n  "querycode":21,\n  "keys" : {\n    "placa" : "XXX0000"\n  }\n}',
            type: "json",
          },
          {
            title: "Request-Example:",
            content:
              '{\n  "querycode":21,\n  "keys" : {\n    "chassi" : "0DD2928DHD28D2H8D2H8"\n  }\n}',
            type: "json",
          },
        ],
      },
      description:
        "<p>O parametro USER_ID deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br><b>EX: /api/vehicle/&lt;USER_ID&gt;</b></p>",
      success: {
        examples: [
          {
            title: "Success-Response:",
            content:
              'HTTP/1.1 200 OK\n{\n\t"status": {\n\t\t"cod": 200,\n\t\t"msg": "ok"\n\t},\n\t"body": {\n\t\t"headerInfos": {\n\t\t\t"queryid": "5b3a323nfn2330feannac978676f0f7",\n\t\t\t"name": "Indício de Sinistro",\n\t\t\t"date": "05/07/2018 09:54:51",\n\t\t\t"keys": {\n\t\t\t\t"placa": "XXX0000"\n\t\t\t}\n\t\t},\n\t\t"data": {\n\t\t\t"__v": 2,\n\t\t\t"indicioSinistro": {\n\t\t\t\t"classificacao": null,\n\t\t\t\t"descricao": "NÃO CONSTA INDÍCIO DE SINISTRO PARA O VEÍCULO INFORMADO 😃"\n\t\t\t},\n\t\t\t"renavam": "767575xxx6757",\n\t\t\t"placa": "XXX0000",\n\t\t\t"chassi": "0DD2928DHD28D2H8D2H8"\n\t\t}\n\t}\n}',
            type: "json",
          },
        ],
      },
      filename: "integration/vehicular/apidoc_indicioSinistroMultasQuery.js",
      groupTitle: "Consultas_Veiculares",
    },
    {
      type: "post",
      url: "/api/vehicle/:userid",
      title: "Consultar Leilão + Dados",
      version: "5.27.1",
      name: "LeilaoMaisDadosQuery",
      group: "Consultas_Veiculares",
      header: {
        fields: {
          Header: [
            {
              group: "Header",
              type: "String",
              optional: false,
              field: "Authorization",
              description:
                "<p>Token de acesso retornado após autenticação.</p>",
            },
          ],
        },
      },
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "userid",
              description: "<p>ID do usuário</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "querycode",
              description:
                "<p>Código da consulta. (Código = 18 para consulta de Leilão + Dados)</p>",
            },
            {
              group: "Parameter",
              type: "Object",
              optional: false,
              field: "keys",
              description: "<p>Chaves para realização da consulta</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "keys.placa",
              description:
                "<p>O placa para realização da consulta de Leilão + Dados</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "keys.chassi",
              description:
                "<p>O chassi para realização da consulta de Leilão + Dados</p>",
            },
          ],
        },
        examples: [
          {
            title: "Request-Example:",
            content:
              '{\n  "querycode":18,\n  "keys" : {\n    "placa" : "XXX0000",\n    "chassi" : "0DD2928DHD28D2H8D2H8"\n  }\n}',
            type: "json",
          },
        ],
      },
      description:
        "<p>O parametro USER_ID deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br><b>EX: /api/vehicle/&lt;USER_ID&gt;</b></p>",
      success: {
        examples: [
          {
            title: "Success-Response:",
            content:
              'HTTP/1.1 200 OK\n{\n\t"status": {\n\t\t"cod": 200,\n\t\t"msg": "ok"\n\t},\n\t"body": {\n\t\t"headerInfos": {\n\t\t\t"queryid": "5b3a323nfn2330feannac978676f0f7",\n\t\t\t"name": "Leilão + Dados do Veículo",\n\t\t\t"date": "03/07/2018 14:51:32",\n\t\t\t"keys": {\n\t\t\t\t"placa": "XXX0000",\n\t\t\t\t"chassi": "0DD2928DHD28D2H8D2H8"\n\t\t\t}\n\t\t},\n\t\t"data": {\n\t\t\t"leilao": {\n\t\t\t\t"Registro": [\n\t\t\t\t\t{\n\t\t\t\t\t\t"Patio": "NC",\n\t\t\t\t\t\t"Comitente": "NC",\n\t\t\t\t\t\t"DataLeilao": "2003-11-21T00:00:00",\n\t\t\t\t\t\t"QuantidadeDeEixo": "0",\n\t\t\t\t\t\t"NumeroMotor": "28DHD28D2H8D",\n\t\t\t\t\t\t"CondicaoGeralDoVeiculo": null,\n\t\t\t\t\t\t"CategoriaDoVeiculo": "AUTOMOVEL AHAG",\n\t\t\t\t\t\t"Combustivel": "GASOLINA",\n\t\t\t\t\t\t"Cor": "BRANCA",\n\t\t\t\t\t\t"Chassi": "0DD2928DHD28D2H8D2H8",\n\t\t\t\t\t\t"Placa": "XXX0000",\n\t\t\t\t\t\t"AnoFabricacao": "2000",\n\t\t\t\t\t\t"AnoModelo": "2001",\n\t\t\t\t\t\t"Modelo": "CORSA WIND 1.0",\n\t\t\t\t\t\t"Marca": "CHEVROLET",\n\t\t\t\t\t\t"IdLeilao": "5008",\n\t\t\t\t\t\t"Lote": "0",\n\t\t\t\t\t\t"Leiloeiro": "NC"\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\t"Patio": "NC",\n\t\t\t\t\t\t"Comitente": "NC",\n\t\t\t\t\t\t"DataLeilao": "2003-11-21T00:00:00",\n\t\t\t\t\t\t"QuantidadeDeEixo": "0",\n\t\t\t\t\t\t"NumeroMotor": "0D28D2H8D2H8",\n\t\t\t\t\t\t"CondicaoGeralDoVeiculo": "",\n\t\t\t\t\t\t"CategoriaDoVeiculo": "AUTOMOVEL AHAG",\n\t\t\t\t\t\t"Combustivel": "GASOLINA",\n\t\t\t\t\t\t"Cor": "BRANCA",\n\t\t\t\t\t\t"Chassi": "0DD2928DHD28D2H8D2H8",\n\t\t\t\t\t\t"Placa": "XXX0000",\n\t\t\t\t\t\t"AnoFabricacao": "2000",\n\t\t\t\t\t\t"AnoModelo": "2001",\n\t\t\t\t\t\t"Modelo": "CORSA WIND 1.0",\n\t\t\t\t\t\t"Marca": "CHEVROLET",\n\t\t\t\t\t\t"IdLeilao": "5008",\n\t\t\t\t\t\t"Lote": "0",\n\t\t\t\t\t\t"Leiloeiro": "NC"\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\t"Patio": "NC",\n\t\t\t\t\t\t"Comitente": "NC",\n\t\t\t\t\t\t"DataLeilao": "2003-11-21T00:00:00",\n\t\t\t\t\t\t"QuantidadeDeEixo": "0",\n\t\t\t\t\t\t"NumeroMotor": "8D2H8D2H8",\n\t\t\t\t\t\t"CondicaoGeralDoVeiculo": "",\n\t\t\t\t\t\t"CategoriaDoVeiculo": "AUTOMOVEL AHAG",\n\t\t\t\t\t\t"Combustivel": "GASOLINA",\n\t\t\t\t\t\t"Cor": "BRANCA",\n\t\t\t\t\t\t"Chassi": "0DD2928DHD28D2H8D2H8",\n\t\t\t\t\t\t"Placa": "XXX0000",\n\t\t\t\t\t\t"AnoFabricacao": "2000",\n\t\t\t\t\t\t"AnoModelo": "2001",\n\t\t\t\t\t\t"Modelo": "CORSA WIND 1.0",\n\t\t\t\t\t\t"Marca": "CHEVROLET",\n\t\t\t\t\t\t"IdLeilao": "12571",\n\t\t\t\t\t\t"Lote": "0",\n\t\t\t\t\t\t"Leiloeiro": "NC"\n\t\t\t\t\t}\n\t\t\t\t],\n\t\t\t\t"DescricaoRetorno": "Consta Registro de Leilao para o veiculo informado"\n\t\t\t},\n\t\t\t"analiseRisco": {\n\t\t\t\t"indiceRisco": "3",\n\t\t\t\t"parecer": "VEÍCULO COM INDÍCIO DE GRANDES DANOS 😒"\n\t\t\t},\n\t\t\t"baseEstadual": {\n\t\t\t\t"combustivel": "GASOLINA",\n\t\t\t\t"motor": "0DD28D2H8D2H8",\n\t\t\t\t"categoria": "PARTICULAR",\n\t\t\t\t"especie": "PASSAGEIRO",\n\t\t\t\t"cor": "BRANCA",\n\t\t\t\t"situacaoVeiculo": "CIRCULACAO",\n\t\t\t\t"codigoFinanceira": "",\n\t\t\t\t"dataLimiteRestricaoTributaria": "",\n\t\t\t\t"dataInclusaoIntencaoTrocaFinanceira": "",\n\t\t\t\t"inspecaoStatus": "",\n\t\t\t\t"inspecaoSelo": "",\n\t\t\t\t"inspecaoData": "",\n\t\t\t\t"inspecaoCentro": "",\n\t\t\t\t"inspecaoAno": "",\n\t\t\t\t"protocoloDetran": "",\n\t\t\t\t"notaFiscal": "",\n\t\t\t\t"dataVenda": "",\n\t\t\t\t"docComprador": "",\n\t\t\t\t"tipoDocComprador": "",\n\t\t\t\t"comunicacaoInclusao": "",\n\t\t\t\t"comunicacaoVenda": "NAO CONSTA COMUNICACAO DE VENDAS ",\n\t\t\t\t"dataEmissaoCrv": "24/11/2016",\n\t\t\t\t"exercicioLicenciamento": "2017",\n\t\t\t\t"outrasRestricoes4": "NADA CONSTA",\n\t\t\t\t"outrasRestricoes3": "NADA CONSTA",\n\t\t\t\t"outrasRestricoes2": "NADA CONSTA",\n\t\t\t\t"outrasRestricoes1": "NADA CONSTA",\n\t\t\t\t"restricaoAmbiental": "veiculo com inspecao veicular ok",\n\t\t\t\t"restricaoRenajud": "NADA CONSTA",\n\t\t\t\t"restricaoTributaria": "NADA CONSTA",\n\t\t\t\t"restricaoJudicial": "NADA CONSTA",\n\t\t\t\t"restricaoAdminisrativa": "SINISTRADO/RECUPERADO INDICIO DE SINISTRO ENCONTRADO",\n\t\t\t\t"restricaoGuincho": "NADA CONSTA",\n\t\t\t\t"restricaoRouboFurto": "NADA CONSTA",\n\t\t\t\t"debitoPoliciaRodoviariaFederal": "0,00",\n\t\t\t\t"debitoMunicipais": "0,00",\n\t\t\t\t"debitoRenainf": "0,00",\n\t\t\t\t"debitoCetesb": "0,00",\n\t\t\t\t"debitoDetran": "195,23",\n\t\t\t\t"debitoDer": "0,00",\n\t\t\t\t"debitoDersa": "0,00",\n\t\t\t\t"debitoDpvat": "45,72",\n\t\t\t\t"debitoMultas": "195.23",\n\t\t\t\t"debitoLicenciamento": "0,00",\n\t\t\t\t"debitoIpva": "464,11",\n\t\t\t\t"existeDebitoDpvat": "EXISTE DEBITO DE DPVAT",\n\t\t\t\t"existeDebitoLicenciamento": "NAO EXISTE DEBITO DE LICENCIAMENTO",\n\t\t\t\t"existeDebitoMulta": "EXISTE DEBITO DE MULTA",\n\t\t\t\t"existeDebitoIpva": "EXISTE DEBITO DE IPVA",\n\t\t\t\t"restricaoDataInclusao": "",\n\t\t\t\t"restricaoArrendatario": "",\n\t\t\t\t"restricaoNomeAgente": "",\n\t\t\t\t"restricaoFinanceira": "NADA CONSTA",\n\t\t\t\t"licdata": "19/10/2017",\n\t\t\t\t"intencaoDocFinanceira": "",\n\t\t\t\t"intencaoDataInslusao": "",\n\t\t\t\t"intencaoNomeFinanceira": "",\n\t\t\t\t"intencaoNomeAgente": "",\n\t\t\t\t"intencaoRestricaoFinanceira": "",\n\t\t\t\t"restricaoDocArrendatario": "",\n\t\t\t\t"pronomeAnterior": "igo",\n\t\t\t\t"pronome": "0 CRISLEIDE CARDOSO DE SOUZA",\n\t\t\t\t"dataVigenciaContratoFinanceira": "",\n\t\t\t\t"codigoAgenteFinanceiro": "",\n\t\t\t\t"numContratoFinanceira": "",\n\t\t\t\t"tipoMarcacaoChassi": "NORMAL",\n\t\t\t\t"renavam": "0000000000000000",\n\t\t\t\t"chassi": "0DD2928DHD28D2H8D2H8",\n\t\t\t\t"placa": "XXX0000"\n\t\t\t},\n\t\t\t"baseNacional": {\n\t\t\t\t"anoFabricacao": "2000",\n\t\t\t\t"anoModelo": "2001",\n\t\t\t\t"renavam": "0000000000000000",\n\t\t\t\t"chassi": "0DD2928DHD28D2H8D2H8",\n\t\t\t\t"placa": "XXX0000",\n\t\t\t\t"docFaturado": "50xxx50xx00xx1xx30xxx",\n\t\t\t\t"di": "0000000000",\n\t\t\t\t"tipoDocImportadora": null,\n\t\t\t\t"ufFaturado": "SP",\n\t\t\t\t"tipoDocFaturado": "JURIDICA",\n\t\t\t\t"uf": "SP",\n\t\t\t\t"municipio": "ILHABELA",\n\t\t\t\t"situacaoVeiculo": "CIRCULACAO",\n\t\t\t\t"tipoVeiculo": "AUTOMOVEL",\n\t\t\t\t"especieVeiculo": "PASSAGEIRO",\n\t\t\t\t"restricao4": "INDICIO DE SINISTRO ENCONTRADO",\n\t\t\t\t"restricao3": "NADA CONSTA",\n\t\t\t\t"restricao2": "NADA CONSTA",\n\t\t\t\t"restricao1": "SINISTRADO/RECUPERADO",\n\t\t\t\t"dtUltimaAtualizacao": "24/11/2006",\n\t\t\t\t"combustivel": "GASOLINA",\n\t\t\t\t"motor": "0DD22H8D2H8",\n\t\t\t\t"categoria": "PARTICULAR",\n\t\t\t\t"especie": "BRANCA",\n\t\t\t\t"cor": "BRANCA",\n\t\t\t\t"outrasRestricoes8": "NADA CONSTA",\n\t\t\t\t"outrasRestricoes7": "NADA CONSTA",\n\t\t\t\t"outrasRestricoes6": "NADA CONSTA",\n\t\t\t\t"outrasRestricoes5": "NADA CONSTA",\n\t\t\t\t"outrasRestricoes4": "NADA CONSTA",\n\t\t\t\t"outrasRestricoes3": "NADA CONSTA",\n\t\t\t\t"outrasRestricoes2": "NADA CONSTA",\n\t\t\t\t"outrasRestricoes1": "NADA CONSTA",\n\t\t\t\t"restricaoDataInclusao": "",\n\t\t\t\t"restricaoFinanciamento": "",\n\t\t\t\t"restricaoNomeAgente": "",\n\t\t\t\t"restricaoFinanciadora": " NADA CONSTA ",\n\t\t\t\t"restricaoTipoTransacao": "NADA CONSTA",\n\t\t\t\t"indicadorRestricaoRenajud": "NAO",\n\t\t\t\t"indicadorComunicacaoVendas": "NAO",\n\t\t\t\t"ocorrencia": "VEICULO NAO INDICA OCORRENCIA DE ROUBO/FURTO",\n\t\t\t\t"tipoMarcacaoChassi": "NORMAL"\n\t\t\t},\n\t\t\t"ocorrencia": null,\n\t\t\t"municipioEmplacamento": null,\n\t\t\t"capacidadePassageiro": "5",\n\t\t\t"procedencia": "NACIONAL",\n\t\t\t"categoria": "PARTICULAR",\n\t\t\t"ufFaturado": "SP",\n\t\t\t"tipoDocFaturado": "JURIDICA",\n\t\t\t"docFaturado": "xx12xxxx3x4xxx4x4x2x",\n\t\t\t"situacaoVeiculo": null,\n\t\t\t"pesoBrutoTotal": "0,00",\n\t\t\t"capMaxTracao": "0",\n\t\t\t"cilindradas": "1000",\n\t\t\t"limiteRestricaoTrib": null,\n\t\t\t"registroDi": null,\n\t\t\t"di": null,\n\t\t\t"identImportadora": null,\n\t\t\t"tipoDocImportadora": null,\n\t\t\t"tipoMontagem": "COMPLETA",\n\t\t\t"eixos": "0",\n\t\t\t"corVeiculo": "BRANCA",\n\t\t\t"tipoCarroceria": "INEXISTENTE",\n\t\t\t"especieVeiculo": "PASSAGEIRO",\n\t\t\t"tipoVeiculo": "AUTOMOVEL",\n\t\t\t"numTerceiroEixo": "",\n\t\t\t"numMotor": "0DD29H8D2H8",\n\t\t\t"eixoTraseiroDif": "",\n\t\t\t"caixaCambio": "xx0x0xx09xx202",\n\t\t\t"numCarroceria": "0",\n\t\t\t"nacionalidade": null,\n\t\t\t"capacidadeCarga": "0,00",\n\t\t\t"potencia": "60",\n\t\t\t"combustivel": "GASOLINA",\n\t\t\t"marcaModelo": "GM/CORSA WIND",\n\t\t\t"municipio": "ILHABELA-SP",\n\t\t\t"anoModelo": "2001",\n\t\t\t"anoFabricacao": "2000",\n\t\t\t"numFaturado": null,\n\t\t\t"ultimaDataInclusao": null,\n\t\t\t"renavam": "0000000000000000",\n\t\t\t"placa": "XXX0000",\n\t\t\t"chassi": "0DD2928DHD28D2H8D2H8",\n\t\t\t"createAt": "2018-07-03T14:24:19.285Z"\n\t\t}\n\t}\n}',
            type: "json",
          },
        ],
      },
      filename: "integration/vehicular/apidoc_leilaoMaisDadosQuery.js",
      groupTitle: "Consultas_Veiculares",
    },
    {
      type: "post",
      url: "/api/vehicle/:userid",
      title: "Consultar Leilão Simples",
      version: "5.27.1",
      name: "LeilaoSimplesQuery",
      group: "Consultas_Veiculares",
      header: {
        fields: {
          Header: [
            {
              group: "Header",
              type: "String",
              optional: false,
              field: "Authorization",
              description:
                "<p>Token de acesso retornado após autenticação.</p>",
            },
          ],
        },
      },
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "userid",
              description: "<p>ID do usuário</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "querycode",
              description:
                "<p>Código da consulta. (Código = 16 para consulta de Leilão Simples)</p>",
            },
            {
              group: "Parameter",
              type: "Object",
              optional: false,
              field: "keys",
              description: "<p>Chaves para realização da consulta</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "keys.placa",
              description:
                "<p>O placa para realização da consulta de Leilão Simples</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "keys.chassi",
              description:
                "<p>O chassi para realização da consulta de Leilão Simples</p>",
            },
          ],
        },
        examples: [
          {
            title: "Request-Example:",
            content:
              '{\n  "querycode":16,\n  "keys" : {\n    "placa" : "XXX0000",\n    "chassi" : "0DD2928DHD28D2H8D2H8"\n  }\n}',
            type: "json",
          },
        ],
      },
      description:
        "<p>O parametro USER_ID deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br><b>EX: /api/vehicle/&lt;USER_ID&gt;</b></p>",
      success: {
        examples: [
          {
            title: "Success-Response:",
            content:
              'HTTP/1.1 200 OK\n{\n\t"status": {\n\t\t"cod": 200,\n\t\t"msg": "ok"\n\t},\n\t"body": {\n\t\t"headerInfos": {\n\t\t\t"queryid": "5b3a323nfn2330feannac978676f0f7",\n\t\t\t"name": "Leilao Simples",\n\t\t\t"date": "03/07/2018 13:15:46",\n\t\t\t"keys": {\n\t\t\t\t"placa": "XXX0000",\n\t\t\t\t"chassi": "0DD2928DHD28D2H8D2H8"\n\t\t\t}\n\t\t},\n\t\t"data": {\n\t\t"analiseRisco": {\n\t\t\t"imageLink": null,\n\t\t\t\t"indiceRisco": "3",\n\t\t\t\t"parecer": "Veículo com alto risco de recusa em comercialização/seguro 😒"\n\t\t},\n\t\t"anoFabricacao": "2000",\n\t\t\t"anoModelo": "2001",\n\t\t\t"caixaCambio": "000921202",\n\t\t\t"capMaxTracao": "0",\n\t\t\t"capacidadeCarga": "0.0",\n\t\t\t"capacidadePassageiro": "5",\n\t\t\t"categoria": "PARTICULAR",\n\t\t\t"chassi": "9BGSC08Z01C147623",\n\t\t\t"cidade": null,\n\t\t\t"cilindradas": "1000",\n\t\t\t"cmt": "0.0",\n\t\t\t"codigoCombustivel": "2",\n\t\t\t"codigoFipe": [\n\t\t\t{\n\t\t\t\t"_id": "5df0570b3101c162gg594cb5",\n\t\t\t\t"valorZeroKM": "15723",\n\t\t\t\t"codigo": "004001-0"\n\t\t\t},\n\t\t\t{\n\t\t\t\t"_id": "5df0570b3101c162gg594cb7",\n\t\t\t\t"valorZeroKM": "16810",\n\t\t\t\t"codigo": "004173-4"\n\t\t\t}\n\t\t],\n\t\t\t"codigoMarcaModelo": "149502",\n\t\t\t"codigoMunicipio": "6509",\n\t\t\t"combustivel": "GASOLINA",\n\t\t\t"corVeiculo": "BRANCA",\n\t\t\t"di": null,\n\t\t\t"docFaturado": "50507300000130",\n\t\t\t"dtAtualizacao": "25/04/2018 09:36:04",\n\t\t\t"dtUltimaAtualizacao": "14/12/2018",\n\t\t\t"eixoTraseiroDif": "",\n\t\t\t"eixos": "0",\n\t\t\t"especieVeiculo": "PASSAGEIRO",\n\t\t\t"identImportadora": "",\n\t\t\t"indicioSinistro": {\n\t\t\t\t"classificacao": null,\n\t\t\t\t"descricao": "CONSTA INDÍCIO DE SINISTRO PARA O VEÍCULO INFORMADO 😑"\n\t\t\t},\n\t\t"leilao": {\n\t\t\t"descricao": "Consta histórico de leilão para o veículo informado",\n\t\t\t\t"registros": [\n\t\t\t\t{\n\t\t\t\t\t"_id": "5df057093101c12020594ca8",\n\t\t\t\t\t"placa": "XXX0000",\n\t\t\t\t\t"modelo": "CORSA WIND 1.0",\n\t\t\t\t\t"marca": "CHEVROLET",\n\t\t\t\t\t"lote": "1707",\n\t\t\t\t\t"leiloeiro": "NC",\n\t\t\t\t\t"dataLeilao": "2003-11-21T00:00:00",\n\t\t\t\t\t"cor": "BRANCA",\n\t\t\t\t\t"condicaoGeral": null,\n\t\t\t\t\t"comitente": null,\n\t\t\t\t\t"chassi": "9BGSC08Z01C142020",\n\t\t\t\t\t"anoModelo": "2001",\n\t\t\t\t\t"anoFabricacao": "2000"\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\t"_id": "5df057093101c12020594ca8",\n\t\t\t\t\t"placa": "XXX0000",\n\t\t\t\t\t"modelo": "CORSA WIND 1.0",\n\t\t\t\t\t"marca": "CHEVROLET",\n\t\t\t\t\t"lote": "1707",\n\t\t\t\t\t"leiloeiro": "NC",\n\t\t\t\t\t"dataLeilao": "2003-11-21T00:00:00",\n\t\t\t\t\t"cor": "BRANCA",\n\t\t\t\t\t"condicaoGeral": "",\n\t\t\t\t\t"comitente": null,\n\t\t\t\t\t"chassi": "9BGSC08Z01C142020",\n\t\t\t\t\t"anoModelo": "2001",\n\t\t\t\t\t"anoFabricacao": "2000"\n\t\t\t\t}\n\t\t\t]\n\t\t},\n\t\t"limiteRestricaoTrib": null,\n\t\t\t"linha": null,\n\t\t\t"marcaModelo": "GM/CORSA WIND",\n\t\t\t"municipio": "CARAGUATATUBA-SP",\n\t\t\t"municipioEmplacamento": null,\n\t\t\t"nacionalidade": "NACIONAL",\n\t\t\t"numCarroceria": "0",\n\t\t\t"numFaturado": null,\n\t\t\t"numMotor": "NM0091959",\n\t\t\t"numTerceiroEixo": "",\n\t\t\t"ocorrencia": "VEICULO NAO INDICA OCORRENCIA DE ROUBO/FURTO",\n\t\t\t"pbt": "0.0",\n\t\t\t"pesoBrutoTotal": "0,00",\n\t\t\t"placa": "XXX0000",\n\t\t\t"potencia": "60",\n\t\t\t"procedencia": "NACIONAL",\n\t\t\t"qtdPax": null,\n\t\t\t"registroDi": null,\n\t\t\t"renavam": "00743112644",\n\t\t\t"restricoes": null,\n\t\t\t"situacaoChassi": "NORMAL",\n\t\t\t"situacaoVeiculo": "CIRCULACAO",\n\t\t\t"tipoCarroceria": "INEXISTENTE",\n\t\t\t"tipoDocFaturado": "JURIDICA",\n\t\t\t"tipoDocImportadora": null,\n\t\t\t"tipoMontagem": "COMPLETA",\n\t\t\t"tipoVeiculo": "AUTOMOVEL",\n\t\t\t"uf": "SP",\n\t\t\t"ufFaturado": "SP",\n\t\t\t"ultimaDataInclusao": "09/02/2017 13:35:48",\n\t\t\t"unidadeLocalSRF": "0"\n\t\t}\n\t}\n}',
            type: "json",
          },
        ],
      },
      filename: "integration/vehicular/apidoc_leilaoSimplesQuery.js",
      groupTitle: "Consultas_Veiculares",
    },
    {
      type: "post",
      url: "/api/vehicle/:userid",
      title: "Consultar Perda Total",
      version: "5.27.1",
      name: "PerdaTotalQuery",
      group: "Consultas_Veiculares",
      header: {
        fields: {
          Header: [
            {
              group: "Header",
              type: "String",
              optional: false,
              field: "Authorization",
              description:
                "<p>Token de acesso retornado após autenticação.</p>",
            },
          ],
        },
      },
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "userid",
              description: "<p>ID do usuário</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "querycode",
              description:
                "<p>Código da consulta. (Código = 10 para consultar Perda Total)</p>",
            },
            {
              group: "Parameter",
              type: "Object",
              optional: false,
              field: "keys",
              description: "<p>Chaves para realização da consulta</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "keys.placa",
              description:
                "<p>A placa para realização da consulta de Perda Total</p>",
            },
          ],
        },
        examples: [
          {
            title: "Request-Example:",
            content:
              '{\n  "querycode":10,\n  "keys" : {\n    "placa" : "XXX0000"\n  }\n}',
            type: "json",
          },
          {
            title: "Request-Example:",
            content:
              '{\n  "querycode":10,\n  "keys" : {\n    "chassi" : "0DD2928DHD28D2H8D2H8"\n  }\n}',
            type: "json",
          },
        ],
      },
      description:
        "<p>O parametro USER_ID deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br><b>EX: /api/vehicle/&lt;USER_ID&gt;</b></p>",
      success: {
        examples: [
          {
            title: "Success-Response:",
            content:
              'HTTP/1.1 200 OK\n{\n\t"status": {\n\t\t"cod": 200,\n\t\t"msg": "ok"\n\t},\n\t"body": {\n\t\t"headerInfos": {\n\t\t\t"queryid": "5b3a323nfn2330feannac978676f0f7",\n\t\t\t"name": "Perda Total",\n\t\t\t"date": "03/07/2018 11:25:48",\n\t\t\t"keys": {\n\t\t\t\t"placa": "XXX0000"\n\t\t\t}\n\t\t},\n\t\t"data": {\n\t\t\t"__v": 0,\n\t\t\t"perdaTotal": {\n\t\t\t\t"dataOcorrencia": "10/9/2003",\n\t\t\t\t"protocolo": "42xx8xx17",\n\t\t\t\t"descricao": null\n\t\t\t},\n\t\t\t"ocorrencia": null,\n\t\t\t"municipioEmplacamento": null,\n\t\t\t"renavam": 000000000000,\n\t\t\t"placa": "XXX0000",\n\t\t\t"chassi": null\n\t\t}\n\t}\n}',
            type: "json",
          },
        ],
      },
      filename: "integration/vehicular/apidoc_perdaTotalQuery.js",
      groupTitle: "Consultas_Veiculares",
    },
    {
      type: "post",
      url: "/api/vehicle/:userid",
      title: "Consultar Recall",
      version: "5.27.1",
      name: "RecallQuery",
      group: "Consultas_Veiculares",
      header: {
        fields: {
          Header: [
            {
              group: "Header",
              type: "String",
              optional: false,
              field: "Authorization",
              description:
                "<p>Token de acesso retornado após autenticação.</p>",
            },
          ],
        },
      },
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "userid",
              description: "<p>ID do usuário</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "querycode",
              description:
                "<p>Código da consulta. (Código = 14 para consulta do Recall)</p>",
            },
            {
              group: "Parameter",
              type: "Object",
              optional: false,
              field: "keys",
              description: "<p>Chaves para realização da consulta</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "keys.chassi",
              description:
                "<p>O chassi para realização da consulta de Recall</p>",
            },
          ],
        },
        examples: [
          {
            title: "Request-Example:",
            content:
              '{\n  "querycode":14,\n  "keys" : {\n    "chassi" : "0DD2928DHD28D2H8D2H8"\n  }\n}',
            type: "json",
          },
        ],
      },
      description:
        "<p>O parametro USER_ID deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br><b>EX: /api/vehicle/&lt;USER_ID&gt;</b></p>",
      success: {
        examples: [
          {
            title: "Success-Response:",
            content:
              'HTTP/1.1 200 OK\n{\n\t"status": {\n\t\t"cod": 200,\n\t\t"msg": "ok"\n\t},\n\t"body": {\n\t\t"headerInfos": {\n\t\t\t"queryid": "5b3a323nfn2330feannac978676f0f7",\n\t\t\t"name": "Recall",\n\t\t\t"date": "03/07/2018 11:43:47",\n\t\t\t"keys": {\n\t\t\t\t"chassi": "0DD2928DHD28D2H8D2H8"\n\t\t\t}\n\t\t},\n\t\t"data": {\n\t\t\t"__v": 0,\n\t\t\t"recall": {\n\t\t\t\t"chassi": "0DD2928DHD28D2H8D2H8",\n\t\t\t\t"NuCdRetorno": "1x09",\n\t\t\t\t"DsRetorno": "Veiculo encontrado sem Recall",\n\t\t\t\t"DsModelo": "CORSA WIND",\n\t\t\t\t"DsMarca": "GM",\n\t\t\t\t"DsAnoModelo": "2001",\n\t\t\t\t"Detalhes": null\n\t\t\t}\n\t\t}\n\t}\n}',
            type: "json",
          },
        ],
      },
      filename: "integration/vehicular/apidoc_recallQuery.js",
      groupTitle: "Consultas_Veiculares",
    },
    {
      type: "post",
      url: "/api/vehicle/:userid",
      title: "Consultar Renajud",
      version: "5.27.1",
      name: "RenajudQuery",
      group: "Consultas_Veiculares",
      header: {
        fields: {
          Header: [
            {
              group: "Header",
              type: "String",
              optional: false,
              field: "Authorization",
              description:
                "<p>Token de acesso retornado após autenticação.</p>",
            },
          ],
        },
      },
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "userid",
              description: "<p>ID do usuário</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "querycode",
              description:
                "<p>Código da consulta. (Código = 5 para consulta de Renajud)</p>",
            },
            {
              group: "Parameter",
              type: "Object",
              optional: false,
              field: "keys",
              description: "<p>Chaves para realização da consulta</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "keys.placa",
              description:
                "<p>A placa para realização da consulta de Renajud</p>",
            },
          ],
        },
        examples: [
          {
            title: "Request-Example:",
            content:
              '{\n  "querycode":5,\n  "keys" : {\n    "placa" : "XXX0000"\n  }\n}',
            type: "json",
          },
        ],
      },
      description:
        "<p>O parametro USER_ID deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br><b>EX: /api/vehicle/&lt;USER_ID&gt;</b></p>",
      success: {
        examples: [
          {
            title: "Success-Response:",
            content:
              'HTTP/1.1 200 OK\n{\n\t"status": {\n\t\t"cod": 200,\n\t\t"msg": "ok"\n\t},\n\t"body": {\n\t\t"headerInfos": {\n\t\t\t"queryid": "5b3a323nfn2330feannac978676f0f7",\n\t\t\t"name": "Renajud",\n\t\t\t"date": "02/07/2018 16:23:03",\n\t\t\t"keys": {\n\t\t\t\t"placa": "XXX0000"\n\t\t\t}\n\t\t},\n\t\t"data": {\n\t\t\t"__v": 1,\n\t\t\t"renajud": {\n\t\t\t\t"processo": "",\n\t\t\t\t"tribunal": "",\n\t\t\t\t"restricoes": "",\n\t\t\t\t"orgaoJudicial": "",\n\t\t\t\t"detalheRenajud": "VEICULO NAO POSSUI RESTRICAO",\n\t\t\t\t"codigoOrgaoJudicial": null,\n                "codigoTribunal": null,\n\t\t\t},\n\t\t\t"placa": "XXX0000",\n\t\t\t"chassi": "0DD2928DHD28D2H8D2H8"\n\t\t}\n\t}\n}',
            type: "json",
          },
        ],
      },
      filename: "integration/vehicular/apidoc_renajudQuery.js",
      groupTitle: "Consultas_Veiculares",
    },
    {
      type: "post",
      url: "/api/vehicle/:userid",
      title: "Consultar Roubo e Furto",
      version: "5.27.1",
      name: "RouboFurtoQuery",
      group: "Consultas_Veiculares",
      header: {
        fields: {
          Header: [
            {
              group: "Header",
              type: "String",
              optional: false,
              field: "Authorization",
              description:
                "<p>Token de acesso retornado após autenticação.</p>",
            },
          ],
        },
      },
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "userid",
              description: "<p>ID do usuário</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "querycode",
              description:
                "<p>Código da consulta. (Código = 11 para consulta de Roubo e Furto)</p>",
            },
            {
              group: "Parameter",
              type: "Object",
              optional: false,
              field: "keys",
              description: "<p>Chaves para realização da consulta</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "keys.placa",
              description:
                "<p>A placa para realização da consulta de roubo e furto</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "keys.chassi",
              description:
                "<p>O chassi para realização da consulta de roubo e furto</p>",
            },
          ],
        },
        examples: [
          {
            title: "Request-Example:",
            content:
              '{\n  "querycode":11,\n  "keys" : {\n    "placa" : "XXX0000"\n  }\n}',
            type: "json",
          },
          {
            title: "Request-Example:",
            content:
              '{\n  "querycode":11,\n  "keys" : {\n    "chassi" : "0DD2928DHD28D2H8D2H8"\n  }\n}',
            type: "json",
          },
        ],
      },
      description:
        "<p>O parametro USER_ID deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br><b>EX: /api/vehicle/&lt;USER_ID&gt;</b></p>",
      success: {
        examples: [
          {
            title: "Success-Response:",
            content:
              'HTTP/1.1 200 OK\n{\n    "status": {\n        "cod": 200,\n        "msg": "ok"\n    },\n    "body": {\n        "headerInfos": {\n            "queryid": "XXXXXXXXXXXXXXXX",\n            "name": "Roubo e Furto",\n            "date": "02/07/2018 14:50:40",\n            "keys": {\n                "placa": "XXX0000"\n            }\n        },\n        "data": {\n        "anoFabricacao": "2001",\n            "anoModelo": "2001",\n            "caixaCambio": "7763284",\n            "capMaxTracao": "6600,00",\n            "capacidadeCarga": "0,00",\n            "capacidadePassageiro": "0",\n            "categoria": "ALUGUEL",\n            "chassi": "0DD2928DHD28D2H8D2H8",\n            "cidade": null,\n            "cilindradas": "0",\n            "cmt": "66,00",\n            "codigoCombustivel": "3",\n            "codigoFipe": [],\n            "codigoMarcaModelo": "309517",\n            "codigoMunicipio": "6219",\n            "combustivel": "DIESEL",\n            "corVeiculo": "BRANCA",\n            "di": null,\n            "docFaturado": "59104901000176",\n            "dtAtualizacao": "09/02/2017 13:35:48",\n            "dtUltimaAtualizacao": "18/07/2019",\n            "eixoTraseiroDif": "764375",\n            "eixos": "3",\n            "especieVeiculo": "TRACAO",\n            "identImportadora": "",\n            "limiteRestricaoTrib": null,\n            "linha": null,\n            "marcaModelo": "SCANIA/R124 GA4X2NZ 420",\n            "municipio": "BAURU",\n            "municipioEmplacamento": null,\n            "nacionalidade": "NACIONAL",\n            "numCarroceria": "0",\n            "numFaturado": null,\n            "numMotor": "8010147",\n            "numTerceiroEixo": "764375",\n            "ocorrencia": "VEICULO NAO INDICA OCORRENCIA DE ROUBO/FURTO",\n            "pbt": "66,00",\n            "pesoBrutoTotal": "1820,00",\n            "placa": "XXX0000",\n            "potencia": "420",\n            "procedencia": "Nacional",\n            "qtdPax": null,\n            "registroDi": null,\n            "renavam": "769175422",\n            "restricoes": "NADA CONSTA",\n            "rouboFurto": {\n            "constaOcorrencia": true,\n                "constaOcorrenciaAtiva": true,\n                "historico": [\n                {\n                    "_id": "5df15193c1344d0c4f6602e3",\n                    "ufOcorrencia": "SP",\n                    "placa": "XXX0000",\n                    "ocorrencia": "Alerta de Roubo/Furto",\n                    "municipioOcorrencia": "IRACEMAPOLIS",\n                    "marcaModelo": "SCANIA/R124 GA4X2NZ 420  ",\n                    "declaracao": "Roubo",\n                    "dataOcorrencia": "19/12/2012",\n                    "cor": "BRANCA    ",\n                    "chassi": "0DD2928DHD28D2H8D2H8"\n                },\n                {\n                    "_id": "5df15193c1344d0c4f6602e5",\n                    "ufOcorrencia": "SP",\n                    "placa": "XXX0000",\n                    "ocorrencia": "Devolvido",\n                    "municipioOcorrencia": "MOCOCA",\n                    "marcaModelo": "Não informado",\n                    "declaracao": "Não informado",\n                    "dataOcorrencia": "21/12/2012",\n                    "cor": "Não informado",\n                    "chassi": "0DD2928DHD28D2H8D2H8"\n                }\n            ],\n                "indicadorProcedencia": "Não informado",\n                "municipioEmplacamento": "BAURU"\n        },\n        "situacaoChassi": "NORMAL",\n            "situacaoVeiculo": "CIRCULACAO",\n            "tipoCarroceria": "INEXISTENTE",\n            "tipoDocFaturado": "JURIDICA",\n            "tipoDocImportadora": null,\n            "tipoMontagem": "",\n            "tipoVeiculo": "CAMINHÃO TRATOR",\n            "uf": "SP",\n            "ufFaturado": "PR",\n            "ultimaDataInclusao": "09/02/2017 13:35:48",\n            "unidadeLocalSRF": "0"\n        }\n    }\n}',
            type: "json",
          },
        ],
      },
      filename: "integration/vehicular/apidoc_rouboFurtoQuery.js",
      groupTitle: "Consultas_Veiculares",
    },
    {
      type: "post",
      url: "/api/vehicle/:userid",
      title: "Consultar Veículo Completo",
      version: "5.27.1",
      name: "VeiculoCompletoQuery",
      group: "Consultas_Veiculares",
      header: {
        fields: {
          Header: [
            {
              group: "Header",
              type: "String",
              optional: false,
              field: "Authorization",
              description:
                "<p>Token de acesso retornado após autenticação.</p>",
            },
          ],
        },
      },
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "userid",
              description: "<p>ID do usuário</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "querycode",
              description:
                "<p>Código da consulta. (Código = 100 para consulta de Veículo Completo)</p>",
            },
            {
              group: "Parameter",
              type: "Object",
              optional: false,
              field: "keys",
              description: "<p>Chaves para realização da consulta</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "keys.placa",
              description:
                "<p>A placa para realização da consulta de roubo e furto</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "keys.chassi",
              description:
                "<p>O chassi para realização da consulta de roubo e furto</p>",
            },
          ],
        },
        examples: [
          {
            title: "Request-Example:",
            content:
              '{\n  "querycode":100,\n  "keys" : {\n    "placa" : "XXX0000"\n  }\n}',
            type: "json",
          },
          {
            title: "Request-Example:",
            content:
              '{\n  "querycode":100,\n  "keys" : {\n    "chassi" : "0DD2928DHD28D2H8D2H8"\n  }\n}',
            type: "json",
          },
        ],
      },
      description:
        "<p>O parametro USER_ID deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br><b>EX: /api/vehicle/&lt;USER_ID&gt;</b></p>",
      success: {
        examples: [
          {
            title: "Success-Response:",
            content:
              'HTTP/1.1 200 OK\n{\n    "status": {\n        "cod": 200,\n        "msg": "ok"\n    },\n    "body": {\n        "headerInfos": {\n            "queryid": "XXXXXXXXXXXXXXXX",\n            "name": "Roubo e Furto",\n            "date": "02/07/2018 14:50:40",\n            "keys": {\n                "placa": "XXX0000"\n            }\n        },\n        "data": {\n            "__v": 1,\n            "chassi" : "0DD2928DHD28D2H8D2H8",\n            "placa" : "XXX0000",\n            "renavam" : "000000000",\n            "uf" : "SP",\n            "cidade" : null,\n            "historicoAnuncios": [],\n            "historicoKm" : [],\n            "anoFabricacao" : "1999",\n            "anoModelo" : "1999",\n            "caixaCambio" : "0XX00000",\n            "capacidadeCarga" : "00",\n            "capacidadePassageiro" : "5",\n            "capMaxTracao" : "0",\n            "categoria" : "PARTICULAR",\n            "cilindradas" : "1762",\n            "cmt" : "0.0",\n            "codigoCombustivel" : "2",\n            "codigoFipe" : null,\n            "codigoMarcaModelo" : "000000",\n            "combustivel" : "2 - GASOLINA",\n            "corVeiculo" : "Verde",\n            "docFaturado" : "00000000000000",\n            "dtUltimaAtualizacao" : "06/01/2009",\n            "eixos" : "2",\n            "eixoTraseiroDif" : "",\n            "especieVeiculo" : "Passageiro",\n            "identImportadora" : "",\n            "limiteRestricaoTrib" : null,\n            "linha" : null,\n            "marca" : "TOYOTA",\n            "modelo" : "COROLLA XEI 1.8/1.8 FLEX 16V AUT.",\n            "marcaModelo" : "TOYOTA/COROLLA XEI",\n            "municipio" : "SAO PAULO",\n            "municipioEmplacamento" : null,\n            "nacionalidade" : "NACIONAL",\n            "numCarroceria" : "0",\n            "numFaturado" : null,\n            "numMotor" : "X000000",\n            "numTerceiroEixo" : "",\n            "ocorrencia" : "VEICULO NAO INDICA OCORRENCIA DE ROUBO/FURTO",\n            "pbt" : "1,20",\n            "pesoBrutoTotal" : "12000",\n            "potencia" : "114",\n            "procedencia" : "NACIONAL",\n            "qtdPax" : null,\n            "registroDi" : null,\n            "restricoes" : "NADA CONSTA",\n            "situacaoChassi" : "N",\n            "situacaoVeiculo" : "S",\n            "tipoCarroceria" : "INEXISTENTE",\n            "tipoDocFaturado" : "JURIDICA",\n            "tipoDocImportadora" : "0",\n            "tipoMontagem" : "COMPLETA",\n            "tipoVeiculo" : "AUTOMOVEL/CAMINHONETE/UTILITARIO",\n            "ufFaturado" : "SP",\n            "ultimaDataInclusao" : "09/02/2017 13:35:48",\n            "unidadeLocalSRF" : "0",\n            "fotos" : [],\n            "opcionais" : [],\n            "valorAnunciado" : null,\n            "anuncio": {\n                "placa": null,\n                "km": null,\n                "valor": null,\n                "data": null,\n                "observacao": null,\n                "opcionais": [],\n                "fotos": []\n            },\n            "baseNacional" : {\n                "anoFabricacao" : "1999",\n                "anoModelo" : "1999",\n                "categoria" : "PARTICULAR",\n                "chassi" : "0DD2928DHD28D2H8D2H8",\n                "combustivel" : "GASOLINA",\n                "cor" : "VERDE",\n                "di" : "0",\n                "docFaturado" : "00000000000000",\n                "dtUltimaAtualizacao" : "06/01/2009",\n                "especie" : "PASSAGEIRO",\n                "especieVeiculo" : "PASSAGEIRO",\n                "indicadorComunicacaoVendas" : "NAO",\n                "indicadorRestricaoRenajud" : "NAO",\n                "motor" : "X000000",\n                "municipio" : "SAO PAULO",\n                "ocorrencia" : "VEICULO NAO INDICA OCORRENCIA DE ROUBO/FURTO",\n                "outrasRestricoes1" : "NADA CONSTA",\n                "outrasRestricoes2" : "NADA CONSTA",\n                "outrasRestricoes3" : "NADA CONSTA",\n                "outrasRestricoes4" : "NADA CONSTA",\n                "outrasRestricoes5" : "NADA CONSTA",\n                "outrasRestricoes6" : "NADA CONSTA",\n                "outrasRestricoes7" : "NADA CONSTA",\n                "outrasRestricoes8" : "NADA CONSTA",\n                "placa" : "XXX0000",\n                "renavam" : "00000000000",\n                "restricao1" : "ARRENDAMENTO",\n                "restricao2" : null,\n                "restricao3" : "NADA CONSTA",\n                "restricao4" : "NADA CONSTA",\n                "restricaoDataInclusao" : "",\n                "restricaoFinanciadora" : " NADA CONSTA ",\n                "restricaoFinanciamento" : "",\n                "restricaoNomeAgente" : "",\n                "restricaoTipoTransacao" : "NADA CONSTA",\n                "situacaoVeiculo" : "CIRCULACAO",\n                "tipoDocFaturado" : "JURIDICA",\n                "tipoDocImportadora" : null,\n                "tipoMarcacaoChassi" : "NORMAL",\n                "tipoVeiculo" : "AUTOMOVEL",\n                "uf" : "SP",\n                "ufFaturado" : "SP"\n            },\n            "baseEstadual" : {\n                "categoria" : "PARTICULAR",\n                "chassi" : "0DD2928DHD28D2H8D2H8",\n                "codigoAgenteFinanceiro" : "",\n                "codigoFinanceira" : "",\n                "combustivel" : "GASOLINA",\n                "comunicacaoInclusao" : "",\n                "comunicacaoVenda" : "VEÍCULO COM COMUNICAÇÃO DE VENDA",\n                "cor" : "VERDE",\n                "dataAlteracaoMotor" : "NAO INFORMADO",\n                "dataEmissaoCrv" : "06/01/2009",\n                "dataInclusaoIntencaoTrocaFinanceira" : "",\n                "dataLimiteRestricaoTributaria" : "",\n                "dataVenda" : "17/01/2013",\n                "dataVigenciaContratoFinanceira" : "",\n                "debitoCetesb" : "0,00",\n                "debitoDer" : "0,00",\n                "debitoDersa" : "0,00",\n                "debitoDetran" : "0,00",\n                "debitoDpvat" : "0,00",\n                "debitoIpva" : "2.871,10",\n                "debitoLicenciamento" : "87,38",\n                "debitoMultas" : "0,00",\n                "debitoMunicipais" : "0,00",\n                "debitoPoliciaRodoviariaFederal" : "0,00",\n                "debitoRenainf" : "0,00",\n                "especie" : "PASSAGEIRO",\n                "exercicioLicenciamento" : "14/03/2012",\n                "existeDebitoDpvat" : "NADA CONSTA",\n                "existeDebitoIpva" : "2.871,10",\n                "existeDebitoLicenciamento" : "NAO EXISTE DEBITO DE LICENCIAMENTO",\n                "existeDebitoMulta" : "NADA CONSTA",\n                "inspecaoAno" : "",\n                "inspecaoCentro" : "",\n                "inspecaoData" : "",\n                "inspecaoSelo" : "",\n                "inspecaoStatus" : "",\n                "intencaoDataInslusao" : "",\n                "intencaoDocFinanceira" : "",\n                "intencaoNomeAgente" : "",\n                "intencaoNomeFinanceira" : "",\n                "intencaoRestricaoFinanceira" : "",\n                "licdata" : "14/03/2012",\n                "motor" : "X000000",\n                "notaFiscal" : "",\n                "numContratoFinanceira" : "",\n                "outrasRestricoes1" : "NADA CONSTA",\n                "outrasRestricoes2" : "NADA CONSTA",\n                "outrasRestricoes3" : "NADA CONSTA",\n                "outrasRestricoes4" : "NADA CONSTA",\n                "placa" : "XXX0000",\n                "pronome" : "BANCO XXXXXXXX",\n                "pronomeAnterior" : "CLAUDIO",\n                "protocoloDetran" : "23/11/2015",\n                "renavam" : "000000000",\n                "restricaoAdminisrativa" : "NADA CONSTA",\n                "restricaoAmbiental" : "veiculo com inspecao veicular ok",\n                "restricaoArrendatario" : "",\n                "restricaoDataInclusao" : "",\n                "restricaoDocArrendatario" : "",\n                "restricaoFinanceira" : "NADA CONSTA",\n                "restricaoGuincho" : "NADA CONSTA",\n                "restricaoJudicial" : "NADA CONSTA",\n                "restricaoNomeAgente" : "",\n                "restricaoRenajud" : "NADA CONSTA",\n                "restricaoRouboFurto" : "NADA CONSTA",\n                "restricaoTributaria" : "NADA CONSTA",\n                "situacaoVeiculo" : "CIRCULACAO",\n                "tipoMarcacaoChassi" : "NORMAL",\n                "uf" : "SP",\n                "municipio" : "SAO PAULO - SP",\n                "tipo" : "AUTOMOVEL",\n                "restricoes" : "NADA CONSTA",\n                "procedencia" : "NACIONAL",\n                "potencia" : "114",\n                "pbt" : "12000",\n                "ocorrenciaComunicacaoVenda" : "true",\n                "numCaixaCambio" : "0XX00000",\n                "montagem" : "COMPLETA",\n                "marcaModelo" : "114805 - TOYOTA/COROLLA XEI",\n                "inspecaoMunicipal" : "Veículo com Inspeção Veicular OK",\n                "gravame" : "NADA CONSTA",\n                "gare" : "NADA CONSTA",\n                "eixos" : "2",\n                "cmt" : "0",\n                "cilindrada" : "1762",\n                "carroceria" : "NAO IDENTIFICADO",\n                "capacidadePassageiros" : "5",\n                "anoModelo" : "1999",\n                "anoFabricacao" : "1999"\n            },\n            "indicioSinistro" : {\n                "descricao" : "NÃO CONSTA INDÍCIO DE SINISTRO PARA O VEÍCULO INFORMADO 😃",\n                "classificacao" : null\n            },\n            "rouboFurto" : {\n                "constaOcorrencia" : false,\n                "constaOcorrenciaAtiva" : false,\n                "indicadorProcedencia" : null,\n                "municipioEmplacamento" : null,\n                "historico" : []\n            },\n            "decodificadorPrecificador" : {\n                "localFabricacao" : null,\n                "marca" : "TOYOTA",\n                "modelo" : "COROLLA XEI",\n                "potenciaMotor" : null,\n                "pais" : "BRASIL",\n                "regiao" : "BRASIL / PARAGUAI / COLOMBIA / URUGUAI",\n                "tipoCarroceria" : "SEDAN",\n                "categoria" : "AUTOMOVEL",\n                "origem" : "NACIONAL",\n                "versao" : "XEI",\n                "chassi" : "0DD2928DHD28D2H8D2H8",\n                "anoModelo" : "1999",\n                "precificadorI" : [\n                    {\n                        "codigo" : "002061-3",\n                        "combustivel" : "G",\n                        "marca" : "Toyota",\n                        "modelo" : "Corolla XEi 1.8/1.8 Flex 16V Aut.",\n                        "valor" : "14787",\n                        "dataRefFipe" : null,\n                        "valorZeroKM" : null,\n                        "graphMes1" : null,\n                        "graphMes2" : null,\n                        "graphMes3" : null,\n                        "graphMes4" : null,\n                        "graphMes5" : null,\n                        "graphMes6" : null,\n                        "graphMes7" : null,\n                        "graphMes8" : null,\n                        "graphMes9" : null,\n                        "graphMes10" : null,\n                        "graphMes11" : null,\n                        "graphMes12" : null,\n                        "graphValor1" : null,\n                        "graphValor2" : null,\n                        "graphValor3" : null,\n                        "graphValor4" : null,\n                        "graphValor5" : null,\n                        "graphValor6" : null,\n                        "graphValor7" : null,\n                        "graphValor8" : null,\n                        "graphValor9" : null,\n                        "graphValor10" : null,\n                        "graphValor11" : null,\n                        "graphValor12" : null,\n                        "_id" : "5d710cbdb574f4001f582d9b"\n                    },\n                    {\n                        "codigo" : "002028-1",\n                        "combustivel" : "G",\n                        "marca" : "Toyota",\n                        "modelo" : "Corolla XEi 1.8/1.8 Flex 16V Mec.",\n                        "valor" : "13832",\n                        "dataRefFipe" : null,\n                        "valorZeroKM" : null,\n                        "graphMes1" : null,\n                        "graphMes2" : null,\n                        "graphMes3" : null,\n                        "graphMes4" : null,\n                        "graphMes5" : null,\n                        "graphMes6" : null,\n                        "graphMes7" : null,\n                        "graphMes8" : null,\n                        "graphMes9" : null,\n                        "graphMes10" : null,\n                        "graphMes11" : null,\n                        "graphMes12" : null,\n                        "graphValor1" : null,\n                        "graphValor2" : null,\n                        "graphValor3" : null,\n                        "graphValor4" : null,\n                        "graphValor5" : null,\n                        "graphValor6" : null,\n                        "graphValor7" : null,\n                        "graphValor8" : null,\n                        "graphValor9" : null,\n                        "graphValor10" : null,\n                        "graphValor11" : null,\n                        "graphValor12" : null,\n                        "_id" : "5d710cbdb574f4001f582d9c"\n                    }\n                ]\n            },\n            "recall" : {\n                "chassi" : "0DD2928DHD28D2H8D2H8",\n                "marca" : "TOYOTA",\n                "modelo" : "COROLLA XEI",\n                "anoModelo" : "1999",\n                "descricaoRetorno" : "Veiculo encontrado sem Recall",\n                "detalhes" : []\n            },\n            "analiseRisco" : {\n                "parecer" : "Veículo com baixo risco de recusa em comercialização/seguro 😃",\n                "indiceRisco" : "1",\n                "imageLink" : null\n            },\n            "leilao" : {\n                "descricao" : "Não consta registro de leilão para o veículo informado",\n                "registros" : []\n            },\n            "localizadorAgregados" : [\n                {\n                    "_id" : "5d3705db8e5a2431fa4b1414",\n                    "observacao" : null,\n                    "parte" : "VEICULO FRENTE",\n                    "imagemUrl" : "HTTPS://IMAGENS.AUTOCORP.COM.BR/AGREGADOS/23072019/AD5187D2EBC04D4393C76717741D3BF523072019092717.JPG"\n                },\n                {\n                    "_id" : "5d3705db8e5a2431fa4b1415",\n                    "observacao" : null,\n                    "parte" : "VEICULO TRASEIRA",\n                    "imagemUrl" : "HTTPS://IMAGENS.AUTOCORP.COM.BR/AGREGADOS/23072019/9E55D0E373474AB29708BB6C940CB08A23072019092717.JPG"\n                },\n                {\n                    "_id" : "5d3705db8e5a2431fa4b1416",\n                    "observacao" : null,\n                    "parte" : "MORFOLOGIA NR CHASSI 1",\n                    "imagemUrl" : "HTTPS://IMAGENS.AUTOCORP.COM.BR/AGREGADOS/23072019/344436E72FF0452997893765CDBED94023072019092717.JPG"\n                },\n                {\n                    "_id" : "5d3705db8e5a2431fa4b1417",\n                    "observacao" : "PAINEL CORTA-FOGO (LADO DIREITO)",\n                    "parte" : "INDICACAO NR CHASSI 1",\n                    "imagemUrl" : "HTTPS://IMAGENS.AUTOCORP.COM.BR/AGREGADOS/23072019/F74925469FE3453BAE6DA0DD6B1C2CC523072019092717.JPG"\n                },\n                {\n                    "_id" : "5d3705db8e5a2431fa4b1418",\n                    "observacao" : null,\n                    "parte" : "MORFOLOGIA NR MOTOR",\n                    "imagemUrl" : "HTTPS://IMAGENS.AUTOCORP.COM.BR/AGREGADOS/23072019/1F67B84C7AC145E1A5CD668DF9E7133E23072019092717.JPG"\n                },\n                {\n                    "_id" : "5d3705db8e5a2431fa4b1419",\n                    "observacao" : "LATERAL ESQUERDA, FINAL DO BLOCO",\n                    "parte" : "INDICACAO NR MOTOR",\n                    "imagemUrl" : "HTTPS://IMAGENS.AUTOCORP.COM.BR/AGREGADOS/23072019/602B4234D1974AB49A1592E8F3D2CB2D23072019092717.JPG"\n                },\n                {\n                    "_id" : "5d3705db8e5a2431fa4b141a",\n                    "observacao" : null,\n                    "parte" : "ETIQUETAS DESTRUTIVEIS",\n                    "imagemUrl" : "HTTPS://IMAGENS.AUTOCORP.COM.BR/AGREGADOS/23072019/ECEF2563848F4331BA3927BC3EB5D5EE23072019092717.JPG"\n                },\n                {\n                    "_id" : "5d3705db8e5a2431fa4b141b",\n                    "observacao" : null,\n                    "parte" : "MORFOLOGIA GRAVACAO VIDROS",\n                    "imagemUrl" : "HTTPS://IMAGENS.AUTOCORP.COM.BR/AGREGADOS/23072019/E3D35E936EFA47D090ECA531B2B6E39223072019092717.JPG"\n                }\n            ],\n            "di" : null,\n            "dtAtualizacao" : "04/04/2018 09:40:53",\n            "codigoMunicipio" : "7107"\n        }\n    }\n}',
            type: "json",
          },
        ],
      },
      filename: "integration/vehicular/apidoc_veiculoCompletoQuery.js",
      groupTitle: "Consultas_Veiculares",
    },
    {
      type: "post",
      url: "/api/vehicle/:userid",
      title: "Consultar Decodificador + Precificador",
      version: "5.27.1",
      name: "decodificadorPrecificadorQuery",
      group: "Consultas_Veiculares",
      header: {
        fields: {
          Header: [
            {
              group: "Header",
              type: "String",
              optional: false,
              field: "Authorization",
              description:
                "<p>Token de acesso retornado após autenticação.</p>",
            },
          ],
        },
      },
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "userid",
              description: "<p>ID do usuário</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "querycode",
              description:
                "<p>Código da consulta. (Código = 13 para consulta do Decodificador + Precificador)</p>",
            },
            {
              group: "Parameter",
              type: "Object",
              optional: false,
              field: "keys",
              description: "<p>Chaves para realização da consulta</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "keys.chassi",
              description:
                "<p>O chassi para realização da consulta de Decodificador + Precificador</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "keys.placa",
              description:
                "<p>A placa para realização da consulta de Decodificador + Precificador</p>",
            },
          ],
        },
        examples: [
          {
            title: "Request-Example:",
            content:
              '{\n  "querycode":13,\n  "keys" : {\n\t"chassi" : "0DD2928DHD28D2H8D2H8",\n\t"placa" : "XDF0000"\n  }\n}',
            type: "json",
          },
        ],
      },
      description:
        "<p>O parametro USER_ID deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br><b>EX: /api/vehicle/&lt;USER_ID&gt;</b></p>",
      success: {
        examples: [
          {
            title: "Success-Response:",
            content:
              'HTTP/1.1 200 OK\n{\n\t"status": {\n\t\t"cod": 200,\n\t\t"msg": "ok"\n\t},\n\t"body": {\n\t\t"headerInfos": {\n\t\t\t"queryid": "5b3a323nfn2330feannac978676f0f7",\n\t\t\t"name": "Decodificador e Precificador",\n\t\t\t"date": "2019-12-11T17:25:55.255Z",\n\t\t\t"keys": {\n\t\t\t\t"chassi": "0DD2928DHD28D2H8D2H8",\n\t\t\t\t"placa": "XDF0000"\n\t\t\t}\n\t\t},\n\t\t"data": {\n\t\t\t"__v": 1,\n\t\t\t"decodificadorPrecificador": {\n\t\t\t\t"precificadorI": [\n\t\t\t\t\t{\n\t\t\t\t\t\t"_id": "5b3a323nfn2330feannac978676f0f7",\n\t\t\t\t\t\t"valor": "24236",\n\t\t\t\t\t\t"modelo": "Palio Weekend Trekking 1.4 Fire Flex 8V",\n\t\t\t\t\t\t"marca": "Fiat",\n\t\t\t\t\t\t"combustivel": "G",\n\t\t\t\t\t\t"codigo": "0xx02xxxx5-4"\n\t\t\t\t\t}\n\t\t\t\t],\n\t\t\t\t"tipoCarroceria": "SW",\n\t\t\t\t"regiao": "BRASIL / PARAGUAI / COLOMBIA / URUGUAI",\n\t\t\t\t"pais": "BRASIL",\n\t\t\t\t"modelo": "PALIO WEEK TREKKING",\n\t\t\t\t"marca": "FIAT",\n\t\t\t\t"localFabricacao": "BETIM"\n\t\t\t},\n\t\t\t"tipoVeiculo": null,\n\t\t\t"numMotor": "0DD2D2H8D2H8*0DD2928DHD8D2H8*",\n\t\t\t"renavam": null,\n\t\t\t"placa": "XXX0000",\n\t\t\t"chassi": "0DD2928DHD28D2H8D2H8"\n\t\t}\n\t}\n}',
            type: "json",
          },
        ],
      },
      filename: "integration/vehicular/apidoc_decodificadorPacificadorQuery.js",
      groupTitle: "Consultas_Veiculares",
    },
    {
      type: "post",
      url: "/api/service/",
      title: "Reconsultar serviços que falharam",
      version: "5.27.1",
      name: "Query",
      group: "Gerenciar_Consultas",
      header: {
        fields: {
          Header: [
            {
              group: "Header",
              type: "String",
              optional: false,
              field: "Authorization",
              description:
                "<ul> <li>Token de acesso retornado após autenticação.</li> </ul>",
            },
          ],
        },
      },
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "queryid",
              description: "<ul> <li>Id da consulta</li> </ul>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "serviceLog",
              description:
                "<ul> <li>Id do log de serviço que é retornado quando uma consulta é realizada</li> </ul>",
            },
          ],
        },
        examples: [
          {
            title: "Request-Example:",
            content:
              '{\n "queryid": "ID_DA_CONSULTA_AQUI",\n "serviceLog": "ID_DO_LOG_DE_SERVICO_AQUI"\n}',
            type: "json",
          },
        ],
      },
      description:
        "<p>ATENÇÃO: Só é possível reconsultar insumos que falharam 2 vezes em intervalos de 15 minutos para evitar sobrecarga nas APIs durante a execução da reconsulta. Este caso de uso se faz valer apenas em casos onde a indisponibilidade do insumo persista após as tentativas de execução subsequentes às duas primeiras tentativas que falharem.</p>",
      success: {
        examples: [
          {
            title: "Success-Response:",
            content:
              'HTTP/1.1 200 OK\n {\n\t"status": {\n\t\t"cod": 200,\n\t\t"msg": "ok"\n\t},\n\t"body": {\n\t\t"headerInfos": {\n\t\t\t"queryid": "5b3a323nfn2330feannac978676f0f7",\n\t\t\t"name": "Agregados",\n\t\t\t"date": "2019-12-11T14:13:07.428Z",\n\t\t\t"keys": {\n\t\t\t\t"placa": "XXX0000"\n\t\t\t}\n\t\t},\n\t\t"data": {\n            "cmt": null,\n            "pbt": null,\n            "restricoes": null,\n            "ocorrencia": null,\n            "municipioEmplacamento": null,\n            "capacidadePassageiro": "5",\n            "procedencia": "42913856",\n            "categoria": null,\n            "ufFaturado": "MG",\n            "tipoDocFaturado": "Jurídica",\n            "docFaturado": "",\n            "tipoDocProprietario": "Jurídica",\n            "docProprietario": null,\n            "situacaoVeiculo": "S",\n            "pesoBrutoTotal": ",00",\n            "capMaxTracao": "240,00",\n            "cilindradas": "1000",\n            "limiteRestricaoTrib": null,\n            "dtUltimaAtualizacao": "12/06/2007 00:00:00",\n            "unidadeLocalSRF": "0",\n            "registroDi": null,\n            "di": null,\n            "identImportadora": "",\n            "tipoDocImportadora": "0",\n            "tipoMontagem": "1",\n            "eixos": "0",\n            "situacaoChassi": "N",\n            "qtdPax": null,\n            "corVeiculo": "Prata",\n            "tipoCarroceria": "NAO APLICAVEL",\n            "especieVeiculo": "Passageiro",\n            "tipoVeiculo": "Automovel",\n            "numTerceiroEixo": "",\n            "numMotor": "178F1011*6091857*",\n            "eixoTraseiroDif": "",\n            "caixaCambio": "",\n            "numCarroceria": "76624782",\n            "linha": null,\n            "nacionalidade": "Nacional",\n            "capacidadeCarga": ",00",\n            "potencia": "65",\n            "combustivel": "Gasolina",\n            "codigoCombustivel": "2",\n            "marcaModelo": "FIAT/SIENA FIRE",\n            "codigoMarcaModelo": "153006",\n            "municipio": "SANTA RITA DO SAPUCAI",\n            "codigoMunicipio": "5191",\n            "anoModelo": "2005",\n            "anoFabricacao": "2004",\n            "numFaturado": null,\n            "dtAtualizacao": "09/02/2017 13:35:48",\n            "codigoFipe": null,\n            "ultimaDataInclusao": "09/02/2017 13:35:48",\n            "cidade": null,\n            "uf": "MG",\n            "renavam": "",\n            "placa": "XXX0000",\n\t\t\t"chassi": "0DD2928DHD28D2H8D2H8"\n\t\t},\n\t}\n}',
            type: "json",
          },
          {
            title: "Success-Response:",
            content:
              'HTTP/1.1 200 OK\n {\n    "status": {\n        "cod": 200,\n        "msg": "ok"\n    },\n        "body": {\n        "error": "Você atingiu o limite de reconsultas, tente reprocessar a consulta novamente em 15 minutos. Obrigado!"\n    }\n }',
            type: "json",
          },
        ],
      },
      error: {
        examples: [
          {
            title: "Error-Response",
            content:
              'HTTP/1.1 410 GONE\n    {\n        "status": {\n            "cod": 410,\n            "msg": "bad request"\n        },\n        "body": {\n            "error": "Ops... Falhou! Desculpe-nos, mas nosso fornecedor primário esta temporariamente indisponível... Retorne em alguns instantes..."\n        }\n    }',
            type: "json",
          },
        ],
      },
      filename: "integration/query/apíDoc_reQueryServicesThatFailed.js",
      groupTitle: "Gerenciar_Consultas",
    },
  ],
});
