"use strict";

/** Hack for bumping node 12 to 16 */
process.on('unhandledRejection', (reason, promise) => {})

require("dotenv").config();
const numeral = require("numeral");
const consign = require("consign");
const logger = require("koa-logger");
const helmet = require("koa-helmet");
const cors = require("kcors");
const bodyParser = require("koa-bodyparser");
const koaStatic = require("koa-static");
const passport = require("koa-passport");
const session = require("koa-session");
const Koa = require("koa");
const app = new Koa();
const applicationPackage = require("../package.json");
const dataBaseConnectionHandler = require("./infrastructure/database/db");
const { app_secret_keys, api } = require("./infrastructure/config/config");
const {
  applicationErrorHandlerMiddleware,
} = require("./application/middlewares/globalErrorHandler");
const globalLogsMiddleware = require("./application/middlewares/globalLogsMiddleware");
const {
  ErrorTracingService,
} = require("@diegomoura637/sentry-service-package");
const ignoreErrors = require("./infrastructure/dictionaries/ErrorTrackerIgnore.dictionary");
const {
  proxies: uluruProxies,
} = require("./application/routes/proxy/uluru.proxy");

function loadModules() {
  consign({
    cwd: "src",
    locale: "pt-br",
    extensions: [".js"],
    loggingType: "info",
  })
    .include("infrastructure/models")
    .then("infrastructure")
    .then("application/middlewares")
    .then("application/routes/protected")
    .then("application/routes/public")
    .exclude("infrastructure/models/query/MQueryRules.js")
    .exclude("infrastructure/models/query/MQueryMapper.js")
    .into(app);
}

function loadMiddlewares() {
  app.use(session(app));
  app.use(logger());
  app.use(helmet());
  app.use(
    cors({
      credentials: true,
      origin: (ctx) => {
        return ctx.request.headers['origin'] || '*'
      },
      methods: "GET,HEAD,PUT,POST,DELETE,PATCH", // for some reason, removing or modifying doesn't change the response
      headers: ["Content-Type", "Authorization", "Supper"], // for some reason this value doesn't match with actual responses
    })
  );

  uluruProxies.forEach((proxy) => app.use(proxy));

  app.use(
    bodyParser({
      jsonLimit: "10mb",
      formLimit: "2mb",
      textLimit: "10mb",
      onerror: function (err, ctx) {
        ctx.throw("body parse error", 422);
        console.dir(`Error => ${err}`);
      },
    })
  );

  app.use(koaStatic("./src/static/public"));
  app.use(applicationErrorHandlerMiddleware);
  app.use(globalLogsMiddleware);
  app.use(passport.initialize());
  app.use(passport.session());
  app.on("error", (err) => {
    console.error("server instance error", err);
  });
}

function loadRoutes() {
  require("./application/routes/main")(app);
}

function loadAppKeys() {
  app.keys = app_secret_keys;
}

function loadNumeralsLocale() {
  numeral.register("locale", "pt", {
    delimiters: {
      thousands: ".",
      decimal: ",",
    },
    abbreviations: {
      thousand: "k",
      million: "m",
      billion: "b",
      trillion: "t",
    },
    ordinal: function (number) {
      return number === 1 ? "er" : "ème";
    },
    currency: {
      symbol: "R$",
    },
  });

  numeral.locale("pt");
}

function launchInitializationLogs() {
  console.log("Application version => " + applicationPackage.version);
  console.log("Application description => " + applicationPackage.description);
  console.log("Application environment => " + process.env.NODE_ENV);
  console.log("Application port => " + process.env.PORT);
}

module.exports.connectToDataBase = async function () {
  const connection = await dataBaseConnectionHandler.connect();
  if (connection) setGraceFullShutDown(connection);
};

function setGraceFullShutDown(connection) {
  process.on("SIGINT", function () {
    console.info(
      `Gracefull shutdown - Connections alive to die: ${connection.connections.length}`
    );
    connection.connections.forEach((o) => {
      let exitCode = 0;

      o.close()
        .catch(() => (exitCode = 1))
        .finally(() => (process.exit(exitCode)));
    });
  });
}

module.exports.runApplication = function () {
  new ErrorTracingService(ignoreErrors);
  const server = app.listen(api.port, api.ip);
  server.timeout = server.timeout * 3;
};

module.exports.load = async () => {
  loadModules();
  loadMiddlewares();
  loadRoutes();
  loadAppKeys();
  loadNumeralsLocale();
  launchInitializationLogs();
  return app;
};
