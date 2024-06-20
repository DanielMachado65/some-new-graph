/**
 * @api {get} /auth/google Autenticação com Google+
 * @apiVersion 5.27.1
 * @apiName AuthGoogle
 * @apiGroup Autenticacao
 * @apiDescription Esta requisição deve ser feita via browser, a qual irá redirecionar o usuário para ambiente do Google.
 * Após o usuário realizar a autenticação com Google, o mesmo será redirecionado para o nosso ambinte, o qual irá buscar
 * na API, o contexto de dados para o usuário logado com Google através do GoogleClientId. O Retorno será então capturado
 * dentro da página de redirecionamento.
 *
 * RETORNO: A API irá retornar os mesmos dados retornados no processo de autenticação básica.
 */
