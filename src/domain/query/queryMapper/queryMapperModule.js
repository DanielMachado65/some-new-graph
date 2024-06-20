'use strict';

const queryMapperFacade = require('./queryMapper.facade');

const update = async (id, map) => {
    return queryMapperFacade.update(id, map);
};

module.exports = {
    update,
};
