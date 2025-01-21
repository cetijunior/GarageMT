import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { motion } from "framer-motion";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiMapPin, FiClock, FiCalendar, FiUser, FiMail } from 'react-icons/fi';
import axios from 'axios';
import { addBookingToCalendar } from '../../services/bookingService';

function BookingSection() {
    const [bookings, setBookings] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [notes, setNotes] = useState("");

    const garageLocations = {
        garage_1: {
            name: "Garage 1",
            address: "1, Birżebbuġa, Malta",
            hours: "Mon-Sat: 9:00 AM - 5:00 PM",
            mapSrc:
                "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d430.71315598264846!2d14.518804705763193!3d35.8157334542468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130e5b522c15549b%3A0x82174cca8e4c099b!2sGARAGE%20MT!5e1!3m2!1sde!2sde!4v1732807341130!5m2!1sde!2sde",
        },
        garage_2: {
            name: "Garage 2 - Iż-Żejtun",
            address: "Vjal Il-25 Novembru, Iż-Żejtun, Malta",
            hours: "Mon-Sat: 9:00 AM - 5:00 PM",
            mapSrc:
                "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248.69393882937254!2d14.524665593205865!3dVjal Il-25 Novembru, Iż-Żejtun, Malta35.853644799951276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130e5b3e0628b271%3A0x705b09517ef44cfa!2sRenAuto%20Garage!5e1!3m2!1sde!2sus!4v1729684105982!5m2!1sen!2sus",
        }
    };

    const [mapType, setMapType] = useState('satellite');

    const toggleMapType = () => {
        setMapType(prevType => prevType === 'satellite' ? 'roadmap' : 'satellite');
    };

    const getMapSrc = (location) => {
        const baseUrl = garageLocations[location].mapSrc.split('&')[0];
        return `${baseUrl}&maptype=${mapType}`;
    };

    const availableTimes = ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM"];

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = () => {
        const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
        setBookings(storedBookings);
    };

    const handleBooking = async () => {
        console.log('Starting booking process...');

        if (!validateForm()) {
            console.log('Form validation failed');
            return;
        }

        try {
            console.log('Form Data:', {
                name,
                email,
                phone,
                date: selectedDate,
                time: selectedTime,
                location: selectedLocation,
                notes
            });

            const bookingData = {
                name,
                email,
                phone,
                date: selectedDate,
                time: selectedTime,
                location: selectedLocation,
                notes
            };

            console.log('Attempting to add booking to calendar...');
            const result = await addBookingToCalendar(bookingData);
            console.log('Calendar API Response:', result);

            toast.success("Booking confirmed! Check your email for details.");
            resetForm();
        } catch (error) {
            console.error("Booking Error Details:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            toast.error(error.response?.data?.error || "Failed to complete booking. Please try again.");
        }
    };

    const validateForm = () => {
        console.log('Validating form fields:', {
            name: !!name,
            email: !!email,
            phone: !!phone,
            date: !!selectedDate,
            time: !!selectedTime,
            location: !!selectedLocation
        });

        if (!selectedLocation) {
            console.log('Validation failed: No location selected');
            toast.error("Please select a garage location");
            return false;
        }
        if (!selectedTime) {
            console.log('Validation failed: No time selected');
            toast.error("Please select an appointment time");
            return false;
        }
        if (!name || !email || !phone) {
            console.log('Validation failed: Missing required fields');
            toast.error("Please fill in all required fields");
            return false;
        }
        console.log('Form validation passed');
        return true;
    };

    const resetForm = () => {
        setSelectedTime("");
        setName("");
        setEmail("");
        setPhone("");
        setNotes("");
    };

    const sendEmailNotification = async (booking) => {
        try {
            const response = await axios.post('/api/send-booking-email', {
                to: 'lameceti1@gmail.com',
                subject: 'New Booking Request',
                html: `
                    <h1>New Booking Request</h1>
                    <p><strong>Name:</strong> ${booking.name}</p>
                    <p><strong>Email:</strong> ${booking.email}</p>
                    <p><strong>Phone:</strong> ${booking.phone}</p>
                    <p><strong>Date:</strong> ${booking.date}</p>
                    <p><strong>Time:</strong> ${booking.time}</p>
                    <p><strong>Location:</strong> ${garageLocations[booking.location].name}</p>
                    <p><strong>Notes:</strong> ${booking.notes || 'N/A'}</p>
                `
            });
            console.log('Email sent successfully:', response.data);
        } catch (error) {
            console.error('Failed to send email:', error);
            throw new Error('Failed to send email notification');
        }
    };

    const isTimeBooked = (time) => {
        return bookings.some(booking =>
            booking.date === selectedDate.toDateString() &&
            booking.time === time &&
            booking.location === selectedLocation
        );
    };

    const fetchExistingBookings = async (startDate, endDate) => {
        try {
            const response = await calendar.events.list({
                calendarId: 'primary',
                timeMin: startDate.toISOString(),
                timeMax: endDate.toISOString(),
                singleEvents: true,
                orderBy: 'startTime',
            });

            return response.data.items;
        } catch (error) {
            console.error('Failed to fetch bookings:', error);
            throw error;
        }
    };

    const checkAvailability = async (date, time) => {
        try {
            const response = await calendar.events.list({
                calendarId: 'primary',
                timeMin: getDateTime(date, time),
                timeMax: getEndDateTime(date, time),
                singleEvents: true,
            });

            return response.data.items.length === 0;
        } catch (error) {
            console.error('Failed to check availability:', error);
            throw error;
        }
    };

    return (
        <section id="booking" className="py-24 bg-gradient-to-tr from-slate-900 to-gray-900 text-white min-h-screen">
            <ToastContainer position="top-center" autoClose={3000} />
            <div className="container mx-auto px-4 lg:px-12">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-5xl font-extrabold text-center mb-12"
                >
                    Book Your <span className="text-red-500">Consultation</span>
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="rounded-3xl shadow-2xl shadow-red-700 p-8"
                >
                    <h3 className="text-2xl font-semibold mb-6">Select a Garage Location</h3>
                    <div className="grid md:grid-cols-2 gap-6 mb-12">
                        {Object.entries(garageLocations).map(([key, location]) => (
                            <motion.div
                                key={key}
                                whileHover={{ scale: 1.02 }}
                                className={`p-6 rounded-2xl cursor-pointer transition-all ${selectedLocation === key
                                    ? 'bg-red-700 shadow-lg'
                                    : 'bg-gray-700 hover:bg-gray-600'
                                    }`}
                                onClick={() => setSelectedLocation(key)}
                            >
                                <div className="flex items-center mb-4">
                                    <FiMapPin className="text-2xl mr-3" />
                                    <h3 className="text-xl font-bold">{location.name}</h3>
                                </div>
                                <p className="text-gray-300 mb-2">{location.address}</p>
                                <p className="text-gray-300 mb-4">{location.hours}</p>
                                <iframe
                                    src={location.mapSrc}
                                    width="100%"
                                    height="150"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    className="rounded-lg"
                                ></iframe>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Left Column - Calendar & Time */}
                        <div>
                            <div className="mb-8">
                                <div className="flex items-center mb-4">
                                    <FiCalendar className="text-xl mr-2" />
                                    <h3 className="text-xl font-semibold">Select Date</h3>
                                </div>
                                <Calendar
                                    onChange={setSelectedDate}
                                    value={selectedDate}
                                    className="w-full rounded-xl shadow-lg bg-gray-700 text-white border-0 p-4"
                                    minDate={new Date()}
                                    tileDisabled={({ date }) => date.getDay() === 0}
                                />
                            </div>

                            <div>
                                <div className="flex items-center mb-4">
                                    <FiClock className="text-xl mr-2" />
                                    <h3 className="text-xl font-semibold">Select Time</h3>
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    {availableTimes.map((time) => (
                                        <motion.button
                                            key={time}
                                            onClick={() => setSelectedTime(time)}
                                            disabled={isTimeBooked(time)}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`py-3 px-4 rounded-xl ${selectedTime === time
                                                ? 'bg-red-500 text-white'
                                                : 'bg-gray-700 text-white hover:bg-gray-600'
                                                } ${isTimeBooked(time)
                                                    ? 'opacity-50 cursor-not-allowed'
                                                    : ''
                                                }`}
                                        >
                                            {time}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Contact Details & Summary */}
                        <div>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex items-center mb-4">
                                        <FiUser className="text-xl mr-2" />
                                        <h3 className="text-xl font-semibold">Your Details</h3>
                                    </div>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-gray-700 text-white py-3 px-4 rounded-xl mb-4"
                                        placeholder="Full Name *"
                                        required
                                    />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-gray-700 text-white py-3 px-4 rounded-xl mb-4"
                                        placeholder="Email Address *"
                                        required
                                    />
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full bg-gray-700 text-white py-3 px-4 rounded-xl mb-4"
                                        placeholder="Phone Number *"
                                        required
                                    />
                                    <textarea
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        className="w-full bg-gray-700 text-white py-3 px-4 rounded-xl"
                                        placeholder="Additional Notes (Optional)"
                                        rows="3"
                                    />
                                </div>

                                {/* Booking Summary */}
                                <div className="p-6 bg-gray-900 rounded-2xl">
                                    <h3 className="text-xl font-semibold mb-4">Booking Summary</h3>
                                    <div className="space-y-2 text-gray-300">
                                        <p>Location: {selectedLocation ? garageLocations[selectedLocation].name : 'Not selected'}</p>
                                        <p>Date: {selectedDate.toDateString()}</p>
                                        <p>Time: {selectedTime || 'Not selected'}</p>
                                    </div>
                                </div>

                                <motion.button
                                    onClick={handleBooking}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-red-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-red-600 transition-colors duration-200 shadow-lg"
                                >
                                    Confirm Booking
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default BookingSection;