"use struct";

const { MPayment } = require("mongoose").models;
const {
  BaseRepository,
} = require("../../../../../infrastructure/repository/BaseRepository");

module.exports.PaymentRepository = class PaymentRepository extends BaseRepository {
  constructor() {
    super(MPayment);
  }

  findOneWithSort(filter, projection, sortBy) {
    return this.model.findOne(filter, projection).sort(sortBy).lean();
  }

  async getAllPaymentsWithCouponAndUserSortedBy(filter, projection, sortBy) {
    const pipeline = [
      {
        $match: filter,
      },
      {
        $lookup: {
          from: "mcoupons",
          localField: "coupon",
          foreignField: "_id",
          as: "coupon",
        },
      },
      {
        $unwind: {
          path: "$coupon",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $lookup: {
          from: "musers",
          localField: "billing",
          foreignField: "billing",
          as: "user",
        },
      },
      {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $project: projection,
      },
      {
        $sort: sortBy,
      },
      {
        $group: {
          _id: "$coupon",
          total: { $sum: 1 },
          payments: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          _id: 0,
          coupon: "$_id",
          total: 1,
          payments: 1,
        },
      },
    ];

    return this.model.aggregate(pipeline).exec();
  }

  checkIfPaymentHasBeenDone = async (paymentId) => {
    return this.has({ _id: paymentId, paid: true });
  };

  async getOrdersWithFirstCouponUsedIfHave(fromDate, toDate) {
    return this.model.aggregate([
      {
        $match: {
          $and: [
            { createAt: { $gte: fromDate } },
            { createAt: { $lte: toDate } },
            { paid: true },
          ],
        },
      },
      {
        $project: {
          totalPaid: 1,
          createAt: 1,
          coupon: 1,
          billing: 1,
          chargeId: 1,
          items: 1,
        },
      },
      {
        $lookup: {
          from: "musers",
          let: { billing_id: "$billing" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$billing", "$$billing_id"],
                },
              },
            },
            {
              $project: {
                email: 1,
              },
            },
          ],
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $unwind: "$items",
      },
      {
        $lookup: {
          from: "mcoupons",
          let: { coupon_id: "$coupon" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$coupon_id"],
                },
              },
            },
            {
              $project: {
                code: 1,
              },
            },
          ],
          as: "coupon",
        },
      },
      {
        $unwind: {
          path: "$coupon",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          billing: 1,
          createAt: 1,
          email: "$user.email",
          totalPaid: 1,
          orderDate: {
            $dateToString: {
              format: "%d/%m/%Y %H:%M:%S",
              date: "$createAt",
            },
          },
          coupon: "$coupon.code",
          chargeId: 1,
          itemName: "$items.name",
          itemAmount: "$items.amount",
        },
      },
      {
        $lookup: {
          from: "mbillings",
          let: { billing_id: "$billing" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$billing_id"],
                },
              },
            },
            {
              $project: {
                orderRoles: 1,
              },
            },
          ],
          as: "billing",
        },
      },
      {
        $unwind: "$billing",
      },
      {
        $project: {
          firstOrderAnyCouponWasUsed:
            "$billing.orderRoles.hasUsedCouponOnFirstOrder",
          couponCodeUsedInFirstOrder: "$billing.orderRoles.couponCode",
          createAt: 1,
          email: 1,
          totalPaid: 1,
          orderDate: 1,
          coupon: 1,
          chargeId: 1,
          itemName: 1,
          itemAmount: 1,
        },
      },
    ]);
  }

  async getSuccessfullyPaidPaymentsCountByBilling(billingId) {
    return this.model.countDocuments({
      billing: billingId,
      paid: true,
    });
  }

  async getAllPaymentsByPeriod({
    billingId,
    maybeStart,
    maybeEnd,
    maybePaidStart,
    maybePaidEnd,
    status,
  }) {
    const startDateFilter = maybeStart ? { $gte: maybeStart } : {};
    const endDateFilter = maybeEnd ? { $lte: maybeEnd } : {};
    const startPaidDateFilter = maybePaidStart ? { $gte: maybePaidStart } : {};
    const endPaidDateFilter = maybePaidEnd ? { $lte: maybePaidEnd } : {};

    const chargeIdFilter = { chargeId: { $ne: null } };
    const billingFilter = billingId ? { billing: billingId } : {};
    const createdAtFilter =
      maybeStart || maybeEnd
        ? { createAt: { ...startDateFilter, ...endDateFilter } }
        : {};
    const paidAtFilter =
      maybePaidStart || maybePaidEnd
        ? {
            $or: [
              { paymentDate: { ...startPaidDateFilter, ...endPaidDateFilter } },
              // This below is a hack bc of a bug that doesn't register payment date for credit not made in Arc
              {
                createAt: { ...startPaidDateFilter, ...endPaidDateFilter },
                gateway: { $ne: "arc" },
                paid: true,
                type: "credit_card",
              },
            ],
          }
        : {};
    const statusFilter =
      status && status.length ? { status: { $in: status } } : {};

    const pipeline = [
      {
        $match: {
          $and: [
            {
              ...chargeIdFilter,
              ...billingFilter,
              ...createdAtFilter,
              ...statusFilter,
            },
            paidAtFilter,
          ],
        },
      },
      {
        $lookup: {
          from: "musers",
          localField: "billing",
          foreignField: "billing",
          as: "user",
        },
      },
      { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "mbillings",
          localField: "billing",
          foreignField: "_id",
          as: "billing",
        },
      },
      { $unwind: { path: "$billing", preserveNullAndEmptyArrays: true } },
      { $match: { "billing.billingType": { $ne: 2 } } },
      {
        $lookup: {
          from: "mcoupons",
          localField: "coupon",
          foreignField: "_id",
          as: "coupon",
        },
      },
      { $unwind: { path: "$coupon", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          type: 1,
          totalPaid: 1,
          status: 1,
          chargeId: 1,
          items: 1,
          creditCard: 1,
          bankingBillet: 1,
          createAt: 1,
          paymentDate: { $cond: { if: { $gt: ['$paymentDate', null] }, then: '$paymentDate', else: '$createAt' } },
          "billing.orderRoles": 1,
          "billing.billingType": 1,
          "billing.user.name": "$user.name",
          "coupon.code": 1,
        },
      },
      { $sort: { createAt: -1 } },
    ];

    return this.model.aggregate(pipeline).exec();
  }

  async getUserTransactions(billingId, dt) {
    const dtRef = dt ? new Date(dt) : new Date();
    const filter = {
      $and: [{ billing: billingId }, { createAt: { $lte: dtRef } }],
    };
    return this.model
      .find(filter)
      .select("-chargeId")
      .sort({ createAt: -1 })
      .limit(26)
      .lean()
      .exec();
  }

  async getUsersWithSignatureActive(startDate, endDate) {
    const pipeline = [
      {
        $match: {
          $and: [
            { items: { $size: 1 } },
            { "items.signatureId": { $ne: null } },
            { paid: true },
            { createAt: { $gt: startDate } },
            { createAt: { $lt: endDate } },
          ],
        },
      },
      {
        $lookup: {
          from: "musers",
          localField: "billing",
          foreignField: "billing",
          as: "user",
        },
      },
      {
        $unwind: {
          path: "$user",
        },
      },
      {
        $lookup: {
          from: "msubscriptions",
          localField: "user._id",
          foreignField: "creator",
          as: "subscriptions",
        },
      },
      {
        $unwind: {
          path: "$subscriptions",
        },
      },
      {
        $project: {
          "user.name": 1,
          "user.email": 1,
          type: 1,
          paid: 1,
          totalPrice: 1,
          "items.name": 1,
          "user.generalData.phoneNumber1": 1,
          "subscriptions.status": 1,
          createAt: 1,
        },
      },
    ];

    return this.model.aggregate(pipeline);
  }

  async getUserWithPackages(startDate, endDate) {
    const pipeline = [
      {
        $match: {
          $and: [
            { "items.packageid": { $ne: null } },
            { paid: true },
            { createAt: { $gt: startDate } },
            { createAt: { $lt: endDate } },
          ],
        },
      },
      {
        $lookup: {
          from: "musers",
          localField: "billing",
          foreignField: "billing",
          as: "user",
        },
      },
      {
        $unwind: {
          path: "$user",
        },
      },
      {
        $project: {
          "user.name": 1,
          "user.email": 1,
          type: 1,
          paid: 1,
          totalPrice: 1,
          "items.name": 1,
          "user.generalData.phoneNumber1": 1,
          createAt: 1,
        },
      },
    ];

    return this.model.aggregate(pipeline);
  }
};
