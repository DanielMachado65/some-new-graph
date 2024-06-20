/**
 * @api {get} /auth/user/context/:userid Buscar Contexto do Usuário
 * @apiVersion 5.27.1
 * @apiName AuthUserContext
 * @apiGroup Autenticacao
 *
 * @apiHeader {String} Authorization Token de acesso retornado após autenticação.
 * @apiParam {String} userId Id do usuário.
 *
 * @apiDescription O parâmetro deve ser passado no formato "Path variables" de acordo com a implementação REST.
 * <br> <b>EX:  /auth/user/context/<USER_ID></b>
 * <br> Essa requisição deve ser feita logo após o usuário ter se logado com Facebook ou Google para obtenção do UserId e do Token.
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
 *       "token": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX0",
 *       "user":
 *       {
 *         "_id": "XXXXXXXXXXXXXXXXXXX",
 *         "email": "usuario@olhonocarro.com.br",
 *         "cpf": 11111111111,
 *         "name": "Usuario Olho",
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
 *             "number": "12"
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
 * @apiError AuthUserContextError Falha ao buscar o contexto para o usuário.
 *
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 404 Not Found
 * {
 *
 * }
 *
 */
