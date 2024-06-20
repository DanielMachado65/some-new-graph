/**
  * @apiDeprecated
  * @apiDeprecated Utilize a nova versão para implementação da Autenticação Básica. Vá para (#Autenticacao:AuthLogin).
 * @api {post} /api/user/auth Autenticação Básica v0.1.0
 * @apiVersion 0.1.0
 * @apiName BasicAuth
 * @apiGroup Autenticacao
 *
 * @apiParam {Number} email Email do usuário
 * @apiParam {Number} pass Senha do usuário
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "status":
 *   {
 *     "cod": 200,
 *     "msg": "ok"
 *   },
 *   "body":
 *   {
 *       "token": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
 *       "user":
 *       {
 *         "_id": "XXXXXXXXXXXXXXXXXXX",
 *         "email": "usuario@olhonocarro.com.br",
 *         "username": "username",
 *         "name": "Nome Usuario"
 *       }
 *   }
 * }
 */
