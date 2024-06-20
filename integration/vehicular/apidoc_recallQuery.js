/**
* @api {post} /api/vehicle/:userid Consultar Recall
* @apiVersion 5.27.1
* @apiName RecallQuery
* @apiGroup Consultas Veiculares
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.

* @apiParam {String} userid ID do usuário
* @apiParam {String} querycode Código da consulta. (Código = 14 para consulta do Recall)
* @apiParam {Object} keys Chaves para realização da consulta
* @apiParam {String} keys.chassi O chassi para realização da consulta de Recall


* @apiDescription O parametro USER_ID deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br><b>EX: /api/vehicle/<USER_ID></b>

* @apiParamExample {json} Request-Example:
{
  "querycode":14,
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
			"name": "Recall",
			"date": "03/07/2018 11:43:47",
			"keys": {
				"chassi": "0DD2928DHD28D2H8D2H8"
			}
		},
		"data": {
			"__v": 0,
			"recall": {
				"chassi": "0DD2928DHD28D2H8D2H8",
				"NuCdRetorno": "1x09",
				"DsRetorno": "Veiculo encontrado sem Recall",
				"DsModelo": "CORSA WIND",
				"DsMarca": "GM",
				"DsAnoModelo": "2001",
				"Detalhes": null
			}
		}
	}
}
*/
