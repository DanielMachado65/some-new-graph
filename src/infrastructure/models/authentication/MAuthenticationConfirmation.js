'use strict';

const mongoose = require('mongoose');
const validator = require('validator');

const MAuthenticationConfirmationSchema = new mongoose.Schema({
    createAt: { type: Date, default: Date.now },
    code: {
        type: Number,
        required: true,
        min: [0, 'Code must be bigger than zero'],
        max: [Number.MAX_SAFE_INTEGER],
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: (prop) => validator.isEmail(prop),
            message: 'Invalid e-mail',
        },
    },
    expireAt: { type: Date, default: null },
});

MAuthenticationConfirmationSchema.pre('save', function (done) {
    this.email = (this.email && this.email.toLowerCase()) || null;
    done();
});

mongoose.model(
    'MAuthenticationConfirmation',
    MAuthenticationConfirmationSchema,
);
