const express = require('express');
const router = express.Router();
const MarketingController = require('../controllers/BookingController');

// Get all users who gave marketing consent
router.get('/', MarketingController.getMarketingConsents);

module.exports = router;
