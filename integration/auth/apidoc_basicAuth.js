/**
* @api {post} /auth/login Básica
* @apiVersion 5.27.1
* @apiName AuthLogin
* @apiGroup Autenticacao
*
* @apiParam {String} username Username utilizado pelo usuário. Pode ser um email.
* @apiParam {String} password Senha cadastrada previamente pelo usuário.

* @apiDescription O parametro _id retornado após a autenticação ter sida executada com sucesso, corresponde ao identificador único do usuário.<br>
O parametro token corresponde ao token de segurança JWT que é a chave de segurança da API, essa chave deve ser enviada no header da requisição
através do parametro <b>Authorization</b>.
<br>
* @apiParamExample {json} Request-Example:
{
  "username":"email",
  "password" : "password"
}

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
*       "token": "eyJhbGciOiJIUzI1NiInR5cCI6IkpXVCJ9.eyJzZWNyZXQiOlsiYzE5MGYxMWEzMmRiYzY3ZWVjNDY1YTMyMGQ3ZmUxMWQiXSwiaWF0IjoxNTIwNDUxMzE5LCJleHAiOjE1MjA1Mzc3MTl9.w0OM46_AY4D8SAvY8I2vP0gVbqeomdsoF4L1U9lxau0",
*       "user":
*       {
*         "_id": "XXXXXXXXXXXXXXXXXXX",
*         "name": "Nome Usuario",
*         "status": true,
*         "last_login": "2018-03-07T19:35:18.877Z",
*         "type": "default_client"
*     }
*   }
* }
*
* @apiError AuthError Falha na autenticação
*
* @apiErrorExample Error-Response:
*   HTTP/1.1 401 UnauthorizeD
 * {
    "status": {
        "cod": 401,
        "msg": "unauthorized"
    },
    "body": "Usuário ou senha inválidos."
}
 *
*/
