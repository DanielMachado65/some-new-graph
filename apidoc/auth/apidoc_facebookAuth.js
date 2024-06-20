/**
 * @api {get} /auth/facebook Autenticação com Facebook
 * @apiVersion 5.27.1
 * @apiName AuthFacebook
 * @apiGroup Autenticacao
 * @apiDescription Esta requisição deve ser feita via browser, a qual irá redirecionar o usuário para ambiente do Facebook.
 * Após o usuário realizar a autenticação com Facebook, o mesmo será redirecionado para o nosso ambinte, o qual irá buscar
 * na API, o contexto de dados para o usuário logado com Facebook através do FbId e FbToken. O Retorno será então capturado
 * dentro da página de redirecionamento.
 *
 * RETORNO: A API irá retornar os mesmos dados retornados no processo de autenticação básica.
 */
