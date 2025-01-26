const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {
      type: String,
      validate: {
        validator: function (value) {
          // Email is required only if consent is true
          return this.consent ? !!value : true;
        },
        message: 'Email is required if consent is true.',
      },
    },
    phone: {
      type: String,
      validate: {
        validator: function (value) {
          // Phone is required only if consent is true
          return this.consent ? !!value : true;
        },
        message: 'Phone number is required if consent is true.',
      },
    },
    garage: { type: String, enum: ['Garage A', 'Garage B'], required: true },
    note: { type: String },
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: { type: String, default: 'confirmed' },
    consent: { type: Boolean, required: true }, // Ensure consent is always provided
  });
  
  bookingSchema.index({ date: 1, garage: 1, time: 1 }, { unique: true });
  
  module.exports = mongoose.model('Booking', bookingSchema);
  