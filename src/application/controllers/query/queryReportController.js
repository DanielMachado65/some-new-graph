"use case";

const {
  prepareDataToReportQueryMonthly,
  extractAllQueryIdsFromConsumptions,
  getReportNameByMonth,
} = require("../../../domain/query/queryReport/queryReportModule");
const {
  getQueriesByIds,
} = require("../../../domain/query/query/queriesModule");
const {
  extractAllConsumptionIdsFromInvoices,
} = require("../../../domain/billing/consumption/consumptionStatement.module");
const {
  findRelatedUsersByIdAndHierarchyOwner,
} = require("../../../domain/user/user/userModule");
const {
  getPopulatedInvoicesWithConsumptionsAndQueriesToReportQueries,
} = require("../../../domain/billing/invoice/invoice.module");
const {
  getRefMonthToInvoiceFromDate,
  getRefYearToInvoiceFromDate,
} = require("../../../infrastructure/utils/date.util");
const {
  generateBufferFromDataJson,
} = require("../../../infrastructure/utils/excel.util");
const {
  putBufferObject,
  getObject,
  hasObjectOnBucket,
  ALL_BUCKETS,
} = require("../../../infrastructure/services/aws/s3Service");
const ContentTypes = require("../../../infrastructure/constants/content.types.constant");

const getQueriesReportByUser = async (
  userId,
  refMonth = getRefMonthToInvoiceFromDate(),
  refYear = getRefYearToInvoiceFromDate(),
  force = false
) => {
  const Key = getReportNameByMonth(refMonth, refYear, userId);
  if (!force && (await hasObjectOnBucket(ALL_BUCKETS.reports.queries, Key))) {
    const data = await getObject(ALL_BUCKETS.reports.queries, Key);
    return [Key, data.Body];
  }
  const usersRelated = await findRelatedUsersByIdAndHierarchyOwner(userId);
  const billingIds = usersRelated.map((user) => user.billing);
  const invoices = await getPopulatedInvoicesWithConsumptionsAndQueriesToReportQueries(
    parseInt(refMonth),
    parseInt(refYear),
    billingIds
  );
  const consumptions = extractAllConsumptionIdsFromInvoices(invoices);
  const queriesIds = extractAllQueryIdsFromConsumptions(invoices);
  const queries = await getQueriesByIds(queriesIds, { documentQuery: 1 });
  const reportData = prepareDataToReportQueryMonthly(
    consumptions,
    queries,
    usersRelated
  );
  const buffer = generateBufferFromDataJson(reportData, Key);
  await putBufferObject(
    ALL_BUCKETS.reports.queries,
    Key,
    buffer,
    ContentTypes.XLSX
  );
  return [Key, buffer];
};

module.exports = {
  getQueriesReportByUser,
};
