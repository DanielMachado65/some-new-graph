"use strict";

const testimonialFacade = require("./testimonial.facade");

const getAllTestimonials = testimonialFacade.getAllTestimonials;

const createTestimonial = testimonialFacade.createTestimonial;

const updateTestimonial = testimonialFacade.updateTestimonial;

const removeTestimonial = testimonialFacade.removeTestimonial;

module.exports = {
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  removeTestimonial,
};
