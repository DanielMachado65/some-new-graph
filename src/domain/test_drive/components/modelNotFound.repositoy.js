const { MModelNotFound } = require("mongoose").models;
const {
  BaseRepository,
} = require("../../../infrastructure/repository/BaseRepository");

class ModelNotFound extends BaseRepository {
  constructor() {
    super(MModelNotFound);
  }

  async addModelNotFound({
    plate,
    brand,
    model,
    codModelBrand,
    fipeId,
    queryId,
    userModelInformation,
  }) {
    await MModelNotFound.create({
      plate,
      brand,
      model,
      codModelBrand,
      fipeId,
      queryId,
      userModelInformation,
    });
  }

  async getModelsNotFoundByDate({ start, end }) {
    const pipeline = [
      {
        $match: {
          createdAt: { $gte: start, $lt: end },
        },
      },
      {
        $project: {
          _id: 0,
          data: "$createdAt",
          placa: "$plate",
          marca: "$brand",
          modelo: "$model",
          codigo: "$codModelBrand",
          fipeId: "$fipeId",
          infos: "$userModelInformation",
          queryId: "$queryId",
        },
      },
    ];
    return MModelNotFound.aggregate(pipeline).exec();
  }
}

module.exports = new ModelNotFound();
