import { google } from 'googleapis';
import express from 'express';
import open from 'open';

const app = express();
const PORT = 5173;

const oauth2Client = new google.auth.OAuth2(
    process.env.VITE_GOOGLE_CLIENT_ID,
    process.env.VITE_GOOGLE_CLIENT_SECRET,
    `http://localhost:${PORT}/callback`
);

app.get('/auth', (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/calendar.events']
    });
    res.redirect(url);
});

app.get('/callback', async (req, res) => {
    const { code } = req.query;
    const { tokens } = await oauth2Client.getToken(code);
    console.log('Refresh Token:', tokens.refresh_token);
    res.send('You can close this window now.');
    process.exit();
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/auth`);
    open(`http://localhost:${PORT}/auth`);
}); 