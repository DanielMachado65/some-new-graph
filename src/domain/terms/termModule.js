'use strict';

const mongoose = require('mongoose');
const MTerm = mongoose.models.MTerm;
const termRepository = require('./components/term.repositoy');

const getLastVersion = async () => {
  return await MTerm.findOne({}).select('version').sort({
    createAt: -1,
  }); // ver implementação com $natural : 1
};

const deactivateAllTerms = async () => {
  await MTerm.updateMany(
    {},
    {
      $set: {
        status: false,
      },
    },
  );
};

const updateTerm = async (data) => {
  let lastTerm = await getLastVersion();
  let _term = new MTerm();
  _term.body = data.body;
  _term.title = data.title;
  _term.version = lastTerm ? parseFloat(lastTerm.version) + 0.1 : 1;
  _term.status = true;
  await deactivateAllTerms();
  _term = await MTerm.create(_term);
  return _term;
};

const getAllTerms = async () => {
  return await MTerm.find({})
    .sort({
      createAt: -1,
    })
    .lean()
    .exec();
};

const getDetailsTerm = async (id) => {
  const cursor = MTerm.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: 'musers',
        localField: '_id',
        foreignField: 'conditions.term',
        as: 'users',
      },
    },
    {
      $project: {
        _id: 1,
        body: 1,
        title: 1,
        status: 1,
        createAt: 1,
        version: 1,
        'users.email': 1,
        'users.name': 1,
        'users.conditions': 1,
      },
    },
  ])
    .cursor({
      batchSize: 0,
    })
    .exec();

  return await cursor.next();
};

const activateTerm = async (id) => {
  await deactivateAllTerms();
  return await termRepository.updateOne(
    {
      _id: id,
    },
    {
      status: true,
    },
  );
};

const getTerm = async () => {
  return MTerm.findOne({
    status: true,
  })
    .lean()
    .exec();
};

module.exports = {
  updateTerm,
  getAllTerms,
  getDetailsTerm,
  activateTerm,
  getTerm,
};