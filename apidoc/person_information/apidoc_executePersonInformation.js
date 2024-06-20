/**
* @api {post} /api/person/:userid Consultar Pessoa Física e Pessoa Jurídica
* @apiVersion 5.27.1
* @apiName PersonInformationQuery
* @apiGroup Consultas PF/PJ
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.

* @apiParam {String} userid ID do usuário
* @apiParam {String} querycode Código da consulta a ser realizada. Os códigos de consultas disponíveis podem ser encontrados na requisição (#Consultas:GetEnablesQueries).
* @apiParam {Object} keys Chaves para realização da consulta
* @apiParam {String} keys.cpf O CPF para realização da consulta de pessoa física
* @apiParam {String} keys.cnpj O CPNJ para realização da consulta de pessoa jurídica

* @apiDescription O parâmetro USER_ID deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX: /api/person/<USER_ID></b>

* @apiParamExample {json} Request-Example:
{
  "querycode":1,
  "keys" : {
    "cpf" : "000000000000"
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
      "queryid": "XXXXXXXX",
      "name": "Agregados",
      "date": "2018-03-14T17:34:53.598Z"
},
"data":{
      "createAt" : "2018-03-22T15:18:11.676Z",
      "status" : true,
      "documento" : "123456",
      "dadosCadastrais" : {
            "nome" : "FULANDO DA SILVA SAURO",
            "documento" : "28912461109",
            "documentoOrigem" : "MINAS GERAIS",
            "situacaoCpf" : "REGULAR",
            "dataSituacaoCpf" : "16/03/2018",
            "dataNascimento" : "05/03/1992",
            "rg" : "-",
            "signo" : "PEIXES",
            "idade" : "26",
            "sexo" : "MASCULINO",
            "endLogradouro" : "CAMILO SOARES 1000",
            "endNum" : "-",
            "endCep" : "52130000",
            "endBairro" : "CENTRO",
            "endCidade" : "TERRA DO NUNCA",
            "endEstado" : "-",
            "telDdd" : "-",
            "telNum" : "-",
            "nomeMae" : "NOME DA MAE DO FULANDO",
            "nomePai" : "-",
            "tituloEleitor" : "-",
            "estadoCivil" : "-",
            "email" : "-",
            "situacaoCnpj" : null,
            "dataSituacaoCnpj" : null,
            "razaoSocial" : null,
            "nomeFantasia" : null,
            "dataFundacao" : null,
            "codigoCnae" : null,
            "descricaoCnae" : null,
            "codigoNaturezaJuridica" : null
      },
      "baseNegativacao" : null,
      "endCepConsultado" : null,
      "telefoneConsultado" : {
            "quantidade" : 0
      },
      "ultimoTelefoneInformado" : null,
      "featuresOpcionais" : {
            "representanteLegal" : null,
            "qsa" : null,
            "faturamentoPresumido" : null,
            "rendaPresumida" : {
                  "retorno" : "NENHUM REGISTRO ENCONTRADO",
                  "codigo" : 2
            },
            "locEndTel" : null,
            "email" : null
      },
      "telefoneVinculado" : null,
      "ultimoEnderecoInformado" : null,
      "pendenciaSpc" : {
            "quantidade" : 0,
            "dataUltimaOcorrencia" : null,
            "valorTotal" : null,
            "detalhes" : []
      },
      "ccf" : {
            "quantidade" : 0,
            "dataUltimaOcorrencia" : null,
            "detalhes" : []
      },
      "consultaRealizada" : {
            "quantidade" : 6,
            "quantidadeDiasConsultado" : 90,
            "registros" : [
                  {
                        "nomeAssociado" : "FINARTE PECAS ESPECIAIS",
                        "cidadeAssociado" : "FORQUILHINHA",
                        "ufAssociado" : "SC",
                        "dataConsulta" : "20/03/2018",
                        "entidadeOrigem" : "CDL - RECIFE / PE",
                        "_id" : "XXXXXXXXXXXXXXXXXXXX5"
                  },
                  {
                        "nomeAssociado" : "ABC AUTOMOTIVO",
                        "cidadeAssociado" : "GOIANIA",
                        "ufAssociado" : "GO",
                        "dataConsulta" : "20/03/2018",
                        "entidadeOrigem" : "CDL - RECIFE / PE",
                        "_id" : "XXXXXXXXXXXXXXXXXXXX6"
                  },
                  {
                        "nomeAssociado" : "REAL CRED",
                        "cidadeAssociado" : "EUNAPOLIS",
                        "ufAssociado" : "BA",
                        "dataConsulta" : "20/03/2018",
                        "entidadeOrigem" : "CDL - RECIFE / PE",
                        "_id" : "XXXXXXXXXXXXXXXXXXXX7"
                  },
                  {
                        "nomeAssociado" : "E C P - CONTABILIDADE, LOGIC@ E PROCESSAMENTO",
                        "cidadeAssociado" : "PINDORAMA",
                        "ufAssociado" : "SP",
                        "dataConsulta" : "19/03/2018",
                        "entidadeOrigem" : "CDL - RECIFE / PE",
                        "_id" : "XXXXXXXXXXXXXXXXXXXX8"
                  },
                  {
                        "nomeAssociado" : "AGRONORTE PRODUTOS AGROPECUARIA",
                        "cidadeAssociado" : "NOVO REPARTIMENTO",
                        "ufAssociado" : "PA",
                        "dataConsulta" : "16/03/2018",
                        "entidadeOrigem" : "CDL - RECIFE / PE",
                        "_id" : "XXXXXXXXXXXXXXXXXXXX9"
                  },
                  {
                        "nomeAssociado" : "BEACH NET INFORMATICA",
                        "cidadeAssociado" : "ITANHAEM",
                        "ufAssociado" : "SP",
                        "dataConsulta" : "22/03/2018",
                        "entidadeOrigem" : "CDL - RECIFE / PE",
                        "_id" : "XXXXXXXXXXXXXXXXXXXXa"
                  },
                  {
                        "nomeAssociado" : "FINARTE PECAS ESPECIAIS",
                        "cidadeAssociado" : "FORQUILHINHA",
                        "ufAssociado" : "SC",
                        "dataConsulta" : "20/03/2018",
                        "entidadeOrigem" : "CDL - RECIFE / PE",
                        "_id" : "XXXXXXXXXXXXXXXXXXXXb"
                  },
                  {
                        "nomeAssociado" : "ABC AUTOMOTIVO",
                        "cidadeAssociado" : "GOIANIA",
                        "ufAssociado" : "GO",
                        "dataConsulta" : "20/03/2018",
                        "entidadeOrigem" : "CDL - RECIFE / PE",
                        "_id" : "XXXXXXXXXXXXXXXXXXXXc"
                  },
                  {
                        "nomeAssociado" : "REAL CRED",
                        "cidadeAssociado" : "EUNAPOLIS",
                        "ufAssociado" : "BA",
                        "dataConsulta" : "20/03/2018",
                        "entidadeOrigem" : "CDL - RECIFE / PE",
                        "_id" : "XXXXXXXXXXXXXXXXXXXXd"
                  },
                  {
                        "nomeAssociado" : "E C P - CONTABILIDADE, LOGIC@ E PROCESSAMENTO",
                        "cidadeAssociado" : "PINDORAMA",
                        "ufAssociado" : "SP",
                        "dataConsulta" : "19/03/2018",
                        "entidadeOrigem" : "CDL - RECIFE / PE",
                        "_id" : "XXXXXXXXXXXXXXXXXXXXe"
                  },
                  {
                        "nomeAssociado" : "AGRONORTE PRODUTOS AGROPECUARIA",
                        "cidadeAssociado" : "NOVO REPARTIMENTO",
                        "ufAssociado" : "PA",
                        "dataConsulta" : "16/03/2018",
                        "entidadeOrigem" : "CDL - RECIFE / PE",
                        "_id" : "XXXXXXXXXXXXXXXXXXXXf"
                  }
            ]
      },
      "pefin" : {
            "quantidade" : 0,
            "dataUltimaOcorrencia" : null,
            "valorTotal" : null,
            "detalhe" : {
                  "moeda" : null,
                  "cidade" : null,
                  "uf" : null,
                  "avalista" : null,
                  "contrato" : null,
                  "dataOcorrencia" : null,
                  "origem" : null,
                  "tituloOcorrencia" : "teste",
                  "valorPendencia" : "10"
            }
      },
      "protesto" : {
            "quantidade" : 0,
            "dataPrimeiraOcorrencia" : null,
            "dataUltimaOcorrencia" : null,
            "valorTotal" : null,
            "detalhes" : []
      },
      "pefinBvs" : {
            "dadosConsulta" : {
                  "documento" : "0000000000000000",
                  "tipoConsulta" : "Pefin BVS",
                  "dataConsulta" : "22/03/2018",
                  "horaConsulta" : "12:33"
            },
            "dadosCadastrais" : {
                  "nome" : "FULANO DE SOUZA SILVA",
                  "documento" : "000000000000000",
                  "dataNascimento" : null,
                  "nomeMae" : "NOME DA MAE DO FULANDO"
            },
            "detalhes" : [],
            "restricao" : "NADA CONSTA"
      },
      "restricaoTotal" : {
            "grafiaPj" : {
                  "registros" : []
            },
            "contraOrdem" : {
                  "quantidade" : 0
            },
            "contumacia" : {
                  "quantidade" : 0
            },
            "dadosAgenciaBancaria" : null,
            "chequeConsultaOnlineSrs" : {
                  "quantidade" : 0
            }
      },
      "_id" : "XXXXXXXXXXXXXXXXXXXX7"
 }
},
  "billing": {
        "err": null,
        "success": true,
        "cost": 1.99
        },
  "servicesBroken": [],
 }
}
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
{
  "status": {
    "cod": 200,
    "msg": "ok"
  },
  "body": {
    "headerInfos": {
    "queryid": "XXXXXXXX",
    "name": "Restricao Total",
    "date": "2018-03-14T17:40:01.712Z"
  },
  "data": {
    "msg": "Nenhum registro encontrado para a consulta realizada."
  },
  "billing": {
    "err": null,
    "success": true,
    "cost": 4.99
  },
  "servicesBroken": [],
  }
}

* @apiDescription <br> Quando um dos serviços que compõe a consulta falhar, o retorno trará um nó chamado servicesBroken o qual
será um array que armazenará informações relevantes sobre o serviço que falhou para aquela consulta. As informações contidas nesse array, serão úteis para
a realização do reprocessamento do serviço para a consulta. O reprocessamento deverá acontecer de forma assíncrona, sem que seja percebido pelo usuário.
A navegação do usuário não deve ser impactada. A reconsulta só será possível para consultas que são compostar por 2 ou mais serviços.

<br> Para o nó "servicesBroken", os parâmetros de retorno são:<br>
<pre>
{
  "servicesBroken": [
  {
    "_id": "XXXXXXXX",
    "lastTry": null,
    "requeryTries": 2,
    "supplierCode": 40,
    "serviceName": "Restricao Total",
    "serviceCode": 7,
    "serviceLog": "XXXXXXXX"
  }
}
</pre>
Onde: <br>
* lastTry é do tipo Date e representa a ultima tentativa realizada pelo usuário.<br>
* requeryTries é do tipo Number e corresponde ao número de tentativas que o usuário poderá utilizar consecutivamente.<br>
* supplierCode trata-se do código do fornecedor (ESTA INFORMAÇÃO NÃO PODERÁ SER DIVULGADA PARA O CLIENTE) <br>
* serviceName trata-se do nome do serviço que falhou para determinada consulta. <br>
* serviceCode trata-se do código referente ao serviço que falhou (ESTA INFORMAÇÃO NÃO PODERÁ SER DIVULGADA PARA O CLIENTE) <br>
* serviceLog ID do log de serviço o qual contem as informações básicas para reconsulta. <br>

* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
{
  "status": {
  "cod": 200,
  "msg": "ok"
},
"body": {
  "headerInfos": {
  "queryid": "XXXXXXXX",
  "name": "Restricao Total",
  "date": "2018-03-14T17:45:56.684Z"
},
"data": {
  "msg": "Nenhum registro encontrado para a consulta realizada."
},
"billing": {
  "err": null,
  "success": true,
  "cost": 0.6
},
"servicesBroken": [
    {
      "_id": "XXXXXXXX",
      "lastTry": null,
      "requeryTries": 2,
      "supplierCode": 20,
      "serviceName": "Restricao Total",
      "serviceCode": 7,
      "serviceLog": "XXXXXXXX"
    }
  ],
}
}

* @apiSuccessExample Success-Response:
* HTTP/1.1 206 PARTIAL CONTENT
{
  "status": {
    "cod": 206,
    "msg": "partial content"
  },
  "body": {
    "headerInfos": {
      "queryid": "XXXXXXXX",
      "name": "Agregados",
      "date": "2018-03-14T17:33:35.652Z"
    },
    "duplicity_checking": "A consulta referida de Agregados, foi executada recentemente. Caso queira prosseguir, será cobrado o valor integral da mesma, sendo considerada uma nova consulta. Deseja prosseguir?"
  }
}
*/
