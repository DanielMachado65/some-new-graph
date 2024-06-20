"use strict";

const mongoose = require("mongoose");
const { MCompany } = mongoose.models;
const {
  BaseRepository,
} = require("../../../infrastructure/repository/BaseRepository");

class CompanyRepository extends BaseRepository {
  constructor() {
    super(MCompany);
    this.mainId = "5fb285aa8dbae9555c283a6b";
  }

  getFaq() {
    return this.model.aggregate([
      {
        $lookup: {
          from: "mfaqs",
          localField: "faq",
          foreignField: "_id",
          as: "faq",
        },
      },
      {
        $unwind: "$faq",
      },
      {
        $replaceRoot: {
          newRoot: "$faq",
        },
      },
      {
        $match: {
          deleteAt: null,
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          answer: 1,
          type: 1,
        },
      },
    ]);
  }

  async updateFaq(faq) {
    const updatedFaq = faq.map(
      (questionId) => new mongoose.Types.ObjectId(questionId)
    );
    return this.updateOneAndReturnNew(
      {
        _id: this.mainId,
      },
      { faq: updatedFaq }
    );
  }

  async updateMedias(medias) {
    return this.updateOneAndReturnNew({ _id: this.mainId }, { medias });
  }
}

module.exports = new CompanyRepository();
