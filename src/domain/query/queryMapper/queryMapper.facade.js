"use strict";
const queryMapperRepository = require('./components/queryMapper.repository')

const update = async (id, map) => {
  return await queryMapperRepository.updateOne({ _id: id }, map);
};

module.exports = {
  update,
};
