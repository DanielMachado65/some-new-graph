const suvModule = require("./suv.module");

async function getSuvLogs(month, year) {
  if (month > 11 || month < 0) {
    throw new Error("[Erro Interno] O mês invalido para gerar o relatorio.");
  }

  const monthNumber = Number(month);
  const yearNumber = Number(year);
  return await suvModule.getSuvLogs(monthNumber, yearNumber);
}

module.exports = {
  getSuvLogs,
};
