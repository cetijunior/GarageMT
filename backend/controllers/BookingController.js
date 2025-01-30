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

    // **📩 Beautiful Confirmation Email for the Client**
    const clientEmailHTML = `
      <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
        <h2 style="text-align: center; color: #1a73e8;">🚗 GarageMT - Booking Confirmation</h2>
        <p style="font-size: 16px; text-align: center;">Dear <b>${name}</b>,</p>
        <p style="font-size: 16px; text-align: center;">Thank you for scheduling your service with us! Here are the details of your appointment:</p>
        <hr>
        <table style="width: 100%; font-size: 16px; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; font-weight: bold;">📍 Garage:</td>
            <td style="padding: 8px;">${garage}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">📅 Date:</td>
            <td style="padding: 8px;">${date}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">⏰ Time:</td>
            <td style="padding: 8px;">${time}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">📝 Notes:</td>
            <td style="padding: 8px;">${note || 'N/A'}</td>
          </tr>
        </table>
        <hr>
        ${
          eventLink
            ? `<p style="text-align: center;"><a href="${eventLink}" style="display: inline-block; padding: 12px 20px; font-size: 16px; color: #ffffff; background-color: #1a73e8; border-radius: 5px; text-decoration: none;">📅 View in Google Calendar</a></p>`
            : ''
        }
        <p style="text-align: center; font-size: 16px; color: #666;">If you have any questions, feel free to contact us.</p>
        <p style="text-align: center; font-size: 16px; color: #1a73e8;">📞 +356 774 98 675 | 📞 +356 770 88 222 | ✉️ info@garage.mt</p>
        <hr>
        <p style="text-align: center; font-size: 14px; color: #999;">GarageMT © 2025 - All rights reserved.</p>
      </div>
    `;

    await sendEmail(email, '🚗 GarageMT - Booking Confirmation', clientEmailHTML);

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