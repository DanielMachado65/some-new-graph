/**
* @api {post} /api/vehicle/:userid Consultar Renajud
* @apiVersion 5.27.1
* @apiName RenajudQuery
* @apiGroup Consultas Veiculares
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.

* @apiParam {String} userid ID do usuário
* @apiParam {String} querycode Código da consulta. (Código = 5 para consulta de Renajud)
* @apiParam {Object} keys Chaves para realização da consulta
* @apiParam {String} keys.placa A placa para realização da consulta de Renajud

* @apiDescription O parametro USER_ID deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br><b>EX: /api/vehicle/<USER_ID></b>

* @apiParamExample {json} Request-Example:
{
  "querycode":5,
  "keys" : {
    "placa" : "XXX0000"
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
			"name": "Renajud",
			"date": "02/07/2018 16:23:03",
			"keys": {
				"placa": "XXX0000"
			}
		},
		"data": {
			"__v": 1,
			"renajud": {
				"processo": "",
				"tribunal": "",
				"restricoes": "",
				"orgaoJudicial": "",
				"detalheRenajud": "VEICULO NAO POSSUI RESTRICAO",
				"codigoOrgaoJudicial": null,
                "codigoTribunal": null,
			},
			"placa": "XXX0000",
			"chassi": "0DD2928DHD28D2H8D2H8"
		}
	}
}
*/
