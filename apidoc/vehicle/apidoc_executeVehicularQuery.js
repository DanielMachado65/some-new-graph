/**
* @api {post} /api/vehicle/:userid Consultar veículo
* @apiVersion 5.27.1
* @apiName VehicularQuery
* @apiGroup Consultas Veiculares
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.

* @apiParam {String} userid ID do usuário
* @apiParam {String} querycode Código da consulta a ser realziada. Os códigos de consultas disponíveis podem ser encontrados na requisição <a href="https://api.olhonocarro.com.br/doc#api-Consultas-GetEnablesQueries">Buscar consultas disponiveis</a>.
* @apiParam {Object} keys Chaves para realização da consulta
* @apiParam {String} keys.placa Placa do veículo a ser consultado
* @apiParam {String} keys.chassi Chassi do veículo a ser consultado
* @apiParam {String} keys.ranavam Renavam do veículo a ser consultado
* @apiParam {String} keys.motor Número do Motor do veículo a ser consultado.

* @apiDescription O parâmetro USER_ID deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX: /api/vehicle/<USER_ID></b>
<br>
<br>
Esta é a requisição responsável por realizar a consultas veiculares na API. As consultas disponíveis podem ser visualizadas <a href="https://api.olhonocarro.com.br/doc#api-Consultas-GetEnablesQueries">clicando aqui.</a>
OBS: O exemplo de retorno abaixo é meramente ilustrativo, pois para cada consulta, o retorno terá suas caracteristicas específicas. Recomendamos que utilize as consultas disponíves para obtenção do código da consulta (querycode),
e que ao integrar consulta a consulta, se atente no retorno em JSON da API. É necessário validar com nossa equipe, a composição dos dados e como os mesmos serão exibidos para os clientes, consulta a consulta. A mesma premissa é valida
para as consultas cadastrais. <a href="https://api.olhonocarro.com.br/doc#api-Consultas_PF_PJ-PersonInformationQuery">(Consultas cadastrais)</a>
<br>
<br>A Consulta veicular é composta por um ou mais serviços (agregados, base estadual, base nacional, renajud, roubo e furto, etc...). Quando um dos serviços que compõe a consulta falhar, o retorno trará um nó chamado servicesBroken o qual
será um array que armazenará informações relevantes sobre o serviço que falhou para aquela consutla. As informações contidas nesse array, serão úteis para
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
    "supplierCode": 20,
    "serviceName": "Renajud",
    "serviceCode": 5,
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

* @apiParamExample {json} Request-Example:
{
  "querycode":1,
  "keys" : {
    "placa" : "ABC1234"
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
    "data": {
      "codigoMunicipio": "7107",
      "dtAtualizacao": "2013-03-28T03:00:00.000Z",
      "__v": 0,
      "situacaoVeiculo": "S",
      "pesoBrutoTotal": "177",
      "capMaxTracao": "237",
      "cilindradas": "XXXXXXXX",
      "limiteRestricaoTrib": null,
      "restricao4": "SEM RESTRICAO",
      "restricao3": "SEM RESTRICAO",
      "restricao2": "SEM RESTRICAO",
      "restricao1": "SEM RESTRICAO",
      "dtUltimaAtualizacao": "2012-03-15T03:00:00.000Z",
      "unidadeLocalSRF": "XXXXXXXX",
      "registroDi": null,
      "di": "1202708775",
      "identImportadora": null,
      "tipoDocImportadora": null,
      "tipoMontagem": "1",
      "eixos": "2",
      "situacaoChassi": "N",
      "qtdPax": "5",
      "corVeiculo": "Preta",
      "tipoCarroceria": "NAO APLICAVEL",
      "especieVeiculo": "Passageiro",
      "tipoVeiculo": "Automovel",
      "tipoDocProprietario": "Jurídica",
      "ufFaturado": "BA",
      "tipoDocFaturado": "Jurídica",
      "numTerceiroEixo": null,
      "numMotor": null,
      "eixoTraseiroDif": null,
      "caixaCambio": null,
      "numCarroceria": null,
      "linha": "XXXXXXXX",
      "nacionalidade": "Importado",
      "capacidadeCarga": "0",
      "potencia": "XXXXXXXX",
      "combustivel": "Álcool / Gasolina",
      "codigoCombustivel": "XXXXXXXX",
      "marcaModelo": "I/FORD FOCUS TI 2LHCFLEX",
      "codigoMarcaModelo": "XXXXXXXX",
      "municipio": "SAO PAULO",
      "anoModelo": "XXXXXXXX",
      "anoFabricacao": "XXXXXXXX",
      "numFaturado": "XXXXXXXX",
      "cidade": "SÃ£o Paulo",
      "uf": "SP",
      "renavam": "XXXXXXXX",
      "placa": "XXXXXXXX",
      "chassi": "XXXXXXXX"
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
      "name": "Agregados",
      "date": "2018-03-14T17:40:01.712Z"
    },
    "data": {
      "msg": "Nenhum registro encontrado para a consulta realizada."
    },
    "billing": {
      "err": null,
      "success": true,
      "cost": 1.99
    },
    "servicesBroken": [],
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
      "name": "Renajud",
      "date": "2018-03-14T17:45:56.684Z"
    },
    "data": {
      "msg": "Veículo não encontrado."
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
        "serviceName": "Renajud",
        "serviceCode": 5,
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
