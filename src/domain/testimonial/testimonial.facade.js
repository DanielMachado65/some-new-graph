"use strict";

const TestimonialRepository = require("./components/testimonial.repository");

const getAllTestimonials = async () => {
  const testimonials = await TestimonialRepository.getAllTestimonials();
  return { testimonials };
};

const createTestimonial = TestimonialRepository.createTestimonial.bind(
  TestimonialRepository
);

const updateTestimonial = TestimonialRepository.updateTestimonial.bind(
  TestimonialRepository
);

const removeTestimonial = TestimonialRepository.removeTestimonial.bind(
  TestimonialRepository
);

module.exports = {
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  removeTestimonial,
};
