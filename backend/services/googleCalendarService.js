const { google } = require('googleapis');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Initialize Google OAuth2 Client
const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Set the refresh token for automatic authentication
oAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

// Function to add a booking to Google Calendar
const addEventToGoogleCalendar = async (booking) => {
  try {
    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

    const event = {
      summary: `Car Service Appointment - ${booking.name}`,
      location: booking.garage === 'Garage A' ? 'Garage A - Birżebbuġa' : 'Garage B - Iż-Żejtun',
      description: `
        Client: ${booking.name}
        Phone: ${booking.phone}
        Email: ${booking.email}
        Notes: ${booking.note || 'None'}
      `,
      start: {
        dateTime: getDateTime(booking.date, booking.time),
        timeZone: 'Europe/Malta',
      },
      end: {
        dateTime: getEndDateTime(booking.date, booking.time),
        timeZone: 'Europe/Malta',
      },
      attendees: [
        { email: booking.email }, // Send invite to client
        { email: process.env.ADMIN_EMAIL }, // Send invite to admin
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 1 day before
          { method: 'popup', minutes: 30 }, // 30 minutes before
        ],
      },
    };

    const response = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      resource: event,
    });

    console.log('Event added to Google Calendar:', response.data.htmlLink);

    // Send confirmation email with event invite
    //await sendConfirmationEmail(booking, response.data.htmlLink);

    return response.data.htmlLink; // Return event link
  } catch (error) {
    console.error('Failed to add event to Google Calendar:', error.response?.data || error.message);
    throw error;
  }
};

// Function to send a confirmation email
const sendConfirmationEmail = async (booking, eventLink) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"GarageMT" <${process.env.EMAIL_USER}>`,
      to: booking.email,
      subject: `Booking Confirmation - ${booking.date} at ${booking.time}`,
      html: `
        <h2>Booking Confirmed!</h2>
        <p>Dear ${booking.name},</p>
        <p>Your booking at <b>${booking.garage}</b> has been confirmed.</p>
        <p><b>Details:</b></p>
        <ul>
          <li><b>Date:</b> ${booking.date}</li>
          <li><b>Time:</b> ${booking.time}</li>
          <li><b>Garage:</b> ${booking.garage}</li>
          <li><b>Notes:</b> ${booking.note || 'None'}</li>
        </ul>
        <p>You can view and manage your appointment here: <a href="${eventLink}">Google Calendar Event</a></p>
        <p>Best Regards,<br>GarageMT Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent to:', booking.email);
  } catch (error) {
    console.error('Failed to send confirmation email:', error.message);
  }
};

// Helper function to format date and time
const getDateTime = (date, time) => {
  const [hours, minutes] = time.split(':');
  const dateObj = new Date(date);
  dateObj.setHours(parseInt(hours), parseInt(minutes));
  return dateObj.toISOString();
};

// Helper function to calculate end time (1 hour after start)
const getEndDateTime = (date, time) => {
  const [hours, minutes] = time.split(':');
  const dateObj = new Date(date);
  dateObj.setHours(parseInt(hours) + 1, parseInt(minutes));
  return dateObj.toISOString();
};

module.exports = { addEventToGoogleCalendar };
