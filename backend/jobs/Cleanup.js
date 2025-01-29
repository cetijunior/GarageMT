const cron = require('node-cron');
const Booking = require('../models/Booking');
const moment = require('moment');

// Schedule the cleanup job to run daily at midnight
const scheduleCleanup = () => {
    cron.schedule('0 0 * * *', async () => {
      try {
        const currentDate = moment().format('YYYY-MM-DD');
        const result = await Booking.deleteMany({ date: { $lt: currentDate } });
        console.log(`Cleanup Job: Deleted ${result.deletedCount} past bookings.`);
      } catch (error) {
        console.error('Error during cleanup job:', error);
      }
    });
  };

module.exports = scheduleCleanup