"use strict";

const {
  Lead,
  VehicleInterest,
  LeadConsumptionService,
  LeadManagementService,
} = require("@diegomoura637/service-leads-olhonocarro");

const leadManagementService = new LeadManagementService();
const leadConsumptionService = new LeadConsumptionService();

const createNewLead = async (email, name, phone, origin = "onc") => {
  const lead = new Lead();
  lead.setEmail(email).setName(name).setPhone(phone).setOrigin(origin);
  await leadManagementService.createLead(lead);
};

const getLeadById = async (id) => {
  const serviceLeadManager = new LeadManagementService();
  return serviceLeadManager.getLeadById(id);
};

const getAllLeads = async () => {
  return leadManagementService.getAllLeads();
};

const getLeadByEmail = async (email) => {
  return leadManagementService.getLeadByEmail(email);
};

const createVehicleInterest = async (
  state,
  model,
  brand,
  city,
  startingYear,
  endingYear,
  isInterested,
  maxMileage,
  maxPrice,
  leadId
) => {
  const vehicle = new VehicleInterest();
  vehicle
    .setState(state)
    .setModel(model)
    .setBrand(brand)
    .setCity(city)
    .setStartingYear(startingYear)
    .setEndingYear(endingYear)
    .setIsInterested(isInterested)
    .setMaxPrice(maxPrice)
    .setMaxMileage(maxMileage)
    .setLeadId(leadId);
  await leadManagementService.createVehicleInterest(vehicle);
};

const getVehicleInterestByIdAndLeadId = async (leadId, vehicleInterestId) => {
  return leadManagementService.getVehicleInterestByIdAndLeadId(
    leadId,
    vehicleInterestId
  );
};

const getVehicleInterestByLeadId = async (leadId) => {
  return leadManagementService.getVehicleInterestByLeadId(leadId);
};

const deleteLead = async (leadId) => {
  await leadManagementService.removeLead(leadId);
};

const deleteVehicleInterest = async (leadId, vehicleInterestedId) => {
  await leadManagementService.removeVehicleInterest(
    leadId,
    vehicleInterestedId
  );
};

const updateLead = async (leadId, name, phone, email) => {
  const lead = new Lead();
  lead.setName(name).setPhone(phone).setEmail(email);
  await leadManagementService.updateLead(leadId, lead);
};

const updateVehicleInterested = async (
  leadId,
  state,
  model,
  brand,
  city,
  startingYear,
  endingYear,
  isInterested,
  acquiredAt,
  maxMileage,
  maxPrice
) => {
  const vehicle = new VehicleInterest();
  vehicle
    .setAcquiredAt(acquiredAt)
    .setState(state)
    .setModel(model)
    .setBrand(brand)
    .setCity(city)
    .setStartingYear(startingYear)
    .setEndingYear(endingYear)
    .setIsInterested(isInterested)
    .setMaxMileage(maxMileage)
    .setMaxPrice(maxPrice);
  await leadManagementService.updateVehicleInterest(leadId, vehicle);
};

const getLeadConsumptionById = async (leadId) => {
  return leadConsumptionService.getLeadConsumptionById(leadId);
};

const getVehicleInterestById = async (vehicleInterestedId) => {
  return leadConsumptionService.getVehicleInterestById(vehicleInterestedId);
};

const getVehicleInterestByPage = async (page, pageSize) => {
  return leadConsumptionService.getVehicleInterestByPage(page, pageSize);
};

const setVehicleInterestToPaid = async (vehicleInterestedId) => {
  return leadConsumptionService.setVehicleInterestToPaid(vehicleInterestedId);
};

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
