const testDriveQueryRepository = require("./components/testDrive.repository");
const testDriveParser = require("./components/testDrive.parser");

const create = (testDriveQuery) =>
  testDriveQueryRepository.create(testDriveQuery);

const findById = (id) => testDriveQueryRepository.getById(id);

const update = (id, data) =>
  testDriveQueryRepository.updateOne({ _id: id }, data);

const parse = (vehicle) => testDriveParser.parse(vehicle);

const getTestDriveQueriesAlreadyDone = ({ id, plate, dateStart, dateEnd }) => {
  const filters = [];
  const projection = {
    createAt: 1,
    documentQuery: 1,
    documentType: 1,
    executionTime: 1,
    refClass: 1,
    status: 1,
    code: 1,
  };

  if (id) {
    filters.push({ _id: id });
  }

  if (plate) {
    const clearPlate = plate.replace("-", "").toUpperCase();
    filters.push({ documentQuery: clearPlate });
  }

  if (dateStart) {
    const time = parseInt(dateStart);
    const start = new Date(time);
    filters.push({ createAt: { $gte: start } });
  }

  if (dateEnd) {
    const time = parseInt(dateEnd);
    const end = new Date(time);
    filters.push({ createAt: { $lte: end } });
  }

  if (filters.length)
    return testDriveQueryRepository.search({ $and: filters }, projection);

  return testDriveQueryRepository.getLasts({}, projection);
};

const count = () => testDriveQueryRepository.count();

module.exports = {
  create,
  findById,
  update,
  parse,
  getTestDriveQueriesAlreadyDone,
  count,
};
