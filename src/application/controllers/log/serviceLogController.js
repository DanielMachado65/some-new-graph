(async function () {
  "use strict";

  const serviceLogModule = require("../../../domain/log/serviceLogModule");
  const serviceLogHelper = require("../../../infrastructure/helpers/serviceLog/serviceLogHelper");

  const getLot = async (dateRef, amount) => {
    let response = null;
    try {
      response = await serviceLogModule.getLot(dateRef, amount);
    } catch (err) {
      response = err;
    } finally {
      return response;
    }
  };

  const getLotDesc = async (dateRef, amount) => {
    let response = null;
    try {
      response = await serviceLogModule.getLotDesc(dateRef, amount);
    } catch (err) {
      response = err;
    } finally {
      return response;
    }
  };

  const getSummaryLastWeek = async () => {
    let response = null;
    try {
      response = await serviceLogModule.getSummaryLastWeek();
    } catch (err) {
      response = err;
    } finally {
      return response;
    }
  };

  const getServiceName = async (id) => {
    return await serviceLogModule.getServiceName(id);
  };

  const getLotByRangeDate = async (initDate, endDate) => {
    let response = null;
    try {
      response = await serviceLogModule.getLotByRangeDate(initDate, endDate);
    } catch (err) {
      response = err;
    } finally {
      return response;
    }
  };

  const getByMonthAndYear = async (referenceMonth, referenceYear) => {
    referenceMonth = serviceLogHelper.convertToInt(referenceMonth);
    referenceYear = serviceLogHelper.convertToInt(referenceYear);
    return await serviceLogModule.getByMonthAndYear(
      referenceMonth,
      referenceYear
    );
  };

  const getTotalUsedServices = async (referenceMonth, referenceYear) => {
    const [month, year] = [
      serviceLogHelper.convertToInt(referenceMonth),
      serviceLogHelper.convertToInt(referenceYear),
    ];

    return serviceLogModule.getTotalUsedServices(month, year);
  };

  module.exports = {
    getLot,
    getLotDesc,
    getSummaryLastWeek,
    getServiceName,
    getLotByRangeDate,
    getByMonthAndYear,
    getTotalUsedServices,
  };
})();
