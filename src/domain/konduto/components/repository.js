'use strict';

const { MKondutoLog } = require('mongoose').models;
const {
    BaseRepository,
} = require('../../../infrastructure/repository/BaseRepository');

class KondutoRepository extends BaseRepository {
    constructor() {
        super(MKondutoLog);
    }

    findOneWithSort(filter, projection, sortBy) {
        return this.model.findOne(filter, projection).sort(sortBy).lean();
    }
}

module.exports = new KondutoRepository();
