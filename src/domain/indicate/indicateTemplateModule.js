"use strict";

const { MIndicateTemplate } = require("mongoose").models;
const indicateTemplateRepository = require('./components/indicateTemplate.repository');

const createIndicateTemplate = async (
  userId,
  { title, description, status, commission, percentage, version, dataToShare }
) => {
  try {
    await MIndicateTemplate.createCollection();
    await MIndicateTemplate.create([
      {
        creator: userId,
        title,
        description,
        status,
        commission,
        percentage,
        version,
        dataToShare,
      },
    ]);
  } catch (_error) {
    return {
      error: "CREATE_MODEL_INDICATE_TEMPLATE_ERROR",
      data: _error,
    };
  }
  return { result: "ok" };
};

const updateIndicateTemplate = async (
  indicateTemplateId,
  {
    creator,
    title,
    description,
    status,
    commission,
    percentage,
    version,
    dataToShare,
  }
) => {
  let indicate = null;
  try {
    await MIndicateTemplate.createCollection();
    indicate = await MIndicateTemplate.findOneAndUpdate(
      {
        _id: indicateTemplateId,
      },
      {
        $set: {
          creator,
          title,
          description,
          status,
          commission,
          percentage,
          version,
          dataToShare,
        },
      },
      {
        upsert: true,
      }
    );
  } catch (_error) {
    return {
      error: "UPDATE_MODEL_INDICATE_TEMPLATE_ERROR",
      data: _error,
    };
  }
  return { result: indicate };
};

const getIndicateTemplateByCreator = async (creatorId) => {
  try {
    const response = await MIndicateTemplate.find({
      creator: creatorId,
    })
      .populate("creator", "name email")
      .exec();
    return { result: response };
  } catch (_error) {
    return {
      error: "GET_INDICATE_TEMPLATE_BY_CREATOR_ERROR",
      data: _error,
    };
  }
};

const getIndicateTemplateById = async (indicateTemplateId) => {
  try {
    const response = await MIndicateTemplate.findById(indicateTemplateId)
      .populate("creator", "name email")
      .exec();
    return { result: response };
  } catch (_error) {
    return { error: "GET_INDICATE_TEMPLATE_BY_ID_ERROR", data: _error };
  }
};

const getEnabledIndicateTemplateById = async (indicateTemplateId) => {
  try {
    const response = await MIndicateTemplate.find({
      _id: indicateTemplateId,
      status: true,
    })
      .populate("creator", "name email")
      .exec();
    return { result: response };
  } catch (_error) {
    return {
      error: "GET_INDICATE_TEMPLATE_ENABLED_BY_ID_ERROR",
      data: _error,
    };
  }
};

const getAllIndicateTemplate = async () => {
  try {
    const response = await MIndicateTemplate.find()
      .populate("creator", "name email")
      .exec();
    return { result: response };
  } catch (_error) {
    return { error: "GET_ALL_INDICATE_TEMPLATE_ERROR", data: _error };
  }
};

const deactivateAllIndicateTemplate = async () => {
  try {
    const response = await indicateTemplateRepository.updateOne(
      {},
      {
        status: false,
      },
      {
        multi: true,
      }
    );
    return { result: response };
  } catch (_error) {
    return {
      error: "DEACTIVATE_ALL_INDICATE_TEMPLATE_ERROR",
      data: _error,
    };
  }
};

const getLastVersionIndicateTemplate = async () => {
  try {
    const response = await MIndicateTemplate.findOne({})
      .select("version")
      .sort({
        createdAt: -1,
      });
    return { result: response };
  } catch (_error) {
    return {
      error: "GET_LAST_VERSION_INDICATE_TEMPLATE_ERROR",
      data: _error,
    };
  }
};

const getIndicateTemplateActivate = async () => {
  try {
    const response = await MIndicateTemplate.find({
      status: true,
    }).exec();
    return { result: response };
  } catch (_error) {
    return {
      error: "GET_ACTIVATE_INDICATE_TEMPLATE_ERROR",
      data: _error,
    };
  }
};

module.exports = {
  createIndicateTemplate,
  updateIndicateTemplate,
  getIndicateTemplateByCreator,
  getIndicateTemplateById,
  getEnabledIndicateTemplateById,
  getAllIndicateTemplate,
  deactivateAllIndicateTemplate,
  getLastVersionIndicateTemplate,
  getIndicateTemplateActivate,
};
