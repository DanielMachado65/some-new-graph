/**
* @api {get} /api/query/statement-childrens/:userid Histórico de consulta de Clientes Filhos
* @apiVersion 0.3.0
* @apiName StatementChildrens
* @apiGroup Consultas
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.
*
* @apiParam {String} userid ID do cliente mãe
*
* @apiDescription O parâmetro USER_ID deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX:  /api/query/statement-childrens/<USER_ID></b>
*<br>Mostra o histórico das consultas realizadas pelos filhos do id mãe escolhido.

* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
{
   "status":{
      "cod":200,
      "msg":"ok"
   },
   "body":[
      {
         "_id":"xxxxx364400xxxxx80cxxxxxxxxxxb",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-29T14:36:48.866Z"
      },
      {
         "_id":"xxxxx3642a927xxxxx52471ef0xxxxx",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-29T14:31:05.249Z"
      },
      {
         "_id":"xxxxx3641482182fa51xxxxxdac014",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-29T14:25:12.489Z"
      },
      {
         "_id":"xxxxx363dxxxxx182fa51xxxxxdac00c",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-29T14:11:10.611Z"
      },
      {
         "_id":"xxxxx363c9xxxxx49530521a4bf64e",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-29T14:05:12.663Z"
      },
      {
         "_id":"xxxxx363c602182fa51xxxxxdac004",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-29T14:04:16.139Z"
      },
      {
         "_id":"xxxxx363b0974f9775212e1f07b",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-29T13:58:33.892Z"
      },
      {
         "_id":"xxxxx3639d0xxxxx80cxxxxxbfe",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-29T13:53:20.813Z"
      },
      {
         "_id":"xxxxx36388xxxxx1c08451d370e877",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-29T13:47:52.514Z"
      },
      {
         "_id":"xxxxx3637736ed2da51be57a789",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-29T13:43:15.926Z"
      },
      {
         "_id":"xxxxx36343ab49530521a4bf625",
         "log":null,
         "status":true,
         "refClass":"Historico de Proprietarios",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-29T13:29:30.215Z"
      },
      {
         "_id":"xxxxx363209xxxxx80cxxxxxbf4",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-29T13:20:09.963Z"
      },
      {
         "_id":"xxxxx36315c27xxxxx52471ef04d",
         "log":null,
         "status":true,
         "refClass":"Gravame Simples",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-29T13:17:16.062Z"
      },
      {
         "_id":"xxxxx3630a4xxxxx80cxxxxxbec",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-29T13:14:12.164Z"
      },
      {
         "_id":"xxxxx3555986axxxxx7cxxxxx7a764",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-28T21:39:36.845Z"
      },
      {
         "_id":"xxxxx35530b48xxxxx7be8970ba",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-28T21:28:43.399Z"
      },
      {
         "_id":"xxxxx354f6376efxxxxx173986686e",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-28T21:13:07.951Z"
      },
      {
         "_id":"xxxxx354bc7c61xxxxx886aea13",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-28T20:57:43.447Z"
      },
      {
         "_id":"xxxxx354xxxxx96bxxxxx1762c80839",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-28T20:48:57.678Z"
      },
      {
         "_id":"xxxxx35476b98f3d1xxxxx196cc",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-28T20:39:07.407Z"
      },
      {
         "_id":"xxxxx35303f11ecxxxxx4d4401a4",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-28T19:00:15.851Z"
      },
      {
         "_id":"xxxxx352c9a6bxxxxx1762c807af",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-28T18:44:42.xxxxxZ"
      },
      {
         "_id":"xxxxx3527xxxxx76efxxxxx17398667e2",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-28T18:22:55.409Z"
      },
      {
         "_id":"xxxxx35251b4ddae417a3d932de",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-28T18:12:43.822Z"
      },
      {
         "_id":"xxxxx350c8f98f3d1xxxxx195ca",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-28T16:27:59.289Z"
      },
      {
         "_id":"xxxxx350c0c6bxxxxx1762c8076f",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-28T16:25:48.708Z"
      },
      {
         "_id":"xxxxx34f0124ddae417a3d9329f",
         "log":null,
         "status":true,
         "refClass":"Gravame Simples",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-28T14:26:26.647Z"
      },
      {
         "_id":"xxxxx34e8fc48xxxxx7be897013",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-28T13:56:12.152Z"
      },
      {
         "_id":"xxxxx32aa136bxxxxx1762c8xxxxxd",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-26T21:03:15.976Z"
      },
      {
         "_id":"xxxxx32a8cc4ddae417a3d93194",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-26T20:57:48.851Z"
      },
      {
         "_id":"xxxxx32a6106bxxxxx1762c8xxxxx3",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-26T20:46:08.548Z"
      },
      {
         "_id":"xxxxx32a3dac61xxxxx886ae849",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-26T20:36:42.625Z"
      },
      {
         "_id":"xxxxx32a3126bxxxxx1762c805eb",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-26T20:33:22.541Z"
      },
      {
         "_id":"xxxxx32a0a76bxxxxx1762c805e1",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-26T20:23:03.849Z"
      },
      {
         "_id":"xxxxx329dcf48xxxxx7be896f53",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-26T20:10:55.812Z"
      },
      {
         "_id":"xxxxx32xxxxxf176efxxxxx1739866xxxxx0",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-26T20:02:57.895Z"
      },
      {
         "_id":"xxxxx3299994ddae417a3d93187",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-26T19:52:57.917Z"
      },
      {
         "_id":"xxxxx3297bbc61xxxxx886ae82f",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-26T19:44:59.281Z"
      },
      {
         "_id":"xxxxx32939576efxxxxx1739866594",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-26T19:27:17.054Z"
      },
      {
         "_id":"xxxxx3290xxxxx8f3d1xxxxx194aa",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-26T19:13:07.096Z"
      },
      {
         "_id":"xxxxx328cf26bxxxxx1762c805d9",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-26T18:58:58.771Z"
      },
      {
         "_id":"xxxxx328ab211ecxxxxx4d440057",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-26T18:49:22.282Z"
      },
      {
         "_id":"xxxxx3288336axxxxx7cxxxxx7a54d",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-26T18:38:43.369Z"
      },
      {
         "_id":"xxxxx32835298f3d1xxxxx1949e",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-26T18:17:54.015Z"
      },
      {
         "_id":"xxxxx325a4111ecxxxxx4d43ffd7",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-26T15:22:41.734Z"
      },
      {
         "_id":"xxxxx324f5xxxxx1ecxxxxx4d43ff7a",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-26T14:36:12.901Z"
      },
      {
         "_id":"xxxxx32369f11ecxxxxx4d43ff48",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-26T12:50:39.349Z"
      },
      {
         "_id":"xxxxx323652c61xxxxx886ae7xxxxx",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-26T12:49:22.917Z"
      },
      {
         "_id":"xxxxx32364276efxxxxx17398663cc",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-26T12:49:06.938Z"
      },
      {
         "_id":"xxxxx3235a311ecxxxxx4d43ff3f",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-26T12:46:27.018Z"
      },
      {
         "_id":"xxxxx31xxxxx0daxxxxx38cxxxxx6cfa1",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-25T15:31:28.915Z"
      },
      {
         "_id":"xxxxx3103814622fd385fe4d538",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-25T15:00:17.097Z"
      },
      {
         "_id":"xxxxx30xxxxx27xxxxx2386xxxca7",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-25T14:37:22.824Z"
      },
      {
         "_id":"xxxxx30fb09daxxxxx38cxxxxx6cf96",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-25T14:24:09.747Z"
      },
      {
         "_id":"xxxxx30f954df9d1f391215f582",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-25T14:16:52.806Z"
      },
      {
         "_id":"xxxxx30f2cxxxxxxxxxx90bb502b9",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-25T13:48:57.257Z"
      },
      {
         "_id":"xxxxx30f2964622fd385fe4d513",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-25T13:48:06.877Z"
      },
      {
         "_id":"xxxxx30f041daxxxxx38cxxxxx6cf62",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-25T13:38:09.396Z"
      },
      {
         "_id":"xxxxx30eba7bxxxad38cexxxxx63f3",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-25T13:18:31.387Z"
      },
      {
         "_id":"xxxxx30d21d4105xxxxx7b15a1",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-25T11:29:33.995Z"
      },
      {
         "_id":"xxxxx2bf1fd3a7axxxx93499e",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-21T18:44:13.425Z"
      },
      {
         "_id":"xxxxx2bf17d6acxxxxxfa1be6c",
         "log":null,
         "status":true,
         "refClass":"Historico de Proprietarios",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-21T18:42:05.600Z"
      },
      {
         "_id":"xxxxx2bdd3xxxxxec2exxxxx3736",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-21T17:15:29.989Z"
      },
      {
         "_id":"xxxxx2bdxxxxxc92ec2exxxxx3729",
         "log":null,
         "status":true,
         "refClass":"Historico de Proprietarios",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-21T17:14:53.963Z"
      },
      {
         "_id":"xxxxx2b95xxxxxa4b2exxxxx912",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-21T12:08:26.035Z"
      },
      {
         "_id":"xxxxx2aa38xxxxxe43dxxxxxcxxxxxbe030",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-20T18:57:05.398Z"
      },
      {
         "_id":"xxxxx2a51xxxxxbcbcxxxxxd3927052",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-20T13:08:34.961Z"
      },
      {
         "_id":"xxxxx2a3xxxxxa14ffxxxxx6e53da2c",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-20T11:28:45.870Z"
      },
      {
         "_id":"xxxxx2944ca9a12bc3ece146xxxxxa",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-19T18:00:42.464Z"
      },
      {
         "_id":"xxxxx291b938xxxxxebc3eb0852bxxxxx",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-19T15:04:51.293Z"
      },
      {
         "_id":"xxxxx23cdf602e2657270xxxxx5493",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-15T14:32:22.459Z"
      },
      {
         "_id":"xxxxx22b0cf6e94432a6497efa6",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-14T18:15:43.068Z"
      },
      {
         "_id":"xxxxx201xxxxx8c52dbxxxxx6e19",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-12T18:52:01.335Z"
      },
      {
         "_id":"xxxxx1fe88826ec6c65e7b3b765",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-12T15:36:40.547Z"
      },
      {
         "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-12T12:46:47.773Z"
      },
      {
         "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-12T12:38:41.284Z"
      },
      {
         "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-12T12:29:00.976Z"
      },
      {
         "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-12T12:05:19.722Z"
      },
      {
         "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-12T11:56:27.951Z"
      },
      {
         "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-12T11:31:32.319Z"
      },
      {
         "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-12T11:29:12.018Z"
      },
      {
         "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
         "log":null,
         "status":true,
         "refClass":"Historico de Proprietarios",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-12T11:22:08.239Z"
      },
      {
         "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-11T19:15:30.900Z"
      },
      {
         "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-11T18:59:02.980Z"
      },
      {
         "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-11T18:44:53.889Z"
      },
      {
         "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-11T18:30:16.361Z"
      },
      {
         "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-11T18:06:36.624Z"
      },
      {
         "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-11T17:54:00.577Z"
      },
      {
         "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-11T17:52:05.804Z"
      },
      {
         "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-11T17:42:55.498Z"
      },
      {
         "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-11T15:49:47.199Z"
      },
      {
         "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-11T13:51:53.585Z"
      },
      {
         "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-11T11:51:45.682Z"
      },
      {
         "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-06T12:06:59.569Z"
      },
      {
         "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
         "log":null,
         "status":true,
         "refClass":"Dados Cadastrais do Veiculo",
         "documentType":null,
         "documentQuery":null,
         "user":{
            "_id":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "email":"documentos.juridico@maccobrancas.com.br",
            "name":"Maria Do Carmo Alves"
         },
         "createAt":"2018-06-01T18:43:25.281Z"
      }
   ]
}
*
@apiErrorExample Error-Response:
* HTTP/1.1 500 Invalid-Parameters
{
   "InternalServerError":"Ops... Algo deu errado! Perdoe-nos pelo inconveniênte. Estamos analisando o problema que causou intermitência nessa requisição, aguarde...",
   "code":500
}
*/
