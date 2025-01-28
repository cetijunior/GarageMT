const mongoose = require('mongoose');

const marketingConsentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true }, // Added index
  phone: { type: String, required: true, unique: true, index: true }, // Added index
  consentDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('MarketingConsent', marketingConsentSchema);
