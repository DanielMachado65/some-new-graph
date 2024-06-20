const HttpRequest = require("axios");
const BASE_URL =
  "https://84jgsz0tvh.execute-api.sa-east-1.amazonaws.com/prod/review";

const capitalizeWord = (word) => {
  return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
};

const takeFirstWord = (sentence) => {
  return sentence.trim().split(" ")[0] || "";
};

const parseOwnerReview = (maybeOwnerId) => {
  const originalName = (maybeOwnerId && maybeOwnerId.name) || null;
  if (originalName.toLowerCase().includes("não informado")) return maybeOwnerId;
  else if (!originalName) return { ...maybeOwnerId, name: "Não Informado" };
  return { ...maybeOwnerId, name: capitalizeWord(takeFirstWord(originalName)) };
};

const parseReview = (review) => ({
  ...review,
  owner_id: parseOwnerReview(review.owner_id),
});

const parseReviews = (reviews) => reviews.map(parseReview);

const sendReview = async function (keys) {
  const result = await HttpRequest.post(BASE_URL, keys);
  return result.data;
};

const getScoreVersionReview = async function (fipeId) {
  const result = await HttpRequest.get(`${BASE_URL}/score/version/${fipeId}`);
  return result.data;
};

const getBrandModelReview = async function (codModelBrand, page, limit) {
  const result = await HttpRequest.get(
    `${BASE_URL}/brand-model/${codModelBrand}?page=${page}&limit=${limit}`
  );
  const maybeData = result && result.data;
  const reviews = (maybeData && maybeData.itens) || [];
  const updatedReviews = parseReviews(reviews);
  return { ...maybeData, itens: updatedReviews };
};

const getVersionReview = async function (fipeId, page, limit) {
  const result = await HttpRequest.get(
    `${BASE_URL}/version/:${fipeId}?page=${page}&limit=${limit}`
  );
  return result.data;
};

const searchOpinions = async function (codModelBrand, fipeId, page, limit) {
  const result = await HttpRequest.post(
    `${BASE_URL}/search-opinions?page=${page}&limit=${limit}`,
    {
      codBrandModel: codModelBrand,
      fipeId: fipeId,
    }
  );

  return result.data;
};

const getScoreBrandModelReview = async function (codModelBrand) {
  const result = await HttpRequest.get(
    `${BASE_URL}/score/brand-model/${codModelBrand}`
  );
  return result.data;
};

const getReportByDate = async function (dtStart, dtEnd) {
  const result = await HttpRequest.get(
    `${BASE_URL}/admin/report/by-date?dtStart=${dtStart}&dtEnd=${dtEnd}`
  );
  return result.data;
};

const getFilteredReviews = async (
  dtStart,
  dtEnd,
  licensePlate = null,
  mail = null,
  fipeId = null
) => {
  let query = `dtStart=${dtStart}&dtEnd=${dtEnd}`;
  query += licensePlate ? `&licensePlate=${licensePlate}` : "&licensePlate=";
  query += mail ? `&mail=${mail}` : "&mail=";
  query += fipeId ? `&fipeId=${fipeId}` : "&fipeId=";

  const result = await HttpRequest.get(`${BASE_URL}/admin/all?${query}`);
  return result.data;
};

const getReviewById = async (id) => {
  const result = await HttpRequest.get(`${BASE_URL}/admin/${id}`);
  return result.data;
};

const getCountReviews = async () => {
  const result = await HttpRequest.get(`${BASE_URL}/admin/count`);
  return result.data;
};

const deleteReview = async (id) => {
  const result = await HttpRequest.delete(`${BASE_URL}/admin/${id}`);
  return result.data;
};

module.exports = {
  sendReview,
  searchOpinions,
  getBrandModelReview,
  getVersionReview,
  getScoreBrandModelReview,
  getScoreVersionReview,
  getReportByDate,
  getFilteredReviews,
  getReviewById,
  getCountReviews,
  deleteReview,
};
