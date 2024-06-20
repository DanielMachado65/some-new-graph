/**
* @api {post} /api/protected/voucher/ Voucher Usados
* @apiVersion 0.3.0
* @apiName GetVoucher
* @apiGroup Voucher
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.
*
* @apiParam {String} code Código do cupom
*
*@apiDescription Retorna os dados de todos os vouchers utilizados.
* <br> <b>EX:  /api/protected/voucher/ </b>
*
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
{
   "status": {
      "cod": 200,
      "msg": "ok"
   },
   "body": {
      "availables": 20349,
      "used": [
         {
            "_id": "xxxxxxxxxxxxxxxxxxxx994",
            "__v": 0,
            "dateOfUse": "2018-06-25T15:45:40.637Z",
            "creditsToApply": 42.9,
            "code": "0570069",
            "status": false,
            "createAt": "2018-05-24T13:18:54.160Z",
            "user": "xxxxxxxxxxxxxxxxxxxx"
         },
         {
            "_id": "xxxxxxxxxxxxxxxxxxxx99a",
            "__v": 0,
            "dateOfUse": "2018-06-26T09:55:47.348Z",
            "creditsToApply": 42.9,
            "code": "0650523",
            "status": false,
            "createAt": "2018-05-24T13:18:54.160Z",
            "user": "xxxxxxxxxxxxxxxxxxxx"
         },
         {
            "_id": "xxxxxxxxxxxxxxxxxxxx9a8",
            "__v": 0,
            "dateOfUse": "2018-06-25T20:57:59.336Z",
            "creditsToApply": 42.9,
            "code": "0016088",
            "status": false,
            "createAt": "2018-05-24T13:18:54.161Z",
            "user": "xxxxxxxxxxxxxxxxxxxx"
         },
         {
            "_id": "xxxxxxxxxxxxxxxxxxxxa2f",
            "__v": 0,
            "dateOfUse": "2018-06-21T17:28:48.758Z",
            "creditsToApply": 42.9,
            "code": "0634636",
            "status": false,
            "createAt": "2018-05-24T13:18:54.169Z",
            "user": "xxxxxxxxxxxxxxxxxxxx"
         },
         {
            "_id": "xxxxxxxxxxxxxxxxxxxxa32",
            "__v": 0,
            "dateOfUse": "2018-06-13T14:25:32.931Z",
            "creditsToApply": 42.9,
            "code": "0630474",
            "status": false,
            "createAt": "2018-05-24T13:18:54.169Z",
            "user": "xxxxxxxxxxxxxxxxxxxx"
         },
         {
            "_id": "xxxxxxxxxxxxxxxxxxxxa5b",
            "__v": 0,
            "dateOfUse": "2018-06-13T14:12:32.373Z",
            "creditsToApply": 42.9,
            "code": "0624733",
            "status": false,
            "createAt": "2018-05-24T13:18:54.172Z",
            "user": "xxxxxxxxxxxxxxxxxxxx"
         },
         {
            "_id": "xxxxxxxxxxxxxxxxxxxxaa0",
            "__v": 0,
            "dateOfUse": "2018-06-13T14:13:44.201Z",
            "creditsToApply": 42.9,
            "code": "0625212",
            "status": false,
            "createAt": "2018-05-24T13:18:54.176Z",
            "user": "xxxxxxxxxxxxxxxxxxxx"
         },
         {
            "_id": "xxxxxxxxxxxxxxxxxxxxac0",
            "__v": 0,
            "dateOfUse": "2018-06-13T11:15:03.582Z",
            "creditsToApply": 42.9,
            "code": "0628374",
            "status": false,
            "createAt": "2018-05-24T13:18:54.178Z",
            "user": "xxxxxxxxxxxxxxxxxxxx"
         },
         {
            "_id": "xxxxxxxxxxxxxxxxxxxxb23",
            "__v": 0,
            "dateOfUse": "2018-06-13T11:56:55.277Z",
            "creditsToApply": 42.9,
            "code": "0627754",
            "status": false,
            "createAt": "2018-05-24T13:18:54.187Z",
            "user": "xxxxxxxxxxxxxxxxxxxx"
         },
         {
            "_id": "xxxxxxxxxxxxxxxxxxxxbfc",
            "__v": 0,
            "dateOfUse": "2018-06-26T01:50:56.483Z",
            "creditsToApply": 42.9,
            "code": "0646618",
            "status": false,
            "createAt": "2018-05-24T13:18:54.203Z",
            "user": "xxxxxxxxxxxxxxxxxxxx"
         },
         {
            "_id": "xxxxxxxxxxxxxxxxxxxxc42",
            "__v": 0,
            "dateOfUse": "2018-06-29T18:48:00.805Z",
            "creditsToApply": 42.9,
            "code": "0668028",
            "status": false,
            "createAt": "2018-05-24T13:18:54.222Z",
            "user": "xxxxxxxxxxxxxxxxxxxx"
         },
         {
            "_id": "xxxxxxxxxxxxxxxxxxxxca7",
            "__v": 0,
            "dateOfUse": "2018-06-25T18:29:00.239Z",
            "creditsToApply": 42.9,
            "code": "0023762",
            "status": false,
            "createAt": "2018-05-24T13:18:54.228Z",
            "user": "xxxxxxxxxxxxxxxxxxxx97"
         },
         {
            "_id": "xxxxxxxxxxxxxxxxxxxxd13",
            "__v": 0,
            "dateOfUse": "2018-06-25T19:26:12.809Z",
            "creditsToApply": 42.9,
            "code": "0644840",
            "status": false,
            "createAt": "2018-05-24T13:18:54.234Z",
            "user": "xxxxxxxxxxxxxxxxxxxx"
         },
         {
            "_id": "xxxxxxxxxxxxxxxxxxxxd22",
            "__v": 0,
            "dateOfUse": "2018-06-26T23:11:21.642Z",
            "creditsToApply": 42.9,
            "code": "0643152",
            "status": false,
            "createAt": "2018-05-24T13:18:54.235Z",
            "user": "xxxxxxxxxxxxxxxxxxxxc1"
         },
         {
            "_id": "xxxxxxxxxxxxxxxxxxxxd8a",
            "__v": 0,
            "dateOfUse": "2018-06-28T14:33:20.521Z",
            "creditsToApply": 42.9,
            "code": "0008934",
            "status": false,
            "createAt": "2018-05-24T13:18:54.275Z",
            "user": "xxxxxxxxxxxxxxxxxxxx"
         },
         {
            "_id": "xxxxxxxxxxxxxxxxxxxxdfb",
            "__v": 0,
            "dateOfUse": "2018-06-30T12:46:10.004Z",
            "creditsToApply": 42.9,
            "code": "0621699",
            "status": false,
            "createAt": "2018-05-24T13:18:54.282Z",
            "user": "xxxxxxxxxxxxxxxxxxxx"
         },
         {
            "_id": "xxxxxxxxxxxxxxxxxxxxe1e",
            "__v": 0,
            "dateOfUse": "2018-06-13T12:53:27.607Z",
            "creditsToApply": 42.9,
            "code": "0629984",
            "status": false,
            "createAt": "2018-05-24T13:18:54.284Z",
            "user": "xxxxxxxxxxxxxxxxxxxx"
         },
         {
            "_id": "xxxxxxxxxxxxxxxxxxxxe34",
            "__v": 0,
            "dateOfUse": "2018-06-11T21:04:15.691Z",
            "creditsToApply": 42.9,
            "code": "0624605",
            "status": false,
            "createAt": "2018-05-24T13:18:54.285Z",
            "user": "xxxxxxxxxxxxxxxxxxxx085a3"
         },
         {
            "_id": "xxxxxxxxxxxxxxxxxxxxe5e",
            "__v": 0,
            "dateOfUse": "2018-06-28T14:01:55.679Z",
            "creditsToApply": 42.9,
            "code": "0650871",
            "status": false,
            "createAt": "2018-05-24T13:18:54.287Z",
            "user": "xxxxxxxxxxxxxxxxxxxx668"
         },
         {
            "_id": "xxxxxxxxxxxxxxxxxxxxf9a",
            "__v": 0,
            "dateOfUse": "2018-06-28T23:20:56.153Z",
            "creditsToApply": 42.9,
            "code": "0651913",
            "status": false,
            "createAt": "2018-05-24T13:18:54.320Z",
            "user": "xxxxxxxxxxxxxxxxxxxx173e0196d9"
         },
         {
            "_id": "xxxxxxxxxxxxxxxxxxxx64",
            "__v": 0,
            "dateOfUse": "2018-06-25T16:16:26.136Z",
            "creditsToApply": 42.9,
            "code": "0641579",
            "status": false,
            "createAt": "2018-05-24T13:18:54.331Z",
            "user": "5b31155ada8ff238c9b6cfbc"
         },
         {
            "_id": "xxxxxxxxxxxxxxxxxxxxb8",
            "__v": 0,
            "dateOfUse": "2018-06-28T14:22:59.042Z",
            "creditsToApply": 42.9,
            "code": "0651840",
            "status": false,
            "createAt": "2018-05-24T13:18:54.336Z",
            "user": "xxxxxxxxxxxxxxxxxxxx"
         }
      ]
   }
}
*/
