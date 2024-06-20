const QueryRepository = require("./components/query.repository");
const QueryHelper = require("./components/query.helper");
const {
  QueryParserService,
} = require("../../../infrastructure/services/queryParser");
const {
  HttpClientService,
} = require("../../../infrastructure/services/http_client");
const marketeingSenderService = require("../../../domain/mail/marketing/marketingSender.service");
const dateUtils = require("../../../infrastructure/utils/date.util");
const utils = require("../../../infrastructure/utils/utils");

const getById = async (queryId, projection) => {
  return QueryRepository.getById(queryId, projection);
};

const getMostRecentAnnouncements = (queryId, limit) => {
  return QueryRepository.getMostRecentAnnouncements(queryId, limit);
};

const deleteAnnouncement = (queryId) => {
  return QueryRepository.deleteAnnouncement(queryId);
};

const deleteAnnouncementsFromHistory = (queryId, announcementsToRemove) => {
  return QueryRepository.deleteAnnouncementsFromHistory(
    queryId,
    announcementsToRemove
  );
};

const setAnnouncement = (queryId, announcement) => {
  return QueryRepository.setAnnouncement(queryId, announcement);
};

const getAnnouncementsData = (query) => {
  return QueryHelper.getAnnouncementsData(query);
};

const cleanUpResponseBundle = (responseBundle, status) => {
  return responseBundle && responseBundle.data
    ? {
        headerInfos: { ...responseBundle.headerInfos, status },
        servicesBroken: responseBundle.servicesBroken,
        data: {
          placa: responseBundle.data.placa,
          marcaModelo: responseBundle.data.marcaModelo,
        },
      }
    : responseBundle;
};

const parseQuery = async (responseBundle, client) => {
  function getQueryCodeAndResponse(responseBundle) {
    return {
      queryCode: responseBundle
        ? responseBundle.headerInfos && responseBundle.headerInfos.code
        : null,
      responseJson: responseBundle ? responseBundle.data : null,
    };
  }

  function queryHasNotFoundResult(responseJson) {
    return !!(
      responseJson && responseJson.msg === "Nenhum registro encontrado."
    );
  }

  const query = await QueryRepository.getById(
    responseBundle.headerInfos.queryid
  );
  const baseUrl = process.env.QUERY_PARSER_URL;
  const httpClient = new HttpClientService(
    HttpClientService.strategyBuilder().useAxios()
  );
  const queryParser = new QueryParserService(httpClient, baseUrl);

  const { queryCode, responseJson } = getQueryCodeAndResponse(responseBundle);
  let queryDslResponse = null;
  if (queryHasNotFoundResult(responseJson)) {
    queryDslResponse = {
      code: queryCode,
      version: 0,
      products: [],
      badges: [],
      components: [],
    };
  } else if (responseJson === null) {
    throw new Error("Error responseJson null");
  } else {
    queryDslResponse = await queryParser.parse(queryCode, client, responseJson);
  }

  return {
    ...cleanUpResponseBundle(responseBundle, query.status),
    queryDslResponse,
  };
};

const findIfHaveRecentQuery = async (users, queryCode, queryKeys) => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  const usersIds = users.map((user) => user._id);

  const filter = {
    $and: [
      {
        status: true,
      },
      {
        user: { $in: usersIds },
      },
      {
        code: queryCode,
      },
      {
        createAt: { $gte: date },
      },
    ],
  };
  if (queryKeys.placa) {
    filter.$and.push({ "keys.placa": queryKeys.placa });
  }
  if (queryKeys.chassi) {
    filter.$and.push({ "keys.chassi": queryKeys.chassi });
  }
  if (queryKeys.renavam) {
    filter.$and.push({ "keys.renavam": queryKeys.renavam });
  }
  if (queryKeys.motor) {
    filter.$and.push({ "keys.motor": queryKeys.motor });
  }

  return QueryRepository.findOne(filter);
};

const getHistoryQueriesByPages = async (userid, page, limit) => {
  if (limit > 10) limit = 10;

  const options = {
    page: page || 0,
    limit: limit,
  };
  return QueryRepository.getHistoryQueriesByPages(userid, options);
};

const getHistoryQueriesBySeach = async (userId, search) => {
  return await QueryRepository.getHistoryQueriesBySeach(userId, search);
};

const create = (data) => QueryRepository.create(data);

const regirsterMarketingUser = async (user, preResponse) => {
  const { placa, marca, marcaModelo, modelo, debitosMultas } =
    preResponse.data && preResponse.data.data;
  const hasDebits = (debitosMultas && debitosMultas.debitos) || [];

  marketeingSenderService.regirsterMarketingUser({
    firstName: utils.getPositionName(user.name, "FIRST"),
    lastName: utils.getPositionName(user.name, "LAST"),
    phoneNumber: (user.generalData && user.generalData.phoneNumber1) || "",
    birthday: dateUtils.getStringDateFormatIn_MM_DD(user.createAt),
    email: user.email,
    plate: placa,
    brand: marca,
    brnadModel: marcaModelo,
    model: modelo,
  });

  if (hasDebits.length)
    marketeingSenderService.registerIsHasDabits({
      firstName: utils.getPositionName(user.name, "FIRST"),
      lastName: utils.getPositionName(user.name, "LAST"),
      email: user.email,
      email: user.email,
      plate: placa,
      brand: marca,
      brnadModel: marcaModelo,
      model: modelo,
    });
};

const updateStatusQuery = async (queryId, status) => {
  await QueryRepository.updateOne({ _id: queryId }, { status: status });
};

module.exports = {
  getById,
  getAnnouncementsData,
  getMostRecentAnnouncements,
  deleteAnnouncement,
  deleteAnnouncementsFromHistory,
  setAnnouncement,
  parseQuery,
  findIfHaveRecentQuery,
  create,
  getHistoryQueriesByPages,
  getHistoryQueriesBySeach,
  regirsterMarketingUser,
  updateStatusQuery,
};
