const insuranceTypeMap = new Map();
insuranceTypeMap.set("robbery_and_theft", {
  order: 1,
  isIncluded: true,
  name: "Roubo e Furto + Assistências 24 horas",
  description:
    "Seu carro protegido contra roubo e Furto. Se precisar utilize nossa assistência 24 horas em qualquer lugar do país",
});
insuranceTypeMap.set("unlimited_km", {
  order: 2,
  isIncluded: false,
  name: "Km ilimitado de guincho",
  description:
    "Ao adicionar esse benefício, você poderá utilizar o serviço de guincho para descolar o seu carro ao local desejado sem restrições de quilometragem (Km)",
});
insuranceTypeMap.set("total_loss", {
  order: 3,
  isIncluded: false,
  name: "Perda total",
  description:
    "Cobrimos todos os tipos de perda total do seu veículo, incluindo incêndio e desastres da natureza",
});
insuranceTypeMap.set("partial_loss", {
  order: 4,
  isIncluded: false,
  name: "Perda parcial",
  description:
    "Cobrimos o conserto do carro em caso de acidentes, incluindo batidas, incêndio e desastres da natureza mediante pagamento de uma franquia",
});

const hideValue = (info, index) => {
  if (!info) return "********";
  const visiblePart = info.slice(0, index);
  const hiddenPart = info.slice(index);
  return `${visiblePart}${"*".repeat(hiddenPart.length)}`;
};

const formatCurrency = (value) => {
  try {
    const [integ, dec = "00"] = value.split(".");
    return "R$ " + integ.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.") + "," + dec;
  } catch (error) {
    return null;
  }
};

function getBasicData(vehicle) {
  const dadosBasicos = vehicle.dadosBasicosDoVeiculo || {};

  return {
    anoFabricacao: dadosBasicos.anoFabricacao
      ? dadosBasicos.anoFabricacao
      : vehicle.anoFabricacao || null,
    anoModelo: dadosBasicos.anoModelo
      ? dadosBasicos.anoModelo
      : vehicle.anoModelo || null,
    chassi: hideValue(vehicle.chassi, 4),
    especie:
      typeof vehicle.especieVeiculo === "string"
        ? vehicle.especieVeiculo
        : null,
    marca: dadosBasicos.marca ? dadosBasicos.marca : vehicle.marca || null,
    modelo: dadosBasicos.descricao
      ? dadosBasicos.descricao
      : vehicle.modelo || null,
    numeroDeFotos:
      vehicle.anuncio && Array.isArray(vehicle.anuncio.fotos)
        ? vehicle.anuncio.fotos.length || null
        : null,
    placa: vehicle.placa,
    possuiHistoricoKM:
      Array.isArray(vehicle.historicoKm) && vehicle.historicoKm.length > 0,
    potencia: typeof vehicle.potencia === "string" ? vehicle.potencia : null,
    procedencia:
      typeof vehicle.procedencia === "string" ? vehicle.procedencia : null,
    renavam: hideValue(vehicle.renavam, 4),
    tipoVeiculo:
      typeof vehicle.tipoVeiculo === "string" ? vehicle.tipoVeiculo : null,
  };
}

function getVersions(vehicle) {
  const fipeInfos =
    vehicle.dadosBasicosDoVeiculo &&
    Array.isArray(vehicle.dadosBasicosDoVeiculo.informacoesFipe)
      ? vehicle.dadosBasicosDoVeiculo.informacoesFipe
      : [];

  return fipeInfos.map((reg) => ({
    fipeId: reg.fipeId,
    versao: reg.versao,
  }));
}

function getLast6MonthsOfPriceHistory(historicoPreco) {
  function sortByMonthAndYear(a, b) {
    const yearA = parseInt(a.ano);
    const yearB = parseInt(b.ano);
    const monthA = parseInt(a.mes);
    const monthB = parseInt(b.mes);

    if (yearA < yearB) return -1;
    if (yearB < yearA) return 1;
    if (monthA < monthB) return -1;
    if (monthB < monthA) return 1;
    return 0;
  }

  if (!Array.isArray(historicoPreco)) return null;
  return historicoPreco.sort(sortByMonthAndYear).slice(-6);
}

function getPriceVariation(priceHistory) {
  if (!priceHistory || !priceHistory.length) return null;
  try {
    const start = parseInt(priceHistory[0].valor);
    const end = parseInt(priceHistory[priceHistory.length - 1].valor);
    const variation = ((end - start) / start) * 100;
    return variation < 0
      ? variation.toFixed(2) + "%"
      : "+" + variation.toFixed(2) + "%";
  } catch (error) {
    return null;
  }
}

function filterDataSheetInformation(veiculosFipeRegistros) {
  const dataSheetInformation = {
    desempenho: null,
    consumo: null,
    geral: null,
    transmissao: null,
    freios: null,
    direcao: null,
  };

  veiculosFipeRegistros.forEach((reg) => {
    if (reg.descricao === "Desempenho") {
      dataSheetInformation.desempenho = reg.especificacoes;
    } else if (reg.descricao === "Consumo") {
      dataSheetInformation.consumo = reg.especificacoes;
    } else if (reg.descricao === "Geral") {
      dataSheetInformation.geral = reg.especificacoes;
    } else if (reg.descricao === "Transmissão") {
      dataSheetInformation.transmissao = reg.especificacoes;
    } else if (reg.descricao === "Freios") {
      dataSheetInformation.freios = reg.especificacoes;
    } else if (reg.descricao === "Direção") {
      dataSheetInformation.direcao = reg.especificacoes;
    }
  });

  return dataSheetInformation;
}

function clearDataSheetItems(dataSheet) {
  const MONTHS = [
    "",
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  return dataSheet.map((item) => ({
    fipeId: item.fipeId,
    ref: item.veiculo,
    valorAtual: item.valorAtual,
    variacao: item.variacao,
    precoUltimos6Meses:
      item.precoUltimos6Meses &&
      item.precoUltimos6Meses.map(({ mes, ano, valor }) => ({
        x: `${MONTHS[parseInt(mes)]}/${ano}`,
        y: parseInt(valor),
      })),
    desempenho: item.desempenho
      ? item.desempenho.map(({ propriedade, valor }) => ({
          propriedade,
          valor,
        }))
      : null,
    consumo: item.consumo
      ? item.consumo.map(({ propriedade, valor }) => ({ propriedade, valor }))
      : null,
    geral: item.geral
      ? item.geral.map(({ propriedade, valor }) => ({ propriedade, valor }))
      : null,
    transmissao: item.transmissao
      ? item.transmissao.map(({ propriedade, valor }) => ({
          propriedade,
          valor,
        }))
      : null,
    freios: item.freios
      ? item.freios.map(({ propriedade, valor }) => ({ propriedade, valor }))
      : null,
    direcao: item.direcao
      ? item.direcao.map(({ propriedade, valor }) => ({ propriedade, valor }))
      : null,
  }));
}

function getVehicleNameInVersion(fipeInformation) {
  const brand = (fipeInformation.marca || "").toUpperCase();
  const model = (fipeInformation.modelo || "").toUpperCase();
  const version = (fipeInformation.versao || "").toUpperCase();
  return brand + " " + model + " " + version;
}

function getDataSheet(vehicle) {
  const fipeInfos =
    vehicle.dadosBasicosDoVeiculo &&
    Array.isArray(vehicle.dadosBasicosDoVeiculo.informacoesFipe)
      ? vehicle.dadosBasicosDoVeiculo.informacoesFipe
      : [];
  const fipeVehicles =
    vehicle.fichaTecnica && Array.isArray(vehicle.fichaTecnica.veiculosFipe)
      ? vehicle.fichaTecnica.veiculosFipe
      : [];

  const fipeIds = fipeInfos.map((o) => o.fipeId);
  const currentMonth = new Date().getMonth();
  const dataSheet = [];

  fipeIds.forEach((fipeId) => {
    const fipeInformation = fipeInfos.find((o) => o.fipeId === fipeId);
    const fipeVehicle = fipeVehicles.find((o) => o.fipeId === fipeId);
    const fipeVehicleNormalize = fipeVehicles.find(
      (o) => Number(o.fipeId) === Number(fipeId.replace(/\-/, ""))
    );
    const fipeVehicleRegisters =
      (fipeVehicle &&
        Array.isArray(fipeVehicle.registros) &&
        fipeVehicle.registros) ||
      (fipeVehicleNormalize &&
        Array.isArray(fipeVehicleNormalize.registros) &&
        fipeVehicleNormalize.registros) ||
      [];
    const last6MonthsOfPriceHistory =
      fipeInformation && fipeInformation.historicoPreco
        ? getLast6MonthsOfPriceHistory(fipeInformation.historicoPreco)
        : null;
    const lastMonthData = last6MonthsOfPriceHistory
      ? last6MonthsOfPriceHistory[last6MonthsOfPriceHistory.length - 1]
      : {};
    const lastMonth = lastMonthData.mes
      ? parseInt(lastMonthData.mes)
      : Number.MIN_SAFE_INTEGER;
    const fallbackPrice =
      currentMonth - 1 <= lastMonth ? lastMonthData.valor : null;

    const partOne =
      (fipeInformation && {
        fipeId: fipeId,
        valorAtual: fipeInformation.valorAtual
          ? formatCurrency(fipeInformation.valorAtual)
          : Array.isArray(last6MonthsOfPriceHistory)
          ? formatCurrency(fallbackPrice)
          : null,
        precoUltimos6Meses: last6MonthsOfPriceHistory,
      }) ||
      {};
    const partTwo = filterDataSheetInformation(fipeVehicleRegisters);
    const partThree = {
      variacao: getPriceVariation(partOne.precoUltimos6Meses),
      veiculo: getVehicleNameInVersion(fipeInformation),
    };

    dataSheet.push({ ...partOne, ...partTwo, ...partThree });
  });

  return clearDataSheetItems(dataSheet);
}

const getModelBrandCode = (vehicle) => {
  return vehicle.codigoMarcaModelo;
};

const getOwnersReviewScore = (vehicle) => {
  return vehicle.opiniaoDoDono;
};

const getInsuranceQuote = (vehicle) => {
  const versions =
    (vehicle.cotacaoSeguro &&
      Array.isArray(vehicle.cotacaoSeguro.versoes) &&
      vehicle.cotacaoSeguro.versoes) ||
    [];
  return versions
    .filter(
      (version) =>
        Array.isArray(version.coberturas) && version.coberturas.length > 0
    )
    .map((version) => ({
      externalUrl:
        "https://www.pier.digital/seguro-auto?utm_source=parceiro-olho-no-carro&utm_medium=pc&utm_campaign=at_3_23_lead_pc-onc_parceiro&utm_content=free",
      vehicleVersion: version.versao,
      coverages: version.coberturas
        .map((coverage) => {
          const insurance = insuranceTypeMap.get(coverage.tipoSeguro);
          return (
            insurance && {
              order: insurance.order,
              name: insurance.name,
              description: insurance.description,
              isIncluded: insurance.isIncluded,
              type: coverage.tipoSeguro,
              price: coverage.precoEmCentavos,
            }
          );
        })
        .filter((insurance) => !!insurance)
        .sort((a, b) => a.order - b.order),
    }));
};

const doesBasicDataHaveData = (basicData) => {
  const { placa: _placa, ...rest } = basicData;

  const values = Object.values(rest);
  return values.reduce((acc, next) => acc || Boolean(next), false);
};

const parse = (data) => {
  if (!data) return null;
  const vehicle = data;

  const basicData = getBasicData(vehicle);
  const codeBrandModel = getModelBrandCode(vehicle);
  const dataSheet = getDataSheet(vehicle);
  const versions = getVersions(vehicle);

  const didFound =
    versions.length !== 0 ||
    dataSheet.length !== 0 ||
    codeBrandModel !== null ||
    doesBasicDataHaveData(basicData);

  if (didFound) {
    return {
      brandImageUrl: vehicle.marcaImagem,
      codigoMarcaModelo: codeBrandModel,
      dadosBasicos: basicData,
      fichaTecnica: dataSheet,
      versoes: versions,
      opiniaoDoDono: getOwnersReviewScore(vehicle),
      cotacaoSeguro: getInsuranceQuote(vehicle),
    };
  } else {
    return null;
  }
};

module.exports = {
  parse,
};
