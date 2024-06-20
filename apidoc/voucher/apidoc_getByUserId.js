/**
* @api {get} /api/voucher/user/:userid Recuperar voucher por usuário
* @apiVersion 0.3.0
* @apiName VoucherUserId
* @apiGroup Voucher
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.
*
* @apiParam {String} Id do usuário
*
* @apiDescription O parâmetro USER_ID deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX:  /api/voucher/user/<USER_ID> </b>
* A rota retorna as informações dos vouchers utilizados pelo usuário referênciado.
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
{
   "status": {
      "cod": 200,
      "msg": "ok"
   },
   "body": [
      {
         "_id": "xxxxxxxxxxxxxxxxxxxxx",
         "__v": 0,
         "dateOfUse": "2018-06-28T14:33:20.521Z",
         "creditsToApply": 42.9,
         "code": "0000000",
         "status": false,
         "createAt": "2018-05-24T13:18:54.275Z",
         "user": "xxxxxxxxxxxxxxxxxxxxx"
      }
   ]
}
* @apiErrorExample Error-Response:
* HTTP/1.1 500 Invalid User
{
   "InternalServerError": "Ops... Algo deu errado! Perdoe-nos pelo inconveniênte. Estamos analisando o problema que causou intermitência nessa requisição, aguarde...",
   "code": 500
}
*/
