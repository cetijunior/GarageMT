const router = express.Router();

// Get available slots
router.get('/available-slots', async (req, res) => {
    try {
        const { date, location } = req.query;
        const slots = await checkAvailability(date, location);
        res.json(slots);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create booking
router.post('/create', async (req, res) => {
    try {
        const booking = await createBooking(req.body);
        res.json(booking);
        console.log('Incoming booking data:', req.body);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}); 