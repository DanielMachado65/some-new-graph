"use strict";

const {
  MPlan,
  MPriceTable,
  MQueryComposer,
  MSubscription,
  MPayment,
} = require("mongoose").models;
const subscriptionModule = require("./subscriptionModule");
const iuguService = require("../../infrastructure/services/iugu/iugu.service");
const userModule = require("../user/user/userModule");

const createPlan = async (creatorId, plan) => {
  let responseData = {
    error: null,
    data: null,
  };

  const _user = await userModule.getById(creatorId);

  if (!_user) {
    responseData.error = "The creatorId must be sent";
    return responseData;
  }

  try {
    await MPlan.createCollection();
    try {
      const arrPlanObject = await MPlan.create([
        {
          creator: creatorId,
          name: plan.name,
          interval: plan.interval,
          intervalType: plan.intervalType,
          description: plan.description,
          valueCents: plan.valueCents,
          textLabels: plan.textLabels,
          addCredits: plan.addCredits,
          type: plan.type,
          payableWith: plan.payableWith,
        },
      ]);

      let planObject = arrPlanObject[0];
      responseData.data = planObject;

      let responseObjectIugu = await iuguService.createPlan({
        name: planObject.name,
        interval: planObject.interval,
        interval_type: planObject.intervalType,
        value_cents: planObject.valueCents,
        identifier: planObject._id,
        payable_with: planObject.payableWith,
      });

      const externalId = responseObjectIugu.id;
      const planId = planObject._id;

      responseData.data = await MPlan.findOneAndUpdate(
        {
          _id: planId,
        },
        {
          $set: {
            externalId: externalId,
          },
        },
        {
          upsert: true,
        }
      );
    } catch (error) {
      responseData.error = error.message;
      responseData.data = null;
    }
  } catch (error) {
    responseData.error = error.message;
  }
  return responseData;
};

const updatePlan = async (planId, plan) => {
  let responseData = {
    error: null,
    data: null,
  };

  try {
    const response = await iuguService.getPlanByIdentifier(planId);
    if (!response) {
      return responseData;
    }

    try {
      await iuguService.updatePlan(response.id, {
        name: plan.name,
        interval: plan.interval,
        interval_type: plan.intervalType,
        value_cents: plan.valueCents,
      });
      responseData.data = await MPlan.findOneAndUpdate(
        {
          _id: planId,
        },
        {
          $set: {
            name: plan.name,
            interval: plan.interval,
            intervalType: plan.intervalType,
            valueCents: plan.valueCents,
            description: plan.description,
            textLabels: plan.textLabels,
            addCredits: plan.addCredits,
            type: plan.type,
          },
        },
        {
          upsert: true,
        }
      );
    } catch (error) {
      responseData.error = error.message;
      responseData.data = null;
    }
  } catch (error) {
    responseData.error = error.message;
  }
  return responseData;
};

const getPlan = async (planId) => {
  return await MPlan.findById(planId)
    .populate("creator", "name email")
    .exec();
};

const getPlanByName = async (name, isPublicRoute = false) => {
  if (isPublicRoute) {
    return await MPlan.findOne({ name: name, status: true })
      .select("_id name valueCents")
      .exec();
  }

  return await MPlan.findOne({ name })
    .populate("creator", "name email")
    .exec();
};

const getPlans = async (isPublicRoute = false) => {
  if (isPublicRoute) {
    const [plans, priceTables, queryComposers] = await Promise.all([
      MPlan.find({ status: true })
        .select("_id name type valueCents textLabels")
        .lean(),
      MPriceTable.find({}).select({ _id: 0, plan: 1, template: 1 }).lean(),
      MQueryComposer.find({})
        .select({ _id: 0, queryCode: 1, name: 1 })
        .lean(),
    ]);
    const QUERY_COMPOSERS_MAP = {};
    const QUERIES_OF_PLANS_MAP = {};

    queryComposers.forEach(({ queryCode, name }) => {
      QUERY_COMPOSERS_MAP[queryCode] = name;
    });

    priceTables.forEach(({ plan, template }) => {
      if (plan) {
        const queries = template.map(({ querycode, totalPrice }) => ({
          name: QUERY_COMPOSERS_MAP[querycode],
          price: totalPrice.toFixed(2),
        }));
        QUERIES_OF_PLANS_MAP[plan] = queries;
      }
    });

    return plans.map((plan) => ({
      ...plan,
      queries: QUERIES_OF_PLANS_MAP[plan._id] || [],
    }));
  }

  return await MPlan.find({}).populate("creator", "name email").exec();
};

const deletePlan = async (planId) => {
  let responseData = {
    error: "Not was possible remove this plan",
  };

  try {
    let response = await iuguService.getPlanByIdentifier(planId);

    if (!response) {
      return (responseData.error =
        "Not was possible find and remove this plan");
    }

    response = await iuguService.deletePlan(response.id);

    if (!response) {
      return responseData;
    }

    await deactivateAllSubscriptionsByPlan(planId);

    await MPlan.findOneAndUpdate(
      {
        _id: planId,
      },
      {
        $set: {
          status: false,
          deactivatedAt: Date.now(),
        },
      },
      {
        upsert: true,
      }
    );
  } catch (error) {
    responseData.error = error;
  }
  return null;
};

const deactivateAllSubscriptionsByPlan = async (planId) => {
  try {
    const subscriptions = await MSubscription.find({ plan: planId });

    if (subscriptions.length)
      await subscriptions.forEach((subscription) => {
        const subscriptionId = subscription._id;
        subscriptionModule.deactivateSubscription(subscriptionId);
      });
  } catch (e) {
    console.log(e);
  }
  return;
};

const getBatchByIds = async (plansIds) => {
  if (!plansIds || !Array.isArray(plansIds) || plansIds.length === 0)
    return { result: [] };

  try {
    const prePlans = await MPlan.find({
      _id: { $in: plansIds },
    })
      .lean()
      .exec();
    const hasAllPlans = prePlans.length === new Set(plansIds).size;

    if (hasAllPlans) {
      const plans = plansIds.map((planId) => {
        return prePlans.find((prePlan) => prePlan._id.toString() === planId);
      });

      return { result: plans };
    } else {
      return { error: "INVALID_PLAN_ERROR" };
    }
  } catch (error) {
    return { error: "UNKNOWN_PLAN_ERROR" };
  }
};

const createPayment = async function (planId, billingId) {
  const response = { result: null, error: false };
  const plan = await MPlan.findOne({ _id: planId }).lean();
  if (!plan) {
    response.error = true;
  } else {
    const PAYMENT = {
      billing: billingId,
      status: "paid",
      totalPrice: plan.valueCents / 100,
      realPrice: plan.valueCents / 100,
      paid: true,
      type: "credit_card",
      items: [
        {
          name: plan.name,
          realValue: plan.valueCents / 100,
          value: plan.valueCents / 100,
          amount: 1,
        },
      ],
    };
    const payment = await MPayment.create(PAYMENT);
    response.result = JSON.parse(JSON.stringify(payment));
  }
  return response;
};

const getTypesOnCart = async function (signatures) {
  try {
    const response = {
      monitoring: 0,
      monthlyPlan: 0,
    };

    for (const signature of signatures) {
      const plan = await MPlan.findOne({ _id: signature }).lean();
      if (plan && plan.type == 1) response.monitoring += 1;
      else if (plan && plan.type === null) response.monthlyPlan += 1;
    }
    return response;
  } catch (error) {
    return null;
  }
};

module.exports = {
  createPlan,
  getPlan,
  getPlanByName,
  getPlans,
  updatePlan,
  deletePlan,
  getBatchByIds,
  createPayment,
  getTypesOnCart,
};