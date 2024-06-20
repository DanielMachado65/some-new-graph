"use strict";

module.exports.BaseRepository = class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return this.model.create(data);
  }

  async getById(id, projection) {
    return this.model.findById(id, projection).lean();
  }

  async find(query, projection) {
    return this.model.find(query, projection).lean();
  }

  async findOne(query, projection) {
    return this.model.findOne(query, projection).lean();
  }

  async updateOne(filter, data, options) {
    const response = await this.model.updateOne(filter, { $set: data }, options);
    const ok = response.acknowledged
    const n = response.matchedCount;
    const nModified = response.modifiedCount;
    const upserted = response.upsertedCount
    return { ...response, ok, n, nModified, upserted };
  }

  async updateMany(filter, data) {
    return this.model.updateMany(filter, { $set: data });
  }

  async countDocuments(filter) {
    return this.model.countDocuments(filter);
  }

  async has(filter) {
    const result = await this.countDocuments(filter);
    return !!result;
  }

  async getAllExceptLogicallyRemoved(filter, defaultValue, projection = {}) {
    try {
      const updatedFilter = { ...filter, deleteAt: null };
      const data = await this.model.find(updatedFilter, projection);
      return data || defaultValue;
    } catch (error) {
      return defaultValue;
    }
  }

  async createWithProjection(data, projection) {
    const document = await this.create(data);
    const object = document.toObject();
    const updatedProjection = projection._id
      ? projection
      : { ...projection, _id: 1 };
    return Object.keys(updatedProjection).reduce((acc, key) => {
      const value = object[key];
      if (value && updatedProjection[key]) acc[key] = value;
      return acc;
    }, {});
  }

  async updateByIdAndReturnNew(id, data, projection = {}) {
    const filter = { _id: id };
    return this.updateOneAndReturnNew(filter, data, projection);
  }

  async updateOneAndReturnNew(filter, data, projection = {}) {
    const filteredData = Object.keys(data).reduce((acc, key) => {
      const value = data[key];
      if (value) acc[key] = data[key];
      return acc;
    }, {});
    const toUpdate = { $set: filteredData };
    const options = { projection, new: true, lean: true, runValidators: true };
    return this.model.findOneAndUpdate(filter, toUpdate, options);
  }

  async updateQueryStatusById(queryId, queryStatus) {
    return this.updateOne({ _id: queryId }, { queryStatus: queryStatus });
  }

  removeByIdLogicallyAndReturnNew(id, projection = {}) {
    const filter = { _id: id };
    return this.removeOneLogicallyAndReturnNew(filter, projection);
  }

  removeOneLogicallyAndReturnNew(filter, projection = {}) {
    const data = { deleteAt: Date.now() };
    return this.updateOneAndReturnNew(filter, data, projection);
  }
};
