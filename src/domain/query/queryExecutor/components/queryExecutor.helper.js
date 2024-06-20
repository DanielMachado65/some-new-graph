const parseQueryKeys = function (keys) {
  const placa = keys.placa ? keys.placa.toUpperCase() : null;
  const chassi = keys.chassi ? keys.chassi.toUpperCase() : null;
  const motor = keys.motor ? keys.motor.toUpperCase() : null;
  const renavam = keys.renavam ? keys.renavam.toUpperCase() : null;
  const uf = keys.uf ? keys.uf.toUpperCase() : 'SP';
  const cep = keys.cep || "01015100";

  return {
    placa,
    chassi,
    motor,
    renavam,
    uf,
    endereco: { cep },
  };
};

const getServicesFromQueryComposer = function (queryComposer) {
  return queryComposer.services.map((service) => {
    const servicesToSwitch =
      service.switching && service.switching.length ? service.switching : null;
    const switching = servicesToSwitch
      ? servicesToSwitch.map((service) => ({
          supplierName: service.supplier.name,
          supplierCode: service.supplier.supplierCode,
          name: service.name,
          code: service.code,
          priority: service.priority,
        }))
      : null;

    return {
      supplierName: service.supplier.name,
      supplierCode: service.supplier.supplierCode,
      name: service.name,
      code: service.code,
      switching: switching,
    };
  });
};

module.exports = {
  parseQueryKeys,
  getServicesFromQueryComposer,
};
