"use strict";

module.exports.applicationErrorHandlerMiddleware = async function (ctx, next) {
  try {
    await next();
  } catch (err) {
    throw new Error(err);
    if (err.status === 401) {
      ctx.type = "json";
      ctx.status = err.status;
      ctx.body = {
        AuthenticationError:
          "Acesso negado. Você não tem permissão para prosseguir com essa solicitação",
        code: 401,
      };
      ctx.app.emit("error", err, this);
    } else {
      ctx.type = "json";
      ctx.status = err.status || 500;

      ctx.body = {
        InternalServerError:
          err.message ||
          "Ops... Algo deu errado! Perdoe-nos pelo inconveniênte. Estamos analisando o problema que causou intermitência nessa requisição, aguarde...",
        code: err.status || 500,
      };
      ctx.app.emit("error", err, this);
    }
  }
};
