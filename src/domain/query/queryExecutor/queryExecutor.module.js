const queryComposerFacade = require("../queryComposer/queryComposer.facade");
const queryFacade = require("../query/query.facade");
const testDriveFacade = require("../testDrive/testDrive.facade");
const userFacade = require("../../user/user/user.facade");
const billingFacade = require("../../billing/billing/billing.facade");
const logFacade = require("../log/log.facade");
const validator = require("./components/queryExecutor.validator");
const helper = require("./components/queryExecutor.helper");
const factory = require("./components/queryExecutor.factory");
const manager = require("./components/queryExecutor.manager");
const cityZipCodeFacade = require("../../city-zipcode/city-zipcode.facade");
const { isDevEnv } = require("../../../infrastructure/config/config");
const {
  isMobileApp,
} = require("../../../infrastructure/helpers/userAgent.helper");
const BlogService = require('./components/blog.service');
const YoutubeService = require('./components/youtube.service');

const getQueryComposer = async function (code) {
  const queryComposer = await queryComposerFacade.getByQueryCodeWithServices(
    code
  );
  if (queryComposer) {
    return queryComposer;
  } else {
    throw new Error("Consulta inexistente ou inválida.");
  }
};

const getUser = async function (id) {
  const user = await userFacade.getById(id);
  if (user) {
    return user;
  } else {
    throw new Error("Problemas com os dados de navegação.");
  }
};

const getBillingOfUser = async function (billingId) {
  const billing = await billingFacade.getByIdWithPriceTable(billingId);
  if (billing) {
    return billing;
  } else {
    throw new Error("Problemas internos.");
  }
};

const doubleCheck = async function (userid, queryCode, queryKeys) {
  const users = await userFacade.getUsersInHierarchy(userid);
  return queryFacade.findIfHaveRecentQuery(users, queryCode, queryKeys);
};

const hasAnEqualQueryMadeRecently = async function (
  user,
  queryCode,
  queryKeys
) {
  if (!userFacade.isUserAnIntegrator(user)) {
    return doubleCheck(user._id, queryCode, queryKeys);
  } else {
    return false;
  }
};

const createQueryDocument = function (queryComposer, user, keys) {
  const data = factory.createQueryObject(queryComposer, user, keys);
  return queryFacade.create(data);
};

const createTestDriveQueryDocument = function (queryComposer, keys, ip, maybeUser) {
  const data = factory.createTestDriveQueryObject(queryComposer, keys, ip, maybeUser);
  return testDriveFacade.create(data);
};

const updateTestDriveQueryData = function (id, data) {
  return testDriveFacade.update(id, data);
};

const createLogDocument = function (user) {
  const data = factory.createLogObject(user);
  return logFacade.create(data);
};

const calcuteExecutionTime = function (startTime) {
  try {
    const now = new Date().getTime();
    const timeInSeconds = (now - startTime) / 1000;
    return timeInSeconds.toFixed(2);
  } catch (error) {
    return null;
  }
};

const createTestDriveResponse = function (testDriveQuery, responseJSON, vehicleReview) {
  try {
    const parsedData = testDriveFacade.parse(responseJSON);
    return factory.createTestDriveResponse(testDriveQuery, parsedData, vehicleReview);
  } catch (error) {
    throw new Error(
      "Não foi possível concluir a consulta. Tente novamente em alguns minutos."
    );
  }
};

const executeQueryComposer = function (queryComposer, queryKeys, log) {
  const services = helper.getServicesFromQueryComposer(queryComposer);
  return manager.executeServices(services, queryKeys, log);
};

const blogService = new BlogService();
const youtubeService = new YoutubeService();

const normalizeVehicleReview = function (responseJSON) {
  const avaliacaoVeicular = responseJSON && responseJSON.avaliacaoVeicular || {};
  const blogPosts = Array.isArray(avaliacaoVeicular.blogPosts)
    ? avaliacaoVeicular.blogPosts
    : [];
  const videoPosts = Array.isArray(avaliacaoVeicular.videoPosts)
    ? avaliacaoVeicular.videoPosts
    : []

  return {
    avaliacaoVeicular: {
      blogPosts: blogPosts,
      videoPosts: videoPosts,
    }
  }
}

const appendDynamicData = async (response) => {
  if (!response) return null;

  const { avaliacaoVeicular, ...rest } = response.data;
  const { blogPosts, videoPosts } = avaliacaoVeicular;
  const postsLinkData = blogPosts.map((blogPost) => blogPost && blogPost.blogUrl).filter(Boolean);
  const videosLinkData = videoPosts.map((videoPost) => videoPost && videoPost.videoUrl).filter(Boolean);

  const posts =
    await Promise.all(
      postsLinkData.map((link) =>
        blogService
          .fetchPostDataFromLink(link)
          .catch(() => null)
      ).filter(Boolean)
    )

  const blogWrapper = posts.length <= 0
    ? null
    : {
      avaliacaoBlog: {
        blogPosts: posts,
        saibaMais: [
          'Nessa área da consulta você pode acessar o texto completo de avaliação do modelo (quando disponível) para saber informações sobre evolução, mudanças e novidades, além dos pontos fortes e fracos do carro ou da moto que você consultou.',
          'Assim você não precisa perder tempo revirando a internet em busca de mais informações sobre o modelo consultado.',
        ],
        urlDescription: 'https://www.olhonocarro.com.br/blog/entendendo-a-consulta-da-olho-no-carro-review-blog-e-review-dos-nossos-parceiros',
        bgColor: 'success'
      }
    };

  const videos =
    await Promise.all(
      videosLinkData.map(async (url) =>
        youtubeService
          .getEmbedInfo(url)
          .catch(() => null)
      ).filter(Boolean)
    );

  const videoWrapper = videos.length <= 0
    ? null
    : {
      avaliacaoYoutube: {
        videoPosts: videos,
        saibaMais: [
          'Nessa área da consulta você pode assistir ao vídeo de avaliação do modelo (quando disponível) para saber informações sobre evolução, mudanças e novidades, além dos pontos fortes e fracos do carro ou da moto que você consultou. Tudo isso de um jeito rápido e fácil de entender.',
          'Assim você não precisa perder tempo revirando a internet em busca de mais informações sobre o modelo consultado.',
        ],
        urlDescription: 'https://www.olhonocarro.com.br/blog/entendendo-a-consulta-da-olho-no-carro-review-blog-e-review-dos-nossos-parceiros',
        bgColor: 'success'
      }
    };

  return {
    ...response,
    data: {
      ...rest,
      ...blogWrapper,
      ...videoWrapper
    }
  }
}

const executeQueryAsTestDrive = async function ({
  queryCode,
  keys,
  navigationToken,
  startTime,
  ip,
  maybeUser,
  userCity,
  userAgent,
}) {
  const queryComposer = await getQueryComposer(queryCode);

  if (!isDevEnv && !isMobileApp(userAgent))
    await validator.validateCaptchaToken(navigationToken);
  validator.validateIfQueryComposerCanBeTestDrive(queryComposer);
  validator.validateIfQueryComposerIsAvailable(queryComposer);
  validator.validateQueryKeys(keys);

  const city = await cityZipCodeFacade.findZipCodeByCityName(userCity);

  const queryKeys = helper.parseQueryKeys({
    ...keys,
    uf: city.state,
    cep: city.zipcode,
  });
  validator.validateQueryKeysInBlackList(queryKeys);

  const testDriveQuery = await createTestDriveQueryDocument(
    queryComposer,
    queryKeys,
    ip,
    maybeUser,
  );

  const { error, stackResult, failedServices } = await executeQueryComposer(
    queryComposer,
    queryKeys
  );

  const { errorInVehicleFetch, responseJSON } = !error
    ? await manager.getVehicle(queryKeys)
    : { errorInVehicleFetch: null, responseJSON: null };

  const queryError = error || errorInVehicleFetch || null;
  const executionTime = calcuteExecutionTime(startTime);

  const vehicleReview = normalizeVehicleReview(responseJSON);
  const response = createTestDriveResponse(testDriveQuery, responseJSON, vehicleReview);

  await updateTestDriveQueryData(testDriveQuery._id.toString(), {
    stackResult,
    failedServices,
    responseJSON: response.data,
    executionTime,
    "log.error": queryError,
  });

  return appendDynamicData(response);
};

const executeQueryAsDefault = async function ({
  queryCode,
  keys,
  duplicity,
  startTime,
  userId,
}) {
  const [queryComposer, user] = await Promise.all([
    getQueryComposer(queryCode),
    getUser(userId),
  ]);
  const userBilling = await getBillingOfUser(user.billing.toString());

  validator.validateIfQueryIsInUserPriceTable(queryCode, userBilling);
  validator.validateIfQueryComposerIsAvailable(queryComposer);
  validator.validateIfUserHasCredits(queryCode, userBilling);
  validator.validateQueryKeys(keys);

  const queryKeys = helper.parseQueryKeys(keys);
  validator.validateQueryKeysInBlackList(queryKeys);

  const queryMadeRecently = duplicity
    ? null
    : await hasAnEqualQueryMadeRecently(user, queryCode, queryKeys);
  if (queryMadeRecently) {
    return factory.createDuplicatedQueryResponse(queryMadeRecently);
  }

  const [query, log] = await Promise.all([
    createQueryDocument(queryComposer, user, queryKeys),
    createLogDocument(user),
  ]);

  // TODO: Não vai funcionar, refatorar
  const paymentResponse = await billingFacade.executePaymentOperation(
    user._id.toString(),
    query,
    log
  );
  if (paymentResponse.err) {
    return factory.createPaymentErrorResponse(
      paymentResponse,
      query,
      queryKeys
    );
  }

  const {
    status,
    errorMessage,
    stackResult,
    failedServices,
  } = await executeQueryComposer(queryComposer, queryKeys, log);
};

module.exports = {
  executeQueryAsTestDrive,
  executeQueryAsDefault,
};
