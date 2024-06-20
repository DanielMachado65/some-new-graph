"use strict";

const leadsModule = require("../../../domain/lead/leads.module");
const weakValidator = require("../../../infrastructure/utils/weakValidator.util");
const HttpCodes = require("../../../infrastructure/enumerators/httpCode.enum");
const {
  basicAuthenticationMiddleware,
} = require("../../middlewares/authMiddleware");

const {
  responseObject,
} = require("../../../infrastructure/helpers/routerHelper");

const mount = require("koa-mount");
const Router = require("koa-router");
const LeadsRoutes = new Router();

LeadsRoutes.post("/create-new-lead", createNewLead);
async function createNewLead(ctx) {
  try {
    const { email, name, phone } = ctx.request.body;
    weakValidator.weakValidationToNVariables(email, name, phone);
    await leadsModule.createNewLead(email, name, phone);
    return responseObject(ctx, HttpCodes.SUCCESS, "ok");
  } catch (e) {
    return responseObject(
      ctx,
      e.response.status || HttpCodes.GONE_ERROR,
      e.response.statusText
    );
  }
}

// LeadsRoutes.get("/get-lead-by-id/:id", getLeadById);
// async function getLeadById(ctx) {
//   try {
//     const { id } = ctx.params;
//     weakValidator.weakValidation(id, "LeadId must be sent");
//     const response = await leadsModule.getLeadById(id);
//     return responseObject(ctx, HttpCodes.SUCCESS, response);
//   } catch (e) {
//     return responseObject(
//       ctx,
//       e.response.status || HttpCodes.GONE_ERROR,
//       e.response.statusText
//     );
//   }
// }

// LeadsRoutes.get("/get-all-leads", getAllLeads);
// async function getAllLeads(ctx) {
//   try {
//     const response = await leadsModule.getAllLeads();
//     return responseObject(ctx, HttpCodes.SUCCESS, response);
//   } catch (e) {
//     return responseObject(
//       ctx,
//       e.response.status || HttpCodes.GONE_ERROR,
//       e.response.statusText
//     );
//   }
// }

LeadsRoutes.get("/get-lead-by-email", getLeadByEmail);
async function getLeadByEmail(ctx) {
  try {
    const { email } = ctx.request.query;
    weakValidator.weakValidation(email, "E-mail must be sent");
    const response = await leadsModule.getLeadByEmail(email);
    return responseObject(ctx, HttpCodes.SUCCESS, response);
  } catch (e) {
    return responseObject(
      ctx,
      e.response.status || HttpCodes.GONE_ERROR,
      e.response.statusText
    );
  }
}

LeadsRoutes.post("/create-vehicle-interest", createVehicleInterest);
async function createVehicleInterest(ctx) {
  try {
    const {
      state,
      model,
      brand,
      city,
      startingYear,
      endingYear,
      interested,
      maxMileage,
      maxPrice,
      leadId,
    } = ctx.request.body;
    await leadsModule.createVehicleInterest(
      state,
      model,
      brand,
      city,
      startingYear,
      endingYear,
      interested,
      maxMileage,
      maxPrice,
      leadId
    );
    return responseObject(ctx, HttpCodes.SUCCESS, "ok");
  } catch (e) {
    return responseObject(
      ctx,
      e.response.status || HttpCodes.GONE_ERROR,
      e.response.statusText
    );
  }
}

// LeadsRoutes.get(
//   "/get-vehicle-interest-by-id-and-lead-id",
//   getVehicleInterestByIdAndLeadId
// );
// async function getVehicleInterestByIdAndLeadId(ctx) {
//   try {
//     const { leadId, vehicleInterestId } = ctx.request.query;
//     weakValidator.weakValidation(id, "LeadId must be sent");
//     const response = await leadsModule.getVehicleInterestByIdAndLeadId(
//       leadId,
//       vehicleInterestId
//     );
//     return responseObject(ctx, HttpCodes.SUCCESS, response);
//   } catch (e) {
//     return responseObject(
//       ctx,
//       e.response.status || HttpCodes.GONE_ERROR,
//       e.response.statusText
//     );
//   }
// }
//
// LeadsRoutes.get(
//   "/get-vehicle-interest-by-lead-id/:id",
//   getVehicleInterestByLeadId
// );
// async function getVehicleInterestByLeadId(ctx) {
//   try {
//     const { id } = ctx.params;
//     weakValidator.weakValidation(id, "LeadId must be sent");
//     const response = await leadsModule.getVehicleInterestByLeadId(id);
//     return responseObject(ctx, HttpCodes.SUCCESS, response);
//   } catch (e) {
//     return responseObject(
//       ctx,
//       e.response.status || HttpCodes.GONE_ERROR,
//       e.response.statusText
//     );
//   }
// }
//
// LeadsRoutes.del("/delete-lead/:id", deleteLead);
// async function deleteLead(ctx) {
//   try {
//     const { id } = ctx.params;
//     weakValidator.weakValidation(id, "LeadId must be sent");
//     const response = await leadsModule.deleteLead(id);
//     return responseObject(ctx, HttpCodes.SUCCESS, response);
//   } catch (e) {
//     return responseObject(
//       ctx,
//       e.response.status || HttpCodes.GONE_ERROR,
//       e.response.statusText
//     );
//   }
// }
//
// LeadsRoutes.del("/delete-vehicle-interest", deleteVehicleInterest);
// async function deleteVehicleInterest(ctx) {
//   try {
//     const { leadId, vehicleInterestedId } = ctx.request.query;
//     weakValidator.weakValidationToTwoVariables(leadId, vehicleInterestedId);
//     const response = await leadsModule.deleteVehicleInterest(
//       leadId,
//       vehicleInterestedId
//     );
//     return responseObject(ctx, HttpCodes.SUCCESS, response);
//   } catch (e) {
//     return responseObject(
//       ctx,
//       e.response.status || HttpCodes.GONE_ERROR,
//       e.response.statusText
//     );
//   }
// }
//
// LeadsRoutes.put("/update-lead/:id", updateLead);
// async function updateLead(ctx) {
//   try {
//     const { id } = ctx.params;
//     const { name, phone, email } = ctx.request.body;
//     weakValidator.weakValidation(id, "LeadId must be sent");
//     const response = await leadsModule.updateLead(id, name, phone, email);
//     return responseObject(ctx, HttpCodes.SUCCESS, response);
//   } catch (e) {
//     return responseObject(
//       ctx,
//       e.response.status || HttpCodes.GONE_ERROR,
//       e.response.statusText
//     );
//   }
// }
//
// LeadsRoutes.put("/update-vehicle-interested/:id", updateVehicleInterested);
// async function updateVehicleInterested(ctx) {
//   try {
//     const { id } = ctx.params;
//     const {
//       state,
//       model,
//       brand,
//       city,
//       startingYear,
//       endingYear,
//       interested,
//       acquiredAt,
//       maxMileage,
//       maxPrice,
//     } = ctx.request.body;
//     weakValidator.weakValidation(id, "LeadId must be sent");
//     const response = await leadsModule.updateVehicleInterested(
//       id,
//       state,
//       model,
//       brand,
//       city,
//       startingYear,
//       endingYear,
//       interested,
//       acquiredAt,
//       maxMileage,
//       maxPrice
//     );
//     return responseObject(ctx, HttpCodes.SUCCESS, response);
//   } catch (e) {
//     return responseObject(
//       ctx,
//       e.response.status || HttpCodes.GONE_ERROR,
//       e.response.statusText
//     );
//   }
// }
//
// LeadsRoutes.get("/get-lead-consumptions-by-id/:id", getLeadConsumptionById);
// async function getLeadConsumptionById(ctx) {
//   try {
//     const { id } = ctx.params;
//     weakValidator.weakValidation(id, "LeadId must be sent");
//     const response = await leadsModule.getLeadConsumptionById(id);
//     return responseObject(ctx, HttpCodes.SUCCESS, response);
//   } catch (e) {
//     return responseObject(
//       ctx,
//       e.response.status || HttpCodes.GONE_ERROR,
//       e.response.statusText
//     );
//   }
// }
//
// LeadsRoutes.get(
//   "/get-vehicle-interested-by-id/:vehicleInterestedId",
//   getVehicleInterestById
// );
// async function getVehicleInterestById(ctx) {
//   try {
//     const { vehicleInterestedId } = ctx.params;
//     weakValidator.weakValidation(
//       vehicleInterestedId,
//       "VehicleInterestedId must be sent"
//     );
//     const response = await leadsModule.getVehicleInterestById(
//       vehicleInterestedId
//     );
//     return responseObject(ctx, HttpCodes.SUCCESS, response);
//   } catch (e) {
//     return responseObject(
//       ctx,
//       e.response.status || HttpCodes.GONE_ERROR,
//       e.response.statusText
//     );
//   }
// }
//
// LeadsRoutes.get(
//   "/get-vehicle-interested-by-id/:vehicleInterestedId",
//   getVehicleInterestByPage
// );
// async function getVehicleInterestByPage(ctx) {
//   try {
//     const { page, pageSize } = ctx.request.query;
//     const response = await leadsModule.getVehicleInterestByPage(page, pageSize);
//     return responseObject(ctx, HttpCodes.SUCCESS, response);
//   } catch (e) {
//     return responseObject(
//       ctx,
//       e.response.status || HttpCodes.GONE_ERROR,
//       e.response.statusText
//     );
//   }
// }
//
// LeadsRoutes.post("/set-vehicle-interest-to-paid", setVehicleInterestToPaid);
// async function setVehicleInterestToPaid(ctx) {
//   try {
//     const { vehicleInterestedId } = ctx.params;
//     weakValidator.weakValidation(
//       vehicleInterestedId,
//       "VehicleInterestedId must be sent"
//     );
//     const response = await leadsModule.setVehicleInterestToPaid(
//       vehicleInterestedId
//     );
//     return responseObject(ctx, HttpCodes.SUCCESS, response);
//   } catch (e) {
//     return responseObject(
//       ctx,
//       e.response.status || HttpCodes.GONE_ERROR,
//       e.response.statusText
//     );
//   }
// }

module.exports = mount("/api/lead", LeadsRoutes.routes());
