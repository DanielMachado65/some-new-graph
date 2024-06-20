const testDriveRepository = require("../../query/testDrive/components/testDrive.repository");

function getAvailableVersionsInQuery(basicData, versions) {
  const allVersions =
    Array.isArray(versions) && versions.length
      ? versions
      : Array.isArray(basicData) && basicData.length
      ? basicData
      : [];
  return allVersions.map((v) => v.versao).join("\n");
}

const getChosenVersionsInTestDrive = async function (month, year) {
  const currentDate = new Date();
  const intervalMonth = month ? parseInt(month) : currentDate.getMonth();
  const intervalYear = year ? parseInt(year) : currentDate.getFullYear();
  const fromDate = new Date(intervalYear, intervalMonth, 1, 0, 0, 0, 0);
  const toDate = new Date(intervalYear, intervalMonth + 1, 0, 23, 59, 59, 999);
  const data = await testDriveRepository.generateTestDriveReport(
    fromDate,
    toDate
  );
  return data.map((reg) => ({
    data: reg.data,
    placa: reg.placa,
    id: String(reg._id),
  }));
};

module.exports = {
  getChosenVersionsInTestDrive,
};
