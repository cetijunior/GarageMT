const mongoose = require('mongoose');

const marketingConsentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  consentDate: { type: Date, default: Date.now }, // Date when consent was given
});

module.exports = mongoose.model('MarketingConsent', marketingConsentSchema);
