"use strict";

const mongoose = require("mongoose");
const { MPriceTable } = mongoose.models;
const {
  BaseRepository,
} = require("../../../../infrastructure/repository/BaseRepository");

class PriceTableRepository extends BaseRepository {
  constructor() {
    super(MPriceTable);
  }

  async getQueryProducts({ priceTableId }) {
    return this.model
      .aggregate([
        {
          $match: {
            _id: priceTableId,
          },
        },
        {
          $unwind: "$template",
        },
        {
          $replaceRoot: {
            newRoot: "$template",
          },
        },
        {
          $lookup: {
            from: "mquerycomposers",
            localField: "querycode",
            foreignField: "queryCode",
            as: "queryComposer",
          },
        },
        {
          $unwind: "$queryComposer",
        },
        {
          $lookup: {
            from: "mfaqs",
            localField: "queryComposer.faq",
            foreignField: "_id",
            as: "queryComposer.faq",
          },
        },
        {
          $lookup: {
            from: "mqueryinfos",
            localField: "queryComposer.queryInfos",
            foreignField: "_id",
            as: "queryComposer.queryInfos",
          },
        },
        {
          $lookup: {
            from: "mtestimonials",
            localField: "queryComposer.testimonials",
            foreignField: "_id",
            as: "queryComposer.testimonials",
          },
        },
        {
          $addFields: {
            faq: {
              $filter: {
                input: "$queryComposer.faq",
                as: "item",
                cond: { $eq: ["$$item.deleteAt", null] },
              },
            },
            queryInfos: {
              $filter: {
                input: "$queryComposer.queryInfos",
                as: "item",
                cond: { $eq: ["$$item.deleteAt", null] },
              },
            },
            testimonials: {
              $filter: {
                input: "$queryComposer.testimonials",
                as: "item",
                cond: { $eq: ["$$item.deleteAt", null] },
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            name: "$queryComposer.name",
            code: "$queryComposer.queryCode",
            exampleQuery: "$queryComposer.exampleQuery",
            isRecommended: "$queryComposer.isRecommended",
            showInComparisonTable: "$queryComposer.showInComparisonTable",
            title: "$queryComposer.title",
            fullDescription: "$queryComposer.fullDescription",
            shortDescription: "$queryComposer.shortDescription",
            faq: {
              $map: {
                input: "$queryComposer.faq",
                as: "item",
                in: {
                  title: "$$item.title",
                  answer: "$$item.answer",
                  type: "$item.type",
                },
              },
            },
            queryInfos: {
              $map: {
                input: "$queryComposer.queryInfos",
                as: "item",
                in: {
                  image: "$$item.image",
                  name: "$$item.name",
                  description: "$$item.description",
                  isAvailable: "$$item.isAvailable",
                  isAvailableToOthers: "$$item.isAvailableToOthers",
                },
              },
            },
            testimonials: {
              $map: {
                input: "$queryComposer.testimonials",
                as: "item",
                in: {
                  authorName: "$$item.authorName",
                  content: "$$item.content",
                  user: "$$item.user",
                },
              },
            },
            marketingPrice: "$marketingPrice",
            totalPrice: "$totalPrice",
            buyable: "$queryComposer.buyable",
          },
        },
        {
          $sort: {
            totalPrice: -1,
          },
        },
      ])
      .exec();
  }

  async getSignatureProducts() {
    return this.model
      .aggregate([
        {
          $match: {
            plan: {
              $ne: null,
            },
          },
        },
        {
          $unwind: {
            path: "$template",
            preserveNullAndEmptyArrays: false,
          },
        },
        {
          $lookup: {
            from: "mquerycomposers",
            localField: "template.querycode",
            foreignField: "queryCode",
            as: "queryComposer",
          },
        },
        {
          $unwind: {
            path: "$queryComposer",
            preserveNullAndEmptyArrays: false,
          },
        },
        {
          $lookup: {
            from: "mplans",
            localField: "plan",
            foreignField: "_id",
            as: "plan",
          },
        },
        {
          $unwind: {
            path: "$plan",
            preserveNullAndEmptyArrays: false,
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              plan: "$plan",
              query: {
                $mergeObjects: ["$template", "$queryComposer"],
              },
            },
          },
        },
        {
          $group: {
            _id: "$plan._id",
            plan: { $first: "$plan" },
            availableQueries: { $push: "$query" },
          },
        },
        {
          $project: {
            _id: 0,
            name: "$plan.name",
            code: "$plan._id",
            badgeImage: "$plan.badgeImage",
            valueInCents: "$plan.valueCents",
            description: "$plan.description",
            label: {
              $arrayElemAt: ["$plan.textLabels", 1],
            },
            "availableQueries.name": 1,
            "availableQueries.marketingPrice": 1,
            "availableQueries.totalPrice": 1,
            "availableQueries.querycode": 1,
          },
        },
        {
          $sort: {
            valueInCents: 1,
          },
        },
      ])
      .exec();
  }
}

module.exports = new PriceTableRepository();
