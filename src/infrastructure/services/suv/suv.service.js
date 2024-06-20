const { default: axios } = require("axios");

const URL_BASE = process.env.SUV_URL_BASE;

async function getSuvLogs(month, year) {
  const { data } = await axios.post(`${URL_BASE}/report/logs`, {
    month: month + 1,
    year: year,
  });

  return data;
}

module.exports = {
  getSuvLogs,
};
