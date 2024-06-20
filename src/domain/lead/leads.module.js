"use strict";

const leadsFacade = require("./leads.facade");

const createNewLead = async (email, name, phone) =>
  leadsFacade.createNewLead(email, name, phone);

const getLeadById = async (id) => leadsFacade.getLeadById(id);

const getAllLeads = async () => leadsFacade.getAllLeads();

const getLeadByEmail = async (email) => leadsFacade.getLeadByEmail(email);

const createVehicleInterest = async (
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
) =>
  leadsFacade.createVehicleInterest(
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

const getVehicleInterestByIdAndLeadId = async (leadId, vehicleInterestId) =>
  leadsFacade.getVehicleInterestByIdAndLeadId(leadId, vehicleInterestId);

const getVehicleInterestByLeadId = async (leadId) =>
  leadsFacade.getVehicleInterestByLeadId(leadId);

const deleteLead = async (leadId) => leadsFacade.deleteLead(leadId);

const deleteVehicleInterest = async (leadId, vehicleInterestedId) =>
  leadsFacade.deleteVehicleInterest(leadId, vehicleInterestedId);

const updateLead = async (leadId, name, phone, email) =>
  leadsFacade.updateLead(leadId, name, phone, email);

const updateVehicleInterested = async (
  leadId,
  state,
  model,
  brand,
  city,
  startingYear,
  endingYear,
  interested,
  acquiredAt,
  maxMileage,
  maxPrice
) =>
  leadsFacade.updateVehicleInterested(
    leadId,
    state,
    model,
    brand,
    city,
    startingYear,
    endingYear,
    interested,
    acquiredAt,
    maxMileage,
    maxPrice
  );
const getLeadConsumptionById = async (leadId) =>
  leadsFacade.getLeadConsumptionById(leadId);

const getVehicleInterestById = async (vehicleInterestedId) =>
  leadsFacade.getVehicleInterestById(vehicleInterestedId);

const getVehicleInterestByPage = async (page, pageSize) =>
  leadsFacade.getVehicleInterestByPage(page, pageSize);

const setVehicleInterestToPaid = async (vehicleInterestedId) =>
  leadsFacade.setVehicleInterestToPaid(vehicleInterestedId);

module.exports = {
  createNewLead,
  getLeadById,
  getAllLeads,
  getLeadByEmail,
  createVehicleInterest,
  getVehicleInterestByIdAndLeadId,
  getVehicleInterestByLeadId,
  deleteLead,
  deleteVehicleInterest,
  updateLead,
  updateVehicleInterested,
  getLeadConsumptionById,
  getVehicleInterestById,
  getVehicleInterestByPage,
  setVehicleInterestToPaid,
};
