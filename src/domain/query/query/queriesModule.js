"use strict";

const { MQuery } = require("mongoose").models;
const MonthsEnum = require("../../../infrastructure/dictionaries/MonthsEnum");
const userModule = require("../../user/user/userModule");
const userFacade = require("../../user/user/user.facade");
const excelGeneratorModule = require("../../support/excelGeneratorModule");
const utils = require("../../../infrastructure/utils/utils");
const _ = require("lodash");
const QueryProjection = require("./components/query.projection");
const HexagonService = require("../../../infrastructure/services/hexagon/hexagon.service");
const queryFacade = require("./query.facade");
const queryRepository = require("../../../domain/query/query/components/query.repository");
const {
  HttpClientService,
} = require("../../../infrastructure/services/http_client");
const {
  CorvetteService,
} = require("../../../infrastructure/services/corvette/corvette.service");

const httpClient = new HttpClientService(
  HttpClientService.strategyBuilder().useAxios()
);
const corvetteService = new CorvetteService(httpClient);

const getJsonResultById = async (id) => {
  return MQuery.findOne({
    _id: id,
  }).select("_id responseJSON keys refClass code createAt status");
};

const createNewQuery = async (query) => {
  return MQuery.create(query);
};

const getById = async (queryId) => {
  return queryRepository.getByIdAndPopulate(queryId);
};

const getByIdWithReprocess = async (queryId) => {
  const [query, reprocess] = await Promise.allSettled([
    queryRepository.getByIdAndPopulateLean(queryId),
    corvetteService.getReprocessQuery(queryId),
  ]);

  return {
    ...query.value,
    autoReprocessInfos: reprocess.value,
  };
};

const getRelevantDataQueryToClient = async (id) => {
  let query = await MQuery.findOne({
    _id: id,
  }).select(
    "name createAt keys refClass responseJSON failedServices status code"
  );
  if (query) {
    if (
      query.responseJSON &&
      query.responseJSON.leilao &&
      query.responseJSON.leilao.Registro
    ) {
      query.responseJSON.leilao.Registro = Array.isArray(
        query.responseJSON.leilao.Registro
      )
        ? query.responseJSON.leilao.Registro
        : [query.responseJSON.leilao.Registro];
      query.responseJSON.leilao = {
        descricao: query.responseJSON.leilao.DescricaoRetorno,
        registros: query.responseJSON.leilao.Registro.map((o) => {
          return {
            anoModelo: o.AnoModelo,
            cambio: o.NumeroCambio,
            carroceria: o.NumeroCorroceria,
            categoria: o.CategoriaDoVeiculo,
            chassi: o.Chassi,
            combustivel: o.Combustivel,
            comitente: o.Comitente,
            condicaoGeral: o.CondicaoGeralDoVeiculo,
            cor: o.Cor,
            dataLeilao: o.DataLeilao,
            foto1: o.Foto1,
            foto2: o.Foto2,
            foto3: o.Foto3,
            foto4: o.Foto4,
            identificacaoLote: o.Lote,
            leiloeiro: o.Leiloeiro,
            lote: o.Lote,
            marca: o.Marca,
            modelo: o.Modelo,
            motor: o.NumeroMotor,
            numEixos: o.QuantidadeDeEixo,
            numEixoTraseiro: o.NumeroEixoTraseiro,
            patio: o.Patio,
            placa: o.Placa,
            renavam: o.Renavam,
            situacaoChassi: o.SituacaoGeralDoChassi,
            idLeilao: o.IdLeilao,
          };
        }),
      };
    }

    return {
      headerInfos: {
        queryid: query._id,
        code: query.code,
        name: query.refClass,
        date: query.createAt,
      },
      data: query.responseJSON,
      servicesBroken: query.failedServices,
    };
  }
  return null;
};

const findByUserAndStatusCode = async (user, statusCode) => {
  return await MQuery.find({
    $and: [
      {
        user: user,
      },
      {
        statusCode: statusCode,
      },
    ],
  });
};

const countTotalSomeQueryByUserInMonth = async (userid, querycode) => {
  let dt = new Date();
  let firstDay = new Date(dt.getFullYear(), dt.getMonth(), 1);
  let lastDay = new Date(
    dt.getFullYear(),
    dt.getMonth() + 1,
    0,
    23,
    59,
    59,
    59
  );
  let opts = {
    $and: [
      {
        user: {
          $eq: userid,
        },
      },
      {
        code: {
          $eq: querycode,
        },
      },
      {
        status: true,
      },
      {
        createAt: {
          $gte: firstDay,
        },
      },
      {
        createAt: {
          $lte: lastDay,
        },
      },
    ],
  };
  return await MQuery.find(opts).countDocuments();
};

const getHistoryQueriesByMonth = async (userid, month, year) => {
  month = parseInt(month) - 1;
  let responseObject = {
    queries: null,
  };
  let initDate = new Date(year, month, 1);
  let finalDate = new Date(year, month + 1, 0, 23, 59, 59, 59);
  let filter = {
    $and: [
      {
        status: true,
      },
      {
        user: userid,
      },
      {
        createAt: {
          $gte: initDate,
        },
      },
      {
        createAt: {
          $lte: finalDate,
        },
      },
      // {
      //   responseJSON : { $ne: null}
      // }
    ],
  };
  responseObject.queries = (
    await MQuery.find(filter)
      .sort({
        createAt: -1,
      })
      .select(
        "_id code status refClass keys createAt executionTime responseJSON"
      )
      .lean()
      .exec()
  ).map((o) => {
    return {
      _id: o._id,
      code: o.code,
      status: o.status,
      refClass: o.refClass,
      keys: o.keys,
      createAt: o.createAt,
      responseJSON: o.responseJSON != null,
      executionTime: o.executionTime || null,
    };
  });
  return responseObject;
};

const getHistoryQueriesByUser = async (userid, date) => {
  let responseObject = {
    dateReference: null,
    queries: null,
  };
  let limit = 25;
  let filter = date
    ? {
        $and: [
          {
            status: true,
          },
          {
            user: userid,
          },
          {
            createAt: {
              $lte: new Date(date),
            },
          },
        ],
      }
    : {
        $and: [
          {
            status: true,
          },
          {
            user: userid,
          },
        ],
      };

  let queries = await MQuery.find(filter)
    .sort({
      createAt: -1,
    })
    .limit(limit + 1)
    .select("_id code status refClass keys createAt");
  if (queries) {
    if (queries.length > limit) {
      let lastObject = _.last(queries);
      responseObject.dateReference = lastObject.createAt;
      _.remove(queries, (query) => {
        return query._id === lastObject._id;
      });
    }
    responseObject.queries = queries;
  }
  return responseObject;
};

const updateById = async (query) => {
  return await queryRepository.updateOne(
    {
      _id: query._id,
    },
    {
      failedServices: query.failedServices,
      stackResult: query.stackResult,
      responseJSON: query.responseJSON,
    }
  );
};

const doubleCheck = async (userid, queryCode, queryKeys) => {
  let _dt = new Date();
  _dt.setDate(_dt.getDate() - 1);
  let users = await userModule.getLeanParentSiblingsChildrensUsers(
    userid,
    true
  );

  let filter = {
    $and: [
      {
        status: true,
      },
      {
        //'user': userid
        user: { $in: users },
      },
      {
        code: queryCode,
      },
      {
        createAt: {
          $gte: _dt,
        },
      },
    ],
  };

  if (queryKeys.placa)
    filter.$and.push({
      "keys.placa": queryKeys.placa.toUpperCase(),
    });
  if (queryKeys.chassi)
    filter.$and.push({
      "keys.chassi": queryKeys.chassi,
    });
  if (queryKeys.renavam)
    filter.$and.push({
      "keys.renavam": queryKeys.renavam,
    });
  if (queryKeys.motor)
    filter.$and.push({
      "keys.motor": queryKeys.motor,
    });
  if (queryKeys.cpf)
    filter.$and.push({
      "keys.cpf": queryKeys.cpf,
    });
  if (queryKeys.cnpj)
    filter.$and.push({
      "keys.cnpj": queryKeys.cnpj,
    });
  return MQuery.findOne(filter);
};

const getByDay = async (_dt) => {
  let dtDay = new Date();
  dtDay.setHours(0);
  dtDay.setMinutes(0);
  dtDay.setSeconds(0);
  dtDay.setMilliseconds(0);
  return MQuery.find({
    createAt: {
      $gte: dtDay,
    },
  }).select({
    refClass: 1,
    createAt: 1,
    status: 1,
    keys: 1,
  });
};

const getAll = async (
  userid,
  initDate,
  endDate,
  queryDocument,
  email,
  ptid,
  queryId,
  code
) => {
  let filter = {
    $and: [],
  };
  if (ptid) {
    const users = await userModule.getChildrensPartnerFrom(ptid);
    filter.$and.push({
      user: {
        $in: users.map((u) => u._id),
      },
    });
  }
  if (email) {
    let user = await userModule.getByEmail(email);
    if (user) {
      filter.$and.push({
        user: user._id,
      });
    }
  } else if (userid) {
    let users = await userModule.getLeanParentSiblingsChildrensUsers(
      userid,
      false
    );
    filter.$and.push({
      user: { $in: users },
    });
  }
  if (initDate && endDate) {
    initDate = new Date(initDate);
    endDate = new Date(endDate);
    filter.$and.push({
      createAt: {
        $gte: new Date(initDate),
        $lte: new Date(endDate),
      },
    });
  }
  if (queryDocument) {
    filter.$and.push({
      documentQuery: {
        $eq: queryDocument.toUpperCase(),
      },
    });
  }
  if (queryId) {
    filter.$and.push({
      _id: queryId,
    });
  }
  if (code) {
    filter.$and.push({
      code: code,
    });
  }
  let dt = new Date();
  let firstDay = new Date(dt.getFullYear(), dt.getMonth(), 1, 0, 0, 0, 0);
  if (!initDate) initDate = firstDay;
  filter =
    filter.$and.length > 0
      ? filter
      : {
          createAt: {
            $gte: initDate,
          },
        };

  let closureExecuteQuery = async (filter) => {
    return await MQuery.find(
      filter,
      {
        _id: 1,
        createAt: 1,
        user: 1,
        code: 1,
        refClass: 1,
        status: 1,
        log: 1,
        documentQuery: 1,
        documentType: 1,
        executionTime: 1,
        failedServices: 1,
        version: 1,
      },
      {
        keys: 1,
      }
    )
      .populate("user log", "name email code type")
      .sort({
        createAt: -1,
      })
      .limit(100);
  };
  let queries = await closureExecuteQuery(filter);
  let auxArray = _.clone(queries);
  while (auxArray.length > 0 && queries.length < 500) {
    let lastQueryArray = _.last(auxArray);
    let isEmptyFilter = !!!Object.keys(filter).length;
    if (filter.$and) {
      _.remove(filter.$and, (o) => {
        return o.createAt;
      });
      filter.$and.push({
        createAt: {
          $lt: new Date(lastQueryArray.createAt),
        },
      });
      if (initDate)
        filter.$and.push({
          createAt: {
            $gte: new Date(initDate),
          },
        });
    } else if (Object.keys(filter).length > 0) {
      filter = {
        $and: [
          filter,
          {
            createAt: {
              $lt: new Date(lastQueryArray.createAt),
            },
          },
        ],
      };
    } else {
      filter = {
        createAt: {
          $lt: new Date(lastQueryArray.createAt),
        },
      };
    }
    auxArray = await closureExecuteQuery(filter);
    if (auxArray.length > 0 && queries.length < 3000) {
      queries = _.concat(queries, auxArray);
    }
    if (isEmptyFilter) filter = {};
  }
  return queries;
};

const generateReportQueriesByDate = async ({ userId, initDate, endDate }) => {
  const projection = { partner: 1 };
  const users = userId
    ? await userModule.getPartnerAndChildrensFrom(userId, projection)
    : null;
  const startDate = utils.startOfTheDay(initDate);
  const lastDate = utils.endOfTheDay(endDate);
  const filter = {
    $and: [
      { createAt: { $gt: startDate } },
      { createAt: { $lt: lastDate } },
      { status: true },
      { stackResult: { $ne: [] } },
    ],
  };
  if (users && users.find((u) => u.partner))
    filter.$and.push({ user: { $in: users } });

  return MQuery.find(filter, {
    createAt: 1,
    user: 1,
    refClass: 1,
    status: 1,
    documentQuery: 1,
    documentType: 1,
    additionalQueries: 1,
    childQueries: 1,
    executionTime: 1,
  })
    .populate({
      path: "user",
      select: "email name generalData.phoneNumber1",
    })
    .lean();
};

const getExtractyByServices = async (servicesCode, month, year) => {
  month = parseInt(month) - 1;
  let dtLastMonthDay = new Date(year, month + 1, 0, 23, 59, 59, 999);
  let dtFirstMonthDay = new Date(year, month, 1, 0, 0, 0, 0);
  let filter = {
    $and: [
      {
        status: true,
      },
      {
        createAt: {
          $gte: dtFirstMonthDay,
        },
      },
      {
        createAt: {
          $lte: dtLastMonthDay,
        },
      },
      {
        "failedServices.serviceCode": {
          $nin: servicesCode,
        },
      },
    ],
  };

  let opts = {
    path: "stackResult.serviceLog",
    match: {
      serviceCode: {
        $in: servicesCode,
      },
    },
  };

  let select = {
    keys: 1,
    createAt: 1,
    refClass: 1,
    code: 1,
    "stackResult.serviceLog": 1,
  };

  let queriesMonth = await MQuery.find(filter, select).populate(opts).lean();

  let itensConsumption = _.filter(queriesMonth, (it) => {
    if (
      _.find(it.stackResult, (s) => {
        return !!s.serviceLog;
      })
    ) {
      it.createAt ? it.createAt.setHours(it.createAt.getHours() - 3) : null;
      return {
        keys: it.keys,
        createAt: it.createAt,
        refClass: it.refClass,
        code: it.code,
      };
    }
  });

  return {
    total: itensConsumption.length,
    itens: itensConsumption,
  };
};

const updateExecutionTime = async (id, time) => {
  return await queryRepository.updateOne(
    {
      _id: id,
    },
    {
      executionTime: time / 1000,
    }
  );
};

const getExtractyByService = async (serviceCode, month, year) => {
  month = parseInt(month) - 1;
  let dtLastMonthDay = new Date(year, month + 1, 0, 23, 59, 59, 999);
  let dtFirstMonthDay = new Date(year, month, 1, 0, 0, 0, 0);
  let filter = {
    $and: [
      {
        status: true,
      },
      {
        createAt: {
          $gte: dtFirstMonthDay,
        },
      },
      {
        createAt: {
          $lte: dtLastMonthDay,
        },
      },
      {
        "failedServices.serviceCode": {
          $ne: serviceCode,
        },
      },
    ],
  };

  let opts = {
    path: "stackResult.serviceLog",
    match: {
      serviceCode: parseInt(serviceCode),
    },
  };

  let select = {
    keys: 1,
    createAt: 1,
    refClass: 1,
    code: 1,
    "stackResult.serviceLog": 1,
  };

  let queriesMonth = await MQuery.find(filter, select).populate(opts).lean();

  let itensConsumption = _.filter(queriesMonth, (it) => {
    if (
      it.stackResult.find((s) => {
        return !!s.serviceLog;
      })
    ) {
      it.createAt ? it.createAt.setHours(it.createAt.getHours() - 3) : null;
      return {
        keys: it.keys,
        createAt: it.createAt,
        refClass: it.refClass,
        code: it.code,
      };
    }
  });

  return {
    total: itensConsumption.length,
    itens: itensConsumption,
  };
};

function calculateSummeryToQueries(queries) {
  const summery = queries.reduce(
    (acc, curr) => {
      if (curr.status && curr.failedServices.length === 0) acc.success += 1;
      if (curr.status && curr.failedServices.length > 0) acc.partial += 1;
      if (!curr.status) acc.broked += 1;
      return acc;
    },
    {
      total: 0,
      partial: 0,
      broked: 0,
      success: 0,
    }
  );
  summery.total = summery.partial + summery.success + summery.broked;
  return summery;
}

const getSummeryQueryByStatus = async (userid) => {
  const date = getDateFirstDayOnMonth();
  const queries = await MQuery.find(
    {
      user: userid,
      createAt: { $gt: date },
    },
    { status: 1, failedServices: 1 }
  ).lean();
  return calculateSummeryToQueries(queries);
};

function getDateFirstDayOnMonth() {
  const date = new Date();
  date.setDate(1);
  date.setMinutes(0);
  date.setHours(0);
  date.setSeconds(0);
  return date;
}

const getSummeryChildrensQueryByStatus = async (userid) => {
  const users = await userModule.getChildrensFrom(userid);
  const date = getDateFirstDayOnMonth();
  const queries = await MQuery.find(
    {
      user: { $in: users.map((user) => user._id) },
      createAt: { $gt: date },
    },
    { failedServices: 1, status: 1 }
  ).lean();
  return calculateSummeryToQueries(queries);
};

const getChildrensStatement = async (userid, month, year, isReport) => {
  const dt = new Date();
  month = month ? parseInt(month) - 1 : dt.getMonth();
  const dtLastMonthDay = new Date(
    year ? parseInt(year) : dt.getFullYear(),
    month + 1,
    0,
    23,
    59,
    59
  );
  const dtFirstMonthDay = new Date(
    year ? parseInt(year) : dt.getFullYear(),
    month,
    1,
    0,
    0,
    0
  );

  const user = await userModule.getById(userid);
  if (!user) throw new Error("Invalid user id");
  const relatedUsers = [
    {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
    },
    ...(await userModule.getChildrensFrom(userid)).map((u) => {
      return {
        _id: u._id,
        name: u.name,
        email: u.email,
      };
    }),
  ];
  const queryFilter = {
    $and: [
      {
        user: {
          $in: relatedUsers.map((u) => u._id),
        },
      },
      {
        createAt: {
          $gte: dtFirstMonthDay,
          $lte: dtLastMonthDay,
        },
      },
      {
        status: true,
      },
    ],
  };

  async function closureGetQueries(limit, sort) {
    return (
      await MQuery.find(
        queryFilter,
        {
          createAt: 1,
          user: 1,
          refClass: 1,
          status: 1,
          log: 1,
          documentQuery: 1,
          documentType: 1,
        },
        {
          sort,
          limit,
        }
      )
        .populate("log", "code")
        .lean()
        .exec()
    ).map((q) => {
      const __user = relatedUsers.find((u) => u._id === q.user);
      return {
        createAt: q.createAt,
        user: {
          email: __user ? __user.email : "N/D",
          name: __user ? __user.name : "N/D",
        },
        refClass: q.refClass,
        status: q.status,
        log: q.log,
        documentQuery: q.documentQuery,
        documentType: q.documentType,
      };
    });
  }

  if (isReport) {
    const extract = await closureGetQueries();
    return {
      code: 200,
      file: excelGeneratorModule.generateStatementChildrensXlsx(
        extract,
        MonthsEnum(month + 1)
      ),
      month: MonthsEnum(month + 1),
    };
  } else
    return await closureGetQueries(25, {
      createAt: -1,
    });
};

const updateLeilaoRecords = async (key, date) => {
  let response = {
    removedObjects: null,
    updatedObjects: null,
  };
  let filter = { "responseJSON.leilao.registros": { $ne: null } };
  let query = {
    $pull: {
      "responseJSON.leilao.registros": {
        $and: [
          {
            placa: key,
          },
          {
            dataLeilao: date,
          },
        ],
      },
    },
  };

  const tempRemove = await MQuery.updateMany(filter, query);
  const tempUpdated = await MQuery.updateMany(
    {
      "responseJSON.leilao.registros": {
        $eq: [],
      },
    },
    {
      $set: {
        "responseJSON.leilao.descricao":
          "Não consta registro de leilão para o veículo informado",
        "responseJSON.leilao.score": null,
      },
    },
    {
      multi: true,
    }
  );

  response.remove = {
    ...tempRemove,
    n: tempRemove.matchedCount,
    nModified: tempRemove.modifiedCount,
    upserted: tempRemove.upsertedCount,
  };
  response.updatedObjects = {
    ...tempUpdated,
    n: tempUpdated.matchedCount,
    nModified: tempUpdated.modifiedCount,
    upserted: tempUpdated.upsertedCount,
  };

  return response;
};

const updateQueryResponse = async (queryid, newQueyryResponse) => {
  const filter = {
    _id: queryid,
  };
  const query = {
    responseJSON: newQueyryResponse,
  };
  return await queryRepository.updateOne(filter, query);
};

const getQueriesByIds = async (ids, projection) => {
  return MQuery.find(
    {
      _id: { $in: ids },
    },
    projection
  ).lean();
};

const getAnnouncementsFromHistory = async (queryId) => {
  const query = await queryFacade.getById(
    queryId,
    QueryProjection.Announcements
  );

  return (
    (query && query.responseJSON && query.responseJSON.historicoAnuncios) ||
    (query.responseJSON &&
      Array.isArray(query.responseJSON.anuncio) &&
      query.responseJSON.anuncio) ||
    (query.responseJSON &&
      query.responseJSON.anuncio &&
      query.responseJSON.anuncio.placa && [query.responseJSON.anuncio]) ||
    []
  );
};

const deleteAnnouncement = async (queryId) => {
  const query = await queryFacade.getById(
    queryId,
    QueryProjection.Announcements
  );
  const announcementsData = queryFacade.getAnnouncementsData(query);
  await HexagonService.deleteAnnouncement(announcementsData);
  await queryFacade.deleteAnnouncement(queryId);
};

const deleteAnnouncementsFromHistory = async (
  queryId,
  announcementsToRemove
) => {
  try {
    const plate =
      announcementsToRemove.length && announcementsToRemove[0].placa;
    await HexagonService.deleteAnnouncementsFromHistory(plate, {
      announcementsToRemove,
    });
    await queryFacade.deleteAnnouncementsFromHistory(
      queryId,
      announcementsToRemove
    );
    const mostRecentAnnouncements = await queryFacade.getMostRecentAnnouncements(
      queryId,
      1
    );
    const mostRecentAnnouncement =
      mostRecentAnnouncements.length > 0 ? mostRecentAnnouncements[0] : {};
    await queryFacade.setAnnouncement(queryId, mostRecentAnnouncement);
    return getAnnouncementsFromHistory(queryId);
  } catch (error) {
    throw new Error("error");
  }
};

const getHistoryQueriesByPages = async (userid, page, limit) => {
  const parsePageToNumber = Number(page);
  const parseLimitToNumber = Number(limit);

  const data = await queryFacade.getHistoryQueriesByPages(
    userid,
    parsePageToNumber,
    parseLimitToNumber
  );

  const query =
    (data.docs &&
      data.docs.map((element) => ({
        _id: element._id,
        code: element.code,
        status: element.status,
        refClass: element.refClass,
        keys: element.keys,
        documentQuery: element.documentQuery,
        documentType: element.documentType,
        createAt: element.createAt,
        responseJSON:
          element.responseJSON && typeof element.responseJSON === "object",
        executionTime:
          typeof element.executionTime === "number"
            ? element.executionTime
            : null,
      }))) ||
    [];

  return {
    query,
    totalPages: data.totalPages,
    page: data.page,
    hasPrevPage: data.hasPrevPage,
    hasNextPage: data.hasNextPage,
    prevPage: data.prevPage,
    nextPage: data.nextPage,
  };
};

const getHistoryQueriesBySeach = async (userId, search) => {
  const data = await queryFacade.getHistoryQueriesBySeach(userId, search);

  return data.map((element) => ({
    _id: element._id,
    code: element.code,
    status: element.status,
    refClass: element.refClass,
    keys: element.keys,
    createAt: element.createAt,
    responseJSON:
      element.responseJSON && typeof element.responseJSON === "object",
    executionTime: element.executionTime || null,
  }));
};

const parseQuery = (data, maybeClient) => {
  const client = maybeClient !== "mobile" ? "website" : maybeClient;
  return queryFacade.parseQuery(data, client);
};

const regirsterMarketingUser = async (userId, preResponse) => {
  const user = await userFacade.findOne({ _id: userId });
  return queryFacade.regirsterMarketingUser(user, preResponse);
};

const updateStatusQuery = async (queryId, status) => {
  queryFacade.updateStatusQuery(queryId, status);
};

module.exports = {
  createNewQuery,
  getById,
  getRelevantDataQueryToClient,
  findByUserAndStatusCode,
  getJsonResultById,
  countTotalSomeQueryByUserInMonth,
  getHistoryQueriesByUser,
  getHistoryQueriesByMonth,
  getHistoryQueriesByPages,
  getHistoryQueriesBySeach,
  updateById,
  doubleCheck,
  getByDay,
  getAll,
  generateReportQueriesByDate,
  getExtractyByService,
  getExtractyByServices,
  getSummeryQueryByStatus,
  getSummeryChildrensQueryByStatus,
  getChildrensStatement,
  regirsterMarketingUser,
  updateLeilaoRecords,
  updateQueryResponse,
  updateExecutionTime,
  updateStatusQuery,
  getQueriesByIds,
  getAnnouncementsFromHistory,
  deleteAnnouncement,
  deleteAnnouncementsFromHistory,
  getByIdWithReprocess,
  parseQuery,
};
