class CalendarService {
    constructor() {
        this.calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    }

    async createEvent(booking) {
        const event = {
            summary: `Car Service Consultation - ${booking.name}`,
            location: this.getLocationAddress(booking.location),
            description: this.generateEventDescription(booking),
            start: {
                dateTime: this.getDateTime(booking.date, booking.time),
                timeZone: 'Europe/Malta',
            },
            end: {
                dateTime: this.getEndDateTime(booking.date, booking.time),
                timeZone: 'Europe/Malta',
            },
            attendees: [
                { email: booking.email },
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

        return await this.calendar.events.insert({
            calendarId: 'primary',
            resource: event,
            sendUpdates: 'all'
        });
    }

    async checkAvailability(date, location) {
        // Implementation
    }
} 