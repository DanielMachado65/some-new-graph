/**
* @api {get} /api/package/all Buscar Todos os Pacotes
* @apiVersion 5.27.1
* @apiName GetPackages
* @apiGroup Pacotes

* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
{
  "status": {
    "cod": 200,
    "msg": "ok"
  },
  "body": [
    {
      "_id": "XXXXXXXXXXXXXXXba3",
      "name": "Pacote 150",
      "__v": 0,
      "discountPercent": 15,
      "attributedValue": 172.5,
      "purchasePrice": 150,
      "createAt": "2018-03-30T22:42:32.369Z",
      "status": true
    },
    {
      "_id": "XXXXXXXXXXXXXXXXX4",
      "name": "Pacote 300",
      "__v": 0,
      "discountPercent": 15,
      "attributedValue": 345,
      "purchasePrice": 300,
      "createAt": "2018-03-30T22:43:26.992Z",
      "status": true
    },
    {
      "_id": "XXXXXXXXXXXXXXXXXXX5",
      "name": "Pacote 500",
      "__v": 0,
      "discountPercent": 15,
      "attributedValue": 575,
      "purchasePrice": 500,
      "createAt": "2018-03-30T22:43:48.723Z",
      "status": true
    },
    {
      "_id": "XXXXXXXXXXXXXXXXXXXX6",
      "name": "Pacote 1000",
      "__v": 0,
      "discountPercent": 15,
      "attributedValue": 1150,
      "purchasePrice": 1000,
      "createAt": "2018-03-30T22:44:03.583Z",
      "status": true
    }
  ]
}
*
*/
