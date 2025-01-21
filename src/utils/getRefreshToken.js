import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
    'YOUR_CLIENT_ID',
    'YOUR_CLIENT_SECRET',
    'http://localhost:5173/auth/callback'
);

// Generate the URL for consent
const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar.events'],
});

console.log('Visit this URL to get the auth code:', authUrl);

// After getting the code from the URL, use this:
const getToken = async (code) => {
    const { tokens } = await oauth2Client.getToken(code);
    console.log('Refresh Token:', tokens.refresh_token);
}; 