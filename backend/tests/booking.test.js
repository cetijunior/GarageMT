const request = require('supertest');
const app = require('../app.js'); // Adjust the path to your app.js
const Booking = require('../models/Booking');
const MarketingConsent = require('../models/MarketingConsent');

describe('Booking System Tests', () => {
  beforeAll(async () => {
    // Connect to the test database if needed
  });

  afterAll(async () => {
    // Clean up the database after tests
    await Booking.deleteMany({});
    await MarketingConsent.deleteMany({});
  });

  test('Create a booking with marketing consent', async () => {
    const response = await request(app)
      .post('/api/bookings')
      .send({
        name: 'Michael Anderson',
        email: 'michael.anderson@example.com',
        phone: '+1-202-555-0136',
        garage: 'Garage A',
        note: 'Car making rattling noise when accelerating',
        date: '2025-03-15',
        time: '10:00 AM',
        consentForMarketing: true,
      });
    expect(response.status).toBe(201);
    expect(response.body.booking).toHaveProperty('_id');
  });
  
  test('Create a booking with marketing consent', async () => {
    const response = await request(app)
      .post('/api/bookings')
      .send({
        name: 'Michael Anderson',
        email: 'michael.anderson@example.com',
        phone: '+1-202-555-0136',
        garage: 'Garage A',
        note: 'Car making rattling noise when accelerating',
        date: '2025-03-15',
        time: '10:00 AM',
        consentForMarketing: true,
      });
  
    expect(response.status).toBe(201);
    expect(response.body.booking).toHaveProperty('_id');
  }, 10000); // Increase timeout to 10 seconds
  

  test('Check availability', async () => {
    const response = await request(app).get(
      '/api/bookings/availability?date=2025-03-15&garage=Garage A'
    );
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('bookedTimes');
    expect(response.body.bookedTimes).toContain('10:00 AM'); // Confirm the slot is booked
  });

  test('Prevent double booking', async () => {
    const response = await request(app)
      .post('/api/bookings')
      .send({
        name: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
        phone: '+1-202-555-0199',
        garage: 'Garage A',
        note: 'Testing duplicate booking scenario',
        date: '2025-03-15',
        time: '10:00 AM',
        consentForMarketing: true,
      });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('This time slot is already booked.');
  });

  test('Create a booking for a date far in the future', async () => {
    const response = await request(app)
      .post('/api/bookings')
      .send({
        name: 'James Wilson',
        email: 'james.wilson@example.com',
        phone: '+1-202-555-0102',
        garage: 'Garage B',
        note: 'Oil change needed',
        date: '2025-05-20',
        time: '9:00 AM',
        consentForMarketing: true,
      });
    expect(response.status).toBe(201);
    expect(response.body.booking).toHaveProperty('_id');
  });
});
