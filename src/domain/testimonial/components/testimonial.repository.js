"use strict";

const mongoose = require("mongoose");
const { MTestimonial } = mongoose.models;
const {
  BaseRepository,
} = require("../../../infrastructure/repository/BaseRepository");

class TestimonialRepository extends BaseRepository {
  constructor() {
    super(MTestimonial);
    this.defaultProjection = { authorName: 1, content: 1, user: 1 };
  }

  async getAllTestimonials() {
    return this.getAllExceptLogicallyRemoved({}, [], this.defaultProjection);
  }

  createTestimonial(testimonial) {
    return this.createWithProjection(testimonial, this.defaultProjection);
  }

  updateTestimonial(testimonialId, testimonial) {
    return this.updateByIdAndReturnNew(
      testimonialId,
      testimonial,
      this.defaultProjection
    );
  }

  removeTestimonial(testimonialId) {
    return this.removeByIdLogicallyAndReturnNew(
      testimonialId,
      this.defaultProjection
    );
  }
}

module.exports = new TestimonialRepository();
