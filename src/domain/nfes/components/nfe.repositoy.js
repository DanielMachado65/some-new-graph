"use strict";

const {
  BaseRepository,
} = require("../../../infrastructure/repository/BaseRepository");
const { MNFe } = require("mongoose").models;

module.exports.NfeRepository = class NfeRepository extends BaseRepository {
  constructor() {
    super(MNFe);
  }

  async updateNfe(nfeId, data) {
    return await this.updateOne({ _id: nfeId }, data);
  }

  async getNFeByPayment(paymentId, project = {}) {
    return await this.model.findOne({ payment: paymentId }, project);
  }

  reportManuallyGeneratedByDate(startDate, endDate, isManuallyGenerated) {
    const pipeline = [
      {
        $match: {
          isManuallyGenerated: isManuallyGenerated,
        }
      },
      {
        $match: {
          createdAt: { $gte: startDate, $lt: endDate },
        },
      },
      {
        $lookup: {
          from: "musers",
          localField: "user",
          foreignField: "_id",
          as: "user",
        }
      },
      {
        $unwind: "$user"
      },
      {
        $lookup: {
          from: "mpayments",
          localField: "payment",
          foreignField: "_id",
          as: "payment",
        }
      },
      {
        $unwind: "$payment"
      },
      {
        $project: {
          _id: 0,
          "ID do pagamento": {
            $toString: "$payment._id",
          },
          "ID da nota fiscal": {
            $toString: "$_id",
          },
          "CPF do cliente": "$user.cpf",
          "Email do cliente": "$user.email",
          "Valor do pagamento": { $toDouble: "$value" },
          "Data do pagamento": "$payment.paymentDate",
          "Link da nota fiscal": "$pdfLink",
        }
      }
    ]

    return this.model.aggregate(pipeline).exec();
  }
};
