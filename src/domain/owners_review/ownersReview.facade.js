const opinionService = require("../../infrastructure/services/owners_review/owners-review.service");
const marketingSenderService = require("../mail/marketing/marketingSender.service");
const utils = require("../../infrastructure/utils/utils");
const { getUSDateFormat } = require("../../infrastructure/utils/utils");

const ownerReview = async (keys) => {
  const result = await opinionService.sendReview(keys);
  const { user, vehicle, review } = keys;

  marketingSenderService.registerOwnerReview({
    email: user.email,
    firstName: utils.getPositionName(user.name, "FIRST"),
    lastName: utils.getPositionName(user.name, "LAST"),
    brand: vehicle.brandName,
    model: vehicle.modelName,
    plate: review.license_plate,
  });

  return result;
};

const versionReview = async (fipeId, page, limit) => {
  const result = await opinionService.getVersionReview(fipeId, page, limit);
  return result;
};

const brandModelReview = async (codModelBrand, page, limit) => {
  const result = await opinionService.getBrandModelReview(
    codModelBrand,
    page,
    limit
  );
  return result;
};

const searchOpinions = async (codModelBrand = "", fipeId = "", page, limit) => {
  const result = await opinionService.searchOpinions(
    codModelBrand,
    fipeId,
    page,
    limit
  );

  result.itens.forEach((owner, index) => {
    if (owner.owner_id && owner.owner_id.anonymous) {
      const fiarstName = owner.owner_id.name.split(" ");
      result.itens[index].owner_id.name = fiarstName[0];
      result.itens[index].owner_id.email = "";
    }
  });

  return result;
};

const scoreVersionReview = async (fipeId) => {
  const result = await opinionService.getScoreVersionReview(fipeId);
  return result;
};

const scoreBrandModelReview = async (codModelBrand) => {
  const result = await opinionService.getScoreBrandModelReview(codModelBrand);
  return result;
};

const reportByDate = async (month, year) => {
  const dt = new Date();
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

  return await opinionService.getReportByDate(
    getUSDateFormat(dtFirstMonthDay),
    getUSDateFormat(dtLastMonthDay)
  );
};

const filteredReviews = async (dtStart, dtEnd, licensePlate, mail, fipeId) => {
  const dtFirstDay = getUSDateFormat(new Date(dtStart));
  const dtLastDay = getUSDateFormat(new Date(dtEnd));
  return await opinionService.getFilteredReviews(
    dtFirstDay,
    dtLastDay,
    licensePlate,
    mail,
    fipeId
  );
};

const reviewById = async (id) => {
  const result = await opinionService.getReviewById(id);
  return Array.isArray(result) && result.length > 0 ? result[0] : null;
};

const countReviews = async () => {
  return await opinionService.getCountReviews();
};

const deleteReview = async (id) => {
  return await opinionService.deleteReview(id);
};

module.exports = {
  ownerReview,
  versionReview,
  brandModelReview,
  scoreVersionReview,
  scoreBrandModelReview,
  searchOpinions,
  reportByDate,
  filteredReviews,
  reviewById,
  countReviews,
  deleteReview,
};
