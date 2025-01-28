const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, index: true }, // Added index
  phone: { type: String, required: true },
  garage: { type: String, enum: ['Garage A', 'Garage B'], required: true, index: true }, // Added index
  note: { type: String },
  date: { type: String, required: true, index: true }, // Added index
  time: { type: String, required: true },
  status: { type: String, default: 'confirmed' },
});

// Retain existing unique index
bookingSchema.index({ date: 1, garage: 1, time: 1 }, { unique: true });

// New indexes for optimized lookups
bookingSchema.index({ email: 1 });
bookingSchema.index({ garage: 1, date: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
