const { MTestDriveQuery } = require("mongoose").models;
const {
  BaseRepository,
} = require("../../../../infrastructure/repository/BaseRepository");

class TestDriveQueryRepository extends BaseRepository {
  constructor() {
    super(MTestDriveQuery);
  }

  search(filter, projection) {
    return MTestDriveQuery.find(filter, projection).lean().limit(400);
  }

  getLasts(filter, projection) {
    return MTestDriveQuery.find(filter, projection)
      .lean()
      .limit(400)
      .sort({ createAt: -1 });
  }

  count() {
    return MTestDriveQuery.estimatedDocumentCount();
  }

  generateTestDriveReport(startDate, endDate) {
    return MTestDriveQuery.aggregate([
      {
        $match: {
          $and: [
            {
              createAt: { $gt: startDate },
            },
            {
              createAt: { $lt: endDate },
            },
          ],
        },
      },
      {
        $project: {
          data: {
            $dateToString: {
              date: "$createAt",
              format: "%d-%m-%Y %H:%M:%S",
            },
          },
          placa: "$documentQuery",
        },
      },
    ]);
  }
}

module.exports = new TestDriveQueryRepository();
