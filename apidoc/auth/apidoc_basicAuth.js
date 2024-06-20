/**
* @apiDeprecated
* @apiDeprecated Utilize a nova versão para implementação da Autenticação Básica. Vá para (#Autenticacao:AuthLogin).
* @api {post} /auth/login Autenticação Básica v0.2.0
* @apiVersion 5.27.1
* @apiName AuthLogin
* @apiGroup Autenticacao
*
* @apiParam {String} username Username utilizado pelo usuário. Pode ser um email ou nickname único.
* @apiParam {String} password Senha cadastrada previamente pelo usuário.

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
*       "token": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX0",
*       "user":
*       {
*         "_id": "XXXXXXXXXXXXXXXXXXX",
*         "email": "usuario@olhonocarro.com.br",
*         "cpf": 11111111111,
*         "name": "Nome Usuario",
*         "status": true,
*         "last_login": "2018-03-07T19:35:18.877Z",
*         "generalData":
*         {
*           "address":
*           {
*             "zipcode": "00011123",
*             "city": null,
*             "state": null,
*             "neighborhood": null,
*             "street": "Terra do Nunca",
*             "complement": null,
*             "number": "0"
*           },
*           "phoneNumber1": null,
*           "phoneNumber2": null,
*           "birthDate": null
*         },
*         "type": "default_client"
*     }
*   }
* }
*
* @apiError AuthError Falha na autenticação
*
* @apiErrorExample Error-Response:
*   HTTP/1.1 407 Invalid Password
* {
*   "status": {
*     "cod": 407,
*     "msg": "invalid password"
*   },
*   "body": "Senha incorreta"
* }
*
* @apiErrorExample Error-Response:
*   HTTP/1.1 404 Not Found
* {
*   "status": {
*     "cod": 404,
*     "msg": "invalid password"
*   },
*   "body": "Usuário não encontrado."
* }
*/
