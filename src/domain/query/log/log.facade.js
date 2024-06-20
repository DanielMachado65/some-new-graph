const logRepository = require("./components/log.repository");

const create = (data) => logRepository.create(data);

module.exports = {
  create,
};
