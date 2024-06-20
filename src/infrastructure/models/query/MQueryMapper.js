"use strict";

const { Schema, model } = require("mongoose");

const MQueryMapperSchema = new Schema({
  createAt: { type: Date, default: Date.now },
  queryComposition: {
    type: Schema.Types.ObjectId,
    ref: "MQueryMapper",
    default: null,
  },
  vehicularDataMapping: {
    acessorios: { type: Boolean },
    analiseRisco: { type: Boolean },
    anoFabricacao: { type: Boolean },
    anoModelo: { type: Boolean },
    anuncio: { type: Boolean },
    cestaBasica: { type: Boolean },
    dadosBasicosDoVeiculo: { type: Boolean },
    baseEstadual: {
      categoria: { type: Boolean },
      chassi: { type: Boolean },
      codigoAgenteFinanceiro: { type: Boolean },
      codigoFinanceira: { type: Boolean },
      combustivel: { type: Boolean },
      comunicacaoInclusao: { type: Boolean },
      comunicacaoVenda: { type: Boolean },
      cor: { type: Boolean },
      dataAlteracaoMotor: { type: Boolean },
      dataEmissaoCrv: { type: Boolean },
      dataInclusaoIntencaoTrocaFinanceira: { type: Boolean },
      dataLimiteRestricaoTributaria: { type: Boolean },
      dataVenda: { type: Boolean },
      dataVigenciaContratoFinanceira: { type: Boolean },
      debitoCetesb: { type: Boolean },
      debitoDer: { type: Boolean },
      debitoDersa: { type: Boolean },
      debitoDetran: { type: Boolean },
      debitoDpvat: { type: Boolean },
      debitoIpva: { type: Boolean },
      debitoLicenciamento: { type: Boolean },
      debitoMultas: { type: Boolean },
      debitoMunicipais: { type: Boolean },
      debitoPoliciaRodoviariaFederal: { type: Boolean },
      debitoRenainf: { type: Boolean },
      docComprador: { type: Boolean },
      especie: { type: Boolean },
      exercicioLicenciamento: { type: Boolean },
      existeDebitoDpvat: { type: Boolean },
      existeDebitoIpva: { type: Boolean },
      existeDebitoLicenciamento: { type: Boolean },
      existeDebitoMulta: { type: Boolean },
      inspecaoAno: { type: Boolean },
      inspecaoCentro: { type: Boolean },
      inspecaoData: { type: Boolean },
      inspecaoSelo: { type: Boolean },
      inspecaoStatus: { type: Boolean },
      intencaoDataInslusao: { type: Boolean },
      intencaoDocFinanceira: { type: Boolean },
      intencaoNomeAgente: { type: Boolean },
      intencaoNomeFinanceira: { type: Boolean },
      intencaoRestricaoFinanceira: { type: Boolean },
      licdata: { type: Boolean },
      motor: { type: Boolean },
      municipio: { type: Boolean },
      notaFiscal: { type: Boolean },
      numContratoFinanceira: { type: Boolean },
      outrasRestricoes1: { type: Boolean },
      outrasRestricoes2: { type: Boolean },
      outrasRestricoes3: { type: Boolean },
      outrasRestricoes4: { type: Boolean },
      placa: { type: Boolean },
      pronome: { type: Boolean },
      pronomeAnterior: { type: Boolean },
      protocoloDetran: { type: Boolean },
      renavam: { type: Boolean },
      restricaoAdminisrativa: { type: Boolean },
      restricaoAmbiental: { type: Boolean },
      restricaoArrendatario: { type: Boolean },
      restricaoDataInclusao: { type: Boolean },
      restricaoDocArrendatario: { type: Boolean },
      restricaoFinanceira: { type: Boolean },
      restricaoGuincho: { type: Boolean },
      restricaoJudicial: { type: Boolean },
      restricaoNomeAgente: { type: Boolean },
      restricaoRenajud: { type: Boolean },
      restricaoRouboFurto: { type: Boolean },
      restricaoTributaria: { type: Boolean },
      situacaoVeiculo: { type: Boolean },
      tipo: { type: Boolean },
      tipoDocComprador: { type: Boolean },
      tipoDocProprietario: { type: Boolean },
      tipoMarcacaoChassi: { type: Boolean },
      uf: { type: Boolean },
    },
    baseNacional: {
      anoFabricacao: { type: Boolean },
      anoModelo: { type: Boolean },
      categoria: { type: Boolean },
      chassi: { type: Boolean },
      combustivel: { type: Boolean },
      cor: { type: Boolean },
      di: { type: Boolean },
      docFaturado: { type: Boolean },
      docProprietario: { type: Boolean },
      dtUltimaAtualizacao: { type: Boolean },
      especie: { type: Boolean },
      especieVeiculo: { type: Boolean },
      indicadorComunicacaoVendas: { type: Boolean },
      indicadorRestricaoRenajud: { type: Boolean },
      motor: { type: Boolean },
      municipio: { type: Boolean },
      ocorrencia: { type: Boolean },
      outrasRestricoes1: { type: Boolean },
      outrasRestricoes2: { type: Boolean },
      outrasRestricoes3: { type: Boolean },
      outrasRestricoes4: { type: Boolean },
      outrasRestricoes5: { type: Boolean },
      outrasRestricoes6: { type: Boolean },
      outrasRestricoes7: { type: Boolean },
      outrasRestricoes8: { type: Boolean },
      placa: { type: Boolean },
      renavam: { type: Boolean },
      restricao1: { type: Boolean },
      restricao2: { type: Boolean },
      restricao3: { type: Boolean },
      restricao4: { type: Boolean },
      restricaoDataInclusao: { type: Boolean },
      restricaoFinanciadora: { type: Boolean },
      restricaoFinanciamento: { type: Boolean },
      restricaoNomeAgente: { type: Boolean },
      restricaoTipoTransacao: { type: Boolean },
      situacaoVeiculo: { type: Boolean },
      tipoDocFaturado: { type: Boolean },
      tipoDocImportadora: { type: Boolean },
      tipoDocProprietario: { type: Boolean },
      tipoMarcacaoChassi: { type: Boolean },
      tipoVeiculo: { type: Boolean },
      uf: { type: Boolean },
      ufFaturado: { type: Boolean },
      dtEmissaoCrv: { type: Boolean },
      nomeProprietario: { type: Boolean },
    },
    caixaCambio: { type: Boolean },
    capacidadeCarga: { type: Boolean },
    capacidadePassageiro: { type: Boolean },
    capMaxTracao: { type: Boolean },
    categoria: { type: Boolean },
    chassi: { type: Boolean },
    cidade: { type: Boolean },
    cilindradas: { type: Boolean },
    cmt: { type: Boolean },
    codigoFipe: { type: Boolean },
    codigoCombustivel: { type: Boolean },
    codigoMarcaModelo: { type: Boolean },
    codigoMunicipio: { type: Boolean },
    combustivel: { type: Boolean },
    corVeiculo: { type: Boolean },
    csv: { type: Boolean },
    debitos: { type: Boolean },
    debitosMultas: { type: Boolean },
    debitosVeiculares: { type: Boolean },
    decodificadorPrecificador: { type: Boolean },
    di: { type: Boolean },
    docFaturado: { type: Boolean },
    docProprietario: { type: Boolean },
    dtAtualizacao: { type: Boolean },
    dtUltimaAtualizacao: { type: Boolean },
    eixos: { type: Boolean },
    eixoTraseiroDif: { type: Boolean },
    especieVeiculo: { type: Boolean },
    fichaTecnica: { type: Boolean },
    gravame: { type: Boolean },
    historicoAnuncios: { type: Boolean },
    historicoConsultas: { type: Boolean },
    historicoKm: { type: Boolean },
    historicoProprietarios: { type: Boolean },
    historicoProprietarios2: { type: Boolean },
    identImportadora: { type: Boolean },
    indicioSinistro: { type: Boolean },
    inspecaoGnv: { type: Boolean },
    km: { type: Boolean },
    leilao: { type: Boolean },
    limiteRestricaoTrib: { type: Boolean },
    linha: { type: Boolean },
    localizadorAgregados: { type: Boolean },
    marca: { type: Boolean },
    marcaModelo: { type: Boolean },
    modelo: { type: Boolean },
    multasRenainf: { type: Boolean },
    municipio: { type: Boolean },
    municipioEmplacamento: { type: Boolean },
    nacionalidade: { type: Boolean },
    numCarroceria: { type: Boolean },
    numFaturado: { type: Boolean },
    numMotor: { type: Boolean },
    numTerceiroEixo: { type: Boolean },
    ocorrencia: { type: Boolean },
    perdaTotal: { type: Boolean },
    pesoBrutoTotal: { type: Boolean },
    placa: { type: Boolean },
    potencia: { type: Boolean },
    procedencia: { type: Boolean },
    proprietarios: {
      primeiroRegistro: { type: Boolean },
      ultimoRegistro: { type: Boolean },
      total: { type: Boolean },
      quantidadePf: { type: Boolean },
      quantidadePJ: { type: Boolean },
    },
    pbt: { type: Boolean },
    qtdPax: { type: Boolean },
    recall: { type: Boolean },
    registroDi: { type: Boolean },
    renajud: { type: Boolean },
    renajuds: { type: Boolean },
    renavam: { type: Boolean },
    restricao1: { type: Boolean },
    restricao2: { type: Boolean },
    restricao3: { type: Boolean },
    restricao4: { type: Boolean },
    restricoes: { type: Boolean },
    restricoesVeiculo: { type: Boolean },
    revisao: { type: Boolean },
    rouboFurto: { type: Boolean },
    score: { type: Boolean },
    situacaoChassi: { type: Boolean },
    situacaoVeiculo: { type: Boolean },
    tipoCarroceria: { type: Boolean },
    tipoDocFaturado: { type: Boolean },
    tipoDocImportadora: { type: Boolean },
    tipoDocProprietario: { type: Boolean },
    tipoMontagem: { type: Boolean },
    tipoVeiculo: { type: Boolean },
    uf: { type: Boolean },
    ufFaturado: { type: Boolean },
    ultimaDataInclusao: { type: Boolean },
    unidadeLocalSRF: { type: Boolean },
    vistorias: { type: Boolean },
  },
  personDataMapping: {
    acoes: { type: Boolean },
    administradores: { type: Boolean },
    atividadeEmpresa: {
      cnae: { type: Boolean },
      percentualCompra: { type: Boolean },
      percentualVendas: { type: Boolean },
      qtdEmpregados: { type: Boolean },
      qtdFiliais: { type: Boolean },
      ramo: { type: Boolean },
    },
    baseNegativacao: { type: Boolean },
    biometria: {
      dataConsulta: { type: Boolean },
      disponivel: { type: Boolean },
      imagemDocumento: { type: Boolean },
      probabilidade: { type: Boolean },
      similaridade: { type: Boolean },
    },
    bloqueios: { type: Boolean },
    bolsaFamilia: { type: Boolean },
    cadastroCnpjCnaesSecundarias: { type: Boolean },
    capitalSocial: {
      capitalAutorizado: { type: Boolean },
      capitalRealizado: { type: Boolean },
      capitalSocial: { type: Boolean },
      nacionalidade: { type: Boolean },
      natureza: { type: Boolean },
      origem: { type: Boolean },
      ultimaAtualizacao: { type: Boolean },
    },
    ccf: {
      dataUltimaOcorrencia: { type: Boolean },
      detalhes: { type: Boolean },
      quantidade: { type: Boolean },
    },
    chequeConsultaOnlineSrs: { quantidade: { type: Boolean } },
    chequeLojista: {
      dataUltimaOcorrencia: { type: Boolean },
      detalhes: { type: Boolean },
      quantidade: { type: Boolean },
      valorTotal: { type: Boolean },
    },
    chequeSemFundoAcheiCCF: {
      dataUltimaOcorrencia: { type: Boolean },
      detalhes: { type: Boolean },
      quantidade: { type: Boolean },
    },
    chequeSemFundoVarejo: {
      dataUltimaOcorrencia: { type: Boolean },
      detalhes: { type: Boolean },
      quantidade: { type: Boolean },
    },
    consultasCredito: {
      quantidade: { type: Boolean },
      quantidadeDiasConsultado: { type: Boolean },
      registros: { type: Boolean },
    },
    contraOrdem: {
      dataUltimaOcorrencia: { type: Boolean },
      detalhes: { type: Boolean },
      quantidade: { type: Boolean },
    },
    contraOrdemDocumentoDiferente: {
      dataUltimaOcorrencia: { type: Boolean },
      detalhes: { type: Boolean },
      quantidade: { type: Boolean },
    },
    contumacia: { quantidade: { type: Boolean } },
    contumaciaSrs: { quantidade: { type: Boolean } },
    cursos: { type: Boolean },
    dadosAgenciaBancaria: { type: Boolean },
    dadosCadastrais: {
      aposentado: { type: Boolean },
      cboCodigo: { type: Boolean },
      cboDescricao: { type: Boolean },
      codigoCnae: { type: Boolean },
      codigoNaturezaJuridica: { type: Boolean },
      cpfMae: { type: Boolean },
      dataAbertura: { type: Boolean },
      dataFundacao: { type: Boolean },
      dataNascimento: { type: Boolean },
      dataSituacaoCnpj: { type: Boolean },
      dataSituacaoCpf: { type: Boolean },
      dependentes: { type: Boolean },
      descricaoCnae: { type: Boolean },
      descricaoCnaeSecundario: { type: Boolean },
      descricaoNaturezaJuridica: { type: Boolean },
      documento: { type: Boolean },
      documentoOrigem: { type: Boolean },
      email: { type: Boolean },
      endBairro: { type: Boolean },
      endCep: { type: Boolean },
      endCidade: { type: Boolean },
      endComplemento: { type: Boolean },
      endEstado: { type: Boolean },
      endLogradouro: { type: Boolean },
      endNum: { type: Boolean },
      endTipoLogradouro: { type: Boolean },
      estadoCivil: { type: Boolean },
      faixaFuncionarios: { type: Boolean },
      faixaIdade: { type: Boolean },
      faturamentoEstimado: { type: Boolean },
      grafiasCnpj: { type: Boolean },
      grauInstrucao: { type: Boolean },
      grupoCnae: { type: Boolean },
      codigoCnaeSecundario: { type: Boolean },
      idade: { type: Boolean },
      nacionalidade: { type: Boolean },
      nire: { type: Boolean },
      nome: { type: Boolean },
      nomeFantasia: { type: Boolean },
      nomeMae: { type: Boolean },
      nomePai: { type: Boolean },
      obitoProvavel: { type: Boolean },
      orgaoExpeditorRg: { type: Boolean },
      porteEmpresa: { type: Boolean },
      quantidadeFuncionarios: { type: Boolean },
      razaoSocial: { type: Boolean },
      receitaDataSituacaoEspecial: { type: Boolean },
      receitaEfr: { type: Boolean },
      receitaMotivoStatus: { type: Boolean },
      receitaSituacaoEspecial: { type: Boolean },
      regimeTributario: { type: Boolean },
      representanteLegal: { type: Boolean },
      rg: { type: Boolean },
      sexo: { type: Boolean },
      signo: { type: Boolean },
      site: { type: Boolean },
      situacaoCpf: { type: Boolean },
      situacaoCnpj: { type: Boolean },
      subgrupoCnae: { type: Boolean },
      telDdd: { type: Boolean },
      telNum: { type: Boolean },
      tipoEmpresa: { type: Boolean },
      tituloEleitor: { type: Boolean },
      ufRg: { type: Boolean },
    },
    dadosCnh: {
      categoria: { type: Boolean },
      dataEmissao: { type: Boolean },
      dataPrimeiraHabilitacao: { type: Boolean },
      impedimento: { type: Boolean },
      numeroEspelho: { type: Boolean },
      numeroRegistro: { type: Boolean },
      numeroRenach: { type: Boolean },
      observacoes: { type: Boolean },
      portaria: { type: Boolean },
      validade: { type: Boolean },
    },
    dadosCriminais: { type: Boolean },
    dataConsulta: { type: Boolean },
    dividaAtiva: { type: Boolean },
    documento: { type: Boolean },
    emails: { type: Boolean },
    empresasRelacionadas: { type: Boolean },
    endCepConsultado: { type: Boolean },
    enderecos: { type: Boolean },
    exames: { type: Boolean },
    faturamentoPresumido: {
      faturamento: { type: Boolean },
      filiais: { type: Boolean },
      numeroFuncionarios: { type: Boolean },
      porte: { type: Boolean },
    },
    filiais: { type: Boolean },
    fornecedor: { relacionamentoMaisAntigo: { type: Boolean } },
    historicoConsultas: { type: Boolean },
    historicoPagamentos: { type: Boolean },
    incorporacaoCisao: { type: Boolean },
    infracoes: { type: Boolean },
    movimentacoes: { type: Boolean },
    participacaoFalencia: { type: Boolean },
    participacoesSocietarias: { type: Boolean },
    pefin: {
      dataUltimaOcorrencia: { type: Boolean },
      detalhes: { type: Boolean },
      quantidade: { type: Boolean },
      valorTotal: { type: Boolean },
    },
    pefinBvs: {
      dadosCadastrais: {
        dataNascimento: { type: Boolean },
        documento: { type: Boolean },
        nome: { type: Boolean },
        nomeMae: { type: Boolean },
      },
      detalhes: { type: Boolean },
      restricao: { type: Boolean },
    },
    pep: { type: Boolean },
    pessoasRelacionadas: { type: Boolean },
    pontuacao: {
      efeitoSuspensivo: { type: Boolean },
      efeitoSuspensivoJud: { type: Boolean },
      infracoesMandatoriaUltimos5Anos: { type: Boolean },
      infracoesMandatoriaUltimos12Meses: { type: Boolean },
      infracoesPontuaveisUltimos5Anos: { type: Boolean },
      infracoesPontuaveisUltimos12Meses: { type: Boolean },
      prazoDefesa: { type: Boolean },
      recursoPenal: { type: Boolean },
      totalPontos: { type: Boolean },
    },
    principaisProdutos: { type: Boolean },
    procedimentos: { type: Boolean },
    processos: { type: Boolean },
    protesto: {
      dataPrimeiraOcorrencia: { type: Boolean },
      dataUltimaOcorrencia: { type: Boolean },
      detalhes: { type: Boolean },
      quantidade: { type: Boolean },
      valorTotal: { type: Boolean },
    },
    //quadroSocietario: { type: Boolean },
    referenciaisNegocios: { type: Boolean },
    registroConsulta: { type: Boolean },
    rendaBeneficioAssistencial: { type: Boolean },
    rendaEmpregador: { type: Boolean },
    rendaPresumida: { type: Boolean },
    restricao: { type: Boolean },
    score12Meses: { type: Boolean },
    scoreChecktudo: {
      descricaoPontualidade: { type: Boolean },
      pontualidadePagamento: { type: Boolean },
      score: { type: Boolean },
    },
    scorePfPj: { type: Boolean },
    socios: { type: Boolean },
    spc: {
      dataUltimaOcorrencia: { type: Boolean },
      detalhes: { type: Boolean },
      quantidade: { type: Boolean },
      valorTotal: { type: Boolean },
    },
    telefoneConsultado: { quantidade: { type: Boolean } },
    telefones: { type: Boolean },
    ultimasConsultas: { type: Boolean },
    veiculos: { type: Boolean },
  },
  personGroupDataMapping: {
    searchKey: { type: Boolean },
    searchKeyType: { type: Boolean },
    //persons:{type: Boolean}
    persons: {
      cidade: { type: Boolean },
      complemento: { type: Boolean },
      dataNascimento: { type: Boolean },
      documento: { type: Boolean },
      nome: { type: Boolean },
      numero: { type: Boolean },
      pessoaRelacionada: { type: Boolean },
      pontuacao: { type: Boolean },
      tags: { type: Boolean },
      tipo: { type: Boolean },
      uf: { type: Boolean },
    },
  },
});

module.exports.MQueryMapper = model("MQueryMapper", MQueryMapperSchema);