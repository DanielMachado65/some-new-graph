"use strict";

const queriesModule = require("../../../domain/query/query/queriesModule");
const weakValidator = require("../../../infrastructure/utils/weakValidator.util");
const {
  responseObject,
} = require("../../../infrastructure/helpers/routerHelper");
const ResponseStatusEnum = require("../../../infrastructure/dictionaries/ResponseStatusEnum");

const getJsonResultById = async (id) => {
  let _result;
  try {
    _result = await queriesModule.getJsonResultById(id);
  } catch (err) {
    _result = err;
  }
  return _result;
};

const getHistoryQueriesByUser = async (userid, date) => {
  let _result = { cod: 200, msg: null };
  try {
    _result.msg = await queriesModule.getHistoryQueriesByUser(userid, date);
  } catch (err) {
    _result.cod = 500;
    _result.msg = err;
  }
  return _result;
};

const getHistoryQueriesByMonth = async (userid, month, year) => {
  let _result = { cod: 200, msg: null };
  try {
    _result.msg = await queriesModule.getHistoryQueriesByMonth(
      userid,
      month,
      year
    );
  } catch (err) {
    _result.cod = 500;
    _result.msg = err;
  }
  return _result;
};

const getHistoryQueriesBySeach = async (userId, search) => {
  return queriesModule.getHistoryQueriesBySeach(userId, search);
};

const getHistoryQueriesByPages = async (userid, page, limit) => {
  return await queriesModule.getHistoryQueriesByPages(userid, page, limit);
};

const getById = async (queryid) => {
  return queriesModule.getById(queryid);
};

const getByIdWithReprocess = async (queryid) => {
  return queriesModule.getByIdWithReprocess(queryid);
};

const getRelevantDataQueryToClientV2 = async (ctx) => {
  try {
    const queryId = ctx.params.id;
    const { client } = ctx.query;
    weakValidator.weakValidation(queryId);
    const preResponse = await queriesModule.getRelevantDataQueryToClient(
      queryId
    );
    const response =
      preResponse && (await queriesModule.parseQuery(preResponse, client));
    return responseObject(ctx, ResponseStatusEnum(200), response);
  } catch (error) {
    return responseObject(ctx, ResponseStatusEnum(500), error);
  }
};

const getRelevantDataQueryToClient = async (queryid) => {
  return queriesModule.getRelevantDataQueryToClient(queryid);
};

const getByDay = async () => {
  return queriesModule.getByDay();
};

const getAll = async (
  userid,
  idt,
  edt,
  queryDocument,
  email,
  ptid,
  queryId,
  code
) => {
  return queriesModule.getAll(
    userid,
    idt,
    edt,
    queryDocument,
    email,
    ptid,
    queryId,
    code
  );
};

const getAllV2 = async ({ userId, initDate, endDate }) => {
  return queriesModule.generateReportQueriesByDate({
    userId,
    initDate,
    endDate,
  });
};

const getExtractyByService = async (serviceCode, month, year) => {
  return queriesModule.getExtractyByService(serviceCode, month, year);
};

const getExtractyByServices = async (servicesCode, month, year) => {
  return queriesModule.getExtractyByServices(servicesCode, month, year);
};

const getSummeryQueryByStatus = async (userid) => {
  return queriesModule.getSummeryQueryByStatus(userid);
};

const getSummeryChildrensQueryByStatus = async (userid) => {
  return queriesModule.getSummeryChildrensQueryByStatus(userid);
};

const getChildrensStatement = async (userid, month, year, isReport) => {
  return queriesModule.getChildrensStatement(userid, month, year, isReport);
};

const updateLeilaoRecords = async (key, date) => {
  return queriesModule.updateLeilaoRecords(key, date);
};

const updateQueryResponse = async (queryid, newResponseJson) => {
  return queriesModule.updateQueryResponse(queryid, newResponseJson);
};

const updateExecutionTime = async (id, time) => {
  return queriesModule.updateExecutionTime(id, time);
};

const getAnnouncementsFromHistory = async (queryId) => {
  return queriesModule.getAnnouncementsFromHistory(queryId);
};

const deleteAnnouncement = async (queryId) => {
  await queriesModule.deleteAnnouncement(queryId);
};

const deleteAnnouncementsFromHistory = async (
  queryId,
  announcementsToRemove
) => {
  return queriesModule.deleteAnnouncementsFromHistory(
    queryId,
    announcementsToRemove
  );
};

const updateStatusQuery = async (queryId, status) => {
  queriesModule.updateStatusQuery(queryId, status);
};

module.exports = {
  getJsonResultById,
  getHistoryQueriesByUser,
  getById,
  getRelevantDataQueryToClientV2,
  getRelevantDataQueryToClient,
  getHistoryQueriesByMonth,
  getHistoryQueriesByPages,
  getHistoryQueriesBySeach,
  getByDay,
  getAll,
  getAllV2,
  getExtractyByService,
  getExtractyByServices,
  getSummeryQueryByStatus,
  getSummeryChildrensQueryByStatus,
  getChildrensStatement,
  updateLeilaoRecords,
  updateQueryResponse,
  updateStatusQuery,
  updateExecutionTime,
  getAnnouncementsFromHistory,
  deleteAnnouncement,
  deleteAnnouncementsFromHistory,
  getByIdWithReprocess,
};
