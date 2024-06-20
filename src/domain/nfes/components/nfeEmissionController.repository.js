"use strict";

const {
    BaseRepository,
} = require("../../../infrastructure/repository/BaseRepository");
const { NFeEmissionController } = require("mongoose").models;

module.exports.NFeEmissionControllerRepository = class NFeEmissionControllerRepository extends BaseRepository {
    constructor() {
        super(NFeEmissionController);
    }

    async getMonthControllerInformation(month, year, projection) {
        return await this.model.findOne({month, year}, projection).lean();
    }

    async removeFromGenerated(month, year, nfeValue) {
        await this.model.updateOne({month, year}, { $inc: { generatedValue: -nfeValue }});
    }

    async incrementGeneratedValue(month, year, nfeValue) {
        await this.model.updateOne({month, year}, { $inc: { generatedValue: nfeValue }});
    }
};
