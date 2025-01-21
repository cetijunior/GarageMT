const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize OAuth2 client
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

// Set credentials if refresh token is available
if (process.env.GOOGLE_REFRESH_TOKEN) {
    oauth2Client.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN
    });
}

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

// Generate Authorization URL for OAuth flow
const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline', // Ensures refresh token is generated
    scope: ['https://www.googleapis.com/auth/calendar.events'], // Calendar API scope
    prompt: 'consent', // Ensures refresh token is regenerated
});

console.log('Authorize this app by visiting this URL:', authUrl);

// Redirect to Google OAuth URL
app.get('/', (req, res) => {
    console.log('Redirecting to Google OAuth URL:', authUrl);
    res.redirect(authUrl);
});

// Handle OAuth2 callback and generate tokens
app.get('/oauth2callback', async (req, res) => {
    const { code } = req.query;
    if (!code) {
        return res.status(400).send('Authorization code is missing.');
    }

    try {
        const { tokens } = await oauth2Client.getToken(code);
        console.log('Access Token:', tokens.access_token);
        console.log('Refresh Token:', tokens.refresh_token);

        // Set the credentials for further use
        oauth2Client.setCredentials(tokens);

        // Inform the user
        res.send('Tokens successfully generated! Check your console for the refresh token.');

        // Save the refresh token securely (e.g., in a database or `.env` file)
        if (tokens.refresh_token) {
            console.log('Save this Refresh Token:', tokens.refresh_token);
            // You can update your `.env` or database programmatically here if needed
        }
    } catch (error) {
        console.error('Error generating tokens:', error);
        res.status(500).send('Error generating tokens. Check the console for details.');
    }
});

// Add booking to Google Calendar
app.post('/api/calendar/book', async (req, res) => {
    console.log('Backend: Received booking request:', req.body);

    try {
        const { name, email, phone, date, time, location, notes } = req.body;

        // Parse the date and time
        const bookingDate = new Date(date);
        const year = bookingDate.getFullYear();
        const month = bookingDate.getMonth();
        const day = bookingDate.getDate();

        let [hourStr, minuteStr] = time.replace(/[APM]/g, '').trim().split(':');
        let hour = parseInt(hourStr);
        const minute = parseInt(minuteStr);

        if (time.includes('PM') && hour !== 12) {
            hour += 12;
        } else if (time.includes('AM') && hour === 12) {
            hour = 0;
        }

        const startDate = new Date(year, month, day, hour, minute, 0);
        const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

        console.log('Parsed dates:', {
            original: { date, time },
            parsed: {
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString()
            }
        });

        const event = {
            summary: `Car Service Consultation - ${name}`,
            location: location === 'garage_1'
                ? 'Garage 1 - Birżebbuġa'
                : 'Garage 2 - Iż-Żejtun',
            description: `
                Client: ${name}
                Phone: ${phone}
                Email: ${email}
                Notes: ${notes}
            `,
            start: {
                dateTime: startDate.toISOString(),
                timeZone: 'Europe/Malta',
            },
            end: {
                dateTime: endDate.toISOString(),
                timeZone: 'Europe/Malta',
            },
            attendees: [
                { email: email },
                { email: process.env.ADMIN_EMAIL }
            ],
            reminders: {
                useDefault: false,
                overrides: [
                    { method: 'email', minutes: 24 * 60 },
                    { method: 'popup', minutes: 30 }
                ]
            }
        };

        console.log('Backend: Calendar event object:', event);

        const response = await calendar.events.insert({
            calendarId: 'primary',
            resource: event,
            sendUpdates: 'all'
        });

        console.log('Backend: Calendar event created successfully:', response.data);

        res.json({
            success: true,
            eventId: response.data.id,
            message: 'Booking successfully added to calendar'
        });
    } catch (error) {
        console.error('Backend: Error details:', {
            message: error.message,
            stack: error.stack,
            error: error
        });
        res.status(500).json({
            error: 'Failed to create calendar event',
            details: error.message
        });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Authorize this app by visiting this URL: ${authUrl}`);
});
