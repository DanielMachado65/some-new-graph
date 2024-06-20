const serviceLogRepository = require("./components/serviceLog.repository");

const create = (data) => serviceLogRepository.create(data);

module.exports = {
  create,
};
