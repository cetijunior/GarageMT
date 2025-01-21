import { useEffect } from "react";
import { google } from "googleapis";

function GoogleCalendarAuth() {
	useEffect(() => {
		const oauth2Client = new google.auth.OAuth2(
			process.env.GOOGLE_CLIENT_ID,
			process.env.GOOGLE_CLIENT_SECRET,
			"YOUR_REDIRECT_URI"
		);

		// Generate URL for consent screen
		const url = oauth2Client.generateAuthUrl({
			access_type: "offline",
			scope: ["https://www.googleapis.com/auth/calendar.events"],
		});

		// Handle the OAuth2 callback
		const handleCallback = async () => {
			const code = new URLSearchParams(window.location.search).get("code");
			if (code) {
				try {
					const { tokens } = await oauth2Client.getToken(code);
					// Store these tokens securely
					console.log("Refresh Token:", tokens.refresh_token);
				} catch (error) {
					console.error("Error getting tokens:", error);
				}
			}
		};

		handleCallback();
	}, []);

	return null;
}

export default GoogleCalendarAuth;
