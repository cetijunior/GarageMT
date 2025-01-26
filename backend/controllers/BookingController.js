const Booking = require('../models/Booking');
const moment = require('moment'); // Install moment.js for date handling
// Create a new booking
exports.createBooking = async (req, res) => {
    try {
      const { name, email, phone, garage, note, date, time, consent } = req.body;
  
      // Check if all required fields are provided
      if (!name || !garage || !date || !time || consent === undefined) {
        return res.status(400).json({ message: 'All required fields, including consent, must be provided.' });
      }
  
      // Validate garage type
      if (!['Garage A', 'Garage B'].includes(garage)) {
        return res.status(400).json({ message: 'Invalid garage selected.' });
      }

       // Send a confirmation email if consent is true
    if (consent) {
        await sendEmail(
          email,
          'Booking Confirmation',
          `Dear ${name},\n\nYour booking at ${garage} has been confirmed for ${date} at ${time}.\n\nThank you!`
        );
      }
  
      // If consent is false, anonymize the booking
      const bookingData = consent
        ? { name, email, phone, garage, note, date, time, consent }
        : { name: 'Anonymous', email: '', phone: '', garage, note, date, time, consent };
  
      // Check if the slot is already booked
      const existingBooking = await Booking.findOne({ date, time, garage });
      if (existingBooking) {
        return res.status(400).json({ message: 'This time slot is already booked.' });
      }
  
      // Save the booking
      const newBooking = new Booking(bookingData);
      await newBooking.save();
      res.status(201).json({ message: 'Booking created successfully!', booking: newBooking });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({
          message: 'This time slot is already booked. Please select a different time.',
        });
      }
      console.error('Error creating booking:', error);
      res.status(500).json({ message: 'Internal server error.', error });
    }
  };
  
// Check availability
exports.checkAvailability = async (req, res) => {
    try {
      const { date, garage } = req.query;
  
      // Validate input
      if (!date || !garage) {
        return res.status(400).json({ message: 'Date and garage are required.' });
      }
  
      // Fetch all bookings for the given date and garage
      const bookings = await Booking.find({ date, garage }).select('time');
      const bookedTimes = bookings.map(booking => booking.time);
  
      res.json({ date, garage, bookedTimes });
    } catch (error) {
      console.error('Error checking availability:', error);
      res.status(500).json({ message: 'Internal server error.', error });
    }
  };

// Fetch daily bookings
exports.getDailyBookings = async (req, res) => {
    try {
      const today = moment().format('YYYY-MM-DD'); // Get current date in YYYY-MM-DD format
  
      // Find all bookings for the current day
      const bookings = await Booking.find({ date: today });
   // Calculate summary data
   const totalBookings = bookings.length;
   const availableSlots = 24 - totalBookings; // Assuming 24 slots per d
   res.json({ date: today, tot  alBookings, availableSlots, bookings });
    } catch (error) {
      console.error('Error fetching daily bookings:', error);
      res.status(500).json({ message: 'Internal server error.', error });
    }
  };

// Fetch all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const { date, garage, page = 1, limit = 10, sortBy = 'date', order = 'asc' } = req.query;

    const currentDate = moment().format('YYYY-MM-DD');
    const filter = { date: { $gte: currentDate } };
    if (date) filter.date = date;
    if (garage) filter.garage = garage;

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const sortOrder = order === 'desc' ? -1 : 1;

    const bookings = await Booking.find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    const totalBookings = await Booking.countDocuments(filter);

    res.json({
      bookings,
      totalBookings,
      totalPages: Math.ceil(totalBookings / limitNum),
      currentPage: pageNum,
    });
    } catch (error) {
      console.error('Error fetching all bookings:', error);
      res.status(500).json({ message: 'Internal server error.', error });
    }
  };

// Get all client emails
exports.getClientEmails = async (req, res) => {
    try {
      const { includeDetails } = req.query;
  
      // Fetch all bookings
      const bookings = await Booking.find();
  
      // If includeDetails is true, return full client details
      if (includeDetails === 'true') {
        return res.json({ clients: bookings });
      }
  
      // Otherwise, return only the email addresses
      const emails = bookings.map(booking => booking.email);
      res.json({ emails });
    } catch (error) {
      console.error('Error fetching client emails:', error);
      res.status(500).json({ message: 'Internal server error.', error });
    }
  };

  // Cancel a booking for the dashboard 
exports.cancelBooking = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find and delete the booking
      const deletedBooking = await Booking.findByIdAndDelete(id);
  
      if (!deletedBooking) {
        return res.status(404).json({ message: 'Booking not found.' });
      }
  
       // Send a cancellation email if consent is true
    if (deletedBooking.consent) {
      await sendEmail(
        deletedBooking.email,
        'Booking Cancellation',
        `Dear ${deletedBooking.name},\n\nYour booking at ${deletedBooking.garage} for ${deletedBooking.date} at ${deletedBooking.time} has been canceled.\n\nThank you!`
      );
    }

      res.json({ message: 'Booking canceled successfully.', booking: deletedBooking });
    } catch (error) {
      console.error('Error canceling booking:', error);
      res.status(500).json({ message: 'Internal server error.', error });
    }
  };
  