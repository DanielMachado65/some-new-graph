/**
 * @api {get} /auth/password-recovery Recuperação de Senha
 * @apiVersion 5.27.1
 * @apiName AuthPasswordRecovery
 * @apiGroup Autenticacao
 *
 * @apiDescription O parâmetro deve ser passado no formato "Query String" de acordo com a implementação REST.
 * <br> <b>EX: /auth/password-recovery?email=<EMAIL_PARA_RECUPERACAO></b>
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *    "status": {
 *      "cod": 200,
 *      "msg": "ok"
 *    },
 *    "body": "ok"
 * }
 *
 * @apiError AuthPasswordRecoveryError E-mail inválido
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   "status": {
 *     "cod": 404,
 *     "msg": "not found"
 *   },
 *   "body": "Usuário não encontrado."
 * }
 *
 */
