import axios from 'axios';

const CALENDAR_API_BASE_URL = 'https://www.googleapis.com/calendar/v3';

export const addEventToGoogleCalendar = async (booking) => {
    try {
        const event = {
            summary: `Car Service Consultation - ${booking.name}`,
            location: booking.location === 'garage_1'
                ? 'Garage 1 - Birżebbuġa'
                : 'Garage 2 - Iż-Żejtun',
            description: `
                Client: ${booking.name}
                Phone: ${booking.phone}
                Email: ${booking.email}
                Notes: ${booking.notes}
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
                { email: booking.email },
                { email: import.meta.env.VITE_ADMIN_EMAIL },
            ],
            reminders: {
                useDefault: false,
                overrides: [
                    { method: 'email', minutes: 24 * 60 },
                    { method: 'popup', minutes: 30 },
                ],
            },
        };

        const response = await axios.post(
            `${CALENDAR_API_BASE_URL}/calendars/primary/events`,
            event,
            {
                headers: {
                    'Authorization': `Bearer ${import.meta.env.VITE_GOOGLE_ACCESS_TOKEN}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error('Failed to add event to Google Calendar:', error);
        throw error;
    }
};

// Helper function to format date and time
const getDateTime = (date, time) => {
    const [hours, minutes] = time.match(/(\d+):(\d+)/).slice(1);
    const dateObj = new Date(date);
    dateObj.setHours(parseInt(hours), parseInt(minutes));
    return dateObj.toISOString();
};

// Helper function to calculate end time (1 hour after start)
const getEndDateTime = (date, time) => {
    const [hours, minutes] = time.match(/(\d+):(\d+)/).slice(1);
    const dateObj = new Date(date);
    dateObj.setHours(parseInt(hours) + 1, parseInt(minutes));
    return dateObj.toISOString();
}; 