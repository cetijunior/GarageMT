const app = require('./app.js');
const PORT = process.env.PORT || 5000;
const scheduleCleanup = require('./jobs/Cleanup.js')
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Schedule the clean up
scheduleCleanup();  