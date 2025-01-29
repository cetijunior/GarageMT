const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true }, // Remove index: true here
  phone: { type: String, required: true },
  garage: {
    type: String,
    required: true // Removed `enum`
  },
  note: { type: String },
  date: { type: String, required: true },
  time: { type: String, required: true },
  status: { type: String, default: 'confirmed' },
});

// ✅ Define indexes only once at the bottom
bookingSchema.index({ email: 1 }, { unique: true });
bookingSchema.index({ garage: 1, date: 1 });
bookingSchema.index({ date: 1, garage: 1, time: 1 }, { unique: true });

module.exports = mongoose.model('Booking', bookingSchema);
