const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'error',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json()
  ),
  transports: [
    new transports.File({ filename: 'errors.log' }), // Log to a file
    new transports.Console(), // Log to the console
  ],
});

module.exports = logger;
