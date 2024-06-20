"use struct";

const mongoose = require("mongoose");
const { MPartnerIncoming } = mongoose.models;
const {
  BaseRepository,
} = require("../../../../infrastructure/repository/BaseRepository");

module.exports.PartnerIncomingRepository = class PartnerIncomingRepository extends BaseRepository {
  constructor() {
    super(MPartnerIncoming);
  }

  getFilterByPartnerPipelineStep(partnerUserId) {
    return {
      $match: {
        partner: new mongoose.Types.ObjectId(partnerUserId),
      },
    };
  }

  getFilterByDatePipelineStep(inclusiveStartDate, exclusiveEndDate) {
    return {
      $match: {
        createdAt: {
          $gte: inclusiveStartDate,
          $lt: exclusiveEndDate,
        },
      },
    };
  }

  getJoinPartnerPipelineStep() {
    return [
      {
        $lookup: {
          from: "musers",
          localField: "partner",
          foreignField: "_id",
          as: "partner",
        },
      },
      { $unwind: "$partner" },
    ];
  }

  getJoinUserPipelineStep() {
    return [
      {
        $lookup: {
          from: "musers",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
    ];
  }

  getGroupByCouponCodePipelineStep() {
    return {
      $group: {
        _id: "$couponCode",
        amountToPay: { $sum: "$incomingRefValue" },
        amountUsed: { $sum: 1 },
      },
    };
  }

  getAllPartnersIncomingsByDate(inclusiveStartDate, exclusiveEndDate) {
    return this.model.aggregate([
      this.getFilterByDatePipelineStep(inclusiveStartDate, exclusiveEndDate),
      ...this.getJoinPartnerPipelineStep(),
      ...this.getJoinUserPipelineStep(),
      {
        $project: {
          _id: 0,
          "Email do parceiro": "$partner.email",
          "Email do usuario": "$user.email",
          "Codigo do cupom": "$couponCode",
          "Valor pago": "$incomingRefValue",
        },
      },
    ]);
  }

  getSinglePartnerIncomingsByDate(
    partnerUserId,
    inclusiveStartDate,
    exclusiveEndDate
  ) {
    return this.model.aggregate([
      this.getFilterByPartnerPipelineStep(partnerUserId),
      this.getFilterByDatePipelineStep(inclusiveStartDate, exclusiveEndDate),
      this.getGroupByCouponCodePipelineStep(),
      {
        $project: {
          _id: 0,
          couponCode: "$_id",
          amountToPay: 1,
          amountUsed: 1,
        },
      },
    ]);
  }
};
