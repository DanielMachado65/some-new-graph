define({
    api: [
        {
            type: 'get',
            url: '/auth/facebook',
            title: 'Autenticação com Facebook',
            version: '0.2.0',
            name: 'AuthFacebook',
            group: 'Autenticacao',
            description:
                '<p>Esta requisição deve ser feita via browser, a qual irá redirecionar o usuário para ambiente do Facebook. Após o usuário realizar a autenticação com Facebook, o mesmo será redirecionado para o nosso ambinte, o qual irá buscar na API, o contexto de dados para o usuário logado com Facebook através do FbId e FbToken. O Retorno será então capturado dentro da página de redirecionamento.</p> <p>RETORNO: A API irá retornar os mesmos dados retornados no processo de autenticação básica.</p>',
            filename: 'apidoc/auth/apidoc_facebookAuth.js',
            groupTitle: 'Autenticacao',
        },
        {
            type: 'get',
            url: '/auth/google',
            title: 'Autenticação com Google+',
            version: '0.2.0',
            name: 'AuthGoogle',
            group: 'Autenticacao',
            description:
                '<p>Esta requisição deve ser feita via browser, a qual irá redirecionar o usuário para ambiente do Google. Após o usuário realizar a autenticação com Google, o mesmo será redirecionado para o nosso ambinte, o qual irá buscar na API, o contexto de dados para o usuário logado com Google através do GoogleClientId. O Retorno será então capturado dentro da página de redirecionamento.</p> <p>RETORNO: A API irá retornar os mesmos dados retornados no processo de autenticação básica.</p>',
            filename: 'apidoc/auth/apidoc_googleAuth.js',
            groupTitle: 'Autenticacao',
        },
        {
            deprecated: {
                content:
                    '@apiDeprecated Utilize a nova versão para implementação da Autenticação Básica. Vá para (#Autenticacao:AuthLogin).',
            },
            type: 'post',
            url: '/auth/login',
            title: 'Autenticação Básica v0.2.0',
            version: '0.2.0',
            name: 'AuthLogin',
            group: 'Autenticacao',
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'username',
                            description:
                                '<p>Username utilizado pelo usuário. Pode ser um email ou nickname único.</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'password',
                            description:
                                '<p>Senha cadastrada previamente pelo usuário.</p>',
                        },
                    ],
                },
            },
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status":\n  {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body":\n  {\n      "token": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX0",\n      "user":\n      {\n        "_id": "XXXXXXXXXXXXXXXXXXX",\n        "email": "usuario@olhonocarro.com.br",\n        "cpf": 11111111111,\n        "name": "Nome Usuario",\n        "status": true,\n        "last_login": "2018-03-07T19:35:18.877Z",\n        "generalData":\n        {\n          "address":\n          {\n            "zipcode": "00011123",\n            "city": null,\n            "state": null,\n            "neighborhood": null,\n            "street": "Terra do Nunca",\n            "complement": null,\n            "number": "0"\n          },\n          "phoneNumber1": null,\n          "phoneNumber2": null,\n          "birthDate": null\n        },\n        "type": "default_client"\n    }\n  }\n}',
                        type: 'json',
                    },
                ],
            },
            error: {
                fields: {
                    'Error 4xx': [
                        {
                            group: 'Error 4xx',
                            optional: false,
                            field: 'AuthError',
                            description: '<p>Falha na autenticação</p>',
                        },
                    ],
                },
                examples: [
                    {
                        title: 'Error-Response:',
                        content:
                            '  HTTP/1.1 407 Invalid Password\n{\n  "status": {\n    "cod": 407,\n    "msg": "invalid password"\n  },\n  "body": "Senha incorreta"\n}',
                        type: 'json',
                    },
                    {
                        title: 'Error-Response:',
                        content:
                            '  HTTP/1.1 404 Not Found\n{\n  "status": {\n    "cod": 404,\n    "msg": "invalid password"\n  },\n  "body": "Usuário não encontrado."\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/auth/apidoc_basicAuth.js',
            groupTitle: 'Autenticacao',
        },
        {
            type: 'post',
            url: '/auth/login/partners',
            title: 'Autenticação de Parceiros',
            version: '0.3.0',
            name: 'AuthLoginParceiros',
            group: 'Autenticacao',
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'username',
                            description:
                                '<p>Username utilizado pelo parceiro. Pode ser um email ou nickname único.</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'password',
                            description:
                                '<p>Senha cadastrada previamente pelo parceiro.</p>',
                        },
                    ],
                },
            },
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status":\n  {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body":\n  {\n      "token": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX0",\n      "user":\n      {\n        "_id": "XXXXXXXXXXXXXXXXXXX",\n        "email": "usuario@olhonocarro.com.br",\n        "cpf": 11111111111,\n        "name": "Nome Usuario",\n        "status": true,\n        "last_login": "2018-03-07T19:35:18.877Z",\n        "generalData":\n        {\n          "address":\n          {\n            "zipcode": "00011123",\n            "city": null,\n            "state": null,\n            "neighborhood": null,\n            "street": "Terra do Nunca",\n            "complement": null,\n            "number": "0"\n          },\n          "phoneNumber1": null,\n          "phoneNumber2": null,\n          "birthDate": null\n        },\n        "type": "default_client"\n    }\n  }\n}',
                        type: 'json',
                    },
                ],
            },
            error: {
                fields: {
                    'Error 4xx': [
                        {
                            group: 'Error 4xx',
                            optional: false,
                            field: 'AuthError',
                            description: '<p>Falha na autenticação</p>',
                        },
                    ],
                },
                examples: [
                    {
                        title: 'Error-Response:',
                        content:
                            '  HTTP/1.1 407 Invalid Password\n{\n  "status": {\n    "cod": 407,\n    "msg": "invalid password"\n  },\n  "body": "Senha incorreta"\n}',
                        type: 'json',
                    },
                    {
                        title: 'Error-Response:',
                        content:
                            '  HTTP/1.1 404 Not Found\n{\n  "status": {\n    "cod": 404,\n    "msg": "invalid password"\n  },\n  "body": "Usuário não encontrado."\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/auth/apidoc_partnersAuth.js',
            groupTitle: 'Autenticacao',
        },
        {
            type: 'post',
            url: '/auth/new-password-confirmation/:userid',
            title: 'Alteração de Senha',
            version: '0.2.0',
            name: 'AuthPasswordConfirmation',
            group: 'Autenticacao',
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'userId',
                            description: '<p>Id do usuário.</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'npass',
                            description: '<p>Nova senha</p>',
                        },
                    ],
                },
                examples: [
                    {
                        title: 'Request-Example:',
                        content: '{\n   "npass": "123456"\n}',
                        type: 'json',
                    },
                ],
            },
            description:
                '<p>O parâmetro USER_ID deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br> <b>EX:  /auth/new-password-confirmation/&lt;USER_ID&gt;</b></p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n   "status": {\n     "cod": 200,\n     "msg": "ok"\n   },\n   "body": "Senha alterada com sucesso!"\n}',
                        type: 'json',
                    },
                ],
            },
            error: {
                fields: {
                    'Error 4xx': [
                        {
                            group: 'Error 4xx',
                            optional: false,
                            field: 'AuthPasswordConfirmationErrorNotFount',
                            description: '<p>Usuário inválido</p>',
                        },
                        {
                            group: 'Error 4xx',
                            optional: false,
                            field:
                                'AuthPasswordConfirmationErrorInvalidParameters',
                            description: '<p>Parâmetros inválidos</p>',
                        },
                    ],
                },
                examples: [
                    {
                        title: 'Error-Response:',
                        content: 'HTTP/1.1 404 Not Found\n{\n\n}',
                        type: 'json',
                    },
                    {
                        title: 'Error-Response:',
                        content:
                            'HTTP/1.1 405 Invalid Parameters\n{\n   "status": {\n    "cod": 405,\n    "msg": "invalid parameters"\n   },\n   "body": null\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/auth/apidoc_newPasswordConfirmation.js',
            groupTitle: 'Autenticacao',
        },
        {
            type: 'get',
            url: '/auth/password-recovery',
            title: 'Recuperação de Senha',
            version: '0.2.0',
            name: 'AuthPasswordRecovery',
            group: 'Autenticacao',
            description:
                '<p>O parâmetro deve ser passado no formato &quot;Query String&quot; de acordo com a implementação REST. <br> <b>EX: /auth/password-recovery?email=&lt;EMAIL_PARA_RECUPERACAO&gt;</b></p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n   "status": {\n     "cod": 200,\n     "msg": "ok"\n   },\n   "body": "ok"\n}',
                        type: 'json',
                    },
                ],
            },
            error: {
                fields: {
                    'Error 4xx': [
                        {
                            group: 'Error 4xx',
                            optional: false,
                            field: 'AuthPasswordRecoveryError',
                            description: '<p>E-mail inválido</p>',
                        },
                    ],
                },
                examples: [
                    {
                        title: 'Error-Response:',
                        content:
                            'HTTP/1.1 404 Not Found\n{\n  "status": {\n    "cod": 404,\n    "msg": "not found"\n  },\n  "body": "Usuário não encontrado."\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/auth/apidoc_passwordRecovery.js',
            groupTitle: 'Autenticacao',
        },
        {
            type: 'get',
            url: '/auth/user/context/:userid',
            title: 'Buscar Contexto do Usuário',
            version: '0.2.0',
            name: 'AuthUserContext',
            group: 'Autenticacao',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'userId',
                            description: '<p>Id do usuário.</p>',
                        },
                    ],
                },
            },
            description:
                '<p>O parâmetro deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br> <b>EX:  /auth/user/context/&lt;USER_ID&gt;</b> <br> Essa requisição deve ser feita logo após o usuário ter se logado com Facebook ou Google para obtenção do UserId e do Token.</p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status":\n  {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body":\n  {\n      "token": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX0",\n      "user":\n      {\n        "_id": "XXXXXXXXXXXXXXXXXXX",\n        "email": "usuario@olhonocarro.com.br",\n        "cpf": 11111111111,\n        "name": "Usuario Olho",\n        "status": true,\n        "last_login": "2018-03-07T19:35:18.877Z",\n        "generalData":\n        {\n          "address":\n          {\n            "zipcode": "00011123",\n            "city": null,\n            "state": null,\n            "neighborhood": null,\n            "street": "Terra do Nunca",\n            "complement": null,\n            "number": "12"\n          },\n          "phoneNumber1": null,\n          "phoneNumber2": null,\n          "birthDate": null\n        },\n        "type": "default_client"\n    }\n  }\n}',
                        type: 'json',
                    },
                ],
            },
            error: {
                fields: {
                    'Error 4xx': [
                        {
                            group: 'Error 4xx',
                            optional: false,
                            field: 'AuthUserContextError',
                            description:
                                '<p>Falha ao buscar o contexto para o usuário.</p>',
                        },
                    ],
                },
                examples: [
                    {
                        title: 'Error-Response:',
                        content: ' HTTP/1.1 404 Not Found\n{\n\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/auth/apidoc_userContext.js',
            groupTitle: 'Autenticacao',
        },
        {
            deprecated: {
                content:
                    '@apiDeprecated Utilize a nova versão para implementação da Autenticação Básica. Vá para (#Autenticacao:AuthLogin).',
            },
            type: 'post',
            url: '/api/user/auth',
            title: 'Autenticação Básica v0.1.0',
            version: '0.1.0',
            name: 'BasicAuth',
            group: 'Autenticacao',
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'Number',
                            optional: false,
                            field: 'email',
                            description: '<p>Email do usuário</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'Number',
                            optional: false,
                            field: 'pass',
                            description: '<p>Senha do usuário</p>',
                        },
                    ],
                },
            },
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status":\n  {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body":\n  {\n      "token": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",\n      "user":\n      {\n        "_id": "XXXXXXXXXXXXXXXXXXX",\n        "email": "usuario@olhonocarro.com.br",\n        "username": "username",\n        "name": "Nome Usuario"\n      }\n  }\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/_apidoc.js',
            groupTitle: 'Autenticacao',
        },
        {
            type: 'get',
            url: '/api/query/consumption-month/:id',
            title: 'Buscar Histórico de Consumo mensal por Usuário',
            version: '0.2.0',
            name: 'ConsumptionMonth',
            group: 'Consultas',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            success: {
                fields: {
                    'Success 200': [
                        {
                            group: 'Success 200',
                            type: 'String',
                            optional: false,
                            field: 'userid',
                            description: '<p>ID do usuário</p>',
                        },
                    ],
                },
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            '  {\n    {\n  "status": 200,\n  "body": {\n    "queries": [\n      {\n        "_id": "5XXXXXXXXXXXXXXXXXXXXXXXb",\n        "code": 1,\n        "status": true,\n        "refClass": "Agregados",\n        "keys": [\n          "fan3137"\n        ],\n        "createAt": "2018-02-23T14:34:47.286Z",\n        "responseJSON": true\n      },\n      {\n        "_id": "XXXXXXXXXXXXXXXXXXXXXXa4",\n        "code": 0,\n        "status": true,\n        "refClass": "Credito Simples",\n        "keys": [\n          "02785357710"\n        ],\n        "createAt": "2018-02-17T13:06:13.037Z",\n        "responseJSON": true\n      },\n      {\n        "_id": "5a85b5cbXXXXXXXXXXXX84",\n        "code": 1,\n        "status": true,\n        "refClass": "Agregados",\n        "keys": [\n          "fan3137"\n        ],\n        "createAt": "2018-02-15T16:31:07.776Z",\n        "responseJSON": true\n      },\n      {\n        "_id": "5a85b5a7XXXXXXXXXXXX7f",\n        "code": 1,\n        "status": true,\n        "refClass": "Agregados",\n        "keys": [\n          "fan3137"\n        ],\n        "createAt": "2018-02-15T16:30:31.438Z",\n        "responseJSON": true\n      }\n    ]\n  }\n}\n  }',
                        type: 'json',
                    },
                ],
            },
            description:
                '<p>O parâmetro USER_ID deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br> <b>EX:  /api/query/consumption-month/&lt;USER_ID&gt;</b></p>',
            filename: 'apidoc/query/apidoc_consumptionMonth.js',
            groupTitle: 'Consultas',
        },
        {
            type: 'get',
            url: '/api/query/content/:name',
            title: 'Buscar Consultas Disponíveis',
            version: '0.2.0',
            name: 'GetEnablesQueries',
            group: 'Consultas',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            success: {
                fields: {
                    'Success 200': [
                        {
                            group: 'Success 200',
                            type: 'String',
                            optional: false,
                            field: 'name',
                            description:
                                '<p>O name refere-se as tabelas de preço pós e pre-pago. Logo, a propriedade &quot;name&quot; poderá ser &quot;default&quot; (para consultas disponiveis para clientes pré-pago) ou &quot;default_pos_paid&quot; (para consultas disponíveis para clientes pós-pago)</p>',
                        },
                    ],
                },
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            '{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": [\n    {\n      "query": "Agregados",\n      "price": "1.99",\n      "querycode": 1\n    },\n    {\n      "query": "Historico de KM",\n      "price": "2.99",\n      "querycode": 8\n    },\n    {\n      "query": "Renajud",\n      "price": "0.60",\n      "querycode": 5\n    },\n    {\n      "query": "Consulta Nacional",\n      "price": "0.80",\n      "querycode": 2\n    },\n    {\n      "query": "Veiculo Completo",\n      "price": "2.75",\n      "querycode": 100\n    },\n    {\n      "query": "Restricao Total",\n      "price": "4.25",\n      "querycode": 7\n    },\n    {\n      "query": "Credito Simples",\n      "price": "3.05",\n      "querycode": 6\n    },\n    {\n      "query": "Cadastro Completo",\n      "price": "1.45",\n      "querycode": 4\n    },\n    {\n      "query": "Consulta de CCF",\n      "price": "0.82",\n      "querycode": 9\n    },\n    {\n      "query": "Perda Total",\n      "price": "1.00",\n      "querycode": 10\n    },\n    {\n      "query": "Roubo e Furto",\n      "price": "1.00",\n      "querycode": 11\n    },\n    {\n      "query": "Historico de Proprietarios",\n      "price": "1.00",\n      "querycode": 12\n    }\n  ]\n}',
                        type: 'json',
                    },
                ],
            },
            description:
                '<p>O parâmetro NAME deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br> <b>EX:  /api/query/content/&lt;_NAME&gt;</b></p>',
            filename: 'apidoc/query/apidoc_getEnablesQueries.js',
            groupTitle: 'Consultas',
        },
        {
            type: 'get',
            url: '/api/query/historic-by-user/:userid',
            title: 'Buscar Histórico de Consultas por Usuário',
            version: '0.2.0',
            name: 'GetHistoricQueries',
            group: 'Consultas',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            success: {
                fields: {
                    'Success 200': [
                        {
                            group: 'Success 200',
                            type: 'String',
                            optional: false,
                            field: 'userid',
                            description: '<p>ID do usuário</p>',
                        },
                    ],
                },
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            '{\n  "status": 200,\n  "body": {\n    "dateReference": null,\n    "queries": [\n      {\n        "_id": "XXXXXXXXXXX2388db",\n        "code": 1,\n        "status": true,\n        "refClass": "Agregados",\n        "keys": {\n          "cnpj": null,\n          "cpf": null,\n          "renavam": null,\n          "motor": null,\n          "chassi": null,\n          "placa": "XXXXX"\n        },\n        "createAt": "2018-03-08T22:10:58.421Z"\n      },\n      {...},\n      {...},\n      {...}\n    ],\n  }\n}',
                        type: 'json',
                    },
                ],
            },
            description:
                '<p>ATENÇÃO: Este método retorna os valores em lotes. Lotes de 25 consultas. Sempre observar o parametro de retorno &quot;dateReference&quot;, pois quando o mesmo for retornado da API, ele deverá ser passado na próxima consulta, ára trazer o próximo lote de 25 consultas com base na data.</p>',
            filename: 'apidoc/query/apidoc_getHistoricByUser.js',
            groupTitle: 'Consultas',
        },
        {
            type: 'get',
            url: '/api/query/json-response/:queryid',
            title: 'Buscar JSON das Consultas por ID',
            version: '0.1.0',
            name: 'GetQueriesJSON',
            group: 'Consultas',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            success: {
                fields: {
                    'Success 200': [
                        {
                            group: 'Success 200',
                            type: 'String',
                            optional: false,
                            field: 'queryid',
                            description: '<p>ID da consulta.</p>',
                        },
                    ],
                },
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            '{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": {\n    "_id": "XXXXXXX",\n    "code": 1,\n    "status": true,\n    "responseJSON": {\n      "codigoMunicipio": "XXXXXXX",\n      "dtAtualizacao": "2013-03-28T03:00:00.000Z",\n      "__v": 0,\n      "situacaoVeiculo": "S",\n      "pesoBrutoTotal": "177",\n      "capMaxTracao": "237",\n      "cilindradas": "1999",\n      "limiteRestricaoTrib": null,\n      "restricao4": "SEM RESTRICAO",\n      "restricao3": "SEM RESTRICAO",\n      "restricao2": "SEM RESTRICAO",\n      "restricao1": "SEM RESTRICAO",\n      "dtUltimaAtualizacao": "2012-03-15T03:00:00.000Z",\n      "unidadeLocalSRF": "1010500",\n      "registroDi": null,\n      "di": "1202708775",\n      "identImportadora": null,\n      "tipoDocImportadora": null,\n      "tipoMontagem": "1",\n      "eixos": "2",\n      "situacaoChassi": "N",\n      "qtdPax": "5",\n      "corVeiculo": "Preta",\n      "tipoCarroceria": "NAO APLICAVEL",\n      "especieVeiculo": "Passageiro",\n      "tipoVeiculo": "Automovel",\n      "tipoDocProprietario": "Jurídica",\n      "ufFaturado": "BA",\n      "tipoDocFaturado": "Jurídica",\n      "numTerceiroEixo": null,\n      "numMotor": null,\n      "eixoTraseiroDif": null,\n      "caixaCambio": null,\n      "numCarroceria": null,\n      "linha": "XXXXXXX",\n      "nacionalidade": "Importado",\n      "capacidadeCarga": "0",\n      "potencia": "148",\n      "combustivel": "Álcool / Gasolina",\n      "codigoCombustivel": "16",\n      "marcaModelo": "XXXXXXX",\n      "codigoMarcaModelo": "XXXXXXX",\n      "municipio": "SAO PAULO",\n      "anoModelo": "XXXXXXX",\n      "anoFabricacao": "XXXXXXX",\n      "numFaturado": "XXXXXXX",\n      "cidade": "SÃ£o Paulo",\n      "uf": "SP",\n      "renavam": "XXXXXXX",\n      "placa": "XXXXXXX",\n      "chassi": "XXXXXXX"\n    },\n    "refClass": "Agregados",\n    "keys": {\n      "cnpj": null,\n      "cpf": null,\n      "renavam": null,\n      "motor": null,\n      "chassi": null,\n      "placa": "XXXXXXX"\n    },\n    "createAt": "2018-03-08T22:10:58.421Z"\n  }\n}',
                        type: 'json',
                    },
                ],
            },
            description:
                '<p>O parâmetro QUERY_ID deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br> <b>EX:  /api/query/json-response/&lt;QUERY_ID&gt;</b></p>',
            filename: 'apidoc/query/apidoc_getJsonResponseQuery.js',
            groupTitle: 'Consultas',
        },
        {
            type: 'get',
            url: '/api/query/by-id/:queryid',
            title: 'Buscar Consulta por ID (Completa)',
            version: '0.2.0',
            name: 'GetQueryById',
            group: 'Consultas',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            success: {
                fields: {
                    'Success 200': [
                        {
                            group: 'Success 200',
                            type: 'String',
                            optional: false,
                            field: 'queryid',
                            description: '<p>ID da consulta.</p>',
                        },
                    ],
                },
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            '{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": {\n    "_id": "XXXXXXXXXXXXXXXXXXXXXXXX",\n    "__v": 6,\n    "log": "XXXXXXXXXXXXXXXXXXXXXXXX",\n    "code": 99,\n    "status": true,\n    "failedServices": [],\n    "stackResult": [\n      {\n        "_id": "XXXXXXXXXXXXXXXXXXXXXXXX",\n        "dataFound": true,\n        "serviceLog": "XXXXXXXXXXXXXXXXXXXXXXXX",\n        "rawData": "<?xml version=\\"1.0\\" encoding=\\"UTF-8\\"?>\\n<RESPOSTA><RETORNO><EXISTE_ERRO>0</EXISTE_ERRO><MSG_ERRO></MSG_ERRO><MSG_ERRO2></MSG_ERRO2><CHAVERETORNO>180730185741313</CHAVERETORNO><SITUACAOVEIC>CIRCULACAO</SITUACAOVEIC><OCORRENCIA>VEICULO NAO INDICA OCORRENCIA DE ROUBO/FURTO</OCORRENCIA><PLACA>DMP5463</PLACA><MUNICIPIO>COTIA</MUNICIPIO><UF>SP</UF><RENAVAM>00939388278</RENAVAM><CPF_CNPJ_PROPRIETARIO>02323572857</CPF_CNPJ_PROPRIETARIO><VEIANOFABR>2007</VEIANOFABR><VEIANOMODELO>2008</VEIANOMODELO><MODELO>CORSA HATCH JOY</MODELO><MARCA>GM</MARCA><ULTIMAATUALIZACAO>18/03/2014</ULTIMAATUALIZACAO><MOTOR>H70055741</MOTOR><CHASSI>9BGXL68608C134866</CHASSI><TIPOREMARCCHASSI>NORMAL</TIPOREMARCCHASSI><TIPO>AUTOMOVEL</TIPO><TIPOMONTAGEM>COMPLETA</TIPOMONTAGEM><CARROCERIA>INEXISTENTE</CARROCERIA><COR>PRATA</COR><COMBUSTIVEL>ALCOOL/GASOLINA</COMBUSTIVEL><POTENCIA>79</POTENCIA><CILINDRADA>1000</CILINDRADA><CAPACIDADECARGA>0,00</CAPACIDADECARGA><VEIPROCEDENCIA>NACIONAL</VEIPROCEDENCIA><CAPACIDADEPASSAG>5</CAPACIDADEPASSAG><NUMERO_CAIXACAMBIO>070460900</NUMERO_CAIXACAMBIO><NUMERO_CARROCERIA>999</NUMERO_CARROCERIA><NUMERO_EIXOTRASEIRODIF></NUMERO_EIXOTRASEIRODIF><NUMERO_TERCEIROEIXO></NUMERO_TERCEIROEIXO><CMT>210</CMT><PBT>0,00</PBT><EIXOS>0</EIXOS><TIPODOCUMENTOFATURADO>JURIDICA</TIPODOCUMENTOFATURADO><CPFCNPJFATURADO>59275792000826</CPFCNPJFATURADO><UFFATURADO>SP</UFFATURADO><TIPODOCUMENTOIMPORTADORA></TIPODOCUMENTOIMPORTADORA><RESTRICAO01>NADA CONSTA</RESTRICAO01><RESTRICAO02>NADA CONSTA</RESTRICAO02><RESTRICAO03>NADA CONSTA</RESTRICAO03><RESTRICAO04>NADA CONSTA</RESTRICAO04><INDICADORCOMUNICACAODEVENDAS>NAO</INDICADORCOMUNICACAODEVENDAS><INDICADORRESTRICAORENAJUD>NAO</INDICADORRESTRICAORENAJUD><NUMERO_DI>0000000000</NUMERO_DI><RESTRICAOTIPOTRANSACAO>NADA CONSTA</RESTRICAOTIPOTRANSACAO><RESTRICOESRESTRICAOFINAN> NADA CONSTA </RESTRICOESRESTRICAOFINAN><RESTRICAONOMEAGENTE></RESTRICAONOMEAGENTE><RESTRICAOFINANCIADO></RESTRICAOFINANCIADO><RESTRICAOCPFCNPJFINANCIADO></RESTRICAOCPFCNPJFINANCIADO><RESTRICAODATAINCLUSAO></RESTRICAODATAINCLUSAO><OUTRAS_RESTRICOES_01>NADA CONSTA</OUTRAS_RESTRICOES_01><OUTRAS_RESTRICOES_02>NADA CONSTA</OUTRAS_RESTRICOES_02><OUTRAS_RESTRICOES_03>NADA CONSTA</OUTRAS_RESTRICOES_03><OUTRAS_RESTRICOES_04>NADA CONSTA</OUTRAS_RESTRICOES_04><OUTRAS_RESTRICOES_05>NADA CONSTA</OUTRAS_RESTRICOES_05><OUTRAS_RESTRICOES_06>NADA CONSTA</OUTRAS_RESTRICOES_06><OUTRAS_RESTRICOES_07>NADA CONSTA</OUTRAS_RESTRICOES_07><OUTRAS_RESTRICOES_08>NADA CONSTA</OUTRAS_RESTRICOES_08><CATEGORIA>PARTICULAR</CATEGORIA><ESPECIE>PASSAGEIRO</ESPECIE><TEMPOEXECUCAO>3</TEMPOEXECUCAO></RETORNO></RESPOSTA>"\n      },\n      {\n        "_id": "XXXXXXXXXXXXXXXXXXXXXXXX",\n        "dataFound": true,\n        "serviceLog": "XXXXXXXXXXXXXXXXXXXXXXXX",\n        "rawData": "<?xml version=\\"1.0\\" encoding=\\"UTF-8\\"?>\\n<RESPOSTA><RETORNO><EXISTE_ERRO>0</EXISTE_ERRO><MSG_ERRO>DMP5463 9BGXL68608C134866</MSG_ERRO><CHAVERETORNO>180730185745576</CHAVERETORNO><SITUACAOVEICULO>CIRCULACAO</SITUACAOVEICULO><PLACA>DMP5463</PLACA><MUNICIPIO>COTIA-SP</MUNICIPIO><RENAVAM>00939388278</RENAVAM><CPF_CNPJ_PROPRIETARIO>2323572857</CPF_CNPJ_PROPRIETARIO><TIPODOCUMENTOPROPRIETARIO>FISICA</TIPODOCUMENTOPROPRIETARIO><PRONOME>02323572857 EDMEA CLEMENTINA VICENTE DE REZENDE</PRONOME><LICDATA>22/01/2018</LICDATA><CHASSI>9BGXL68608C134866</CHASSI><TIPOREMARCACAOCHASSI>NORMAL</TIPOREMARCACAOCHASSI><MARCA>GM</MARCA><MODELO>CORSA HATCH JOY</MODELO><VEIANOFABR>2007</VEIANOFABR><VEIANOMODELO>2008</VEIANOMODELO><TIPO>AUTOMOVEL</TIPO><CARROCERIA>INEXISTENTE</CARROCERIA><COR>PRATA</COR><ESPECIE>PASSAGEIRO</ESPECIE><VEICATEGORIA>PARTICULAR</VEICATEGORIA><COMBUSTIVEL>ALCOOL/GASOLINA</COMBUSTIVEL><POTENCIA>79</POTENCIA><CILINDRADA>1000</CILINDRADA><CAPACIDADECARGA>0,00</CAPACIDADECARGA><VEIPROCEDENCIA>NACIONAL</VEIPROCEDENCIA><CAPACIDADEPASSAG>5</CAPACIDADEPASSAG><MOTOR>H70055741</MOTOR><NUMERO_CAIXACAMBIO>070460900</NUMERO_CAIXACAMBIO><NUMERO_CARROCERIA></NUMERO_CARROCERIA><NUMERO_EIXOTRASEIRODIF></NUMERO_EIXOTRASEIRODIF><NUMERO_TERCEIROEIXO></NUMERO_TERCEIROEIXO><CMT>210</CMT><PBT>0</PBT><EIXOS>0</EIXOS><TIPODOCUMENTOFATURADO>JURIDICA</TIPODOCUMENTOFATURADO><CPFCNPJFATURADO>59275792000826</CPFCNPJFATURADO><UFFATURADO>SP</UFFATURADO><TIPODOCUMENTOIMPORTADORA></TIPODOCUMENTOIMPORTADORA><RESTRICAOFINAN>NADA CONSTA</RESTRICAOFINAN><RESTRICAONOMEAGENTE></RESTRICAONOMEAGENTE><RESTRICAOARRENDATARIO></RESTRICAOARRENDATARIO><RESTRICAODATAINCLUSAO></RESTRICAODATAINCLUSAO><NUMEROCONTRATOFINANCEIRA></NUMEROCONTRATOFINANCEIRA><CODIGOAGENTEFINANCEIRO></CODIGOAGENTEFINANCEIRO><DATAVIGENCIACONTRATOFINANCEIRA></DATAVIGENCIACONTRATOFINANCEIRA><EXISTEDEBITODEIPVA>NAO EXISTE DEBITO DE IPVA</EXISTEDEBITODEIPVA><EXISTEDEBITOMULTA>NAO EXISTE DEBITO DE MULTA</EXISTEDEBITOMULTA><DEBIPVA>0,00</DEBIPVA><EXISTEDEBITODELICENCIAMENTO>NAO EXISTE DEBITO DE LICENCIAMENTO</EXISTEDEBITODELICENCIAMENTO><EXISTEDEBITODELICENCIAMENTOVL>0,00</EXISTEDEBITODELICENCIAMENTOVL><VALORTOTALDEBITOMULTA>0,00</VALORTOTALDEBITOMULTA><EXISTEDEBITODEDPVAT>NAO EXISTE DEBITO DE DPVAT</EXISTEDEBITODEDPVAT><DPVAT>0,00</DPVAT><OUTRAS_RESTRICOES_01>NADA CONSTA</OUTRAS_RESTRICOES_01><OUTRAS_RESTRICOES_02>NADA CONSTA</OUTRAS_RESTRICOES_02><OUTRAS_RESTRICOES_03>NADA CONSTA</OUTRAS_RESTRICOES_03><OUTRAS_RESTRICOES_04>NADA CONSTA</OUTRAS_RESTRICOES_04><PRONOMEANTERIOR>pedro nobre junior</PRONOMEANTERIOR><RESTRICAOCPFCNPJARRENDATAR></RESTRICAOCPFCNPJARRENDATAR><INTENCAORESTRICAOFINAN></INTENCAORESTRICAOFINAN><INTENCAONOMEAGENTE></INTENCAONOMEAGENTE><INTENCAONOMEFINANC></INTENCAONOMEFINANC><INTENCAOCPFCNPJFINANC></INTENCAOCPFCNPJFINANC><INTENCAODATAINCLUSAO></INTENCAODATAINCLUSAO><DEBDERSA>0,00</DEBDERSA><DEBDER>0,00</DEBDER><DEBDETRAN>0,00</DEBDETRAN><DEBCETESB>0,00</DEBCETESB><DEBRENAINF>0,00</DEBRENAINF><DEBMUNICIPAIS>0,00</DEBMUNICIPAIS><DEBPOLRODFED>0,00</DEBPOLRODFED><RESFURTO>NADA CONSTA</RESFURTO><RESGUINCHO>NADA CONSTA</RESGUINCHO><RESADMINISTRATIVA>NADA CONSTA</RESADMINISTRATIVA><RESJUDICIAL>NADA CONSTA</RESJUDICIAL><RESTRIBUTARIA>NADA CONSTA</RESTRIBUTARIA><RESRENAJUD>NADA CONSTA</RESRENAJUD><RESAMBIENTAL>veiculo com inspecao veicular ok</RESAMBIENTAL><LICEXELIC>2018</LICEXELIC><DATAEMISSAOCRV>18/03/2014</DATAEMISSAOCRV><CCOMUNICACAOVENDA>NAO CONSTA COMUNICACAO DE VENDAS </CCOMUNICACAOVENDA><CCOMUNICINCLUSAO></CCOMUNICINCLUSAO><TIPODOCCOMPRADOR></TIPODOCCOMPRADOR><CPFCNPJCOMPRADOR></CPFCNPJCOMPRADOR><DATAVENDA></DATAVENDA><NOTAFISCAL></NOTAFISCAL><PROTOCOLODETRAN></PROTOCOLODETRAN><INSPECAOANO/><INSPECAOCENTRO/><INSPECAODATA/><INSPECAOSELO/><INSPECAOSTATUS/><CODIGOFINANCEIRA></CODIGOFINANCEIRA><DATAINCLUSAOINTENCAOTROCAFINANCEIRA></DATAINCLUSAOINTENCAOTROCAFINANCEIRA><DATALIMITERESTRICAOTRIBUTARIA></DATALIMITERESTRICAOTRIBUTARIA><TEMPOEXECUCAO>4</TEMPOEXECUCAO></RETORNO></RESPOSTA>"\n      },\n      {\n        "_id": "XXXXXXXXXXXXXXXXXXXXXXXX",\n        "dataFound": false,\n        "serviceLog": "XXXXXXXXXXXXXXXXXXXXXXXX",\n        "rawData": "{\\"MensagemRetorno\\":\\"Não Retornou Dados\\",\\"StatusRetorno\\":\\"6\\",\\"ParametroPesquisa\\":\\"DMP5463\\",\\"TipoParametro\\":\\"Placa\\",\\"ObjetoRetorno\\":null}"\n      },\n      {\n        "_id": "XXXXXXXXXXXXXXXXXXXXXXXX",\n        "dataFound": false,\n        "serviceLog": "XXXXXXXXXXXXXXXXXXXXXXXX",\n        "rawData": "<?xml version=\\"1.0\\" encoding=\\"utf-8\\"?>\\r\\n<struct_RespostaRst xmlns:xsi=\\"http://www.w3.org/2001/XMLSchema-instance\\" xmlns:xsd=\\"http://www.w3.org/2001/XMLSchema\\" xmlns=\\"http://webservices.absolutasolucoes.com.br/absoluta/\\">\\r\\n  <Identificacao>\\r\\n    <NomeDaTransacao>1032 clsLeilao.InputVsRst</NomeDaTransacao>\\r\\n    <DescricaoDaTransacao>Retorna dados dos veiculos em formato string XML</DescricaoDaTransacao>\\r\\n    <VersaoDaTransacao>2.34</VersaoDaTransacao>\\r\\n    <DataDaPublicacao>2018-03-28T00:00:00</DataDaPublicacao>\\r\\n    <Autor>Absoluta Solucoes Ltda.</Autor>\\r\\n  </Identificacao>\\r\\n  <Controle>\\r\\n    <Cliente>ABSOLUTA</Cliente>\\r\\n    <Login>ABSOLUTA042</Login>\\r\\n    <PlacaDeEntrada>DMP5463</PlacaDeEntrada>\\r\\n    <ChassiDeEntrada>9BGXL68608C134866</ChassiDeEntrada>\\r\\n    <IPdoComputadorConsumidor>138.94.53.193</IPdoComputadorConsumidor>\\r\\n    <NomeDoComputadorProvedor>vma302</NomeDoComputadorProvedor>\\r\\n    <CodigoDeControle>0</CodigoDeControle>\\r\\n    <Severidade>e1_MensagemDeInformacaoSimples</Severidade>\\r\\n    <Descricao>Sucesso</Descricao>\\r\\n    <AcaoAdotada>e1_TrasacaoFoiExecutada</AcaoAdotada>\\r\\n    <ResultadoDaPesquisa>e2_RegistrosNaoForamLocalizados</ResultadoDaPesquisa>\\r\\n    <GravacaoDoLog>e1_TransacaoFoiLogada</GravacaoDoLog>\\r\\n    <DataExecucao>2018-07-30T23:28:45.7322545-03:00</DataExecucao>\\r\\n    <NrTransacao>57483192</NrTransacao>\\r\\n    <Observacao />\\r\\n  </Controle>\\r\\n</struct_RespostaRst>"\n      },\n      {\n        "_id": "XXXXXXXXXXXXXXXXXXXXXXXX",\n        "dataFound": true,\n        "serviceLog": "XXXXXXXXXXXXXXXXXXXXXXXX",\n        "rawData": "<?xml version=\\"1.0\\" encoding=\\"utf-8\\"?>\\r\\n<struct_RespostaRst xmlns:xsi=\\"http://www.w3.org/2001/XMLSchema-instance\\" xmlns:xsd=\\"http://www.w3.org/2001/XMLSchema\\" xmlns=\\"http://webservices.absolutasolucoes.com.br/absoluta/\\">\\r\\n  <Identificacao>\\r\\n    <NomeDaTransacao>1351 clsParecerTecnico.InputParecerTecnicoRst</NomeDaTransacao>\\r\\n    <DescricaoDaTransacao>Retorna os dados do Parecer Tecnico do veiculo em formato XML.</DescricaoDaTransacao>\\r\\n    <VersaoDaTransacao>1.1</VersaoDaTransacao>\\r\\n    <DataDaPublicacao>2017-11-28T00:00:00</DataDaPublicacao>\\r\\n    <Autor>Absoluta Solucoes Ltda.</Autor>\\r\\n  </Identificacao>\\r\\n  <Controle>\\r\\n    <Cliente>ABSOLUTA</Cliente>\\r\\n    <Login>ABSOLUTA042</Login>\\r\\n    <PlacaDeEntrada>DMP5463</PlacaDeEntrada>\\r\\n    <ChassiDeEntrada>9BGXL68608C134866</ChassiDeEntrada>\\r\\n    <IPdoComputadorConsumidor>138.94.53.193</IPdoComputadorConsumidor>\\r\\n    <NomeDoComputadorProvedor>VMA202</NomeDoComputadorProvedor>\\r\\n    <CodigoDeControle>0</CodigoDeControle>\\r\\n    <Severidade>e1_MensagemDeInformacaoSimples</Severidade>\\r\\n    <Descricao>Sucesso</Descricao>\\r\\n    <AcaoAdotada>e1_TransacaoFoiExecutada</AcaoAdotada>\\r\\n    <ResultadoDaPesquisa>e1_RegistrosForamLocalizados</ResultadoDaPesquisa>\\r\\n    <GravacaoDoLog>e1_TransacaoFoiLogada</GravacaoDoLog>\\r\\n    <DataExecucao>2018-07-30T23:28:46.31097-03:00</DataExecucao>\\r\\n    <NrTransacao>1895499</NrTransacao>\\r\\n    <Observacao />\\r\\n  </Controle>\\r\\n  <Resposta>\\r\\n    <ParecerTecnico>1</ParecerTecnico>\\r\\n    <Semaforo>verde</Semaforo>\\r\\n    <Imagem>http://images.absolutasolucoes.com.br/fotos/01.jpg</Imagem>\\r\\n  </Resposta>\\r\\n</struct_RespostaRst>"\n      },\n      {\n        "_id": "XXXXXXXXXXXXXXXXXXXXXXXX",\n        "dataFound": true,\n        "serviceLog": "XXXXXXXXXXXXXXXXXXXXXXXX",\n        "rawData": {\n          "OKIntegradorResult": {\n            "checkok": {\n              "dados_consulta": {\n                "codigo_consulta": "000000",\n                "tipo_consulta": "Veículo Sinistro Checktudo",\n                "data_consulta": "30/07/2018",\n                "hora_consulta": "23:28:46",\n                "placa": "XXX0000"\n              },\n              "Acidentes": {\n                "DataHoraConsulta": "30/07/201823:28:46",\n                "CodigoRetorno": "0",\n                "DescricaoRetorno": "SISTEMA INDISPONIVEL TEMPORARIAMENTE",\n                "DataRegistroSinistro": "-"\n              }\n            }\n          }\n        }\n      }\n    ],\n    "responseJSON": {\n      "_id": "XXXXXXXXXXXXXXXXXXXXXXXX",\n      "__v": 1,\n      "dtAtualizacao": "Tue Mar 18 2014 00:00:00 GMT-0300 (Hora oficial do Brasil)",\n      "codigoMunicipio": "6361",\n      "leilao": {\n        "DescricaoRetorno": "NENHUMA OCORRENCIA ENCONTRADA"\n      },\n      "analiseRisco": {\n        "indiceRisco": "1",\n        "parecer": "NÃO FOI ENCONTRADO RISCO 😃"\n      },\n      "historicoProprietarios2": [],\n      "rouboFurto": {\n        "historico": [],\n        "municipioEmplacamento": null,\n        "indicadorProcedencia": null,\n        "constaOcorrencia": false\n      },\n      "indicioSinistro": {\n        "classificacao": null,\n        "descricao": "NÃO CONSTA INDÍCIO DE SINISTRO PARA O VEÍCULO INFORMADO 😃"\n      },\n      "perdaTotal": {\n        "dataProtocolo": null,\n        "dataOcorrencia": "-",\n        "protocolo": null,\n        "descricao": "SISTEMA INDISPONIVEL TEMPORARIAMENTE"\n      },\n      "baseEstadual": {\n        "combustivel": "ALCOOL/GASOLINA",\n        "tipoDocProprietario": "FISICA",\n        "motor": "X00000000",\n        "categoria": "PARTICULAR",\n        "especie": "PASSAGEIRO",\n        "cor": "PRATA",\n        "situacaoVeiculo": "CIRCULACAO",\n        "codigoFinanceira": "",\n        "dataLimiteRestricaoTributaria": "",\n        "dataInclusaoIntencaoTrocaFinanceira": "",\n        "inspecaoStatus": "",\n        "inspecaoSelo": "",\n        "inspecaoData": "",\n        "inspecaoCentro": "",\n        "inspecaoAno": "",\n        "protocoloDetran": "",\n        "notaFiscal": "",\n        "dataVenda": "",\n        "docComprador": "",\n        "tipoDocComprador": "",\n        "comunicacaoInclusao": "",\n        "comunicacaoVenda": "NAO CONSTA COMUNICACAO DE VENDAS ",\n        "dataEmissaoCrv": "18/03/2014",\n        "exercicioLicenciamento": "2018",\n        "outrasRestricoes4": "NADA CONSTA",\n        "outrasRestricoes3": "NADA CONSTA",\n        "outrasRestricoes2": "NADA CONSTA",\n        "outrasRestricoes1": "NADA CONSTA",\n        "restricaoAmbiental": "veiculo com inspecao veicular ok",\n        "restricaoRenajud": "NADA CONSTA",\n        "restricaoTributaria": "NADA CONSTA",\n        "restricaoJudicial": "NADA CONSTA",\n        "restricaoAdminisrativa": "NADA CONSTA",\n        "restricaoGuincho": "NADA CONSTA",\n        "restricaoRouboFurto": "NADA CONSTA",\n        "debitoPoliciaRodoviariaFederal": "0,00",\n        "debitoMunicipais": "0,00",\n        "debitoRenainf": "0,00",\n        "debitoCetesb": "0,00",\n        "debitoDetran": "0,00",\n        "debitoDer": "0,00",\n        "debitoDersa": "0,00",\n        "debitoDpvat": "0,00",\n        "debitoMultas": "0,00",\n        "debitoLicenciamento": "0,00",\n        "debitoIpva": "0,00",\n        "existeDebitoDpvat": "NAO EXISTE DEBITO DE DPVAT",\n        "existeDebitoLicenciamento": "NAO EXISTE DEBITO DE LICENCIAMENTO",\n        "existeDebitoMulta": "NAO EXISTE DEBITO DE MULTA",\n        "existeDebitoIpva": "NAO EXISTE DEBITO DE IPVA",\n        "restricaoDataInclusao": "",\n        "restricaoArrendatario": "",\n        "restricaoNomeAgente": "",\n        "restricaoFinanceira": "NADA CONSTA",\n        "licdata": "22/01/2018",\n        "intencaoDocFinanceira": "",\n        "intencaoDataInslusao": "",\n        "intencaoNomeFinanceira": "",\n        "intencaoNomeAgente": "",\n        "intencaoRestricaoFinanceira": "",\n        "restricaoDocArrendatario": "",\n        "pronomeAnterior": "XXXXXXXXXXXX",\n        "pronome": "00000000000 XXXXXXXXXXXXXXXXXXX",\n        "dataVigenciaContratoFinanceira": "",\n        "codigoAgenteFinanceiro": "",\n        "numContratoFinanceira": "",\n        "tipoMarcacaoChassi": "NORMAL",\n        "renavam": "00000000",\n        "chassi": "XXXXXXXXXXXXXXXX",\n        "placa": "XXX0000"\n      },\n      "baseNacional": {\n        "anoFabricacao": "0000",\n        "anoModelo": "0000",\n        "renavam": "00000000",\n        "chassi": "XXXXXXXXXXXXXXXX",\n        "placa": "DMP5463",\n        "docFaturado": "00000000",\n        "di": "00000000",\n        "tipoDocImportadora": null,\n        "ufFaturado": "SP",\n        "tipoDocFaturado": "JURIDICA",\n        "uf": "SP",\n        "municipio": "COTIA",\n        "situacaoVeiculo": "CIRCULACAO",\n        "tipoVeiculo": "AUTOMOVEL",\n        "especieVeiculo": "PASSAGEIRO",\n        "restricao4": "NADA CONSTA",\n        "restricao3": "NADA CONSTA",\n        "restricao2": "NADA CONSTA",\n        "restricao1": "NADA CONSTA",\n        "dtUltimaAtualizacao": "18/03/2014",\n        "docProprietario": "00000000",\n        "combustivel": "ALCOOL/GASOLINA",\n        "tipoDocProprietario": null,\n        "motor": "X00000000",\n        "categoria": "PARTICULAR",\n        "especie": "PRATA",\n        "cor": "PRATA",\n        "outrasRestricoes8": "NADA CONSTA",\n        "outrasRestricoes7": "NADA CONSTA",\n        "outrasRestricoes6": "NADA CONSTA",\n        "outrasRestricoes5": "NADA CONSTA",\n        "outrasRestricoes4": "NADA CONSTA",\n        "outrasRestricoes3": "NADA CONSTA",\n        "outrasRestricoes2": "NADA CONSTA",\n        "outrasRestricoes1": "NADA CONSTA",\n        "restricaoDataInclusao": "",\n        "restricaoFinanciamento": "",\n        "restricaoNomeAgente": "",\n        "restricaoFinanciadora": " NADA CONSTA ",\n        "restricaoTipoTransacao": "NADA CONSTA",\n        "indicadorRestricaoRenajud": "NAO",\n        "indicadorComunicacaoVendas": "NAO",\n        "ocorrencia": "VEICULO NAO INDICA OCORRENCIA DE ROUBO/FURTO",\n        "tipoMarcacaoChassi": "NORMAL"\n      },\n      "ocorrencia": null,\n      "municipioEmplacamento": null,\n      "capacidadePassageiro": "5",\n      "procedencia": "NACIONAL",\n      "categoria": "PARTICULAR",\n      "ufFaturado": "SP",\n      "tipoDocFaturado": "JURIDICA",\n      "docFaturado": "00000000",\n      "tipoDocProprietario": "FISICA",\n      "docProprietario": "00000000",\n      "situacaoVeiculo": "S",\n      "pesoBrutoTotal": "0",\n      "capMaxTracao": "210",\n      "cilindradas": "1000",\n      "limiteRestricaoTrib": "",\n      "dtUltimaAtualizacao": "18/03/2014",\n      "unidadeLocalSRF": "0000000",\n      "registroDi": "",\n      "di": "00000000",\n      "identImportadora": "",\n      "tipoDocImportadora": "",\n      "tipoMontagem": "COMPLETA",\n      "eixos": "0",\n      "situacaoChassi": "N",\n      "qtdPax": "5",\n      "corVeiculo": "Prata",\n      "tipoCarroceria": "INEXISTENTE",\n      "especieVeiculo": "Passageiro",\n      "tipoVeiculo": "Automovel",\n      "numTerceiroEixo": "",\n      "numMotor": "00000000",\n      "eixoTraseiroDif": "",\n      "caixaCambio": "00000000",\n      "numCarroceria": "000",\n      "linha": "00000000",\n      "nacionalidade": "Nacional",\n      "capacidadeCarga": "0",\n      "potencia": "79",\n      "combustivel": "Álcool / Gasolina",\n      "codigoCombustivel": "16",\n      "marcaModelo": "XX/XXXXX XXX",\n      "codigoMarcaModelo": "000000",\n      "municipio": "COTIA-SP",\n      "anoModelo": "0000",\n      "anoFabricacao": "0000",\n      "numFaturado": "00000000",\n      "ultimaDataInclusao": null,\n      "km": 0,\n      "historicoKm": [],\n      "cidade": null,\n      "uf": "SP",\n      "renavam": "00000000",\n      "placa": "XXX0000",\n      "chassi": "00000000",\n      "createAt": "2018-01-11T03:21:11.978Z"\n    },\n    "refClass": "Veiculo Basico",\n    "keys": {\n      "cnpj": null,\n      "cpf": "00000000000",\n      "uf": null,\n      "renavam": "00000000",\n      "motor": "X00000000000",\n      "chassi": "00000000",\n      "placa": "XXX0000"\n    },\n    "documentType": "PLACA",\n    "documentQuery": "XXX0000",\n    "user": {\n      "_id": "XXXXXXXXXXXX",\n      "name": "XXXXXXXXXXXX",\n      "email": "XXXXXXXXXXXX",\n      "__v": 0,\n      "hierarchy": {\n        "owner": null\n      },\n      "company": {\n        "socialName": "teste",\n        "cnpj": null\n      },\n      "generalData": {\n        "birthDate": "1992-03-05T03:00:00.000Z",\n        "phoneNumber2": "00000000000",\n        "phoneNumber1": "00000000000",\n        "address": {\n          "number": "00",\n          "complement": "XXXX",\n          "street": "XXXXXXXXXXXX",\n          "neighborhood": "XXXXXXXXXXXX",\n          "state": "SP",\n          "city": "XXXXXXXXXXXX",\n          "zipcode": "00000000"\n        }\n      },\n      "security": {\n        "blacklist": [],\n        "whitelist": []\n      },\n      "google": {\n        "email": "",\n        "name": "XXXXXXXXXXX",\n        "token": "XXXXXXXXXXXXX",\n        "id": "00000000"\n      },\n      "facebook": {\n        "email": null,\n        "name": null,\n        "token": null,\n        "id": null\n      },\n      "status": true,\n      "createAt": "2018-03-06T21:38:56.483Z",\n      "lastLogin": "2018-07-31T12:12:50.485Z",\n      "type": 1,\n      "billing": "XXXXXXXXXXXX",\n      "cpf": "00000000"\n    },\n    "createAt": "2018-07-31T02:28:33.459Z"\n  }\n}',
                        type: 'json',
                    },
                ],
            },
            description:
                '<p>O parâmetro QUERY_ID deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br> <b>EX:  /api/query/by-id/&lt;QUERY_ID&gt;</b> <br>A diferença maior desta requisição para a requisição /api/query/:queryid consiste em que o retorno para essa requisição, traz o objeto de consulta com todos os dados disponíveis.</p>',
            filename: 'apidoc/query/apidoc_getQueryByID.js',
            groupTitle: 'Consultas',
        },
        {
            type: 'get',
            url: '/api/query/:queryid',
            title: 'Buscar Consulta por ID (Simplificada)',
            version: '0.2.0',
            name: 'GetQueryId',
            group: 'Consultas',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            success: {
                fields: {
                    'Success 200': [
                        {
                            group: 'Success 200',
                            type: 'String',
                            optional: false,
                            field: 'queryid',
                            description: '<p>ID da consulta.</p>',
                        },
                    ],
                },
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            '{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": {\n    "headerInfos": {\n      "queryid": "XXXXXXXX",\n      "name": "Agregados",\n      "date": "2018-03-08T22:10:58.421Z"\n    },\n    "data": {\n      "chassi": "XXXXXXXX",\n      "placa": "XXXXXXXX",\n      "renavam": "XXXXXXXX",\n      "uf": "SP",\n      "cidade": "XXXXXXXX",\n      "numFaturado": "03470727001607",\n      "anoFabricacao": "2011",\n      "anoModelo": "2012",\n      "municipio": "SAO PAULO",\n      "codigoMarcaModelo": "XXXXXXXX",\n      "marcaModelo": "XXXXXXXX",\n      "codigoCombustivel": "16",\n      "combustivel": "XXXXXXXX / XXXXXXXX",\n      "potencia": "148",\n      "capacidadeCarga": "0",\n      "nacionalidade": "XXXXXXXX",\n      "linha": "XXXXXXXX",\n      "numCarroceria": null,\n      "caixaCambio": null,\n      "eixoTraseiroDif": null,\n      "numMotor": null,\n      "numTerceiroEixo": null,\n      "tipoDocFaturado": "XXXXXXXX",\n      "ufFaturado": "XXXXXXXX",\n      "tipoDocProprietario": "XXXXXXXX",\n      "tipoVeiculo": "XXXXXXXX",\n      "especieVeiculo": "Passageiro",\n      "tipoCarroceria": "NAO APLICAVEL",\n      "corVeiculo": "XXXXXXXX",\n      "qtdPax": "5",\n      "situacaoChassi": "N",\n      "eixos": "2",\n      "tipoMontagem": "1",\n      "tipoDocImportadora": null,\n      "identImportadora": null,\n      "di": "XXXXXXXX",\n      "registroDi": null,\n      "unidadeLocalSRF": "XXXXXXXX",\n      "dtUltimaAtualizacao": "2012-03-15T03:00:00.000Z",\n      "restricao1": "SEM RESTRICAO",\n      "restricao2": "SEM RESTRICAO",\n      "restricao3": "SEM RESTRICAO",\n      "restricao4": "SEM RESTRICAO",\n      "limiteRestricaoTrib": null,\n      "cilindradas": "1999",\n      "capMaxTracao": "237",\n      "pesoBrutoTotal": "177",\n      "situacaoVeiculo": "S",\n      "__v": 0,\n      "dtAtualizacao": "2013-03-28T03:00:00.000Z",\n      "codigoMunicipio": "XXXXXXXX"\n    },\n    "servicesBroken": [],\n  }\n}',
                        type: 'json',
                    },
                ],
            },
            description:
                '<p>O parâmetro QUERY_ID deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br> <b>EX:  /api/query/&lt;QUERY_ID&gt;</b> <br> A diferença maior desta requisição para a requisição /api/query/json-response/:queryid consiste em que o retorno para essa requisição, traz exatamente o mesmo template retornado na requisição de execução de uma consulta.</p>',
            filename: 'apidoc/query/apidoc_getQueryID.js',
            groupTitle: 'Consultas',
        },
        {
            type: 'get',
            url: '/api/query/synthetic-history/:userid',
            title: 'Buscar Histórico Sintético de Consultas',
            version: '0.2.0',
            name: 'GetSyntheticHistory',
            group: 'Consultas',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            success: {
                fields: {
                    'Success 200': [
                        {
                            group: 'Success 200',
                            type: 'String',
                            optional: false,
                            field: 'userid',
                            description: '<p>ID do usuário</p>',
                        },
                    ],
                },
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            '{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": [\n    {\n      "_id": {\n        "refClass": "Agregados"\n      },\n      "totalQueries": 3\n    },\n    {\n      "_id": {\n        "refClass": "Renajud"\n      },\n      "totalQueries": 1\n    }\n  ],\n}',
                        type: 'json',
                    },
                ],
            },
            description:
                '<p>O parâmetro USER_ID deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br> <b>EX:  /api/query/synthetic-history/&lt;USER_ID&gt;</b> <br> Esta requisição terá como retorno o resumo das operações do usuário. Categorizado por tipos e total de consultas realizadas para cada tipo de consulta.</p>',
            filename: 'apidoc/query/apidoc_getSyntheticHistory.js',
            groupTitle: 'Consultas',
        },
        {
            type: 'get',
            url: '/api/query/statement-childrens/:userid',
            title: 'Histórico de consulta de Clientes Filhos',
            version: '0.3.0',
            name: 'StatementChildrens',
            group: 'Consultas',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'userid',
                            description: '<p>ID do cliente mãe</p>',
                        },
                    ],
                },
            },
            description:
                '<p>O parâmetro USER_ID deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br> <b>EX:  /api/query/statement-childrens/&lt;USER_ID&gt;</b> <br>Mostra o histórico das consultas realizadas pelos filhos do id mãe escolhido.</p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n   "status":{\n      "cod":200,\n      "msg":"ok"\n   },\n   "body":[\n      {\n         "_id":"xxxxx364400xxxxx80cxxxxxxxxxxb",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-29T14:36:48.866Z"\n      },\n      {\n         "_id":"xxxxx3642a927xxxxx52471ef0xxxxx",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-29T14:31:05.249Z"\n      },\n      {\n         "_id":"xxxxx3641482182fa51xxxxxdac014",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-29T14:25:12.489Z"\n      },\n      {\n         "_id":"xxxxx363dxxxxx182fa51xxxxxdac00c",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-29T14:11:10.611Z"\n      },\n      {\n         "_id":"xxxxx363c9xxxxx49530521a4bf64e",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-29T14:05:12.663Z"\n      },\n      {\n         "_id":"xxxxx363c602182fa51xxxxxdac004",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-29T14:04:16.139Z"\n      },\n      {\n         "_id":"xxxxx363b0974f9775212e1f07b",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-29T13:58:33.892Z"\n      },\n      {\n         "_id":"xxxxx3639d0xxxxx80cxxxxxbfe",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-29T13:53:20.813Z"\n      },\n      {\n         "_id":"xxxxx36388xxxxx1c08451d370e877",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-29T13:47:52.514Z"\n      },\n      {\n         "_id":"xxxxx3637736ed2da51be57a789",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-29T13:43:15.926Z"\n      },\n      {\n         "_id":"xxxxx36343ab49530521a4bf625",\n         "log":null,\n         "status":true,\n         "refClass":"Historico de Proprietarios",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-29T13:29:30.215Z"\n      },\n      {\n         "_id":"xxxxx363209xxxxx80cxxxxxbf4",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-29T13:20:09.963Z"\n      },\n      {\n         "_id":"xxxxx36315c27xxxxx52471ef04d",\n         "log":null,\n         "status":true,\n         "refClass":"Gravame Simples",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-29T13:17:16.062Z"\n      },\n      {\n         "_id":"xxxxx3630a4xxxxx80cxxxxxbec",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-29T13:14:12.164Z"\n      },\n      {\n         "_id":"xxxxx3555986axxxxx7cxxxxx7a764",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-28T21:39:36.845Z"\n      },\n      {\n         "_id":"xxxxx35530b48xxxxx7be8970ba",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-28T21:28:43.399Z"\n      },\n      {\n         "_id":"xxxxx354f6376efxxxxx173986686e",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-28T21:13:07.951Z"\n      },\n      {\n         "_id":"xxxxx354bc7c61xxxxx886aea13",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-28T20:57:43.447Z"\n      },\n      {\n         "_id":"xxxxx354xxxxx96bxxxxx1762c80839",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-28T20:48:57.678Z"\n      },\n      {\n         "_id":"xxxxx35476b98f3d1xxxxx196cc",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-28T20:39:07.407Z"\n      },\n      {\n         "_id":"xxxxx35303f11ecxxxxx4d4401a4",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-28T19:00:15.851Z"\n      },\n      {\n         "_id":"xxxxx352c9a6bxxxxx1762c807af",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-28T18:44:42.xxxxxZ"\n      },\n      {\n         "_id":"xxxxx3527xxxxx76efxxxxx17398667e2",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-28T18:22:55.409Z"\n      },\n      {\n         "_id":"xxxxx35251b4ddae417a3d932de",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-28T18:12:43.822Z"\n      },\n      {\n         "_id":"xxxxx350c8f98f3d1xxxxx195ca",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-28T16:27:59.289Z"\n      },\n      {\n         "_id":"xxxxx350c0c6bxxxxx1762c8076f",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-28T16:25:48.708Z"\n      },\n      {\n         "_id":"xxxxx34f0124ddae417a3d9329f",\n         "log":null,\n         "status":true,\n         "refClass":"Gravame Simples",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-28T14:26:26.647Z"\n      },\n      {\n         "_id":"xxxxx34e8fc48xxxxx7be897013",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-28T13:56:12.152Z"\n      },\n      {\n         "_id":"xxxxx32aa136bxxxxx1762c8xxxxxd",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-26T21:03:15.976Z"\n      },\n      {\n         "_id":"xxxxx32a8cc4ddae417a3d93194",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-26T20:57:48.851Z"\n      },\n      {\n         "_id":"xxxxx32a6106bxxxxx1762c8xxxxx3",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-26T20:46:08.548Z"\n      },\n      {\n         "_id":"xxxxx32a3dac61xxxxx886ae849",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-26T20:36:42.625Z"\n      },\n      {\n         "_id":"xxxxx32a3126bxxxxx1762c805eb",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-26T20:33:22.541Z"\n      },\n      {\n         "_id":"xxxxx32a0a76bxxxxx1762c805e1",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-26T20:23:03.849Z"\n      },\n      {\n         "_id":"xxxxx329dcf48xxxxx7be896f53",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-26T20:10:55.812Z"\n      },\n      {\n         "_id":"xxxxx32xxxxxf176efxxxxx1739866xxxxx0",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-26T20:02:57.895Z"\n      },\n      {\n         "_id":"xxxxx3299994ddae417a3d93187",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-26T19:52:57.917Z"\n      },\n      {\n         "_id":"xxxxx3297bbc61xxxxx886ae82f",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-26T19:44:59.281Z"\n      },\n      {\n         "_id":"xxxxx32939576efxxxxx1739866594",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-26T19:27:17.054Z"\n      },\n      {\n         "_id":"xxxxx3290xxxxx8f3d1xxxxx194aa",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-26T19:13:07.096Z"\n      },\n      {\n         "_id":"xxxxx328cf26bxxxxx1762c805d9",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-26T18:58:58.771Z"\n      },\n      {\n         "_id":"xxxxx328ab211ecxxxxx4d440057",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-26T18:49:22.282Z"\n      },\n      {\n         "_id":"xxxxx3288336axxxxx7cxxxxx7a54d",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-26T18:38:43.369Z"\n      },\n      {\n         "_id":"xxxxx32835298f3d1xxxxx1949e",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-26T18:17:54.015Z"\n      },\n      {\n         "_id":"xxxxx325a4111ecxxxxx4d43ffd7",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-26T15:22:41.734Z"\n      },\n      {\n         "_id":"xxxxx324f5xxxxx1ecxxxxx4d43ff7a",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-26T14:36:12.901Z"\n      },\n      {\n         "_id":"xxxxx32369f11ecxxxxx4d43ff48",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-26T12:50:39.349Z"\n      },\n      {\n         "_id":"xxxxx323652c61xxxxx886ae7xxxxx",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-26T12:49:22.917Z"\n      },\n      {\n         "_id":"xxxxx32364276efxxxxx17398663cc",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-26T12:49:06.938Z"\n      },\n      {\n         "_id":"xxxxx3235a311ecxxxxx4d43ff3f",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-26T12:46:27.018Z"\n      },\n      {\n         "_id":"xxxxx31xxxxx0daxxxxx38cxxxxx6cfa1",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-25T15:31:28.915Z"\n      },\n      {\n         "_id":"xxxxx3103814622fd385fe4d538",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-25T15:00:17.097Z"\n      },\n      {\n         "_id":"xxxxx30xxxxx27xxxxx2386xxxca7",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-25T14:37:22.824Z"\n      },\n      {\n         "_id":"xxxxx30fb09daxxxxx38cxxxxx6cf96",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-25T14:24:09.747Z"\n      },\n      {\n         "_id":"xxxxx30f954df9d1f391215f582",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-25T14:16:52.806Z"\n      },\n      {\n         "_id":"xxxxx30f2cxxxxxxxxxx90bb502b9",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-25T13:48:57.257Z"\n      },\n      {\n         "_id":"xxxxx30f2964622fd385fe4d513",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-25T13:48:06.877Z"\n      },\n      {\n         "_id":"xxxxx30f041daxxxxx38cxxxxx6cf62",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-25T13:38:09.396Z"\n      },\n      {\n         "_id":"xxxxx30eba7bxxxad38cexxxxx63f3",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-25T13:18:31.387Z"\n      },\n      {\n         "_id":"xxxxx30d21d4105xxxxx7b15a1",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-25T11:29:33.995Z"\n      },\n      {\n         "_id":"xxxxx2bf1fd3a7axxxx93499e",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-21T18:44:13.425Z"\n      },\n      {\n         "_id":"xxxxx2bf17d6acxxxxxfa1be6c",\n         "log":null,\n         "status":true,\n         "refClass":"Historico de Proprietarios",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-21T18:42:05.600Z"\n      },\n      {\n         "_id":"xxxxx2bdd3xxxxxec2exxxxx3736",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-21T17:15:29.989Z"\n      },\n      {\n         "_id":"xxxxx2bdxxxxxc92ec2exxxxx3729",\n         "log":null,\n         "status":true,\n         "refClass":"Historico de Proprietarios",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-21T17:14:53.963Z"\n      },\n      {\n         "_id":"xxxxx2b95xxxxxa4b2exxxxx912",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-21T12:08:26.035Z"\n      },\n      {\n         "_id":"xxxxx2aa38xxxxxe43dxxxxxcxxxxxbe030",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-20T18:57:05.398Z"\n      },\n      {\n         "_id":"xxxxx2a51xxxxxbcbcxxxxxd3927052",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-20T13:08:34.961Z"\n      },\n      {\n         "_id":"xxxxx2a3xxxxxa14ffxxxxx6e53da2c",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-20T11:28:45.870Z"\n      },\n      {\n         "_id":"xxxxx2944ca9a12bc3ece146xxxxxa",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-19T18:00:42.464Z"\n      },\n      {\n         "_id":"xxxxx291b938xxxxxebc3eb0852bxxxxx",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-19T15:04:51.293Z"\n      },\n      {\n         "_id":"xxxxx23cdf602e2657270xxxxx5493",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-15T14:32:22.459Z"\n      },\n      {\n         "_id":"xxxxx22b0cf6e94432a6497efa6",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-14T18:15:43.068Z"\n      },\n      {\n         "_id":"xxxxx201xxxxx8c52dbxxxxx6e19",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-12T18:52:01.335Z"\n      },\n      {\n         "_id":"xxxxx1fe88826ec6c65e7b3b765",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-12T15:36:40.547Z"\n      },\n      {\n         "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-12T12:46:47.773Z"\n      },\n      {\n         "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-12T12:38:41.284Z"\n      },\n      {\n         "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-12T12:29:00.976Z"\n      },\n      {\n         "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-12T12:05:19.722Z"\n      },\n      {\n         "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-12T11:56:27.951Z"\n      },\n      {\n         "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-12T11:31:32.319Z"\n      },\n      {\n         "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-12T11:29:12.018Z"\n      },\n      {\n         "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n         "log":null,\n         "status":true,\n         "refClass":"Historico de Proprietarios",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-12T11:22:08.239Z"\n      },\n      {\n         "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-11T19:15:30.900Z"\n      },\n      {\n         "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-11T18:59:02.980Z"\n      },\n      {\n         "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-11T18:44:53.889Z"\n      },\n      {\n         "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-11T18:30:16.361Z"\n      },\n      {\n         "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-11T18:06:36.624Z"\n      },\n      {\n         "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-11T17:54:00.577Z"\n      },\n      {\n         "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-11T17:52:05.804Z"\n      },\n      {\n         "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-11T17:42:55.498Z"\n      },\n      {\n         "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-11T15:49:47.199Z"\n      },\n      {\n         "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-11T13:51:53.585Z"\n      },\n      {\n         "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-11T11:51:45.682Z"\n      },\n      {\n         "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-06T12:06:59.569Z"\n      },\n      {\n         "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n         "log":null,\n         "status":true,\n         "refClass":"Dados Cadastrais do Veiculo",\n         "documentType":null,\n         "documentQuery":null,\n         "user":{\n            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",\n            "email":"documentos.juridico@maccobrancas.com.br",\n            "name":"Maria Do Carmo Alves"\n         },\n         "createAt":"2018-06-01T18:43:25.281Z"\n      }\n   ]\n}',
                        type: 'json',
                    },
                ],
            },
            error: {
                examples: [
                    {
                        title: 'Error-Response:',
                        content:
                            'HTTP/1.1 500 Invalid-Parameters\n{\n   "InternalServerError":"Ops... Algo deu errado! Perdoe-nos pelo inconveniênte. Estamos analisando o problema que causou intermitência nessa requisição, aguarde...",\n   "code":500\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/query/apidoc_statementChildrens.js',
            groupTitle: 'Consultas',
        },
        {
            type: 'get',
            url: '/api/query/statement-childrens/report/:userid',
            title: 'Relatório das Consultas dos Clientes Filhos',
            version: '0.3.0',
            name: 'StatementChildrensReport',
            group: 'Consultas',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'userid',
                            description: '<p>ID do cliente mãe</p>',
                        },
                    ],
                },
            },
            description:
                '<p>O parâmetro USER_ID deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br> <b>EX:  /api/query/statement-childrens/report/&lt;USER_ID&gt;</b> <br>Faz o download em formato .xlsx(EXCEL) do histórico referente mês escolhido dos filhos desse id de cliente mãe  .</p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n   "status":{\n      "cod":200,\n      "msg":"ok"\n   },\n   "body": null\n}',
                        type: 'json',
                    },
                ],
            },
            error: {
                examples: [
                    {
                        title: 'Error-Response:',
                        content:
                            'HTTP/1.1 500 Invalid-Parameters\n{\n   "InternalServerError":"Ops... Algo deu errado! Perdoe-nos pelo inconveniênte. Estamos analisando o problema que causou intermitência nessa requisição, aguarde...",\n   "code":500\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/query/apidoc_statementChildrensReport.js',
            groupTitle: 'Consultas',
        },
        {
            type: 'get',
            url: '/api/person/doc/:doc',
            title: 'Consultar Documento',
            version: '0.2.0',
            name: 'DocumentInformationQuery',
            group: 'Consultas_PF_PJ',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'documento',
                            description: '<p>do usuário</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'querycode',
                            description:
                                '<p>Código da consulta a ser realizada. Os códigos de consultas disponíveis podem ser encontrados na requisição (#Consultas:GetEnablesQueries).</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'Object',
                            optional: false,
                            field: 'keys',
                            description:
                                '<p>Chaves para realização da consulta</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'keys.cpf',
                            description:
                                '<p>O CPF para realização da consulta de pessoa física</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'keys.cnpj',
                            description:
                                '<p>O CPNJ para realização da consulta de pessoa jurídica</p>',
                        },
                    ],
                },
                examples: [
                    {
                        title: 'Request-Example:',
                        content:
                            '{\n  "querycode":1,\n  "keys" : {\n    "cpf" : "00000000000000"\n  }\n}',
                        type: 'json',
                    },
                    {
                        title: 'Request-Example:',
                        content:
                            '{\n  "querycode":1,\n  "keys" : {\n    "cnpj" : "000000000000 "\n  }\n}',
                        type: 'json',
                    },
                ],
            },
            description:
                '<p>O parâmetro USER_ID deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br> <b>EX: /api/person/doc/<DOC CONSULT_ID></b></p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": {\n    "_id": "XXXXXXXXXX",\n    "__v": 0,\n    "cadastroCompleto": {\n      "_id": "XXXXXXXXXX",\n      "__v": 0,\n      "informacoesAdicionais": {\n        "telefones": {\n          "telefone": [\n            {\n              "ddd": "99",\n              "numero": "991594650"\n            }\n          ]\n        },\n        "enderecos": {\n          "endereco": [\n            {\n              "tipo_logradouro": "AV",\n              "logradouro": "ITABERABA",\n              "numero": "2217",\n              "cep": "02739000",\n              "bairro": "ITABERABA",\n              "cidade": "SAO PAULO",\n              "estado": "SP"\n            }\n          ]\n        }\n      },\n      "informacoesComplementares": {\n        "moradores": {\n          "moradores2": {\n            "nome": "ONOFRA ALVES LUZ",\n            "cpf": "XXXXXXXXXX"\n          },\n          "moradores1": {\n            "nome": "CREOSOLY PEREIRA DE ALMEIDA",\n            "cpf": "XXXXXXXXXX"\n          },\n          "moradores0": {\n            "nome": "IGNEZ MARTINS DE ALMEIDA",\n            "cpf": "XXXXXXXXXX"\n          }\n        },\n        "nomemae": "SILVANA MARTINS DE ALMEIDA"\n      },\n      "participacaoSocietaria": {\n        "participacao": [\n          {\n            "cnpj": "XXXXXXXXXX",\n            "documento": "XXXXXXXXXX",\n            "razao_social": "YAGO DE ALMEIDA TEIXEIRA",\n            "data_entrada": "28/02/2014",\n            "porcentagem": "10"\n          }\n        ]\n      },\n      "enderecoMoradores": {\n        "REGISTRO_3": {\n          "NOME": "ONOFRA ALVES LUZ",\n          "CPF": "XXXXXXXXXX"\n        },\n        "REGISTRO_2": {\n          "NOME": "CREOSOLY PEREIRA DE ALMEIDA",\n          "CPF": "XXXXXXXXXX"\n        },\n        "REGISTRO_1": {\n          "NOME": "IGNEZ MARTINS DE ALMEIDA",\n          "CPF": "XXXXXXXXXX"\n        }\n      },\n      "personInformation": "XXXXXXXXXX"\n    },\n    "creditoSimples": {\n      "_id": "XXXXXXXXXXa",\n      "__v": 0,\n      "dataConsulta": "24-05-2018 16:31:02",\n      "restricao": "EXISTE RESTRICAO PARA O DOCUMENTO CONSULTADO",\n      "chequeSemFundoVarejo": {\n        "quantidade": null\n      },\n      "personInformation": "XXXXXXXXXX"\n    },\n    "restricaoTotal": null,\n    "pefinBvs": null,\n    "protesto": null,\n    "pefin": {\n      "_id": "XXXXXXXXXX1",\n      "__v": 3,\n      "detalhes": [\n        {\n          "_id": "XXXXXXXXXX2",\n          "valorPendencia": "1.285,61",\n          "tituloOcorrencia": "-",\n          "origem": "CAIXA ECONOMICA FEDERAL",\n          "dataOcorrencia": "12/05/2018",\n          "contrato": "08000000000000419502",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX3",\n          "valorPendencia": "1.058,21",\n          "tituloOcorrencia": "-",\n          "origem": "DROGARIA NISSEI",\n          "dataOcorrencia": "17/02/2018",\n          "contrato": "484773",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX4",\n          "valorPendencia": "278,63",\n          "tituloOcorrencia": "-",\n          "origem": "KRONA TUBOS E CONEXOES LTDA",\n          "dataOcorrencia": "26/12/2017",\n          "contrato": "3 0004824243",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX5",\n          "valorPendencia": "278,64",\n          "tituloOcorrencia": "-",\n          "origem": "KRONA TUBOS E CONEXOES LTDA",\n          "dataOcorrencia": "12/12/2017",\n          "contrato": "3 0004824242",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX6",\n          "valorPendencia": "437,61",\n          "tituloOcorrencia": "-",\n          "origem": "KRONA TUBOS E CONEXOES LTDA",\n          "dataOcorrencia": "11/12/2017",\n          "contrato": "3 0004794753",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX7",\n          "valorPendencia": "278,64",\n          "tituloOcorrencia": "-",\n          "origem": "KRONA TUBOS E CONEXOES LTDA",\n          "dataOcorrencia": "28/11/2017",\n          "contrato": "3 0004824241",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX8",\n          "valorPendencia": "437,62",\n          "tituloOcorrencia": "-",\n          "origem": "KRONA TUBOS E CONEXOES LTDA",\n          "dataOcorrencia": "27/11/2017",\n          "contrato": "3 0004794752",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX9",\n          "valorPendencia": "437,62",\n          "tituloOcorrencia": "-",\n          "origem": "KRONA TUBOS E CONEXOES LTDA",\n          "dataOcorrencia": "13/11/2017",\n          "contrato": "3 0004794751",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXa",\n          "valorPendencia": "129,79",\n          "tituloOcorrencia": "-",\n          "origem": "LOCALIZA RENT A CAR S/A",\n          "dataOcorrencia": "12/04/2018",\n          "contrato": "AGMTZ 2175958",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXb",\n          "valorPendencia": "1.031,83",\n          "tituloOcorrencia": "-",\n          "origem": "DROGARIA NISSEI",\n          "dataOcorrencia": "17/01/2018",\n          "contrato": "482779",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXc",\n          "valorPendencia": "225,25",\n          "tituloOcorrencia": "-",\n          "origem": "MAURICIO SGAVIOLI ROCCHI",\n          "dataOcorrencia": "17/11/2017",\n          "contrato": "75071",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXd",\n          "valorPendencia": "833,77",\n          "tituloOcorrencia": "-",\n          "origem": "DROGARIA NISSEI",\n          "dataOcorrencia": "17/12/2017",\n          "contrato": "480782",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXe",\n          "valorPendencia": "585,09",\n          "tituloOcorrencia": "-",\n          "origem": "CAIXA ECONOMICA FEDERAL",\n          "dataOcorrencia": "20/02/2018",\n          "contrato": "XXXXXXXXXX",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXf",\n          "valorPendencia": "194,91",\n          "tituloOcorrencia": "-",\n          "origem": "LOCALIZA RENT A CAR S/A",\n          "dataOcorrencia": "28/03/2018",\n          "contrato": "AGMTZ 2153212",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX0",\n          "valorPendencia": "115,11",\n          "tituloOcorrencia": "-",\n          "origem": "EMBRATEL LD21 PF",\n          "dataOcorrencia": "10/01/2018",\n          "contrato": "E000000184909036",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX1",\n          "valorPendencia": "5.713,46",\n          "tituloOcorrencia": "-",\n          "origem": "CAIXA ECONOMICA FEDERAL",\n          "dataOcorrencia": "20/04/2018",\n          "contrato": "08000000000000125003",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX2",\n          "valorPendencia": "310,00",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "27/03/2018",\n          "contrato": "110186",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX3",\n          "valorPendencia": "773,94",\n          "tituloOcorrencia": "-",\n          "origem": "KALUNGA COM E IND GRAFICA LTDA",\n          "dataOcorrencia": "16/02/2018",\n          "contrato": "0201712180035003",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX4",\n          "valorPendencia": "162,50",\n          "tituloOcorrencia": "-",\n          "origem": "KALUNGA COM E IND GRAFICA LTDA",\n          "dataOcorrencia": "12/02/2018",\n          "contrato": "226671",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX5",\n          "valorPendencia": "480,00",\n          "tituloOcorrencia": "-",\n          "origem": "CC JAU ALUGUEL DE EQUIPAMENTOS",\n          "dataOcorrencia": "13/02/2018",\n          "contrato": "4046",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX6",\n          "valorPendencia": "1.240,00",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "15/03/2018",\n          "contrato": "110288",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX7",\n          "valorPendencia": "580,00",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "15/03/2018",\n          "contrato": "110079",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX8",\n          "valorPendencia": "290,00",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "15/03/2018",\n          "contrato": "110255",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX9",\n          "valorPendencia": "290,00",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "15/03/2018",\n          "contrato": "110081",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXa",\n          "valorPendencia": "1.815,00",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "15/03/2018",\n          "contrato": "110080",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXb",\n          "valorPendencia": "11.572,93",\n          "tituloOcorrencia": "-",\n          "origem": "CAIXA ECONOMICA FEDERAL",\n          "dataOcorrencia": "25/03/2018",\n          "contrato": "08000000000000123303",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXc",\n          "valorPendencia": "91,86",\n          "tituloOcorrencia": "-",\n          "origem": "KALUNGA COM E IND GRAFICA LTDA",\n          "dataOcorrencia": "01/02/2018",\n          "contrato": "0201801020035004",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXd",\n          "valorPendencia": "194,57",\n          "tituloOcorrencia": "-",\n          "origem": "LOCALIZA RENT A CAR S/A",\n          "dataOcorrencia": "22/02/2018",\n          "contrato": "AGMTZ 2112481",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXe",\n          "valorPendencia": "787,12",\n          "tituloOcorrencia": "-",\n          "origem": "SMART COMP SERV LTDA ME",\n          "dataOcorrencia": "15/02/2018",\n          "contrato": "10900002038",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXf",\n          "valorPendencia": "928,25",\n          "tituloOcorrencia": "-",\n          "origem": "SAINT GOBAIN DO BRASIL PRODUTOS",\n          "dataOcorrencia": "15/08/2017",\n          "contrato": "044706002",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX0",\n          "valorPendencia": "2.012,50",\n          "tituloOcorrencia": "-",\n          "origem": "SAINT GOBAIN DO BRASIL PRODUTOS",\n          "dataOcorrencia": "14/08/2017",\n          "contrato": "044655002",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX1",\n          "valorPendencia": "1.345,30",\n          "tituloOcorrencia": "-",\n          "origem": "SAINT GOBAIN DO BRASIL PRODUTOS",\n          "dataOcorrencia": "14/08/2017",\n          "contrato": "044658002",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX2",\n          "valorPendencia": "928,25",\n          "tituloOcorrencia": "-",\n          "origem": "SAINT GOBAIN DO BRASIL PRODUTOS",\n          "dataOcorrencia": "18/07/2017",\n          "contrato": "044706001",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX3",\n          "valorPendencia": "2.012,50",\n          "tituloOcorrencia": "-",\n          "origem": "SAINT GOBAIN DO BRASIL PRODUTOS",\n          "dataOcorrencia": "17/07/2017",\n          "contrato": "044655001",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX4",\n          "valorPendencia": "1.345,31",\n          "tituloOcorrencia": "-",\n          "origem": "SAINT GOBAIN DO BRASIL PRODUTOS",\n          "dataOcorrencia": "17/07/2017",\n          "contrato": "044658001",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX5",\n          "valorPendencia": "713,91",\n          "tituloOcorrencia": "-",\n          "origem": "BAURU CENTER COPIAS COM COP LTD",\n          "dataOcorrencia": "05/02/2018",\n          "contrato": "15717828443",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX6",\n          "valorPendencia": "773,95",\n          "tituloOcorrencia": "-",\n          "origem": "KALUNGA COM E IND GRAFICA LTDA",\n          "dataOcorrencia": "17/01/2018",\n          "contrato": "1344050344",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX7",\n          "valorPendencia": "2.305,49",\n          "tituloOcorrencia": "-",\n          "origem": "LOCALIZA RENT A CAR S/A",\n          "dataOcorrencia": "02/02/2018",\n          "contrato": "ACBAU 102920",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX8",\n          "valorPendencia": "620,00",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "27/01/2018",\n          "contrato": "108476",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX9",\n          "valorPendencia": "1.815,00",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "15/01/2018",\n          "contrato": "108462",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXa",\n          "valorPendencia": "580,00",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "15/01/2018",\n          "contrato": "108456",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXb",\n          "valorPendencia": "1.240,00",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "10/01/2018",\n          "contrato": "108913",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXc",\n          "valorPendencia": "290,00",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "10/01/2018",\n          "contrato": "108912",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXd",\n          "valorPendencia": "3.286,70",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "05/01/2018",\n          "contrato": "3364",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXe",\n          "valorPendencia": "293,16",\n          "tituloOcorrencia": "-",\n          "origem": "LOCALIZA RENT A CAR S/A",\n          "dataOcorrencia": "25/01/2018",\n          "contrato": "AGMTZ 2081845",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXf",\n          "valorPendencia": "12.599,63",\n          "tituloOcorrencia": "-",\n          "origem": "INFRAFORT TUBOS CONEX PVC LTDA",\n          "dataOcorrencia": "21/01/2018",\n          "contrato": "15647504002",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX0",\n          "valorPendencia": "2.798,22",\n          "tituloOcorrencia": "-",\n          "origem": "FORTLEV NORDESTE IND E COM DE P",\n          "dataOcorrencia": "02/01/2018",\n          "contrato": "0100269790003",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX1",\n          "valorPendencia": "1.756,52",\n          "tituloOcorrencia": "-",\n          "origem": "FORTLEV NORDESTE IND E COM DE P",\n          "dataOcorrencia": "20/12/2017",\n          "contrato": "0100257923003",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX2",\n          "valorPendencia": "2.797,37",\n          "tituloOcorrencia": "-",\n          "origem": "FORTLEV NORDESTE IND E COM DE P",\n          "dataOcorrencia": "05/12/2017",\n          "contrato": "0100269790002",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX3",\n          "valorPendencia": "1.755,98",\n          "tituloOcorrencia": "-",\n          "origem": "FORTLEV NORDESTE IND E COM DE P",\n          "dataOcorrencia": "22/11/2017",\n          "contrato": "0100257923002",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX4",\n          "valorPendencia": "2.797,37",\n          "tituloOcorrencia": "-",\n          "origem": "FORTLEV NORDESTE IND E COM DE P",\n          "dataOcorrencia": "07/11/2017",\n          "contrato": "0100269790001",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX5",\n          "valorPendencia": "1.755,98",\n          "tituloOcorrencia": "-",\n          "origem": "FORTLEV NORDESTE IND E COM DE P",\n          "dataOcorrencia": "25/10/2017",\n          "contrato": "0100257923001",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX6",\n          "valorPendencia": "2.305,47",\n          "tituloOcorrencia": "-",\n          "origem": "LOCALIZA RENT A CAR S/A",\n          "dataOcorrencia": "04/01/2018",\n          "contrato": "ACBAU 102003",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX7",\n          "valorPendencia": "194,91",\n          "tituloOcorrencia": "-",\n          "origem": "LOCALIZA RENT A CAR S/A",\n          "dataOcorrencia": "03/01/2018",\n          "contrato": "AGMTZ 2051273",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX8",\n          "valorPendencia": "194,91",\n          "tituloOcorrencia": "-",\n          "origem": "LOCALIZA RENT A CAR S/A",\n          "dataOcorrencia": "03/01/2018",\n          "contrato": "AGMTZ 2051272",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX9",\n          "valorPendencia": "12.002,00",\n          "tituloOcorrencia": "-",\n          "origem": "BANCO SANTANDER S/A",\n          "dataOcorrencia": "30/12/2017",\n          "contrato": "UG305130000001369030",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXa",\n          "valorPendencia": "1.526,57",\n          "tituloOcorrencia": "-",\n          "origem": "CERAMICA RAMOS LTDA.",\n          "dataOcorrencia": "19/11/2017",\n          "contrato": "384322/ 1/E/E",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXb",\n          "valorPendencia": "3.227,17",\n          "tituloOcorrencia": "-",\n          "origem": "CERAMICA RAMOS LTDA.",\n          "dataOcorrencia": "17/11/2017",\n          "contrato": "383936/ 1/E/E",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXc",\n          "valorPendencia": "1.526,57",\n          "tituloOcorrencia": "-",\n          "origem": "CERAMICA RAMOS LTDA.",\n          "dataOcorrencia": "20/10/2017",\n          "contrato": "384322/ 1/D/E",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXd",\n          "valorPendencia": "4.422,95",\n          "tituloOcorrencia": "-",\n          "origem": "ISDRALIT INDUSTRIA E COMERCIO L",\n          "dataOcorrencia": "20/11/2017",\n          "contrato": "73408/01",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXe",\n          "valorPendencia": "3.227,17",\n          "tituloOcorrencia": "-",\n          "origem": "CERAMICA RAMOS LTDA.",\n          "dataOcorrencia": "18/09/2017",\n          "contrato": "383936/ 1/C/E",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX2",\n          "valorPendencia": "1.285,61",\n          "tituloOcorrencia": "-",\n          "origem": "CAIXA ECONOMICA FEDERAL",\n          "dataOcorrencia": "12/05/2018",\n          "contrato": "08000000000000419502",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX3",\n          "valorPendencia": "1.058,21",\n          "tituloOcorrencia": "-",\n          "origem": "DROGARIA NISSEI",\n          "dataOcorrencia": "17/02/2018",\n          "contrato": "484773",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX4",\n          "valorPendencia": "278,63",\n          "tituloOcorrencia": "-",\n          "origem": "KRONA TUBOS E CONEXOES LTDA",\n          "dataOcorrencia": "26/12/2017",\n          "contrato": "3 0004824243",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX5",\n          "valorPendencia": "278,64",\n          "tituloOcorrencia": "-",\n          "origem": "KRONA TUBOS E CONEXOES LTDA",\n          "dataOcorrencia": "12/12/2017",\n          "contrato": "3 0004824242",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX6",\n          "valorPendencia": "437,61",\n          "tituloOcorrencia": "-",\n          "origem": "KRONA TUBOS E CONEXOES LTDA",\n          "dataOcorrencia": "11/12/2017",\n          "contrato": "3 0004794753",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX7",\n          "valorPendencia": "278,64",\n          "tituloOcorrencia": "-",\n          "origem": "KRONA TUBOS E CONEXOES LTDA",\n          "dataOcorrencia": "28/11/2017",\n          "contrato": "3 0004824241",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX8",\n          "valorPendencia": "437,62",\n          "tituloOcorrencia": "-",\n          "origem": "KRONA TUBOS E CONEXOES LTDA",\n          "dataOcorrencia": "27/11/2017",\n          "contrato": "3 0004794752",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX9",\n          "valorPendencia": "437,62",\n          "tituloOcorrencia": "-",\n          "origem": "KRONA TUBOS E CONEXOES LTDA",\n          "dataOcorrencia": "13/11/2017",\n          "contrato": "3 0004794751",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXa",\n          "valorPendencia": "129,79",\n          "tituloOcorrencia": "-",\n          "origem": "LOCALIZA RENT A CAR S/A",\n          "dataOcorrencia": "12/04/2018",\n          "contrato": "AGMTZ 2175958",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXb",\n          "valorPendencia": "1.031,83",\n          "tituloOcorrencia": "-",\n          "origem": "DROGARIA NISSEI",\n          "dataOcorrencia": "17/01/2018",\n          "contrato": "482779",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXc",\n          "valorPendencia": "225,25",\n          "tituloOcorrencia": "-",\n          "origem": "MAURICIO SGAVIOLI ROCCHI",\n          "dataOcorrencia": "17/11/2017",\n          "contrato": "75071",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXd",\n          "valorPendencia": "833,77",\n          "tituloOcorrencia": "-",\n          "origem": "DROGARIA NISSEI",\n          "dataOcorrencia": "17/12/2017",\n          "contrato": "480782",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXe",\n          "valorPendencia": "585,09",\n          "tituloOcorrencia": "-",\n          "origem": "CAIXA ECONOMICA FEDERAL",\n          "dataOcorrencia": "20/02/2018",\n          "contrato": "XXXXXXXXXX",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXf",\n          "valorPendencia": "194,91",\n          "tituloOcorrencia": "-",\n          "origem": "LOCALIZA RENT A CAR S/A",\n          "dataOcorrencia": "28/03/2018",\n          "contrato": "AGMTZ 2153212",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX0",\n          "valorPendencia": "115,11",\n          "tituloOcorrencia": "-",\n          "origem": "EMBRATEL LD21 PF",\n          "dataOcorrencia": "10/01/2018",\n          "contrato": "E000000184909036",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX1",\n          "valorPendencia": "5.713,46",\n          "tituloOcorrencia": "-",\n          "origem": "CAIXA ECONOMICA FEDERAL",\n          "dataOcorrencia": "20/04/2018",\n          "contrato": "08000000000000125003",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX2",\n          "valorPendencia": "310,00",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "27/03/2018",\n          "contrato": "110186",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX3",\n          "valorPendencia": "773,94",\n          "tituloOcorrencia": "-",\n          "origem": "KALUNGA COM E IND GRAFICA LTDA",\n          "dataOcorrencia": "16/02/2018",\n          "contrato": "0201712180035003",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX4",\n          "valorPendencia": "162,50",\n          "tituloOcorrencia": "-",\n          "origem": "KALUNGA COM E IND GRAFICA LTDA",\n          "dataOcorrencia": "12/02/2018",\n          "contrato": "226671",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX5",\n          "valorPendencia": "480,00",\n          "tituloOcorrencia": "-",\n          "origem": "CC JAU ALUGUEL DE EQUIPAMENTOS",\n          "dataOcorrencia": "13/02/2018",\n          "contrato": "4046",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX6",\n          "valorPendencia": "1.240,00",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "15/03/2018",\n          "contrato": "110288",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX7",\n          "valorPendencia": "580,00",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "15/03/2018",\n          "contrato": "110079",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX8",\n          "valorPendencia": "290,00",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "15/03/2018",\n          "contrato": "110255",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX9",\n          "valorPendencia": "290,00",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "15/03/2018",\n          "contrato": "110081",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXa",\n          "valorPendencia": "1.815,00",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "15/03/2018",\n          "contrato": "110080",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXb",\n          "valorPendencia": "11.572,93",\n          "tituloOcorrencia": "-",\n          "origem": "CAIXA ECONOMICA FEDERAL",\n          "dataOcorrencia": "25/03/2018",\n          "contrato": "08000000000000123303",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXc",\n          "valorPendencia": "91,86",\n          "tituloOcorrencia": "-",\n          "origem": "KALUNGA COM E IND GRAFICA LTDA",\n          "dataOcorrencia": "01/02/2018",\n          "contrato": "0201801020035004",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXd",\n          "valorPendencia": "194,57",\n          "tituloOcorrencia": "-",\n          "origem": "LOCALIZA RENT A CAR S/A",\n          "dataOcorrencia": "22/02/2018",\n          "contrato": "AGMTZ 2112481",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXe",\n          "valorPendencia": "787,12",\n          "tituloOcorrencia": "-",\n          "origem": "SMART COMP SERV LTDA ME",\n          "dataOcorrencia": "15/02/2018",\n          "contrato": "10900002038",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXf",\n          "valorPendencia": "928,25",\n          "tituloOcorrencia": "-",\n          "origem": "SAINT GOBAIN DO BRASIL PRODUTOS",\n          "dataOcorrencia": "15/08/2017",\n          "contrato": "044706002",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX0",\n          "valorPendencia": "2.012,50",\n          "tituloOcorrencia": "-",\n          "origem": "SAINT GOBAIN DO BRASIL PRODUTOS",\n          "dataOcorrencia": "14/08/2017",\n          "contrato": "044655002",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX1",\n          "valorPendencia": "1.345,30",\n          "tituloOcorrencia": "-",\n          "origem": "SAINT GOBAIN DO BRASIL PRODUTOS",\n          "dataOcorrencia": "14/08/2017",\n          "contrato": "044658002",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX2",\n          "valorPendencia": "928,25",\n          "tituloOcorrencia": "-",\n          "origem": "SAINT GOBAIN DO BRASIL PRODUTOS",\n          "dataOcorrencia": "18/07/2017",\n          "contrato": "044706001",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX3",\n          "valorPendencia": "2.012,50",\n          "tituloOcorrencia": "-",\n          "origem": "SAINT GOBAIN DO BRASIL PRODUTOS",\n          "dataOcorrencia": "17/07/2017",\n          "contrato": "044655001",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX4",\n          "valorPendencia": "1.345,31",\n          "tituloOcorrencia": "-",\n          "origem": "SAINT GOBAIN DO BRASIL PRODUTOS",\n          "dataOcorrencia": "17/07/2017",\n          "contrato": "044658001",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX5",\n          "valorPendencia": "713,91",\n          "tituloOcorrencia": "-",\n          "origem": "BAURU CENTER COPIAS COM COP LTD",\n          "dataOcorrencia": "05/02/2018",\n          "contrato": "15717828443",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX6",\n          "valorPendencia": "773,95",\n          "tituloOcorrencia": "-",\n          "origem": "KALUNGA COM E IND GRAFICA LTDA",\n          "dataOcorrencia": "17/01/2018",\n          "contrato": "1344050344",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX7",\n          "valorPendencia": "2.305,49",\n          "tituloOcorrencia": "-",\n          "origem": "LOCALIZA RENT A CAR S/A",\n          "dataOcorrencia": "02/02/2018",\n          "contrato": "ACBAU 102920",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX8",\n          "valorPendencia": "620,00",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "27/01/2018",\n          "contrato": "108476",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX9",\n          "valorPendencia": "1.815,00",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "15/01/2018",\n          "contrato": "108462",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXa",\n          "valorPendencia": "580,00",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "15/01/2018",\n          "contrato": "108456",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXb",\n          "valorPendencia": "1.240,00",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "10/01/2018",\n          "contrato": "108913",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXc",\n          "valorPendencia": "290,00",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "10/01/2018",\n          "contrato": "108912",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXd",\n          "valorPendencia": "3.286,70",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "05/01/2018",\n          "contrato": "3364",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXe",\n          "valorPendencia": "293,16",\n          "tituloOcorrencia": "-",\n          "origem": "LOCALIZA RENT A CAR S/A",\n          "dataOcorrencia": "25/01/2018",\n          "contrato": "AGMTZ 2081845",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXf",\n          "valorPendencia": "12.599,63",\n          "tituloOcorrencia": "-",\n          "origem": "INFRAFORT TUBOS CONEX PVC LTDA",\n          "dataOcorrencia": "21/01/2018",\n          "contrato": "15647504002",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX0",\n          "valorPendencia": "2.798,22",\n          "tituloOcorrencia": "-",\n          "origem": "FORTLEV NORDESTE IND E COM DE P",\n          "dataOcorrencia": "02/01/2018",\n          "contrato": "0100269790003",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX1",\n          "valorPendencia": "1.756,52",\n          "tituloOcorrencia": "-",\n          "origem": "FORTLEV NORDESTE IND E COM DE P",\n          "dataOcorrencia": "20/12/2017",\n          "contrato": "0100257923003",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX2",\n          "valorPendencia": "2.797,37",\n          "tituloOcorrencia": "-",\n          "origem": "FORTLEV NORDESTE IND E COM DE P",\n          "dataOcorrencia": "05/12/2017",\n          "contrato": "0100269790002",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX3",\n          "valorPendencia": "1.755,98",\n          "tituloOcorrencia": "-",\n          "origem": "FORTLEV NORDESTE IND E COM DE P",\n          "dataOcorrencia": "22/11/2017",\n          "contrato": "0100257923002",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX4",\n          "valorPendencia": "2.797,37",\n          "tituloOcorrencia": "-",\n          "origem": "FORTLEV NORDESTE IND E COM DE P",\n          "dataOcorrencia": "07/11/2017",\n          "contrato": "0100269790001",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX5",\n          "valorPendencia": "1.755,98",\n          "tituloOcorrencia": "-",\n          "origem": "FORTLEV NORDESTE IND E COM DE P",\n          "dataOcorrencia": "25/10/2017",\n          "contrato": "0100257923001",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX6",\n          "valorPendencia": "2.305,47",\n          "tituloOcorrencia": "-",\n          "origem": "LOCALIZA RENT A CAR S/A",\n          "dataOcorrencia": "04/01/2018",\n          "contrato": "ACBAU 102003",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX7",\n          "valorPendencia": "194,91",\n          "tituloOcorrencia": "-",\n          "origem": "LOCALIZA RENT A CAR S/A",\n          "dataOcorrencia": "03/01/2018",\n          "contrato": "AGMTZ 2051273",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX8",\n          "valorPendencia": "194,91",\n          "tituloOcorrencia": "-",\n          "origem": "LOCALIZA RENT A CAR S/A",\n          "dataOcorrencia": "03/01/2018",\n          "contrato": "AGMTZ 2051272",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX9",\n          "valorPendencia": "12.002,00",\n          "tituloOcorrencia": "-",\n          "origem": "BANCO SANTANDER S/A",\n          "dataOcorrencia": "30/12/2017",\n          "contrato": "UG305130000001369030",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXa",\n          "valorPendencia": "1.526,57",\n          "tituloOcorrencia": "-",\n          "origem": "CERAMICA RAMOS LTDA.",\n          "dataOcorrencia": "19/11/2017",\n          "contrato": "384322/ 1/E/E",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXb",\n          "valorPendencia": "3.227,17",\n          "tituloOcorrencia": "-",\n          "origem": "CERAMICA RAMOS LTDA.",\n          "dataOcorrencia": "17/11/2017",\n          "contrato": "383936/ 1/E/E",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXc",\n          "valorPendencia": "1.526,57",\n          "tituloOcorrencia": "-",\n          "origem": "CERAMICA RAMOS LTDA.",\n          "dataOcorrencia": "20/10/2017",\n          "contrato": "384322/ 1/D/E",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXd",\n          "valorPendencia": "4.422,95",\n          "tituloOcorrencia": "-",\n          "origem": "ISDRALIT INDUSTRIA E COMERCIO L",\n          "dataOcorrencia": "20/11/2017",\n          "contrato": "73408/01",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXe",\n          "valorPendencia": "3.227,17",\n          "tituloOcorrencia": "-",\n          "origem": "CERAMICA RAMOS LTDA.",\n          "dataOcorrencia": "18/09/2017",\n          "contrato": "383936/ 1/C/E",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXb",\n          "valorPendencia": "1.285,61",\n          "tituloOcorrencia": "-",\n          "origem": "CAIXA ECONOMICA FEDERAL",\n          "dataOcorrencia": "12/05/2018",\n          "contrato": "08000000000000419502",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXc",\n          "valorPendencia": "1.058,21",\n          "tituloOcorrencia": "-",\n          "origem": "DROGARIA NISSEI",\n          "dataOcorrencia": "17/02/2018",\n          "contrato": "484773",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXd",\n          "valorPendencia": "278,63",\n          "tituloOcorrencia": "-",\n          "origem": "KRONA TUBOS E CONEXOES LTDA",\n          "dataOcorrencia": "26/12/2017",\n          "contrato": "3 0004824243",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXe",\n          "valorPendencia": "278,64",\n          "tituloOcorrencia": "-",\n          "origem": "KRONA TUBOS E CONEXOES LTDA",\n          "dataOcorrencia": "12/12/2017",\n          "contrato": "3 0004824242",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXf",\n          "valorPendencia": "437,61",\n          "tituloOcorrencia": "-",\n          "origem": "KRONA TUBOS E CONEXOES LTDA",\n          "dataOcorrencia": "11/12/2017",\n          "contrato": "3 0004794753",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX0",\n          "valorPendencia": "278,64",\n          "tituloOcorrencia": "-",\n          "origem": "KRONA TUBOS E CONEXOES LTDA",\n          "dataOcorrencia": "28/11/2017",\n          "contrato": "3 0004824241",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX1",\n          "valorPendencia": "437,62",\n          "tituloOcorrencia": "-",\n          "origem": "KRONA TUBOS E CONEXOES LTDA",\n          "dataOcorrencia": "27/11/2017",\n          "contrato": "3 0004794752",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX2",\n          "valorPendencia": "437,62",\n          "tituloOcorrencia": "-",\n          "origem": "KRONA TUBOS E CONEXOES LTDA",\n          "dataOcorrencia": "13/11/2017",\n          "contrato": "3 0004794751",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX3",\n          "valorPendencia": "129,79",\n          "tituloOcorrencia": "-",\n          "origem": "LOCALIZA RENT A CAR S/A",\n          "dataOcorrencia": "12/04/2018",\n          "contrato": "AGMTZ 2175958",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX4",\n          "valorPendencia": "1.031,83",\n          "tituloOcorrencia": "-",\n          "origem": "DROGARIA NISSEI",\n          "dataOcorrencia": "17/01/2018",\n          "contrato": "482779",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX5",\n          "valorPendencia": "225,25",\n          "tituloOcorrencia": "-",\n          "origem": "MAURICIO SGAVIOLI ROCCHI",\n          "dataOcorrencia": "17/11/2017",\n          "contrato": "75071",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX6",\n          "valorPendencia": "833,77",\n          "tituloOcorrencia": "-",\n          "origem": "DROGARIA NISSEI",\n          "dataOcorrencia": "17/12/2017",\n          "contrato": "480782",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX7",\n          "valorPendencia": "585,09",\n          "tituloOcorrencia": "-",\n          "origem": "CAIXA ECONOMICA FEDERAL",\n          "dataOcorrencia": "20/02/2018",\n          "contrato": "XXXXXXXXXX",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX8",\n          "valorPendencia": "194,91",\n          "tituloOcorrencia": "-",\n          "origem": "LOCALIZA RENT A CAR S/A",\n          "dataOcorrencia": "28/03/2018",\n          "contrato": "AGMTZ 2153212",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX9",\n          "valorPendencia": "115,11",\n          "tituloOcorrencia": "-",\n          "origem": "EMBRATEL LD21 PF",\n          "dataOcorrencia": "10/01/2018",\n          "contrato": "E000000184909036",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXa",\n          "valorPendencia": "5.713,46",\n          "tituloOcorrencia": "-",\n          "origem": "CAIXA ECONOMICA FEDERAL",\n          "dataOcorrencia": "20/04/2018",\n          "contrato": "08000000000000125003",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXb",\n          "valorPendencia": "310,00",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "27/03/2018",\n          "contrato": "110186",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXc",\n          "valorPendencia": "773,94",\n          "tituloOcorrencia": "-",\n          "origem": "KALUNGA COM E IND GRAFICA LTDA",\n          "dataOcorrencia": "16/02/2018",\n          "contrato": "0201712180035003",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXd",\n          "valorPendencia": "162,50",\n          "tituloOcorrencia": "-",\n          "origem": "KALUNGA COM E IND GRAFICA LTDA",\n          "dataOcorrencia": "12/02/2018",\n          "contrato": "226671",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXe",\n          "valorPendencia": "480,00",\n          "tituloOcorrencia": "-",\n          "origem": "CC JAU ALUGUEL DE EQUIPAMENTOS",\n          "dataOcorrencia": "13/02/2018",\n          "contrato": "4046",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXf",\n          "valorPendencia": "1.240,00",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "15/03/2018",\n          "contrato": "110288",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX0",\n          "valorPendencia": "580,00",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "15/03/2018",\n          "contrato": "110079",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX1",\n          "valorPendencia": "290,00",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "15/03/2018",\n          "contrato": "110255",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX2",\n          "valorPendencia": "290,00",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "15/03/2018",\n          "contrato": "110081",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX3",\n          "valorPendencia": "1.815,00",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "15/03/2018",\n          "contrato": "110080",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX4",\n          "valorPendencia": "11.572,93",\n          "tituloOcorrencia": "-",\n          "origem": "CAIXA ECONOMICA FEDERAL",\n          "dataOcorrencia": "25/03/2018",\n          "contrato": "08000000000000123303",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX5",\n          "valorPendencia": "91,86",\n          "tituloOcorrencia": "-",\n          "origem": "KALUNGA COM E IND GRAFICA LTDA",\n          "dataOcorrencia": "01/02/2018",\n          "contrato": "0201801020035004",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX6",\n          "valorPendencia": "194,57",\n          "tituloOcorrencia": "-",\n          "origem": "LOCALIZA RENT A CAR S/A",\n          "dataOcorrencia": "22/02/2018",\n          "contrato": "AGMTZ 2112481",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX7",\n          "valorPendencia": "787,12",\n          "tituloOcorrencia": "-",\n          "origem": "SMART COMP SERV LTDA ME",\n          "dataOcorrencia": "15/02/2018",\n          "contrato": "10900002038",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX8",\n          "valorPendencia": "928,25",\n          "tituloOcorrencia": "-",\n          "origem": "SAINT GOBAIN DO BRASIL PRODUTOS",\n          "dataOcorrencia": "15/08/2017",\n          "contrato": "044706002",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX9",\n          "valorPendencia": "2.012,50",\n          "tituloOcorrencia": "-",\n          "origem": "SAINT GOBAIN DO BRASIL PRODUTOS",\n          "dataOcorrencia": "14/08/2017",\n          "contrato": "044655002",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXa",\n          "valorPendencia": "1.345,30",\n          "tituloOcorrencia": "-",\n          "origem": "SAINT GOBAIN DO BRASIL PRODUTOS",\n          "dataOcorrencia": "14/08/2017",\n          "contrato": "044658002",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXb",\n          "valorPendencia": "928,25",\n          "tituloOcorrencia": "-",\n          "origem": "SAINT GOBAIN DO BRASIL PRODUTOS",\n          "dataOcorrencia": "18/07/2017",\n          "contrato": "044706001",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXc",\n          "valorPendencia": "2.012,50",\n          "tituloOcorrencia": "-",\n          "origem": "SAINT GOBAIN DO BRASIL PRODUTOS",\n          "dataOcorrencia": "17/07/2017",\n          "contrato": "044655001",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXd",\n          "valorPendencia": "1.345,31",\n          "tituloOcorrencia": "-",\n          "origem": "SAINT GOBAIN DO BRASIL PRODUTOS",\n          "dataOcorrencia": "17/07/2017",\n          "contrato": "044658001",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXe",\n          "valorPendencia": "713,91",\n          "tituloOcorrencia": "-",\n          "origem": "BAURU CENTER COPIAS COM COP LTD",\n          "dataOcorrencia": "05/02/2018",\n          "contrato": "15717828443",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXf",\n          "valorPendencia": "773,95",\n          "tituloOcorrencia": "-",\n          "origem": "KALUNGA COM E IND GRAFICA LTDA",\n          "dataOcorrencia": "17/01/2018",\n          "contrato": "1344050344",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX0",\n          "valorPendencia": "2.305,49",\n          "tituloOcorrencia": "-",\n          "origem": "LOCALIZA RENT A CAR S/A",\n          "dataOcorrencia": "02/02/2018",\n          "contrato": "ACBAU 102920",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX1",\n          "valorPendencia": "620,00",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "27/01/2018",\n          "contrato": "108476",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX2",\n          "valorPendencia": "1.815,00",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "15/01/2018",\n          "contrato": "108462",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX3",\n          "valorPendencia": "580,00",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "15/01/2018",\n          "contrato": "108456",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX4",\n          "valorPendencia": "1.240,00",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "10/01/2018",\n          "contrato": "108913",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX5",\n          "valorPendencia": "290,00",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "10/01/2018",\n          "contrato": "108912",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX6",\n          "valorPendencia": "3.286,70",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "05/01/2018",\n          "contrato": "3364",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX7",\n          "valorPendencia": "293,16",\n          "tituloOcorrencia": "-",\n          "origem": "LOCALIZA RENT A CAR S/A",\n          "dataOcorrencia": "25/01/2018",\n          "contrato": "AGMTZ 2081845",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX8",\n          "valorPendencia": "12.599,63",\n          "tituloOcorrencia": "-",\n          "origem": "INFRAFORT TUBOS CONEX PVC LTDA",\n          "dataOcorrencia": "21/01/2018",\n          "contrato": "15647504002",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX9",\n          "valorPendencia": "2.798,22",\n          "tituloOcorrencia": "-",\n          "origem": "FORTLEV NORDESTE IND E COM DE P",\n          "dataOcorrencia": "02/01/2018",\n          "contrato": "0100269790003",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXa",\n          "valorPendencia": "1.756,52",\n          "tituloOcorrencia": "-",\n          "origem": "FORTLEV NORDESTE IND E COM DE P",\n          "dataOcorrencia": "20/12/2017",\n          "contrato": "0100257923003",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXb",\n          "valorPendencia": "2.797,37",\n          "tituloOcorrencia": "-",\n          "origem": "FORTLEV NORDESTE IND E COM DE P",\n          "dataOcorrencia": "05/12/2017",\n          "contrato": "0100269790002",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXc",\n          "valorPendencia": "1.755,98",\n          "tituloOcorrencia": "-",\n          "origem": "FORTLEV NORDESTE IND E COM DE P",\n          "dataOcorrencia": "22/11/2017",\n          "contrato": "0100257923002",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXd",\n          "valorPendencia": "2.797,37",\n          "tituloOcorrencia": "-",\n          "origem": "FORTLEV NORDESTE IND E COM DE P",\n          "dataOcorrencia": "07/11/2017",\n          "contrato": "0100269790001",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXe",\n          "valorPendencia": "1.755,98",\n          "tituloOcorrencia": "-",\n          "origem": "FORTLEV NORDESTE IND E COM DE P",\n          "dataOcorrencia": "25/10/2017",\n          "contrato": "0100257923001",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXf",\n          "valorPendencia": "2.305,47",\n          "tituloOcorrencia": "-",\n          "origem": "LOCALIZA RENT A CAR S/A",\n          "dataOcorrencia": "04/01/2018",\n          "contrato": "ACBAU 102003",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX0",\n          "valorPendencia": "194,91",\n          "tituloOcorrencia": "-",\n          "origem": "LOCALIZA RENT A CAR S/A",\n          "dataOcorrencia": "03/01/2018",\n          "contrato": "AGMTZ 2051273",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX1",\n          "valorPendencia": "194,91",\n          "tituloOcorrencia": "-",\n          "origem": "LOCALIZA RENT A CAR S/A",\n          "dataOcorrencia": "03/01/2018",\n          "contrato": "AGMTZ 2051272",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX2",\n          "valorPendencia": "12.002,00",\n          "tituloOcorrencia": "-",\n          "origem": "BANCO SANTANDER S/A",\n          "dataOcorrencia": "30/12/2017",\n          "contrato": "UG305130000001369030",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX3",\n          "valorPendencia": "1.526,57",\n          "tituloOcorrencia": "-",\n          "origem": "CERAMICA RAMOS LTDA.",\n          "dataOcorrencia": "19/11/2017",\n          "contrato": "384322/ 1/E/E",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX4",\n          "valorPendencia": "3.227,17",\n          "tituloOcorrencia": "-",\n          "origem": "CERAMICA RAMOS LTDA.",\n          "dataOcorrencia": "17/11/2017",\n          "contrato": "383936/ 1/E/E",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX5",\n          "valorPendencia": "1.526,57",\n          "tituloOcorrencia": "-",\n          "origem": "CERAMICA RAMOS LTDA.",\n          "dataOcorrencia": "20/10/2017",\n          "contrato": "384322/ 1/D/E",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX6",\n          "valorPendencia": "4.422,95",\n          "tituloOcorrencia": "-",\n          "origem": "ISDRALIT INDUSTRIA E COMERCIO L",\n          "dataOcorrencia": "20/11/2017",\n          "contrato": "73408/01",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX7",\n          "valorPendencia": "3.227,17",\n          "tituloOcorrencia": "-",\n          "origem": "CERAMICA RAMOS LTDA.",\n          "dataOcorrencia": "18/09/2017",\n          "contrato": "383936/ 1/C/E",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX1",\n          "valorPendencia": "1.285,61",\n          "tituloOcorrencia": "-",\n          "origem": "CAIXA ECONOMICA FEDERAL",\n          "dataOcorrencia": "12/05/2018",\n          "contrato": "08000000000000419502",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX2",\n          "valorPendencia": "1.058,21",\n          "tituloOcorrencia": "-",\n          "origem": "DROGARIA NISSEI",\n          "dataOcorrencia": "17/02/2018",\n          "contrato": "484773",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX3",\n          "valorPendencia": "278,63",\n          "tituloOcorrencia": "-",\n          "origem": "KRONA TUBOS E CONEXOES LTDA",\n          "dataOcorrencia": "26/12/2017",\n          "contrato": "3 0004824243",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX4",\n          "valorPendencia": "278,64",\n          "tituloOcorrencia": "-",\n          "origem": "KRONA TUBOS E CONEXOES LTDA",\n          "dataOcorrencia": "12/12/2017",\n          "contrato": "3 0004824242",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX5",\n          "valorPendencia": "437,61",\n          "tituloOcorrencia": "-",\n          "origem": "KRONA TUBOS E CONEXOES LTDA",\n          "dataOcorrencia": "11/12/2017",\n          "contrato": "3 0004794753",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX6",\n          "valorPendencia": "278,64",\n          "tituloOcorrencia": "-",\n          "origem": "KRONA TUBOS E CONEXOES LTDA",\n          "dataOcorrencia": "28/11/2017",\n          "contrato": "3 0004824241",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX7",\n          "valorPendencia": "437,62",\n          "tituloOcorrencia": "-",\n          "origem": "KRONA TUBOS E CONEXOES LTDA",\n          "dataOcorrencia": "27/11/2017",\n          "contrato": "3 0004794752",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX8",\n          "valorPendencia": "437,62",\n          "tituloOcorrencia": "-",\n          "origem": "KRONA TUBOS E CONEXOES LTDA",\n          "dataOcorrencia": "13/11/2017",\n          "contrato": "3 0004794751",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX9",\n          "valorPendencia": "129,79",\n          "tituloOcorrencia": "-",\n          "origem": "LOCALIZA RENT A CAR S/A",\n          "dataOcorrencia": "12/04/2018",\n          "contrato": "AGMTZ 2175958",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXa",\n          "valorPendencia": "1.031,83",\n          "tituloOcorrencia": "-",\n          "origem": "DROGARIA NISSEI",\n          "dataOcorrencia": "17/01/2018",\n          "contrato": "482779",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXb",\n          "valorPendencia": "225,25",\n          "tituloOcorrencia": "-",\n          "origem": "MAURICIO SGAVIOLI ROCCHI",\n          "dataOcorrencia": "17/11/2017",\n          "contrato": "75071",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXc",\n          "valorPendencia": "833,77",\n          "tituloOcorrencia": "-",\n          "origem": "DROGARIA NISSEI",\n          "dataOcorrencia": "17/12/2017",\n          "contrato": "480782",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXd",\n          "valorPendencia": "585,09",\n          "tituloOcorrencia": "-",\n          "origem": "CAIXA ECONOMICA FEDERAL",\n          "dataOcorrencia": "20/02/2018",\n          "contrato": "XXXXXXXXXX",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXe",\n          "valorPendencia": "194,91",\n          "tituloOcorrencia": "-",\n          "origem": "LOCALIZA RENT A CAR S/A",\n          "dataOcorrencia": "28/03/2018",\n          "contrato": "AGMTZ 2153212",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXf",\n          "valorPendencia": "115,11",\n          "tituloOcorrencia": "-",\n          "origem": "EMBRATEL LD21 PF",\n          "dataOcorrencia": "10/01/2018",\n          "contrato": "E000000184909036",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX0",\n          "valorPendencia": "5.713,46",\n          "tituloOcorrencia": "-",\n          "origem": "CAIXA ECONOMICA FEDERAL",\n          "dataOcorrencia": "20/04/2018",\n          "contrato": "08000000000000125003",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX1",\n          "valorPendencia": "310,00",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "27/03/2018",\n          "contrato": "110186",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX2",\n          "valorPendencia": "773,94",\n          "tituloOcorrencia": "-",\n          "origem": "KALUNGA COM E IND GRAFICA LTDA",\n          "dataOcorrencia": "16/02/2018",\n          "contrato": "0201712180035003",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX3",\n          "valorPendencia": "162,50",\n          "tituloOcorrencia": "-",\n          "origem": "KALUNGA COM E IND GRAFICA LTDA",\n          "dataOcorrencia": "12/02/2018",\n          "contrato": "226671",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX4",\n          "valorPendencia": "480,00",\n          "tituloOcorrencia": "-",\n          "origem": "CC JAU ALUGUEL DE EQUIPAMENTOS",\n          "dataOcorrencia": "13/02/2018",\n          "contrato": "4046",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX5",\n          "valorPendencia": "1.240,00",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "15/03/2018",\n          "contrato": "110288",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX6",\n          "valorPendencia": "580,00",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "15/03/2018",\n          "contrato": "110079",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX7",\n          "valorPendencia": "290,00",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "15/03/2018",\n          "contrato": "110255",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX8",\n          "valorPendencia": "290,00",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "15/03/2018",\n          "contrato": "110081",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX9",\n          "valorPendencia": "1.815,00",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "15/03/2018",\n          "contrato": "110080",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXa",\n          "valorPendencia": "11.572,93",\n          "tituloOcorrencia": "-",\n          "origem": "CAIXA ECONOMICA FEDERAL",\n          "dataOcorrencia": "25/03/2018",\n          "contrato": "08000000000000123303",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXb",\n          "valorPendencia": "91,86",\n          "tituloOcorrencia": "-",\n          "origem": "KALUNGA COM E IND GRAFICA LTDA",\n          "dataOcorrencia": "01/02/2018",\n          "contrato": "0201801020035004",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXc",\n          "valorPendencia": "194,57",\n          "tituloOcorrencia": "-",\n          "origem": "LOCALIZA RENT A CAR S/A",\n          "dataOcorrencia": "22/02/2018",\n          "contrato": "AGMTZ 2112481",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXd",\n          "valorPendencia": "787,12",\n          "tituloOcorrencia": "-",\n          "origem": "SMART COMP SERV LTDA ME",\n          "dataOcorrencia": "15/02/2018",\n          "contrato": "10900002038",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXe",\n          "valorPendencia": "928,25",\n          "tituloOcorrencia": "-",\n          "origem": "SAINT GOBAIN DO BRASIL PRODUTOS",\n          "dataOcorrencia": "15/08/2017",\n          "contrato": "044706002",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXf",\n          "valorPendencia": "2.012,50",\n          "tituloOcorrencia": "-",\n          "origem": "SAINT GOBAIN DO BRASIL PRODUTOS",\n          "dataOcorrencia": "14/08/2017",\n          "contrato": "044655002",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX0",\n          "valorPendencia": "1.345,30",\n          "tituloOcorrencia": "-",\n          "origem": "SAINT GOBAIN DO BRASIL PRODUTOS",\n          "dataOcorrencia": "14/08/2017",\n          "contrato": "044658002",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX1",\n          "valorPendencia": "928,25",\n          "tituloOcorrencia": "-",\n          "origem": "SAINT GOBAIN DO BRASIL PRODUTOS",\n          "dataOcorrencia": "18/07/2017",\n          "contrato": "044706001",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX2",\n          "valorPendencia": "2.012,50",\n          "tituloOcorrencia": "-",\n          "origem": "SAINT GOBAIN DO BRASIL PRODUTOS",\n          "dataOcorrencia": "17/07/2017",\n          "contrato": "044655001",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX3",\n          "valorPendencia": "1.345,31",\n          "tituloOcorrencia": "-",\n          "origem": "SAINT GOBAIN DO BRASIL PRODUTOS",\n          "dataOcorrencia": "17/07/2017",\n          "contrato": "044658001",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX4",\n          "valorPendencia": "713,91",\n          "tituloOcorrencia": "-",\n          "origem": "BAURU CENTER COPIAS COM COP LTD",\n          "dataOcorrencia": "05/02/2018",\n          "contrato": "15717828443",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX5",\n          "valorPendencia": "773,95",\n          "tituloOcorrencia": "-",\n          "origem": "KALUNGA COM E IND GRAFICA LTDA",\n          "dataOcorrencia": "17/01/2018",\n          "contrato": "1344050344",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX6",\n          "valorPendencia": "2.305,49",\n          "tituloOcorrencia": "-",\n          "origem": "LOCALIZA RENT A CAR S/A",\n          "dataOcorrencia": "02/02/2018",\n          "contrato": "ACBAU 102920",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX7",\n          "valorPendencia": "620,00",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "27/01/2018",\n          "contrato": "108476",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX8",\n          "valorPendencia": "1.815,00",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "15/01/2018",\n          "contrato": "108462",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX9",\n          "valorPendencia": "580,00",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "15/01/2018",\n          "contrato": "108456",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXa",\n          "valorPendencia": "1.240,00",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "10/01/2018",\n          "contrato": "108913",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXb",\n          "valorPendencia": "290,00",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "10/01/2018",\n          "contrato": "108912",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXc",\n          "valorPendencia": "3.286,70",\n          "tituloOcorrencia": "-",\n          "origem": "ACIL AUTOMOTIVE CONSULTORIA E I",\n          "dataOcorrencia": "05/01/2018",\n          "contrato": "3364",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXd",\n          "valorPendencia": "293,16",\n          "tituloOcorrencia": "-",\n          "origem": "LOCALIZA RENT A CAR S/A",\n          "dataOcorrencia": "25/01/2018",\n          "contrato": "AGMTZ 2081845",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXe",\n          "valorPendencia": "12.599,63",\n          "tituloOcorrencia": "-",\n          "origem": "INFRAFORT TUBOS CONEX PVC LTDA",\n          "dataOcorrencia": "21/01/2018",\n          "contrato": "15647504002",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXf",\n          "valorPendencia": "2.798,22",\n          "tituloOcorrencia": "-",\n          "origem": "FORTLEV NORDESTE IND E COM DE P",\n          "dataOcorrencia": "02/01/2018",\n          "contrato": "0100269790003",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX0",\n          "valorPendencia": "1.756,52",\n          "tituloOcorrencia": "-",\n          "origem": "FORTLEV NORDESTE IND E COM DE P",\n          "dataOcorrencia": "20/12/2017",\n          "contrato": "0100257923003",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX1",\n          "valorPendencia": "2.797,37",\n          "tituloOcorrencia": "-",\n          "origem": "FORTLEV NORDESTE IND E COM DE P",\n          "dataOcorrencia": "05/12/2017",\n          "contrato": "0100269790002",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX2",\n          "valorPendencia": "1.755,98",\n          "tituloOcorrencia": "-",\n          "origem": "FORTLEV NORDESTE IND E COM DE P",\n          "dataOcorrencia": "22/11/2017",\n          "contrato": "0100257923002",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX3",\n          "valorPendencia": "2.797,37",\n          "tituloOcorrencia": "-",\n          "origem": "FORTLEV NORDESTE IND E COM DE P",\n          "dataOcorrencia": "07/11/2017",\n          "contrato": "0100269790001",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX4",\n          "valorPendencia": "1.755,98",\n          "tituloOcorrencia": "-",\n          "origem": "FORTLEV NORDESTE IND E COM DE P",\n          "dataOcorrencia": "25/10/2017",\n          "contrato": "0100257923001",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX5",\n          "valorPendencia": "2.305,47",\n          "tituloOcorrencia": "-",\n          "origem": "LOCALIZA RENT A CAR S/A",\n          "dataOcorrencia": "04/01/2018",\n          "contrato": "ACBAU 102003",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX6",\n          "valorPendencia": "194,91",\n          "tituloOcorrencia": "-",\n          "origem": "LOCALIZA RENT A CAR S/A",\n          "dataOcorrencia": "03/01/2018",\n          "contrato": "AGMTZ 2051273",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX7",\n          "valorPendencia": "194,91",\n          "tituloOcorrencia": "-",\n          "origem": "LOCALIZA RENT A CAR S/A",\n          "dataOcorrencia": "03/01/2018",\n          "contrato": "AGMTZ 2051272",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX8",\n          "valorPendencia": "12.002,00",\n          "tituloOcorrencia": "-",\n          "origem": "BANCO SANTANDER S/A",\n          "dataOcorrencia": "30/12/2017",\n          "contrato": "UG305130000001369030",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXX9",\n          "valorPendencia": "1.526,57",\n          "tituloOcorrencia": "-",\n          "origem": "CERAMICA RAMOS LTDA.",\n          "dataOcorrencia": "19/11/2017",\n          "contrato": "384322/ 1/E/E",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXa",\n          "valorPendencia": "3.227,17",\n          "tituloOcorrencia": "-",\n          "origem": "CERAMICA RAMOS LTDA.",\n          "dataOcorrencia": "17/11/2017",\n          "contrato": "383936/ 1/E/E",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXb",\n          "valorPendencia": "1.526,57",\n          "tituloOcorrencia": "-",\n          "origem": "CERAMICA RAMOS LTDA.",\n          "dataOcorrencia": "20/10/2017",\n          "contrato": "384322/ 1/D/E",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXc",\n          "valorPendencia": "4.422,95",\n          "tituloOcorrencia": "-",\n          "origem": "ISDRALIT INDUSTRIA E COMERCIO L",\n          "dataOcorrencia": "20/11/2017",\n          "contrato": "73408/01",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "XXXXXXXXXXd",\n          "valorPendencia": "3.227,17",\n          "tituloOcorrencia": "-",\n          "origem": "CERAMICA RAMOS LTDA.",\n          "dataOcorrencia": "18/09/2017",\n          "contrato": "383936/ 1/C/E",\n          "avalista": "NAO",\n          "uf": "-",\n          "cidade": "-",\n          "moeda": "R$"\n        }\n      ],\n      "valorTotal": "1.285,61 (Ultima ocorrencia)",\n      "dataUltimaOcorrencia": "05/2018",\n      "quantidade": 61,\n      "personInformation": "XXXXXXXXXX"\n    },\n    "consultaRealizada": {\n      "_id": "XXXXXXXXXXf",\n      "__v": 0,\n      "registros": [],\n      "quantidadeDiasConsultado": "Array",\n      "quantidade": 0,\n      "personInformation": "XXXXXXXXXX"\n    },\n    "ccf": {\n      "_id": "XXXXXXXXXXb",\n      "__v": 3,\n      "detalhes": [\n        {\n          "_id": "XXXXXXXXXXc",\n          "detalheQuantidade": "27",\n          "origem": "BANCO CENTRAL DO BRASIL",\n          "dataUltCheque": "18/05/2018",\n          "agencia": "4184",\n          "nomeBanco": "-",\n          "codBanco": "104 - CAIXA ECONOMICA FEDERAL",\n          "descMotivo": "-",\n          "codMotivo": "12 - MOTIVO 12"\n        },\n        {\n          "_id": "XXXXXXXXXXd",\n          "detalheQuantidade": "2",\n          "origem": "BANCO CENTRAL DO BRASIL",\n          "dataUltCheque": "19/04/2018",\n          "agencia": "2141",\n          "nomeBanco": "-",\n          "codBanco": "104 - CAIXA ECONOMICA FEDERAL",\n          "descMotivo": "-",\n          "codMotivo": "12 - MOTIVO 12"\n        },\n        {\n          "_id": "XXXXXXXXXXe",\n          "detalheQuantidade": "8",\n          "origem": "BANCO CENTRAL DO BRASIL",\n          "dataUltCheque": "10/04/2018",\n          "agencia": "358",\n          "nomeBanco": "-",\n          "codBanco": "104 - CAIXA ECONOMICA FEDERAL",\n          "descMotivo": "-",\n          "codMotivo": "12 - MOTIVO 12"\n        },\n        {\n          "_id": "XXXXXXXXXXf",\n          "detalheQuantidade": "1",\n          "origem": "BANCO CENTRAL DO BRASIL",\n          "dataUltCheque": "28/02/2018",\n          "agencia": "309",\n          "nomeBanco": "-",\n          "codBanco": "104 - CAIXA ECONOMICA FEDERAL",\n          "descMotivo": "-",\n          "codMotivo": "12 - MOTIVO 12"\n        },\n        {\n          "_id": "XXXXXXXXXXe",\n          "detalheQuantidade": "27",\n          "origem": "BANCO CENTRAL DO BRASIL",\n          "dataUltCheque": "18/05/2018",\n          "agencia": "4184",\n          "nomeBanco": "-",\n          "codBanco": "104 - CAIXA ECONOMICA FEDERAL",\n          "descMotivo": "-",\n          "codMotivo": "12 - MOTIVO 12"\n        },\n        {\n          "_id": "XXXXXXXXXXf",\n          "detalheQuantidade": "2",\n          "origem": "BANCO CENTRAL DO BRASIL",\n          "dataUltCheque": "19/04/2018",\n          "agencia": "2141",\n          "nomeBanco": "-",\n          "codBanco": "104 - CAIXA ECONOMICA FEDERAL",\n          "descMotivo": "-",\n          "codMotivo": "12 - MOTIVO 12"\n        },\n        {\n          "_id": "5b0764ce748292763c6f5cc0",\n          "detalheQuantidade": "8",\n          "origem": "BANCO CENTRAL DO BRASIL",\n          "dataUltCheque": "10/04/2018",\n          "agencia": "358",\n          "nomeBanco": "-",\n          "codBanco": "104 - CAIXA ECONOMICA FEDERAL",\n          "descMotivo": "-",\n          "codMotivo": "12 - MOTIVO 12"\n        },\n        {\n          "_id": "5b0764ce748292763c6f5cc1",\n          "detalheQuantidade": "1",\n          "origem": "BANCO CENTRAL DO BRASIL",\n          "dataUltCheque": "28/02/2018",\n          "agencia": "309",\n          "nomeBanco": "-",\n          "codBanco": "104 - CAIXA ECONOMICA FEDERAL",\n          "descMotivo": "-",\n          "codMotivo": "12 - MOTIVO 12"\n        },\n        {\n          "_id": "XXXXXXXXXX7",\n          "detalheQuantidade": "27",\n          "origem": "BANCO CENTRAL DO BRASIL",\n          "dataUltCheque": "18/05/2018",\n          "agencia": "4184",\n          "nomeBanco": "-",\n          "codBanco": "104 - CAIXA ECONOMICA FEDERAL",\n          "descMotivo": "-",\n          "codMotivo": "12 - MOTIVO 12"\n        },\n        {\n          "_id": "XXXXXXXXXX8",\n          "detalheQuantidade": "2",\n          "origem": "BANCO CENTRAL DO BRASIL",\n          "dataUltCheque": "19/04/2018",\n          "agencia": "2141",\n          "nomeBanco": "-",\n          "codBanco": "104 - CAIXA ECONOMICA FEDERAL",\n          "descMotivo": "-",\n          "codMotivo": "12 - MOTIVO 12"\n        },\n        {\n          "_id": "XXXXXXXXXX9",\n          "detalheQuantidade": "8",\n          "origem": "BANCO CENTRAL DO BRASIL",\n          "dataUltCheque": "10/04/2018",\n          "agencia": "358",\n          "nomeBanco": "-",\n          "codBanco": "104 - CAIXA ECONOMICA FEDERAL",\n          "descMotivo": "-",\n          "codMotivo": "12 - MOTIVO 12"\n        },\n        {\n          "_id": "XXXXXXXXXXa",\n          "detalheQuantidade": "1",\n          "origem": "BANCO CENTRAL DO BRASIL",\n          "dataUltCheque": "28/02/2018",\n          "agencia": "309",\n          "nomeBanco": "-",\n          "codBanco": "104 - CAIXA ECONOMICA FEDERAL",\n          "descMotivo": "-",\n          "codMotivo": "12 - MOTIVO 12"\n        },\n        {\n          "_id": "XXXXXXXXXXd",\n          "detalheQuantidade": "27",\n          "origem": "BANCO CENTRAL DO BRASIL",\n          "dataUltCheque": "18/05/2018",\n          "agencia": "4184",\n          "nomeBanco": "-",\n          "codBanco": "104 - CAIXA ECONOMICA FEDERAL",\n          "descMotivo": "-",\n          "codMotivo": "12 - MOTIVO 12"\n        },\n        {\n          "_id": "XXXXXXXXXXe",\n          "detalheQuantidade": "2",\n          "origem": "BANCO CENTRAL DO BRASIL",\n          "dataUltCheque": "19/04/2018",\n          "agencia": "2141",\n          "nomeBanco": "-",\n          "codBanco": "104 - CAIXA ECONOMICA FEDERAL",\n          "descMotivo": "-",\n          "codMotivo": "12 - MOTIVO 12"\n        },\n        {\n          "_id": "XXXXXXXXXXf",\n          "detalheQuantidade": "8",\n          "origem": "BANCO CENTRAL DO BRASIL",\n          "dataUltCheque": "10/04/2018",\n          "agencia": "358",\n          "nomeBanco": "-",\n          "codBanco": "104 - CAIXA ECONOMICA FEDERAL",\n          "descMotivo": "-",\n          "codMotivo": "12 - MOTIVO 12"\n        },\n        {\n          "_id": "XXXXXXXXXX0",\n          "detalheQuantidade": "1",\n          "origem": "BANCO CENTRAL DO BRASIL",\n          "dataUltCheque": "28/02/2018",\n          "agencia": "309",\n          "nomeBanco": "-",\n          "codBanco": "104 - CAIXA ECONOMICA FEDERAL",\n          "descMotivo": "-",\n          "codMotivo": "12 - MOTIVO 12"\n        }\n      ],\n      "dataUltimaOcorrencia": null,\n      "quantidade": 38,\n      "personInformation": "XXXXXXXXXX"\n    },\n    "pendenciaSpc": {\n      "_id": "XXXXXXXXXX0",\n      "__v": 3,\n      "detalhes": [\n        {\n          "_id": "XXXXXXXXXX1",\n          "valor": "2.724,07",\n          "participacao": "-",\n          "registroInstFinanceira": "-",\n          "contrato": "145658-146652",\n          "nomeEntidade": "CDL - FLORIANOPOLIS / SC",\n          "dataVencimento": "15/02/2018",\n          "dataInclusao": "27/04/2018",\n          "telefoneAssociado": "-",\n          "dddAssociado": "-",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "SOFTPLAN"\n        },\n        {\n          "_id": "XXXXXXXXXX2",\n          "valor": "2.724,07",\n          "participacao": "-",\n          "registroInstFinanceira": "-",\n          "contrato": "142980-143608",\n          "nomeEntidade": "CDL - FLORIANOPOLIS / SC",\n          "dataVencimento": "15/01/2018",\n          "dataInclusao": "28/03/2018",\n          "telefoneAssociado": "-",\n          "dddAssociado": "-",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "SOFTPLAN"\n        },\n        {\n          "_id": "XXXXXXXXXX3",\n          "valor": "2.724,07",\n          "participacao": "-",\n          "registroInstFinanceira": "-",\n          "contrato": "139163-139424",\n          "nomeEntidade": "CDL - FLORIANOPOLIS / SC",\n          "dataVencimento": "15/12/2017",\n          "dataInclusao": "23/02/2018",\n          "telefoneAssociado": "-",\n          "dddAssociado": "-",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "SOFTPLAN"\n        },\n        {\n          "_id": "XXXXXXXXXX4",\n          "valor": "2.724,07",\n          "participacao": "-",\n          "registroInstFinanceira": "-",\n          "contrato": "132554-130022",\n          "nomeEntidade": "CDL - FLORIANOPOLIS / SC",\n          "dataVencimento": "15/11/2017",\n          "dataInclusao": "25/01/2018",\n          "telefoneAssociado": "-",\n          "dddAssociado": "-",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "SOFTPLAN"\n        },\n        {\n          "_id": "XXXXXXXXXXff",\n          "valor": "2.724,07",\n          "participacao": "-",\n          "registroInstFinanceira": "-",\n          "contrato": "145658-146652",\n          "nomeEntidade": "CDL - FLORIANOPOLIS / SC",\n          "dataVencimento": "15/02/2018",\n          "dataInclusao": "27/04/2018",\n          "telefoneAssociado": "-",\n          "dddAssociado": "-",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "SOFTPLAN"\n        },\n        {\n          "_id": "XXXXXXXXXX0",\n          "valor": "2.724,07",\n          "participacao": "-",\n          "registroInstFinanceira": "-",\n          "contrato": "142980-143608",\n          "nomeEntidade": "CDL - FLORIANOPOLIS / SC",\n          "dataVencimento": "15/01/2018",\n          "dataInclusao": "28/03/2018",\n          "telefoneAssociado": "-",\n          "dddAssociado": "-",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "SOFTPLAN"\n        },\n        {\n          "_id": "XXXXXXXXXX1",\n          "valor": "2.724,07",\n          "participacao": "-",\n          "registroInstFinanceira": "-",\n          "contrato": "139163-139424",\n          "nomeEntidade": "CDL - FLORIANOPOLIS / SC",\n          "dataVencimento": "15/12/2017",\n          "dataInclusao": "23/02/2018",\n          "telefoneAssociado": "-",\n          "dddAssociado": "-",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "SOFTPLAN"\n        },\n        {\n          "_id": "XXXXXXXXXX2",\n          "valor": "2.724,07",\n          "participacao": "-",\n          "registroInstFinanceira": "-",\n          "contrato": "132554-130022",\n          "nomeEntidade": "CDL - FLORIANOPOLIS / SC",\n          "dataVencimento": "15/11/2017",\n          "dataInclusao": "25/01/2018",\n          "telefoneAssociado": "-",\n          "dddAssociado": "-",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "SOFTPLAN"\n        },\n        {\n          "_id": "XXXXXXXXXX8",\n          "valor": "2.724,07",\n          "participacao": "-",\n          "registroInstFinanceira": "-",\n          "contrato": "145658-146652",\n          "nomeEntidade": "CDL - FLORIANOPOLIS / SC",\n          "dataVencimento": "15/02/2018",\n          "dataInclusao": "27/04/2018",\n          "telefoneAssociado": "-",\n          "dddAssociado": "-",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "SOFTPLAN"\n        },\n        {\n          "_id": "XXXXXXXXXX9",\n          "valor": "2.724,07",\n          "participacao": "-",\n          "registroInstFinanceira": "-",\n          "contrato": "142980-143608",\n          "nomeEntidade": "CDL - FLORIANOPOLIS / SC",\n          "dataVencimento": "15/01/2018",\n          "dataInclusao": "28/03/2018",\n          "telefoneAssociado": "-",\n          "dddAssociado": "-",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "SOFTPLAN"\n        },\n        {\n          "_id": "XXXXXXXXXXa",\n          "valor": "2.724,07",\n          "participacao": "-",\n          "registroInstFinanceira": "-",\n          "contrato": "139163-139424",\n          "nomeEntidade": "CDL - FLORIANOPOLIS / SC",\n          "dataVencimento": "15/12/2017",\n          "dataInclusao": "23/02/2018",\n          "telefoneAssociado": "-",\n          "dddAssociado": "-",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "SOFTPLAN"\n        },\n        {\n          "_id": "XXXXXXXXXXb",\n          "valor": "2.724,07",\n          "participacao": "-",\n          "registroInstFinanceira": "-",\n          "contrato": "132554-130022",\n          "nomeEntidade": "CDL - FLORIANOPOLIS / SC",\n          "dataVencimento": "15/11/2017",\n          "dataInclusao": "25/01/2018",\n          "telefoneAssociado": "-",\n          "dddAssociado": "-",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "SOFTPLAN"\n        },\n        {\n          "_id": "XXXXXXXXXXe",\n          "valor": "2.724,07",\n          "participacao": "-",\n          "registroInstFinanceira": "-",\n          "contrato": "145658-146652",\n          "nomeEntidade": "CDL - FLORIANOPOLIS / SC",\n          "dataVencimento": "15/02/2018",\n          "dataInclusao": "27/04/2018",\n          "telefoneAssociado": "-",\n          "dddAssociado": "-",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "SOFTPLAN"\n        },\n        {\n          "_id": "XXXXXXXXXXf",\n          "valor": "2.724,07",\n          "participacao": "-",\n          "registroInstFinanceira": "-",\n          "contrato": "142980-143608",\n          "nomeEntidade": "CDL - FLORIANOPOLIS / SC",\n          "dataVencimento": "15/01/2018",\n          "dataInclusao": "28/03/2018",\n          "telefoneAssociado": "-",\n          "dddAssociado": "-",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "SOFTPLAN"\n        },\n        {\n          "_id": "XXXXXXXXXX0",\n          "valor": "2.724,07",\n          "participacao": "-",\n          "registroInstFinanceira": "-",\n          "contrato": "139163-139424",\n          "nomeEntidade": "CDL - FLORIANOPOLIS / SC",\n          "dataVencimento": "15/12/2017",\n          "dataInclusao": "23/02/2018",\n          "telefoneAssociado": "-",\n          "dddAssociado": "-",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "SOFTPLAN"\n        },\n        {\n          "_id": "XXXXXXXXXX1",\n          "valor": "2.724,07",\n          "participacao": "-",\n          "registroInstFinanceira": "-",\n          "contrato": "132554-130022",\n          "nomeEntidade": "CDL - FLORIANOPOLIS / SC",\n          "dataVencimento": "15/11/2017",\n          "dataInclusao": "25/01/2018",\n          "telefoneAssociado": "-",\n          "dddAssociado": "-",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "SOFTPLAN"\n        }\n      ],\n      "valorTotal": "2.724,07 (Ultima ocorrencia)",\n      "dataUltimaOcorrencia": "04/2018",\n      "quantidade": 4,\n      "personInformation": "XXXXXXXXXX"\n    },\n    "ultimoEnderecoInformado": null,\n    "telefoneVinculado": null,\n    "featuresOpcionais": {\n      "_id": "XXXXXXXXXX0",\n      "__v": 0,\n      "email": null,\n      "locEndTel": null,\n      "score12Meses": null,\n      "rendaPresumida": {\n        "renda": null,\n        "codigo": null,\n        "retorno": null\n      },\n      "participacaoSocietaria": null,\n      "score": null,\n      "faturamentoPresumido": {\n        "faturamento": "639.235,00",\n        "filiais": "-",\n        "porte": "-",\n        "num_funcionarios": "-",\n        "retorno": "CONSTA FATURAMENTO PRESUMIDO PARA O DOCUMENTO INFORMADO",\n        "codigo": "1"\n      },\n      "qsa": {\n        "registro": {\n          "data": "-",\n          "percentual": "-",\n          "qualificacao_global": "-",\n          "qualificacao": "TITULAR PESSOA FISICA RESIDENTE OU DOMICILIADO NO BRASIL",\n          "nome": "FABIO MARTINS",\n          "documento": "5387307901",\n          "nome_razao": "URBANIZEMAIS LOTEADORA E INCORPORADORA DE BAURU EIRELI",\n          "cpfcnpj": "XXXXXXXXXX7"\n        },\n        "quantidade": "1",\n        "retorno": "CONSTA QUADRO SOCIETARIO ADMINISTRATIVO PARA O DOCUMENTO INFORMADO",\n        "codigo": "1"\n      },\n      "representanteLegal": null,\n      "personInformation": "XXXXXXXXXX"\n    },\n    "ultimoTelefoneInformado": null,\n    "telefoneConsultado": {\n      "quantidade": 0\n    },\n    "endCepConsultado": null,\n    "baseNegativacao": null,\n    "dadosCadastrais": {\n      "descricaoNaturezaJuridica": null,\n      "codigoNaturezaJuridica": null,\n      "descricaoCnae": null,\n      "codigoCnae": null,\n      "dataFundacao": null,\n      "nomeFantasia": null,\n      "razaoSocial": null,\n      "dataSituacaoCnpj": null,\n      "situacaoCnpj": null,\n      "email": null,\n      "estadoCivil": null,\n      "tituloEleitor": null,\n      "nomePai": null,\n      "nomeMae": "SILVANA MARTINS DE ALMEIDA",\n      "telNum": "991594650",\n      "telDdd": "99",\n      "endEstado": "SP",\n      "endCidade": "SAO PAULO",\n      "endBairro": "ITABERABA",\n      "endCep": "02739000",\n      "endComplemento": null,\n      "endNum": "2217",\n      "endTipoLogradouro": "AV",\n      "endLogradouro": "ITABERABA",\n      "sexo": "M",\n      "idade": "25",\n      "signo": "AQUARIO",\n      "rg": null,\n      "dataNascimento": "21/01/1993",\n      "dataSituacaoCpf": null,\n      "situacaoCpf": null,\n      "documentoOrigem": null,\n      "documento": null,\n      "nome": "YAGO DE ALMEIDA TEIXEIRA"\n    },\n    "documento": "XXXXXXXXXX",\n    "status": true,\n    "createAt": "2018-05-24T13:51:38.612Z"\n  }\n}',
                        type: 'json',
                    },
                ],
            },
            filename:
                'apidoc/person_information/apidoc_DocumentInformationQuery.js',
            groupTitle: 'Consultas_PF_PJ',
        },
        {
            type: 'get',
            url: '/api/person/:queryid',
            title: 'Buscar Consulta de Pessoa Física e Pessoa Jurídica por ID',
            version: '0.2.0',
            name: 'PersonInformation',
            group: 'Consultas_PF_PJ',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'id',
                            description: '<p>da consulta</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'querycode',
                            description:
                                '<p>Código da consulta a ser realizada. Os códigos de consultas disponíveis podem ser encontrados na requisição (#Consultas:GetEnablesQueries).</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'Object',
                            optional: false,
                            field: 'keys',
                            description:
                                '<p>Chaves para realização da consulta</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'keys.cpf',
                            description:
                                '<p>O CPF para realização da consulta de pessoa física</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'keys.cnpj',
                            description:
                                '<p>O CPNJ para realização da consulta de pessoa jurídica</p>',
                        },
                    ],
                },
                examples: [
                    {
                        title: 'Request-Example:',
                        content:
                            '{\n  "querycode":1,\n  "keys" : {\n    "cpf" : "0000000000"\n  }\n}',
                        type: 'json',
                    },
                    {
                        title: 'Request-Example:',
                        content:
                            '{\n  "querycode":1,\n  "keys" : {\n    "cnpj" : "0000000000"\n  }\n}',
                        type: 'json',
                    },
                ],
            },
            description:
                '<p>O parâmetro Query_ID deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br> <b>EX: /api/person/&lt;Query_ID&gt;</b></p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": {\n    "_id": "XXXXX2XXXXXXa5444EEEEEE9da4",\n    "__v": 0,\n    "cadastroCompleto": {\n      "_id": "5XXXXXXXXXXXXXXXX9d14b26b0",\n      "__v": 3,\n      "informacoesAdicionais": {\n        "telefones": {\n          "telefone": [\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n             "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "61",\n              "numero": "999624924"\n            },\n            {\n              "ddd": "61",\n              "numero": "996542359"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "00",\n              "numero": "000000000"\n            },\n            {\n              "ddd": "11",\n              "numero": "995888843"\n            },\n            {\n              "ddd": "31",\n              "numero": "991674254"\n            },\n            {\n              "ddd": "11",\n              "numero": "964892017"\n            },\n            {\n              "ddd": "11",\n              "numero": "964972980"\n            },\n            {\n              "ddd": "12",\n              "numero": "997065316"\n            },\n            {\n              "ddd": "22",\n              "numero": "998251236"\n            },\n            {\n              "ddd": "92",\n              "numero": "991580399"\n            },\n            {\n              "ddd": "93",\n              "numero": "991393971"\n            },\n            {\n              "ddd": "11",\n              "numero": "998930227"\n            },\n            {\n              "ddd": "11",\n              "numero": "964891339"\n            },\n            {\n              "ddd": "21",\n              "numero": "997344193"\n            },\n            {\n              "ddd": "11",\n              "numero": "964976496"\n            },\n            {\n              "ddd": "11",\n              "numero": "964040434"\n            },\n            {\n              "ddd": "41",\n              "numero": "991662230"\n            },\n            {\n              "ddd": "81",\n              "numero": "996458265"\n            },\n            {\n              "ddd": "44",\n              "numero": "991348070"\n            },\n            {\n              "ddd": "31",\n              "numero": "988153509"\n            },\n            {\n              "ddd": "31",\n              "numero": "992198404"\n            },\n            {\n              "ddd": "55",\n              "numero": "999685233"\n            },\n            {\n              "ddd": "44",\n              "numero": "991349292"\n            },\n            {\n              "ddd": "11",\n              "numero": "964891840"\n            },\n            {\n              "ddd": "21",\n              "numero": "984109954"\n            },\n            {\n              "ddd": "51",\n              "numero": "998483045"\n            },\n            {\n              "ddd": "11",\n              "numero": "972071360"\n            },\n            {\n              "ddd": "31",\n              "numero": "993021669"\n            },\n            {\n              "ddd": "92",\n              "numero": "991660982"\n            },\n            {\n              "ddd": "31",\n              "numero": "991642338"\n            },\n            {\n              "ddd": "11",\n              "numero": "975948131"\n            },\n            {\n              "ddd": "11",\n              "numero": "964890313"\n            },\n            {\n              "ddd": "21",\n              "numero": "997911898"\n            },\n            {\n              "ddd": "31",\n              "numero": "991379732"\n            },\n            {\n              "ddd": "11",\n              "numero": "964897561"\n            },\n            {\n              "ddd": "21",\n              "numero": "994952132"\n            },\n            {\n              "ddd": "51",\n              "numero": "999455823"\n            },\n            {\n              "ddd": "31",\n              "numero": "991788017"\n            },\n            {\n              "ddd": "51",\n              "numero": "998364744"\n            },\n            {\n              "ddd": "31",\n              "numero": "989241871"\n            },\n            {\n              "ddd": "31",\n              "numero": "987086853"\n            },\n            {\n              "ddd": "11",\n              "numero": "964976859"\n            },\n            {\n              "ddd": "21",\n              "numero": "999256440"\n            },\n            {\n              "ddd": "11",\n              "numero": "974997313"\n            },\n            {\n              "ddd": "21",\n              "numero": "985093743"\n            },\n            {\n              "ddd": "85",\n              "numero": "986711208"\n            },\n            {\n              "ddd": "11",\n              "numero": "964978649"\n            },\n            {\n              "ddd": "11",\n              "numero": "964968593"\n            },\n            {\n              "ddd": "31",\n              "numero": "993043833"\n            },\n            {\n              "ddd": "11",\n              "numero": "973427430"\n            },\n            {\n              "ddd": "21",\n              "numero": "996157712"\n            },\n            {\n              "ddd": "11",\n              "numero": "964897036"\n            },\n            {\n              "ddd": "11",\n              "numero": "997966981"\n            },\n            {\n              "ddd": "31",\n              "numero": "992125332"\n            },\n            {\n              "ddd": "11",\n              "numero": "964890117"\n            },\n            {\n              "ddd": "11",\n              "numero": "974470542"\n            },\n            {\n              "ddd": "31",\n              "numero": "991517494"\n            },\n            {\n              "ddd": "11",\n              "numero": "975112858"\n            },\n            {\n              "ddd": "11",\n              "numero": "964983582"\n            },\n            {\n              "ddd": "92",\n              "numero": "991211410"\n            },\n            {\n              "ddd": "44",\n              "numero": "991352260"\n            },\n            {\n              "ddd": "44",\n              "numero": "991343290"\n            },\n            {\n              "ddd": "92",\n              "numero": "991553959"\n            },\n            {\n              "ddd": "11",\n              "numero": "964972973"\n            },\n            {\n              "ddd": "11",\n              "numero": "964890418"\n            },\n            {\n              "ddd": "31",\n              "numero": "987252131"\n            },\n            {\n              "ddd": "11",\n              "numero": "964891305"\n            },\n            {\n              "ddd": "31",\n              "numero": "982258880"\n            },\n            {\n              "ddd": "46",\n              "numero": "991096471"\n            },\n            {\n              "ddd": "11",\n              "numero": "995306179"\n            },\n            {\n              "ddd": "11",\n              "numero": "964891742"\n            },\n            {\n              "ddd": "31",\n              "numero": "993027771"\n            },\n            {\n              "ddd": "21",\n              "numero": "988017291"\n            },\n            {\n              "ddd": "71",\n              "numero": "988450930"\n            },\n            {\n              "ddd": "11",\n              "numero": "964995726"\n            },\n            {\n              "ddd": "55",\n              "numero": "999238736"\n            },\n            {\n              "ddd": "11",\n              "numero": "964972560"\n            },\n            {\n              "ddd": "92",\n              "numero": "991182957"\n            },\n            {\n              "ddd": "45",\n              "numero": "991065113"\n            },\n            {\n              "ddd": "92",\n              "numero": "991623167"\n            },\n            {\n              "ddd": "11",\n              "numero": "997444056"\n            },\n            {\n              "ddd": "92",\n              "numero": "991550420"\n            },\n            {\n              "ddd": "11",\n              "numero": "964972724"\n            },\n            {\n              "ddd": "46",\n              "numero": "991097927"\n            },\n            {\n              "ddd": "14",\n              "numero": "997964378"\n            },\n            {\n              "ddd": "21",\n              "numero": "984469305"\n            },\n            {\n              "ddd": "54",\n              "numero": "999656579"\n            },\n            {\n              "ddd": "31",\n              "numero": "991890905"\n            },\n            {\n              "ddd": "45",\n              "numero": "991166479"\n            },\n            {\n              "ddd": "31",\n              "numero": "986537521"\n            },\n            {\n              "ddd": "11",\n              "numero": "964895036"\n            },\n            {\n              "ddd": "22",\n              "numero": "999189877"\n            },\n            {\n              "ddd": "11",\n              "numero": "995453408"\n            },\n            {\n              "ddd": "31",\n              "numero": "992372067"\n            },\n            {\n              "ddd": "11",\n              "numero": "964973378"\n            },\n            {\n              "ddd": "11",\n              "numero": "964892575"\n            },\n            {\n              "ddd": "11",\n              "numero": "964040682"\n            },\n            {\n              "ddd": "11",\n              "numero": "964891060"\n            },\n            {\n              "ddd": "11",\n              "numero": "971444159"\n            },\n            {\n              "ddd": "51",\n              "numero": "996139756"\n            },\n            {\n              "ddd": "11",\n              "numero": "964890943"\n            },\n            {\n              "ddd": "11",\n              "numero": "964890545"\n            },\n            {\n              "ddd": "44",\n              "numero": "991350595"\n            },\n            {\n              "ddd": "11",\n              "numero": "964703580"\n            },\n            {\n              "ddd": "11",\n              "numero": "964973183"\n            },\n            {\n              "ddd": "31",\n              "numero": "992425596"\n            },\n            {\n              "ddd": "54",\n              "numero": "999373858"\n            },\n            {\n              "ddd": "11",\n              "numero": "964976355"\n            },\n            {\n              "ddd": "11",\n              "numero": "998745632"\n            },\n            {\n              "ddd": "92",\n              "numero": "991578848"\n            },\n            {\n              "ddd": "11",\n              "numero": "964040595"\n            },\n            {\n              "ddd": "31",\n              "numero": "986569812"\n            },\n            {\n              "ddd": "11",\n              "numero": "973049597"\n            },\n            {\n              "ddd": "11",\n              "numero": "964985087"\n            },\n            {\n              "ddd": "11",\n              "numero": "972789735"\n            },\n            {\n              "ddd": "11",\n              "numero": "964891457"\n            },\n            {\n              "ddd": "11",\n              "numero": "973928153"\n            },\n            {\n              "ddd": "11",\n              "numero": "964984530"\n            },\n            {\n              "ddd": "31",\n              "numero": "991962658"\n            },\n            {\n              "ddd": "11",\n              "numero": "996576489"\n            },\n            {\n              "ddd": "11",\n              "numero": "964701767"\n            },\n            {\n              "ddd": "11",\n              "numero": "997225133"\n            },\n            {\n              "ddd": "92",\n              "numero": "991491141"\n            },\n            {\n              "ddd": "31",\n              "numero": "991274343"\n            },\n            {\n              "ddd": "44",\n              "numero": "991350197"\n            },\n            {\n              "ddd": "44",\n              "numero": "991350002"\n            },\n            {\n              "ddd": "46",\n              "numero": "991117195"\n            },\n            {\n              "ddd": "44",\n              "numero": "991352021"\n            },\n            {\n              "ddd": "55",\n              "numero": "999649035"\n            },\n            {\n              "ddd": "44",\n              "numero": "991347759"\n            },\n            {\n              "ddd": "44",\n              "numero": "991345922"\n            },\n            {\n              "ddd": "55",\n              "numero": "999264338"\n            },\n            {\n              "ddd": "31",\n              "numero": "991465176"\n            },\n            {\n              "ddd": "46",\n              "numero": "991084064"\n            },\n            {\n              "ddd": "92",\n              "numero": "991536226"\n            },\n            {\n              "ddd": "21",\n              "numero": "995439980"\n            },\n            {\n              "ddd": "11",\n              "numero": "954747252"\n            },\n            {\n              "ddd": "21",\n              "numero": "995348353"\n            },\n            {\n              "ddd": "43",\n              "numero": "991223568"\n            },\n            {\n              "ddd": "11",\n              "numero": "999541415"\n            },\n            {\n              "ddd": "41",\n              "numero": "996057485"\n            },\n            {\n              "ddd": "47",\n              "numero": "999695511"\n            },\n            {\n              "ddd": "24",\n              "numero": "998121295"\n            },\n            {\n              "ddd": "96",\n              "numero": "991192088"\n            },\n            {\n              "ddd": "41",\n              "numero": "991262470"\n            },\n            {\n              "ddd": "94",\n              "numero": "991662622"\n            },\n            {\n              "ddd": "91",\n              "numero": "991858201"\n            },\n            {\n              "ddd": "16",\n              "numero": "997938880"\n            },\n            {\n              "ddd": "21",\n              "numero": "997041481"\n            },\n            {\n              "ddd": "11",\n              "numero": "982649090"\n            },\n            {\n              "ddd": "13",\n              "numero": "997088506"\n            },\n            {\n              "ddd": "83",\n              "numero": "987640105"\n            },\n            {\n              "ddd": "44",\n              "numero": "991045933"\n            },\n            {\n              "ddd": "31",\n              "numero": "993620917"\n            },\n            {\n              "ddd": "11",\n              "numero": "991686534"\n            },\n            {\n              "ddd": "12",\n              "numero": "997333582"\n            },\n            {\n              "ddd": "11",\n              "numero": "998149308"\n            },\n            {\n              "ddd": "53",\n              "numero": "991150080"\n            },\n            {\n              "ddd": "24",\n              "numero": "999954618"\n            },\n            {\n              "ddd": "31",\n              "numero": "985641762"\n            },\n            {\n              "ddd": "44",\n              "numero": "991040344"\n            },\n            {\n              "ddd": "47",\n              "numero": "999238093"\n            },\n            {\n              "ddd": "45",\n              "numero": "991082256"\n            },\n            {\n              "ddd": "47",\n              "numero": "991943311"\n            },\n            {\n              "ddd": "41",\n              "numero": "999877227"\n            },\n            {\n              "ddd": "84",\n              "numero": "996948353"\n            },\n            {\n              "ddd": "11",\n              "numero": "997894875"\n            },\n            {\n              "ddd": "15",\n              "numero": "997275077"\n            },\n            {\n              "ddd": "31",\n              "numero": "993288454"\n            },\n            {\n              "ddd": "43",\n              "numero": "984831597"\n            },\n            {\n              "ddd": "42",\n              "numero": "991227518"\n            },\n            {\n              "ddd": "19",\n              "numero": "996101000"\n            },\n            {\n              "ddd": "31",\n              "numero": "988967283"\n            },\n            {\n              "ddd": "11",\n              "numero": "999653737"\n            },\n            {\n              "ddd": "11",\n              "numero": "970949044"\n            },\n            {\n              "ddd": "81",\n              "numero": "996580154"\n            },\n            {\n              "ddd": "11",\n              "numero": "974890306"\n            },\n            {\n              "ddd": "41",\n              "numero": "992580835"\n            },\n            {\n              "ddd": "11",\n              "numero": "965310184"\n            },\n            {\n              "ddd": "14",\n              "numero": "996984726"\n            },\n            {\n              "ddd": "54",\n              "numero": "999673889"\n            },\n            {\n              "ddd": "11",\n              "numero": "971086146"\n            },\n            {\n              "ddd": "31",\n              "numero": "993288864"\n            },\n            {\n              "ddd": "17",\n              "numero": "996227922"\n            },\n            {\n              "ddd": "11",\n              "numero": "982880801"\n            },\n            {\n              "ddd": "24",\n              "numero": "999057457"\n            },\n            {\n              "ddd": "21",\n              "numero": "992044404"\n            },\n            {\n              "ddd": "21",\n              "numero": "982275101"\n            },\n            {\n              "ddd": "11",\n              "numero": "999075637"\n            },\n            {\n              "ddd": "41",\n              "numero": "991818713"\n            },\n            {\n              "ddd": "47",\n              "numero": "991467142"\n            },\n            {\n              "ddd": "45",\n              "numero": "991013586"\n            },\n            {\n              "ddd": "43",\n              "numero": "991039621"\n            },\n            {\n              "ddd": "92",\n              "numero": "991878676"\n            },\n            {\n              "ddd": "42",\n              "numero": "991151711"\n            },\n            {\n              "ddd": "48",\n              "numero": "991052805"\n            },\n            {\n              "ddd": "22",\n              "numero": "999091557"\n            },\n            {\n              "ddd": "13",\n              "numero": "996024256"\n            },\n            {\n              "ddd": "11",\n              "numero": "957865094"\n            },\n            {\n              "ddd": "11",\n              "numero": "27862145"\n            },\n            {\n              "ddd": "11",\n              "numero": "39647046"\n            },\n            {\n              "ddd": "48",\n              "numero": "32118629"\n            },\n            {\n              "ddd": "11",\n              "numero": "39647064"\n            },\n            {\n              "ddd": "41",\n              "numero": "32051746"\n            },\n            {\n              "ddd": "41",\n              "numero": "32679176"\n            },\n            {\n              "ddd": "31",\n              "numero": "33175931"\n            },\n            {\n              "ddd": "48",\n              "numero": "32064912"\n            },\n            {\n              "ddd": "11",\n              "numero": "45214908"\n            },\n            {\n              "ddd": "48",\n              "numero": "32285679"\n            },\n            {\n              "ddd": "11",\n              "numero": "39640125"\n            },\n            {\n              "ddd": "11",\n              "numero": "39647330"\n            },\n            {\n              "ddd": "47",\n              "numero": "36453021"\n            },\n            {\n              "ddd": "31",\n              "numero": "991306244"\n            },\n            {\n              "ddd": "31",\n              "numero": "991182426"\n            },\n            {\n              "ddd": "31",\n              "numero": "991305863"\n            },\n            {\n              "ddd": "63",\n              "numero": "999620018"\n            },\n            {\n              "ddd": "31",\n              "numero": "993551520"\n            },\n            {\n              "ddd": "41",\n              "numero": "999234574"\n            },\n            {\n              "ddd": "66",\n              "numero": "999671199"\n            },\n            {\n              "ddd": "31",\n              "numero": "993624003"\n            }\n          ]\n        },\n        "enderecos": {\n          "endereco": [\n            {\n              "tipo_logradouro": "R",\n              "logradouro": "DOUTOR LISBOA",\n              "numero": "00",\n              "complemento": "CS",\n              "cep": "37550000",\n              "bairro": "CENTRO",\n              "cidade": "POUSO ALEGRE",\n              "estado": "MG"\n            },\n            {\n              "tipo_logradouro": "R VELHA",\n              "logradouro": "CORONEL FERNANDO PRESTES",\n              "numero": "00",\n              "complemento": "AP 4",\n              "cep": "09020110",\n              "bairro": "CENTRO",\n              "cidade": "SANTO ANDRE",\n              "estado": "SP"\n            },\n            {\n              "tipo_logradouro": "AL",\n              "logradouro": "FRANCA",\n              "numero": "00",\n              "complemento": "AP 42",\n              "cep": "01422002",\n              "bairro": "JARDIM PAULISTA",\n              "cidade": "SAO PAULO",\n              "estado": "SP"\n            },\n            {\n              "tipo_logradouro": "AL",\n              "logradouro": "BARAO DE LIMEIRA",\n              "numero": "00",\n              "cep": "01202001",\n              "bairro": "CAMPOS ELISEOS",\n              "cidade": "SAO PAULO",\n              "estado": "SP"\n            },\n            {\n              "tipo_logradouro": "R",\n              "logradouro": "COLUMBIA",\n              "numero": "00",\n              "cep": "09241000",\n              "bairro": "PARQUE DAS NACOES",\n              "cidade": "SANTO ANDRE",\n              "estado": "SP"\n            },\n            {\n              "tipo_logradouro": "R",\n              "logradouro": "IBIRAREMA",\n              "numero": "298",\n              "cep": "04136000",\n              "bairro": "BOSQUE DA SAUDE",\n              "cidade": "SAO PAULO",\n              "estado": "SP"\n            },\n            {\n              "tipo_logradouro": "R",\n              "logradouro": "BERGAMOTA",\n              "numero": "00",\n              "complemento": "AP 51",\n              "cep": "05468000",\n              "bairro": "ALTO DA LAPA",\n              "cidade": "SAO PAULO",\n              "estado": "SP"\n            },\n            {\n              "tipo_logradouro": "AV",\n              "logradouro": "HERCILIO LUZ",\n              "numero": "881",\n              "complemento": "AP 307",\n              "cep": "88020001",\n              "bairro": "CENTRO",\n              "cidade": "FLORIANOPOLIS",\n              "estado": "SC"\n            },\n            {\n              "tipo_logradouro": "R VELHA",\n              "logradouro": "CASIMIRO TOSI",\n              "numero": "304",\n              "cep": "82810710",\n              "bairro": "CAPAO DA IMBUIA",\n              "cidade": "CURITIBA",\n              "estado": "PR"\n            },\n            {\n              "tipo_logradouro": "R VELHA",\n              "logradouro": "PREFEITO VASCO ANTONIO VENCHIARUTTI",\n              "numero": "230",\n              "cep": "13216290",\n              "bairro": "JARDIM DA FONTE",\n              "cidade": "JUNDIAI",\n              "estado": "SP"\n            },\n            {\n              "tipo_logradouro": "R VELHA",\n              "logradouro": "HENFIL",\n              "numero": "75",\n              "cep": "13208063",\n              "bairro": "ANHANGABAU",\n              "cidade": "JUNDIAI",\n              "estado": "SP"\n            },\n            {\n              "tipo_logradouro": "R VELHA",\n              "logradouro": "FRANCISCO NANO",\n              "numero": "40",\n              "cep": "13202242",\n              "bairro": "VILA PROGRESSO",\n              "cidade": "JUNDIAI",\n              "estado": "SP"\n            },\n            {\n              "tipo_logradouro": "R VELHA",\n              "logradouro": "ROSADA",\n              "numero": "182",\n              "cep": "31970695",\n              "bairro": "VITORIA",\n              "cidade": "BELO HORIZONTE",\n              "estado": "MG"\n            },\n            {\n              "tipo_logradouro": "R VELHA",\n              "logradouro": "ALMIRANTE LAMEGO",\n              "numero": "1274",\n              "complemento": "AP 702",\n              "cep": "88015601",\n              "bairro": "CENTRO",\n              "cidade": "FLORIANOPOLIS",\n              "estado": "SC"\n            },\n            {\n              "tipo_logradouro": "R VELHA",\n              "logradouro": "PROFESSORA ESCOLASTICA DE TOLEDO PONTES",\n              "numero": "314",\n              "cep": "13209290",\n              "bairro": "VILA MARIA LUIZA",\n              "cidade": "JUNDIAI",\n              "estado": "SP"\n            },\n            {\n              "tipo_logradouro": "R",\n              "logradouro": "SAO JOSE",\n              "numero": "27",\n              "cep": "02326140",\n              "bairro": "JARDIM FELICIDADE",\n              "cidade": "SAO PAULO",\n              "estado": "SP"\n            },\n            {\n              "tipo_logradouro": "R",\n              "logradouro": "ADELINA MARIA DA COSTA",\n              "numero": "165",\n              "cep": "36050400",\n              "bairro": "PROGRESSO",\n              "cidade": "JUIZ DE FORA",\n              "estado": "MG"\n            },\n            {\n              "tipo_logradouro": "R",\n              "logradouro": "NOVE",\n              "numero": "39",\n              "complemento": "CS",\n              "cep": "79200000",\n              "bairro": "CENTRO",\n              "cidade": "AQUIDAUANA",\n              "estado": "MS"\n            },\n            {\n              "tipo_logradouro": "R",\n              "logradouro": "BENJAMIN CHADID",\n              "numero": "1",\n              "cep": "79106280",\n              "bairro": "JARDIM ITALIA",\n              "cidade": "CAMPO GRANDE",\n              "estado": "MS"\n            },\n            {\n              "tipo_logradouro": "R",\n              "logradouro": "CAVALEIRO DA ROSA",\n              "numero": "589",\n              "cep": "79013210",\n              "bairro": "CONJUNTO RESIDENCIAL ESTRELA DO SUL",\n              "cidade": "CAMPO GRANDE",\n              "estado": "MS"\n            },\n            {\n              "tipo_logradouro": "R",\n              "logradouro": "VICENTE VIEIRA DA MOTA",\n              "numero": "254",\n              "cep": "36051440",\n              "bairro": "SAO TARCISIO",\n              "cidade": "JUIZ DE FORA",\n              "estado": "MG"\n            },\n            {\n              "tipo_logradouro": "R",\n              "logradouro": "PAULO GARCIA",\n              "numero": "394",\n              "cep": "36090340",\n              "bairro": "BENFICA",\n              "cidade": "JUIZ DE FORA",\n              "estado": "MG"\n            },\n            {\n              "tipo_logradouro": "R",\n              "logradouro": "SETE DE SETEMBRO",\n              "numero": "120",\n              "cep": "45000540",\n              "bairro": "CENTRO",\n              "cidade": "VITORIA DA CONQUISTA",\n              "estado": "BA"\n            },\n            {\n              "tipo_logradouro": "AV",\n              "logradouro": "DOUTOR AUGUSTO DE TOLEDO",\n              "numero": "744",\n              "complemento": "AP 3",\n              "cep": "09540080",\n              "bairro": "SANTA PAULA",\n              "cidade": "SAO CAETANO DO SUL",\n              "estado": "SP"\n            },\n            {\n              "tipo_logradouro": "R",\n              "logradouro": "PEDRO CANDIAN",\n              "numero": "177",\n              "cep": "36500000",\n              "cidade": "UBA",\n              "estado": "MG"\n            },\n            {\n              "tipo_logradouro": "R",\n              "logradouro": "DOUTOR SEBASTIAO JOSE MACHADO",\n              "numero": "3",\n              "cep": "79006470",\n              "bairro": "VILA BANDEIRANTE",\n              "cidade": "CAMPO GRANDE",\n              "estado": "MS"\n            },\n            {\n              "tipo_logradouro": "PC",\n              "logradouro": "N NOSSA SENHORA CONCEICAO",\n              "numero": "90",\n              "cep": "79200000",\n              "bairro": "CENTRO",\n              "cidade": "AQUIDAUANA",\n              "estado": "MS"\n            },\n            {\n              "tipo_logradouro": "R",\n              "logradouro": "LOWNDES",\n              "numero": "202",\n              "complemento": "BAIXOS",\n              "cep": "11015080",\n              "bairro": "VILA MATHIAS",\n              "cidade": "SANTOS",\n              "estado": "SP"\n            },\n            {\n              "tipo_logradouro": "AV",\n              "logradouro": "PRESIDENTE COSTA E SILVA",\n              "numero": "1293",\n              "cep": "06626000",\n              "bairro": "JARDIM EUROPA",\n              "cidade": "JANDIRA",\n              "estado": "SP"\n            },\n            {\n              "tipo_logradouro": "R",\n              "logradouro": "ANGELA CECILIA TOLARDO",\n              "numero": "129",\n              "complemento": "CS",\n              "cep": "88317195",\n              "bairro": "ESPINHEIROS",\n              "cidade": "ITAJAI",\n              "estado": "SC"\n            },\n            {\n              "tipo_logradouro": "SRV",\n              "logradouro": "POR DO SOL",\n              "numero": "300",\n              "cep": "88049355",\n              "bairro": "TAPERA",\n              "cidade": "FLORIANOPOLIS",\n              "estado": "SC"\n            },\n            {\n              "tipo_logradouro": "R",\n              "logradouro": "AZIZ NACHIF",\n              "numero": "38",\n              "cep": "79062430",\n              "bairro": "JARDIM ITAMARACA",\n              "cidade": "CAMPO GRANDE",\n              "estado": "MS"\n            },\n            {\n              "tipo_logradouro": "R",\n              "logradouro": "SIQUEIRA CAMPOS",\n              "numero": "55",\n              "complemento": "CS",\n              "cep": "89300000",\n              "bairro": "CENTRO",\n              "cidade": "MAFRA",\n              "estado": "SC"\n            }\n          ]\n        }\n      },\n      "informacoesComplementares": {\n        "nomemae": "MARIA JOSE DA SILVA VALORES"\n      },\n      "participacaoSocietaria": [\n        {\n          "mensagem": "NENHUM REGISTRO ENCONTRADO"\n        },\n        null\n      ],\n      "personInformation": "XXXXXXXXXXXXXXXXXXa553c099da4"\n    },\n    "creditoSimples": {\n      "_id": "5ae38fd840231b695613eafb",\n      "__v": 0,\n      "dataConsulta": "23-07-2018 16:05:48",\n      "restricao": "EXISTE RESTRICAO PARA O DOCUMENTO CONSULTADO",\n      "chequeSemFundoVarejo": {\n        "quantidade": null\n      },\n      "personInformation": "XXXXXXXXXXXXXXXXXXa553c099da4"\n    },\n    "restricaoTotal": {\n      "_id": "5XXXXXXXXXXXXX553c099da5",\n      "__v": 0,\n      "chequeConsultaOnlineSrs": {\n        "quantidade": 0\n      },\n      "dadosAgenciaBancaria": null,\n      "contumacia": {\n        "quantidade": 0\n      },\n      "contraOrdem": {\n        "quantidade": 0\n      },\n      "grafiaPj": {\n        "registros": []\n      },\n      "personInformation": null\n    },\n    "pefinBvs": {\n      "_id": "XXXXXXXXXXXXXXXXXXXXX553c099daf",\n      "__v": 13,\n      "restricao": "EXISTE RESTRICAO PARA O DOCUMENTO CONSULTADO",\n      "detalhes": [\n        {\n          "_id": "XXXXXXXXXXXXXXXXX1d04030c8947c",\n          "valor": "10",\n          "tipoMoeda": "R$",\n          "condicao": "ATIVO",\n          "uf": "SP",\n          "cidade": "SCPC SAO PAULO",\n          "consulente": "-",\n          "informante": "CENTRAL DE SERVICOS TI",\n          "dataDisponibilizacao": "19/12/2017",\n          "dataOcorrencia": "10/08/2016",\n          "contrato": "123456",\n          "tipoDebito": "RG-REGISTRADO"\n        },\n        {\n          "_id": "XXXXXXXXXXXXXXXXXXXX4030c8947d",\n          "valor": "5532,92",\n          "tipoMoeda": "R$",\n          "condicao": "ATIVO",\n          "uf": "PR",\n          "cidade": "CURITIBA",\n          "consulente": "-",\n          "informante": "SANEPAR",\n          "dataDisponibilizacao": "30/09/2016",\n          "dataOcorrencia": "17/06/2016",\n          "contrato": "123456",\n          "tipoDebito": "RG-REGISTRADO"\n        },\n        {\n          "_id": "XXXXXXXXXXXXXXXXXXX04030c8947e",\n          "valor": "10",\n          "tipoMoeda": "R$",\n          "condicao": "ATIVO",\n          "uf": "SP",\n          "cidade": "SCPC SAO PAULO",\n          "consulente": "-",\n          "informante": "CAIXA ECONOMICA FEDERAL",\n          "dataDisponibilizacao": "02/08/2016",\n          "dataOcorrencia": "09/05/2016",\n          "contrato": "123456",\n          "tipoDebito": "RG-REGISTRADO"\n        },\n        {\n          "_id": "5b562XXXXXXXXXXXXXXXX47f",\n          "valor": "1290,65",\n          "tipoMoeda": "R$",\n          "condicao": "ATIVO",\n          "uf": "PR",\n          "cidade": "CURITIBA",\n          "consulente": "-",\n          "informante": "SANEPAR",\n          "dataDisponibilizacao": "30/01/2016",\n          "dataOcorrencia": "19/10/2015",\n          "contrato": "123456",\n          "tipoDebito": "RG-REGISTRADO"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXX89480",\n          "valor": "855",\n          "tipoMoeda": "R$",\n          "condicao": "ATIVO",\n          "uf": "SP",\n          "cidade": "CAMPINAS",\n          "consulente": "-",\n          "informante": "SP-CAS/RAIO DE LUZ",\n          "dataDisponibilizacao": "06/03/2015",\n          "dataOcorrencia": "15/11/2013",\n          "contrato": "123456",\n          "tipoDebito": "RG-REGISTRADO"\n        }\n      ],\n      "dadosCadastrais": {\n        "nomeMae": "-",\n        "dataNascimento": null,\n        "documento": "123456",\n        "nome": "SEBASTIANA M DE CARVALHO"\n      },\n      "dadosConsulta": {\n        "horaConsulta": "16:10",\n        "dataConsulta": "23/07/2018",\n        "tipoConsulta": "Pefin BVS",\n        "documento": "123456"\n      },\n      "personInformation": "XXXXXXXXXXXXXXXXXXa553c099da4"\n    },\n    "protesto": {\n      "_id": "5aXXXXXXXXXXXXXXXXX952dc0",\n      "__v": 6,\n      "detalhes": [\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXX9535",\n          "valor": "100,00",\n          "data": "13/10/2016",\n          "ufCartorio": "SC",\n          "cidadeCartorio": "RIO DO SUL",\n          "nomeCartorio": "0003"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXX9536",\n          "valor": "134,40",\n          "data": "05/10/2015",\n          "ufCartorio": "BA",\n          "cidadeCartorio": "SALVADOR",\n          "nomeCartorio": "0004"\n        },\n        {\n          "_id": "5bXXXXXXXXXXXXXXXXXX89537",\n          "valor": "262,00",\n          "data": "30/09/2015",\n          "ufCartorio": "BA",\n          "cidadeCartorio": "SALVADOR",\n          "nomeCartorio": "0001"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX8",\n          "valor": "33,91",\n          "data": "18/06/2015",\n          "ufCartorio": "AM",\n          "cidadeCartorio": "MANAUS",\n          "nomeCartorio": "0001"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX9",\n          "valor": "300,00",\n          "data": "10/04/2014",\n          "ufCartorio": "AL",\n          "cidadeCartorio": "MACEIO",\n          "nomeCartorio": "0001"\n        }\n      ],\n      "valorTotal": "830,31",\n      "dataUltimaOcorrencia": "13/10/2016",\n      "dataPrimeiraOcorrencia": "13/10/2016",\n      "quantidade": 0,\n      "personInformation": "XXXXXXXXXXXXXXXXXXa553c099da4"\n    },\n    "pefin": {\n      "_id": "XXXXXXXXXXXXXXXXXXXXXXXXXA",\n      "__v": 14,\n      "detalhes": [\n        {\n          "_id": "XXXXXXXXXXXXXXXXXXXXX75",\n          "valorPendencia": "350,00",\n          "tituloOcorrencia": "CRED PESSOAL",\n          "origem": "CHECKCHECK",\n          "dataOcorrencia": "23/10/2016",\n          "contrato": "123456",\n          "avalista": "NAO",\n          "uf": "GO",\n          "cidade": "APARECIDA DE GO",\n          "moeda": "R$"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX6",\n          "valorPendencia": "168,48",\n          "tituloOcorrencia": "OUTRAS OPER",\n          "origem": "INOVACAO INFORMATICA LTDA",\n          "dataOcorrencia": "15/11/2015",\n          "contrato": "123456",\n          "avalista": "NAO",\n          "uf": "MG",\n          "cidade": "BETIM",\n          "moeda": "R$"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX7",\n          "valorPendencia": "158,30",\n          "tituloOcorrencia": "DUPLICATA",\n          "origem": "PEYAS E OFICINA AVENIDA LTD",\n          "dataOcorrencia": "10/09/2015",\n          "contrato": "123456",\n          "avalista": "NAO",\n          "uf": "MG",\n          "cidade": "JO O PINHEIRO",\n          "moeda": "R$"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX8",\n          "valorPendencia": "340,30",\n          "tituloOcorrencia": "TIT DESCONTA",\n          "origem": "MAGLENE MODAS   PRESENTES L",\n          "dataOcorrencia": "16/08/2015",\n          "contrato": "123456",\n          "avalista": "NAO",\n          "uf": "MG",\n          "cidade": "Ibia",\n          "moeda": "R$"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX9",\n          "valorPendencia": "176,33",\n          "tituloOcorrencia": "OUTRAS OPER",\n          "origem": "TIM CELULAR S/A",\n          "dataOcorrencia": "07/06/2015",\n          "contrato": "123456",\n          "avalista": "NAO",\n          "uf": "SP",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXa",\n          "valorPendencia": "1.832,04",\n          "tituloOcorrencia": "OUTRAS OPER",\n          "origem": "TIM CELULAR S/A",\n          "dataOcorrencia": "07/03/2015",\n          "contrato": "123456",\n          "avalista": "NAO",\n          "uf": "SP",\n          "cidade": "-",\n          "moeda": "R$"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXb",\n          "valorPendencia": "200,00",\n          "tituloOcorrencia": "DUPLICATA",\n          "origem": "MARCO ALVES DASILVA",\n          "dataOcorrencia": "20/10/2013",\n          "contrato": "123456",\n          "avalista": "NAO",\n          "uf": "SP",\n          "cidade": "ARUJA",\n          "moeda": "R$"\n        }\n      ],\n      "valorTotal": "3.225,45",\n      "dataUltimaOcorrencia": "23/10/2016",\n      "quantidade": 7,\n      "personInformation": "XXXXXXXXXXXXXXXXXXa553c099da4"\n    },\n    "consultaRealizada": {\n      "_id": "XXXXXXXXXXXXXXXXX53c099db5",\n      "__v": 14,\n      "registros": [\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX1",\n          "entidadeOrigem": "FCDL-SC - CRICIUMA / SC",\n          "dataConsulta": "23/07/2018",\n          "ufAssociado": "SC",\n          "cidadeAssociado": "CRICIUMA",\n          "nomeAssociado": "SPC/CRI"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX2",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "23/07/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX3",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "23/07/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "SEGUROS NAOVIDA"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX4",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "22/07/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX5",\n          "entidadeOrigem": "Associacao Comercial - MANGUEIRINHA / PR",\n          "dataConsulta": "21/07/2018",\n          "ufAssociado": "PR",\n          "cidadeAssociado": "MANGUEIRINHA",\n          "nomeAssociado": "SUP. BOM PRECO"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX6",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "21/07/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX7",\n          "entidadeOrigem": "CDL - BELO HORIZONTE / MG",\n          "dataConsulta": "20/07/2018",\n          "ufAssociado": "MG",\n          "cidadeAssociado": "BELO HORIZONTE",\n          "nomeAssociado": "FACTORING"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX8",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "20/07/2018",\n          "ufAssociado": "GO",\n          "cidadeAssociado": "LUZIANIA",\n          "nomeAssociado": "ATIVIDADES DE COBRANCA E INFORMACOES CADASTRAIS"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX9",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "20/07/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXa",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "19/07/2018",\n          "ufAssociado": "SP",\n          "cidadeAssociado": "SAO PAULO",\n          "nomeAssociado": "OUTRAS ATIVIDADES DE SERVICOS PRESTADOS PRINCIPALMENTE AS EMPRESAS NAO ESPECIFICADAS ANTERIORMENTE"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXb",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "19/07/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXc",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "19/07/2018",\n          "ufAssociado": "GO",\n          "cidadeAssociado": "LUZIANIA",\n          "nomeAssociado": "ATIVIDADES DE COBRANCA E INFORMACOES CADASTRAIS"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXd",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "19/07/2018",\n          "ufAssociado": "PR",\n          "cidadeAssociado": "FRANCISCO BELT",\n          "nomeAssociado": "COOPERATIVAS DE CREDITO RURAL"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXe",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "18/07/2018",\n          "ufAssociado": "DF",\n          "cidadeAssociado": "BRASILIA",\n          "nomeAssociado": "SERVICOS DE TELEFONIA FIXA COMUTADA  STFC"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXf",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "18/07/2018",\n          "ufAssociado": "SP",\n          "cidadeAssociado": "Sao Paulo",\n          "nomeAssociado": "SEGUROS NAOVIDA"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX0",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "18/07/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX1",\n          "entidadeOrigem": "Associacao Comercial - MANGUEIRINHA / PR",\n          "dataConsulta": "17/07/2018",\n          "ufAssociado": "PR",\n          "cidadeAssociado": "MANGUEIRINHA",\n          "nomeAssociado": "SUP. BOM PRECO"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX2",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "17/07/2018",\n          "ufAssociado": "PE",\n          "cidadeAssociado": "RECIFE",\n          "nomeAssociado": "BANCOS MULTIPLOS, COM CARTEIRA COMERCIAL"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX3",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "17/07/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX4",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "17/07/2018",\n          "ufAssociado": "DF",\n          "cidadeAssociado": "BRASILIA",\n          "nomeAssociado": "SERVICOS DE TELECOMUNICACOES SEM FIO NAO ESPECIFICADOS ANTERIORMENTE"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX5",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "16/07/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX6",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "16/07/2018",\n          "ufAssociado": "SP",\n          "cidadeAssociado": "SAO PAULO",\n          "nomeAssociado": "OUTRAS ATIVIDADES DE SERVICOS PRESTADOS PRINCIPALMENTE AS EMPRESAS NAO ESPECIFICADAS ANTERIORMENTE"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX7",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "16/07/2018",\n          "ufAssociado": "GO",\n          "cidadeAssociado": "LUZIANIA",\n          "nomeAssociado": "ATIVIDADES DE COBRANCA E INFORMACOES CADASTRAIS"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX8",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "14/07/2018",\n          "ufAssociado": "SP",\n          "cidadeAssociado": "SAO PAULO",\n          "nomeAssociado": "BANCOS MULTIPLOS, COM CARTEIRA COMERCIAL"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX9",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "14/07/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXa",\n          "entidadeOrigem": "CDL - SAO PAULO / SP",\n          "dataConsulta": "13/07/2018",\n          "ufAssociado": "SP",\n          "cidadeAssociado": "TAUBATE",\n          "nomeAssociado": "CREDTUDO TECNOLOGIA LTDA ME"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXb",\n          "entidadeOrigem": "CDL - JAPERI / RJ",\n          "dataConsulta": "13/07/2018",\n          "ufAssociado": "SP",\n          "cidadeAssociado": "SAO PAULO",\n          "nomeAssociado": "SIDNEY ANTONIO DE ANDRADE VINTECINCO 04780015847"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXc",\n          "entidadeOrigem": "CDL - RECIFE / PE",\n          "dataConsulta": "13/07/2018",\n          "ufAssociado": "BA",\n          "cidadeAssociado": "VITORIA DA CONQUISTA",\n          "nomeAssociado": "CARLOS HENRIQUE"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXd",\n          "entidadeOrigem": "CDL - RECIFE / PE",\n          "dataConsulta": "13/07/2018",\n          "ufAssociado": "SP",\n          "cidadeAssociado": "ITAPETININGA",\n          "nomeAssociado": "FUSKETA CENTRO AUTOMOTIVO"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXe",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "13/07/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXf",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "13/07/2018",\n          "ufAssociado": "SP",\n          "cidadeAssociado": "SAO PAULO",\n          "nomeAssociado": "OUTRAS ATIVIDADES DE SERVICOS PRESTADOS PRINCIPALMENTE AS EMPRESAS NAO ESPECIFICADAS ANTERIORMENTE"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX0",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "12/07/2018",\n          "ufAssociado": "GO",\n          "cidadeAssociado": "LUZIANIA",\n          "nomeAssociado": "ATIVIDADES DE COBRANCA E INFORMACOES CADASTRAIS"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX1",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "12/07/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX2",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "11/07/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX3",\n          "entidadeOrigem": "FCDL-SC - SAO MIGUEL DO OESTE / SC",\n          "dataConsulta": "10/07/2018",\n          "ufAssociado": "SC",\n          "cidadeAssociado": "CUNHA PORA",\n          "nomeAssociado": "CREDIAL"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX4",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "10/07/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX5",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "10/07/2018",\n          "ufAssociado": "SP",\n          "cidadeAssociado": "SAO PAULO",\n          "nomeAssociado": "OUTRAS ATIVIDADES DE SERVICOS PRESTADOS PRINCIPALMENTE AS EMPRESAS NAO ESPECIFICADAS ANTERIORMENTE"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX6",\n          "entidadeOrigem": "FCDL-SC - JARAGUA DO SUL / SC",\n          "dataConsulta": "09/07/2018",\n          "ufAssociado": "SC",\n          "cidadeAssociado": "JARAGUA DO SUL",\n          "nomeAssociado": "CLINICORP"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX7",\n          "entidadeOrigem": "FCDL-SC - JARAGUA DO SUL / SC",\n          "dataConsulta": "09/07/2018",\n          "ufAssociado": "SC",\n          "cidadeAssociado": "JARAGUA DO SUL",\n          "nomeAssociado": "CLINICORP"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX8",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "09/07/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX9",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "09/07/2018",\n          "ufAssociado": "SP",\n          "cidadeAssociado": "SAO PAULO",\n          "nomeAssociado": "OUTRAS ATIVIDADES DE SERVICOS PRESTADOS PRINCIPALMENTE AS EMPRESAS NAO ESPECIFICADAS ANTERIORMENTE"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXa",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "08/07/2018",\n          "ufAssociado": "SP",\n          "cidadeAssociado": "SAO PAULO",\n          "nomeAssociado": "OUTRAS ATIVIDADES DE SERVICOS PRESTADOS PRINCIPALMENTE AS EMPRESAS NAO ESPECIFICADAS ANTERIORMENTE"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXb",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "08/07/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXc",\n          "entidadeOrigem": "CDL - SAO GOTARDO / MG",\n          "dataConsulta": "07/07/2018",\n          "ufAssociado": "MG",\n          "cidadeAssociado": "SAO GOTARDO",\n          "nomeAssociado": "MARSHMALLOW SHOES"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXd",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "07/07/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXe",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "07/07/2018",\n          "ufAssociado": "GO",\n          "cidadeAssociado": "LUZIANIA",\n          "nomeAssociado": "ATIVIDADES DE COBRANCA E INFORMACOES CADASTRAIS"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXf",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "06/07/2018",\n          "ufAssociado": "GO",\n          "cidadeAssociado": "LUZIANIA",\n          "nomeAssociado": "ATIVIDADES DE COBRANCA E INFORMACOES CADASTRAIS"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX0",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "06/07/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX1",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "05/07/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX2",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "05/07/2018",\n          "ufAssociado": "SP",\n          "cidadeAssociado": "SAO PAULO",\n          "nomeAssociado": "SEGUROS NAOVIDA"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX3",\n          "entidadeOrigem": "FCDL-SC - JARAGUA DO SUL / SC",\n          "dataConsulta": "04/07/2018",\n          "ufAssociado": "SC",\n          "cidadeAssociado": "JARAGUA DO SUL",\n          "nomeAssociado": "CLINICORP"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX4",\n          "entidadeOrigem": "FCDL-SC - JARAGUA DO SUL / SC",\n          "dataConsulta": "04/07/2018",\n          "ufAssociado": "SC",\n          "cidadeAssociado": "JARAGUA DO SUL",\n          "nomeAssociado": "CLINICORP"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX5",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "04/07/2018",\n          "ufAssociado": "SP",\n          "cidadeAssociado": "SAO PAULO",\n          "nomeAssociado": "ATIVIDADES DE COBRANCA E INFORMACOES CADASTRAIS"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX6",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "04/07/2018",\n          "ufAssociado": "GO",\n          "cidadeAssociado": "LUZIANIA",\n          "nomeAssociado": "ATIVIDADES DE COBRANCA E INFORMACOES CADASTRAIS"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX7",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "04/07/2018",\n          "ufAssociado": "RS",\n          "cidadeAssociado": "Porto Alegre",\n          "nomeAssociado": "OUTRAS ATIVIDADES DE SERVICOS PRESTADOS PRINCIPALMENTE AS EMPRESAS NAO ESPECIFICADAS ANTERIORMENTE"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX8",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "04/07/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX9",\n          "entidadeOrigem": "FCDL-SC - JARAGUA DO SUL / SC",\n          "dataConsulta": "03/07/2018",\n          "ufAssociado": "SC",\n          "cidadeAssociado": "JARAGUA DO SUL",\n          "nomeAssociado": "CLINICORP"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXa",\n          "entidadeOrigem": "FCDL-SC - JARAGUA DO SUL / SC",\n          "dataConsulta": "03/07/2018",\n          "ufAssociado": "SC",\n          "cidadeAssociado": "JARAGUA DO SUL",\n          "nomeAssociado": "CLINICORP"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXb",\n          "entidadeOrigem": "Associacao Comercial - MANGUEIRINHA / PR",\n          "dataConsulta": "03/07/2018",\n          "ufAssociado": "PR",\n          "cidadeAssociado": "MANGUEIRINHA",\n          "nomeAssociado": "SUP. BOM PRECO"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXc",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "03/07/2018",\n          "ufAssociado": "SP",\n          "cidadeAssociado": "SAO PAULO",\n          "nomeAssociado": "SEGUROS NAOVIDA"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXd",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "03/07/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXe",\n          "entidadeOrigem": "FCDL-SC - FLORIANOPOLIS / SC",\n          "dataConsulta": "02/07/2018",\n          "ufAssociado": "SC",\n          "cidadeAssociado": "FLORIANOPOLIS",\n          "nomeAssociado": "ASSOCIADO TESTE FCDL SC SC"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXf",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "02/07/2018",\n          "ufAssociado": "GO",\n          "cidadeAssociado": "LUZIANIA",\n          "nomeAssociado": "ATIVIDADES DE COBRANCA E INFORMACOES CADASTRAIS"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX0",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "02/07/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX1",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "02/07/2018",\n          "ufAssociado": "PE",\n          "cidadeAssociado": "RECIFE",\n          "nomeAssociado": "BANCOS MULTIPLOS, COM CARTEIRA COMERCIAL"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX2",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "01/07/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX3",\n          "entidadeOrigem": "CDL - BELO HORIZONTE / MG",\n          "dataConsulta": "30/06/2018",\n          "ufAssociado": "MG",\n          "cidadeAssociado": "ARAXA",\n          "nomeAssociado": "ELETROZEMA"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX4",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "30/06/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX5",\n          "entidadeOrigem": "CDL - SAO GOTARDO / MG",\n          "dataConsulta": "29/06/2018",\n          "ufAssociado": "MG",\n          "cidadeAssociado": "SAO GOTARDO",\n          "nomeAssociado": "MARSHMALLOW"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX6",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "29/06/2018",\n          "ufAssociado": "MG",\n          "cidadeAssociado": "BELO HORI",\n          "nomeAssociado": "SEGUROS DE VIDA"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX7",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "29/06/2018",\n          "ufAssociado": "MG",\n          "cidadeAssociado": "BELO HORIZONTE",\n          "nomeAssociado": "BANCOS MULTIPLOS, COM CARTEIRA COMERCIAL"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX8",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "29/06/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX9",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "28/06/2018",\n          "ufAssociado": "SP",\n          "cidadeAssociado": "SAO PAULO",\n          "nomeAssociado": "SEGUROS NAOVIDA"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXa",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "28/06/2018",\n          "ufAssociado": "SP",\n          "cidadeAssociado": "SAO PAULO",\n          "nomeAssociado": "OUTRAS ATIVIDADES DE SERVICOS PRESTADOS PRINCIPALMENTE AS EMPRESAS NAO ESPECIFICADAS ANTERIORMENTE"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXb",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "28/06/2018",\n          "ufAssociado": "DF",\n          "cidadeAssociado": "BRASILIA",\n          "nomeAssociado": "ADMINISTRACAO DE CONSORCIOS PARA AQUISICAO DE BENS E DIREITOS"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXc",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "28/06/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXd",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "27/06/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXe",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "27/06/2018",\n          "ufAssociado": "GO",\n          "cidadeAssociado": "LUZIANIA",\n          "nomeAssociado": "ATIVIDADES DE COBRANCA E INFORMACOES CADASTRAIS"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXf",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "27/06/2018",\n          "ufAssociado": "RS",\n          "cidadeAssociado": "Porto Alegre",\n          "nomeAssociado": "OUTRAS ATIVIDADES DE SERVICOS PRESTADOS PRINCIPALMENTE AS EMPRESAS NAO ESPECIFICADAS ANTERIORMENTE"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX0",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "26/06/2018",\n          "ufAssociado": "SP",\n          "cidadeAssociado": "Sao Paulo",\n          "nomeAssociado": "SEGUROS NAOVIDA"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX1",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "26/06/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX2",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "26/06/2018",\n          "ufAssociado": "SP",\n          "cidadeAssociado": "SAO PAULO",\n          "nomeAssociado": "ATIVIDADES DE COBRANCA E INFORMACOES CADASTRAIS"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX3",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "26/06/2018",\n          "ufAssociado": "BA",\n          "cidadeAssociado": "VALENCA",\n          "nomeAssociado": "COMERCIO VAREJISTA ESPECIALIZADO DE ELETRODOMESTICOS E EQUIPAMENTOS DE AUDIO E VIDEO"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX4",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "25/06/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX5",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "25/06/2018",\n          "ufAssociado": "SP",\n          "cidadeAssociado": "SAO PAULO",\n          "nomeAssociado": "SOCIEDADES DE CREDITO, FINANCIAMENTO E INVESTIMENTO  FINANCEIRAS"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX6",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "25/06/2018",\n          "ufAssociado": "GO",\n          "cidadeAssociado": "LUZIANIA",\n          "nomeAssociado": "ATIVIDADES DE COBRANCA E INFORMACOES CADASTRAIS"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX7",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "24/06/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX8",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "23/06/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX9",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "22/06/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXa",\n          "entidadeOrigem": "CDL - FLORIANOPOLIS / SC",\n          "dataConsulta": "21/06/2018",\n          "ufAssociado": "SC",\n          "cidadeAssociado": "SAO JOSE",\n          "nomeAssociado": "MAKENJI"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXb",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "21/06/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXc",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "21/06/2018",\n          "ufAssociado": "SP",\n          "cidadeAssociado": "SAO PAULO",\n          "nomeAssociado": "SEGUROS NAOVIDA"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXd",\n          "entidadeOrigem": "CDL - JAPERI / RJ",\n          "dataConsulta": "20/06/2018",\n          "ufAssociado": "RJ",\n          "cidadeAssociado": "JAPERI",\n          "nomeAssociado": "CESAR MOREIRA SIMOES"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXe",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "20/06/2018",\n          "ufAssociado": "SP",\n          "cidadeAssociado": "SP",\n          "nomeAssociado": "BANCOS DE INVESTIMENTO"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXf",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "20/06/2018",\n          "ufAssociado": "RS",\n          "cidadeAssociado": "PORTO ALEGRE",\n          "nomeAssociado": "SOCIEDADES DE CREDITO, FINANCIAMENTO E INVESTIMENTO  FINANCEIRAS"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX0",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "20/06/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX1",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "20/06/2018",\n          "ufAssociado": "SP",\n          "cidadeAssociado": "SAO PAULO",\n          "nomeAssociado": "SEGUROS NAOVIDA"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX2",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "20/06/2018",\n          "ufAssociado": "DF",\n          "cidadeAssociado": "BRASILIA",\n          "nomeAssociado": "SEGUROS NAOVIDA"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX3",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "20/06/2018",\n          "ufAssociado": "SP",\n          "cidadeAssociado": "SAO PAULO",\n          "nomeAssociado": "COMERCIO ATACADISTA DE ARTIGOS DE ESCRITORIO E DE PAPELARIA"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX4",\n          "entidadeOrigem": "CDL - FLORIANOPOLIS / SC",\n          "dataConsulta": "19/06/2018",\n          "ufAssociado": "SC",\n          "cidadeAssociado": "SAO JOSE",\n          "nomeAssociado": "MAKENJI"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX5",\n          "entidadeOrigem": "FCDL-SC - CRICIUMA / SC",\n          "dataConsulta": "19/06/2018",\n          "ufAssociado": "SC",\n          "cidadeAssociado": "CRICIUMA",\n          "nomeAssociado": "SPC/CRI"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX6",\n          "entidadeOrigem": "CDL - SAO PAULO / SP",\n          "dataConsulta": "19/06/2018",\n          "ufAssociado": "SP",\n          "cidadeAssociado": "SAO JOSE DO RIO PRETO",\n          "nomeAssociado": "SERVICOS DE INFORMACOES CADASTRAIS"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX7",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "19/06/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX8",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "19/06/2018",\n          "ufAssociado": "SP",\n          "cidadeAssociado": "SAO PAULO",\n          "nomeAssociado": "SOCIEDADES DE CREDITO, FINANCIAMENTO E INVESTIMENTO  FINANCEIRAS"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX9",\n          "entidadeOrigem": "Associacao Comercial - CASCAVEL / PR",\n          "dataConsulta": "18/06/2018",\n          "ufAssociado": "PR",\n          "cidadeAssociado": "CASCAVEL",\n          "nomeAssociado": "MECANICA ENJEFLEX"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXa",\n          "entidadeOrigem": "FCDL-SC - POUSO REDONDO / SC",\n          "dataConsulta": "18/06/2018",\n          "ufAssociado": "SC",\n          "cidadeAssociado": "POUSO REDONDO",\n          "nomeAssociado": "ALINE ROZADO"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXb",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "18/06/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXc",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "17/06/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXd",\n          "entidadeOrigem": "CDL - JAPERI / RJ",\n          "dataConsulta": "16/06/2018",\n          "ufAssociado": "RJ",\n          "cidadeAssociado": "NILOPOLIS",\n          "nomeAssociado": "ROSIMERI VIEIRA VALIM"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXe",\n          "entidadeOrigem": "CDL - JAPERI / RJ",\n          "dataConsulta": "16/06/2018",\n          "ufAssociado": "BA",\n          "cidadeAssociado": "VALENCA",\n          "nomeAssociado": "JOSE LUIZ GRACA JUNIOR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXf",\n          "entidadeOrigem": "CDL - VAZANTE / MG",\n          "dataConsulta": "16/06/2018",\n          "ufAssociado": "MG",\n          "cidadeAssociado": "VAZANTE",\n          "nomeAssociado": "SOCIEDADE COMERCIAL LTDA - RON"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX0",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "16/06/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX1",\n          "entidadeOrigem": "FCDL-SC - POUSO REDONDO / SC",\n          "dataConsulta": "15/06/2018",\n          "ufAssociado": "SC",\n          "cidadeAssociado": "POUSO REDONDO",\n          "nomeAssociado": "ALINE ROZADO"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX2",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "15/06/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX3",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "15/06/2018",\n          "ufAssociado": "SP",\n          "cidadeAssociado": "GUARULHOS",\n          "nomeAssociado": "BANCOS MULTIPLOS, SEM CARTEIRA COMERCIAL"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX4",\n          "entidadeOrigem": "CDL - JAPERI / RJ",\n          "dataConsulta": "14/06/2018",\n          "ufAssociado": "RJ",\n          "cidadeAssociado": "JAPERI",\n          "nomeAssociado": "SIDNEY ANTONIO DE ANDRADE VINTECINCO"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX5",\n          "entidadeOrigem": "CDL - JAPERI / RJ",\n          "dataConsulta": "14/06/2018",\n          "ufAssociado": "RJ",\n          "cidadeAssociado": "JAPERI",\n          "nomeAssociado": "SIDNEY ANTONIO DE ANDRADE VINTECINCO"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX6",\n          "entidadeOrigem": "CDL - SAPEZAL / MT",\n          "dataConsulta": "14/06/2018",\n          "ufAssociado": "MT",\n          "cidadeAssociado": "SAPEZAL",\n          "nomeAssociado": "LINK PAPELARIA E BRINQUEDOS / MUNDO INFANTIL"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX7",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "14/06/2018",\n          "ufAssociado": "SP",\n          "cidadeAssociado": "SAO PAULO",\n          "nomeAssociado": "ATIVIDADES DE COBRANCA E INFORMACOES CADASTRAIS"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX8",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "14/06/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX9",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "14/06/2018",\n          "ufAssociado": "RN",\n          "cidadeAssociado": "CAICO",\n          "nomeAssociado": "FABRICACAO DE CALCADOS DE COURO"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXa",\n          "entidadeOrigem": "CDL - SAO PAULO / SP",\n          "dataConsulta": "13/06/2018",\n          "ufAssociado": "SP",\n          "cidadeAssociado": "SAO JOSE DO RIO PRETO",\n          "nomeAssociado": "SERVICOS DE INFORMACOES CADASTRAIS"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXb",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "13/06/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXc",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "12/06/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXd",\n          "entidadeOrigem": "FCDL-SC - CONCORDIA / SC",\n          "dataConsulta": "11/06/2018",\n          "ufAssociado": "SC",\n          "cidadeAssociado": "CONCORDIA",\n          "nomeAssociado": "BAVARESCO CONTABILIDADE"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXe",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "11/06/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXf",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "10/06/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX0",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "10/06/2018",\n          "ufAssociado": "RJ",\n          "cidadeAssociado": "RIO DE JANEIRO",\n          "nomeAssociado": "BANCOS COMERCIAIS"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX1",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "09/06/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX2",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "08/06/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX3",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "08/06/2018",\n          "ufAssociado": "SP",\n          "cidadeAssociado": "SAO PAULO",\n          "nomeAssociado": "SEGUROS NAOVIDA"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX4",\n          "entidadeOrigem": "CDL - BELO HORIZONTE / MG",\n          "dataConsulta": "07/06/2018",\n          "ufAssociado": "MG",\n          "cidadeAssociado": "ARAXA",\n          "nomeAssociado": "ELETROZEMA"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX5",\n          "entidadeOrigem": "CDL - SAO PAULO / SP",\n          "dataConsulta": "07/06/2018",\n          "ufAssociado": "SP",\n          "cidadeAssociado": "SAO JOSE DO RIO PRETO",\n          "nomeAssociado": "SERVICOS DE INFORMACOES CADASTRAIS"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX6",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "07/06/2018",\n          "ufAssociado": "SP",\n          "cidadeAssociado": "SAO PAULO",\n          "nomeAssociado": "SEGUROS NAOVIDA"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX7",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "07/06/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX8",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "06/06/2018",\n          "ufAssociado": "RS",\n          "cidadeAssociado": "Porto Alegre",\n          "nomeAssociado": "OUTRAS ATIVIDADES DE SERVICOS PRESTADOS PRINCIPALMENTE AS EMPRESAS NAO ESPECIFICADAS ANTERIORMENTE"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX9",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "06/06/2018",\n          "ufAssociado": "-",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TELEFONIA MOVEL CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXa",\n          "entidadeOrigem": "FCDL-SC - POUSO REDONDO / SC",\n          "dataConsulta": "04/06/2018",\n          "ufAssociado": "SC",\n          "cidadeAssociado": "POUSO REDONDO",\n          "nomeAssociado": "CARROCERIAS CLAUDINO"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXb",\n          "entidadeOrigem": "Associacao Comercial - MARINGA / PR",\n          "dataConsulta": "30/05/2018",\n          "ufAssociado": "PR",\n          "cidadeAssociado": "MARINGA",\n          "nomeAssociado": "SANCOR SEGUROS"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXc",\n          "entidadeOrigem": "CDL - TEIXEIRA DE FREITAS / BA",\n          "dataConsulta": "30/05/2018",\n          "ufAssociado": "BA",\n          "cidadeAssociado": "TEIXEIRA DE FREITAS",\n          "nomeAssociado": "MIB CALCADOS"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXd",\n          "entidadeOrigem": "Associacao Comercial - MARINGA / PR",\n          "dataConsulta": "30/05/2018",\n          "ufAssociado": "PR",\n          "cidadeAssociado": "MARINGA",\n          "nomeAssociado": "SANCOR SEGUROS"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXe",\n          "entidadeOrigem": "Associacao Comercial - ARAGUAINA / TO",\n          "dataConsulta": "28/05/2018",\n          "ufAssociado": "TO",\n          "cidadeAssociado": "ARAGUAINA",\n          "nomeAssociado": "SUPERMERCADO CAMPELO I"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXf",\n          "entidadeOrigem": "CDL - SAO PAULO / SP",\n          "dataConsulta": "24/05/2018",\n          "ufAssociado": "SP",\n          "cidadeAssociado": "SAO JOSE DO RIO PRETO",\n          "nomeAssociado": "SERVICOS DE INFORMACOES CADASTRAIS"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX0",\n          "entidadeOrigem": "CDL - RECIFE / PE",\n          "dataConsulta": "24/05/2018",\n          "ufAssociado": "MG",\n          "cidadeAssociado": "TAIOBEIRAS",\n          "nomeAssociado": "MINHA FAVORITA"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX1",\n          "entidadeOrigem": "Associacao Comercial - MARINGA / PR",\n          "dataConsulta": "21/05/2018",\n          "ufAssociado": "PR",\n          "cidadeAssociado": "MARINGA",\n          "nomeAssociado": "SANCOR SEGUROS"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX2",\n          "entidadeOrigem": "CDL - SAO PAULO / SP",\n          "dataConsulta": "21/05/2018",\n          "ufAssociado": "SP",\n          "cidadeAssociado": "TAUBATE",\n          "nomeAssociado": "CREDTUDO TECNOLOGIA LTDA ME"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX3",\n          "entidadeOrigem": "CDL - SAO PAULO / SP",\n          "dataConsulta": "18/05/2018",\n          "ufAssociado": "SP",\n          "cidadeAssociado": "SAO PAULO",\n          "nomeAssociado": "ABRCI ASSOCIACAO BRASILEIRA DAS REDES DE COMERCIO E INDUSTR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX4",\n          "entidadeOrigem": "CDL - JAPERI / RJ",\n          "dataConsulta": "16/05/2018",\n          "ufAssociado": "RJ",\n          "cidadeAssociado": "SEROPEDICA",\n          "nomeAssociado": "ANDRE GOMES MAIO"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX5",\n          "entidadeOrigem": "CDL - JAPERI / RJ",\n          "dataConsulta": "15/05/2018",\n          "ufAssociado": "RJ",\n          "cidadeAssociado": "RIO DE JANEIRO",\n          "nomeAssociado": "JOEL FERREIRA DOS REIS"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX6",\n          "entidadeOrigem": "CDL - JAPERI / RJ",\n          "dataConsulta": "14/05/2018",\n          "ufAssociado": "RJ",\n          "cidadeAssociado": "RIO DE JANEIRO",\n          "nomeAssociado": "DOLORES FARIA VIEIRA"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX7",\n          "entidadeOrigem": "CDL - PALMARES / PE",\n          "dataConsulta": "14/05/2018",\n          "ufAssociado": "PE",\n          "cidadeAssociado": "PALMARES",\n          "nomeAssociado": "A PREDILETA"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX8",\n          "entidadeOrigem": "CDL - JAPERI / RJ",\n          "dataConsulta": "11/05/2018",\n          "ufAssociado": "RJ",\n          "cidadeAssociado": "JAPERI",\n          "nomeAssociado": "ARLINDO FERREIRA PACHECO NETO"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX9",\n          "entidadeOrigem": "CDL - JAPERI / RJ",\n          "dataConsulta": "11/05/2018",\n          "ufAssociado": "RJ",\n          "cidadeAssociado": "NOVA IGUACU",\n          "nomeAssociado": "REGINA CAZER"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXa",\n          "entidadeOrigem": "CDL - RECIFE / PE",\n          "dataConsulta": "10/05/2018",\n          "ufAssociado": "SP",\n          "cidadeAssociado": "ANGATUBA",\n          "nomeAssociado": "COMPACTA EMBALAGENS"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXb",\n          "entidadeOrigem": "CDL - JAPERI / RJ",\n          "dataConsulta": "09/05/2018",\n          "ufAssociado": "RJ",\n          "cidadeAssociado": "NOVA IGUACU",\n          "nomeAssociado": "ARCHIMAR MATTOSO PRATI"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXc",\n          "entidadeOrigem": "CDL - GOIANIA / GO",\n          "dataConsulta": "07/05/2018",\n          "ufAssociado": "GO",\n          "cidadeAssociado": "GOIANIA",\n          "nomeAssociado": "CASA IMOVEIS"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXd",\n          "entidadeOrigem": "CDL - BELO HORIZONTE / MG",\n          "dataConsulta": "05/05/2018",\n          "ufAssociado": "MG",\n          "cidadeAssociado": "ARAXA",\n          "nomeAssociado": "ELETROZEMA"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXe",\n          "entidadeOrigem": "CDL - CASCAVEL / PR",\n          "dataConsulta": "04/05/2018",\n          "ufAssociado": "PR",\n          "cidadeAssociado": "UMUARAMA",\n          "nomeAssociado": "ANALISE DE CREDITO"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXf",\n          "entidadeOrigem": "FCDL-SC - JOINVILLE / SC",\n          "dataConsulta": "03/05/2018",\n          "ufAssociado": "SC",\n          "cidadeAssociado": "JOINVILLE",\n          "nomeAssociado": "FUNDICAO PETROPOLIS"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX0",\n          "entidadeOrigem": "FCDL-SC - FLORIANOPOLIS / SC",\n          "dataConsulta": "02/05/2018",\n          "ufAssociado": "SC",\n          "cidadeAssociado": "FLORIANOPOLIS",\n          "nomeAssociado": "ASSOCIADO TESTE FCDL SC SC"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX1",\n          "entidadeOrigem": "CDL - RECIFE / PE",\n          "dataConsulta": "28/04/2018",\n          "ufAssociado": "MG",\n          "cidadeAssociado": "ITAOBIM",\n          "nomeAssociado": "FRIO VALE"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX2",\n          "entidadeOrigem": "CDL - RECIFE / PE",\n          "dataConsulta": "27/04/2018",\n          "ufAssociado": "MG",\n          "cidadeAssociado": "MONTES CLAROS",\n          "nomeAssociado": "AUTO ELETRICA IRMAOS PEREIRA"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX3",\n          "entidadeOrigem": "CDL - LAGOA FORMOSA / MG",\n          "dataConsulta": "26/04/2018",\n          "ufAssociado": "MG",\n          "cidadeAssociado": "LAGOA FORMOSA",\n          "nomeAssociado": "SUPERMERCADO ATUAL"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX4",\n          "entidadeOrigem": "CDL - SANTA BARBARA / MG",\n          "dataConsulta": "26/04/2018",\n          "ufAssociado": "MG",\n          "cidadeAssociado": "SANTA BARBARA",\n          "nomeAssociado": "LUCIO REZENDE FONSECA -TANGIRU ALIMENTOS"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX5",\n          "entidadeOrigem": "CDL - CORONEL FABRICIANO / MG",\n          "dataConsulta": "25/04/2018",\n          "ufAssociado": "MG",\n          "cidadeAssociado": "CORONEL FABRICIANO",\n          "nomeAssociado": "BRASIL TINTAS."\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX6",\n          "entidadeOrigem": "CDL - MACEIO / AL",\n          "dataConsulta": "25/04/2018",\n          "ufAssociado": "AL",\n          "cidadeAssociado": "MACEIO",\n          "nomeAssociado": "CONDOMINIO POVOA DE VARZIM"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX7",\n          "entidadeOrigem": "CDL - RECIFE / PE",\n          "dataConsulta": "24/04/2018",\n          "ufAssociado": "MG",\n          "cidadeAssociado": "MATO VERDE",\n          "nomeAssociado": "APE POCOS ARTESIANOS"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX8",\n          "entidadeOrigem": "CDL - RECIFE / PE",\n          "dataConsulta": "24/04/2018",\n          "ufAssociado": "SP",\n          "cidadeAssociado": "ITAPETININGA",\n          "nomeAssociado": "MOLINARI STREET WAY"\n        }\n      ],\n      "quantidadeDiasConsultado": "90",\n      "quantidade": 168,\n      "personInformation": "XXXXXXXXXXXXXXXXXXa553c099da4"\n    },\n    "ccf": {\n      "_id": "XXXXX239de1a553c099da6",\n      "__v": 0,\n      "detalhes": [],\n      "dataUltimaOcorrencia": null,\n      "quantidade": 0,\n      "personInformation": "XXXXXXXXXXXXXXXXXXa553c099da4"\n    },\n    "pendenciaSpc": {\n      "_id": "XXXXX239de1a553c099e4c",\n      "__v": 14,\n      "detalhes": [\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX9",\n          "valor": "1.000,00",\n          "participacao": "COMPRADOR",\n          "registroInstFinanceira": "NAO",\n          "contrato": "13/1",\n          "nomeEntidade": "FCDL-SC - FLORIANOPOLIS / SC",\n          "dataVencimento": "01/01/2017",\n          "dataInclusao": "16/12/2017",\n          "telefoneAssociado": "32515300",\n          "dddAssociado": "48",\n          "ufAssociado": "SC",\n          "cidadeAssociado": "FLORIANOPOLIS",\n          "nomeAssociado": "ASSOCIADO TESTE FCDL SC SC"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXa",\n          "valor": "205,31",\n          "participacao": "COMPRADOR",\n          "registroInstFinanceira": "NAO",\n          "contrato": "13179/2",\n          "nomeEntidade": "FCDL-SC - FLORIANOPOLIS / SC",\n          "dataVencimento": "23/10/2017",\n          "dataInclusao": "11/11/2017",\n          "telefoneAssociado": "32515300",\n          "dddAssociado": "48",\n          "ufAssociado": "SC",\n          "cidadeAssociado": "FLORIANOPOLIS",\n          "nomeAssociado": "ASSOCIADO TESTE FCDL SC SC"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXb",\n          "valor": "373,00",\n          "participacao": "COMPRADOR",\n          "registroInstFinanceira": "NAO",\n          "contrato": "13345/2",\n          "nomeEntidade": "FCDL-SC - FLORIANOPOLIS / SC",\n          "dataVencimento": "24/10/2017",\n          "dataInclusao": "11/11/2017",\n          "telefoneAssociado": "32515300",\n          "dddAssociado": "48",\n          "ufAssociado": "SC",\n          "cidadeAssociado": "FLORIANOPOLIS",\n          "nomeAssociado": "ASSOCIADO TESTE FCDL SC SC"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXc",\n          "valor": "395,92",\n          "participacao": "COMPRADOR",\n          "registroInstFinanceira": "NAO",\n          "contrato": "13208/2",\n          "nomeEntidade": "FCDL-SC - FLORIANOPOLIS / SC",\n          "dataVencimento": "23/10/2017",\n          "dataInclusao": "11/11/2017",\n          "telefoneAssociado": "32515300",\n          "dddAssociado": "48",\n          "ufAssociado": "SC",\n          "cidadeAssociado": "FLORIANOPOLIS",\n          "nomeAssociado": "ASSOCIADO TESTE FCDL SC SC"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXd",\n          "valor": "10,00",\n          "participacao": "COMPRADOR",\n          "registroInstFinanceira": "NAO",\n          "contrato": "1/1",\n          "nomeEntidade": "FCDL-SC - LAGES / SC",\n          "dataVencimento": "01/05/2017",\n          "dataInclusao": "15/06/2017",\n          "telefoneAssociado": "32217007",\n          "dddAssociado": "49",\n          "ufAssociado": "SC",\n          "cidadeAssociado": "LAGES",\n          "nomeAssociado": "SPC LAGES - COMERCIAL"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXe",\n          "valor": "700,00",\n          "participacao": "COMPRADOR",\n          "registroInstFinanceira": "NAO",\n          "contrato": "090909/7",\n          "nomeEntidade": "FCDL-SC - TUBARAO / SC",\n          "dataVencimento": "01/02/2017",\n          "dataInclusao": "30/03/2017",\n          "telefoneAssociado": "36262022",\n          "dddAssociado": "48",\n          "ufAssociado": "SC",\n          "cidadeAssociado": "TUBARAO",\n          "nomeAssociado": "SPC TUBARAO"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXf",\n          "valor": "200,00",\n          "participacao": "COMPRADOR",\n          "registroInstFinanceira": "NAO",\n          "contrato": "0000000000000010",\n          "nomeEntidade": "SAO PAULO / SP",\n          "dataVencimento": "20/10/2013",\n          "dataInclusao": "24/02/2017",\n          "telefoneAssociado": "984541248",\n          "dddAssociado": "32",\n          "ufAssociado": "SP",\n          "cidadeAssociado": "ARUJA",\n          "nomeAssociado": "MARCO ALVES"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX0",\n          "valor": "168,48",\n          "participacao": "COMPRADOR",\n          "registroInstFinanceira": "NAO",\n          "contrato": "6459",\n          "nomeEntidade": "CDL - BETIM / MG",\n          "dataVencimento": "15/11/2015",\n          "dataInclusao": "03/03/2016",\n          "telefoneAssociado": "35313020",\n          "dddAssociado": "31",\n          "ufAssociado": "MG",\n          "cidadeAssociado": "BETIM",\n          "nomeAssociado": "S.O.S COMPUTADORES"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX1",\n          "valor": "176,33",\n          "participacao": "COMPRADOR",\n          "registroInstFinanceira": "NAO",\n          "contrato": "GSM0161179531005",\n          "nomeEntidade": "SAO PAULO / SP",\n          "dataVencimento": "07/06/2015",\n          "dataInclusao": "10/07/2015",\n          "telefoneAssociado": "-",\n          "dddAssociado": "-",\n          "ufAssociado": "SP",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TIM CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX2",\n          "valor": "1.832,04",\n          "participacao": "COMPRADOR",\n          "registroInstFinanceira": "NAO",\n          "contrato": "GSM0161121888935",\n          "nomeEntidade": "SAO PAULO / SP",\n          "dataVencimento": "07/03/2015",\n          "dataInclusao": "10/07/2015",\n          "telefoneAssociado": "-",\n          "dddAssociado": "-",\n          "ufAssociado": "SP",\n          "cidadeAssociado": "-",\n          "nomeAssociado": "TIM CELULAR"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX3",\n          "valor": "41,96",\n          "participacao": "COMPRADOR",\n          "registroInstFinanceira": "NAO",\n          "contrato": "1",\n          "nomeEntidade": "CDL - IBIA / MG",\n          "dataVencimento": "13/04/2014",\n          "dataInclusao": "22/10/2014",\n          "telefoneAssociado": "36311142",\n          "dddAssociado": "34",\n          "ufAssociado": "MG",\n          "cidadeAssociado": "IBIA",\n          "nomeAssociado": "CONSTRU MAX"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX4",\n          "valor": "300,00",\n          "participacao": "COMPRADOR",\n          "registroInstFinanceira": "NAO",\n          "contrato": "5583",\n          "nomeEntidade": "CDL - GOIANIA / GO",\n          "dataVencimento": "29/09/2013",\n          "dataInclusao": "15/12/2013",\n          "telefoneAssociado": "35956554",\n          "dddAssociado": "62",\n          "ufAssociado": "GO",\n          "cidadeAssociado": "GOIANIA",\n          "nomeAssociado": "REDE ELETRO E CIA"\n        }\n      ],\n      "valorTotal": "5.403,04",\n      "dataUltimaOcorrencia": "16/12/2017",\n      "quantidade": 12,\n      "personInformation": "XXXXXXXXXXXXXXXXXXa553c099da4"\n    },\n    "ultimoEnderecoInformado": {\n      "_id": "XXXXXXXXXXXXXXXXXXXXXXXXXdc6",\n      "__v": 6,\n      "registros": [\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXa",\n          "cep": "1422002",\n          "uf": "SP",\n          "cidade": "SAO PAULO",\n          "bairro": "JARDIM PAULISTA",\n          "numero": "00",\n          "logradouro": "AL FRANCA"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXb",\n          "cep": "88509350",\n          "uf": "SC",\n          "cidade": "LAGES",\n          "bairro": "SAO CRISTOVAO",\n          "numero": "1",\n          "logradouro": "RUA DOUTOR  CARRILHO"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXc",\n          "cep": "88010001",\n          "uf": "SC",\n          "cidade": "FLORIANOPOLIS",\n          "bairro": "CENTRO",\n          "numero": "679",\n          "logradouro": "RUA   FELIPE SCHMIDT"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXd",\n          "cep": "88058000",\n          "uf": "SC",\n          "cidade": "FLORIANOPOLIS",\n          "bairro": "VARGEM GRANDE",\n          "numero": "10",\n          "logradouro": "RODOVIA   ARMANDO CALIL BULOS"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXe",\n          "cep": "12239006",\n          "uf": "SP",\n          "cidade": "SAO JOSE DOS CAMPOS",\n          "bairro": "RESIDENCIAL UNIAO",\n          "numero": "00000",\n          "logradouro": "RUA DEZOITO * SAI DA AVENIDA DOIS 254"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXf",\n          "cep": "85770000",\n          "uf": "PR",\n          "cidade": "REALEZA",\n          "bairro": "Centro",\n          "numero": "SN",\n          "logradouro": "Avenida Bruno Zuttion"\n        }\n      ],\n      "quantidade": 0,\n      "personInformation": "XXXXXXXXXXXXXXXXXXa553c099da4"\n    },\n    "telefoneVinculado": null,\n    "featuresOpcionais": {\n      "_id": "XXXXXXXXXXXXXXXXXXXXXXX7",\n      "__v": 0,\n      "email": null,\n      "locEndTel": null,\n      "score12Meses": null,\n      "rendaPresumida": {\n        "renda": "2.598,92",\n        "codigo": 1,\n        "retorno": "CONSTA RENDA PRESUMIDA PARA O DOCUMENTO INFORMADO"\n      },\n      "participacaoSocietaria": {\n        "codigo": "2",\n        "retorno": "NENHUM REGISTRO ENCONTRADO"\n      },\n      "score": null,\n      "faturamentoPresumido": null,\n      "qsa": null,\n      "representanteLegal": null,\n      "personInformation": "XXXXXXXXXXXXXXXXXXa553c099da4"\n    },\n    "ultimoTelefoneInformado": {\n      "registro": [\n        {\n          "ddd": "48",\n          "telefone": "33816578",\n          "data_primeira_consulta": "25/07/2017",\n          "data_ultima_consulta": "21/06/2018",\n          "quantidade_consulta": "7"\n        },\n        {\n          "ddd": "48",\n          "telefone": "33816579",\n          "data_primeira_consulta": "13/12/2017",\n          "data_ultima_consulta": "19/01/2018",\n          "quantidade_consulta": "2"\n        },\n        {\n          "ddd": "11",\n          "telefone": "23347890",\n          "data_primeira_consulta": "29/11/2017",\n          "data_ultima_consulta": "29/11/2017",\n          "quantidade_consulta": "2"\n        },\n        {\n          "ddd": "62",\n          "telefone": "33261137",\n          "data_primeira_consulta": "28/09/2017",\n          "data_ultima_consulta": "28/09/2017",\n          "quantidade_consulta": "1"\n        },\n        {\n          "ddd": "62",\n          "telefone": "33264977",\n          "data_primeira_consulta": "22/10/2016",\n          "data_ultima_consulta": "19/06/2017",\n          "quantidade_consulta": "12"\n        }\n      ]\n    },\n    "telefoneConsultado": {\n      "quantidade": 0\n    },\n    "endCepConsultado": null,\n    "baseNegativacao": null,\n    "dadosCadastrais": {\n      "descricaoNaturezaJuridica": null,\n      "codigoNaturezaJuridica": null,\n      "descricaoCnae": null,\n      "codigoCnae": null,\n      "dataFundacao": null,\n      "nomeFantasia": null,\n      "razaoSocial": null,\n      "dataSituacaoCnpj": null,\n      "situacaoCnpj": null,\n      "email": "XXXXXXXXXXXXX@hotmail.com",\n      "estadoCivil": "CASADO",\n      "tituloEleitor": "-",\n      "nomePai": "-",\n      "nomeMae": "MARIA JOSE DA SILVA VALORES",\n      "telNum": "00000000000000",\n      "telDdd": "71",\n      "endEstado": "MG",\n      "endCidade": "POUSO ALEGRE",\n      "endBairro": "CENTRO",\n      "endCep": "37550000",\n      "endComplemento": "CS",\n      "endNum": "152",\n      "endTipoLogradouro": "R",\n      "endLogradouro": "DOUTOR LISBOA",\n      "sexo": "M",\n      "idade": "54",\n      "signo": "TOURO",\n      "rg": "-",\n      "dataNascimento": "24/04/1964",\n      "dataSituacaoCpf": "20/07/2018",\n      "situacaoCpf": "PENDENTE DE REGULARIZACAO",\n      "documentoOrigem": "SAO PAULO",\n      "documento": null,\n      "nome": "SEBASTIANA M DE CARVALHO"\n    },\n    "documento": "01234567890",\n    "status": true,\n    "createAt": "2018-04-20T20:34:10.439Z"\n  }\n}',
                        type: 'json',
                    },
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": {\n    "_id": "XXXXXXXXXXXXXXXXXXXXXXXXXX504c",\n    "__v": 0,\n    "cadastroCompleto": null,\n    "creditoSimples": null,\n    "restricaoTotal": {\n      "_id": "5XXXXXXXXXXXXXXXXXXXXXXXd",\n      "__v": 0,\n      "chequeConsultaOnlineSrs": {\n        "quantidade": 0\n      },\n      "dadosAgenciaBancaria": null,\n      "contumacia": {\n        "quantidade": 0\n      },\n      "contraOrdem": {\n        "quantidade": 0\n      },\n      "grafiaPj": {\n        "registros": [\n          {\n            "razao_social": "MEGATRUCK CAMINHOES LTDA ME"\n          },\n          {\n            "razao_social": "ATUAL CAMINHOES LTDA ME"\n          }\n        ]\n      },\n      "personInformation": null\n    },\n    "pefinBvs": null,\n    "protesto": {\n      "_id": "5XXXXXXXXXXXXXXXXXXXXXXX57",\n      "__v": 0,\n      "detalhes": [\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX58",\n          "valor": "9.315,00",\n          "data": "13/09/2016",\n          "ufCartorio": "MG",\n          "cidadeCartorio": "BETIM",\n          "nomeCartorio": "UN"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX59",\n          "valor": "715,00",\n          "data": "14/07/2016",\n          "ufCartorio": "MG",\n          "cidadeCartorio": "BETIM",\n          "nomeCartorio": "UN"\n        }\n      ],\n      "valorTotal": "10.030,00",\n      "dataUltimaOcorrencia": "13/09/2016",\n      "dataPrimeiraOcorrencia": "13/09/2016",\n      "quantidade": 0,\n      "personInformation": "XXXXXXXXXXXXXXXXXXXXXXXXX"\n    },\n    "pefin": {\n      "_id": "5XXXXXXXXXXXXXXXXXXXXXXX51",\n      "__v": 0,\n      "detalhes": [],\n      "valorTotal": null,\n      "dataUltimaOcorrencia": null,\n      "quantidade": 0,\n      "personInformation": "XXXXXXXXXXXXXXXXXXXXXXXXX"\n    },\n    "consultaRealizada": {\n      "_id": "5XXXXXXXXXXXXXXXXXXXXXXX52",\n      "__v": 0,\n      "registros": [\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX53",\n          "entidadeOrigem": "CDL - RECIFE / PE",\n          "dataConsulta": "13/07/2018",\n          "ufAssociado": "MG",\n          "cidadeAssociado": "MONTES CLAROS",\n          "nomeAssociado": "PREMONTES INDUSTRIA E COMERCIO LTDA"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX54",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "13/07/2018",\n          "ufAssociado": "SP",\n          "cidadeAssociado": "SAO PAULO",\n          "nomeAssociado": "SAFRA"\n        },\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX55",\n          "entidadeOrigem": "SAO PAULO / SP",\n          "dataConsulta": "07/07/2018",\n          "ufAssociado": "SP",\n          "cidadeAssociado": "SAO PAULO",\n          "nomeAssociado": "SAFRA"\n        }\n      ],\n      "quantidadeDiasConsultado": "90",\n      "quantidade": 3,\n      "personInformation": "XXXXXXXXXXXXXXXXXXXXXXXXX"\n    },\n    "ccf": {\n      "_id": "5XXXXXXXXXXXXXXXXXXXXXXXe",\n      "__v": 0,\n      "detalhes": [],\n      "dataUltimaOcorrencia": null,\n      "quantidade": 0,\n      "personInformation": "XXXXXXXXXXXXXXXXXXXXXXXXX"\n    },\n    "pendenciaSpc": {\n      "_id": "5XXXXXXXXXXXXXXXXXXXXXXX56",\n      "__v": 0,\n      "detalhes": [],\n      "valorTotal": null,\n      "dataUltimaOcorrencia": null,\n      "quantidade": 0,\n      "personInformation": "XXXXXXXXXXXXXXXXXXXXXXXXX"\n    },\n    "ultimoEnderecoInformado": {\n      "_id": "5XXXXXXXXXXXXXXXXXXXXXXX5a",\n      "__v": 0,\n      "registros": [\n        {\n          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX5b",\n          "cep": "30575470",\n          "uf": "MG",\n          "cidade": "BELO HORIZONTE",\n          "bairro": "PALMEIRAS",\n          "numero": "744",\n          "logradouro": "R DARCILIO DE MIRANDA"\n        }\n      ],\n      "quantidade": 0,\n      "personInformation": "XXXXXXXXXXXXXXXXXXXXXXXXX"\n    },\n    "telefoneVinculado": {\n      "_id": "5XXXXXXXXXXXXXXXXXXXXXXX50",\n      "__v": 0,\n      "registros": [],\n      "quantidade": 0,\n      "personInformation": "XXXXXXXXXXXXXXXXXXXXXXXXX"\n    },\n    "featuresOpcionais": {\n      "_id": "5XXXXXXXXXXXXXXXXXXXXXXXf",\n      "__v": 0,\n      "email": null,\n      "locEndTel": null,\n      "score12Meses": null,\n      "rendaPresumida": {\n        "renda": null,\n        "codigo": null,\n        "retorno": null\n      },\n      "participacaoSocietaria": null,\n      "score": null,\n      "faturamentoPresumido": {\n        "codigo": "1",\n        "retorno": "CONSTA FATURAMENTO PRESUMIDO PARA O DOCUMENTO INFORMADO",\n        "num_funcionarios": "-",\n        "porte": "-",\n        "filiais": "-",\n        "faturamento": "0,00"\n      },\n      "qsa": {\n        "codigo": "1",\n        "retorno": "CONSTA QUADRO SOCIETARIO ADMINISTRATIVO PARA O DOCUMENTO INFORMADO",\n        "quantidade": "2",\n        "registro": [\n          {\n            "cpfcnpj": "00000000000000",\n            "nome_razao": "ATUAL CAMINHOES LTDA - ME",\n            "documento": "6101789624",\n            "nome": "DIOGO RIBEIRO BARREIRA",\n            "qualificacao": "SOCIO",\n            "qualificacao_global": "SOCIO",\n            "percentual": "-",\n            "data": "-"\n          },\n          {\n            "cpfcnpj": "00000000000000",\n            "nome_razao": "ATUAL CAMINHOES LTDA - ME",\n            "documento": "83708421604",\n            "nome": "SILVANO RIBEIRO DE MAGALHAES",\n            "qualificacao": "SOCIO-ADMINISTRADOR",\n            "qualificacao_global": "SOCIO",\n            "percentual": "-",\n            "data": "-"\n          }\n        ]\n      },\n      "representanteLegal": null,\n      "personInformation": "XXXXXXXXXXXXXXXXXXXXXXXXX"\n    },\n    "ultimoTelefoneInformado": null,\n    "telefoneConsultado": {\n      "quantidade": 0\n    },\n    "endCepConsultado": null,\n    "baseNegativacao": null,\n    "dadosCadastrais": {\n      "descricaoNaturezaJuridica": null,\n      "codigoNaturezaJuridica": "2062",\n      "descricaoCnae": "COMERCIO A VAREJO DE AUTOMOVEIS, CAMIONETAS E UTILITARIOS USADOS",\n      "codigoCnae": "4511102",\n      "dataFundacao": "30/05/2008",\n      "nomeFantasia": "ATUAL CAMINHOES",\n      "razaoSocial": "ATUAL CAMINHOES LTDA ME",\n      "dataSituacaoCnpj": "19/11/2016",\n      "situacaoCnpj": "ATIVA",\n      "email": null,\n      "estadoCivil": null,\n      "tituloEleitor": null,\n      "nomePai": null,\n      "nomeMae": null,\n      "telNum": null,\n      "telDdd": null,\n      "endEstado": "MG",\n      "endCidade": "BETIM",\n      "endBairro": "DISTRITO INDUSTRIAL JARDIM PIEMONT NORTE",\n      "endCep": "32689898",\n      "endComplemento": null,\n      "endNum": "1322",\n      "endTipoLogradouro": null,\n      "endLogradouro": "ROD BR 381 FERNAO DIAS",\n      "sexo": null,\n      "idade": null,\n      "signo": null,\n      "rg": null,\n      "dataNascimento": null,\n      "dataSituacaoCpf": null,\n      "situacaoCpf": null,\n      "documentoOrigem": null,\n      "documento": "123456",\n      "nome": null\n    },\n    "documento": "123456",\n    "status": true,\n    "createAt": "2018-07-23T19:19:05.895Z"\n  }\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/person_information/apidoc_executePerson.js',
            groupTitle: 'Consultas_PF_PJ',
        },
        {
            type: 'post',
            url: '/api/person/:userid',
            title: 'Consultar Pessoa Física e Pessoa Jurídica',
            version: '0.2.0',
            name: 'PersonInformationQuery',
            group: 'Consultas_PF_PJ',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'userid',
                            description: '<p>ID do usuário</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'querycode',
                            description:
                                '<p>Código da consulta a ser realizada. Os códigos de consultas disponíveis podem ser encontrados na requisição (#Consultas:GetEnablesQueries).</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'Object',
                            optional: false,
                            field: 'keys',
                            description:
                                '<p>Chaves para realização da consulta</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'keys.cpf',
                            description:
                                '<p>O CPF para realização da consulta de pessoa física</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'keys.cnpj',
                            description:
                                '<p>O CPNJ para realização da consulta de pessoa jurídica</p>',
                        },
                    ],
                },
                examples: [
                    {
                        title: 'Request-Example:',
                        content:
                            '{\n  "querycode":1,\n  "keys" : {\n    "cpf" : "000000000000"\n  }\n}',
                        type: 'json',
                    },
                ],
            },
            description:
                '<p><br> Quando um dos serviços que compõe a consulta falhar, o retorno trará um nó chamado servicesBroken o qual será um array que armazenará informações relevantes sobre o serviço que falhou para aquela consulta. As informações contidas nesse array, serão úteis para a realização do reprocessamento do serviço para a consulta. O reprocessamento deverá acontecer de forma assíncrona, sem que seja percebido pelo usuário. A navegação do usuário não deve ser impactada. A reconsulta só será possível para consultas que são compostar por 2 ou mais serviços.</p> <p><br> Para o nó &quot;servicesBroken&quot;, os parâmetros de retorno são:<br></p> <pre> {   "servicesBroken": [   {     "_id": "XXXXXXXX",     "lastTry": null,     "requeryTries": 2,     "supplierCode": 40,     "serviceName": "Restricao Total",     "serviceCode": 7,     "serviceLog": "XXXXXXXX"   } } </pre> <p>Onde: <br> lastTry é do tipo Date e representa a ultima tentativa realizada pelo usuário.<br> requeryTries é do tipo Number e corresponde ao número de tentativas que o usuário poderá utilizar consecutivamente.<br> supplierCode trata-se do código do fornecedor (ESTA INFORMAÇÃO NÃO PODERÁ SER DIVULGADA PARA O CLIENTE) <br> serviceName trata-se do nome do serviço que falhou para determinada consulta. <br> serviceCode trata-se do código referente ao serviço que falhou (ESTA INFORMAÇÃO NÃO PODERÁ SER DIVULGADA PARA O CLIENTE) <br> serviceLog ID do log de serviço o qual contem as informações básicas para reconsulta. <br></p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n"status": {\n      "cod": 200,\n      "msg": "ok"\n},\n"body": {\n      "headerInfos": {\n      "queryid": "XXXXXXXX",\n      "name": "Agregados",\n      "date": "2018-03-14T17:34:53.598Z"\n},\n"data":{\n      "createAt" : "2018-03-22T15:18:11.676Z",\n      "status" : true,\n      "documento" : "123456",\n      "dadosCadastrais" : {\n            "nome" : "FULANDO DA SILVA SAURO",\n            "documento" : "28912461109",\n            "documentoOrigem" : "MINAS GERAIS",\n            "situacaoCpf" : "REGULAR",\n            "dataSituacaoCpf" : "16/03/2018",\n            "dataNascimento" : "05/03/1992",\n            "rg" : "-",\n            "signo" : "PEIXES",\n            "idade" : "26",\n            "sexo" : "MASCULINO",\n            "endLogradouro" : "CAMILO SOARES 1000",\n            "endNum" : "-",\n            "endCep" : "52130000",\n            "endBairro" : "CENTRO",\n            "endCidade" : "TERRA DO NUNCA",\n            "endEstado" : "-",\n            "telDdd" : "-",\n            "telNum" : "-",\n            "nomeMae" : "NOME DA MAE DO FULANDO",\n            "nomePai" : "-",\n            "tituloEleitor" : "-",\n            "estadoCivil" : "-",\n            "email" : "-",\n            "situacaoCnpj" : null,\n            "dataSituacaoCnpj" : null,\n            "razaoSocial" : null,\n            "nomeFantasia" : null,\n            "dataFundacao" : null,\n            "codigoCnae" : null,\n            "descricaoCnae" : null,\n            "codigoNaturezaJuridica" : null\n      },\n      "baseNegativacao" : null,\n      "endCepConsultado" : null,\n      "telefoneConsultado" : {\n            "quantidade" : 0\n      },\n      "ultimoTelefoneInformado" : null,\n      "featuresOpcionais" : {\n            "representanteLegal" : null,\n            "qsa" : null,\n            "faturamentoPresumido" : null,\n            "rendaPresumida" : {\n                  "retorno" : "NENHUM REGISTRO ENCONTRADO",\n                  "codigo" : 2\n            },\n            "locEndTel" : null,\n            "email" : null\n      },\n      "telefoneVinculado" : null,\n      "ultimoEnderecoInformado" : null,\n      "pendenciaSpc" : {\n            "quantidade" : 0,\n            "dataUltimaOcorrencia" : null,\n            "valorTotal" : null,\n            "detalhes" : []\n      },\n      "ccf" : {\n            "quantidade" : 0,\n            "dataUltimaOcorrencia" : null,\n            "detalhes" : []\n      },\n      "consultaRealizada" : {\n            "quantidade" : 6,\n            "quantidadeDiasConsultado" : 90,\n            "registros" : [\n                  {\n                        "nomeAssociado" : "FINARTE PECAS ESPECIAIS",\n                        "cidadeAssociado" : "FORQUILHINHA",\n                        "ufAssociado" : "SC",\n                        "dataConsulta" : "20/03/2018",\n                        "entidadeOrigem" : "CDL - RECIFE / PE",\n                        "_id" : "XXXXXXXXXXXXXXXXXXXX5"\n                  },\n                  {\n                        "nomeAssociado" : "ABC AUTOMOTIVO",\n                        "cidadeAssociado" : "GOIANIA",\n                        "ufAssociado" : "GO",\n                        "dataConsulta" : "20/03/2018",\n                        "entidadeOrigem" : "CDL - RECIFE / PE",\n                        "_id" : "XXXXXXXXXXXXXXXXXXXX6"\n                  },\n                  {\n                        "nomeAssociado" : "REAL CRED",\n                        "cidadeAssociado" : "EUNAPOLIS",\n                        "ufAssociado" : "BA",\n                        "dataConsulta" : "20/03/2018",\n                        "entidadeOrigem" : "CDL - RECIFE / PE",\n                        "_id" : "XXXXXXXXXXXXXXXXXXXX7"\n                  },\n                  {\n                        "nomeAssociado" : "E C P - CONTABILIDADE, LOGIC@ E PROCESSAMENTO",\n                        "cidadeAssociado" : "PINDORAMA",\n                        "ufAssociado" : "SP",\n                        "dataConsulta" : "19/03/2018",\n                        "entidadeOrigem" : "CDL - RECIFE / PE",\n                        "_id" : "XXXXXXXXXXXXXXXXXXXX8"\n                  },\n                  {\n                        "nomeAssociado" : "AGRONORTE PRODUTOS AGROPECUARIA",\n                        "cidadeAssociado" : "NOVO REPARTIMENTO",\n                        "ufAssociado" : "PA",\n                        "dataConsulta" : "16/03/2018",\n                        "entidadeOrigem" : "CDL - RECIFE / PE",\n                        "_id" : "XXXXXXXXXXXXXXXXXXXX9"\n                  },\n                  {\n                        "nomeAssociado" : "BEACH NET INFORMATICA",\n                        "cidadeAssociado" : "ITANHAEM",\n                        "ufAssociado" : "SP",\n                        "dataConsulta" : "22/03/2018",\n                        "entidadeOrigem" : "CDL - RECIFE / PE",\n                        "_id" : "XXXXXXXXXXXXXXXXXXXXa"\n                  },\n                  {\n                        "nomeAssociado" : "FINARTE PECAS ESPECIAIS",\n                        "cidadeAssociado" : "FORQUILHINHA",\n                        "ufAssociado" : "SC",\n                        "dataConsulta" : "20/03/2018",\n                        "entidadeOrigem" : "CDL - RECIFE / PE",\n                        "_id" : "XXXXXXXXXXXXXXXXXXXXb"\n                  },\n                  {\n                        "nomeAssociado" : "ABC AUTOMOTIVO",\n                        "cidadeAssociado" : "GOIANIA",\n                        "ufAssociado" : "GO",\n                        "dataConsulta" : "20/03/2018",\n                        "entidadeOrigem" : "CDL - RECIFE / PE",\n                        "_id" : "XXXXXXXXXXXXXXXXXXXXc"\n                  },\n                  {\n                        "nomeAssociado" : "REAL CRED",\n                        "cidadeAssociado" : "EUNAPOLIS",\n                        "ufAssociado" : "BA",\n                        "dataConsulta" : "20/03/2018",\n                        "entidadeOrigem" : "CDL - RECIFE / PE",\n                        "_id" : "XXXXXXXXXXXXXXXXXXXXd"\n                  },\n                  {\n                        "nomeAssociado" : "E C P - CONTABILIDADE, LOGIC@ E PROCESSAMENTO",\n                        "cidadeAssociado" : "PINDORAMA",\n                        "ufAssociado" : "SP",\n                        "dataConsulta" : "19/03/2018",\n                        "entidadeOrigem" : "CDL - RECIFE / PE",\n                        "_id" : "XXXXXXXXXXXXXXXXXXXXe"\n                  },\n                  {\n                        "nomeAssociado" : "AGRONORTE PRODUTOS AGROPECUARIA",\n                        "cidadeAssociado" : "NOVO REPARTIMENTO",\n                        "ufAssociado" : "PA",\n                        "dataConsulta" : "16/03/2018",\n                        "entidadeOrigem" : "CDL - RECIFE / PE",\n                        "_id" : "XXXXXXXXXXXXXXXXXXXXf"\n                  }\n            ]\n      },\n      "pefin" : {\n            "quantidade" : 0,\n            "dataUltimaOcorrencia" : null,\n            "valorTotal" : null,\n            "detalhe" : {\n                  "moeda" : null,\n                  "cidade" : null,\n                  "uf" : null,\n                  "avalista" : null,\n                  "contrato" : null,\n                  "dataOcorrencia" : null,\n                  "origem" : null,\n                  "tituloOcorrencia" : "teste",\n                  "valorPendencia" : "10"\n            }\n      },\n      "protesto" : {\n            "quantidade" : 0,\n            "dataPrimeiraOcorrencia" : null,\n            "dataUltimaOcorrencia" : null,\n            "valorTotal" : null,\n            "detalhes" : []\n      },\n      "pefinBvs" : {\n            "dadosConsulta" : {\n                  "documento" : "0000000000000000",\n                  "tipoConsulta" : "Pefin BVS",\n                  "dataConsulta" : "22/03/2018",\n                  "horaConsulta" : "12:33"\n            },\n            "dadosCadastrais" : {\n                  "nome" : "FULANO DE SOUZA SILVA",\n                  "documento" : "000000000000000",\n                  "dataNascimento" : null,\n                  "nomeMae" : "NOME DA MAE DO FULANDO"\n            },\n            "detalhes" : [],\n            "restricao" : "NADA CONSTA"\n      },\n      "restricaoTotal" : {\n            "grafiaPj" : {\n                  "registros" : []\n            },\n            "contraOrdem" : {\n                  "quantidade" : 0\n            },\n            "contumacia" : {\n                  "quantidade" : 0\n            },\n            "dadosAgenciaBancaria" : null,\n            "chequeConsultaOnlineSrs" : {\n                  "quantidade" : 0\n            }\n      },\n      "_id" : "XXXXXXXXXXXXXXXXXXXX7"\n }\n},\n  "billing": {\n        "err": null,\n        "success": true,\n        "cost": 1.99\n        },\n  "servicesBroken": [],\n }\n}',
                        type: 'json',
                    },
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": {\n    "headerInfos": {\n    "queryid": "XXXXXXXX",\n    "name": "Restricao Total",\n    "date": "2018-03-14T17:40:01.712Z"\n  },\n  "data": {\n    "msg": "Nenhum registro encontrado para a consulta realizada."\n  },\n  "billing": {\n    "err": null,\n    "success": true,\n    "cost": 4.99\n  },\n  "servicesBroken": [],\n  }\n}',
                        type: 'json',
                    },
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n  "cod": 200,\n  "msg": "ok"\n},\n"body": {\n  "headerInfos": {\n  "queryid": "XXXXXXXX",\n  "name": "Restricao Total",\n  "date": "2018-03-14T17:45:56.684Z"\n},\n"data": {\n  "msg": "Nenhum registro encontrado para a consulta realizada."\n},\n"billing": {\n  "err": null,\n  "success": true,\n  "cost": 0.6\n},\n"servicesBroken": [\n    {\n      "_id": "XXXXXXXX",\n      "lastTry": null,\n      "requeryTries": 2,\n      "supplierCode": 20,\n      "serviceName": "Restricao Total",\n      "serviceCode": 7,\n      "serviceLog": "XXXXXXXX"\n    }\n  ],\n}\n}',
                        type: 'json',
                    },
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 206 PARTIAL CONTENT\n{\n  "status": {\n    "cod": 206,\n    "msg": "partial content"\n  },\n  "body": {\n    "headerInfos": {\n      "queryid": "XXXXXXXX",\n      "name": "Agregados",\n      "date": "2018-03-14T17:33:35.652Z"\n    },\n    "duplicity_checking": "A consulta referida de Agregados, foi executada recentemente. Caso queira prosseguir, será cobrado o valor integral da mesma, sendo considerada uma nova consulta. Deseja prosseguir?"\n  }\n}',
                        type: 'json',
                    },
                ],
            },
            filename:
                'apidoc/person_information/apidoc_executePersonInformation.js',
            groupTitle: 'Consultas_PF_PJ',
        },
        {
            type: 'post',
            url: '/api/vehicle/:userid',
            title: 'Consultar veículo',
            version: '0.2.0',
            name: 'VehicularQuery',
            group: 'Consultas_Veiculares',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'userid',
                            description: '<p>ID do usuário</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'querycode',
                            description:
                                '<p>Código da consulta a ser realziada. Os códigos de consultas disponíveis podem ser encontrados na requisição <a href="https://api.olhonocarro.com.br/doc#api-Consultas-GetEnablesQueries">Buscar consultas disponiveis</a>.</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'Object',
                            optional: false,
                            field: 'keys',
                            description:
                                '<p>Chaves para realização da consulta</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'keys.placa',
                            description:
                                '<p>Placa do veículo a ser consultado</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'keys.chassi',
                            description:
                                '<p>Chassi do veículo a ser consultado</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'keys.ranavam',
                            description:
                                '<p>Renavam do veículo a ser consultado</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'keys.motor',
                            description:
                                '<p>Número do Motor do veículo a ser consultado.</p>',
                        },
                    ],
                },
                examples: [
                    {
                        title: 'Request-Example:',
                        content:
                            '{\n  "querycode":1,\n  "keys" : {\n    "placa" : "ABC1234"\n  }\n}',
                        type: 'json',
                    },
                ],
            },
            description:
                '<p>O parâmetro USER_ID deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br> <b>EX: /api/vehicle/&lt;USER_ID&gt;</b> <br> <br> Esta é a requisição responsável por realizar a consultas veiculares na API. As consultas disponíveis podem ser visualizadas <a href="https://api.olhonocarro.com.br/doc#api-Consultas-GetEnablesQueries">clicando aqui.</a> OBS: O exemplo de retorno abaixo é meramente ilustrativo, pois para cada consulta, o retorno terá suas caracteristicas específicas. Recomendamos que utilize as consultas disponíves para obtenção do código da consulta (querycode), e que ao integrar consulta a consulta, se atente no retorno em JSON da API. É necessário validar com nossa equipe, a composição dos dados e como os mesmos serão exibidos para os clientes, consulta a consulta. A mesma premissa é valida para as consultas cadastrais. <a href="https://api.olhonocarro.com.br/doc#api-Consultas_PF_PJ-PersonInformationQuery">(Consultas cadastrais)</a> <br> <br>A Consulta veicular é composta por um ou mais serviços (agregados, base estadual, base nacional, renajud, roubo e furto, etc...). Quando um dos serviços que compõe a consulta falhar, o retorno trará um nó chamado servicesBroken o qual será um array que armazenará informações relevantes sobre o serviço que falhou para aquela consutla. As informações contidas nesse array, serão úteis para a realização do reprocessamento do serviço para a consulta. O reprocessamento deverá acontecer de forma assíncrona, sem que seja percebido pelo usuário. A navegação do usuário não deve ser impactada. A reconsulta só será possível para consultas que são compostar por 2 ou mais serviços.</p> <p><br> Para o nó &quot;servicesBroken&quot;, os parâmetros de retorno são:<br></p> <pre> {  "servicesBroken": [   {     "_id": "XXXXXXXX",     "lastTry": null,     "requeryTries": 2,     "supplierCode": 20,     "serviceName": "Renajud",     "serviceCode": 5,     "serviceLog": "XXXXXXXX"   } } </pre> <p>Onde: <br> lastTry é do tipo Date e representa a ultima tentativa realizada pelo usuário.<br> requeryTries é do tipo Number e corresponde ao número de tentativas que o usuário poderá utilizar consecutivamente.<br> supplierCode trata-se do código do fornecedor (ESTA INFORMAÇÃO NÃO PODERÁ SER DIVULGADA PARA O CLIENTE) <br> serviceName trata-se do nome do serviço que falhou para determinada consulta. <br> serviceCode trata-se do código referente ao serviço que falhou (ESTA INFORMAÇÃO NÃO PODERÁ SER DIVULGADA PARA O CLIENTE) <br> serviceLog ID do log de serviço o qual contem as informações básicas para reconsulta. <br></p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": {\n    "headerInfos": {\n      "queryid": "XXXXXXXX",\n      "name": "Agregados",\n      "date": "2018-03-14T17:34:53.598Z"\n    },\n    "data": {\n      "codigoMunicipio": "7107",\n      "dtAtualizacao": "2013-03-28T03:00:00.000Z",\n      "__v": 0,\n      "situacaoVeiculo": "S",\n      "pesoBrutoTotal": "177",\n      "capMaxTracao": "237",\n      "cilindradas": "XXXXXXXX",\n      "limiteRestricaoTrib": null,\n      "restricao4": "SEM RESTRICAO",\n      "restricao3": "SEM RESTRICAO",\n      "restricao2": "SEM RESTRICAO",\n      "restricao1": "SEM RESTRICAO",\n      "dtUltimaAtualizacao": "2012-03-15T03:00:00.000Z",\n      "unidadeLocalSRF": "XXXXXXXX",\n      "registroDi": null,\n      "di": "1202708775",\n      "identImportadora": null,\n      "tipoDocImportadora": null,\n      "tipoMontagem": "1",\n      "eixos": "2",\n      "situacaoChassi": "N",\n      "qtdPax": "5",\n      "corVeiculo": "Preta",\n      "tipoCarroceria": "NAO APLICAVEL",\n      "especieVeiculo": "Passageiro",\n      "tipoVeiculo": "Automovel",\n      "tipoDocProprietario": "Jurídica",\n      "ufFaturado": "BA",\n      "tipoDocFaturado": "Jurídica",\n      "numTerceiroEixo": null,\n      "numMotor": null,\n      "eixoTraseiroDif": null,\n      "caixaCambio": null,\n      "numCarroceria": null,\n      "linha": "XXXXXXXX",\n      "nacionalidade": "Importado",\n      "capacidadeCarga": "0",\n      "potencia": "XXXXXXXX",\n      "combustivel": "Álcool / Gasolina",\n      "codigoCombustivel": "XXXXXXXX",\n      "marcaModelo": "I/FORD FOCUS TI 2LHCFLEX",\n      "codigoMarcaModelo": "XXXXXXXX",\n      "municipio": "SAO PAULO",\n      "anoModelo": "XXXXXXXX",\n      "anoFabricacao": "XXXXXXXX",\n      "numFaturado": "XXXXXXXX",\n      "cidade": "SÃ£o Paulo",\n      "uf": "SP",\n      "renavam": "XXXXXXXX",\n      "placa": "XXXXXXXX",\n      "chassi": "XXXXXXXX"\n    },\n    "billing": {\n      "err": null,\n      "success": true,\n      "cost": 1.99\n    },\n    "servicesBroken": [],\n  }\n}',
                        type: 'json',
                    },
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": {\n    "headerInfos": {\n      "queryid": "XXXXXXXX",\n      "name": "Agregados",\n      "date": "2018-03-14T17:40:01.712Z"\n    },\n    "data": {\n      "msg": "Nenhum registro encontrado para a consulta realizada."\n    },\n    "billing": {\n      "err": null,\n      "success": true,\n      "cost": 1.99\n    },\n    "servicesBroken": [],\n  }\n}',
                        type: 'json',
                    },
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": {\n    "headerInfos": {\n      "queryid": "XXXXXXXX",\n      "name": "Renajud",\n      "date": "2018-03-14T17:45:56.684Z"\n    },\n    "data": {\n      "msg": "Veículo não encontrado."\n    },\n    "billing": {\n      "err": null,\n      "success": true,\n      "cost": 0.6\n    },\n    "servicesBroken": [\n      {\n        "_id": "XXXXXXXX",\n        "lastTry": null,\n        "requeryTries": 2,\n        "supplierCode": 20,\n        "serviceName": "Renajud",\n        "serviceCode": 5,\n        "serviceLog": "XXXXXXXX"\n      }\n    ],\n  }\n}',
                        type: 'json',
                    },
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 206 PARTIAL CONTENT\n{\n  "status": {\n    "cod": 206,\n    "msg": "partial content"\n  },\n  "body": {\n    "headerInfos": {\n      "queryid": "XXXXXXXX",\n      "name": "Agregados",\n      "date": "2018-03-14T17:33:35.652Z"\n    },\n    "duplicity_checking": "A consulta referida de Agregados, foi executada recentemente. Caso queira prosseguir, será cobrado o valor integral da mesma, sendo considerada uma nova consulta. Deseja prosseguir?"\n  }\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/vehicle/apidoc_executeVehicularQuery.js',
            groupTitle: 'Consultas_Veiculares',
        },
        {
            type: 'post',
            url: '/api/coupon/',
            title: 'Geração de Cupom',
            version: '0.2.0',
            name: 'CouponsArquive',
            group: 'Cupom_de_Desconto',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'Number',
                            optional: false,
                            field: 'number',
                            description: '<p>numero do cupom.</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'Number',
                            optional: false,
                            field: 'discountPercentage',
                            description: '<p>Porcentagen do desconto.</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'Number',
                            optional: false,
                            field: 'minValueToApply',
                            description: '<p>Valor Mínimo para o Desconto.</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'Number',
                            optional: false,
                            field: 'limitUsage',
                            description: '<p>Limite de uso.</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'Number',
                            optional: false,
                            field: 'code',
                            description: '<p>Código do Cupom.</p>',
                        },
                    ],
                },
                examples: [
                    {
                        title: 'Request-Example:',
                        content:
                            '{\n  "number": 11,\n  "rules": {\n    "discountPercentage": 15,\n    "minValueToApply": 50,\n    "limitUsage": 10,\n    "authorized": {\n      "queries": [\n        {\n          "code": 1,\n          "limit": 5\n        },\n        {\n          "code": 8,\n          "limit": 5\n        }\n      ]\n    }\n  }\n}',
                        type: 'json',
                    },
                ],
            },
            description:
                "<p>O retorno é um arquivo .xlsx de o nome 'cupons_olhonocarro.xlsx'</p>",
            filename: 'apidoc/coupons/apidoc_Arquive.js',
            groupTitle: 'Cupom_de_Desconto',
        },
        {
            type: 'get',
            url: '/api/coupon/code/:code',
            title: 'Código do cupom',
            version: '0.2.0',
            name: 'CouponsCode',
            group: 'Cupom_de_Desconto',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'code',
                            description: '<p>Código do cupom</p>',
                        },
                    ],
                },
            },
            description:
                '<p>O parâmetro code deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br> <b>EX:  /api/coupon/code/&lt;CODE_COUPON&gt; </b></p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": {\n    "_id": "XXXXXXXXXXXXXXXXc145",\n    "__v": 0,\n    "rules": {\n      "authorized": {\n        "packages": [],\n        "queries": []\n      },\n      "limitUsage": 1,\n      "expirationDate": null,\n      "minValueToApply": 150,\n      "discountValue": null,\n      "discountPercentage": 20\n    },\n    "code": "xxxxx",\n    "status": true,\n    "createAt": "2018-06-14T21:15:19.624Z"\n  }\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/coupons/apidoc_code.js',
            groupTitle: 'Cupom_de_Desconto',
        },
        {
            type: 'get',
            url: '/api/coupon/user/:userid',
            title: 'Cupom do usuário',
            version: '0.2.0',
            name: 'CouponsUser',
            group: 'Cupom_de_Desconto',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'userid',
                            description: '<p>ID do usuário</p>',
                        },
                    ],
                },
            },
            description:
                '<p>O parâmetro userid deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br> <b>EX:  /api/coupon/user/<USER ID> </b></p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": [],\n}',
                        type: 'json',
                    },
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "AuthenticationError": "Acesso negado. Você não tem permissão para prosseguir com essa solicitação",\n  "Code": 401\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/coupons/apidoc_user.js',
            groupTitle: 'Cupom_de_Desconto',
        },
        {
            type: 'post',
            url: '/api/coupon/validate/:cuponCode',
            title: 'Validar Cupom de Desconto',
            version: '0.2.0',
            name: 'CouponsValidation',
            group: 'Cupom_de_Desconto',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'code',
                            description: '<p>Código do cupom de desconto.</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'items',
                            description:
                                '<p>Item que será aplicado o cupom de desconto.</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'items.queries',
                            description:
                                '<p>Consultas que serão adicionadas ao carrinho.</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'items.queries.code',
                            description: '<p>Código da consulta.</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'items.queries.amount',
                            description:
                                '<p>Quantidade da consulta referida.</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'items.packages',
                            description:
                                '<p>Pacotes que serão adicionados ao carrinho.</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'items.packages.id',
                            description: '<p>ID do pacote.</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'items.packages.amount',
                            description:
                                '<p>Quantidade do pacote referido.</p>',
                        },
                    ],
                },
                examples: [
                    {
                        title: 'Request-Example:',
                        content:
                            '{\n\t"items":{\n        "queries":[\n           { "code" : 1 , "amount" : 1},\n           { "code" : 8 , "amount" : 1},\n        \t { "code" : 99 , "amount" : 30}\n      \t],\n      \t"packages" : [\n          \t{ "id" : "XXXXXXXXXXXXXXX6",\n               "amount" : 5\n            }\n        ]\n    }\n}',
                        type: 'json',
                    },
                ],
            },
            description:
                '<p>O parâmetro cuponCode deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br> <b>EX:  /api/coupon/validate/<cuponCode></b></p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": {\n    "data": {\n      "result": {\n        "queries": [\n          {\n            "code": 1,\n            "haveDiscount": true,\n            "msg": null,\n            "finalPrice": 4.95,\n            "discountData": {\n              "discountedValue": 4.95,\n              "coupon": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n              "discountPercentage": 10,\n              "fixedDiscountValue": 0\n            }\n          },\n          {\n            "code": 8,\n            "haveDiscount": true,\n            "msg": null,\n            "finalPrice": 2.69,\n            "discountData": {\n              "discountedValue": 2.69,\n              "coupon": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n              "discountPercentage": 10,\n              "fixedDiscountValue": 0\n            }\n          },\n          {\n            "code": 99,\n            "haveDiscount": true,\n            "msg": null,\n            "finalPrice": 135,\n            "discountData": {\n              "discountedValue": 135,\n              "coupon": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n              "discountPercentage": 10,\n              "fixedDiscountValue": 0\n            }\n          }\n        ],\n        "packages": [\n          {\n            "packageid": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n            "haveDiscount": true,\n            "msg": null,\n            "finalPrice": 4500,\n            "discountData": {\n              "discountedValue": 4500,\n              "coupon": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n              "discountPercentage": 10,\n              "fixedDiscountValue": 0\n            }\n          }\n        ],\n        "totalDiscountedPrice": "4642.64",\n        "totalPrice": "5158.49"\n      },\n      "status": true\n    },\n    "code": 200,\n    "error": null\n  }\n}',
                        type: 'json',
                    },
                    {
                        title: 'Error-Response:',
                        content:
                            ' HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": {\n    "data": {\n      "result": null,\n      "status": false,\n      "msg": "O limite de uso desse cupom foi atingido"\n    },\n    "code": 200,\n    "error": null\n  }\n}',
                        type: 'json',
                    },
                ],
            },
            error: {
                fields: {
                    'Error 4xx': [
                        {
                            group: 'Error 4xx',
                            optional: false,
                            field: 'CoupouValidateError',
                            description:
                                '<p>Parâmetros de entrada inválidos</p>',
                        },
                    ],
                },
                examples: [
                    {
                        title: 'Error-Response:',
                        content:
                            'HTTP/1.1 404 Not Found\n {\n   "status": {\n     "cod": 405,\n     "msg": "invalid parameters"\n   },\n   "body": null\n }',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/coupons/apidoc_validate.js',
            groupTitle: 'Cupom_de_Desconto',
        },
        {
            type: 'get',
            url: '/api/invoice/:id',
            title: 'Fatura Completa',
            version: '0.3.0',
            name: 'InvoiceId',
            group: 'Fatura',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'id',
                            description: '<p>Id da fatura.</p>',
                        },
                    ],
                },
            },
            description:
                '<p>O parâmetro USER_ID deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br> <b>EX:  /api/invoice/&lt;USER_ID&gt;</b> Retorna todas as informações referentes a fatura referênciada.</p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n  {\n   "status":{\n      "cod":200,\n      "msg":"ok"\n   },\n   "body":{\n      "_id":"5b7xxxxxxxxxxxxxxx",\n      "__v":2,\n      "accumulatedInvoices":[\n\n      ],\n      "notification":{\n         "lastNotificationDate":null,\n         "hasBeenNotified":false,\n         "sentEmails":0\n      },\n      "paymenteDate":null,\n      "value":4.99,\n      "status":"Cancelada",\n      "consumptionStatementLote":[\n         {\n            "_id":"5b7c4decxxxxxxxxxxxxxxxxxd",\n            "__v":0,\n            "payday":null,\n            "value":4.99,\n            "status":false,\n            "querycode":13,\n            "query":{\n               "name":"Decodificador e Precificador",\n               "_id":"5b7c4debxxxxxxxxxxxxxxxxx9",\n               "keys":{\n                  "cnpj":null,\n                  "cpf":null,\n                  "uf":null,\n                  "renavam":"00457410167",\n                  "motor":"TJDACJ499924",\n                  "chassi":"8AFTZZFHCCJ499924",\n                  "placa":"FAN3137"\n               },\n               "createAt":"21/08/2018 14:37:47"\n            },\n            "billing":"xxxxxxxxxxxxxxxxx",\n            "createAt":"2018-08-21T17:37:48.909Z"\n         }\n      ],\n      "payment":null,\n      "billing":"xxxxxxxxxxxxxxxxx",\n      "expirationDate":"2018-09-01T02:59:59.000Z",\n      "initialDate":"2018-08-01T03:00:00.000Z",\n      "createAt":"2018-08-21T17:37:48.458Z"\n   }\n}',
                        type: 'json',
                    },
                ],
            },
            error: {
                examples: [
                    {
                        title: 'Error-Response:',
                        content:
                            'HTTP/1.1 500 Invalid Parameters\n{\n   "InternalServerError":"Ops... Algo deu errado! Perdoe-nos pelo inconveniênte. Estamos analisando o problema que causou intermitência nessa requisição, aguarde...",\n   "code":500\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/invoice/apidoc_id.js',
            groupTitle: 'Fatura',
        },
        {
            type: 'get',
            url: '/api/invoice/summery/:id',
            title: 'Resumo de Fatura',
            version: '0.3.0',
            name: 'InvoiceSummeryId',
            group: 'Fatura',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'Id',
                            description: '<p>da fatura.</p>',
                        },
                    ],
                },
            },
            description:
                '<p>O parâmetro USER_ID deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br> <b>EX:  /api/invoice/summery/&lt;USER_ID&gt;</b> Retorna as principais informações da fatura referênciada.</p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  {\n   "status":{\n      "cod":200,\n      "msg":"ok"\n   },\n   "body":[\n      {\n         "name":"Decodificador e Precificador",\n         "value":4.99,\n         "amount":1,\n         "itemValue":4.99\n      }\n   ]\n}\n}',
                        type: 'json',
                    },
                ],
            },
            error: {
                examples: [
                    {
                        title: 'Error-Response:',
                        content:
                            'HTTP/1.1 500 Invalid Parameters\n{ \n  "InternalServerError":"Ops... Algo deu errado! Perdoe-nos pelo inconveniênte. Estamos analisando o problema que causou intermitência nessa requisição, aguarde...",\n  "code": 500\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/invoice/apidoc_summeryId.js',
            groupTitle: 'Fatura',
        },
        {
            type: 'get',
            url: '/api/billing/:userid',
            title: 'Consultar Faturamento',
            version: '0.2.0',
            name: 'BillingChangeUserPriceTable',
            group: 'Faturamento',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'userId',
                            description: '<p>Id do usuário.</p>',
                        },
                    ],
                },
            },
            description:
                '<p>O parâmetro userid deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br> <b>EX:  /api/billing/&lt;USER_ID&gt;</b></p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": {\n    "user": "XXXXXXXXXXXXXXXXXXXX",\n    "billingType": 1,\n    "invoices": [],\n    "accountFunds": 3.8000000000000007,\n    "packages": [],\n    "price_table": "XXXXXXXXXXXXXXXXXXXXX"\n  }\n}',
                        type: 'json',
                    },
                    {
                        title: 'Error-Response:',
                        content:
                            'HTTP/1.1 200 ok\n{\n  "InternalServerError": "Ops... Algo deu errado! Perdoe-nos pelo inconveniênte. Estamos analisando o problema que causou intermitência nessa requisição, aguarde...",\n  "code": 500\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/billing/apidoc_id.js',
            groupTitle: 'Faturamento',
        },
        {
            type: 'get',
            url: '/api/billing/complete-comsumption/:userid',
            title: 'Extrato Completo de Consumo',
            version: '0.3.0',
            name: 'BillingCompleteConsumption',
            group: 'Faturamento',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'userid',
                            description: '<p>Id do usuário.</p>',
                        },
                    ],
                },
            },
            description:
                '<p>O parâmetro USER_ID deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br> <b>EX:  /api/billing/complete-comsumption/&lt;USER_ID&gt;</b> <br> <br> A requisição retorna o extrato com todos os dados referentes ao consumo do usuário referênciado.</p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": {\n    "data": [\n      {\n        "_id": "XXXXXXXXXXXXXXXXXXX0005",\n        "__v": 0,\n        "payday": null,\n        "value": 4.25,\n        "status": false,\n        "querycode": 7,\n        "query": "XXXXXXXXXXXXXXX7208fb611",\n        "billing": "XXXXXXXXXXXXXXX44bb0ea7b36",\n        "createAt": "2018-03-21T02:37:56.667Z"\n      },\n      {\n        "_id": "XXXXXXXXXX2b430ff7cff30005",\n        "__v": 0,\n        "payday": null,\n        "value": 4.25,\n        "status": false,\n        "querycode": 7,\n        "query": "XXXXXXXXXX534144a127f6",\n        "billing": "XXXXXXXXXXXXXf44bb0ea7b36",\n        "createAt": "2018-03-21T02:34:20.134Z"\n      },\n      {\n        "_id": "XXXXXXXXXXX590cd437285a",\n        "__v": 0,\n        "payday": null,\n        "value": 4.25,\n        "status": false,\n        "querycode": 7,\n        "query": "XXXXXXXXXXXXX90cd4372858",\n        "billing": "XXXXXXXXXXXXXX44bb0ea7b36",\n        "createAt": "2018-03-21T02:33:03.954Z"\n      },\n      {\n        "_id": "XXXXXXXXXXXXXX3c41f0b906d5",\n        "__v": 0,\n        "payday": null,\n        "value": 4.25,\n        "status": false,\n        "querycode": 7,\n        "query": "5aXXXXXXXXXXXXXXXXXb906d3",\n        "billing": "XXXfXXXXXXXXXXXXXXXXXea7b36",\n        "createAt": "2018-03-21T02:31:26.374Z"\n      },\n      {\n        "_id": "5ab1c3734ff9ea0d10a9ada2",\n        "__v": 0,\n        "payday": null,\n        "value": 4.25,\n        "status": false,\n        "querycode": 7,\n        "query": "5XXXXXXXXXXXXXXXXX0d10a9ada0",\n        "billing": "XXXf0a70aXXXXXXXXXXXXXXXXa7b36",\n        "createAt": "2018-03-21T02:29:07.068Z"\n      },\n      {\n        "_id": "5XXXXXXXXXXXXXXXXXXXXXXcdad12",\n        "__v": 0,\n        "payday": null,\n        "value": 4.25,\n        "status": false,\n        "querycode": 7,\n        "query": "XXXXXXXXXXXXXXXXXXXXXXa10cdad10",\n        "billing": "XXXXXXXXXXXXXXXXXX4bb0ea7b36",\n        "createAt": "2018-03-21T02:28:13.784Z"\n      },\n      {\n        "_id": "5XXXXXXXXXXXXXXXXXXXXXb1838d263",\n        "__v": 0,\n        "payday": null,\n        "value": 4.25,\n        "status": false,\n        "querycode": 7,\n        "query": "5ab1cXXXXXXXXXXXXXXXXXXXXX",\n        "billing": "XXXf0aXXXXXXXXXXXXXa7b36",\n        "createAt": "2018-03-21T02:24:07.430Z"\n      },\n      {\n        "_id": "5XXXXXXXXXXXXXXXXXd18dc449c97",\n        "__v": 0,\n        "payday": null,\n        "value": 4.25,\n        "status": false,\n        "querycode": 7,\n        "query": "XXXXXXXXXXXXXX8dc449c95",\n        "billing": "XXXf0a70XXXXXXXXXXXXXXXXX",\n        "createAt": "2018-03-21T02:23:01.509Z"\n      },\n      {\n        "_id": "5ab1c139XXXXXXXXXXXXXX",\n        "__v": 0,\n        "payday": null,\n        "value": 4.25,\n        "status": false,\n        "querycode": 7,\n        "query": "XXXXXXXXXXXXXXXX698ef88d0",\n        "billing": "XXXXXXXXXXXXXXXXXXXXXX",\n        "createAt": "2018-03-21T02:19:37.393Z"\n      },\n      {\n        "_id": "5ab075XXXXXXXXXXXXXXXXXXX",\n        "__v": 0,\n        "payday": null,\n        "value": 4.25,\n        "status": false,\n        "querycode": 7,\n        "query": "XXXXXXXXXXXXXXXXXXed889e",\n        "billing": "XXXXXXXXXXXXXXXXXXXXXX",\n        "createAt": "2018-03-20T02:42:52.884Z"\n      },\n      {\n        "_id": "XXXXXXXXXXXXXXXXXXXff82388dd",\n        "__v": 0,\n        "payday": null,\n        "value": 1.99,\n        "status": false,\n        "querycode": 1,\n        "query": "5aa1b4f2aXXXXXXXXXXXXXXXXXXXb",\n        "billing": "XXXf0XXXXXXXXXXXXXXXXXXXXXXX",\n        "createAt": "2018-03-08T22:10:59.542Z"\n      },\n      {\n        "_id": "5XXXXXXXXXXXXXXXXXXXXXXXXXX4",\n        "__v": 0,\n        "payday": null,\n        "value": 1.99,\n        "status": false,\n        "querycode": 1,\n        "query": "XXXXXXXXXXXX82388d2",\n        "billing": "5XXXXXXXXXXXXXa7b36",\n        "createAt": "2018-03-08T22:08:29.370Z"\n      }\n    ],\n    "dt": null\n  }\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/billing/apidoc_completeConsumption.js',
            groupTitle: 'Faturamento',
        },
        {
            deprecated: {
                content:
                    '@apiDeprecated Utilize a nova versão para implementação do extrato completo. Vá para (#Faturamento:BillingCompleteExtract2).',
            },
            type: 'get',
            url: '/api/billing/complete-extract/:userid',
            title: 'Extrato Completo',
            version: '0.2.0',
            name: 'BillingCompleteExtract',
            group: 'Faturamento',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'userId',
                            description: '<p>Id do usuário.</p>',
                        },
                    ],
                },
            },
            description:
                '<p>O parâmetro deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br> <b>EX:  /api/billing/complete-extract/&lt;USER_ID&gt;</b></p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n  {\n    "status": {\n      "cod": 200,\n      "msg": "ok"\n    },\n    "body": [\n      {\n        "query": "Agregados",\n        "date": "2018-03-08T22:10:59.542Z",\n        "cost": 1.99,\n        "status": false,\n        "payday": null\n      },\n      {\n        "query": "Agregados",\n        "date": "2018-03-08T22:08:29.370Z",\n        "cost": 1.99,\n        "status": false,\n        "payday": null\n      }\n    ],\n  }',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/billing/apidoc_completeExtract.js',
            groupTitle: 'Faturamento',
        },
        {
            type: 'get',
            url:
                '/api/billing/complete-comsumption/:userid?dt=<DATE_REFERENCE>',
            title: 'Extrato de Consumo',
            version: '0.3.0',
            name: 'BillingCompleteExtract2',
            group: 'Faturamento',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'userId',
                            description: '<p>Id do usuário.</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'Date',
                            optional: false,
                            field: 'dt',
                            description:
                                '<p>Data de retorno da API para buscar o proximo lote.</p>',
                        },
                    ],
                },
            },
            description:
                '<p>O parâmetro DATE_REFERENCE deve ser passado no formato &quot;Query String&quot; de acordo com a implementação REST. <br> <b>EX:  /api/billing/complete-comsumption/&lt;USER_ID&gt;?dt=&lt;DATE_REFERENCE&gt;</b> <br> <br> Essa requisição trabalha com a busca em lote de registros. Os lotes serão retornados de 50 em 50, sendo indexado pela data de criação do ultimo registro do ultimo lote buscado. Logo, para executar essa operação, passe sempre na primeira requisição o parametro &quot;dt&quot; vazaio ou nulo. Caso haja mais de 50 registros, a API retornará o nó &quot;dt&quot; o qual deverá ser passado nas proximas requisições para esse mesmo endpoint.</p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": {\n    "data": [\n      {\n        "_id": "XXXXXXXXXXXXXXXXXXX0005",\n        "__v": 0,\n        "payday": null,\n        "value": 4.25,\n        "status": false,\n        "querycode": 7,\n        "query": "XXXXXXXXXXXXXXX7208fb611",\n        "billing": "XXXXXXXXXXXXXXX44bb0ea7b36",\n        "createAt": "2018-03-21T02:37:56.667Z"\n      },\n      {\n        "_id": "XXXXXXXXXX2b430ff7cff30005",\n        "__v": 0,\n        "payday": null,\n        "value": 4.25,\n        "status": false,\n        "querycode": 7,\n        "query": "XXXXXXXXXX534144a127f6",\n        "billing": "XXXXXXXXXXXXXf44bb0ea7b36",\n        "createAt": "2018-03-21T02:34:20.134Z"\n      },\n      {\n        "_id": "XXXXXXXXXXX590cd437285a",\n        "__v": 0,\n        "payday": null,\n        "value": 4.25,\n        "status": false,\n        "querycode": 7,\n        "query": "XXXXXXXXXXXXX90cd4372858",\n        "billing": "XXXXXXXXXXXXXX44bb0ea7b36",\n        "createAt": "2018-03-21T02:33:03.954Z"\n      },\n      {\n        "_id": "XXXXXXXXXXXXXX3c41f0b906d5",\n        "__v": 0,\n        "payday": null,\n        "value": 4.25,\n        "status": false,\n        "querycode": 7,\n        "query": "5aXXXXXXXXXXXXXXXXXb906d3",\n        "billing": "XXXfXXXXXXXXXXXXXXXXXea7b36",\n        "createAt": "2018-03-21T02:31:26.374Z"\n      },\n      {\n        "_id": "5ab1c3734ff9ea0d10a9ada2",\n        "__v": 0,\n        "payday": null,\n        "value": 4.25,\n        "status": false,\n        "querycode": 7,\n        "query": "5XXXXXXXXXXXXXXXXX0d10a9ada0",\n        "billing": "XXXf0a70aXXXXXXXXXXXXXXXXa7b36",\n        "createAt": "2018-03-21T02:29:07.068Z"\n      },\n      {\n        "_id": "5XXXXXXXXXXXXXXXXXXXXXXcdad12",\n        "__v": 0,\n        "payday": null,\n        "value": 4.25,\n        "status": false,\n        "querycode": 7,\n        "query": "XXXXXXXXXXXXXXXXXXXXXXa10cdad10",\n        "billing": "XXXXXXXXXXXXXXXXXX4bb0ea7b36",\n        "createAt": "2018-03-21T02:28:13.784Z"\n      },\n      {\n        "_id": "5XXXXXXXXXXXXXXXXXXXXXb1838d263",\n        "__v": 0,\n        "payday": null,\n        "value": 4.25,\n        "status": false,\n        "querycode": 7,\n        "query": "5ab1cXXXXXXXXXXXXXXXXXXXXX",\n        "billing": "XXXf0aXXXXXXXXXXXXXa7b36",\n        "createAt": "2018-03-21T02:24:07.430Z"\n      },\n      {\n        "_id": "5XXXXXXXXXXXXXXXXXd18dc449c97",\n        "__v": 0,\n        "payday": null,\n        "value": 4.25,\n        "status": false,\n        "querycode": 7,\n        "query": "XXXXXXXXXXXXXX8dc449c95",\n        "billing": "XXXf0a70XXXXXXXXXXXXXXXXX",\n        "createAt": "2018-03-21T02:23:01.509Z"\n      },\n      {\n        "_id": "5ab1c139XXXXXXXXXXXXXX",\n        "__v": 0,\n        "payday": null,\n        "value": 4.25,\n        "status": false,\n        "querycode": 7,\n        "query": "XXXXXXXXXXXXXXXX698ef88d0",\n        "billing": "XXXXXXXXXXXXXXXXXXXXXX",\n        "createAt": "2018-03-21T02:19:37.393Z"\n      },\n      {\n        "_id": "5ab075XXXXXXXXXXXXXXXXXXX",\n        "__v": 0,\n        "payday": null,\n        "value": 4.25,\n        "status": false,\n        "querycode": 7,\n        "query": "XXXXXXXXXXXXXXXXXXed889e",\n        "billing": "XXXXXXXXXXXXXXXXXXXXXX",\n        "createAt": "2018-03-20T02:42:52.884Z"\n      },\n      {\n        "_id": "XXXXXXXXXXXXXXXXXXXff82388dd",\n        "__v": 0,\n        "payday": null,\n        "value": 1.99,\n        "status": false,\n        "querycode": 1,\n        "query": "5aa1b4f2aXXXXXXXXXXXXXXXXXXXb",\n        "billing": "XXXf0XXXXXXXXXXXXXXXXXXXXXXX",\n        "createAt": "2018-03-08T22:10:59.542Z"\n      },\n      {\n        "_id": "5XXXXXXXXXXXXXXXXXXXXXXXXXX4",\n        "__v": 0,\n        "payday": null,\n        "value": 1.99,\n        "status": false,\n        "querycode": 1,\n        "query": "XXXXXXXXXXXX82388d2",\n        "billing": "5XXXXXXXXXXXXXa7b36",\n        "createAt": "2018-03-08T22:08:29.370Z"\n      }\n    ],\n    "dt": null\n  }\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/billing/apidoc_completeExtract2.js',
            groupTitle: 'Faturamento',
        },
        {
            type: 'get',
            url: '/api/billing/user-credits/:userid',
            title: 'Buscar Créditos por Usuário',
            version: '0.2.0',
            name: 'BillingGetCredits',
            group: 'Faturamento',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'userId',
                            description: '<p>Id do usuário.</p>',
                        },
                    ],
                },
            },
            description:
                '<p>O parâmetro p deve ser passado no formato &quot;Query String&quot; de acordo com a implementação REST. <br> <b>EX:  /api/billing/user-credits/&lt;USER_ID&gt;</b></p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n  {\n    "status": {\n      "cod": 200,\n      "msg": "ok"\n    },\n    "body": {\n      "data": "156.02"\n    }\n  }',
                        type: 'json',
                    },
                ],
            },
            error: {
                fields: {
                    'Error 4xx': [
                        {
                            group: 'Error 4xx',
                            optional: false,
                            field: 'AddCreditsError',
                            description: '<p>Usuário não encontrado</p>',
                        },
                    ],
                },
                examples: [
                    {
                        title: 'Error-Response:',
                        content:
                            'HTTP/1.1 404 Not Found\n {\n   "status": {\n     "cod": 404,\n     "msg": "not found"\n   },\n   "body": "Usuário inválido ou inexistente."\n }',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/billing/apidoc_getCredits.js',
            groupTitle: 'Faturamento',
        },
        {
            type: 'get',
            url: '/api/billing/summery-post-paid-consumption',
            title: 'Cobrança Manual',
            version: '0.2.0',
            name: 'BillingManualCharge',
            group: 'Faturamento',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            description:
                '<p><br> <b>EX:  /api/billing/summery-post-paid-consumption</b></p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": []\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/billing/apidoc_manualCharge.js',
            groupTitle: 'Faturamento',
        },
        {
            type: 'get',
            url: '/api/billing/summery-extract/:userid',
            title: 'Resumo do Extrato de Consumo',
            version: '0.2.0',
            name: 'BillingSummeryExtract',
            group: 'Faturamento',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'userId',
                            description: '<p>Id do usuário.</p>',
                        },
                    ],
                },
            },
            description:
                '<p>O parâmetro deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br> <b>EX:  /api/billing/summery-extract/&lt;USER_ID&gt;</b></p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": {\n    "summeryExtract": [\n      {\n        "query": "Debitos e Multas",\n        "price": "1.17",\n        "queriesNumber": 1\n      },\n      {\n        "query": "Leilao Simples",\n        "price": "38.55",\n        "queriesNumber": 15\n      },\n      {\n        "query": "Decodificador e Precificador",\n        "price": "3.20",\n        "queriesNumber": 16\n      },\n      {\n        "query": "Historico de Proprietarios",\n        "price": "17.00",\n        "queriesNumber": 17\n      },\n      {\n        "query": "Roubo e Furto",\n        "price": "11.00",\n        "queriesNumber": 11\n      },\n      {\n        "query": "Perda Total",\n        "price": "8.00",\n        "queriesNumber": 8\n      },\n      {\n        "query": "Credito Simples",\n        "price": "12.20",\n        "queriesNumber": 4\n      },\n      {\n        "query": "Consulta de CCF",\n        "price": "21.32",\n        "queriesNumber": 26\n      },\n      {\n        "query": "Restricao Total",\n        "price": "85.00",\n        "queriesNumber": 20\n      },\n      {\n        "query": "Gravame Simples",\n        "price": "14.25",\n        "queriesNumber": 25\n      },\n      {\n        "query": "Cadastro Completo",\n        "price": "23.20",\n        "queriesNumber": 16\n      },\n      {\n        "query": "Agregados",\n        "price": "9.48",\n        "queriesNumber": 3\n      }\n    ],\n    "totalToPay": "244.37"\n  }\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/billing/apidoc_summeryExtract.js',
            groupTitle: 'Faturamento',
        },
        {
            type: 'get',
            url: '/api/billing/summery-post-paid-consumption/',
            title: 'Resumo do Consumo de Usuário Pós-pago',
            version: '0.3.0',
            name: 'BillingSummeryPostPaidConsumption',
            group: 'Faturamento',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            description:
                '<p>É um modelo de retorno para uma consulta de consumo de Usuário Pós-pago. <br> <b>EX:  /api/billing/summery-post-paid-consumption/&gt;</b></p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n   "status":{\n      "cod":200,\n      "msg":"ok"\n   },\n   "body":[\n      {\n         "name":"ftestefilho",\n         "email":"testefilho@teste.com.br",\n         "consumption":17.8,\n         "totalQueries":2,\n         "query":"Dados Cadastrais do Veiculo",\n         "creditsAvailable":999999982.2\n      },\n      {\n         "name":"testeMae",\n         "email":"testemae@teste.com.br",\n         "consumption":133.5,\n         "totalQueries":15,\n         "query":"Dados Cadastrais do Veiculo",\n         "creditsAvailable":9999999991.1\n      }\n   ]\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/billing/apidoc_summeryPostPaidConsumption.js',
            groupTitle: 'Faturamento',
        },
        {
            type: 'get',
            url: '/api/billing/update-invoice/:userid',
            title: 'Atualizar Fatura',
            version: '0.2.0',
            name: 'BillingUpdateInvoice',
            group: 'Faturamento',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'userId',
                            description: '<p>Id do usuário.</p>',
                        },
                    ],
                },
            },
            description:
                '<p>O parâmetro userid deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br> <b>EX:  /api/billing/update-invoice/&lt;USER_ID&gt;</b></p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": {\n    "itensLotePaid": 0,\n    "paymentDate": null,\n    "status": null\n  }\n}',
                        type: 'json',
                    },
                    {
                        title: 'Error-Response:',
                        content:
                            'HTTP/1.1 200 ok\n{\n  "InternalServerError": "Ops... Algo deu errado! Perdoe-nos pelo inconveniênte. Estamos analisando o problema que causou intermitência nessa requisição, aguarde...",\n  "code": 500\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/billing/apidoc_updateInvoice.js',
            groupTitle: 'Faturamento',
        },
        {
            type: 'get',
            url: '/api/billing/user-credits/:userid',
            title: 'Creditos do Usuário',
            version: '0.2.0',
            name: 'BillingUserCredits',
            group: 'Faturamento',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'userId',
                            description: '<p>Id do usuário.</p>',
                        },
                    ],
                },
            },
            description:
                '<p>O parâmetro userid deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br> <b>EX:  /api/billing/user-credits/&lt;USER_ID&gt;</b></p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": "694.30"\n}',
                        type: 'json',
                    },
                    {
                        title: 'Error-Response:',
                        content:
                            'HTTP/1.1 200 ok\n{\n  "InternalServerError": "Ops... Algo deu errado! Perdoe-nos pelo inconveniênte. Estamos analisando o problema que causou intermitência nessa requisição, aguarde...",\n  "code": 500\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/billing/apidoc_userCredits.js',
            groupTitle: 'Faturamento',
        },
        {
            type: 'get',
            url: '/api/billing/:billing_id',
            title: 'Buscar Dados da Faturamento',
            version: '0.2.0',
            name: 'GetBillingById',
            group: 'Faturamento',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'billing_id',
                            description: '<p>Id do faturamento.</p>',
                        },
                    ],
                },
            },
            description:
                '<p>O parâmetro deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br> <b>EX:  /api/billing/&lt;BILLING_ID&gt;</b> <br> <br></p> <p>O nó INVOICE, será populado apenas para clientes PÓS PAGO, o mesmo trará informações a respeito da fatura aberta corrente, e das demais faturas fechadas para este mesmo cliente.</p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": {\n    "user": "XXXXXXXeXXXXXXXXXXXXe",\n    "billingType": 2,\n    "invoices": [\n      {\n        "_id": "XXXXX2XXXXXXXXXXX",\n        "insertDate": "2018-02-10T19:05:51.246Z",\n        "invoice": {\n          "_id": "XXXXX2XXXXXXXXXXX",\n          "__v": 3,\n          "paymenteDate": null,\n          "value": 3.9000000000000004,\n          "status": "Expirada",\n          "consumptionStatementLote": [\n            "XXXXXXXXXXXXXXXXXXXXXX",\n            "XXXXXXXXXXXXXXXXXXXXXX",\n            "XXXXXXXXXXXXXXXXXXXXXX"\n          ],\n          "billing": "XXXXXXXXXXXXXXXXXXXXXX",\n          "expirationDate": "2018-02-28T00:00:00.000Z",\n          "initialDate": "2018-02-01T00:00:00.000Z",\n          "createAt": "2018-02-10T19:05:51.243Z"\n        }\n      },\n      {\n        "_id": "XXXXXXXXXXXXXXXXXXXXXXX",\n        "insertDate": "2018-04-09T05:53:52.680Z",\n        "invoice": {\n          "_id": "XXXXXXXXXXXXXXXXXXXXXX",\n          "__v": 1,\n          "paymenteDate": null,\n          "value": 1.3,\n          "status": "Aberta",\n          "consumptionStatementLote": [\n            "XXXXXXXXXXXXXXXXXXXXXX"\n          ],\n          "billing": "XXXXXXXXXXXXXXXXXXXXXX",\n          "expirationDate": "2018-04-30T03:00:00.000Z",\n          "initialDate": "2018-04-01T03:00:00.000Z",\n          "createAt": "2018-04-09T05:53:52.525Z"\n        }\n      }\n    ],\n    "accountFunds": 59.80,\n    "packages": [],\n    "price_table": "XXXXXXXXXXXXXXXXXXXXXX"\n  }\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/billing/apidoc_getBilling.js',
            groupTitle: 'Faturamento',
        },
        {
            type: 'get',
            url: '/api/log/:logid',
            title: 'Busca Log por ID',
            version: '0.2.0',
            name: 'Log',
            group: 'Log',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'logId',
                            description: '<p>Id do LogId.</p>',
                        },
                    ],
                },
            },
            description:
                '<p>O parâmetro LOG_ID deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br> <b>EX:  /api/log/&lt;LOG_ID&gt;</b> <br> Essa requisição deverá ser feita, nos casos em que o usuário solicitar ver o erro pelo qual sua consulta veicular não foi executada com sucesso. <br> Para toda consulta realizada na API, o sistema gera um log, o qual carrega as informações pertinentes ao status dessa consulta, também guarda uma mensagem de erro, caso a consulta tenha falhado.</p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n  {\n    "status": {\n      "cod": 200,\n      "msg": "ok"\n    },\n      "body": {\n      "_id": "XXXXXXXXXXXXXXXXXXXXXXX1",\n      "error": "Créditos insuficiente",\n      "status": false,\n      "query": "XXXXXXXXXXXXXXXXXXXXXXX0",\n      "user": "xxxxxxxxxxxxxxxxxxxxxxx5",\n      "createAt": "2018-03-08T22:06:18.878Z"\n    }\n  }',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/log/apidoc_getQueryLogByLogId.js',
            groupTitle: 'Log',
        },
        {
            type: 'get',
            url: '/api/log/query/:queryid',
            title: 'Busca Log por ID de Consulta',
            version: '0.2.0',
            name: 'LogQuery',
            group: 'Log',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'queryId',
                            description: '<p>Id da consulta.</p>',
                        },
                    ],
                },
            },
            description:
                '<p>O parâmetro queryid deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br> <b>EX:  /api/log/query/&lt;QUERY_ID&gt;</b> <br> Essa requisição deverá ser feita, nos casos em que o usuário solicitar ver o erro pelo qual sua consulta veicular não foi executada com sucesso. <br> Para toda consulta realizada na API, o sistema gera um log, o qual carrega as informações pertinentes ao status dessa consulta, também guarda uma mensagem de erro, caso a consulta tenha falhado.</p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": {\n    "_id": "XXXXXXXXxxxxxxxxxxxx8",\n    "__v": 0,\n    "code": 0,\n    "error": null,\n    "status": true,\n    "query": "XXXXXXXXxxxxxxxxxxxx7",\n    "user": "xxxxxxxxxxxxxxxxxxxxx94",\n    "createAt": "2018-08-01T13:52:02.346Z"\n  }\n}',
                        type: 'json',
                    },
                ],
            },
            error: {
                examples: [
                    {
                        title: 'Error-Response:',
                        content:
                            ' HTTP/1.1 410 Bad Request\n{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": {\n    "_id": "XXXXXXXX20c851c36",\n    "__v": 0,\n    "code": 998,\n    "error": "Código de consulta inválido. Não foi possível recuperar o objeto de consulta para o código informado.",\n    "status": false,\n    "query": "XXXXXXXX20c851c35",\n    "user": "XXXXXXXX98202b86b0427",\n    "createAt": "2018-08-03T16:50:42.607Z"\n  }\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/log/apidoc_getQueryLogByQuery.js',
            groupTitle: 'Log',
        },
        {
            type: 'get',
            url: '/api/log/user/:userid',
            title: 'Busca Log por ID de Usuário',
            version: '0.2.0',
            name: 'LogUser',
            group: 'Log',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'userId',
                            description: '<p>Id do usuário.</p>',
                        },
                    ],
                },
            },
            description:
                '<p>O parâmetro userid deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br> <b>EX:  /api/log/user/&lt;USER_ID&gt;</b> <br> Essa requisição deverá ser feita, nos casos em que o usuário solicitar ver o erro pelo qual sua consulta veicular não foi executada com sucesso. <br> Para toda consulta realizada na API, o sistema gera um log, o qual carrega as informações pertinentes ao status dessa consulta, também guarda uma mensagem de erro, caso a consulta tenha falhado.</p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": [\n    {\n      "_id": "XXXXXXXe2b5cd12320c851c36",\n      "__v": 0,\n      "code": 998,\n      "error": "Código de consulta inválido. Não foi possível recuperar o objeto de consulta para o código informado.",\n      "status": false,\n      "query": "XXXXXXXe2b5cd12320c851c35",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-08-03T16:50:42.607Z"\n    },\n    {\n      "_id": "XXXXXXXc7b5cd12320c851c34",\n      "__v": 0,\n      "code": 998,\n      "error": "Código de consulta inválido. Não foi possível recuperar o objeto de consulta para o código informado.",\n      "status": false,\n      "query": "XXXXXXXc7b5cd12320c851c33",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-08-03T16:50:15.916Z"\n    },\n    {\n      "_id": "XXXXXXXc4b5cd12320c851c32",\n      "__v": 0,\n      "code": 998,\n      "error": "Código de consulta inválido. Não foi possível recuperar o objeto de consulta para o código informado.",\n      "status": false,\n      "query": "XXXXXXXc4b5cd12320c851c31",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-08-03T16:50:12.964Z"\n    },\n    {\n      "_id": "XXXXXXXbbb5cd12320c851c30",\n      "__v": 0,\n      "code": 998,\n      "error": "Código de consulta inválido. Não foi possível recuperar o objeto de consulta para o código informado.",\n      "status": false,\n      "query": "XXXXXXXbbb5cd12320c851c2f",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-08-03T16:50:03.837Z"\n    },\n    {\n      "_id": "XXXXXXXa02227f86c5e9f4e6b",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXXXXXXa02227f86c5e9f4e6a",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-07-27T20:20:48.384Z"\n    },\n    {\n      "_id": "XXXXXXX588b8f5f6bedaf31d9",\n      "__v": 0,\n      "code": 204,\n      "error": null,\n      "status": true,\n      "query": "XXXXXXX588b8f5f6bedaf31d8",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-07-27T20:19:36.722Z"\n    },\n    {\n      "_id": "XXXXXXXXXXXXXXXXXXXX6",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXXXXXXXXXXXXXXXXXXX5",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-07-27T15:45:33.208Z"\n    },\n    {\n      "_id": "XXXXXXXXXXXXXX8",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXXXXXXXXXXXXX7",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-07-25T21:58:56.556Z"\n    },\n    {\n      "_id": "XXX0daXXXXXXXXXXXX95dd",\n      "__v": 0,\n      "code": 0,\n      "error": "Consulta momentaneamente indisponível, nossa área técnica já está atuando para resolução do problema. Realize novamente a pesquisa dentro de alguns minutos, caso precise entre em contato conosco via chat-online.",\n      "status": false,\n      "query": "XXX0da1b3XXXXXXXXXXXXXb095dc",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-07-19T18:36:11.803Z"\n    },\n    {\n      "_id": "XXX0afe4980XXXXXXXXXXXXXXXXXbf",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXX0afe4980a3XXXXXXXXXXXXXbe",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-07-19T15:36:04.806Z"\n    },\n    {\n      "_id": "XXX0a36c27441XXXXXXXXXXXXX5517",\n      "__v": 0,\n      "code": 204,\n      "error": null,\n      "status": true,\n      "query": "XXX0a36b27441XXXXXXXXXXX516",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-07-19T14:42:52.008Z"\n    },\n    {\n      "_id": "XXX087XXXXXXXXXXXXXX5e",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXX087XXXXXXXXXXXXXX5d",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-07-19T12:43:06.880Z"\n    },\n    {\n      "_id": "XXX086998b4XXXXXXXXXXXXXa4b",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXX08699XXXXXXXXXXX4a",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-07-19T12:39:53.883Z"\n    },\n    {\n      "_id": "XXXXbXXXXXXXXXXXb",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXXXbXXXXXXXXXXXa",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-07-05T21:20:18.615Z"\n    },\n    {\n      "_id": "XXXX881ab634749059d98f9",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXXX881ab634749059d98f8",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-07-05T21:07:13.464Z"\n    },\n    {\n      "_id": "XXXXXXXXXXXX1",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXXXXXXXXXXX0",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-06-21T23:16:59.934Z"\n    },\n    {\n      "_id": "XXXXXXXXXXXXc",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXXXXXXXXXXXb",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-05-17T16:46:58.718Z"\n    },\n    {\n      "_id": "XXXXXXXXXXXXc",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXXXXXXXXXXXb",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-05-15T20:29:44.173Z"\n    },\n    {\n      "_id": "XXXXXXXXXXXXa",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXXXXXXXXXXX9",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-05-15T18:26:33.081Z"\n    },\n    {\n      "_id": "XXXXXXXXXXXX7",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXXXXXXXXXXX6",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-05-15T17:27:26.356Z"\n    },\n    {\n      "_id": "XXXXXXXXXXXX5",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXXXXXXXXXXX4",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-05-15T17:23:41.605Z"\n    },\n    {\n      "_id": "XXXXXXXXXXXX8",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXXXXXXXXXXX7",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-05-15T17:22:52.439Z"\n    },\n    {\n      "_id": "XXXXXXXXXXXX8",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXXXXXXXXXXX7",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-05-15T11:29:54.348Z"\n    },\n    {\n      "_id": "XXXXXXXXXXXX7",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXXXXXXXXXXX6",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-05-13T13:37:28.258Z"\n    },\n    {\n      "_id": "XXXXXXXXXXXX6",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXXXXXXXXXXX5",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-05-09T02:57:21.630Z"\n    },\n    {\n      "_id": "XXXXXXXXXXXXXXXX3",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXXXXXXXXXXXXXXX2",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-05-09T02:54:24.530Z"\n    },\n    {\n      "_id": "XXXXXXXXXXXXXXXX2",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXXXXXXXXXXXXXXX1",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-05-03T15:09:32.425Z"\n    },\n    {\n      "_id": "XXXXXXXXXXXXXXXX4",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXXXXXXXXXXXXXXX3",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-04-30T19:48:16.585Z"\n    },\n    {\n      "_id": "XXXXXXXXXXXXXXXXf",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXXXXXXXXXXXXXXXe",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-04-30T15:37:55.897Z"\n    },\n    {\n      "_id": "XXXXXXXXXXXXXXXX5",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXXXXXXXXXXXXXXX4",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-04-30T13:54:10.734Z"\n    },\n    {\n      "_id": "XXXXXXXXXXXXXXXX2",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXXXXXXXXXXXXXXX1",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-04-30T13:53:19.270Z"\n    },\n    {\n      "_id": "XXXXXXXXXXXXXXXXd",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXXXXXXXXXXXXXXXc",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-04-30T13:50:51.184Z"\n    },\n    {\n      "_id": "XXXXXXXXXXXXXXXXc",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": false,\n      "query": "XXXXXXXXXXXXXXXXb",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-04-25T21:04:53.335Z"\n    },\n    {\n      "_id": "XXXXXXXXXXXXXXXX4",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": false,\n      "query": "XXXXXXXXXXXXXXXX3",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-04-25T20:16:49.631Z"\n    },\n    {\n      "_id": "XXXXXXXXXXXXXXXXc",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXXXXXXXXXXXXXXXb",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-04-24T17:08:04.586Z"\n    },\n    {\n      "_id": "XXXXXXXXXXXXXXXX3",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXXXXXXXXXXXXXXX2",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-03-27T19:39:31.592Z"\n    },\n    {\n      "_id": "XXXXXXXXXXXXXXXXc",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXXXXXXXXXXXXXXXb",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-03-26T13:56:29.110Z"\n    },\n    {\n      "_id": "XXXXXXXXXXXXXXXXXX9",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXXXXXXXXXXXXXXXXX8",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-03-26T13:45:28.663Z"\n    },\n    {\n      "_id": "XXXXXXXXXXXXXXXXXXe",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXXXXXXXXXXXXXXXXXd",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-03-26T13:38:30.450Z"\n    },\n    {\n      "_id": "XXXb8f13a67e2cf18777d62ca",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXXb8f13a67e2cf18777d62c9",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-03-26T13:10:18.712Z"\n    },\n    {\n      "_id": "XXXb3dd66a1b7d7189aeca2fc",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXXb3dd66a1b7d7189aeca2fb",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-03-22T16:44:22.600Z"\n    },\n    {\n      "_id": "XXXb3d7de67e2cf18777d62c8",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXXb3d7de67e2cf18777d62c7",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-03-22T16:20:46.440Z"\n    },\n    {\n      "_id": "XXXXXXXXXXXXXXXXXXd",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXXXXXXXXXXXXXXXXXc",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-03-21T16:34:42.739Z"\n    },\n    {\n      "_id": "XXXXXXXXXXXXXXXXXXc",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXXXXXXXXXXXXXXXXXb",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-02-23T14:34:47.451Z"\n    },\n    {\n      "_id": "XXXXXXXXXXXXXXXXXX5",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXXXXXXXXXXXXXXXXX4",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-02-17T13:06:13.054Z"\n    },\n    {\n      "_id": "XXXXXdc5f97bbf1300bba363",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXXXXdc5f97bbf1300bba362",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-02-15T17:05:09.733Z"\n    },\n    {\n      "_id": "XXXXXd79f4a9c769301dd580",\n      "__v": 0,\n      "code": 0,\n      "error": "Cannot read property \'rawData\' of undefined",\n      "status": false,\n      "query": "XXXXXd79f4a9c769301dd57f",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-02-15T17:03:53.640Z"\n    },\n    {\n      "_id": "XXXXXd12172fa88bdc7df384",\n      "__v": 0,\n      "code": 0,\n      "error": "Cannot read property \'rawData\' of undefined",\n      "status": false,\n      "query": "XXXXXd12172fa88bdc7df383",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-02-15T17:02:10.782Z"\n    },\n    {\n      "_id": "XXXXXceff500b483441a46d8",\n      "__v": 0,\n      "code": 0,\n      "error": "Cannot read property \'rawData\' of undefined",\n      "status": false,\n      "query": "XXXXXceff500b483441a46d7",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-02-15T17:01:35.920Z"\n    },\n    {\n      "_id": "XXXXXa735bf5c0d2f0a49995",\n      "__v": 0,\n      "code": 0,\n      "error": "Cannot read property \'rawData\' of undefined",\n      "status": false,\n      "query": "XXXXXa725bf5c0d2f0a49994",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-02-15T16:50:59.080Z"\n    },\n    {\n      "_id": "XXXXX5cb6XXXXXXXXXXXXXXXX85",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXXXX5cb6XXXXXXXXXXXXXXXX84",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-02-15T16:31:07.913Z"\n    },\n    {\n      "_id": "XXXXXXXX76XXXXXXXXXXXXXXXX80",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXXXXXXX76XXXXXXXXXXXXXXXX7f",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-02-15T16:30:31.598Z"\n    },\n    {\n      "_id": "XXX75bbdXXXXXXXXXXXXXXX3",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXX75bbdXXXXXXXXXXXXXXX2",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-02-03T13:40:32.688Z"\n    },\n    {\n      "_id": "XXXXXX03cdc0XXXXXXXXXXXXXXXe3",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXXXXX03cdc0XXXXXXXXXXXXXXXe2",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-01-13T13:04:13.465Z"\n    },\n    {\n      "_id": "XXX564e58fcXXXXXXXXXXXXXXXa9f",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXX564e58fcXXXXXXXXXXXXXXXa9e",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-01-10T17:33:12.040Z"\n    },\n    {\n      "_id": "XXX563ff8fcXXXXXXXXXXXXXXXa9d",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXX563ff8fcXXXXXXXXXXXXXXXa9c",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-01-10T16:31:52.365Z"\n    },\n    {\n      "_id": "XXX54b200c1XXXXXXXXXXXXXXXab4",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXX54b200c1XXXXXXXXXXXXXXXab3",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-01-09T12:13:52.114Z"\n    },\n    {\n      "_id": "XXX54b1cf6XXXXXXXXXXXXXXX748ac13",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXX54b1cf6XXXXXXXXXXXXXXX748ac12",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-01-09T12:13:03.465Z"\n    },\n    {\n      "_id": "XXX54aff5XXXXXXXX1113188",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXX54aff5XXXXXXXX1113187",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-01-09T12:05:09.659Z"\n    },\n    {\n      "_id": "XXX54afd40XXXXXXXX62f6",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXX54afd40XXXXXXXX62f5",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-01-09T12:04:36.359Z"\n    },\n    {\n      "_id": "XXX54ac7a0XXXXXXXX62f4",\n      "__v": 0,\n      "code": 0,\n      "error": null,\n      "status": true,\n      "query": "XXX54ac7a0XXXXXXXX62f3",\n      "user": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n      "createAt": "2018-01-09T11:50:18.349Z"\n    }\n  ]\n}',
                        type: 'json',
                    },
                ],
            },
            error: {
                examples: [
                    {
                        title: 'Error-Response:',
                        content:
                            ' HTTP/1.1 410 Bad Request\n{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": {\n    "_id": "XXXXXXXX20c851c36",\n    "__v": 0,\n    "code": 998,\n    "error": "Código de consulta inválido. Não foi possível recuperar o objeto de consulta para o código informado.",\n    "status": false,\n    "query": "XXXXXXXX20c851c35",\n    "user": "XXXXXXXX98202b86b0427",\n    "createAt": "2018-08-03T16:50:42.607Z"\n  }\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/log/apidoc_getQueryLogByUserId.js',
            groupTitle: 'Log',
        },
        {
            type: 'post',
            url: '/api/collback/payment',
            title: 'Notificação de pagamento',
            version: '0.2.0',
            name: 'PaymantNotification',
            group: 'Notification',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'code',
                            description:
                                '<p>Código do cupom</p> <p><br> <b>EX:  /api/voucher/applay </b></p>',
                        },
                    ],
                },
                examples: [
                    {
                        title: 'Request-Example:',
                        content: '{\n  "token":"00000000"\n}',
                        type: 'json',
                    },
                ],
            },
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n    "status": {\n        "cod": 200,\n        "msg": "ok"\n    },\n    "body": "ok"\n}',
                        type: 'json',
                    },
                ],
            },
            error: {
                examples: [
                    {
                        title: 'Error-Response:',
                        content:
                            'HTTP/1.1 405 Invalid Parameters\n{\n    "status": null,\n    "body": {\n        "data": null,\n        "status": 405\n    }\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/notification/apidoc_payments.js',
            groupTitle: 'Notification',
        },
        {
            type: 'get',
            url: '/api/package/:packageid',
            title: 'Buscar Pacote por ID',
            version: '0.2.0',
            name: 'GetById',
            group: 'Pacotes',
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'packageid',
                            description: '<p>ID do pacote.</p>',
                        },
                    ],
                },
            },
            description:
                '<p>O parâmetro PACKAGE_ID deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br> <b>EX: /api/package/&lt;PACKAGE_ID&gt;</b></p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": {\n    "_id": "5XXXXXXXXXXXXXXXXXXa3",\n    "name": "Pacote 150",\n    "__v": 0,\n    "discountPercent": 15,\n    "attributedValue": 172.5,\n    "purchasePrice": 150,\n    "createAt": "2018-03-30T22:42:32.369Z",\n    "status": true\n  }\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/packages/apidoc_getById.js',
            groupTitle: 'Pacotes',
        },
        {
            type: 'post',
            url: '/api/package/',
            title: 'Criar Novo Pacote',
            version: '0.2.0',
            name: 'GetNewPackage',
            group: 'Pacotes',
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'purchasePrice',
                            description: '<p>Preço de compra.</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'attributedValue',
                            description: '<p>Valor atribuido.</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'name',
                            description: '<p>Nome do pacote.</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'discountPercent',
                            description: '<p>Desconto do pacote.</p>',
                        },
                    ],
                },
                examples: [
                    {
                        title: 'Request-Example:',
                        content:
                            '{\n  "purchasePrice" : 1001,\n   "attributedValue" : 1150,\n   "name" : "Pacote 1000",\n   "discountPercent" : 15\n}',
                        type: 'json',
                    },
                ],
            },
            description:
                '<p>O parâmetro name deve ser único. <br> <b>EX:  /auth/user/context/&lt;USER_ID&gt;</b></p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": {\n    "__v": 0,\n    "name": "Pacote 1001",\n    "_id": "XXXXXXXXXXXXXXXXXXX2e97",\n    "discountPercent": 15,\n    "attributedValue": 1150,\n    "purchasePrice": 100,\n    "createAt": "2018-08-06T17:07:16.431Z",\n    "status": true\n  }\n}',
                        type: 'json',
                    },
                    {
                        title: 'Error-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": "E11000 duplicate key error collection: olhonocarroApiDb.mpackages index: name_1 dup key: { : \\"Pacote 1000\\" }"\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/packages/apidoc_newPackage.js',
            groupTitle: 'Pacotes',
        },
        {
            type: 'get',
            url: '/api/package/all',
            title: 'Buscar Todos os Pacotes',
            version: '0.2.0',
            name: 'GetPackages',
            group: 'Pacotes',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": [\n    {\n      "_id": "XXXXXXXXXXXXXXXba3",\n      "name": "Pacote 150",\n      "__v": 0,\n      "discountPercent": 15,\n      "attributedValue": 172.5,\n      "purchasePrice": 150,\n      "createAt": "2018-03-30T22:42:32.369Z",\n      "status": true\n    },\n    {\n      "_id": "XXXXXXXXXXXXXXXXX4",\n      "name": "Pacote 300",\n      "__v": 0,\n      "discountPercent": 15,\n      "attributedValue": 345,\n      "purchasePrice": 300,\n      "createAt": "2018-03-30T22:43:26.992Z",\n      "status": true\n    },\n    {\n      "_id": "XXXXXXXXXXXXXXXXXXX5",\n      "name": "Pacote 500",\n      "__v": 0,\n      "discountPercent": 15,\n      "attributedValue": 575,\n      "purchasePrice": 500,\n      "createAt": "2018-03-30T22:43:48.723Z",\n      "status": true\n    },\n    {\n      "_id": "XXXXXXXXXXXXXXXXXXXX6",\n      "name": "Pacote 1000",\n      "__v": 0,\n      "discountPercent": 15,\n      "attributedValue": 1150,\n      "purchasePrice": 1000,\n      "createAt": "2018-03-30T22:44:03.583Z",\n      "status": true\n    }\n  ]\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/packages/apidoc_getAll.js',
            groupTitle: 'Pacotes',
        },
        {
            type: 'post',
            url: '/api/purchase/:userid',
            title: 'Executar Ordem de Pagamento',
            version: '0.2.0',
            name: 'ExecutePayment',
            group: 'Pagamento',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'userid',
                            description: '<p>ID do usuário.</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'products',
                            description: '<p>Lista de produtos.</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'products.packages',
                            description: '<p>Pacotes a serem comprados.</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'products.packages.id',
                            description: '<p>ID do pacote.</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'products.packages.amount',
                            description: '<p>Quantidade por pacote.</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'products.packages.coupon',
                            description:
                                '<p>ID do cupom de desconto caso seja um cupom válido para a consulta referida.</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'products.queries',
                            description: '<p>Consultas a serem compradas.</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'products.queries.code',
                            description: '<p>Código da consulta.</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'products.queries.amount',
                            description: '<p>Quantidade por consulta.</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'products.queries.coupon',
                            description:
                                '<p>ID do cupom de desconto caso seja um cupom válido para a consulta referida.</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'installments',
                            description:
                                '<p>(Somente para pagamentos no cartão de crédito =&gt;  Número de vezes que será parcelado. Obs: MAX 12 x).</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'type',
                            description:
                                '<p>Tipo de pagamento (&quot;banking_billet&quot; ou &quot;credit_card&quot;).</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'paymentToken',
                            description:
                                '<p>(Somente para pagamentos no cartão de crédito =&gt;  Token que será gerado pelo GerenciaNet para efetuar transação via cartão de crédito. <a href="https://dev.gerencianet.com.br/docs/pagamento-cartao">Clique aqui para ver a implementação</a>).</p>',
                        },
                    ],
                },
                examples: [
                    {
                        title: 'Request-Example:',
                        content:
                            '{\n\t"products" : {\n    \t"packages" : [{\n        \t"id" : "XXXXXXXXXXXXXXXXXXXXXX6",\n          \t"amount" : 1\n        }],\n      \t"queries" : [{\n        \t"code" : 99,\n          \t"amount" : 5,\n            "coupon" : "XXXXXXXXXXXXXXXXXXXXXX1"\n        },\n        {\n        \t"code" : 100,\n          \t"amount" : 8\n        }]\n    },\n  \t"installments" : 1,\n  \t"type" : "banking_billet"\n}',
                        type: 'json',
                    },
                ],
            },
            description:
                "<p>O parâmetro USER_ID deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br> <b>EX: /api/user/&lt;USER_ID&gt;</b> <br> <br> Como percebido, será necessário a incorporação do script para geração do token com base nos dados do cartão.Copio o código necessário:<br> DESENVOLVIMENTO: <br> <textarea rows=\"10\" cols=\"80\" class=\"form-control\"><script type='text/javascript'>var s=document.createElement('script');s.type='text/javascript';var v=parseInt(Math.random()*1000000);s.src='https://sandbox.gerencianet.com.br/v1/cdn/6b98e0eaed7d0046c5d2fb770719ab22/'+v;s.async=false;s.id='6b98e0eaed7d0046c5d2fb770719ab22';if(!document.getElementById('6b98e0eaed7d0046c5d2fb770719ab22')){document.getElementsByTagName('head')[0].appendChild(s);};$gn={validForm:true,processed:false,done:{},ready:function(fn){$gn.done=fn;}};</script></textarea> <br> <br> PRODUÇÃO:<br> <textarea rows=\"10\" cols=\"80\" class=\"form-control\"><script type='text/javascript'>var s=document.createElement('script');s.type='text/javascript';var v=parseInt(Math.random()*1000000);s.src='https://api.gerencianet.com.br/v1/cdn/6b98e0eaed7d0046c5d2fb770719ab22/'+v;s.async=false;s.id='6b98e0eaed7d0046c5d2fb770719ab22';if(!document.getElementById('6b98e0eaed7d0046c5d2fb770719ab22')){document.getElementsByTagName('head')[0].appendChild(s);};$gn={validForm:true,processed:false,done:{},ready:function(fn){$gn.done=fn;}};</script></textarea> <br> <br> <a href=\"https://api.olhonocarro.com.br/test\">Clique aqui para visualizar o exemplo prático</a> <br> <br></p>",
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": {\n    "__v": 0,\n    "billing": "XXXXXXXXXXXXXXXXXXXXXX",\n    "_id": "XXXXXXXXXXXXXXXXXXXXXX",\n    "bankingBillet": {\n      "link": "https://visualizacaosandbox.gerencianet.com.br/emissao/160599_6_MACA8/A4XB-160599-272390-DACA6",\n      "barcode": "00000.00000 00000.000000 00000.000000 0 00000000000000"\n    },\n    "type": "banking_billet",\n    "paid": false,\n    "totalPaid": 0,\n    "totalPrice": 89,\n    "status": "waiting",\n    "chargeId": "397727",\n    "items": [\n    {\n      "_id": "XXXXXXXXXXXXXXXXXXXXXX3",\n      "packageid": null,\n      "amount": 5,\n      "value": 5,\n      "name": "Veiculo Basico"\n    },\n    {\n      "_id": "XXXXXXXXXXXXXXXXXXXXXX2",\n      "packageid": null,\n      "amount": 8,\n      "value": 8,\n      "name": "Veiculo Completo"\n    }\n    ],\n    "createAt": "2018-04-09T04:26:13.084Z"\n  }\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/transactions/apidoc_executePaymentOrder.js',
            groupTitle: 'Pagamento',
        },
        {
            type: 'post',
            url: '/api/purchase/v2/:userid',
            title: 'Executar Ordem de Pagamento V2',
            version: '0.2.0',
            name: 'ExecutePaymentV2',
            group: 'Pagamento',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'userid',
                            description: '<p>ID do usuário.</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'products',
                            description: '<p>Lista de produtos.</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'products.packages',
                            description: '<p>Pacotes a serem comprados.</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'products.packages.id',
                            description: '<p>ID do pacote.</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'products.packages.amount',
                            description: '<p>Quantidade por pacote.</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'products.packages.coupon',
                            description:
                                '<p>ID do cupom de desconto caso seja um cupom válido para a consulta referida.</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'products.queries',
                            description: '<p>Consultas a serem compradas.</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'products.queries.code',
                            description: '<p>Código da consulta.</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'products.queries.amount',
                            description: '<p>Quantidade por consulta.</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'products.queries.coupon',
                            description:
                                '<p>ID do cupom de desconto caso seja um cupom válido para a consulta referida.</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'installments',
                            description:
                                '<p>(Somente para pagamentos no cartão de crédito =&gt;  Número de vezes que será parcelado. Obs: MAX 12 x).</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'type',
                            description:
                                '<p>Tipo de pagamento (&quot;banking_billet&quot; ou &quot;credit_card&quot;).</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'paymentToken',
                            description:
                                '<p>(Somente para pagamentos no cartão de crédito =&gt;  Token que será gerado pelo GerenciaNet para efetuar transação via cartão de crédito. <a href="https://dev.gerencianet.com.br/docs/pagamento-cartao">Clique aqui para ver a implementação</a>).</p>',
                        },
                    ],
                },
                examples: [
                    {
                        title: 'Request-Example:',
                        content:
                            '{\n\t"products" : {\n    \t"packages" : [{\n        \t"id" : "XXXXXXXXXXXXXXXXXXXXXXXXX6",\n          \t"amount" : 1\n        }],\n      \t"queries" : [{\n        \t"code" : 99,\n          \t"amount" : 5,\n            "coupon" : "XXXXXXXXXXXXXXXXXXXXXXXXX1"\n        },\n        {\n        \t"code" : 100,\n          \t"amount" : 8\n        }]\n    },\n  \t"installments" : 1,\n  \t"type" : "banking_billet"\n}',
                        type: 'json',
                    },
                ],
            },
            description:
                '<p>O parâmetro USER_ID deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br> <b>EX: /api/user/&lt;USER_ID&gt;</b> <br> <br> Somente para os pagamentos utilizando o cartão de crédito, se deve utilizar o formato de documentação do iugu.js <a href="https://dev.iugu.com/docs/iugu-js"> que pode ser encontrado aqui</a> <br></p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": {\n    "__v": 0,\n    "billing": "XXXXXXXXXXXXXXXXXXXXXXXXX",\n    "_id": "XXXXXXXXXXXXXXXXXXXXXXXXXb",\n    "type": "banking_billet",\n    "paid": false,\n    "realPrice": 1492.7,\n    "totalPaid": 0,\n    "totalPrice": 1292.7,\n    "status": null,\n    "chargeId": null,\n    "items": [\n      {\n        "_id": "XXXXXXXXXXXXXXXXXXXXXXXXXe",\n        "packageid": "XXXXXXXXXXXXXXXXXXXXXXXXX6",\n        "amount": 1,\n        "value": 800,\n        "name": "Pacote 1000"\n      },\n      {\n        "_id": "XXXXXXXXXXXXXXXXXXXXXXXXXd",\n        "packageid": null,\n        "amount": 5,\n        "value": 29.9,\n        "name": "Veiculo Basico"\n      },\n      {\n        "_id": "XXXXXXXXXXXXXXXXXXXXXXXXXc",\n        "packageid": null,\n        "amount": 8,\n        "value": 42.9,\n        "name": "Veiculo Completo"\n      }\n    ],\n    "createAt": "2018-08-03T17:49:40.251Z"\n  }\n}',
                        type: 'json',
                    },
                    {
                        title: 'Error-Response:',
                        content:
                            ' HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 410,\n    "msg": "bad request"\n  },\n  "body": {\n    "error": "Usuário inválido ou inexistente."\n  }\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/transactions/apidoc_executePaymentOrderV2.js',
            groupTitle: 'Pagamento',
        },
        {
            type: 'get',
            url: '/api/purchase/transactions/:userid?dt=<DATE_REFERENCE>',
            title: 'Buscar Todas as Transações de um Usuario',
            version: '0.2.0',
            name: 'GetPayment',
            group: 'Pagamento',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'userid',
                            description: '<p>ID do usuário.</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'Date',
                            optional: false,
                            field: 'dt',
                            description:
                                '<p>Data de retorno da API para buscar o proximo lote.</p>',
                        },
                    ],
                },
            },
            description:
                '<p>O parâmetro DATE_REFERENCE deve ser passado no formato &quot;Query String&quot; de acordo com a implementação REST. <br> <b>EX:  /api/purchase/transactions/&lt;USER_ID&gt;?dt=&lt;DATE_REFERENCE&gt;</b> <br> <br> Essa requisição trabalha com a busca em lote de registros. Os lotes serão retornados de 25 em 25, sendo indexado pela data de criação do ultimo registro do ultimo lote buscado. Logo, para executar essa operação, passe sempre na primeira requisição o parametro &quot;dt&quot; vazio ou nulo. Caso haja mais de 25 registros, a API retornará o nó &quot;dt&quot; o qual deverá ser passado nas próximas requisições para esse mesmo endpoint.</p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": {\n    "transactions": {\n      "data": [\n        {\n          "_id": "XXXXXXXXXXXXXXXXXXX1",\n          "billing": "5XXXXXXXXXXXXXXXXXXX",\n          "__v": 0,\n          "type": "banking_billet",\n          "paid": false,\n          "totalPaid": 0,\n          "totalPrice": 89,\n          "status": "waiting",\n          "items": [\n            {\n              "_id": "XXXXXXXXXXXXXXXXXXX3",\n              "packageid": null,\n              "amount": 5,\n              "value": 5,\n              "name": "Veiculo Basico"\n            },\n            {\n              "_id": "XXXXXXXXXXXXXXXXXXX2",\n              "packageid": null,\n              "amount": 8,\n              "value": 8,\n              "name": "Veiculo Completo"\n            }\n          ],\n          "createAt": "2018-04-09T04:26:13.084Z"\n        },\n        {\n          "_id": "XXXXXXXXXXXXXXXXXXX1",\n          "billing": "5XXXXXXXXXXXXXXXXXXX",\n          "__v": 0,\n          "type": "credit_card",\n          "paid": true,\n          "totalPaid": 5.5,\n          "totalPrice": 5.5,\n          "status": "paid",\n          "items": [\n            {\n              "_id": "XXXXXXXXXXXXXXXXXXX2",\n              "packageid": null,\n              "amount": 1,\n              "value": 5.5,\n              "name": "Agregados"\n            }\n          ],\n          "createAt": "2018-04-09T02:03:29.296Z"\n        },\n        {\n          "_id": "XXXXXXXXXXXXXXXXXXXd",\n          "billing": "5XXXXXXXXXXXXXXXXXXX",\n          "__v": 0,\n          "type": "credit_card",\n          "paid": true,\n          "totalPaid": 5.5,\n          "totalPrice": 5.5,\n          "status": "paid",\n          "items": [\n            {\n              "_id": "XXXXXXXXXXXXXXXXXXXe",\n              "packageid": null,\n              "amount": 1,\n              "value": 5.5,\n              "name": "Agregados"\n            }\n          ],\n          "createAt": "2018-04-09T01:58:56.740Z"\n        },\n        {\n          "_id": "XXXXXXXXXXXXXXXXXXXd",\n          "billing": "5XXXXXXXXXXXXXXXXXXX",\n          "__v": 0,\n          "type": "credit_card",\n          "paid": false,\n          "totalPaid": 0,\n          "totalPrice": 5.5,\n          "status": "new",\n          "items": [\n            {\n              "_id": "XXXXXXXXXXXXXXXXXXXe",\n              "packageid": null,\n              "amount": 1,\n              "value": 5.5,\n              "name": "Agregados"\n            }\n          ],\n          "createAt": "2018-04-09T01:57:55.509Z"\n        },\n        {\n          "_id": "XXXXXXXXXXXXXXXXXXX3",\n          "billing": "5XXXXXXXXXXXXXXXXXXX",\n          "__v": 0,\n          "type": "credit_card",\n          "paid": false,\n          "totalPaid": 0,\n          "totalPrice": 0.6,\n          "status": null,\n          "items": [\n            {\n              "_id": "XXXXXXXXXXXXXXXXXXX4",\n              "packageid": null,\n              "amount": 1,\n              "value": 0.6,\n              "name": "Renajud"\n            }\n          ],\n          "createAt": "2018-04-09T01:55:15.906Z"\n        }\n      ],\n      "dt": null\n    },\n    "error": null\n  }\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/transactions/apidoc_getPaymentsByUser.js',
            groupTitle: 'Pagamento',
        },
        {
            type: 'post',
            url: '/api/service',
            title: 'Reconsultar Serviço (Quando um serviço falhar na consulta)',
            version: '0.2.0',
            name: 'ExecuteService',
            group: 'Servico',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'queryid',
                            description: '<p>ID da consulta que falhou</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'serviceLog',
                            description:
                                '<p>ID do log de serviço que falhou</p>',
                        },
                    ],
                },
                examples: [
                    {
                        title: 'Request-Example:',
                        content:
                            '{\n   "queryid": "XXXXXXXXXXXXXX",\n     "serviceLog" : "XXXXXXXXXXXXX"\n}',
                        type: 'json',
                    },
                ],
            },
            description:
                '<p>OBSERVAÇÃO: A reconsulta por serviço poderá ser realizada até duas vezes consecutivamente, e caso falhe nas 2 vezes, o usuário terá que aguardar por 1 hora para tentar reconsultar novamente. O JSON de retorno irá depender do serviço que precisa ser reprocessado.</p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": {\n    "headerInfos": {\n      "serviceCode": 5,\n      "supplierCode": 20,\n      "serviceName": "Renajud",\n      "date": "2018-03-14T15:04:09.261Z"\n    },\n    "data": {\n      "__v": 0,\n      "renajud": {\n        "processo": "",\n        "tribunal": "",\n        "restricoes": "",\n        "orgaoJudicial": "",\n        "detalheRenajud": "VEICULO NAO POSSUI RESTRICAO",\n        "nomeProprietario": ""\n      },\n      "numMotor": null,\n      "combustivel": "Álcool / Gasolina",\n      "marcaModelo": "XXXXXXXX",\n      "anoModelo": "2012",\n      "anoFabricacao": "2011",\n      "cidade": "SÃ£o Paulo",\n      "uf": "SP",\n      "renavam": "XXXXX",\n      "placa": "XXXXXXXXX",\n      "chassi": "XXXXXXXXXX"\n    }\n  }\n}',
                        type: 'json',
                    },
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": {\n    "error": "Ops... Você atingiu o limite de solicitações temporariamente... Nosso fornecedor primário esta temporariamente indisponível, volte em alguns instantes"\n  }\n}',
                        type: 'json',
                    },
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": {\n    "error": "Aguarde por mais alguns minutos para reprocessar essa consulta...",\n  }\n}',
                        type: 'json',
                    },
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 410 BAD REQUEST\n{\n  "status": {\n    "cod": 410,\n    "msg": "bad request"\n  },\n  "body": {\n    "error": "Referência de serviço inválida. O serviço pode ter sido processado anteriormente para esta consulta"\n  }\n}',
                        type: 'json',
                    },
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 410 BAD REQUEST\n{\n  "status": {\n    "cod": 410,\n    "msg": "bad request"\n  },\n  "body": {\n    "error": "Ops... Falhou! Desculpe-nos, mas nosso fornecedor primário esta temporariamente indisponível... Retorne em alguns instantes..."\n  }\n}',
                        type: 'json',
                    },
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 404 NOT FOUND\n{\n  "status": {\n    "cod": 404,\n    "msg": "not found"\n  },\n  "body": {\n    "error": "Referência de serviço inválida. O serviço pode ter sido processado anteriormente para esta consulta"\n  }\n}',
                        type: 'json',
                    },
                ],
            },
            error: {
                fields: {
                    'Error 4xx': [
                        {
                            group: 'Error 4xx',
                            optional: false,
                            field: 'ExecuteServiceErrorBad',
                            description:
                                '<p>Referência de serviço inválida</p>',
                        },
                    ],
                },
            },
            filename: 'apidoc/service/apidoc_executeServiceQuery.js',
            groupTitle: 'Servico',
        },
        {
            type: 'get',
            url: '/api/price-table/:pricetableid',
            title: 'Busca Tabela de Preço por ID',
            version: '0.2.0',
            name: 'GetPriceTableById',
            group: 'Tabela_de_Preco',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'priceTableId',
                            description: '<p>Id da tabela de preço.</p>',
                        },
                    ],
                },
            },
            description:
                '<p>O parâmetro p deve ser passado no formato &quot;Query String&quot; de acordo com a implementação REST. <br> <b>EX:  /api/price-table/&lt;PRICE_TABLE_ID&gt;</b></p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n  {\n    "status": {\n      "cod": 200,\n      "msg": "ok"\n    },\n    "body": {\n      "_id": "XXXXXXXXXXXXXXXXXXXXXX0",\n      "__v": 0,\n      "template": [\n        {\n          "_id": "XXXXXXXXXXXXXXXXXXXXXX3",\n          "totalPrice": 1.99,\n          "querycode": 1\n        },\n        {\n          "_id": "XXXXXXXXXXXXXXXXXXXXXX1",\n          "totalPrice": 2.99,\n          "querycode": 8\n        }\n      ],\n      "name": "default",\n      "createAt": "2018-01-31T20:17:46.611Z"\n    }\n  }',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/price_table/apidoc_getTablePriceById.js',
            groupTitle: 'Tabela_de_Preco',
        },
        {
            type: 'get',
            url: '/api/price-table/synthetic/:userid',
            title: 'Busca Tabela de Preço Sintetica por Usuario',
            version: '0.2.0',
            name: 'GetPriceTableSynthetic',
            group: 'Tabela_de_Preco',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'userid',
                            description: '<p>Id do usuário.</p>',
                        },
                    ],
                },
            },
            description:
                '<p>O parâmetro USER_ID deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br> <b>EX:  /api/price-table/synthetic/&lt;USER_ID&gt;</b></p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": [\n    {\n      "query": "Agregados",\n      "price": "999.00",\n      "querycode": 1\n    },\n    {\n      "query": "Historico de KM",\n      "price": "999.00",\n      "querycode": 8\n    },\n    {\n      "query": "Renajud",\n      "price": "999.00",\n      "querycode": 5\n    },\n    {\n      "query": "Consulta Nacional",\n      "price": "999.00",\n      "querycode": 2\n    },\n    {\n      "query": "Restricao Total",\n      "price": "19.90",\n      "querycode": 7\n    },\n    {\n      "query": "Credito Simples",\n      "price": "9.90",\n      "querycode": 6\n    },\n    {\n      "query": "Cadastro Completo",\n      "price": "6.90",\n      "querycode": 4\n    },\n    {\n      "query": "Consulta de CCF",\n      "price": "999.00",\n      "querycode": 9\n    },\n    {\n      "query": "Perda Total",\n      "price": "999.00",\n      "querycode": 10\n    },\n    {\n      "query": "Roubo e Furto",\n      "price": "999.00",\n      "querycode": 11\n    },\n    {\n      "query": "Historico de Proprietarios",\n      "price": "16.90",\n      "querycode": 12\n    },\n    {\n      "query": "Decodificador e Precificador",\n      "price": "999.00",\n      "querycode": 13\n    },\n    {\n      "query": "Recall",\n      "price": "9999.00",\n      "querycode": 14\n    },\n    {\n      "query": "Gravame Simples",\n      "price": "9.90",\n      "querycode": 15\n    },\n    {\n      "query": "Leilao Simples",\n      "price": "999.00",\n      "querycode": 16\n    },\n    {\n      "query": "Debitos e Multas",\n      "price": "16.90",\n      "querycode": 17\n    },\n    {\n      "query": "Dados Cadastrais do Veiculo",\n      "price": "9.90",\n      "querycode": 98\n    },\n    {\n      "query": "Veiculo Completo",\n      "price": "39.90",\n      "querycode": 100\n    },\n    {\n      "query": "Consulta Estadual",\n      "price": "999.00",\n      "querycode": 3\n    },\n    {\n      "query": "Veiculo Basico",\n      "price": "24.90",\n      "querycode": 99\n    }\n  ],\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/price_table/apidoc_getTablePriceSynthetic.js',
            groupTitle: 'Tabela_de_Preco',
        },
        {
            type: 'get',
            url: '/api/billing/user/:userid',
            title: 'Consultar Tabela de Preço por Usuário',
            version: '0.2.0',
            name: 'PriceTableQueryUser',
            group: 'Tabela_de_Preco',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'userId',
                            description: '<p>Id do usuário.</p>',
                        },
                    ],
                },
            },
            description:
                '<p>O parâmetro USER_ID deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br> <b>EX:  /api/billing/user/&lt;USER_ID&gt;</b></p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": {\n    "_id": null,\n    "template": [\n      {\n        "query": "Credito Completo",\n        "price": "19.90",\n        "querycode": 7\n      },\n      {\n        "query": "Credito Simples",\n        "price": "9.90",\n        "querycode": 6\n      },\n      {\n        "query": "Localizacao Completa",\n        "price": "6.90",\n        "querycode": 4\n      },\n      {\n        "query": "Historico de Proprietarios",\n        "price": "16.90",\n        "querycode": 12\n      },\n      {\n        "query": "Gravame Simples",\n        "price": "9.90",\n        "querycode": 15\n      },\n      {\n        "query": "Leilao Simples",\n        "price": "16.90",\n        "querycode": 16\n      },\n      {\n        "query": "Debitos e Multas",\n        "price": "16.90",\n        "querycode": 17\n      },\n      {\n        "query": "Dados Cadastrais do Veiculo",\n        "price": "9.90",\n        "querycode": 98\n      },\n      {\n        "query": "Veiculo Completo",\n        "price": "42.90",\n        "querycode": 100\n      },\n      {\n        "query": "Veiculo Basico",\n        "price": "29.90",\n        "querycode": 99\n      },\n      {\n        "query": "Leilão + Dados do Veículo",\n        "price": "18.90",\n        "querycode": 18\n      },\n      {\n        "query": "Histórico de Proprietários 2",\n        "price": "4.99",\n        "querycode": 22\n      }\n    ],\n    "name": "default",\n    "id": "XXXXXXXXXXXXXXXXXXXf0"\n  }\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/price_table/apidoc_queryUser.js',
            groupTitle: 'Tabela_de_Preco',
        },
        {
            type: 'get',
            url: '/api/term',
            title: 'Buscer Termos',
            version: '0.3.0',
            name: 'Term',
            group: 'Termos',
            description: '<p>Retorna os termos de uso da plataforma.</p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n     "cod": 200,\n     "msg": "ok"\n  },\n  "body": {\n     "_id": "xxxxxxxxxxxxxxxxxxxxxxxxx",\n     "createAt": "2018-08-29T18:40:39.804Z",\n     "body": "<p><strong>CONTRATO DE PRESTAÇÃO DE SERVIÇOS OLHO NO CARRO<\\/strong><\\/p><p>1. <strong>DEFINIÇÕES<\\/strong><\\/p><p>1.1. <strong>SISTEMA OLHO NO CARRO<\\/strong>: Sistema Eletrônico de Consultas, que permite de qualquer localidade do Brasil, ao (a) <strong>CONTRATANTE<\\/strong> efetuar, por meio de Login, Senha, consultas que atendam às suas necessidades.<\\/p><p>1.2. <strong>VERIFICAÇÃO ELETRÔNICA DE CRÉDITO<\\/strong>: É a foram digital do (a) <strong>CONTRATANTE<\\/strong> obter informações de veículos, de crédito e cadastrais de pessoas físicas e/ou jurídicas, para aprovação ou não de negócios;<\\/p><p>1.3. <strong>MEIOS DE ACESSO<\\/strong>: É a forma de acesso ao Sistema de Verificação Eletrônica que o cliente possui para obter informações a respeito de determinado documento, por meio de acesso pela Internet (automação comercial);<\\/p><p>1.4. <strong>MONITORAMENTO ONLINE<\\/strong>: Monitoramento de veículo (s), com periodicidade mensal, trimestral, semestral ou anual;<\\/p><p>1.5. <strong>WEBSERVICE<\\/strong>: Acesso remoto ao ambiente de rede da <strong>CONTRATADA<\\/strong>, mediante Login e Senha;<\\/p><p>1.6. <strong>PRÉ PAGO<\\/strong>: É a modalidade onde o cliente adere aos sistemas de consultas por meio de pagamento prévio, onde o cliente efetua a compra da consulta ou pacote e depois realiza as consultas de acordo com seu saldo de créditos disponíveis;<\\/p><p>1.7. <strong>PÓS PAGO<\\/strong>: É a modalidade onde o cliente adere aos sistemas de consultas, por meio de assinatura mensal, no qual realiza consultas e efetua o pagamento após a utilização destas;<\\/p><p>1.8. <strong>FIDELIDADE<\\/strong>: Consiste na concessão de benefícios, ofertas especiais, agregação de outros produtos e/ou pacotes, mediante o compromisso de permanência mínima de 12 (doze) meses, renovado automaticamente por períodos iguais e sucessivos.<\\/p><p>1.9. <strong>FICHA DE ADESÃO<\\/strong>: É a ficha que deve ser preenchida com os dados do (a) <strong>CONTRATANTE<\\/strong> que desejar aderir ao Sistema Olho no Carro na modalidade de tarifação <strong>PÓS PAGO<\\/strong>. Esta ficha, além de conter os dados cadastrais do (a) <strong>CONTRATANTE<\\/strong>, contém informações comerciais a respeito da modalidade contratual e condição comercial firmada, disponível no site da <strong>CONTRATADA<\\/strong>;<\\/p><p>1.10. <strong>DESCRITIVO DE CONSULTAS ONLINE<\\/strong>: Página na web que descreve as consultas disponíveis ao (a) <strong>CONTRATANTE<\\/strong>, disponibilizado no site da <strong>CONTRATADA<\\/strong> (www.olhonocarro.com.br);<\\/p><p>1.11. <strong>ACEITE ELETRÔNICO<\\/strong>: Confirmação eletrônica de que o <strong>CONTRATANTE<\\/strong> está de acordo com os termos de adesão do contrato;<\\/p><p>1.12. <strong>ENDEREÇO FÍSICO<\\/strong>: Endereço da residência e/ou domicilio do (a) <strong>CONTRATANTE<\\/strong> informado no ato da contratação;<\\/p><p>1.13. <strong>ENDEREÇO ELETRÔNICO<\\/strong>: Endereço de e-mail do (a) <strong>CONTRATANTE <\\/strong>informado no ato da contratação.<\\/p><p>2. <strong>DAS PREMISSAS<\\/strong><\\/p><p>2.1. <strong>CONSIDERANDO<\\/strong> que a<strong> CONTRATADA<\\/strong> é empresa que atua no ramo de consultas veiculares, creditícias e cadastrais com modelo de tarifação <strong>PRÉ PAGO<\\/strong> e <strong>PÓS PAGO<\\/strong>, por meio de inteligência artificial (informática), conforme rol de produtos e serviços disponíveis no site da <strong>CONTRATADA<\\/strong> (www.olhonocarro.com.br);<\\/p><p>2.2. <strong>CONSIDERANDO<\\/strong> que o (a) <strong>CONTRATANTE<\\/strong> deseja acessar os dados disponibilizados pela <strong>CONTRATADA<\\/strong>, para uso exclusivo de seus objetivos sociais, conforme modalidade escolhida conforme item 1.6 e 1.7 deste instrumento;<\\/p><p>2.3. <strong>CONSIDERANDO<\\/strong> o interesse das partes em estabelecer formalmente o <strong>CONTRATO DE PRESTAÇÃO DE SERVIÇOS<\\/strong>, resolvem firmar o presente, que será regido pelas cláusulas e condições que seguem:<\\/p><p>3. <strong>DAS PARTES<\\/strong><\\/p><p>3.1. São partes neste instrumento que se regerá pelas cláusulas e condições que seguem: LIZ SIQUEIRA MOREIRA – ME, inscrita no CNPJ/ME sob nº. 25.400.804/0001-09, com sede na Rua Edison, 1318, conjunto 11, Campo Belo, São Paulo/SP, CEP 04618-035, doravante denominada <strong>CONTRATADA<\\/strong> e a pessoa física ou jurídica identificada na Ficha de Adesão e/ou Aceite Eletrônico, doravante denominado (a) <strong>CONTRATANTE<\\/strong>, designadas conjuntamente como <strong>PARTES<\\/strong>.<\\/p><p>3.1.1. Para todos os efeitos legais, a Ficha de Adesão faz parte integrante deste <strong>CONTRATO<\\/strong>, e no caso de divergência de informações, prevalece o descrito primeiramente na Ficha de Adesão.<\\/p><p>3.1.2. No caso de haver divergência entre as informações prestadas pelo <strong>CONTRATANTE<\\/strong>, na Ficha de Adesão e/ou Aceite Eletrônico, o (a) <strong>CONTRATANTE<\\/strong> deverá informar a <strong>CONTRATADA<\\/strong>, afim de sanar quaisquer divergências porventura existentes.<\\/p><p>3.1.3. Não havendo manifestação expressa do (a) <strong>CONTRATANTE<\\/strong>, prevalecerão as condições comerciais informadas na Ficha de Adesão e tabelas de valores vigentes à época da realização das consultas.<\\/p><p>3.2. Ao aceitar eletronicamente o presente <strong>CONTRATO<\\/strong>, através do clique no botão OK da página de aceite no site da <strong>CONTRATADA<\\/strong>, o (a) <strong>CONTRATANTE<\\/strong> estará automaticamente aderindo e se submetendo integralmente aos termos e condições descritas nas presentes cláusulas deste instrumento.<\\/p><p>4. <strong>DAS DECLARAÇÕES<\\/strong><\\/p><p>4.1. O (A) <strong>CONTRATANTE<\\/strong> declara sob as penas da lei e para todos os fins de direito que:<br/>4.1.1. Possui capacidade jurídica para celebrar este <strong>CONTRATO<\\/strong>, bem como para utilizar os produtos e serviços da <strong>CONTRATADA<\\/strong>;<\\/p><p>4.1.2. Fará bom uso dos serviços, observando as normas, condições de uso, regulamentos, leis e termos aplicáveis, incluindo, mas sem se limitar, aos termos deste <strong>CONTRATO<\\/strong>;<\\/p><p>4.1.3. Que é responsável, civil e criminalmente, pelo (s) login (s) e senha (s) oferecidos pela <strong>CONTRATADA<\\/strong>, bem como:<\\/p><p>4.1.3.1. Nenhuma pessoa sem autorização terá acesso ao (s) seu (s) login (s) e senha (s);<br/>4.1.3.2. Protegerá seu (s) login (s) e senha (s), sendo integralmente responsáveis por sua guarda, divulgação e uso indevido.<\\/p><p>4.1.4. Que todas as informações fornecidas no ato da contratação são verdadeiras, completas e suficientes para sua identificação, bem como são iguais às disponibilizadas à Receita Federal.<\\/p><p>4.1.4.4. Que atualizará seus dados cadastrais, especialmente as mudanças de quadro societário que possam influenciar no cumprimento do presente <strong>CONTRATO<\\/strong>, bem como de seu Endereço Físico e Endereço Eletrônico, sob pena de ser considerada realizada, qualquer notificação, intimação, etc., com base nos dados informados no ato da contratação.<\\/p><p>4.1.5. É financeiramente responsável pela utilização dos produtos e serviços objeto do presente <strong>CONTRATO<\\/strong>.<\\/p><p>4.1.6. Reconhece que o presente <strong>CONTRATO<\\/strong> se formaliza com Aceite Eletrônico no site da <strong>CONTRATADA<\\/strong>, complementando as informações do documento físico.<\\/p><p>4.1.7. Que verificou no momento do aceite da Ficha de Adesão, a veracidade e exatidão das informações contidas no seu cadastro, solicitando a imediata revisão dos dados que não se encontrarem conformes.<\\/p><p>4.1.8. Que leu e está ciente e de pleno acordo com todos os termos e condições deste <strong>CONTRATO<\\/strong> e reconhece que:<\\/p><p>4.1.8.1. Nos termos do presente <strong>CONTRATO<\\/strong>, o uso do sistema presume a aceitação dos presentes termos, formalizando a relação contratual entre as <strong>PARTES<\\/strong>, na forma do artigo 219 do Código Civil;<\\/p><p>4.1.8.2. A utilização por terceiros de seu (s) login (s) e senha (s), sem que tenha solicitado previamente a revogação do (s) mesmo (s), significará uma representação autorizada pelo (a) <strong>CONTRATANTE<\\/strong>.<\\/p><p>5. <strong>DO OBJETO<\\/strong><\\/p><p>5.1. O objeto deste <strong>CONTRATO<\\/strong> é tornar disponível ao (à) <strong>CONTRATANTE<\\/strong>, pessoa física e/ou pessoa jurídica, consultas veiculares, creditícias e cadastrais com modelo de tarifação pré paga e pós paga, por meio de inteligência artificial (informática), conforme disposto no Descritivo de Consultas.<\\/p><p>5.1.1. Nos serviços de monitoramento veicular a <strong>CONTRATADA<\\/strong> informará ao (à) <strong>CONTRATANTE<\\/strong>, através de envio por e-mail, qualquer movimentos para o (s) veiculo (s), desde que informado (s) PLACA, UF, CHASSI, RENAVAM, CPF e etc.<\\/p><p>5.1.2. A <strong>CONTRATADA<\\/strong>, não garante o recebimento do e-mail, por razões técnicas ou falhas de conexão à internet.<\\/p><p>5.2. Por força de contratos de parcerias firmados com terceiros, a <strong>CONTRATADA<\\/strong> detém o direito de uso e distribuição das informações provenientes de bancos de dados de fontes públicas e privadas, não se responsabilizando juridicamente pelo conteúdo das informações prestadas.<\\/p><p>6. <strong>DA ADESÃO<\\/strong><\\/p><p>6.1. A adesão ao presente <strong>CONTRATO<\\/strong> dar-se-á pelo aceite dos termos e condições contratuais realizado eletronicamente, conforme segue:<\\/p><p>6.1.1. Data, horário, login e IP relativo ao aceite eletrônico;<\\/p><p>6.1.2. Indicação do modelo de contrato firmado e o resumo das condições comerciais específicas do (a) <strong>CONTRATANTE<\\/strong>;<\\/p><p>6.1.3. Declaração de responsabilidade pelo uso do login e senha, bem como da atualização de seus dados cadastrais, sempre que houver qualquer mudança, em especial seu Endereço Físico e Endereço Eletrônico.<\\/p><p>6.2. Após o Aceite Eletrônico pelo (a) <strong>CONTRATANTE<\\/strong> e/ou a realização de qualquer consulta através de seu login e senha, o <strong>CONTRATO<\\/strong> será considerado em vigor para todos os fins de direito.<\\/p><p>7. <strong>DO ACESSO AO SISTEMA<\\/strong><\\/p><p>7.1. Cliente <strong>PRÉ PAGO<\\/strong>, para utilização dos serviços, o <strong>CONTRATANTE<\\/strong> utilizará o login e senha cadastrado e escolhido no ato da contratação e compra dos serviços.<\\/p><p>7.2. Cliente <strong>PRÉ PAGO<\\/strong>, para utilização dos serviços, a <strong>CONTRATANTE<\\/strong> cadastrará login e senha de sua preferência em seu primeiro acesso ao sistema, ou, no caso de contratação do modelo <strong>PÓS PAGO<\\/strong>, a <strong>CONTRATADA<\\/strong> fornecerá ao (à) <strong>CONTRATANTE<\\/strong> login e senha para acesso ao sistema, que serão encaminhados para o Endereço Eletrônico informado na Ficha de Adesão ou Aceite Eletrônico podendo a senha ser alterada dentro da área logada do site www.olhonocarro.com.br .<\\/p><p>7.2.1. O processo de cadastramento das senhas é realizado pelos sistemas da <strong>CONTRATADA<\\/strong>, não havendo qualquer possibilidade de conhecimento das referidas senhas pela <strong>CONTRATADA<\\/strong>, seus funcionários e/ou prepostos.<\\/p><p>7.2.2. Com vistas a garantir a necessária segurança na utilização das senhas, a <strong>CONTRATADA<\\/strong> reserva-se ao direito de independente de prévio aviso, suspender e/ou cancelar as senhas do (a) <strong>CONTRATANTE<\\/strong>, caso haja indícios de mau uso das mesmas, devendo para tanto, o (a) <strong>CONTRATANTE<\\/strong>, entrar em contato com o setor de atendimento ao cliente da <strong>CONTRATADA<\\/strong> e solicitar nova senha.<\\/p><p>7.2.3. Em hipótese alguma a suspensão e/ou cancelamento de senhas será considerado como rescisão de <strong>CONTRATO<\\/strong>.<\\/p><p>7.2.4. O <strong>CONTRATANTE<\\/strong> deverá acessar as bases de dados, objeto do presente <strong>CONTRATO<\\/strong>, com recursos próprios.<\\/p><p>7.3. O (A) <strong>CONTRATANTE<\\/strong> deverá comunicar à <strong>CONTRATADA<\\/strong> quaisquer circunstâncias que possam impedir e/ou restringir o uso dos serviços, objeto do presente contrato, sob pena de ser consideradas válidas qualquer consulta e/ou disponibilidades de acesso dos sistemas da <strong>CONTRATADA<\\/strong>, validando sua cobrança.<\\/p><p>7.4. Para o serviço de Monitoramento Online, a <strong>CONTRATANTE<\\/strong> deverá informar à <strong>CONTRATADA<\\/strong>, placa, UF, RENAVAM do veículo para ser monitorado, sendo que o mesmo será submetido ao processamento, na periodicidade escolhida pelo (a) <strong>CONTRATANTE<\\/strong>, no ato da contratação dos serviços.<\\/p><p>7.4.1. Será de exclusiva responsabilidade do (a) <strong>CONTRATANTE<\\/strong> a inclusão e/ou exclusão dos dados do (s) veiculo (s), sendo que a <strong>CONTRATADA<\\/strong> fica desde já autorizada a processar os dados encaminhados do ato da contratação.<\\/p><p>8. <strong>DA MODALIDADE DE SERVIÇO<\\/strong><\\/p><p>8.1. No ato da adesão, o <strong>CONTRATANTE<\\/strong> que optar pela opção <strong>PRÉ PAGO<\\/strong>, poderá optar pela opção de consultas ou pacotes. Para opção de pacotes o cliente poderá realizar o cadastramento para compra automática e mensal dos valores, podendo o mesmo realizar o cancelamento a qualquer momento pelo site da <strong>CONTRATADA<\\/strong>.<\\/p><p>8.2. Como outra opção, no ato da adesão, o <strong>CONTRATANTE<\\/strong> que optar pela modalidade <strong>PÓS PAGO<\\/strong>, poderá escolher pela opção com <strong>FIDELIDADE<\\/strong>, conforme previsto na 1.8.<\\/p><p>8.2.1. Se o <strong>CONTRATANTE<\\/strong> optar por esta modalidade de cláusula acima, que lhe proporcionará a redução dos custos dos serviços, este deverá permanecer pelo prazo constante na cláusula acima e na Ficha de Adesão sob pena de ser aplicada multa, conforme plano previsto na própria Ficha de Adesão.<\\/p><p>9. <strong>DOS PREÇOS<\\/strong><\\/p><p>9.1. Para modalidade <strong>PRÉ PAGO<\\/strong> a (o) <strong>CONTRATANTE<\\/strong> pagará à <strong>CONTRATADA<\\/strong> os valores, conforme tabela vigente disponível no site da <strong>CONTRATADA<\\/strong>.<\\/p><p>9.2. Para a modalidade <strong>PÓS PAGO<\\/strong>, os valores devidos pelo (a) <strong>CONTRATANTE<\\/strong> à <strong>CONTRATADA<\\/strong> variarão conforme Ficha de Adesão, multiplicando-se o número de consultas pelo correspondente ao seu valor, respeitando as condições comerciais de mensalidade, faturamento mínimo ou ainda pacote de consultas constantes na Ficha de Adesão.<\\/p><p>9.2.1. O (A) <strong>CONTRATANTE<\\/strong> deverá controlar por meio dos extratos aos quais tem acesso no site da <strong>CONTRATADA<\\/strong>, o montante do consumo mensal, devendo contestá-los, no caso de incorreção, até o dia 10 (dez) do mês de vencimento, sob pena de serem considerados válidos e devidos os valores descritos no extrato.<\\/p><p>9.3. Para clientes <strong>PRÉ PAGO<\\/strong>, o pagamento dos serviços ocorrerá antes da realização da consulta, e o pagamento poderá ser realizado por boleto ou cartão de crédito diretamente no site da <strong>CONTRATADA<\\/strong>.<\\/p><p>9.4. Para clientes <strong>PÓS PAGO<\\/strong>, o pagamento dos serviços contratados será faturado mensalmente através de cobrança bancária (boleto) ou cartão de crédito, com exceção da taxa de adesão única, que poderá ser cobrada no momento da instalação e treinamento do Sistema Olho no Carro pelo representante comercial credenciado, que emitirá documento fiscal ao (à) <strong>CONTRATANTE<\\/strong>.<\\/p><p>9.4.1. No caso de haver atraso no pagamento do consumo pelo (a) <strong>CONTRATANTE<\\/strong> por prazo superior a 5 (cinco) dias, a <strong>CONTRATADA<\\/strong> poderá a seu exclusivo critério suspender a presente prestação de serviços até a sua integral regularização.<\\/p><p>9.4.2. Não obstante a <strong>CONTRATADA<\\/strong> suspender os serviços objeto do presente <strong>CONTRATO<\\/strong>, poderá ainda informar a inadimplência aos órgãos de proteção ao crédito.<\\/p><p>9.4.3. A não utilização pelo (a) <strong>CONTRATANTE<\\/strong> da franquia de faturamento mínimo constante na sua Ficha de Adesão colocado à sua disposição não gerará nenhum crédito, desconto e/ou direito de transferência para o (s) mês (es) seguinte (s), muito menos o direito de compensação com eventuais utilizações excedentes no (s) mês (es) futuro (s).<\\/p><p>9.5. Para os clientes <strong>PÓS PAGO<\\/strong> a <strong>CONTRATADA<\\/strong> encaminhará ao (à) <strong>CONTRATANTE<\\/strong>, nos Endereços Eletrônicos, os boletos para pagamento do consumo mensal e/ou botão para pagamento via cartão de credito.<\\/p><p>9.5.1. No caso do (a) <strong>CONTRATANTE<\\/strong> não receber o boleto para pagamento em até 5 (cinco) dias antes de seu vencimento, deverá o mesmo informar o ocorrido à <strong>CONTRATADA<\\/strong>, sob pena de sujeitar-se aos efeitos do atraso no pagamento.<\\/p><p>10. <strong>DO REAJUSTE DE PREÇOS<\\/strong><\\/p><p>10.1. Como forma de manter o equilíbrio financeiro-econômico do <strong>CONTRATO<\\/strong>, o valor dos serviços será reajustado da periodicidade mínima admitida de (um) ano, com base na variação positiva do IGPM/FGV ou na falta deste, por outro índice que melhor reflita a perda do poder aquisitivo da moeda nacional ocorrida no período.<\\/p><p>10.2. O valor dos serviços poderá ainda sofrer reajustes, sempre que houver o realinhamento de preço decorrente do contrato de prestação de serviços de informações junto aos provedores e/ou fornecedores, mediante prévia comunicação ao (à) <strong>CONTRATANTE<\\/strong>.<\\/p><p>11.<strong> DO INADIMPLEMENTO<\\/strong><\\/p><p>11.1. Para os clientes <strong>PÓS PAGO<\\/strong> o não pagamento de qualquer valor, total ou parcial, na data de seu respectivo vencimento, o (a) <strong>CONTRATANTE<\\/strong> será considerado inadimplemento, podendo a <strong>CONTRATADA<\\/strong>, após comunicado à <strong>CONTRATANTE<\\/strong>, iniciar o procedimento de cobrança com a inclusão dos dados do (a) <strong>CONTRATANTE<\\/strong>, a qualquer tempo, nos cadastros de inadimplentes da SERASA.<\\/p><p>11.2. O inadimplemento dos clientes <strong>PÓS PAGO<\\/strong> acarreta a imediata interrupção dos serviços, até a efetiva quitação do (s) débito (s) em atraso, acrescido (s) dos encargos legais e contratualmente previstos, ficando à critério da <strong>CONTRATADA<\\/strong> dar por rescindida a relação contratual.<\\/p><p>11.3. O não pagamento dos clientes <strong>PÓS PAGO<\\/strong> de qualquer valor devido na data de seu vencimento, acarretará multa de 2% (dois por cento), correção monetária positiva do IGPM/FGV e juros moratórios de 1% (um por cento) ao mês, até o efetivo pagamento.<\\/p><p>12. <strong>DO PRAZO<\\/strong><\\/p><p>12.1. Para os clientes <strong>PÓS PAGO<\\/strong>, o presente contrato vigorará pelo prazo de 12 meses, a contar da data de sua assinatura e/ou Aceite Eletrônico ou ainda na hipótese de utilização do sistema através de login e senha, com renovação automática após o termino de cada período.<\\/p><p>12.2. Para os clientes <strong>PRÉ PAGO<\\/strong>, o presente contrato vigorará por prazo indeterminado até a utilização dos créditos disponíveis em sua conta.<\\/p><p>12.3. Ainda, sobre os créditos comprados a <strong>CONTRATANTE<\\/strong> terá o período de 6 (seis) meses para utilização dos créditos disponíveis em sua conta, após este período, os créditos poderão ser expirados.<\\/p><p>13. <strong>DAS RESPONSABILIDADES E DAS OBRIGAÇÕES<\\/strong><\\/p><p>13.1. <strong>DO(A) CONTRATANTE:<\\/strong><\\/p><p>13.1.1. O (A) <strong>CONTRATANTE<\\/strong> tem responsabilidade exclusiva pela concessão ou não de crédito e pela realização ou não de quaisquer negócios jurídicos com os seus clientes, assumindo integral responsabilidade por eventuais perdas e danos que qualquer deles e/ou terceiros possam vir a pleitear, quer judicialmente ou extrajudicialmente, isentando desta forma a <strong>CONTRATADA<\\/strong> de qualquer responsabilidade neste sentido.<\\/p><p>13.1.1.1. O (A) <strong>CONTRATANTE<\\/strong> é responsável por cadastrar corretamente o endereço de e-mail e telefone celular nos quais deseja receber as informações.<br/>13.1.1.2. O <strong>CONTRATANTE<\\/strong> deverá ainda viabilizar o recebimento do (s) e-mails.<\\/p><p>13.1.2. O (A) <strong>CONTRATANTE<\\/strong> reconhece que através da assinatura do presente <strong>CONTRATO<\\/strong>, lhe é vedado:<\\/p><p>13.1.2.1. Armazenar as informações colhidas em razão do presente <strong>CONTRATO<\\/strong>;<\\/p><p>13.1.2.2. Vender repassar ou estabelecer convênios de repasse de informações com outras empresas, especialmente aquelas que prestam serviços de informação, de cobrança ou de semelhantes.<\\/p><p>13.1.3. O(A) <strong>CONTRATANTE<\\/strong> reconhece que cumprirá rigorosamente as disposições contidas neste instrumento, sob pena de, na hipótese de qualquer violação, sofrer a suspensão do acesso aos serviços contratados e/ou a rescisão com efeito imediato, sem prejuízo do ressarcimento de eventuais perdas e danos e/ou lucros cessantes, que sua conduta venha a causar à <strong>CONTRATADA<\\/strong> ou a terceiros.<\\/p><p>13.1.4. O (A) <strong>CONTRATANTE<\\/strong> deverá indenizar regressivamente a <strong>CONTRATADA<\\/strong> e/ou terceiros, por perdas e danos diretos, indiretos, incidentais ou consequenciais advindos por qualquer forma de atos ou omissões em violação à Lei ou a obrigações contratuais, no montante da condenação, custas e honorários advocatícios e sucumbenciais, acrescidos de juros de 1% (um por cento) ao mês, correção monetária pelo IGPM/FGV e multa equivalente aos 3 (três) últimos faturamentos, ou equivalente a 3 (três) salários mínimos vigentes, o que for mais, até o efetivo pagamento.<\\/p><p>13.1.5. O (A) <strong>CONTRATANE<\\/strong> compromete-se a manter sigilo sobre todas as informações comerciais ou técnicas, bem como a documentação correlata, de qualquer forma fornecida por uma parte a outra, referente ao cumprimento deste ajuste, inclusive as relativas aos detentores de senhas para consulta, e a não revelar tais informações, sob qualquer pretexto, salvo quando requisitadas pelos órgãos governamentais competentes e pelo Poder Judiciário.<\\/p><p>13.1.6. Informar à <strong>CONTRATADA<\\/strong> qualquer alteração de seus dados cadastrais, incluindo troca de Endereço Físico e Endereço Eletrônico, sob pena de em não o fazendo considerarem-se válidos todos os avisos e notificações enviados para os endereços informados e constantes do presente <strong>CONTRATO<\\/strong>.<\\/p><p>13.2. <strong>DA CONTRATADA:<\\/strong><\\/p><p>13.2.1. Prestar o serviço, objeto do presente <strong>CONTRATO<\\/strong>, zelando pela eficiência e regular funcionamento do serviço;<\\/p><p>13.2.2. Fornecer suporte técnico ao (à) <strong>CONTRATANTE<\\/strong> consistente em informações relativas ao uso dos sistemas;<\\/p><p>13.2.3. O suporte será prestado através do setor de atendimento ao cliente, no horário comercial, através do site www.olhonocarro.com.br<\\/p><p>13.2.4. Informar ao (à) <strong>CONTRATANTE<\\/strong>, com 3 (três) dias de antecedência, sobre as interrupções necessárias para ajustes técnicos ou manutenção que demandem de 6 (seis) horas de duração e que possam causar prejuízo à operacionalidade do acesso aos sistemas, salvo em caso de urgência, caso fortuito ou força maior.<\\/p><p>13.2.5. Manter a “mídia” hospedada acessível durante 99,5% do SLA (acordo de nível de serviço).<\\/p><p>13.2.6. Ressaltada a hipótese de ter laborado com culpa exclusiva, a <strong>CONTRATADA<\\/strong> não assume responsabilidade por perdas e danos que se originem das informações prestadas.<\\/p><p>14. <strong>RESCISÃO CONTRATUAL<\\/strong><\\/p><p>14.1. Para os clientes <strong>PÓS PAGO<\\/strong> a solicitação de rescisão contratual deverá ser feita pelo (a) <strong>CONTRATANTE<\\/strong> mediante aviso por e-mail (contato@olhonocarro.com.br) e após quitação de todos os débitos em aberto, conforme expresso pelo artigo 476 do Código Civil, para ser concluído o pedido de rescisão.<\\/p><p>14.1.1. Para os clientes <strong>PÓS PAGO<\\/strong>, caso ocorra solicitação antecipada de rescisão contratual dos contratos celebrados com prazo de <strong>FIDELIDADE<\\/strong>, implicará na cobrança dos valores restantes para conclusão da <strong>FIDELIDADE<\\/strong>, pactuada entre as partes, conforme disposto na ficha de contratação dos serviços da <strong>CONTRATADA<\\/strong>.<\\/p><p>14.1.2. O <strong>CONTRATO<\\/strong> será rescindido de pleno direito pela <strong>CONTRATADA<\\/strong> nas hipóteses em que o (a) <strong>CONTRATANTE<\\/strong> utilizar indevidamente os serviços, ciente de que as informações são sigilosas e que não poderão ser de qualquer forma armazenadas, divulgadas ou replicadas, e que a impressão, extração de cópia das informações, download, redistribuição, alteração, reformatação, reconfiguração, divulgação pela internet ou quaisquer outros meios de redistribuição da informação, ou ainda, a utilização para constranger ou de qualquer forma coagir a pessoa, objeto da consulta, poderá acarretar sanções civis e criminais.<\\/p><p>14.2. Poderá ainda ser rescindido o presente <strong>CONTRATO<\\/strong>, sem necessidade de qualquer comunicação previa pela <strong>CONTRATADA<\\/strong>, em caso de decretação de falência, liquidação ou dissolução judicial ou extrajudicial, instauração de concurso de credores ou requerimento de recuperação judicial ou extrajudicial, bem como qualquer ato ou fato superveniente que torne impossível a continuidade da prestação dos serviços.<\\/p><p>14.3. No caso de rescisão contratual, a <strong>CONTRATADA<\\/strong> poderá a seu exclusivo critério, efetuar a imediata baixa de todos os registros de negativação efetivados até a data da rescisão, tampouco será interpretado como novação.<\\/p><p>14.4. A tolerância ao descumprimento de qualquer cláusula do presente <strong>CONTRATO<\\/strong> não afetara a interpretação ou definição de suas cláusulas.<\\/p><p>14.5. Quaisquer notificações, intimações ou qualquer outra comunicação entre as <strong>PARTES<\\/strong>, exigidas ou permitidas no presente <strong>CONTRATO<\\/strong>, serão fornecidas mediante entrega pessoal ou correspondência registrada, no endereço da outra parte, estipulado no preambulo do presente <strong>CONTRATO<\\/strong>, sendo autorizado a notificação de solicitação de documentos por Endereço Eletrônico assim definidos:<\\/p><p>14.5.1. Pela <strong>CONTRATADA<\\/strong>: contato@olhonocarro.com.br;<\\/p><p>14.5.2. Pelo (a) <strong>CONTRATANTE<\\/strong>: o e-mail informado na Ficha de Adesão e/ou Aceite Eletrônico.<\\/p><p>14.6. Qualquer mudança no Endereço Físico ou Endereço Eletrônico, telefones ou qualquer outro dado das <strong>PARTES<\\/strong>, deverão ser imediatamente informados a outra PARTE, sob pena de ser considerada entregue a correspondência encaminhada dos endereços definidos no preambulo do presente <strong>CONTRATO<\\/strong>, Ficha de Adesão e/ou Aceite Eletrônico.<\\/p><p>15. <strong>DISPOSIÇÕES GERAIS<\\/strong><\\/p><p>15.1. O (A) <strong>CONTRATANTE<\\/strong> declara que teve acesso, leu e concorda em utilizar os serviços disponibilizados nos termos do presente <strong>CONTRATO<\\/strong> e Descritivo de Consultas.<\\/p><p>15.2. No caso de haver pagamento de qualquer quantia devida por força do presente CONTRATO, diverso do constante no extrato de consumo do (a) <strong>CONTRATANTE<\\/strong> e/ou da cobrança bancária (boleto), a obrigação não será considerada cumprida, ficando a <strong>CONTRATADA<\\/strong> autorizada a incluir os valores não pagos no boleto bancário subsequente.<\\/p><p>15.3. Ocorrendo a rescisão do presente <strong>CONTRATO<\\/strong> por iniciativa do (a) <strong>CONTRATANTE<\\/strong> os dados relativos à consultas e/ou registro de inadimplentes (negativação) serão automaticamente apagados (deletados) de forma definitiva, nos termos da cláusula 14.5.<\\/p><p>15.4. Os contatos e/ou simples comunicações entre as <strong>PARTES<\\/strong>, ora contratantes, se farão por Endereço Eletrônico, exceto a rescisão contratual que obedecerá aos termos da cláusula 14.1, meio esse aceito por âmbar as <strong>PARTES<\\/strong> como hábil para essa finalidade.<\\/p><p>15.5. A <strong>CONTRATADA<\\/strong> não se responsabiliza por problemas técnicos que não deu causa, inclusive, mas não exclusivamente, quedas de energia, paralisação parcial do servidor, vícios, defeitos ou paralisações dos serviços de comunicação telefônica ou de dados a cargo de concessionárias de serviços públicos ou dos provedores de informações cadastrais, bem como em situações de caso fortuito ou força maior, conforme preceitua o artigo 393 do Código Civil Brasileiro.<\\/p><p>15.6. A <strong>CONTRATADA<\\/strong> apenas disponibiliza a plataforma de consulta de dados, não se responsabilizando civil ou criminalmente pelo conteúdo das informações prestas à <strong>CONTRATANTE<\\/strong>, uma vez que estas são extraídas de bancos de dados de terceiros, incluindo fontes públicas e privadas, ou seja, a <strong>CONTRATADA<\\/strong> apenas intermedia a distribuição de tais informações, não sendo responsável pelo conteúdo transmitido e, não será responsabilizada, inclusive, pela finalidade e utilização dos dados acessados pela <strong>CONTRATANTE<\\/strong>, sendo de conhecimento desta última que referidos dados devem ser utilizados em estrito cumprimento de legislação brasileira, atos e tratados internacionais de que o Brasil seja parte.<\\/p><p>15.7. Caso ocorra a necessidade de alguma “negativação” do inadimplente pelo (a) <strong>CONTRATANTE<\\/strong>, em atendimento ao que diz o artigo 43, §2º do Código de Defesa do Consumidor, a <strong>CONTRATADA<\\/strong> notificará o devedor com antecedência no caso de restrições em seu nome.<\\/p><p>15.7.1. O (A) <strong>CONTRATANTE<\\/strong> deverá manter dados cadastrais atualizados do devedor para cumprimento dos termos previstos na cláusula acima, pois é de responsabilidade do (a) <strong>CONTRATANTE<\\/strong> e do inadimplente manter esta atualização, ficando ambos responsáveis civil e criminalmente pelas informações apresentadas.<\\/p><p>15.8. O (A) <strong>CONTRATANTE<\\/strong> deverá manter sob sua guarda e posse os documentos que originaram a negativação, para que seja apresentada imediatamente em juízo ou fora dele, ou mesmo quando solicitado pela <strong>CONTRATADA<\\/strong>, sob pena de rescisão contratual.<\\/p><p>15.9. O (A) <strong>CONTRATANTE<\\/strong> autoriza a <strong>CONTRATADA<\\/strong> a utilizar os dados recebidos em razão desta contratação, como insumo para os seus produtos e serviços os quais poderão ser disponibilizados nas consultas realizadas pelos clientes da <strong>CONTRATADA<\\/strong>.<\\/p><p>15.10. A autorização de que trata esta cláusula persistirá mesmo após o termino da vigência deste <strong>CONTRATO<\\/strong>.<\\/p><p>15.11. <strong>CONTRATANTE<\\/strong> e <strong>CONTRATADA<\\/strong>, declaram sob as penas da lei, que assinam o presente procuradores/representantes legais, devidamente constituídos na forma dos respectivos contratos e estatutos sociais, com poderes para assumir as obrigações ora contratadas.<\\/p><p>15.12. A central de relacionamento da <strong>CONTRATADA<\\/strong> está à disposição do (a) <strong>CONTRATANTE<\\/strong> pelo e-mail (contato@olhonocarro.com.br) ou pelo chat na página da <strong>CONTRATADA<\\/strong>.<\\/p><p>15.13. O presente <strong>CONTRATO <\\/strong>substitui os contratos anteriores e constitui integral acordo entre as <strong>PARTES<\\/strong>.<\\/p><p>15.14. As <strong>PARTES<\\/strong> elegem o foro da Comarca de São Paulo/SP, como competente para dirimir eventuais questões oriundas do presente contrato, com exclusão de qualquer outro.<\\/p>",\n     "version": 1,\n     "status": true,\n     "title": "1º versão do contrato de prestação de serviços",\n     "__v": 0\n  }\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/term/apidoc_term.js',
            groupTitle: 'Termos',
        },
        {
            type: 'post',
            url: '/api/test-drive',
            title: 'Executar Test-Drive',
            version: '0.2.0',
            name: 'TestDriveApi',
            group: 'Test_Drive',
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'key',
                            description:
                                '<p>chave de consulta (placa, chassi, motor ou renavam).</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'email',
                            description:
                                '<p>E-mail do usuário que deseja realziar o test-drive</p>',
                        },
                    ],
                },
                examples: [
                    {
                        title: 'Request-Example:',
                        content:
                            '{\n  "key" : "AAA1234"\n  "email" : "XXXXXXXX@teste.com.br"\n}',
                        type: 'json',
                    },
                ],
            },
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": {\n    "tipoMarcacaoChassi": "NORMAL",\n    "capacidadePassageiro": "5",\n    "categoria": "PARTICULAR",\n    "corVeiculo": "PRETA",\n    "especieVeiculo": "PASSAGEIRO",\n    "tipoVeiculo": "AUTOMOVEL",\n    "potencia": "148",\n    "combustivel": "ALCOOL/GASOLINA",\n    "marcaModelo": "I/FORD/FOCUS TI 2LHCFLEX",\n    "municipio": "SAO PAULO-SP",\n    "anoModelo": "2012",\n    "anoFabricacao": "2011",\n    "placa": "XXX000",\n    "chassi": "XXXXXXXXXXXXXXX99924"\n  }\n}',
                        type: 'json',
                    },
                ],
            },
            error: {
                fields: {
                    'Error 4xx': [
                        {
                            group: 'Error 4xx',
                            optional: false,
                            field: 'TestDriveApiError',
                            description:
                                '<p>Limite atingido para o IP requisitante</p>',
                        },
                    ],
                },
                examples: [
                    {
                        title: 'Error-Response:',
                        content:
                            ' HTTP/1.1 410 Bad Request\n{\n  "status": {\n    "cod": 410,\n    "msg": "bad request"\n  },\n    "body": "Falhou!! Percebemos que esse endereço de IP realizou o número máximo de consultas. Não será possível prosseguir com esta solicitação."\n}',
                        type: 'json',
                    },
                    {
                        title: 'Error-Response:',
                        content:
                            ' HTTP/1.1 410 Bad Request\n{\n  "status": {\n    "cod": 410,\n    "msg": "bad request"\n  },\n  "body": "Ops falhou!! Esse e-mail ja foi utilizado anteriormente!"\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/test_drive/apidoc_validate.js',
            groupTitle: 'Test_Drive',
        },
        {
            type: 'post',
            url: '/api/test-drive/vehicle',
            title: '[TESTE] Executar Test-Drive',
            version: '0.2.0',
            name: 'TestDriveVehicle',
            group: 'Test_Drive',
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'key',
                            description:
                                '<p>chave de consulta (placa, chassi, motor ou renavam).</p>',
                        },
                    ],
                },
                examples: [
                    {
                        title: 'Request-Example:',
                        content:
                            '{\n  "key" : "AAA1234"\n  "email" : "XXXXXXXX@teste.com.br"\n}',
                        type: 'json',
                    },
                ],
            },
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": {\n    "codigoMunicipio": "XX",\n    "restricoes": null,\n    "pbt": null,\n    "cmt": null,\n    "combusivel": null,\n    "capacidadePassageiro": null,\n    "categoria": null,\n    "corVeiculo": "Outros ou Desconhecido",\n    "especieVeiculo": "Desconhecido",\n    "tipoVeiculo": "Nao Identificado",\n    "potencia": "0",\n    "combustivel": "Álcool",\n    "marcaModelo": "FORD/ESCORT 1.8 XR3",\n    "municipio": "CURITIBA",\n    "anoModelo": "0",\n    "anoFabricacao": "1990",\n    "cidade": "JundiaÃ­",\n    "placa": "AAA0001",\n    "chassi": "9XXXXXXXXXXXXXX00"\n  }\n}',
                        type: 'json',
                    },
                ],
            },
            error: {
                fields: {
                    'Error 4xx': [
                        {
                            group: 'Error 4xx',
                            optional: false,
                            field: 'TestDriveApiError',
                            description:
                                '<p>Limite atingido para o IP requisitante</p>',
                        },
                    ],
                },
                examples: [
                    {
                        title: 'Error-Response:',
                        content:
                            ' HTTP/1.1 410 Bad Request\n{\n  "status": {\n    "cod": 410,\n    "msg": "bad request"\n  },\n    "body": "Falhou!! Percebemos que esse endereço de IP realizou o número máximo de consultas. Não será possível prosseguir com esta solicitação."\n}',
                        type: 'json',
                    },
                    {
                        title: 'Error-Response:',
                        content:
                            ' HTTP/1.1 410 Bad Request\n{\n  "status": {\n    "cod": 404,\n    "msg": "not found"\n  },\n  "body": "Veículo não encontrado"\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/test_drive/apidoc_validateVehicle.js',
            groupTitle: 'Test_Drive',
        },
        {
            type: 'post',
            url: '/api/user/new',
            title: 'Criar Novo Usuário',
            version: '0.2.0',
            name: 'CreateUser',
            group: 'Usuario',
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'username',
                            description:
                                '<p>Username único (pode ser utilizado como chave de acesso pelo usuário).</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'email',
                            description:
                                '<p>E-mail de cadastro utilizado pelo usuário (pode ser utilizado como chave de acesso pelo usuário).</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'cpf',
                            description: '<p>CPF do usuário.</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'pass',
                            description: '<p>Senha de cadastro.</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'name',
                            description: '<p>Nome.</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'type',
                            description:
                                '<p>O tipo de usuário (Pré-pago = 1, Pós-pago= 5).</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'company',
                            description: '<p>Somente para clientes PJ</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'company.cnpj',
                            description: '<p>Cnpj da empresa</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'company.socialName',
                            description: '<p>Razão social da empresa</p>',
                        },
                    ],
                },
                examples: [
                    {
                        title: 'Request-Example:',
                        content:
                            '{\n  \t"name" : "Fulano da Silva",\n  \t"cpf" : "11XXXXXX0669",\n  \t"email" : "XXXXXXn@hotmail.com",\n  \t"pass" :  "123456",\n    "type" : 5,\n  \t"company" : {\n        "cnpj" : "1231231231233",\n    \t  "socialName" : "XXXXXXXX LTDA"\n    }\n}',
                        type: 'json',
                    },
                ],
            },
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": {\n    "user": {\n      "__v": 0,\n      "name": "Fulano da Silva",\n      "email": "XXXXXXn@hotmail.com",\n      "_id": "5aba4af0cfe9e0742c8116e5",\n      "company": {\n        "socialName": "XXXXX LTDA",\n        "cnpj": 1231231231233\n      },\n      "generalData": {\n        "birthDate": null,\n        "phoneNumber2": 0,\n        "phoneNumber1": 0,\n        "address": {\n          "number": null,\n          "complement": null,\n          "street": null,\n          "neighborhood": null,\n          "state": null,\n          "city": null,\n          "zipcode": null\n        }\n      },\n      "security": {\n        "blacklist": [],\n        "whitelist": [],\n      },\n      "google": {\n        "email": null,\n        "name": null,\n        "token": null,\n        "id": null\n      },\n      "facebook": {\n        "email": null,\n        "name": null,\n        "token": null,\n        "id": null\n      },\n      "status": true,\n      "createAt": "2018-03-27T13:45:20.333Z",\n      "lastLogin": "2018-03-27T13:45:20.333Z",\n      "type": 5,\n      "billing": null,\n      "cpf": XXXXXXXX0639,\n    },\n    "token": "eyJhbGciOiXXXXXXXXXXVCJ9.eyJzZWNyZXQiOlsiYzE5MGYxMWEzMmRiYzY3ZWVjNDY1YTMyMGQ3ZmUxMWQiXSwiaWF0IjoxNTIyMTU4MzIwLCJleHAiOjE1MjIyNDQ3MjB9.eBk2KLS6KQbrZslg7F-G1I_BXZNJOTuCy3KgeFq2NOo"\n  }\n}',
                        type: 'json',
                    },
                ],
            },
            error: {
                fields: {
                    'Error 4xx': [
                        {
                            group: 'Error 4xx',
                            optional: false,
                            field: 'CreateUserError',
                            description:
                                '<p>Parâmetros de entrada inválidos</p>',
                        },
                    ],
                },
                examples: [
                    {
                        title: 'Error-Response:',
                        content:
                            'HTTP/1.1 410 BAD REQUEST\n{\n  "status": {\n    "cod": 410,\n    "msg": "bad request"\n  },\n  "body": "Já existe uma conta cadastrada o username informado."\n}',
                        type: 'json',
                    },
                    {
                        title: 'Error-Response:',
                        content:
                            'HTTP/1.1 410 BAD REQUEST\n{\n  "status": {\n    "cod": 410,\n    "msg": "bad request"\n  },\n  "body": "Já existe uma conta cadastrada para o CPF informado."\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/user/apidoc_createNewUser.js',
            groupTitle: 'Usuario',
        },
        {
            type: 'get',
            url: '/api/user/:id',
            title: 'Buscar Usuário pelo ID',
            version: '0.2.0',
            name: 'GetUser',
            group: 'Usuario',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'userid',
                            description: '<p>ID do usuário.</p>',
                        },
                    ],
                },
            },
            description:
                '<p>O parâmetro USER_ID deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br> <b>EX: /api/user/&lt;USER_ID&gt;</b></p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": {\n    "_id": "XXXXXXXXXXX",\n    "email": "XXXXXXXXXXX@XXXXXXXXXXX.com.br",\n    "cpf": "XXXXXXXXXXX",\n    "company": null,\n    "generalData": {\n      "address": {\n        "zipcode": null,\n        "city": null,\n        "state": null,\n        "neighborhood": null,\n        "street": null,\n        "complement": null,\n        "number": null\n      },\n      "phoneNumber1": 0,\n      "phoneNumber2": 0,\n      "birthDate": null\n    },\n    "security": {\n      "whitelist": [],\n      "blacklist": [],\n    },\n    "google": {\n      "email": null\n    },\n    "facebook": {\n      "email": null\n    },\n    "status": true,\n    "createAt": "2017-12-22T19:06:11.409Z",\n    "lastLogin": "2018-03-14T18:21:37.761Z",\n    "type": 1\n  }\n}',
                        type: 'json',
                    },
                    {
                        title: 'Error-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "AuthenticationError": "Acesso negado. Você não tem permissão para prosseguir com essa solicitação",\n  "Code": 401\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/user/apidoc_getUserById.js',
            groupTitle: 'Usuario',
        },
        {
            type: 'post',
            url: '/api/user/auth',
            title: 'Autenticar Usuário',
            version: '0.2.0',
            name: 'GetUserAuth',
            group: 'Usuario',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'username',
                            description:
                                '<p>Username único (pode ser utilizado como chave de acesso pelo usuário).</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'pass',
                            description: '<p>Senha de cadastro.</p>',
                        },
                    ],
                },
                examples: [
                    {
                        title: 'Request-Example:',
                        content:
                            '{\n  "email" : "xxxxxxxxxxxxxxxx@teste.com.br"\n  "pass" : "xxxxxxxxxxxxxx"\n}',
                        type: 'json',
                    },
                ],
            },
            description:
                '<p>O parâmetro email deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br> <b>EX: /api/user/add-user-interested/<EMAIL></b></p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": {\n    "token": " XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",\n    "user": {\n      "_id": "5XXXXXXXXXXXXXXXXXX0473",\n      "email": "XXXXXXXXXXXXXXXXXXXXXX@olhonocarro.com.br",\n      "name": "XXXXXXXXXXXXXXXX"\n    }\n  }\n}',
                        type: 'json',
                    },
                    {
                        title: 'Error-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 404,\n    "msg": "not found"\n  },\n  "body": "Usuário não encontrado."\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/user/apidoc_addUserAuth.js',
            groupTitle: 'Usuario',
        },
        {
            type: 'get',
            url: '/api/user/add-user-interested/:email',
            title: 'Usuarios Interessados',
            version: '0.2.0',
            name: 'GetUserInterested',
            group: 'Usuario',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            description:
                '<p>O parâmetro email deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br> <b>EX: /api/user/add-user-interested/<EMAIL></b></p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n {\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": {\n    "status": true,\n    "msg": null\n  }\n}',
                        type: 'json',
                    },
                    {
                        title: 'Error-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 410,\n    "msg": "bad request"\n  },\n  "body": {\n    "status": false,\n    "msg": "Falhou!! 🤨 Percebemos que esse endereço de IP realizou o número máximo de consultas. Não será possível prosseguir com esta solicitação. 🤪"\n  }\n}',
                        type: 'json',
                    },
                ],
            },
            error: {
                fields: {
                    'Error 4xx': [
                        {
                            group: 'Error 4xx',
                            optional: false,
                            field: 'UserInterestedError',
                            description:
                                '<p>Limite atingido para o IP requisitante</p>',
                        },
                    ],
                },
            },
            filename: 'apidoc/user/apidoc_addUserInterested.js',
            groupTitle: 'Usuario',
        },
        {
            type: 'patch',
            url: '/api/user/:userid',
            title: 'Atualizar Dados do Usuário',
            version: '0.2.0',
            name: 'UpadteUser',
            group: 'Usuario',
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'email',
                            description:
                                '<p>E-mail de cadastro utilizado pelo usuário (pode ser utilizado como chave de acesso pelo usuário).</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'cpf',
                            description: '<p>CPF do usuário.</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'pass',
                            description: '<p>Senha de cadastro.</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'name',
                            description: '<p>Nome.</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'type',
                            description:
                                '<p>O tipo de usuário (Pré-pago = 1, Pós-pago= 5).</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'company',
                            description: '<p>Somente para clientes PJ</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'company.cnpj',
                            description: '<p>Cnpj da empresa</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'company.socialName',
                            description: '<p>Razão social da empresa</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'generalData',
                            description: '<p>Dados gerais do usuario</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'generalData.address',
                            description: '<p>Dados de endereço</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'generalData.address.zipcode',
                            description: '<p>CEP</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'generalData.address.city',
                            description: '<p>Cidade</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'generalData.address.state',
                            description: '<p>Estado</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'generalData.address.neighborhood',
                            description: '<p>Bairro</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'generalData.address.street',
                            description: '<p>Rua</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'generalData.address.complement',
                            description: '<p>Complemento</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'generalData.address.number',
                            description: '<p>Número</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'generalData.phoneNumber1',
                            description: '<p>Telefone 1</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'generalData.phoneNumber2',
                            description: '<p>Telefone 2</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'generalData.birthDate',
                            description: '<p>Data de nascimento</p>',
                        },
                    ],
                },
                examples: [
                    {
                        title: 'Request-Example:',
                        content:
                            '{\n  "name" : "Fulano da Silva",\n  "cpf" : "11XXXXXX0669",\n  "email" : "XXXXXXn@hotmail.com",\n  "pass" :  "123456",\n  "type" : 5,\n  "company" : {\n    "cnpj" : "1231231231233",\n    "socialName" : "XXXXXXXX LTDA"\n  },\n  "generalData": {\n    "address": {\n      "zipcode": null,\n      "city": null,\n      "state": null,\n      "neighborhood": null,\n      "street": null,\n      "complement": null,\n      "number": null\n    },\n    "phoneNumber1": 0,\n    "phoneNumber2": 0,\n    "birthDate": null\n  }\n}',
                        type: 'json',
                    },
                ],
            },
            description:
                '<p>O parâmetro USER_ID deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br> <b>EX: /api/user/&lt;USER_ID&gt;</b></p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": {\n    "name": "Diego Moura 2",\n    "email": "desenv@olhonocarro.com.br",\n    "cpf": 12345678900,\n    "generalData": {\n      "address": {\n        "zipcode": null,\n        "city": null,\n        "state": null,\n        "neighborhood": null,\n        "street": null,\n        "complement": null,\n        "number": null\n      },\n      "phoneNumber1": 0,\n      "phoneNumber2": 0,\n      "birthDate": null\n    },\n    "type": 1,\n    "lastLogin": "2018-03-28T03:10:52.896Z",\n    "createAt": "2017-12-22T19:02:21.007Z",\n    "status": true\n  }\n}',
                        type: 'json',
                    },
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": "Já existe uma conta cadastrada com o e-mail informado."\n}',
                        type: 'json',
                    },
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": "Já existe uma conta cadastrada o username informado."\n}',
                        type: 'json',
                    },
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": "Já existe uma conta cadastrada o CPF informado."\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/user/apidoc_UpdateUser.js',
            groupTitle: 'Usuario',
        },
        {
            type: 'get',
            url: '/api/user/is-father/:id',
            title: 'Usuário Pai',
            version: '0.2.0',
            name: 'UserIsFather',
            group: 'Usuario',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            description:
                '<p>O parâmetro &quot;USER_ID&quot; deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br> <b>EX: /api/user/is-father/&lt;USER_ID&gt;</b></p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n   "status": {\n      "cod": 200,\n      "msg": "ok"\n   },\n   "body": 2\n}',
                        type: 'json',
                    },
                    {
                        title: 'Error-Response:',
                        content:
                            'HTTP/1.1 500 OK\n{\n   "InternalServerError": "Ops... Algo deu errado! Perdoe-nos pelo inconveniênte. Estamos analisando o problema que causou intermitência nessa requisição, aguarde...",\n   "code": 500\n}',
                        type: 'json',
                    },
                    {
                        title: 'Error-Response:',
                        content:
                            'HTTP/1.1 405 OK\n{\n   "status": {\n      "cod": 405,\n      "msg": "invalid parameters"\n   },\n   "body": null\n}',
                        type: 'json',
                    },
                ],
            },
            error: {
                fields: {
                    'Error 4xx': [
                        {
                            group: 'Error 4xx',
                            optional: false,
                            field: 'Internal',
                            description: '<p>Server Error</p>',
                        },
                        {
                            group: 'Error 4xx',
                            optional: false,
                            field: 'Invalid',
                            description: '<p>Parameters</p>',
                        },
                    ],
                },
            },
            filename: 'apidoc/user/apidoc_isFather.js',
            groupTitle: 'Usuario',
        },
        {
            type: 'get',
            url: '/api/user/agree-terms/:termid',
            title: 'Usuário Pai',
            version: '0.2.0',
            name: 'UserIsFather',
            group: 'Usuario',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            description:
                '<p>O parâmetro &quot;TERM_ID&quot; deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br> <b>EX: /api/user/is-father/&lt;TERM_ID&gt;</b></p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n   "status": {\n      "cod": 200,\n      "msg": "ok"\n   },\n   "body": {\n      "ok": 1,\n      "nModified": 1,\n      "n": 1\n   }\n}',
                        type: 'json',
                    },
                    {
                        title: 'Error-Response:',
                        content:
                            'HTTP/1.1 500 OK\n{\n   "InternalServerError": "Ops... Algo deu errado! Perdoe-nos pelo inconveniênte. Estamos analisando o problema que causou intermitência nessa requisição, aguarde...",\n   "code": 500\n}',
                        type: 'json',
                    },
                    {
                        title: 'Error-Response:',
                        content:
                            'HTTP/1.1 405 OK\n{\n   "status": {\n      "cod": 405,\n      "msg": "invalid parameters"\n   },\n   "body": null\n}',
                        type: 'json',
                    },
                ],
            },
            error: {
                fields: {
                    'Error 4xx': [
                        {
                            group: 'Error 4xx',
                            optional: false,
                            field: 'Internal',
                            description: '<p>Server Error</p>',
                        },
                        {
                            group: 'Error 4xx',
                            optional: false,
                            field: 'Invalid',
                            description: '<p>Parameters</p>',
                        },
                    ],
                },
            },
            filename: 'apidoc/user/apidoc_agreeTerms.js',
            groupTitle: 'Usuario',
        },
        {
            type: 'get',
            url: '/api/utils/address-data-by-zip-code/:zipcode',
            title: 'Buscar Dados de Endereço por CEP',
            version: '0.2.0',
            name: 'GetAddressData',
            group: 'Utils',
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'zipcode',
                            description:
                                '<p>CEP de qualquer cidade brasileira.</p>',
                        },
                    ],
                },
            },
            description:
                '<p>O parâmetro ZIPCODE deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br> <b>EX: /api/utils/address-data-by-zip-code/<ZIPCODE></b></p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": {\n    "zipcode": "01331020",\n    "city": "São Paulo",\n    "state": "SP",\n    "neighborhood": "Bela Vista",\n    "street": "Rua Doutor Seng",\n    "complement": null\n  }\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/utils/apidoc_getAddressByZipcode.js',
            groupTitle: 'Utils',
        },
        {
            type: 'get',
            url: '/api/utils/emojis',
            title: 'Buscar Emojis',
            version: '0.2.0',
            name: 'GetEmojis',
            group: 'Utils',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n  "status": {\n    "cod": 200,\n    "msg": "ok"\n  },\n  "body": [\n    {\n      "icon": "😀",\n      "id": 1\n    },\n    {\n      "icon": "😃",\n      "id": 2\n    },\n    {\n      "icon": "😄",\n      "id": 3\n    },\n    {\n      "icon": "😆",\n      "id": 4\n    },\n    {\n      "icon": "😇",\n      "id": 5\n    },\n    {\n      "icon": "😉",\n      "id": 6\n    },\n    {\n      "icon": "😊",\n      "id": 7\n    },\n    {\n      "icon": "😋",\n      "id": 8\n    },\n    {\n      "icon": "😍",\n      "id": 9\n    },\n    {\n      "icon": "😜",\n      "id": 10\n    },\n    {\n      "icon": "😝",\n      "id": 11\n    },\n    {\n      "icon": "😛",\n      "id": 12\n    },\n    {\n      "icon": "😎",\n      "id": 13\n    },\n    {\n      "icon": "😏",\n      "id": 14\n    },\n    {\n      "icon": "😑",\n      "id": 15\n    },\n    {\n      "icon": "😒",\n      "id": 16\n    },\n    {\n      "icon": "😳",\n      "id": 17\n    },\n    {\n      "icon": "😠",\n      "id": 18\n    },\n    {\n      "icon": "👹",\n      "id": 19\n    },\n    {\n      "icon": "😈",\n      "id": 20\n    },\n    {\n      "icon": "💀",\n      "id": 21\n    },\n    {\n      "icon": "👻",\n      "id": 22\n    },\n    {\n      "icon": "🎅",\n      "id": 23\n    },\n    {\n      "icon": "😺",\n      "id": 24\n    },\n    {\n      "icon": "👱",\n      "id": 25\n    },\n    {\n      "icon": "👩",\n      "id": 26\n    },\n    {\n      "icon": "👦",\n      "id": 27\n    },\n    {\n      "icon": "👧",\n      "id": 28\n    },\n    {\n      "icon": "👴",\n      "id": 29\n    },\n    {\n      "icon": "👵",\n      "id": 30\n    },\n    {\n      "icon": "👮",\n      "id": 31\n    },\n    {\n      "icon": "🕵",\n      "id": 32\n    },\n    {\n      "icon": "👰",\n      "id": 33\n    },\n    {\n      "icon": "💃",\n      "id": 34\n    },\n    {\n      "icon": "💂",\n      "id": 35\n    },\n    {\n      "icon": "👽",\n      "id": 36\n    },\n    {\n      "icon": "🔒",\n      "id": 37\n    },\n    {\n      "icon": "🔑",\n      "id": 38\n    }\n  ]\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/utils/apidoc_getEmojis.js',
            groupTitle: 'Utils',
        },
        {
            type: 'post',
            url: '/api/voucher/applay',
            title: 'Aplicar voucher',
            version: '0.3.0',
            name: 'ApplayVoucher',
            group: 'Voucher',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'code',
                            description: '<p>Código do cupom</p>',
                        },
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'email',
                            description: '<p>E-mail do usuário</p>',
                        },
                    ],
                },
                examples: [
                    {
                        title: 'Request-Example:',
                        content:
                            '{\n  "email":"teste@teste.com.br"\n  "code":"00000000"\n}',
                        type: 'json',
                    },
                ],
            },
            description:
                '<p>Atribui a um usuário o voucher com o código enviado. <br> <b>EX:  /api/voucher/applay </b></p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n   "status": null,\n   "body": {\n      "data": {\n         "_id": "xxxxxxxxxxxxxxxxxxxxx",\n         "__v": 0,\n         "dateOfUse": null,\n         "creditsToApply": 42.9,\n         "code": "1000376",\n         "status": true,\n         "createAt": "2018-05-24T13:18:51.057Z",\n         "creator": null\n      },\n      "status": 200\n   }\n}',
                        type: 'json',
                    },
                ],
            },
            error: {
                examples: [
                    {
                        title: 'Error-Response:',
                        content:
                            'HTTP/1.1 405 Invalid Parameters\n{\n    "status": null,\n    "body": {\n        "data": null,\n        "status": 404\n    }\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/voucher/apidoc_applay.js',
            groupTitle: 'Voucher',
        },
        {
            type: 'post',
            url: '/api/protected/voucher/',
            title: 'Voucher Usados',
            version: '0.3.0',
            name: 'GetVoucher',
            group: 'Voucher',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'code',
                            description: '<p>Código do cupom</p>',
                        },
                    ],
                },
            },
            description:
                '<p>Retorna os dados de todos os vouchers utilizados. <br> <b>EX:  /api/protected/voucher/ </b></p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n   "status": {\n      "cod": 200,\n      "msg": "ok"\n   },\n   "body": {\n      "availables": 20349,\n      "used": [\n         {\n            "_id": "xxxxxxxxxxxxxxxxxxxx994",\n            "__v": 0,\n            "dateOfUse": "2018-06-25T15:45:40.637Z",\n            "creditsToApply": 42.9,\n            "code": "0570069",\n            "status": false,\n            "createAt": "2018-05-24T13:18:54.160Z",\n            "user": "xxxxxxxxxxxxxxxxxxxx"\n         },\n         {\n            "_id": "xxxxxxxxxxxxxxxxxxxx99a",\n            "__v": 0,\n            "dateOfUse": "2018-06-26T09:55:47.348Z",\n            "creditsToApply": 42.9,\n            "code": "0650523",\n            "status": false,\n            "createAt": "2018-05-24T13:18:54.160Z",\n            "user": "xxxxxxxxxxxxxxxxxxxx"\n         },\n         {\n            "_id": "xxxxxxxxxxxxxxxxxxxx9a8",\n            "__v": 0,\n            "dateOfUse": "2018-06-25T20:57:59.336Z",\n            "creditsToApply": 42.9,\n            "code": "0016088",\n            "status": false,\n            "createAt": "2018-05-24T13:18:54.161Z",\n            "user": "xxxxxxxxxxxxxxxxxxxx"\n         },\n         {\n            "_id": "xxxxxxxxxxxxxxxxxxxxa2f",\n            "__v": 0,\n            "dateOfUse": "2018-06-21T17:28:48.758Z",\n            "creditsToApply": 42.9,\n            "code": "0634636",\n            "status": false,\n            "createAt": "2018-05-24T13:18:54.169Z",\n            "user": "xxxxxxxxxxxxxxxxxxxx"\n         },\n         {\n            "_id": "xxxxxxxxxxxxxxxxxxxxa32",\n            "__v": 0,\n            "dateOfUse": "2018-06-13T14:25:32.931Z",\n            "creditsToApply": 42.9,\n            "code": "0630474",\n            "status": false,\n            "createAt": "2018-05-24T13:18:54.169Z",\n            "user": "xxxxxxxxxxxxxxxxxxxx"\n         },\n         {\n            "_id": "xxxxxxxxxxxxxxxxxxxxa5b",\n            "__v": 0,\n            "dateOfUse": "2018-06-13T14:12:32.373Z",\n            "creditsToApply": 42.9,\n            "code": "0624733",\n            "status": false,\n            "createAt": "2018-05-24T13:18:54.172Z",\n            "user": "xxxxxxxxxxxxxxxxxxxx"\n         },\n         {\n            "_id": "xxxxxxxxxxxxxxxxxxxxaa0",\n            "__v": 0,\n            "dateOfUse": "2018-06-13T14:13:44.201Z",\n            "creditsToApply": 42.9,\n            "code": "0625212",\n            "status": false,\n            "createAt": "2018-05-24T13:18:54.176Z",\n            "user": "xxxxxxxxxxxxxxxxxxxx"\n         },\n         {\n            "_id": "xxxxxxxxxxxxxxxxxxxxac0",\n            "__v": 0,\n            "dateOfUse": "2018-06-13T11:15:03.582Z",\n            "creditsToApply": 42.9,\n            "code": "0628374",\n            "status": false,\n            "createAt": "2018-05-24T13:18:54.178Z",\n            "user": "xxxxxxxxxxxxxxxxxxxx"\n         },\n         {\n            "_id": "xxxxxxxxxxxxxxxxxxxxb23",\n            "__v": 0,\n            "dateOfUse": "2018-06-13T11:56:55.277Z",\n            "creditsToApply": 42.9,\n            "code": "0627754",\n            "status": false,\n            "createAt": "2018-05-24T13:18:54.187Z",\n            "user": "xxxxxxxxxxxxxxxxxxxx"\n         },\n         {\n            "_id": "xxxxxxxxxxxxxxxxxxxxbfc",\n            "__v": 0,\n            "dateOfUse": "2018-06-26T01:50:56.483Z",\n            "creditsToApply": 42.9,\n            "code": "0646618",\n            "status": false,\n            "createAt": "2018-05-24T13:18:54.203Z",\n            "user": "xxxxxxxxxxxxxxxxxxxx"\n         },\n         {\n            "_id": "xxxxxxxxxxxxxxxxxxxxc42",\n            "__v": 0,\n            "dateOfUse": "2018-06-29T18:48:00.805Z",\n            "creditsToApply": 42.9,\n            "code": "0668028",\n            "status": false,\n            "createAt": "2018-05-24T13:18:54.222Z",\n            "user": "xxxxxxxxxxxxxxxxxxxx"\n         },\n         {\n            "_id": "xxxxxxxxxxxxxxxxxxxxca7",\n            "__v": 0,\n            "dateOfUse": "2018-06-25T18:29:00.239Z",\n            "creditsToApply": 42.9,\n            "code": "0023762",\n            "status": false,\n            "createAt": "2018-05-24T13:18:54.228Z",\n            "user": "xxxxxxxxxxxxxxxxxxxx97"\n         },\n         {\n            "_id": "xxxxxxxxxxxxxxxxxxxxd13",\n            "__v": 0,\n            "dateOfUse": "2018-06-25T19:26:12.809Z",\n            "creditsToApply": 42.9,\n            "code": "0644840",\n            "status": false,\n            "createAt": "2018-05-24T13:18:54.234Z",\n            "user": "xxxxxxxxxxxxxxxxxxxx"\n         },\n         {\n            "_id": "xxxxxxxxxxxxxxxxxxxxd22",\n            "__v": 0,\n            "dateOfUse": "2018-06-26T23:11:21.642Z",\n            "creditsToApply": 42.9,\n            "code": "0643152",\n            "status": false,\n            "createAt": "2018-05-24T13:18:54.235Z",\n            "user": "xxxxxxxxxxxxxxxxxxxxc1"\n         },\n         {\n            "_id": "xxxxxxxxxxxxxxxxxxxxd8a",\n            "__v": 0,\n            "dateOfUse": "2018-06-28T14:33:20.521Z",\n            "creditsToApply": 42.9,\n            "code": "0008934",\n            "status": false,\n            "createAt": "2018-05-24T13:18:54.275Z",\n            "user": "xxxxxxxxxxxxxxxxxxxx"\n         },\n         {\n            "_id": "xxxxxxxxxxxxxxxxxxxxdfb",\n            "__v": 0,\n            "dateOfUse": "2018-06-30T12:46:10.004Z",\n            "creditsToApply": 42.9,\n            "code": "0621699",\n            "status": false,\n            "createAt": "2018-05-24T13:18:54.282Z",\n            "user": "xxxxxxxxxxxxxxxxxxxx"\n         },\n         {\n            "_id": "xxxxxxxxxxxxxxxxxxxxe1e",\n            "__v": 0,\n            "dateOfUse": "2018-06-13T12:53:27.607Z",\n            "creditsToApply": 42.9,\n            "code": "0629984",\n            "status": false,\n            "createAt": "2018-05-24T13:18:54.284Z",\n            "user": "xxxxxxxxxxxxxxxxxxxx"\n         },\n         {\n            "_id": "xxxxxxxxxxxxxxxxxxxxe34",\n            "__v": 0,\n            "dateOfUse": "2018-06-11T21:04:15.691Z",\n            "creditsToApply": 42.9,\n            "code": "0624605",\n            "status": false,\n            "createAt": "2018-05-24T13:18:54.285Z",\n            "user": "xxxxxxxxxxxxxxxxxxxx085a3"\n         },\n         {\n            "_id": "xxxxxxxxxxxxxxxxxxxxe5e",\n            "__v": 0,\n            "dateOfUse": "2018-06-28T14:01:55.679Z",\n            "creditsToApply": 42.9,\n            "code": "0650871",\n            "status": false,\n            "createAt": "2018-05-24T13:18:54.287Z",\n            "user": "xxxxxxxxxxxxxxxxxxxx668"\n         },\n         {\n            "_id": "xxxxxxxxxxxxxxxxxxxxf9a",\n            "__v": 0,\n            "dateOfUse": "2018-06-28T23:20:56.153Z",\n            "creditsToApply": 42.9,\n            "code": "0651913",\n            "status": false,\n            "createAt": "2018-05-24T13:18:54.320Z",\n            "user": "xxxxxxxxxxxxxxxxxxxx173e0196d9"\n         },\n         {\n            "_id": "xxxxxxxxxxxxxxxxxxxx64",\n            "__v": 0,\n            "dateOfUse": "2018-06-25T16:16:26.136Z",\n            "creditsToApply": 42.9,\n            "code": "0641579",\n            "status": false,\n            "createAt": "2018-05-24T13:18:54.331Z",\n            "user": "5b31155ada8ff238c9b6cfbc"\n         },\n         {\n            "_id": "xxxxxxxxxxxxxxxxxxxxb8",\n            "__v": 0,\n            "dateOfUse": "2018-06-28T14:22:59.042Z",\n            "creditsToApply": 42.9,\n            "code": "0651840",\n            "status": false,\n            "createAt": "2018-05-24T13:18:54.336Z",\n            "user": "xxxxxxxxxxxxxxxxxxxx"\n         }\n      ]\n   }\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/voucher/apidoc_voucher.js',
            groupTitle: 'Voucher',
        },
        {
            type: 'post',
            url: '/api/voucher/validate',
            title: 'Validar voucher',
            version: '0.3.0',
            name: 'ValidateVoucher',
            group: 'Voucher',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'code',
                            description: '<p>Código do voucher</p>',
                        },
                    ],
                },
                examples: [
                    {
                        title: 'Request-Example:',
                        content: '{\n  "code":"00000000"\n}',
                        type: 'json',
                    },
                ],
            },
            description:
                '<p>Faz a verificação se um voucher é valido pelo código. <br> <b>EX:  /api/voucher/validate </b></p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n   "status": null,\n   "body": {\n      "data": {\n         "_id": "xxxxxxxxxxxxxxxxxxxxx",\n         "__v": 0,\n         "dateOfUse": null,\n         "creditsToApply": 42.9,\n         "code": "1000376",\n         "status": true,\n         "createAt": "2018-05-24T13:18:51.057Z",\n         "creator": null\n      },\n      "status": 200\n   }\n}',
                        type: 'json',
                    },
                ],
            },
            error: {
                examples: [
                    {
                        title: 'Error-Response:',
                        content:
                            'HTTP/1.1 405 Invalid Parameters\n{\n    "status": null,\n    "body": {\n        "data": null,\n        "status": 404\n    }\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/voucher/apidoc_validate.js',
            groupTitle: 'Voucher',
        },
        {
            type: 'get',
            url: '/api/voucher/code/:code',
            title: 'Recuperar Voucher por Código',
            version: '0.3.0',
            name: 'VoucherCode',
            group: 'Voucher',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'code',
                            description: '<p>Código do voucher</p>',
                        },
                    ],
                },
            },
            description:
                '<p>O parâmetro CODE_VOUCHER deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br> <b>EX:  /api/voucher/code/&lt;CODE_VOUCHER&gt; </b> Será retornado as informações do voucher requisitado pelo código.</p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n   "status": {\n      "cod": 200,\n      "msg": "ok"\n   },\n   "body": {\n      "_id": "xxxxxxxxxxxxxxxxxxxx",\n      "__v": 0,\n      "dateOfUse": "2018-06-25T15:45:40.637Z",\n      "creditsToApply": 42.9,\n      "code": "0570069",\n      "status": false,\n      "createAt": "2018-05-24T13:18:54.160Z",\n      "user": "xxxxxxxxxxxxxxxxxxxx"\n   }\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/voucher/apidoc_getByCode.js',
            groupTitle: 'Voucher',
        },
        {
            type: 'get',
            url: '/api/voucher/user/:userid',
            title: 'Recuperar voucher por usuário',
            version: '0.3.0',
            name: 'VoucherUserId',
            group: 'Voucher',
            header: {
                fields: {
                    Header: [
                        {
                            group: 'Header',
                            type: 'String',
                            optional: false,
                            field: 'Authorization',
                            description:
                                '<p>Token de acesso retornado após autenticação.</p>',
                        },
                    ],
                },
            },
            parameter: {
                fields: {
                    Parameter: [
                        {
                            group: 'Parameter',
                            type: 'String',
                            optional: false,
                            field: 'Id',
                            description: '<p>do usuário</p>',
                        },
                    ],
                },
            },
            description:
                '<p>O parâmetro USER_ID deve ser passado no formato &quot;Path variables&quot; de acordo com a implementação REST. <br> <b>EX:  /api/voucher/user/&lt;USER_ID&gt; </b> A rota retorna as informações dos vouchers utilizados pelo usuário referênciado.</p>',
            success: {
                examples: [
                    {
                        title: 'Success-Response:',
                        content:
                            'HTTP/1.1 200 OK\n{\n   "status": {\n      "cod": 200,\n      "msg": "ok"\n   },\n   "body": [\n      {\n         "_id": "xxxxxxxxxxxxxxxxxxxxx",\n         "__v": 0,\n         "dateOfUse": "2018-06-28T14:33:20.521Z",\n         "creditsToApply": 42.9,\n         "code": "0000000",\n         "status": false,\n         "createAt": "2018-05-24T13:18:54.275Z",\n         "user": "xxxxxxxxxxxxxxxxxxxxx"\n      }\n   ]\n}',
                        type: 'json',
                    },
                ],
            },
            error: {
                examples: [
                    {
                        title: 'Error-Response:',
                        content:
                            'HTTP/1.1 500 Invalid User\n{\n   "InternalServerError": "Ops... Algo deu errado! Perdoe-nos pelo inconveniênte. Estamos analisando o problema que causou intermitência nessa requisição, aguarde...",\n   "code": 500\n}',
                        type: 'json',
                    },
                ],
            },
            filename: 'apidoc/voucher/apidoc_getByUserId.js',
            groupTitle: 'Voucher',
        },
    ],
});
