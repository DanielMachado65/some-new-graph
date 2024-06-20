/**
* @api {post} /api/vehicle/:userid Consultar Indício de Sinistro
* @apiVersion 5.27.1
* @apiName IndicioSinistroQuery
* @apiGroup Consultas Veiculares
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.

* @apiParam {String} userid ID do usuário
* @apiParam {String} querycode Código da consulta. (Código = 21 para consulta de Indício de Sinistro)
* @apiParam {Object} keys Chaves para realização da consulta
* @apiParam {String} keys.placa O placa para realização da consulta de Indício de Sinistro
* @apiParam {String} keys.chassi O chassi para realização da consulta de Indício de Sinistro


* @apiDescription O parametro USER_ID deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br><b>EX: /api/vehicle/<USER_ID></b>

* @apiParamExample {json} Request-Example:
{
  "querycode":21,
  "keys" : {
    "placa" : "XXX0000"
  }
}

* @apiParamExample {json} Request-Example:
{
  "querycode":21,
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
			"queryid": "5b3a323nfn2330feannac978676f0f7",
			"name": "Indício de Sinistro",
			"date": "05/07/2018 09:54:51",
			"keys": {
				"placa": "XXX0000"
			}
		},
		"data": {
			"__v": 2,
			"indicioSinistro": {
				"classificacao": null,
				"descricao": "NÃO CONSTA INDÍCIO DE SINISTRO PARA O VEÍCULO INFORMADO 😃"
			},
			"renavam": "767575xxx6757",
			"placa": "XXX0000",
			"chassi": "0DD2928DHD28D2H8D2H8"
		}
	}
}
*/
