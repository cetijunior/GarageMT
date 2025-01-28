const express = require('express');
const router = express.Router();
const BookingController = require('../controllers/BookingController');
const { validateApiKey } = require('../middleware/auth');

router.post('/', BookingController.createBooking);
router.get('/availability', BookingController.checkAvailability);
router.get('/daily',validateApiKey, BookingController.getDailyBookings);
router.get('/all',validateApiKey , BookingController.getAllBookings);
// Get all client emails
router.get('/emails', BookingController.getClientEmails);
// Cancel a booking by ID
router.delete('/:id', BookingController.cancelBooking);


module.exports = router;
