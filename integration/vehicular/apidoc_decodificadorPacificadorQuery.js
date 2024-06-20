/**
* @api {post} /api/vehicle/:userid Consultar Decodificador + Precificador
* @apiVersion 5.27.1
* @apiName decodificadorPrecificadorQuery
* @apiGroup Consultas Veiculares
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.

* @apiParam {String} userid ID do usuário
* @apiParam {String} querycode Código da consulta. (Código = 13 para consulta do Decodificador + Precificador)
* @apiParam {Object} keys Chaves para realização da consulta
* @apiParam {String} keys.chassi O chassi para realização da consulta de Decodificador + Precificador
* @apiParam {String} keys.placa A placa para realização da consulta de Decodificador + Precificador

* @apiDescription O parametro USER_ID deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br><b>EX: /api/vehicle/<USER_ID></b>

* @apiParamExample {json} Request-Example:
{
  "querycode":13,
  "keys" : {
	"chassi" : "0DD2928DHD28D2H8D2H8",
	"placa" : "XDF0000"
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
			"name": "Decodificador e Precificador",
			"date": "2019-12-11T17:25:55.255Z",
			"keys": {
				"chassi": "0DD2928DHD28D2H8D2H8",
				"placa": "XDF0000"
			}
		},
		"data": {
			"__v": 1,
			"decodificadorPrecificador": {
				"precificadorI": [
					{
						"_id": "5b3a323nfn2330feannac978676f0f7",
						"valor": "24236",
						"modelo": "Palio Weekend Trekking 1.4 Fire Flex 8V",
						"marca": "Fiat",
						"combustivel": "G",
						"codigo": "0xx02xxxx5-4"
					}
				],
				"tipoCarroceria": "SW",
				"regiao": "BRASIL / PARAGUAI / COLOMBIA / URUGUAI",
				"pais": "BRASIL",
				"modelo": "PALIO WEEK TREKKING",
				"marca": "FIAT",
				"localFabricacao": "BETIM"
			},
			"tipoVeiculo": null,
			"numMotor": "0DD2D2H8D2H8*0DD2928DHD8D2H8*",
			"renavam": null,
			"placa": "XXX0000",
			"chassi": "0DD2928DHD28D2H8D2H8"
		}
	}
}
*/
