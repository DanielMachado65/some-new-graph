const { default: axios } = require("axios");

const httpRequest = axios.create({
  baseURL: process.env.TETRIS_BASE_URL,
  validateStatus: () => true,
});

class TetrisService {
  static async getTotalUsedServicesReport(month, year) {
    const { data, status } = await httpRequest.post("/report/used-services", {
      month,
      year,
    });

    return status === 200 ? data : [];
  }
}

module.exports = {
  TetrisService,
};
