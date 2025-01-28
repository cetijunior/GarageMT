const Booking = require('../models/Booking');
const MarketingConsent = require('../models/MarketingConsent')
const moment = require('moment'); // Install moment.js for date handling
const { addEventToGoogleCalendar } = require('../services/googleCalendarService');
const { sendEmail } = require('../services/emailService');
const { google } = require('googleapis');
const CustomError = require('../utils/CustomError')

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { name, email, phone, garage, note, date, time, consentForMarketing } = req.body;

    // Check required fields
    if (!name || !email || !phone || !garage || !date || !time) {
      throw new CustomError('All required fields must be provided.', 400);
    }

    // Check for existing booking
    const existingBooking = await Booking.findOne(
      { date, time, garage },
      { _id: 1 } // Fetch only the ID for performance
    );
    if (existingBooking) {
      throw new CustomError('This time slot is already booked.', 400);
    }
    
    // Save booking to database
    const newBooking = new Booking({ name, email, phone, garage, note, date, time });
    await newBooking.save();

    // Save to marketing consent if user agrees
    if (consentForMarketing) {
      const existingConsent = await MarketingConsent.findOne({ email });
      if (!existingConsent) {
        const marketingData = new MarketingConsent({ name, email, phone });
        await marketingData.save();
        console.log(`Marketing consent saved for ${email}`);
      }
    }

    // Add booking to Google Calendar and get event link
    let eventLink = null;
    try {
      eventLink = await addEventToGoogleCalendar(newBooking);
    } catch (error) {
      console.error('Failed to add event to Google Calendar:', error.message);
    }

    // Send confirmation email to the client
    const clientMessage = `
      Dear ${name},

      Thank you for booking with us!

      Here are your booking details:
      - Garage: ${garage}
      - Date: ${date}
      - Time: ${time}
      - Note: ${note || 'N/A'}

      ${eventLink ? `You can view and manage your appointment here: ${eventLink}` : ''}

      We look forward to serving you.

      Best regards,
      Garage Booking Team
    `;
    await sendEmail(email, 'Booking Confirmation', clientMessage);

    // Send booking info to the admin
    const adminMessage = `
      New Booking Received:

      - Name: ${name}
      - Email: ${email}
      - Phone: ${phone}
      - Garage: ${garage}
      - Date: ${date}
      - Time: ${time}
      - Note: ${note || 'N/A'}

      ${eventLink ? `Google Calendar Event: ${eventLink}` : ''}
    `;
    const adminEmail = process.env.ADMIN_EMAIL;
    await sendEmail(adminEmail, 'New Booking Notification', adminMessage);

    res.status(201).json({
      message: 'Booking created successfully!',
      booking: newBooking,
      calendarEvent: eventLink || 'Event not created',
    });
  } catch (error) {
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
   res.json({ date: today, totalBookings, availableSlots, bookings });
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
      .limit(limitNum)
      .select('name email phone garage date time'); // Limit returned fields

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
  
  exports.getMarketingConsents = async (req, res) => {
    try {
      const consents = await MarketingConsent.find();
      res.json({ consents });
    } catch (error) {
      console.error('Error fetching marketing consents:', error);
      res.status(500).json({ message: 'Internal server error.', error });
    }
  };