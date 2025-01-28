require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('./utils/logger')
const cors = require('cors');
const bookingRoutes = require('./routes/bookings');
const swaggerUi = require('swagger-ui-express');
const marketingRoutes = require('./routes/marketing');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/api/bookings', bookingRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/marketing', marketingRoutes);

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error stack for debugging
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}, // Show detailed errors in dev only
  });
});


app.use((err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    status: err.status || 500,
  });
  const statusCode = err.status || 500;
  res.status(statusCode).json({ message: err.message || 'Internal Server Error' });
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

module.exports = app;
