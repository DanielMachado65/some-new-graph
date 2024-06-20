const { MQuery } = require("mongoose").models;
const {
  BaseRepository,
} = require("../../../../infrastructure/repository/BaseRepository");

class QueryRepository extends BaseRepository {
  constructor() {
    super(MQuery);
  }

  async getMostRecentAnnouncements(queryId, limit) {
    return MQuery.aggregate([
      {
        $match: {
          _id: queryId,
        },
      },
      {
        $project: {
          _id: 0,
          historicoAnuncios: "$responseJSON.historicoAnuncios",
        },
      },
      {
        $unwind: "$historicoAnuncios",
      },
      {
        $sort: {
          "historicoAnuncios.data": -1,
        },
      },
      {
        $limit: limit,
      },
      {
        $replaceRoot: {
          newRoot: "$historicoAnuncios",
        },
      },
      {
        $project: {
          _id: 0,
          "opcionais._id": 0,
          "fotos._id": 0,
        },
      },
    ]);
  }

  async deleteAnnouncement(queryId) {
    await MQuery.updateOne(
      { _id: queryId },
      {
        $set: {
          "responseJSON.anuncio": {},
        },
        $pop: {
          "responseJSON.historicoAnuncios": 1,
        },
      }
    );
  }

  async deleteAnnouncementsFromHistory(queryId, announcementsToRemove) {
    const announcementsDate = announcementsToRemove.map(
      (announcement) => announcement.data
    );

    await MQuery.updateOne(
      {
        _id: queryId,
      },
      {
        $pull: {
          "responseJSON.historicoAnuncios": {
            data: {
              $in: announcementsDate,
            },
          },
          "responseJSON.historicoKm": {
            dataInclusao: {
              $in: announcementsDate,
            },
          },
        },
      }
    );
  }

  async getHistoryQueriesByPages(userid, options) {
    const filter = {
      $or: [
        {
          $and: [{ status: true }, { user: userid }],
        },
        {
          $and: [
            { status: false },
            { executionTime: 0 },
            { stackResult: { $eq: [] } },
            { failedServices: { $eq: [] } },
            { user: userid },
          ],
        },
      ],
    };

    return await MQuery.paginate(filter, { sort: { _id: -1 }, ...options });
  }

  async getHistoryQueriesBySeach(userid, search) {
    const regex = { $regex: "^" + search, $options: "i" };
    const filter = {
      $or: [
        {
          $and: [
            { status: true },
            { user: userid },
            {
              $or: [
                { "keys.placa": regex },
                { "keys.chassi": regex },
                { "keys.motor": regex },
              ],
            },
          ],
        },
        {
          $and: [
            { status: false },
            { executionTime: 0 },
            { stackResult: { $eq: [] } },
            { failedServices: { $eq: [] } },
            { user: userid },
            {
              $or: [
                { "keys.placa": regex },
                { "keys.chassi": regex },
                { "keys.motor": regex },
              ],
            },
          ],
        },
      ],
    };

    return await MQuery.find(filter).sort({ _id: -1 });
  }

  async setAnnouncement(queryId, announcement) {
    await MQuery.updateOne(
      {
        _id: queryId,
      },
      {
        $set: {
          "responseJSON.anuncio": announcement,
        },
      }
    );
  }

  async getByIdAndPopulate(queryId) {
    return MQuery.findOne({
      _id: queryId,
    }).populate("user");
  }

  async getByIdAndPopulateLean(queryId) {
    return MQuery.findOne({
      _id: queryId,
    })
      .populate("user")
      .lean();
  }
}

module.exports = new QueryRepository();
