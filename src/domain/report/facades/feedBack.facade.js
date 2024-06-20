"use strict";

const feedbackRepository = require("../../feedback/components/feedback.repository");
const {
  getBrazilianDateFormat,
} = require("../../../infrastructure/utils/date.util");

const getTopRatingsOfFeedbacks = async (month, year) => {
  function parseItens(item) {
    return {
      data: getBrazilianDateFormat(item.createdAt),
      nota: item.evaluation,
      usuario: item.user.email,
      consulta: item.query ? item.query.refClass : "",
      chaveConsultada: item.query ? item.query.documentQuery : "",
      mensagem: item.description || "",
    };
  }

  const data = await feedbackRepository.findTopRatingsOfAMonthWithUserAndQueryKey(
    month,
    year
  );
  return data.map(parseItens);
};

module.exports = {
  getTopRatingsOfFeedbacks,
};
