# Garage Booking System

## Table of Contents
- Overview
- Key Features
- Getting Started
  - Prerequisites
  - Installation
  - Environment Variables
  - Running the Application
- API Documentation
- API Endpoints
- Security & Best Practices
- Project Structure
- Deployment
- Contribution
- License
- Support

## Overview
The Garage Booking System is a RESTful API that allows customers to schedule appointments at two different garages. The system manages bookings, sends confirmation emails, integrates with Google Calendar, and handles marketing consent for customers who opt-in.

This system is secure, scalable, and modular, ensuring smooth handling of bookings and efficient communication between customers and administrators.

## Key Features
- Booking Management: Users can book appointments, check availability, and cancel bookings.
- Email Notifications: Customers receive confirmation emails upon booking.
- Google Calendar Integration: Automatically adds appointments to the admin’s Google Calendar.
- Secure API: Uses API keys for authentication and encrypts sensitive data.
- Admin Panel Support: API endpoints for fetching all bookings and daily bookings.
- Marketing Consent Management: Users can opt in for marketing communications.
- Production-Ready Architecture: Built with best practices for security, scalability, and maintainability.

## Getting Started
### Prerequisites
Ensure you have the following installed:
- Node.js (v16+ recommended)
- MongoDB (Atlas or local instance)
- Google API Credentials (for Google Calendar integration)
- Nodemailer SMTP Credentials (for email notifications)

### Installation
Clone the repository:
git clone https://github.com/your-repo/garage-booking.git
cd garage-booking

Install dependencies:
npm install

### Environment Variables
Create a `.env` file in the root directory and add the following:
PORT=5000
MONGO_URI=mongodb+srv://your_mongo_connection
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
ADMIN_EMAIL=admin@example.com
API_KEY=your_secure_api_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REFRESH_TOKEN=your_google_refresh_token
GOOGLE_CALENDAR_ID=your_calendar_id

Ensure that API keys and credentials are securely stored and not committed to Git.

### Running the Application
npm start
This starts the server at http://localhost:5000

To run in development mode with hot reload:
npm run dev

## API Documentation
### Booking Routes (/api/bookings)
#### Create a Booking
POST /api/bookings/

Request Body:
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "phone": "1234567890",
  "garage": "Garage A",
  "note": "Check brakes",
  "date": "2025-02-10",
  "time": "10:00",
  "consentForMarketing": true
}

#### Check Availability
GET /api/bookings/availability?date=2025-02-10&garage=Garage A

Response:
{
  "date": "2025-02-10",
  "garage": "Garage A",
  "bookedTimes": ["10:00", "12:00"]
}

## API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | /api/bookings/ | Create a new booking |
| GET | /api/bookings/availability | Check available slots for a given date and garage |
| GET | /api/bookings/all | Retrieve all bookings (paginated) |
| DELETE | /api/bookings/:id | Cancel a booking |
| GET | /api/marketing/ | Fetch all marketing consents |

## Security & Best Practices
- API Key Authentication: Ensure all API requests include the correct API key in headers.
- MongoDB Indexing: Optimized indexes to speed up queries.
- Rate Limiting: Implement rate limiting in production to prevent abuse.
- Input Validation: All API requests should validate user input before processing.
- Error Handling: Errors are properly caught and returned as structured JSON responses.
- Data Encryption: Store sensitive information in an encrypted format where necessary.
- Environment Variables: Never expose API keys or sensitive information in the codebase.

## Deployment
npm run build
npm start

For Docker Deployment:
docker build -t garage-booking .
docker run -p 5000:5000 garage-booking

## Contribution
1. Fork the repository.
2. Create a feature branch (git checkout -b feature-name).
3. Commit your changes (git commit -m "Added new feature").
4. Push the branch (git push origin feature-name).
5. Open a pull request.

## License
This project is licensed under the MIT License.

## Support
For any issues, open an issue on GitHub or contact support@example.com.
