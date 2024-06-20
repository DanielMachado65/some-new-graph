const { MFeedback } = require("mongoose").models;
const {
  BaseRepository,
} = require("../../../infrastructure/repository/BaseRepository");

class FeedbackRepository extends BaseRepository {
  constructor() {
    super(MFeedback);
  }

  findTopRatingsOfAMonthWithUserAndQueryKey(month, year) {
    return MFeedback.find({
      $and: [{ refMonth: month }, { refYear: year }],
    })
      .populate([
        {
          path: "user",
          select: "email",
        },
        {
          path: "query",
          select: "documentQuery refClass",
        },
      ])
      .lean();
  }
}

module.exports = new FeedbackRepository();
