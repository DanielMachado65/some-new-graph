const { MCoupon } = require("mongoose").models;
const {
  BaseRepository,
} = require("../../../infrastructure/repository/BaseRepository");

class CouponRepository extends BaseRepository {
  constructor() {
    super(MCoupon);
  }

  async findByNameWithoutLimitation(couponName) {
    return MCoupon.findOne({
      code: couponName,
      "rules.limitUsage": { $ne: 0 },
    });
  }

  async findWithCreatorEmailLean(filters) {
    return MCoupon.find({
      $and: filters,
    })
      .populate([
        {
          path: "creator",
          select: "email type",
        },
      ])
      .lean();
  }

  async countByUserID(userId) {
    return MCoupon.find({ creator: userId }).countDocuments();
  }
}

module.exports = new CouponRepository();
