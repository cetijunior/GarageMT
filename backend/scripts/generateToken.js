const { google } = require('googleapis');
require('dotenv').config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

const getAccessToken = async () => {
  console.log('Starting token generation process...');
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline', // Ensures a refresh token is returned
    scope: SCOPES,
  });

  console.log('Authorize this app by visiting this URL:', authUrl);

  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readline.question('Enter the code from the page here: ', async (code) => {
    try {
      console.log('Received code:', code);
      const { tokens } = await oAuth2Client.getToken(code);
      console.log('Tokens acquired:', tokens);

      console.log('Save this refresh token in your .env file as GOOGLE_REFRESH_TOKEN:');
      console.log(tokens.refresh_token);

      readline.close();
    } catch (error) {
      console.error('Error retrieving access token', error);
      readline.close();
    }
  });
};

getAccessToken();
