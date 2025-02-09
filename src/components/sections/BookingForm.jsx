import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { toast } from "react-toastify"; // Import toast notification
import "react-toastify/dist/ReactToastify.css"; // Import toast styles


import { useRef } from "react";
import VariableProximityText from "../../components/VariableProximityText";

import {
    FaCalendarAlt,
    FaClock,
    FaUser,
    FaEnvelope,
    FaPhone,
    FaCar,
    FaComment,
    FaCheckCircle,
    FaMapMarkerAlt,
    FaArrowRight,
    FaArrowLeft
} from "react-icons/fa";

const BookingForm = () => {
    const containerRef = useRef(null);


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        garage: "",
        date: null,
        time: "",
        vehicleMake: "",
        vehicleModel: "",
        vehicleYear: "",
        note: "",
        consentForMarketing: true,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});
    const [bookedTimes, setBookedTimes] = useState([]); // Store booked times
    const [loadingTimes, setLoadingTimes] = useState(false); // Track loading state
    const [fetchError, setFetchError] = useState(null); // Track errors


    const garageOptions = ["Garage MT Limited", "Garage MT"]; // Use valid backend values

    const availableTimeSlots = [
        "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
        "12:00", "12:30", "14:00", "14:30", "15:00", "15:30",
        "16:00", "16:30", "17:00"
    ];


    const checkTimeSlotAvailability = async (selectedTime) => {
        if (!formData.date || !formData.garage) {
            toast.error("❌ Please select a date and garage first.");
            return;
        }

        const formattedDate = formData.date.toISOString().split("T")[0];

        try {
            const response = await axios.get(
                `https://garage-booking-backend.onrender.com/api/bookings/availability?date=${formattedDate}&garage=${formData.garage}`
            );

            const updatedBookedTimes = response.data.bookedTimes || [];

            if (updatedBookedTimes.includes(selectedTime)) {
                toast.error("❌ This time slot is already booked. Please choose another.");
                return;
            }

            // If the slot is available, update the selected time
            setFormData((prev) => ({ ...prev, time: selectedTime }));
        } catch (error) {
            console.error("❌ Error checking time slot:", error);
            toast.error("⚠️ Could not verify time slot availability. Try again.");
        }
    };



    const fetchBookedTimes = async () => {
        if (!formData.date || !formData.garage) {
            setBookedTimes([]); // Reset if no date or garage is selected
            return;
        }

        const formattedDate = formData.date.toISOString().split("T")[0];

        setLoadingTimes(true);
        setFetchError(null);

        try {
            const response = await axios.get(
                `https://garage-booking-backend.onrender.com/api/bookings/availability?date=${formattedDate}&garage=${formData.garage}`
            );

            console.log("API Response:", response.data); // 🔍 Debugging API response

            if (response.data && Array.isArray(response.data.bookedTimes)) {
                setBookedTimes(response.data.bookedTimes); // ✅ Correctly updates booked times
            } else {
                setBookedTimes([]); // ✅ Ensure UI knows no bookings exist
            }
        } catch (error) {
            console.error("❌ Error fetching availability:", error.response?.data || error.message);
            setFetchError("Failed to load availability.");
            setBookedTimes([]); // Prevent stuck state
        }

        setLoadingTimes(false);
    };


    // Fetch booked times whenever `date` or `garage` changes
    useEffect(() => {
        if (formData.date && formData.garage) {
            fetchBookedTimes();
        }
    }, [formData.date, formData.garage]);


    const validateForm = () => {
        let newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?\d{7,15}$/; // Supports international numbers

        if (!formData.name.trim()) newErrors.name = "Full name is required.";
        if (!formData.email.trim() || !emailRegex.test(formData.email))
            newErrors.email = "Enter a valid email address.";
        if (!formData.phone.trim() || !phoneRegex.test(formData.phone))
            newErrors.phone = "Enter a valid phone number.";
        if (!formData.garage) newErrors.garage = "Please select a garage.";
        if (!formData.date) newErrors.date = "Please select a date.";
        if (!formData.time) newErrors.time = "Please select a time.";

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            toast.error("❌ Please fix the errors before submitting.");
        }

        return Object.keys(newErrors).length === 0;
    };




    // HandleSubmit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(""); // Clear previous messages

        if (!validateForm()) {
            setMessage("❌ Please fill in all required fields correctly.");
            toast.error("❌ Please fill in all required fields correctly.");
            return;
        }

        setIsSubmitting(true);
        console.log("📤 Sending data:", formData);

        try {
            const response = await axios.post(
                "https://garage-booking-backend.onrender.com/api/bookings",
                formData,
                { headers: { "Content-Type": "application/json" } }
            );

            console.log("✅ Server response:", response.data);

            if (response.status === 201) {
                // ✅ Success: Booking created
                toast.success("✅ Booking created successfully!");
                setMessage("✅ Booking created successfully! A confirmation email will be sent.");

                // Clear form after successful booking
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    garage: "",
                    date: null,
                    time: "",
                    vehicleMake: "",
                    vehicleModel: "",
                    vehicleYear: "",
                    note: "",
                    consentForMarketing: true,
                });

                setErrors({});
            }
        } catch (error) {
            console.error("❌ Booking error:", error.response?.data || error.message);

            if (error.response) {
                if (error.response.status === 500) {
                    // ❌ 500 Error: Likely an already booked time slot
                    setMessage("❌ This time slot is already booked. Please choose another.");
                    toast.error("❌ This time slot is already booked. Please choose another.");
                } else if (error.response.status === 400) {
                    // ❌ 400 Error: Validation or duplicate booking issue
                    setMessage("❌ Error: " + (error.response.data.message || "Invalid request."));
                    toast.error("❌ Error: " + (error.response.data.message || "Invalid request."));
                } else {
                    // ❌ Other server errors
                    setMessage("❌ Something went wrong. Please try again.");
                    toast.error("⚠️ Something went wrong. Please try again.");
                }
            } else {
                // ❌ Network or unknown issue
                setMessage("❌ Unable to connect. Please check your network.");
                toast.error("⚠️ Unable to connect. Please check your network.");
            }
        }

        setIsSubmitting(false);
    };






    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };



    const [step, setStep] = useState(1);

    const garageImages = {
        "Garage MT Limited": "/assets/images/entry3.jpg",
        "Garage MT": "/assets/images/hero.jpg"
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const isTimeSlotBooked = (time) => bookedTimes.includes(time);
    const isWeekday = (date) => {
        const day = date.getDay();
        return day !== 0; // Return false for Sunday
    };

    const isPublicHoliday = (date) => {
        // Add your public holiday logic here
        return false;
    };

    return (
        <div className="bg-white py-12 rounded-2xl px-4 sm:px-6 lg:px-8">
            <div className="flex cursor-default items-center justify-center" ref={containerRef} style={{ position: "relative", padding: "50px" }}>
                <VariableProximityText
                    text="Book a Meeting!"
                    fromSettings="'wght' 400, 'opsz' 9"
                    toSettings="'wght' 1000, 'opsz' 40"
                    containerRef={containerRef}
                    radius={120}
                    falloff="gaussian"
                    className="text-red-600 lg:text-8xl text-6xl md:mt-0 -mt-10"
                />
            </div>
            <div className="max-w-8xl mx-auto">
                {/* Progress Steps */}
                <div className="mb-12">
                    <div className="flex justify-between items-center relative">
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>
                        {[1, 2, 3].map((num) => (
                            <div
                                key={num}
                                className={`flex flex-col items-center ${step >= num ? "text-red-600" : "text-gray-400"
                                    }`}
                            >

                                <div
                                    className={`w-12 h-12 rounded-full cursor-default flex items-center justify-center border-2 bg-white
                                        ${step >= num
                                            ? "border-red-600 text-red-600"
                                            : "border-gray-300"
                                        }
                                        transition-all duration-300 ease-in-out`}
                                >
                                    {num}
                                </div>
                                <div className="mt-3 font-semibold text-black">
                                    {num === 1
                                        ? "Select Garage"
                                        : num === 2
                                            ? "Choose Time"
                                            : "Personal Info"}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {step === 1 && (
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        className="bg-white rounded-xl shadow-2xl p-8 border border-gray-100"
                    >
                        <h2 className="text-3xl font-bold mb-8 text-black">Select Your Garage</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {garageOptions.map((garage) => (
                                <motion.div
                                    key={garage}
                                    whileHover={{ scale: 1.02 }}
                                    className={`rounded-2xl overflow-hidden cursor-pointer transition-all duration-300
                                        ${formData.garage === garage
                                            ? "ring-8 ring-red-600 hover:shadow-2xl hover:shadow-red-600"
                                            : "hover:shadow-2xl hover:shadow-red-600"
                                        }`}
                                    onClick={() => handleChange({
                                        target: { name: "garage", value: garage },
                                    })}
                                >
                                    <div className="relative h-64">
                                        <img
                                            src={garageImages[garage]}
                                            alt={garage}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 right-0 p-6">
                                            <h3 className="text-xl font-bold text-white mb-2">{garage}</h3>
                                            <p className="text-gray-200 text-sm">
                                                Premium service with state-of-the-art equipment
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-8 flex justify-center md:justify-end">
                            <button
                                onClick={() => setStep(2)}
                                disabled={!formData.garage}
                                className="bg-red-600 text-white px-8 py-3 rounded-lg flex items-center space-x-3 
                                    disabled:opacity-50 hover:bg-red-700 transition-colors duration-300"
                            >
                                <span className="font-semibold">Continue</span>
                                <FaArrowRight />
                            </button>
                        </div>
                    </motion.div>
                )}
                {step === 2 && (
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        className="bg-white rounded-xl shadow-2xl p-8 border border-gray-100"
                    >
                        <h2 className="text-3xl font-bold mb-8 text-black">Choose Your Time</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">


                            <div className="space-y-4 mt-10">
                                <label className="block text-lg font-semibold text-black">
                                    Select Date
                                </label>
                                <DatePicker
                                    selected={formData.date}
                                    onChange={(date) => {
                                        setFormData((prev) => ({ ...prev, date }));
                                        setBookedTimes([]); // Reset booked times to prevent stale data
                                    }}
                                    filterDate={isWeekday}
                                    minDate={new Date()}
                                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-red-600 
                        focus:ring-1 focus:ring-red-600 outline-none text-black"
                                    dateFormat="MMMM d, yyyy"
                                />
                            </div>


                            <div className="space-y-4">
                                <label className="block text-lg font-semibold text-black">
                                    Select Time
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    {loadingTimes ? (
                                        <p className="text-gray-500">Checking availability...</p>
                                    ) : fetchError ? (
                                        <p className="text-red-500">{fetchError}</p>
                                    ) : (
                                        availableTimeSlots.map((time) => {
                                            return (
                                                <motion.button
                                                    key={time}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    disabled={bookedTimes.includes(time)}  // ✅ Disable if already booked
                                                    onClick={() => checkTimeSlotAvailability(time)}
                                                    className={`p-3 rounded-lg text-center transition-all duration-300
        ${formData.time === time ? "bg-red-600 text-white font-semibold"
                                                            : bookedTimes.includes(time) ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                                : "bg-gray-50 text-black hover:bg-gray-100"}`}
                                                >
                                                    {time}
                                                </motion.button>
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col md:flex-row space-y-4 md:space-y-0 justify-between">
                            <button
                                onClick={() => setStep(1)}
                                className="bg-gray-100 text-black px-8 py-3 rounded-lg flex items-center justify-center space-x-3
                    hover:bg-gray-200 transition-colors duration-300"
                            >
                                <span className="font-semibold">Back</span>
                                <FaArrowLeft />
                            </button>
                            <button
                                onClick={() => {
                                    if (!formData.time) {
                                        toast.error("❌ Please select a valid available time slot before proceeding.");
                                        return;
                                    }
                                    setStep(3);
                                }}
                                className="bg-red-600 text-white px-8 py-3 rounded-lg flex items-center justify-center space-x-3
                    disabled:opacity-50 hover:bg-red-700 transition-colors duration-300"
                            >
                                <span className="font-semibold">Continue</span>
                                <FaArrowRight />
                            </button>
                        </div>
                    </motion.div>
                )}




                {step === 3 && (
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        className="bg-white rounded-xl shadow-2xl p-8 border border-gray-100"
                    >
                        <h2 className="text-3xl font-bold mb-8 text-black">Personal Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { label: "Full Name *", name: "name", type: "text", icon: FaUser, placeholder: "John Doe" },
                                { label: "Email *", name: "email", type: "email", icon: FaEnvelope, placeholder: "john@example.com" },
                                { label: "Phone *", name: "phone", type: "tel", icon: FaPhone, placeholder: "+1234567890" },

                                { label: "Vehicle Make", name: "vehicleMake", type: "text", icon: FaCar, placeholder: "BMW" },
                                { label: "Vehicle Model", name: "vehicleModel", type: "text", icon: FaCar, placeholder: "X5" },
                                { label: "Vehicle Year", name: "vehicleYear", type: "text", icon: FaCar, placeholder: "2024" }

                            ].map((field) => (
                                <div key={field.name} className="space-y-2">
                                    <label className="block text-lg font-semibold text-black">
                                        {field.label}
                                    </label>
                                    <div className="relative">
                                        <field.icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type={field.type}
                                            name={field.name}
                                            value={formData[field.name]}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg
                                                focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none
                                                transition-all duration-300 text-black"
                                            placeholder={field.placeholder}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 space-y-2">
                            <label className="block text-lg font-semibold text-black">
                                Additional Notes
                            </label>
                            <div className="relative">
                                <FaComment className="absolute left-4 top-4 text-gray-400" />
                                <textarea
                                    name="note"
                                    value={formData.note}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg
                                        focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none
                                        transition-all duration-300 text-black"
                                    rows="4"
                                    placeholder="Any special requirements..."
                                />
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col md:flex-row md:space-y-0 md:justify-between space-y-4">
                            <button
                                onClick={() => setStep(2)}
                                className="bg-gray-100 text-black px-8 py-3 rounded-lg flex items-center justify-center space-x-3
                                    hover:bg-gray-200 transition-colors duration-300"
                            >
                                <span className="font-semibold">Back</span>
                                <FaArrowLeft />
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="bg-red-600 text-white px-8 py-3 rounded-lg flex items-center justify-center space-x-3
                                    disabled:opacity-50 hover:bg-red-700 transition-colors duration-300"
                            >
                                {isSubmitting ? (
                                    <span className="font-semibold">Processing...</span>
                                ) : (
                                    <>
                                        <span className="font-semibold">Book Appointment</span>
                                        <FaCheckCircle />
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                )}

                {message && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mt-6 p-4 rounded-lg ${message.includes("✅")
                            ? "bg-green-50 text-green-800 border border-green-200"
                            : "bg-red-50 text-red-800 border border-red-200"
                            }`}
                    >
                        {message}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default BookingForm;