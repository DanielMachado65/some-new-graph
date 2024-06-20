/**
* @api {get} /api/person/:queryid Buscar Consulta de Pessoa Física e Pessoa Jurídica por ID
* @apiVersion 5.27.1
* @apiName PersonInformation
* @apiGroup Consultas PF/PJ
*
* @apiHeader {String} Authorization Token de acesso retornado após autenticação.

* @apiParam {String} id da consulta
* @apiParam {String} querycode Código da consulta a ser realizada. Os códigos de consultas disponíveis podem ser encontrados na requisição (#Consultas:GetEnablesQueries).
* @apiParam {Object} keys Chaves para realização da consulta
* @apiParam {String} keys.cpf O CPF para realização da consulta de pessoa física
* @apiParam {String} keys.cnpj O CPNJ para realização da consulta de pessoa jurídica

* @apiDescription O parâmetro Query_ID deve ser passado no formato "Path variables" de acordo com a implementação REST.
* <br> <b>EX: /api/person/<Query_ID></b>

* @apiParamExample {json} Request-Example:
{
  "querycode":1,
  "keys" : {
    "cpf" : "0000000000"
  }
}

* @apiParamExample {json} Request-Example:
{
  "querycode":1,
  "keys" : {
    "cnpj" : "0000000000"
  }
}

* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
{
  "status": {
    "cod": 200,
    "msg": "ok"
  },
  "body": {
    "_id": "XXXXX2XXXXXXa5444EEEEEE9da4",
    "__v": 0,
    "cadastroCompleto": {
      "_id": "5XXXXXXXXXXXXXXXX9d14b26b0",
      "__v": 3,
      "informacoesAdicionais": {
        "telefones": {
          "telefone": [
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
             "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "61",
              "numero": "999624924"
            },
            {
              "ddd": "61",
              "numero": "996542359"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "00",
              "numero": "000000000"
            },
            {
              "ddd": "11",
              "numero": "995888843"
            },
            {
              "ddd": "31",
              "numero": "991674254"
            },
            {
              "ddd": "11",
              "numero": "964892017"
            },
            {
              "ddd": "11",
              "numero": "964972980"
            },
            {
              "ddd": "12",
              "numero": "997065316"
            },
            {
              "ddd": "22",
              "numero": "998251236"
            },
            {
              "ddd": "92",
              "numero": "991580399"
            },
            {
              "ddd": "93",
              "numero": "991393971"
            },
            {
              "ddd": "11",
              "numero": "998930227"
            },
            {
              "ddd": "11",
              "numero": "964891339"
            },
            {
              "ddd": "21",
              "numero": "997344193"
            },
            {
              "ddd": "11",
              "numero": "964976496"
            },
            {
              "ddd": "11",
              "numero": "964040434"
            },
            {
              "ddd": "41",
              "numero": "991662230"
            },
            {
              "ddd": "81",
              "numero": "996458265"
            },
            {
              "ddd": "44",
              "numero": "991348070"
            },
            {
              "ddd": "31",
              "numero": "988153509"
            },
            {
              "ddd": "31",
              "numero": "992198404"
            },
            {
              "ddd": "55",
              "numero": "999685233"
            },
            {
              "ddd": "44",
              "numero": "991349292"
            },
            {
              "ddd": "11",
              "numero": "964891840"
            },
            {
              "ddd": "21",
              "numero": "984109954"
            },
            {
              "ddd": "51",
              "numero": "998483045"
            },
            {
              "ddd": "11",
              "numero": "972071360"
            },
            {
              "ddd": "31",
              "numero": "993021669"
            },
            {
              "ddd": "92",
              "numero": "991660982"
            },
            {
              "ddd": "31",
              "numero": "991642338"
            },
            {
              "ddd": "11",
              "numero": "975948131"
            },
            {
              "ddd": "11",
              "numero": "964890313"
            },
            {
              "ddd": "21",
              "numero": "997911898"
            },
            {
              "ddd": "31",
              "numero": "991379732"
            },
            {
              "ddd": "11",
              "numero": "964897561"
            },
            {
              "ddd": "21",
              "numero": "994952132"
            },
            {
              "ddd": "51",
              "numero": "999455823"
            },
            {
              "ddd": "31",
              "numero": "991788017"
            },
            {
              "ddd": "51",
              "numero": "998364744"
            },
            {
              "ddd": "31",
              "numero": "989241871"
            },
            {
              "ddd": "31",
              "numero": "987086853"
            },
            {
              "ddd": "11",
              "numero": "964976859"
            },
            {
              "ddd": "21",
              "numero": "999256440"
            },
            {
              "ddd": "11",
              "numero": "974997313"
            },
            {
              "ddd": "21",
              "numero": "985093743"
            },
            {
              "ddd": "85",
              "numero": "986711208"
            },
            {
              "ddd": "11",
              "numero": "964978649"
            },
            {
              "ddd": "11",
              "numero": "964968593"
            },
            {
              "ddd": "31",
              "numero": "993043833"
            },
            {
              "ddd": "11",
              "numero": "973427430"
            },
            {
              "ddd": "21",
              "numero": "996157712"
            },
            {
              "ddd": "11",
              "numero": "964897036"
            },
            {
              "ddd": "11",
              "numero": "997966981"
            },
            {
              "ddd": "31",
              "numero": "992125332"
            },
            {
              "ddd": "11",
              "numero": "964890117"
            },
            {
              "ddd": "11",
              "numero": "974470542"
            },
            {
              "ddd": "31",
              "numero": "991517494"
            },
            {
              "ddd": "11",
              "numero": "975112858"
            },
            {
              "ddd": "11",
              "numero": "964983582"
            },
            {
              "ddd": "92",
              "numero": "991211410"
            },
            {
              "ddd": "44",
              "numero": "991352260"
            },
            {
              "ddd": "44",
              "numero": "991343290"
            },
            {
              "ddd": "92",
              "numero": "991553959"
            },
            {
              "ddd": "11",
              "numero": "964972973"
            },
            {
              "ddd": "11",
              "numero": "964890418"
            },
            {
              "ddd": "31",
              "numero": "987252131"
            },
            {
              "ddd": "11",
              "numero": "964891305"
            },
            {
              "ddd": "31",
              "numero": "982258880"
            },
            {
              "ddd": "46",
              "numero": "991096471"
            },
            {
              "ddd": "11",
              "numero": "995306179"
            },
            {
              "ddd": "11",
              "numero": "964891742"
            },
            {
              "ddd": "31",
              "numero": "993027771"
            },
            {
              "ddd": "21",
              "numero": "988017291"
            },
            {
              "ddd": "71",
              "numero": "988450930"
            },
            {
              "ddd": "11",
              "numero": "964995726"
            },
            {
              "ddd": "55",
              "numero": "999238736"
            },
            {
              "ddd": "11",
              "numero": "964972560"
            },
            {
              "ddd": "92",
              "numero": "991182957"
            },
            {
              "ddd": "45",
              "numero": "991065113"
            },
            {
              "ddd": "92",
              "numero": "991623167"
            },
            {
              "ddd": "11",
              "numero": "997444056"
            },
            {
              "ddd": "92",
              "numero": "991550420"
            },
            {
              "ddd": "11",
              "numero": "964972724"
            },
            {
              "ddd": "46",
              "numero": "991097927"
            },
            {
              "ddd": "14",
              "numero": "997964378"
            },
            {
              "ddd": "21",
              "numero": "984469305"
            },
            {
              "ddd": "54",
              "numero": "999656579"
            },
            {
              "ddd": "31",
              "numero": "991890905"
            },
            {
              "ddd": "45",
              "numero": "991166479"
            },
            {
              "ddd": "31",
              "numero": "986537521"
            },
            {
              "ddd": "11",
              "numero": "964895036"
            },
            {
              "ddd": "22",
              "numero": "999189877"
            },
            {
              "ddd": "11",
              "numero": "995453408"
            },
            {
              "ddd": "31",
              "numero": "992372067"
            },
            {
              "ddd": "11",
              "numero": "964973378"
            },
            {
              "ddd": "11",
              "numero": "964892575"
            },
            {
              "ddd": "11",
              "numero": "964040682"
            },
            {
              "ddd": "11",
              "numero": "964891060"
            },
            {
              "ddd": "11",
              "numero": "971444159"
            },
            {
              "ddd": "51",
              "numero": "996139756"
            },
            {
              "ddd": "11",
              "numero": "964890943"
            },
            {
              "ddd": "11",
              "numero": "964890545"
            },
            {
              "ddd": "44",
              "numero": "991350595"
            },
            {
              "ddd": "11",
              "numero": "964703580"
            },
            {
              "ddd": "11",
              "numero": "964973183"
            },
            {
              "ddd": "31",
              "numero": "992425596"
            },
            {
              "ddd": "54",
              "numero": "999373858"
            },
            {
              "ddd": "11",
              "numero": "964976355"
            },
            {
              "ddd": "11",
              "numero": "998745632"
            },
            {
              "ddd": "92",
              "numero": "991578848"
            },
            {
              "ddd": "11",
              "numero": "964040595"
            },
            {
              "ddd": "31",
              "numero": "986569812"
            },
            {
              "ddd": "11",
              "numero": "973049597"
            },
            {
              "ddd": "11",
              "numero": "964985087"
            },
            {
              "ddd": "11",
              "numero": "972789735"
            },
            {
              "ddd": "11",
              "numero": "964891457"
            },
            {
              "ddd": "11",
              "numero": "973928153"
            },
            {
              "ddd": "11",
              "numero": "964984530"
            },
            {
              "ddd": "31",
              "numero": "991962658"
            },
            {
              "ddd": "11",
              "numero": "996576489"
            },
            {
              "ddd": "11",
              "numero": "964701767"
            },
            {
              "ddd": "11",
              "numero": "997225133"
            },
            {
              "ddd": "92",
              "numero": "991491141"
            },
            {
              "ddd": "31",
              "numero": "991274343"
            },
            {
              "ddd": "44",
              "numero": "991350197"
            },
            {
              "ddd": "44",
              "numero": "991350002"
            },
            {
              "ddd": "46",
              "numero": "991117195"
            },
            {
              "ddd": "44",
              "numero": "991352021"
            },
            {
              "ddd": "55",
              "numero": "999649035"
            },
            {
              "ddd": "44",
              "numero": "991347759"
            },
            {
              "ddd": "44",
              "numero": "991345922"
            },
            {
              "ddd": "55",
              "numero": "999264338"
            },
            {
              "ddd": "31",
              "numero": "991465176"
            },
            {
              "ddd": "46",
              "numero": "991084064"
            },
            {
              "ddd": "92",
              "numero": "991536226"
            },
            {
              "ddd": "21",
              "numero": "995439980"
            },
            {
              "ddd": "11",
              "numero": "954747252"
            },
            {
              "ddd": "21",
              "numero": "995348353"
            },
            {
              "ddd": "43",
              "numero": "991223568"
            },
            {
              "ddd": "11",
              "numero": "999541415"
            },
            {
              "ddd": "41",
              "numero": "996057485"
            },
            {
              "ddd": "47",
              "numero": "999695511"
            },
            {
              "ddd": "24",
              "numero": "998121295"
            },
            {
              "ddd": "96",
              "numero": "991192088"
            },
            {
              "ddd": "41",
              "numero": "991262470"
            },
            {
              "ddd": "94",
              "numero": "991662622"
            },
            {
              "ddd": "91",
              "numero": "991858201"
            },
            {
              "ddd": "16",
              "numero": "997938880"
            },
            {
              "ddd": "21",
              "numero": "997041481"
            },
            {
              "ddd": "11",
              "numero": "982649090"
            },
            {
              "ddd": "13",
              "numero": "997088506"
            },
            {
              "ddd": "83",
              "numero": "987640105"
            },
            {
              "ddd": "44",
              "numero": "991045933"
            },
            {
              "ddd": "31",
              "numero": "993620917"
            },
            {
              "ddd": "11",
              "numero": "991686534"
            },
            {
              "ddd": "12",
              "numero": "997333582"
            },
            {
              "ddd": "11",
              "numero": "998149308"
            },
            {
              "ddd": "53",
              "numero": "991150080"
            },
            {
              "ddd": "24",
              "numero": "999954618"
            },
            {
              "ddd": "31",
              "numero": "985641762"
            },
            {
              "ddd": "44",
              "numero": "991040344"
            },
            {
              "ddd": "47",
              "numero": "999238093"
            },
            {
              "ddd": "45",
              "numero": "991082256"
            },
            {
              "ddd": "47",
              "numero": "991943311"
            },
            {
              "ddd": "41",
              "numero": "999877227"
            },
            {
              "ddd": "84",
              "numero": "996948353"
            },
            {
              "ddd": "11",
              "numero": "997894875"
            },
            {
              "ddd": "15",
              "numero": "997275077"
            },
            {
              "ddd": "31",
              "numero": "993288454"
            },
            {
              "ddd": "43",
              "numero": "984831597"
            },
            {
              "ddd": "42",
              "numero": "991227518"
            },
            {
              "ddd": "19",
              "numero": "996101000"
            },
            {
              "ddd": "31",
              "numero": "988967283"
            },
            {
              "ddd": "11",
              "numero": "999653737"
            },
            {
              "ddd": "11",
              "numero": "970949044"
            },
            {
              "ddd": "81",
              "numero": "996580154"
            },
            {
              "ddd": "11",
              "numero": "974890306"
            },
            {
              "ddd": "41",
              "numero": "992580835"
            },
            {
              "ddd": "11",
              "numero": "965310184"
            },
            {
              "ddd": "14",
              "numero": "996984726"
            },
            {
              "ddd": "54",
              "numero": "999673889"
            },
            {
              "ddd": "11",
              "numero": "971086146"
            },
            {
              "ddd": "31",
              "numero": "993288864"
            },
            {
              "ddd": "17",
              "numero": "996227922"
            },
            {
              "ddd": "11",
              "numero": "982880801"
            },
            {
              "ddd": "24",
              "numero": "999057457"
            },
            {
              "ddd": "21",
              "numero": "992044404"
            },
            {
              "ddd": "21",
              "numero": "982275101"
            },
            {
              "ddd": "11",
              "numero": "999075637"
            },
            {
              "ddd": "41",
              "numero": "991818713"
            },
            {
              "ddd": "47",
              "numero": "991467142"
            },
            {
              "ddd": "45",
              "numero": "991013586"
            },
            {
              "ddd": "43",
              "numero": "991039621"
            },
            {
              "ddd": "92",
              "numero": "991878676"
            },
            {
              "ddd": "42",
              "numero": "991151711"
            },
            {
              "ddd": "48",
              "numero": "991052805"
            },
            {
              "ddd": "22",
              "numero": "999091557"
            },
            {
              "ddd": "13",
              "numero": "996024256"
            },
            {
              "ddd": "11",
              "numero": "957865094"
            },
            {
              "ddd": "11",
              "numero": "27862145"
            },
            {
              "ddd": "11",
              "numero": "39647046"
            },
            {
              "ddd": "48",
              "numero": "32118629"
            },
            {
              "ddd": "11",
              "numero": "39647064"
            },
            {
              "ddd": "41",
              "numero": "32051746"
            },
            {
              "ddd": "41",
              "numero": "32679176"
            },
            {
              "ddd": "31",
              "numero": "33175931"
            },
            {
              "ddd": "48",
              "numero": "32064912"
            },
            {
              "ddd": "11",
              "numero": "45214908"
            },
            {
              "ddd": "48",
              "numero": "32285679"
            },
            {
              "ddd": "11",
              "numero": "39640125"
            },
            {
              "ddd": "11",
              "numero": "39647330"
            },
            {
              "ddd": "47",
              "numero": "36453021"
            },
            {
              "ddd": "31",
              "numero": "991306244"
            },
            {
              "ddd": "31",
              "numero": "991182426"
            },
            {
              "ddd": "31",
              "numero": "991305863"
            },
            {
              "ddd": "63",
              "numero": "999620018"
            },
            {
              "ddd": "31",
              "numero": "993551520"
            },
            {
              "ddd": "41",
              "numero": "999234574"
            },
            {
              "ddd": "66",
              "numero": "999671199"
            },
            {
              "ddd": "31",
              "numero": "993624003"
            }
          ]
        },
        "enderecos": {
          "endereco": [
            {
              "tipo_logradouro": "R",
              "logradouro": "DOUTOR LISBOA",
              "numero": "00",
              "complemento": "CS",
              "cep": "37550000",
              "bairro": "CENTRO",
              "cidade": "POUSO ALEGRE",
              "estado": "MG"
            },
            {
              "tipo_logradouro": "R VELHA",
              "logradouro": "CORONEL FERNANDO PRESTES",
              "numero": "00",
              "complemento": "AP 4",
              "cep": "09020110",
              "bairro": "CENTRO",
              "cidade": "SANTO ANDRE",
              "estado": "SP"
            },
            {
              "tipo_logradouro": "AL",
              "logradouro": "FRANCA",
              "numero": "00",
              "complemento": "AP 42",
              "cep": "01422002",
              "bairro": "JARDIM PAULISTA",
              "cidade": "SAO PAULO",
              "estado": "SP"
            },
            {
              "tipo_logradouro": "AL",
              "logradouro": "BARAO DE LIMEIRA",
              "numero": "00",
              "cep": "01202001",
              "bairro": "CAMPOS ELISEOS",
              "cidade": "SAO PAULO",
              "estado": "SP"
            },
            {
              "tipo_logradouro": "R",
              "logradouro": "COLUMBIA",
              "numero": "00",
              "cep": "09241000",
              "bairro": "PARQUE DAS NACOES",
              "cidade": "SANTO ANDRE",
              "estado": "SP"
            },
            {
              "tipo_logradouro": "R",
              "logradouro": "IBIRAREMA",
              "numero": "298",
              "cep": "04136000",
              "bairro": "BOSQUE DA SAUDE",
              "cidade": "SAO PAULO",
              "estado": "SP"
            },
            {
              "tipo_logradouro": "R",
              "logradouro": "BERGAMOTA",
              "numero": "00",
              "complemento": "AP 51",
              "cep": "05468000",
              "bairro": "ALTO DA LAPA",
              "cidade": "SAO PAULO",
              "estado": "SP"
            },
            {
              "tipo_logradouro": "AV",
              "logradouro": "HERCILIO LUZ",
              "numero": "881",
              "complemento": "AP 307",
              "cep": "88020001",
              "bairro": "CENTRO",
              "cidade": "FLORIANOPOLIS",
              "estado": "SC"
            },
            {
              "tipo_logradouro": "R VELHA",
              "logradouro": "CASIMIRO TOSI",
              "numero": "304",
              "cep": "82810710",
              "bairro": "CAPAO DA IMBUIA",
              "cidade": "CURITIBA",
              "estado": "PR"
            },
            {
              "tipo_logradouro": "R VELHA",
              "logradouro": "PREFEITO VASCO ANTONIO VENCHIARUTTI",
              "numero": "230",
              "cep": "13216290",
              "bairro": "JARDIM DA FONTE",
              "cidade": "JUNDIAI",
              "estado": "SP"
            },
            {
              "tipo_logradouro": "R VELHA",
              "logradouro": "HENFIL",
              "numero": "75",
              "cep": "13208063",
              "bairro": "ANHANGABAU",
              "cidade": "JUNDIAI",
              "estado": "SP"
            },
            {
              "tipo_logradouro": "R VELHA",
              "logradouro": "FRANCISCO NANO",
              "numero": "40",
              "cep": "13202242",
              "bairro": "VILA PROGRESSO",
              "cidade": "JUNDIAI",
              "estado": "SP"
            },
            {
              "tipo_logradouro": "R VELHA",
              "logradouro": "ROSADA",
              "numero": "182",
              "cep": "31970695",
              "bairro": "VITORIA",
              "cidade": "BELO HORIZONTE",
              "estado": "MG"
            },
            {
              "tipo_logradouro": "R VELHA",
              "logradouro": "ALMIRANTE LAMEGO",
              "numero": "1274",
              "complemento": "AP 702",
              "cep": "88015601",
              "bairro": "CENTRO",
              "cidade": "FLORIANOPOLIS",
              "estado": "SC"
            },
            {
              "tipo_logradouro": "R VELHA",
              "logradouro": "PROFESSORA ESCOLASTICA DE TOLEDO PONTES",
              "numero": "314",
              "cep": "13209290",
              "bairro": "VILA MARIA LUIZA",
              "cidade": "JUNDIAI",
              "estado": "SP"
            },
            {
              "tipo_logradouro": "R",
              "logradouro": "SAO JOSE",
              "numero": "27",
              "cep": "02326140",
              "bairro": "JARDIM FELICIDADE",
              "cidade": "SAO PAULO",
              "estado": "SP"
            },
            {
              "tipo_logradouro": "R",
              "logradouro": "ADELINA MARIA DA COSTA",
              "numero": "165",
              "cep": "36050400",
              "bairro": "PROGRESSO",
              "cidade": "JUIZ DE FORA",
              "estado": "MG"
            },
            {
              "tipo_logradouro": "R",
              "logradouro": "NOVE",
              "numero": "39",
              "complemento": "CS",
              "cep": "79200000",
              "bairro": "CENTRO",
              "cidade": "AQUIDAUANA",
              "estado": "MS"
            },
            {
              "tipo_logradouro": "R",
              "logradouro": "BENJAMIN CHADID",
              "numero": "1",
              "cep": "79106280",
              "bairro": "JARDIM ITALIA",
              "cidade": "CAMPO GRANDE",
              "estado": "MS"
            },
            {
              "tipo_logradouro": "R",
              "logradouro": "CAVALEIRO DA ROSA",
              "numero": "589",
              "cep": "79013210",
              "bairro": "CONJUNTO RESIDENCIAL ESTRELA DO SUL",
              "cidade": "CAMPO GRANDE",
              "estado": "MS"
            },
            {
              "tipo_logradouro": "R",
              "logradouro": "VICENTE VIEIRA DA MOTA",
              "numero": "254",
              "cep": "36051440",
              "bairro": "SAO TARCISIO",
              "cidade": "JUIZ DE FORA",
              "estado": "MG"
            },
            {
              "tipo_logradouro": "R",
              "logradouro": "PAULO GARCIA",
              "numero": "394",
              "cep": "36090340",
              "bairro": "BENFICA",
              "cidade": "JUIZ DE FORA",
              "estado": "MG"
            },
            {
              "tipo_logradouro": "R",
              "logradouro": "SETE DE SETEMBRO",
              "numero": "120",
              "cep": "45000540",
              "bairro": "CENTRO",
              "cidade": "VITORIA DA CONQUISTA",
              "estado": "BA"
            },
            {
              "tipo_logradouro": "AV",
              "logradouro": "DOUTOR AUGUSTO DE TOLEDO",
              "numero": "744",
              "complemento": "AP 3",
              "cep": "09540080",
              "bairro": "SANTA PAULA",
              "cidade": "SAO CAETANO DO SUL",
              "estado": "SP"
            },
            {
              "tipo_logradouro": "R",
              "logradouro": "PEDRO CANDIAN",
              "numero": "177",
              "cep": "36500000",
              "cidade": "UBA",
              "estado": "MG"
            },
            {
              "tipo_logradouro": "R",
              "logradouro": "DOUTOR SEBASTIAO JOSE MACHADO",
              "numero": "3",
              "cep": "79006470",
              "bairro": "VILA BANDEIRANTE",
              "cidade": "CAMPO GRANDE",
              "estado": "MS"
            },
            {
              "tipo_logradouro": "PC",
              "logradouro": "N NOSSA SENHORA CONCEICAO",
              "numero": "90",
              "cep": "79200000",
              "bairro": "CENTRO",
              "cidade": "AQUIDAUANA",
              "estado": "MS"
            },
            {
              "tipo_logradouro": "R",
              "logradouro": "LOWNDES",
              "numero": "202",
              "complemento": "BAIXOS",
              "cep": "11015080",
              "bairro": "VILA MATHIAS",
              "cidade": "SANTOS",
              "estado": "SP"
            },
            {
              "tipo_logradouro": "AV",
              "logradouro": "PRESIDENTE COSTA E SILVA",
              "numero": "1293",
              "cep": "06626000",
              "bairro": "JARDIM EUROPA",
              "cidade": "JANDIRA",
              "estado": "SP"
            },
            {
              "tipo_logradouro": "R",
              "logradouro": "ANGELA CECILIA TOLARDO",
              "numero": "129",
              "complemento": "CS",
              "cep": "88317195",
              "bairro": "ESPINHEIROS",
              "cidade": "ITAJAI",
              "estado": "SC"
            },
            {
              "tipo_logradouro": "SRV",
              "logradouro": "POR DO SOL",
              "numero": "300",
              "cep": "88049355",
              "bairro": "TAPERA",
              "cidade": "FLORIANOPOLIS",
              "estado": "SC"
            },
            {
              "tipo_logradouro": "R",
              "logradouro": "AZIZ NACHIF",
              "numero": "38",
              "cep": "79062430",
              "bairro": "JARDIM ITAMARACA",
              "cidade": "CAMPO GRANDE",
              "estado": "MS"
            },
            {
              "tipo_logradouro": "R",
              "logradouro": "SIQUEIRA CAMPOS",
              "numero": "55",
              "complemento": "CS",
              "cep": "89300000",
              "bairro": "CENTRO",
              "cidade": "MAFRA",
              "estado": "SC"
            }
          ]
        }
      },
      "informacoesComplementares": {
        "nomemae": "MARIA JOSE DA SILVA VALORES"
      },
      "participacaoSocietaria": [
        {
          "mensagem": "NENHUM REGISTRO ENCONTRADO"
        },
        null
      ],
      "personInformation": "XXXXXXXXXXXXXXXXXXa553c099da4"
    },
    "creditoSimples": {
      "_id": "5ae38fd840231b695613eafb",
      "__v": 0,
      "dataConsulta": "23-07-2018 16:05:48",
      "restricao": "EXISTE RESTRICAO PARA O DOCUMENTO CONSULTADO",
      "chequeSemFundoVarejo": {
        "quantidade": null
      },
      "personInformation": "XXXXXXXXXXXXXXXXXXa553c099da4"
    },
    "restricaoTotal": {
      "_id": "5XXXXXXXXXXXXX553c099da5",
      "__v": 0,
      "chequeConsultaOnlineSrs": {
        "quantidade": 0
      },
      "dadosAgenciaBancaria": null,
      "contumacia": {
        "quantidade": 0
      },
      "contraOrdem": {
        "quantidade": 0
      },
      "grafiaPj": {
        "registros": []
      },
      "personInformation": null
    },
    "pefinBvs": {
      "_id": "XXXXXXXXXXXXXXXXXXXXX553c099daf",
      "__v": 13,
      "restricao": "EXISTE RESTRICAO PARA O DOCUMENTO CONSULTADO",
      "detalhes": [
        {
          "_id": "XXXXXXXXXXXXXXXXX1d04030c8947c",
          "valor": "10",
          "tipoMoeda": "R$",
          "condicao": "ATIVO",
          "uf": "SP",
          "cidade": "SCPC SAO PAULO",
          "consulente": "-",
          "informante": "CENTRAL DE SERVICOS TI",
          "dataDisponibilizacao": "19/12/2017",
          "dataOcorrencia": "10/08/2016",
          "contrato": "123456",
          "tipoDebito": "RG-REGISTRADO"
        },
        {
          "_id": "XXXXXXXXXXXXXXXXXXXX4030c8947d",
          "valor": "5532,92",
          "tipoMoeda": "R$",
          "condicao": "ATIVO",
          "uf": "PR",
          "cidade": "CURITIBA",
          "consulente": "-",
          "informante": "SANEPAR",
          "dataDisponibilizacao": "30/09/2016",
          "dataOcorrencia": "17/06/2016",
          "contrato": "123456",
          "tipoDebito": "RG-REGISTRADO"
        },
        {
          "_id": "XXXXXXXXXXXXXXXXXXX04030c8947e",
          "valor": "10",
          "tipoMoeda": "R$",
          "condicao": "ATIVO",
          "uf": "SP",
          "cidade": "SCPC SAO PAULO",
          "consulente": "-",
          "informante": "CAIXA ECONOMICA FEDERAL",
          "dataDisponibilizacao": "02/08/2016",
          "dataOcorrencia": "09/05/2016",
          "contrato": "123456",
          "tipoDebito": "RG-REGISTRADO"
        },
        {
          "_id": "5b562XXXXXXXXXXXXXXXX47f",
          "valor": "1290,65",
          "tipoMoeda": "R$",
          "condicao": "ATIVO",
          "uf": "PR",
          "cidade": "CURITIBA",
          "consulente": "-",
          "informante": "SANEPAR",
          "dataDisponibilizacao": "30/01/2016",
          "dataOcorrencia": "19/10/2015",
          "contrato": "123456",
          "tipoDebito": "RG-REGISTRADO"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXX89480",
          "valor": "855",
          "tipoMoeda": "R$",
          "condicao": "ATIVO",
          "uf": "SP",
          "cidade": "CAMPINAS",
          "consulente": "-",
          "informante": "SP-CAS/RAIO DE LUZ",
          "dataDisponibilizacao": "06/03/2015",
          "dataOcorrencia": "15/11/2013",
          "contrato": "123456",
          "tipoDebito": "RG-REGISTRADO"
        }
      ],
      "dadosCadastrais": {
        "nomeMae": "-",
        "dataNascimento": null,
        "documento": "123456",
        "nome": "SEBASTIANA M DE CARVALHO"
      },
      "dadosConsulta": {
        "horaConsulta": "16:10",
        "dataConsulta": "23/07/2018",
        "tipoConsulta": "Pefin BVS",
        "documento": "123456"
      },
      "personInformation": "XXXXXXXXXXXXXXXXXXa553c099da4"
    },
    "protesto": {
      "_id": "5aXXXXXXXXXXXXXXXXX952dc0",
      "__v": 6,
      "detalhes": [
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXX9535",
          "valor": "100,00",
          "data": "13/10/2016",
          "ufCartorio": "SC",
          "cidadeCartorio": "RIO DO SUL",
          "nomeCartorio": "0003"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXX9536",
          "valor": "134,40",
          "data": "05/10/2015",
          "ufCartorio": "BA",
          "cidadeCartorio": "SALVADOR",
          "nomeCartorio": "0004"
        },
        {
          "_id": "5bXXXXXXXXXXXXXXXXXX89537",
          "valor": "262,00",
          "data": "30/09/2015",
          "ufCartorio": "BA",
          "cidadeCartorio": "SALVADOR",
          "nomeCartorio": "0001"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX8",
          "valor": "33,91",
          "data": "18/06/2015",
          "ufCartorio": "AM",
          "cidadeCartorio": "MANAUS",
          "nomeCartorio": "0001"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX9",
          "valor": "300,00",
          "data": "10/04/2014",
          "ufCartorio": "AL",
          "cidadeCartorio": "MACEIO",
          "nomeCartorio": "0001"
        }
      ],
      "valorTotal": "830,31",
      "dataUltimaOcorrencia": "13/10/2016",
      "dataPrimeiraOcorrencia": "13/10/2016",
      "quantidade": 0,
      "personInformation": "XXXXXXXXXXXXXXXXXXa553c099da4"
    },
    "pefin": {
      "_id": "XXXXXXXXXXXXXXXXXXXXXXXXXA",
      "__v": 14,
      "detalhes": [
        {
          "_id": "XXXXXXXXXXXXXXXXXXXXX75",
          "valorPendencia": "350,00",
          "tituloOcorrencia": "CRED PESSOAL",
          "origem": "CHECKCHECK",
          "dataOcorrencia": "23/10/2016",
          "contrato": "123456",
          "avalista": "NAO",
          "uf": "GO",
          "cidade": "APARECIDA DE GO",
          "moeda": "R$"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX6",
          "valorPendencia": "168,48",
          "tituloOcorrencia": "OUTRAS OPER",
          "origem": "INOVACAO INFORMATICA LTDA",
          "dataOcorrencia": "15/11/2015",
          "contrato": "123456",
          "avalista": "NAO",
          "uf": "MG",
          "cidade": "BETIM",
          "moeda": "R$"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX7",
          "valorPendencia": "158,30",
          "tituloOcorrencia": "DUPLICATA",
          "origem": "PEYAS E OFICINA AVENIDA LTD",
          "dataOcorrencia": "10/09/2015",
          "contrato": "123456",
          "avalista": "NAO",
          "uf": "MG",
          "cidade": "JO O PINHEIRO",
          "moeda": "R$"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX8",
          "valorPendencia": "340,30",
          "tituloOcorrencia": "TIT DESCONTA",
          "origem": "MAGLENE MODAS   PRESENTES L",
          "dataOcorrencia": "16/08/2015",
          "contrato": "123456",
          "avalista": "NAO",
          "uf": "MG",
          "cidade": "Ibia",
          "moeda": "R$"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX9",
          "valorPendencia": "176,33",
          "tituloOcorrencia": "OUTRAS OPER",
          "origem": "TIM CELULAR S/A",
          "dataOcorrencia": "07/06/2015",
          "contrato": "123456",
          "avalista": "NAO",
          "uf": "SP",
          "cidade": "-",
          "moeda": "R$"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXa",
          "valorPendencia": "1.832,04",
          "tituloOcorrencia": "OUTRAS OPER",
          "origem": "TIM CELULAR S/A",
          "dataOcorrencia": "07/03/2015",
          "contrato": "123456",
          "avalista": "NAO",
          "uf": "SP",
          "cidade": "-",
          "moeda": "R$"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXb",
          "valorPendencia": "200,00",
          "tituloOcorrencia": "DUPLICATA",
          "origem": "MARCO ALVES DASILVA",
          "dataOcorrencia": "20/10/2013",
          "contrato": "123456",
          "avalista": "NAO",
          "uf": "SP",
          "cidade": "ARUJA",
          "moeda": "R$"
        }
      ],
      "valorTotal": "3.225,45",
      "dataUltimaOcorrencia": "23/10/2016",
      "quantidade": 7,
      "personInformation": "XXXXXXXXXXXXXXXXXXa553c099da4"
    },
    "consultaRealizada": {
      "_id": "XXXXXXXXXXXXXXXXX53c099db5",
      "__v": 14,
      "registros": [
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX1",
          "entidadeOrigem": "FCDL-SC - CRICIUMA / SC",
          "dataConsulta": "23/07/2018",
          "ufAssociado": "SC",
          "cidadeAssociado": "CRICIUMA",
          "nomeAssociado": "SPC/CRI"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX2",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "23/07/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX3",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "23/07/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "SEGUROS NAOVIDA"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX4",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "22/07/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX5",
          "entidadeOrigem": "Associacao Comercial - MANGUEIRINHA / PR",
          "dataConsulta": "21/07/2018",
          "ufAssociado": "PR",
          "cidadeAssociado": "MANGUEIRINHA",
          "nomeAssociado": "SUP. BOM PRECO"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX6",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "21/07/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX7",
          "entidadeOrigem": "CDL - BELO HORIZONTE / MG",
          "dataConsulta": "20/07/2018",
          "ufAssociado": "MG",
          "cidadeAssociado": "BELO HORIZONTE",
          "nomeAssociado": "FACTORING"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX8",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "20/07/2018",
          "ufAssociado": "GO",
          "cidadeAssociado": "LUZIANIA",
          "nomeAssociado": "ATIVIDADES DE COBRANCA E INFORMACOES CADASTRAIS"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX9",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "20/07/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXa",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "19/07/2018",
          "ufAssociado": "SP",
          "cidadeAssociado": "SAO PAULO",
          "nomeAssociado": "OUTRAS ATIVIDADES DE SERVICOS PRESTADOS PRINCIPALMENTE AS EMPRESAS NAO ESPECIFICADAS ANTERIORMENTE"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXb",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "19/07/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXc",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "19/07/2018",
          "ufAssociado": "GO",
          "cidadeAssociado": "LUZIANIA",
          "nomeAssociado": "ATIVIDADES DE COBRANCA E INFORMACOES CADASTRAIS"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXd",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "19/07/2018",
          "ufAssociado": "PR",
          "cidadeAssociado": "FRANCISCO BELT",
          "nomeAssociado": "COOPERATIVAS DE CREDITO RURAL"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXe",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "18/07/2018",
          "ufAssociado": "DF",
          "cidadeAssociado": "BRASILIA",
          "nomeAssociado": "SERVICOS DE TELEFONIA FIXA COMUTADA  STFC"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXf",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "18/07/2018",
          "ufAssociado": "SP",
          "cidadeAssociado": "Sao Paulo",
          "nomeAssociado": "SEGUROS NAOVIDA"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX0",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "18/07/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX1",
          "entidadeOrigem": "Associacao Comercial - MANGUEIRINHA / PR",
          "dataConsulta": "17/07/2018",
          "ufAssociado": "PR",
          "cidadeAssociado": "MANGUEIRINHA",
          "nomeAssociado": "SUP. BOM PRECO"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX2",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "17/07/2018",
          "ufAssociado": "PE",
          "cidadeAssociado": "RECIFE",
          "nomeAssociado": "BANCOS MULTIPLOS, COM CARTEIRA COMERCIAL"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX3",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "17/07/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX4",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "17/07/2018",
          "ufAssociado": "DF",
          "cidadeAssociado": "BRASILIA",
          "nomeAssociado": "SERVICOS DE TELECOMUNICACOES SEM FIO NAO ESPECIFICADOS ANTERIORMENTE"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX5",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "16/07/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX6",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "16/07/2018",
          "ufAssociado": "SP",
          "cidadeAssociado": "SAO PAULO",
          "nomeAssociado": "OUTRAS ATIVIDADES DE SERVICOS PRESTADOS PRINCIPALMENTE AS EMPRESAS NAO ESPECIFICADAS ANTERIORMENTE"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX7",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "16/07/2018",
          "ufAssociado": "GO",
          "cidadeAssociado": "LUZIANIA",
          "nomeAssociado": "ATIVIDADES DE COBRANCA E INFORMACOES CADASTRAIS"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX8",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "14/07/2018",
          "ufAssociado": "SP",
          "cidadeAssociado": "SAO PAULO",
          "nomeAssociado": "BANCOS MULTIPLOS, COM CARTEIRA COMERCIAL"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX9",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "14/07/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXa",
          "entidadeOrigem": "CDL - SAO PAULO / SP",
          "dataConsulta": "13/07/2018",
          "ufAssociado": "SP",
          "cidadeAssociado": "TAUBATE",
          "nomeAssociado": "CREDTUDO TECNOLOGIA LTDA ME"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXb",
          "entidadeOrigem": "CDL - JAPERI / RJ",
          "dataConsulta": "13/07/2018",
          "ufAssociado": "SP",
          "cidadeAssociado": "SAO PAULO",
          "nomeAssociado": "SIDNEY ANTONIO DE ANDRADE VINTECINCO 04780015847"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXc",
          "entidadeOrigem": "CDL - RECIFE / PE",
          "dataConsulta": "13/07/2018",
          "ufAssociado": "BA",
          "cidadeAssociado": "VITORIA DA CONQUISTA",
          "nomeAssociado": "CARLOS HENRIQUE"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXd",
          "entidadeOrigem": "CDL - RECIFE / PE",
          "dataConsulta": "13/07/2018",
          "ufAssociado": "SP",
          "cidadeAssociado": "ITAPETININGA",
          "nomeAssociado": "FUSKETA CENTRO AUTOMOTIVO"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXe",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "13/07/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXf",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "13/07/2018",
          "ufAssociado": "SP",
          "cidadeAssociado": "SAO PAULO",
          "nomeAssociado": "OUTRAS ATIVIDADES DE SERVICOS PRESTADOS PRINCIPALMENTE AS EMPRESAS NAO ESPECIFICADAS ANTERIORMENTE"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX0",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "12/07/2018",
          "ufAssociado": "GO",
          "cidadeAssociado": "LUZIANIA",
          "nomeAssociado": "ATIVIDADES DE COBRANCA E INFORMACOES CADASTRAIS"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX1",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "12/07/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX2",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "11/07/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX3",
          "entidadeOrigem": "FCDL-SC - SAO MIGUEL DO OESTE / SC",
          "dataConsulta": "10/07/2018",
          "ufAssociado": "SC",
          "cidadeAssociado": "CUNHA PORA",
          "nomeAssociado": "CREDIAL"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX4",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "10/07/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX5",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "10/07/2018",
          "ufAssociado": "SP",
          "cidadeAssociado": "SAO PAULO",
          "nomeAssociado": "OUTRAS ATIVIDADES DE SERVICOS PRESTADOS PRINCIPALMENTE AS EMPRESAS NAO ESPECIFICADAS ANTERIORMENTE"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX6",
          "entidadeOrigem": "FCDL-SC - JARAGUA DO SUL / SC",
          "dataConsulta": "09/07/2018",
          "ufAssociado": "SC",
          "cidadeAssociado": "JARAGUA DO SUL",
          "nomeAssociado": "CLINICORP"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX7",
          "entidadeOrigem": "FCDL-SC - JARAGUA DO SUL / SC",
          "dataConsulta": "09/07/2018",
          "ufAssociado": "SC",
          "cidadeAssociado": "JARAGUA DO SUL",
          "nomeAssociado": "CLINICORP"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX8",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "09/07/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX9",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "09/07/2018",
          "ufAssociado": "SP",
          "cidadeAssociado": "SAO PAULO",
          "nomeAssociado": "OUTRAS ATIVIDADES DE SERVICOS PRESTADOS PRINCIPALMENTE AS EMPRESAS NAO ESPECIFICADAS ANTERIORMENTE"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXa",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "08/07/2018",
          "ufAssociado": "SP",
          "cidadeAssociado": "SAO PAULO",
          "nomeAssociado": "OUTRAS ATIVIDADES DE SERVICOS PRESTADOS PRINCIPALMENTE AS EMPRESAS NAO ESPECIFICADAS ANTERIORMENTE"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXb",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "08/07/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXc",
          "entidadeOrigem": "CDL - SAO GOTARDO / MG",
          "dataConsulta": "07/07/2018",
          "ufAssociado": "MG",
          "cidadeAssociado": "SAO GOTARDO",
          "nomeAssociado": "MARSHMALLOW SHOES"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXd",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "07/07/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXe",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "07/07/2018",
          "ufAssociado": "GO",
          "cidadeAssociado": "LUZIANIA",
          "nomeAssociado": "ATIVIDADES DE COBRANCA E INFORMACOES CADASTRAIS"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXf",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "06/07/2018",
          "ufAssociado": "GO",
          "cidadeAssociado": "LUZIANIA",
          "nomeAssociado": "ATIVIDADES DE COBRANCA E INFORMACOES CADASTRAIS"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX0",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "06/07/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX1",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "05/07/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX2",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "05/07/2018",
          "ufAssociado": "SP",
          "cidadeAssociado": "SAO PAULO",
          "nomeAssociado": "SEGUROS NAOVIDA"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX3",
          "entidadeOrigem": "FCDL-SC - JARAGUA DO SUL / SC",
          "dataConsulta": "04/07/2018",
          "ufAssociado": "SC",
          "cidadeAssociado": "JARAGUA DO SUL",
          "nomeAssociado": "CLINICORP"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX4",
          "entidadeOrigem": "FCDL-SC - JARAGUA DO SUL / SC",
          "dataConsulta": "04/07/2018",
          "ufAssociado": "SC",
          "cidadeAssociado": "JARAGUA DO SUL",
          "nomeAssociado": "CLINICORP"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX5",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "04/07/2018",
          "ufAssociado": "SP",
          "cidadeAssociado": "SAO PAULO",
          "nomeAssociado": "ATIVIDADES DE COBRANCA E INFORMACOES CADASTRAIS"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX6",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "04/07/2018",
          "ufAssociado": "GO",
          "cidadeAssociado": "LUZIANIA",
          "nomeAssociado": "ATIVIDADES DE COBRANCA E INFORMACOES CADASTRAIS"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX7",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "04/07/2018",
          "ufAssociado": "RS",
          "cidadeAssociado": "Porto Alegre",
          "nomeAssociado": "OUTRAS ATIVIDADES DE SERVICOS PRESTADOS PRINCIPALMENTE AS EMPRESAS NAO ESPECIFICADAS ANTERIORMENTE"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX8",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "04/07/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX9",
          "entidadeOrigem": "FCDL-SC - JARAGUA DO SUL / SC",
          "dataConsulta": "03/07/2018",
          "ufAssociado": "SC",
          "cidadeAssociado": "JARAGUA DO SUL",
          "nomeAssociado": "CLINICORP"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXa",
          "entidadeOrigem": "FCDL-SC - JARAGUA DO SUL / SC",
          "dataConsulta": "03/07/2018",
          "ufAssociado": "SC",
          "cidadeAssociado": "JARAGUA DO SUL",
          "nomeAssociado": "CLINICORP"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXb",
          "entidadeOrigem": "Associacao Comercial - MANGUEIRINHA / PR",
          "dataConsulta": "03/07/2018",
          "ufAssociado": "PR",
          "cidadeAssociado": "MANGUEIRINHA",
          "nomeAssociado": "SUP. BOM PRECO"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXc",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "03/07/2018",
          "ufAssociado": "SP",
          "cidadeAssociado": "SAO PAULO",
          "nomeAssociado": "SEGUROS NAOVIDA"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXd",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "03/07/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXe",
          "entidadeOrigem": "FCDL-SC - FLORIANOPOLIS / SC",
          "dataConsulta": "02/07/2018",
          "ufAssociado": "SC",
          "cidadeAssociado": "FLORIANOPOLIS",
          "nomeAssociado": "ASSOCIADO TESTE FCDL SC SC"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXf",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "02/07/2018",
          "ufAssociado": "GO",
          "cidadeAssociado": "LUZIANIA",
          "nomeAssociado": "ATIVIDADES DE COBRANCA E INFORMACOES CADASTRAIS"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX0",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "02/07/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX1",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "02/07/2018",
          "ufAssociado": "PE",
          "cidadeAssociado": "RECIFE",
          "nomeAssociado": "BANCOS MULTIPLOS, COM CARTEIRA COMERCIAL"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX2",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "01/07/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX3",
          "entidadeOrigem": "CDL - BELO HORIZONTE / MG",
          "dataConsulta": "30/06/2018",
          "ufAssociado": "MG",
          "cidadeAssociado": "ARAXA",
          "nomeAssociado": "ELETROZEMA"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX4",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "30/06/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX5",
          "entidadeOrigem": "CDL - SAO GOTARDO / MG",
          "dataConsulta": "29/06/2018",
          "ufAssociado": "MG",
          "cidadeAssociado": "SAO GOTARDO",
          "nomeAssociado": "MARSHMALLOW"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX6",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "29/06/2018",
          "ufAssociado": "MG",
          "cidadeAssociado": "BELO HORI",
          "nomeAssociado": "SEGUROS DE VIDA"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX7",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "29/06/2018",
          "ufAssociado": "MG",
          "cidadeAssociado": "BELO HORIZONTE",
          "nomeAssociado": "BANCOS MULTIPLOS, COM CARTEIRA COMERCIAL"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX8",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "29/06/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX9",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "28/06/2018",
          "ufAssociado": "SP",
          "cidadeAssociado": "SAO PAULO",
          "nomeAssociado": "SEGUROS NAOVIDA"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXa",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "28/06/2018",
          "ufAssociado": "SP",
          "cidadeAssociado": "SAO PAULO",
          "nomeAssociado": "OUTRAS ATIVIDADES DE SERVICOS PRESTADOS PRINCIPALMENTE AS EMPRESAS NAO ESPECIFICADAS ANTERIORMENTE"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXb",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "28/06/2018",
          "ufAssociado": "DF",
          "cidadeAssociado": "BRASILIA",
          "nomeAssociado": "ADMINISTRACAO DE CONSORCIOS PARA AQUISICAO DE BENS E DIREITOS"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXc",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "28/06/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXd",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "27/06/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXe",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "27/06/2018",
          "ufAssociado": "GO",
          "cidadeAssociado": "LUZIANIA",
          "nomeAssociado": "ATIVIDADES DE COBRANCA E INFORMACOES CADASTRAIS"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXf",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "27/06/2018",
          "ufAssociado": "RS",
          "cidadeAssociado": "Porto Alegre",
          "nomeAssociado": "OUTRAS ATIVIDADES DE SERVICOS PRESTADOS PRINCIPALMENTE AS EMPRESAS NAO ESPECIFICADAS ANTERIORMENTE"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX0",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "26/06/2018",
          "ufAssociado": "SP",
          "cidadeAssociado": "Sao Paulo",
          "nomeAssociado": "SEGUROS NAOVIDA"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX1",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "26/06/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX2",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "26/06/2018",
          "ufAssociado": "SP",
          "cidadeAssociado": "SAO PAULO",
          "nomeAssociado": "ATIVIDADES DE COBRANCA E INFORMACOES CADASTRAIS"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX3",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "26/06/2018",
          "ufAssociado": "BA",
          "cidadeAssociado": "VALENCA",
          "nomeAssociado": "COMERCIO VAREJISTA ESPECIALIZADO DE ELETRODOMESTICOS E EQUIPAMENTOS DE AUDIO E VIDEO"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX4",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "25/06/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX5",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "25/06/2018",
          "ufAssociado": "SP",
          "cidadeAssociado": "SAO PAULO",
          "nomeAssociado": "SOCIEDADES DE CREDITO, FINANCIAMENTO E INVESTIMENTO  FINANCEIRAS"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX6",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "25/06/2018",
          "ufAssociado": "GO",
          "cidadeAssociado": "LUZIANIA",
          "nomeAssociado": "ATIVIDADES DE COBRANCA E INFORMACOES CADASTRAIS"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX7",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "24/06/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX8",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "23/06/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX9",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "22/06/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXa",
          "entidadeOrigem": "CDL - FLORIANOPOLIS / SC",
          "dataConsulta": "21/06/2018",
          "ufAssociado": "SC",
          "cidadeAssociado": "SAO JOSE",
          "nomeAssociado": "MAKENJI"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXb",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "21/06/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXc",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "21/06/2018",
          "ufAssociado": "SP",
          "cidadeAssociado": "SAO PAULO",
          "nomeAssociado": "SEGUROS NAOVIDA"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXd",
          "entidadeOrigem": "CDL - JAPERI / RJ",
          "dataConsulta": "20/06/2018",
          "ufAssociado": "RJ",
          "cidadeAssociado": "JAPERI",
          "nomeAssociado": "CESAR MOREIRA SIMOES"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXe",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "20/06/2018",
          "ufAssociado": "SP",
          "cidadeAssociado": "SP",
          "nomeAssociado": "BANCOS DE INVESTIMENTO"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXf",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "20/06/2018",
          "ufAssociado": "RS",
          "cidadeAssociado": "PORTO ALEGRE",
          "nomeAssociado": "SOCIEDADES DE CREDITO, FINANCIAMENTO E INVESTIMENTO  FINANCEIRAS"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX0",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "20/06/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX1",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "20/06/2018",
          "ufAssociado": "SP",
          "cidadeAssociado": "SAO PAULO",
          "nomeAssociado": "SEGUROS NAOVIDA"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX2",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "20/06/2018",
          "ufAssociado": "DF",
          "cidadeAssociado": "BRASILIA",
          "nomeAssociado": "SEGUROS NAOVIDA"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX3",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "20/06/2018",
          "ufAssociado": "SP",
          "cidadeAssociado": "SAO PAULO",
          "nomeAssociado": "COMERCIO ATACADISTA DE ARTIGOS DE ESCRITORIO E DE PAPELARIA"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX4",
          "entidadeOrigem": "CDL - FLORIANOPOLIS / SC",
          "dataConsulta": "19/06/2018",
          "ufAssociado": "SC",
          "cidadeAssociado": "SAO JOSE",
          "nomeAssociado": "MAKENJI"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX5",
          "entidadeOrigem": "FCDL-SC - CRICIUMA / SC",
          "dataConsulta": "19/06/2018",
          "ufAssociado": "SC",
          "cidadeAssociado": "CRICIUMA",
          "nomeAssociado": "SPC/CRI"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX6",
          "entidadeOrigem": "CDL - SAO PAULO / SP",
          "dataConsulta": "19/06/2018",
          "ufAssociado": "SP",
          "cidadeAssociado": "SAO JOSE DO RIO PRETO",
          "nomeAssociado": "SERVICOS DE INFORMACOES CADASTRAIS"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX7",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "19/06/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX8",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "19/06/2018",
          "ufAssociado": "SP",
          "cidadeAssociado": "SAO PAULO",
          "nomeAssociado": "SOCIEDADES DE CREDITO, FINANCIAMENTO E INVESTIMENTO  FINANCEIRAS"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX9",
          "entidadeOrigem": "Associacao Comercial - CASCAVEL / PR",
          "dataConsulta": "18/06/2018",
          "ufAssociado": "PR",
          "cidadeAssociado": "CASCAVEL",
          "nomeAssociado": "MECANICA ENJEFLEX"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXa",
          "entidadeOrigem": "FCDL-SC - POUSO REDONDO / SC",
          "dataConsulta": "18/06/2018",
          "ufAssociado": "SC",
          "cidadeAssociado": "POUSO REDONDO",
          "nomeAssociado": "ALINE ROZADO"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXb",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "18/06/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXc",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "17/06/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXd",
          "entidadeOrigem": "CDL - JAPERI / RJ",
          "dataConsulta": "16/06/2018",
          "ufAssociado": "RJ",
          "cidadeAssociado": "NILOPOLIS",
          "nomeAssociado": "ROSIMERI VIEIRA VALIM"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXe",
          "entidadeOrigem": "CDL - JAPERI / RJ",
          "dataConsulta": "16/06/2018",
          "ufAssociado": "BA",
          "cidadeAssociado": "VALENCA",
          "nomeAssociado": "JOSE LUIZ GRACA JUNIOR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXf",
          "entidadeOrigem": "CDL - VAZANTE / MG",
          "dataConsulta": "16/06/2018",
          "ufAssociado": "MG",
          "cidadeAssociado": "VAZANTE",
          "nomeAssociado": "SOCIEDADE COMERCIAL LTDA - RON"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX0",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "16/06/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX1",
          "entidadeOrigem": "FCDL-SC - POUSO REDONDO / SC",
          "dataConsulta": "15/06/2018",
          "ufAssociado": "SC",
          "cidadeAssociado": "POUSO REDONDO",
          "nomeAssociado": "ALINE ROZADO"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX2",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "15/06/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX3",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "15/06/2018",
          "ufAssociado": "SP",
          "cidadeAssociado": "GUARULHOS",
          "nomeAssociado": "BANCOS MULTIPLOS, SEM CARTEIRA COMERCIAL"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX4",
          "entidadeOrigem": "CDL - JAPERI / RJ",
          "dataConsulta": "14/06/2018",
          "ufAssociado": "RJ",
          "cidadeAssociado": "JAPERI",
          "nomeAssociado": "SIDNEY ANTONIO DE ANDRADE VINTECINCO"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX5",
          "entidadeOrigem": "CDL - JAPERI / RJ",
          "dataConsulta": "14/06/2018",
          "ufAssociado": "RJ",
          "cidadeAssociado": "JAPERI",
          "nomeAssociado": "SIDNEY ANTONIO DE ANDRADE VINTECINCO"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX6",
          "entidadeOrigem": "CDL - SAPEZAL / MT",
          "dataConsulta": "14/06/2018",
          "ufAssociado": "MT",
          "cidadeAssociado": "SAPEZAL",
          "nomeAssociado": "LINK PAPELARIA E BRINQUEDOS / MUNDO INFANTIL"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX7",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "14/06/2018",
          "ufAssociado": "SP",
          "cidadeAssociado": "SAO PAULO",
          "nomeAssociado": "ATIVIDADES DE COBRANCA E INFORMACOES CADASTRAIS"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX8",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "14/06/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX9",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "14/06/2018",
          "ufAssociado": "RN",
          "cidadeAssociado": "CAICO",
          "nomeAssociado": "FABRICACAO DE CALCADOS DE COURO"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXa",
          "entidadeOrigem": "CDL - SAO PAULO / SP",
          "dataConsulta": "13/06/2018",
          "ufAssociado": "SP",
          "cidadeAssociado": "SAO JOSE DO RIO PRETO",
          "nomeAssociado": "SERVICOS DE INFORMACOES CADASTRAIS"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXb",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "13/06/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXc",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "12/06/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXd",
          "entidadeOrigem": "FCDL-SC - CONCORDIA / SC",
          "dataConsulta": "11/06/2018",
          "ufAssociado": "SC",
          "cidadeAssociado": "CONCORDIA",
          "nomeAssociado": "BAVARESCO CONTABILIDADE"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXe",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "11/06/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXf",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "10/06/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX0",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "10/06/2018",
          "ufAssociado": "RJ",
          "cidadeAssociado": "RIO DE JANEIRO",
          "nomeAssociado": "BANCOS COMERCIAIS"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX1",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "09/06/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX2",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "08/06/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX3",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "08/06/2018",
          "ufAssociado": "SP",
          "cidadeAssociado": "SAO PAULO",
          "nomeAssociado": "SEGUROS NAOVIDA"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX4",
          "entidadeOrigem": "CDL - BELO HORIZONTE / MG",
          "dataConsulta": "07/06/2018",
          "ufAssociado": "MG",
          "cidadeAssociado": "ARAXA",
          "nomeAssociado": "ELETROZEMA"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX5",
          "entidadeOrigem": "CDL - SAO PAULO / SP",
          "dataConsulta": "07/06/2018",
          "ufAssociado": "SP",
          "cidadeAssociado": "SAO JOSE DO RIO PRETO",
          "nomeAssociado": "SERVICOS DE INFORMACOES CADASTRAIS"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX6",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "07/06/2018",
          "ufAssociado": "SP",
          "cidadeAssociado": "SAO PAULO",
          "nomeAssociado": "SEGUROS NAOVIDA"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX7",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "07/06/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX8",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "06/06/2018",
          "ufAssociado": "RS",
          "cidadeAssociado": "Porto Alegre",
          "nomeAssociado": "OUTRAS ATIVIDADES DE SERVICOS PRESTADOS PRINCIPALMENTE AS EMPRESAS NAO ESPECIFICADAS ANTERIORMENTE"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX9",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "06/06/2018",
          "ufAssociado": "-",
          "cidadeAssociado": "-",
          "nomeAssociado": "TELEFONIA MOVEL CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXa",
          "entidadeOrigem": "FCDL-SC - POUSO REDONDO / SC",
          "dataConsulta": "04/06/2018",
          "ufAssociado": "SC",
          "cidadeAssociado": "POUSO REDONDO",
          "nomeAssociado": "CARROCERIAS CLAUDINO"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXb",
          "entidadeOrigem": "Associacao Comercial - MARINGA / PR",
          "dataConsulta": "30/05/2018",
          "ufAssociado": "PR",
          "cidadeAssociado": "MARINGA",
          "nomeAssociado": "SANCOR SEGUROS"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXc",
          "entidadeOrigem": "CDL - TEIXEIRA DE FREITAS / BA",
          "dataConsulta": "30/05/2018",
          "ufAssociado": "BA",
          "cidadeAssociado": "TEIXEIRA DE FREITAS",
          "nomeAssociado": "MIB CALCADOS"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXd",
          "entidadeOrigem": "Associacao Comercial - MARINGA / PR",
          "dataConsulta": "30/05/2018",
          "ufAssociado": "PR",
          "cidadeAssociado": "MARINGA",
          "nomeAssociado": "SANCOR SEGUROS"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXe",
          "entidadeOrigem": "Associacao Comercial - ARAGUAINA / TO",
          "dataConsulta": "28/05/2018",
          "ufAssociado": "TO",
          "cidadeAssociado": "ARAGUAINA",
          "nomeAssociado": "SUPERMERCADO CAMPELO I"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXf",
          "entidadeOrigem": "CDL - SAO PAULO / SP",
          "dataConsulta": "24/05/2018",
          "ufAssociado": "SP",
          "cidadeAssociado": "SAO JOSE DO RIO PRETO",
          "nomeAssociado": "SERVICOS DE INFORMACOES CADASTRAIS"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX0",
          "entidadeOrigem": "CDL - RECIFE / PE",
          "dataConsulta": "24/05/2018",
          "ufAssociado": "MG",
          "cidadeAssociado": "TAIOBEIRAS",
          "nomeAssociado": "MINHA FAVORITA"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX1",
          "entidadeOrigem": "Associacao Comercial - MARINGA / PR",
          "dataConsulta": "21/05/2018",
          "ufAssociado": "PR",
          "cidadeAssociado": "MARINGA",
          "nomeAssociado": "SANCOR SEGUROS"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX2",
          "entidadeOrigem": "CDL - SAO PAULO / SP",
          "dataConsulta": "21/05/2018",
          "ufAssociado": "SP",
          "cidadeAssociado": "TAUBATE",
          "nomeAssociado": "CREDTUDO TECNOLOGIA LTDA ME"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX3",
          "entidadeOrigem": "CDL - SAO PAULO / SP",
          "dataConsulta": "18/05/2018",
          "ufAssociado": "SP",
          "cidadeAssociado": "SAO PAULO",
          "nomeAssociado": "ABRCI ASSOCIACAO BRASILEIRA DAS REDES DE COMERCIO E INDUSTR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX4",
          "entidadeOrigem": "CDL - JAPERI / RJ",
          "dataConsulta": "16/05/2018",
          "ufAssociado": "RJ",
          "cidadeAssociado": "SEROPEDICA",
          "nomeAssociado": "ANDRE GOMES MAIO"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX5",
          "entidadeOrigem": "CDL - JAPERI / RJ",
          "dataConsulta": "15/05/2018",
          "ufAssociado": "RJ",
          "cidadeAssociado": "RIO DE JANEIRO",
          "nomeAssociado": "JOEL FERREIRA DOS REIS"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX6",
          "entidadeOrigem": "CDL - JAPERI / RJ",
          "dataConsulta": "14/05/2018",
          "ufAssociado": "RJ",
          "cidadeAssociado": "RIO DE JANEIRO",
          "nomeAssociado": "DOLORES FARIA VIEIRA"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX7",
          "entidadeOrigem": "CDL - PALMARES / PE",
          "dataConsulta": "14/05/2018",
          "ufAssociado": "PE",
          "cidadeAssociado": "PALMARES",
          "nomeAssociado": "A PREDILETA"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX8",
          "entidadeOrigem": "CDL - JAPERI / RJ",
          "dataConsulta": "11/05/2018",
          "ufAssociado": "RJ",
          "cidadeAssociado": "JAPERI",
          "nomeAssociado": "ARLINDO FERREIRA PACHECO NETO"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX9",
          "entidadeOrigem": "CDL - JAPERI / RJ",
          "dataConsulta": "11/05/2018",
          "ufAssociado": "RJ",
          "cidadeAssociado": "NOVA IGUACU",
          "nomeAssociado": "REGINA CAZER"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXa",
          "entidadeOrigem": "CDL - RECIFE / PE",
          "dataConsulta": "10/05/2018",
          "ufAssociado": "SP",
          "cidadeAssociado": "ANGATUBA",
          "nomeAssociado": "COMPACTA EMBALAGENS"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXb",
          "entidadeOrigem": "CDL - JAPERI / RJ",
          "dataConsulta": "09/05/2018",
          "ufAssociado": "RJ",
          "cidadeAssociado": "NOVA IGUACU",
          "nomeAssociado": "ARCHIMAR MATTOSO PRATI"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXc",
          "entidadeOrigem": "CDL - GOIANIA / GO",
          "dataConsulta": "07/05/2018",
          "ufAssociado": "GO",
          "cidadeAssociado": "GOIANIA",
          "nomeAssociado": "CASA IMOVEIS"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXd",
          "entidadeOrigem": "CDL - BELO HORIZONTE / MG",
          "dataConsulta": "05/05/2018",
          "ufAssociado": "MG",
          "cidadeAssociado": "ARAXA",
          "nomeAssociado": "ELETROZEMA"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXe",
          "entidadeOrigem": "CDL - CASCAVEL / PR",
          "dataConsulta": "04/05/2018",
          "ufAssociado": "PR",
          "cidadeAssociado": "UMUARAMA",
          "nomeAssociado": "ANALISE DE CREDITO"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXf",
          "entidadeOrigem": "FCDL-SC - JOINVILLE / SC",
          "dataConsulta": "03/05/2018",
          "ufAssociado": "SC",
          "cidadeAssociado": "JOINVILLE",
          "nomeAssociado": "FUNDICAO PETROPOLIS"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX0",
          "entidadeOrigem": "FCDL-SC - FLORIANOPOLIS / SC",
          "dataConsulta": "02/05/2018",
          "ufAssociado": "SC",
          "cidadeAssociado": "FLORIANOPOLIS",
          "nomeAssociado": "ASSOCIADO TESTE FCDL SC SC"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX1",
          "entidadeOrigem": "CDL - RECIFE / PE",
          "dataConsulta": "28/04/2018",
          "ufAssociado": "MG",
          "cidadeAssociado": "ITAOBIM",
          "nomeAssociado": "FRIO VALE"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX2",
          "entidadeOrigem": "CDL - RECIFE / PE",
          "dataConsulta": "27/04/2018",
          "ufAssociado": "MG",
          "cidadeAssociado": "MONTES CLAROS",
          "nomeAssociado": "AUTO ELETRICA IRMAOS PEREIRA"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX3",
          "entidadeOrigem": "CDL - LAGOA FORMOSA / MG",
          "dataConsulta": "26/04/2018",
          "ufAssociado": "MG",
          "cidadeAssociado": "LAGOA FORMOSA",
          "nomeAssociado": "SUPERMERCADO ATUAL"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX4",
          "entidadeOrigem": "CDL - SANTA BARBARA / MG",
          "dataConsulta": "26/04/2018",
          "ufAssociado": "MG",
          "cidadeAssociado": "SANTA BARBARA",
          "nomeAssociado": "LUCIO REZENDE FONSECA -TANGIRU ALIMENTOS"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX5",
          "entidadeOrigem": "CDL - CORONEL FABRICIANO / MG",
          "dataConsulta": "25/04/2018",
          "ufAssociado": "MG",
          "cidadeAssociado": "CORONEL FABRICIANO",
          "nomeAssociado": "BRASIL TINTAS."
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX6",
          "entidadeOrigem": "CDL - MACEIO / AL",
          "dataConsulta": "25/04/2018",
          "ufAssociado": "AL",
          "cidadeAssociado": "MACEIO",
          "nomeAssociado": "CONDOMINIO POVOA DE VARZIM"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX7",
          "entidadeOrigem": "CDL - RECIFE / PE",
          "dataConsulta": "24/04/2018",
          "ufAssociado": "MG",
          "cidadeAssociado": "MATO VERDE",
          "nomeAssociado": "APE POCOS ARTESIANOS"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX8",
          "entidadeOrigem": "CDL - RECIFE / PE",
          "dataConsulta": "24/04/2018",
          "ufAssociado": "SP",
          "cidadeAssociado": "ITAPETININGA",
          "nomeAssociado": "MOLINARI STREET WAY"
        }
      ],
      "quantidadeDiasConsultado": "90",
      "quantidade": 168,
      "personInformation": "XXXXXXXXXXXXXXXXXXa553c099da4"
    },
    "ccf": {
      "_id": "XXXXX239de1a553c099da6",
      "__v": 0,
      "detalhes": [],
      "dataUltimaOcorrencia": null,
      "quantidade": 0,
      "personInformation": "XXXXXXXXXXXXXXXXXXa553c099da4"
    },
    "pendenciaSpc": {
      "_id": "XXXXX239de1a553c099e4c",
      "__v": 14,
      "detalhes": [
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX9",
          "valor": "1.000,00",
          "participacao": "COMPRADOR",
          "registroInstFinanceira": "NAO",
          "contrato": "13/1",
          "nomeEntidade": "FCDL-SC - FLORIANOPOLIS / SC",
          "dataVencimento": "01/01/2017",
          "dataInclusao": "16/12/2017",
          "telefoneAssociado": "32515300",
          "dddAssociado": "48",
          "ufAssociado": "SC",
          "cidadeAssociado": "FLORIANOPOLIS",
          "nomeAssociado": "ASSOCIADO TESTE FCDL SC SC"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXa",
          "valor": "205,31",
          "participacao": "COMPRADOR",
          "registroInstFinanceira": "NAO",
          "contrato": "13179/2",
          "nomeEntidade": "FCDL-SC - FLORIANOPOLIS / SC",
          "dataVencimento": "23/10/2017",
          "dataInclusao": "11/11/2017",
          "telefoneAssociado": "32515300",
          "dddAssociado": "48",
          "ufAssociado": "SC",
          "cidadeAssociado": "FLORIANOPOLIS",
          "nomeAssociado": "ASSOCIADO TESTE FCDL SC SC"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXb",
          "valor": "373,00",
          "participacao": "COMPRADOR",
          "registroInstFinanceira": "NAO",
          "contrato": "13345/2",
          "nomeEntidade": "FCDL-SC - FLORIANOPOLIS / SC",
          "dataVencimento": "24/10/2017",
          "dataInclusao": "11/11/2017",
          "telefoneAssociado": "32515300",
          "dddAssociado": "48",
          "ufAssociado": "SC",
          "cidadeAssociado": "FLORIANOPOLIS",
          "nomeAssociado": "ASSOCIADO TESTE FCDL SC SC"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXc",
          "valor": "395,92",
          "participacao": "COMPRADOR",
          "registroInstFinanceira": "NAO",
          "contrato": "13208/2",
          "nomeEntidade": "FCDL-SC - FLORIANOPOLIS / SC",
          "dataVencimento": "23/10/2017",
          "dataInclusao": "11/11/2017",
          "telefoneAssociado": "32515300",
          "dddAssociado": "48",
          "ufAssociado": "SC",
          "cidadeAssociado": "FLORIANOPOLIS",
          "nomeAssociado": "ASSOCIADO TESTE FCDL SC SC"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXd",
          "valor": "10,00",
          "participacao": "COMPRADOR",
          "registroInstFinanceira": "NAO",
          "contrato": "1/1",
          "nomeEntidade": "FCDL-SC - LAGES / SC",
          "dataVencimento": "01/05/2017",
          "dataInclusao": "15/06/2017",
          "telefoneAssociado": "32217007",
          "dddAssociado": "49",
          "ufAssociado": "SC",
          "cidadeAssociado": "LAGES",
          "nomeAssociado": "SPC LAGES - COMERCIAL"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXe",
          "valor": "700,00",
          "participacao": "COMPRADOR",
          "registroInstFinanceira": "NAO",
          "contrato": "090909/7",
          "nomeEntidade": "FCDL-SC - TUBARAO / SC",
          "dataVencimento": "01/02/2017",
          "dataInclusao": "30/03/2017",
          "telefoneAssociado": "36262022",
          "dddAssociado": "48",
          "ufAssociado": "SC",
          "cidadeAssociado": "TUBARAO",
          "nomeAssociado": "SPC TUBARAO"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXf",
          "valor": "200,00",
          "participacao": "COMPRADOR",
          "registroInstFinanceira": "NAO",
          "contrato": "0000000000000010",
          "nomeEntidade": "SAO PAULO / SP",
          "dataVencimento": "20/10/2013",
          "dataInclusao": "24/02/2017",
          "telefoneAssociado": "984541248",
          "dddAssociado": "32",
          "ufAssociado": "SP",
          "cidadeAssociado": "ARUJA",
          "nomeAssociado": "MARCO ALVES"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX0",
          "valor": "168,48",
          "participacao": "COMPRADOR",
          "registroInstFinanceira": "NAO",
          "contrato": "6459",
          "nomeEntidade": "CDL - BETIM / MG",
          "dataVencimento": "15/11/2015",
          "dataInclusao": "03/03/2016",
          "telefoneAssociado": "35313020",
          "dddAssociado": "31",
          "ufAssociado": "MG",
          "cidadeAssociado": "BETIM",
          "nomeAssociado": "S.O.S COMPUTADORES"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX1",
          "valor": "176,33",
          "participacao": "COMPRADOR",
          "registroInstFinanceira": "NAO",
          "contrato": "GSM0161179531005",
          "nomeEntidade": "SAO PAULO / SP",
          "dataVencimento": "07/06/2015",
          "dataInclusao": "10/07/2015",
          "telefoneAssociado": "-",
          "dddAssociado": "-",
          "ufAssociado": "SP",
          "cidadeAssociado": "-",
          "nomeAssociado": "TIM CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX2",
          "valor": "1.832,04",
          "participacao": "COMPRADOR",
          "registroInstFinanceira": "NAO",
          "contrato": "GSM0161121888935",
          "nomeEntidade": "SAO PAULO / SP",
          "dataVencimento": "07/03/2015",
          "dataInclusao": "10/07/2015",
          "telefoneAssociado": "-",
          "dddAssociado": "-",
          "ufAssociado": "SP",
          "cidadeAssociado": "-",
          "nomeAssociado": "TIM CELULAR"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX3",
          "valor": "41,96",
          "participacao": "COMPRADOR",
          "registroInstFinanceira": "NAO",
          "contrato": "1",
          "nomeEntidade": "CDL - IBIA / MG",
          "dataVencimento": "13/04/2014",
          "dataInclusao": "22/10/2014",
          "telefoneAssociado": "36311142",
          "dddAssociado": "34",
          "ufAssociado": "MG",
          "cidadeAssociado": "IBIA",
          "nomeAssociado": "CONSTRU MAX"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX4",
          "valor": "300,00",
          "participacao": "COMPRADOR",
          "registroInstFinanceira": "NAO",
          "contrato": "5583",
          "nomeEntidade": "CDL - GOIANIA / GO",
          "dataVencimento": "29/09/2013",
          "dataInclusao": "15/12/2013",
          "telefoneAssociado": "35956554",
          "dddAssociado": "62",
          "ufAssociado": "GO",
          "cidadeAssociado": "GOIANIA",
          "nomeAssociado": "REDE ELETRO E CIA"
        }
      ],
      "valorTotal": "5.403,04",
      "dataUltimaOcorrencia": "16/12/2017",
      "quantidade": 12,
      "personInformation": "XXXXXXXXXXXXXXXXXXa553c099da4"
    },
    "ultimoEnderecoInformado": {
      "_id": "XXXXXXXXXXXXXXXXXXXXXXXXXdc6",
      "__v": 6,
      "registros": [
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXa",
          "cep": "1422002",
          "uf": "SP",
          "cidade": "SAO PAULO",
          "bairro": "JARDIM PAULISTA",
          "numero": "00",
          "logradouro": "AL FRANCA"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXb",
          "cep": "88509350",
          "uf": "SC",
          "cidade": "LAGES",
          "bairro": "SAO CRISTOVAO",
          "numero": "1",
          "logradouro": "RUA DOUTOR  CARRILHO"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXc",
          "cep": "88010001",
          "uf": "SC",
          "cidade": "FLORIANOPOLIS",
          "bairro": "CENTRO",
          "numero": "679",
          "logradouro": "RUA   FELIPE SCHMIDT"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXd",
          "cep": "88058000",
          "uf": "SC",
          "cidade": "FLORIANOPOLIS",
          "bairro": "VARGEM GRANDE",
          "numero": "10",
          "logradouro": "RODOVIA   ARMANDO CALIL BULOS"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXe",
          "cep": "12239006",
          "uf": "SP",
          "cidade": "SAO JOSE DOS CAMPOS",
          "bairro": "RESIDENCIAL UNIAO",
          "numero": "00000",
          "logradouro": "RUA DEZOITO * SAI DA AVENIDA DOIS 254"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXXf",
          "cep": "85770000",
          "uf": "PR",
          "cidade": "REALEZA",
          "bairro": "Centro",
          "numero": "SN",
          "logradouro": "Avenida Bruno Zuttion"
        }
      ],
      "quantidade": 0,
      "personInformation": "XXXXXXXXXXXXXXXXXXa553c099da4"
    },
    "telefoneVinculado": null,
    "featuresOpcionais": {
      "_id": "XXXXXXXXXXXXXXXXXXXXXXX7",
      "__v": 0,
      "email": null,
      "locEndTel": null,
      "score12Meses": null,
      "rendaPresumida": {
        "renda": "2.598,92",
        "codigo": 1,
        "retorno": "CONSTA RENDA PRESUMIDA PARA O DOCUMENTO INFORMADO"
      },
      "participacaoSocietaria": {
        "codigo": "2",
        "retorno": "NENHUM REGISTRO ENCONTRADO"
      },
      "score": null,
      "faturamentoPresumido": null,
      "qsa": null,
      "representanteLegal": null,
      "personInformation": "XXXXXXXXXXXXXXXXXXa553c099da4"
    },
    "ultimoTelefoneInformado": {
      "registro": [
        {
          "ddd": "48",
          "telefone": "33816578",
          "data_primeira_consulta": "25/07/2017",
          "data_ultima_consulta": "21/06/2018",
          "quantidade_consulta": "7"
        },
        {
          "ddd": "48",
          "telefone": "33816579",
          "data_primeira_consulta": "13/12/2017",
          "data_ultima_consulta": "19/01/2018",
          "quantidade_consulta": "2"
        },
        {
          "ddd": "11",
          "telefone": "23347890",
          "data_primeira_consulta": "29/11/2017",
          "data_ultima_consulta": "29/11/2017",
          "quantidade_consulta": "2"
        },
        {
          "ddd": "62",
          "telefone": "33261137",
          "data_primeira_consulta": "28/09/2017",
          "data_ultima_consulta": "28/09/2017",
          "quantidade_consulta": "1"
        },
        {
          "ddd": "62",
          "telefone": "33264977",
          "data_primeira_consulta": "22/10/2016",
          "data_ultima_consulta": "19/06/2017",
          "quantidade_consulta": "12"
        }
      ]
    },
    "telefoneConsultado": {
      "quantidade": 0
    },
    "endCepConsultado": null,
    "baseNegativacao": null,
    "dadosCadastrais": {
      "descricaoNaturezaJuridica": null,
      "codigoNaturezaJuridica": null,
      "descricaoCnae": null,
      "codigoCnae": null,
      "dataFundacao": null,
      "nomeFantasia": null,
      "razaoSocial": null,
      "dataSituacaoCnpj": null,
      "situacaoCnpj": null,
      "email": "XXXXXXXXXXXXX@hotmail.com",
      "estadoCivil": "CASADO",
      "tituloEleitor": "-",
      "nomePai": "-",
      "nomeMae": "MARIA JOSE DA SILVA VALORES",
      "telNum": "00000000000000",
      "telDdd": "71",
      "endEstado": "MG",
      "endCidade": "POUSO ALEGRE",
      "endBairro": "CENTRO",
      "endCep": "37550000",
      "endComplemento": "CS",
      "endNum": "152",
      "endTipoLogradouro": "R",
      "endLogradouro": "DOUTOR LISBOA",
      "sexo": "M",
      "idade": "54",
      "signo": "TOURO",
      "rg": "-",
      "dataNascimento": "24/04/1964",
      "dataSituacaoCpf": "20/07/2018",
      "situacaoCpf": "PENDENTE DE REGULARIZACAO",
      "documentoOrigem": "SAO PAULO",
      "documento": null,
      "nome": "SEBASTIANA M DE CARVALHO"
    },
    "documento": "01234567890",
    "status": true,
    "createAt": "2018-04-20T20:34:10.439Z"
  }
}
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
{
  "status": {
    "cod": 200,
    "msg": "ok"
  },
  "body": {
    "_id": "XXXXXXXXXXXXXXXXXXXXXXXXXX504c",
    "__v": 0,
    "cadastroCompleto": null,
    "creditoSimples": null,
    "restricaoTotal": {
      "_id": "5XXXXXXXXXXXXXXXXXXXXXXXd",
      "__v": 0,
      "chequeConsultaOnlineSrs": {
        "quantidade": 0
      },
      "dadosAgenciaBancaria": null,
      "contumacia": {
        "quantidade": 0
      },
      "contraOrdem": {
        "quantidade": 0
      },
      "grafiaPj": {
        "registros": [
          {
            "razao_social": "MEGATRUCK CAMINHOES LTDA ME"
          },
          {
            "razao_social": "ATUAL CAMINHOES LTDA ME"
          }
        ]
      },
      "personInformation": null
    },
    "pefinBvs": null,
    "protesto": {
      "_id": "5XXXXXXXXXXXXXXXXXXXXXXX57",
      "__v": 0,
      "detalhes": [
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX58",
          "valor": "9.315,00",
          "data": "13/09/2016",
          "ufCartorio": "MG",
          "cidadeCartorio": "BETIM",
          "nomeCartorio": "UN"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX59",
          "valor": "715,00",
          "data": "14/07/2016",
          "ufCartorio": "MG",
          "cidadeCartorio": "BETIM",
          "nomeCartorio": "UN"
        }
      ],
      "valorTotal": "10.030,00",
      "dataUltimaOcorrencia": "13/09/2016",
      "dataPrimeiraOcorrencia": "13/09/2016",
      "quantidade": 0,
      "personInformation": "XXXXXXXXXXXXXXXXXXXXXXXXX"
    },
    "pefin": {
      "_id": "5XXXXXXXXXXXXXXXXXXXXXXX51",
      "__v": 0,
      "detalhes": [],
      "valorTotal": null,
      "dataUltimaOcorrencia": null,
      "quantidade": 0,
      "personInformation": "XXXXXXXXXXXXXXXXXXXXXXXXX"
    },
    "consultaRealizada": {
      "_id": "5XXXXXXXXXXXXXXXXXXXXXXX52",
      "__v": 0,
      "registros": [
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX53",
          "entidadeOrigem": "CDL - RECIFE / PE",
          "dataConsulta": "13/07/2018",
          "ufAssociado": "MG",
          "cidadeAssociado": "MONTES CLAROS",
          "nomeAssociado": "PREMONTES INDUSTRIA E COMERCIO LTDA"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX54",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "13/07/2018",
          "ufAssociado": "SP",
          "cidadeAssociado": "SAO PAULO",
          "nomeAssociado": "SAFRA"
        },
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX55",
          "entidadeOrigem": "SAO PAULO / SP",
          "dataConsulta": "07/07/2018",
          "ufAssociado": "SP",
          "cidadeAssociado": "SAO PAULO",
          "nomeAssociado": "SAFRA"
        }
      ],
      "quantidadeDiasConsultado": "90",
      "quantidade": 3,
      "personInformation": "XXXXXXXXXXXXXXXXXXXXXXXXX"
    },
    "ccf": {
      "_id": "5XXXXXXXXXXXXXXXXXXXXXXXe",
      "__v": 0,
      "detalhes": [],
      "dataUltimaOcorrencia": null,
      "quantidade": 0,
      "personInformation": "XXXXXXXXXXXXXXXXXXXXXXXXX"
    },
    "pendenciaSpc": {
      "_id": "5XXXXXXXXXXXXXXXXXXXXXXX56",
      "__v": 0,
      "detalhes": [],
      "valorTotal": null,
      "dataUltimaOcorrencia": null,
      "quantidade": 0,
      "personInformation": "XXXXXXXXXXXXXXXXXXXXXXXXX"
    },
    "ultimoEnderecoInformado": {
      "_id": "5XXXXXXXXXXXXXXXXXXXXXXX5a",
      "__v": 0,
      "registros": [
        {
          "_id": "5XXXXXXXXXXXXXXXXXXXXXXX5b",
          "cep": "30575470",
          "uf": "MG",
          "cidade": "BELO HORIZONTE",
          "bairro": "PALMEIRAS",
          "numero": "744",
          "logradouro": "R DARCILIO DE MIRANDA"
        }
      ],
      "quantidade": 0,
      "personInformation": "XXXXXXXXXXXXXXXXXXXXXXXXX"
    },
    "telefoneVinculado": {
      "_id": "5XXXXXXXXXXXXXXXXXXXXXXX50",
      "__v": 0,
      "registros": [],
      "quantidade": 0,
      "personInformation": "XXXXXXXXXXXXXXXXXXXXXXXXX"
    },
    "featuresOpcionais": {
      "_id": "5XXXXXXXXXXXXXXXXXXXXXXXf",
      "__v": 0,
      "email": null,
      "locEndTel": null,
      "score12Meses": null,
      "rendaPresumida": {
        "renda": null,
        "codigo": null,
        "retorno": null
      },
      "participacaoSocietaria": null,
      "score": null,
      "faturamentoPresumido": {
        "codigo": "1",
        "retorno": "CONSTA FATURAMENTO PRESUMIDO PARA O DOCUMENTO INFORMADO",
        "num_funcionarios": "-",
        "porte": "-",
        "filiais": "-",
        "faturamento": "0,00"
      },
      "qsa": {
        "codigo": "1",
        "retorno": "CONSTA QUADRO SOCIETARIO ADMINISTRATIVO PARA O DOCUMENTO INFORMADO",
        "quantidade": "2",
        "registro": [
          {
            "cpfcnpj": "00000000000000",
            "nome_razao": "ATUAL CAMINHOES LTDA - ME",
            "documento": "6101789624",
            "nome": "DIOGO RIBEIRO BARREIRA",
            "qualificacao": "SOCIO",
            "qualificacao_global": "SOCIO",
            "percentual": "-",
            "data": "-"
          },
          {
            "cpfcnpj": "00000000000000",
            "nome_razao": "ATUAL CAMINHOES LTDA - ME",
            "documento": "83708421604",
            "nome": "SILVANO RIBEIRO DE MAGALHAES",
            "qualificacao": "SOCIO-ADMINISTRADOR",
            "qualificacao_global": "SOCIO",
            "percentual": "-",
            "data": "-"
          }
        ]
      },
      "representanteLegal": null,
      "personInformation": "XXXXXXXXXXXXXXXXXXXXXXXXX"
    },
    "ultimoTelefoneInformado": null,
    "telefoneConsultado": {
      "quantidade": 0
    },
    "endCepConsultado": null,
    "baseNegativacao": null,
    "dadosCadastrais": {
      "descricaoNaturezaJuridica": null,
      "codigoNaturezaJuridica": "2062",
      "descricaoCnae": "COMERCIO A VAREJO DE AUTOMOVEIS, CAMIONETAS E UTILITARIOS USADOS",
      "codigoCnae": "4511102",
      "dataFundacao": "30/05/2008",
      "nomeFantasia": "ATUAL CAMINHOES",
      "razaoSocial": "ATUAL CAMINHOES LTDA ME",
      "dataSituacaoCnpj": "19/11/2016",
      "situacaoCnpj": "ATIVA",
      "email": null,
      "estadoCivil": null,
      "tituloEleitor": null,
      "nomePai": null,
      "nomeMae": null,
      "telNum": null,
      "telDdd": null,
      "endEstado": "MG",
      "endCidade": "BETIM",
      "endBairro": "DISTRITO INDUSTRIAL JARDIM PIEMONT NORTE",
      "endCep": "32689898",
      "endComplemento": null,
      "endNum": "1322",
      "endTipoLogradouro": null,
      "endLogradouro": "ROD BR 381 FERNAO DIAS",
      "sexo": null,
      "idade": null,
      "signo": null,
      "rg": null,
      "dataNascimento": null,
      "dataSituacaoCpf": null,
      "situacaoCpf": null,
      "documentoOrigem": null,
      "documento": "123456",
      "nome": null
    },
    "documento": "123456",
    "status": true,
    "createAt": "2018-07-23T19:19:05.895Z"
  }
}
*/
