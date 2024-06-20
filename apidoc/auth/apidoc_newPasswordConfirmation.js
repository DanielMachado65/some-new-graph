/**
* @api {post} /auth/new-password-confirmation/:userid Alteração de Senha
* @apiVersion 5.27.1
* @apiName AuthPasswordConfirmation
* @apiGroup Autenticacao
*
* @apiParam {String} userId Id do usuário.
* @apiParam {String} npass Nova senha
*
*@apiDescription O parâmetro USER_ID deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX:  /auth/new-password-confirmation/<USER_ID></b>
*
* @apiParamExample {json} Request-Example:
*   {
*      "npass": "123456"
*   }
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
* {
*    "status": {
*      "cod": 200,
*      "msg": "ok"
*    },
*    "body": "Senha alterada com sucesso!"
* }
*
* @apiError AuthPasswordConfirmationErrorNotFount Usuário inválido
*
* @apiErrorExample Error-Response:
* HTTP/1.1 404 Not Found
* {
*
* }

* @apiError AuthPasswordConfirmationErrorInvalidParameters Parâmetros inválidos
* @apiErrorExample Error-Response:
* HTTP/1.1 405 Invalid Parameters
*{
   "status": {
    "cod": 405,
    "msg": "invalid parameters"
   },
   "body": null
*}
*
*/
