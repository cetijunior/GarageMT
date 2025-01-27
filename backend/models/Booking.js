const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  garage: { type: String, enum: ['Garage A', 'Garage B'], required: true },
  note: { type: String },
  date: { type: String, required: true },
  time: { type: String, required: true },
  status: { type: String, default: 'confirmed' }, // Status for future flexibility
});

bookingSchema.index({ date: 1, garage: 1, time: 1 }, { unique: true });

module.exports = mongoose.model('Booking', bookingSchema);
