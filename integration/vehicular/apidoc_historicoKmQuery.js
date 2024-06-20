/**
* @api {post} /api/vehicle/:userid Consultar Histórico de KM
* @apiVersion 5.27.1
* @apiName HistoricoKmQuery
* @apiGroup Consultas Veiculares
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.

* @apiParam {String} userid ID do usuário
* @apiParam {String} querycode Código da consulta. (Código = 8 para consulta de Histórico de KM)
* @apiParam {Object} keys Chaves para realização da consulta
* @apiParam {String} keys.placa A placa para realização da consulta de Histórico de KM
* @apiParam {String} keys.chassi O chassi para realização da consulta de Histórico de KM
* @apiParam {String} keys.renavam O renavam para realização da consulta de Histórico de KM
* @apiParam {String} keys.motor O motor para realização da consulta de Histórico de KM

* @apiDescription O parametro USER_ID deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br><b>EX: /api/vehicle/<USER_ID></b>

* @apiParamExample {json} Request-Example:
{
  "querycode":8,
  "keys" : {
    "placa" : "XXX0000"
  }
}

* @apiParamExample {json} Request-Example:
{
  "querycode":8,
  "keys" : {
    "chassi" : "0DD2928DHD28D2H8D2H8"
  }
}

* @apiParamExample {json} Request-Example:
{
  "querycode":8,
  "keys" : {
    "renavam" : "0000000000000000"
  }
}

* @apiParamExample {json} Request-Example:
{
  "querycode":8,
  "keys" : {
    "motor" : "0DD2928DHD28D2H8D2H8"
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
			"name": "Historico de KM",
			"date": "2019-12-11T18:16:03.299Z",
			"keys": {
				"placa": "XXX0000"
			}
		},
		"data": {
			"__v": 1,
			"historicoKm": [
				{
                    "_id": "5df132663130b10c54346448",
                    "km": "38000",
                    "dataInclusao": "25/07/2015 12:39:31"
                },
                {
                    "_id": "5df132663130b10c54346447",
                    "km": "93000",
                    "dataInclusao": "07/08/2013 13:19:23"
                },
                {
                    "_id": "5df132663130b10c54346446",
                    "km": "92000",
                    "dataInclusao": "17/08/2016 09:23:49"
                },
                {
                    "_id": "5df132663130b10c54346445",
                    "km": "25000",
                    "dataInclusao": "23/07/2016 20:53:08"
                }
			]
		}
	}
}
*/
