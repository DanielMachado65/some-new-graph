/**
* @api {post} /api/vehicle/:userid Consultar Perda Total
* @apiVersion 5.27.1
* @apiName PerdaTotalQuery
* @apiGroup Consultas Veiculares
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.

* @apiParam {String} userid ID do usuário
* @apiParam {String} querycode Código da consulta. (Código = 10 para consultar Perda Total)
* @apiParam {Object} keys Chaves para realização da consulta
* @apiParam {String} keys.placa A placa para realização da consulta de Perda Total

* @apiDescription O parametro USER_ID deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br><b>EX: /api/vehicle/<USER_ID></b>

* @apiParamExample {json} Request-Example:
{
  "querycode":10,
  "keys" : {
    "placa" : "XXX0000"
  }
}

* @apiParamExample {json} Request-Example:
{
  "querycode":10,
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
			"name": "Perda Total",
			"date": "03/07/2018 11:25:48",
			"keys": {
				"placa": "XXX0000"
			}
		},
		"data": {
			"__v": 0,
			"perdaTotal": {
				"dataOcorrencia": "10/9/2003",
				"protocolo": "42xx8xx17",
				"descricao": null
			},
			"ocorrencia": null,
			"municipioEmplacamento": null,
			"renavam": 000000000000,
			"placa": "XXX0000",
			"chassi": null
		}
	}
}
*/
