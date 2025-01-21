const express = require('express');
const { google } = require('googleapis');
require('dotenv').config();

const app = express();

// Replace these values with your Google Cloud Console credentials
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/oauth2callback';
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '777865094404-354enin9bpsjsntm9if99acbrk0lvr3d.apps.googleusercontent.com';
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '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';

// Initialize the OAuth2 client
const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// Generate Authorization URL
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

// Handle OAuth2 callback
app.get('/oauth2callback', async (req, res) => {
    const { code } = req.query; // Get authorization code from query parameters
    if (!code) {
        return res.status(400).send('Authorization code is missing.');
    }

    try {
        // Exchange the authorization code for access and refresh tokens
        const { tokens } = await oauth2Client.getToken(code);
        console.log('Access Token:', tokens.access_token); // Temporary token
        console.log('Refresh Token:', tokens.refresh_token); // Long-lived refresh token

        // Set the credentials for the OAuth2 client
        oauth2Client.setCredentials(tokens);

        // Send a success message to the client
        res.send('Success! Refresh Token generated. Check your console.');

        // NOTE: Save the refresh token securely (e.g., in a database or `.env` file)
        // Example:
        // Save the tokens.refresh_token to your database for future use
    } catch (error) {
        console.error('Error generating tokens:', error);
        res.status(500).send('Error generating tokens. Check the console.');
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
    console.log('Visit this URL to start the OAuth flow');
});
