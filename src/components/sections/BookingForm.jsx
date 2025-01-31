import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import {
    FaCalendarAlt,
    FaClock,
    FaUser,
    FaEnvelope,
    FaPhone,
    FaCar,
    FaComment,
    FaCheckCircle,
    FaMapMarkerAlt
} from "react-icons/fa";
import { FiMail } from "react-icons/fi";

const BookingForm = () => {
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

    const garageOptions = ["Garage MT Limited", "Garage MT"];

    const availableTimeSlots = [
        "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
        "12:00", "12:30", "14:00", "14:30", "15:00", "15:30",
        "16:00", "16:30", "17:00"
    ];

    const validateForm = () => {
        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Full name is required.";
        if (!formData.email.trim()) newErrors.email = "Email is required.";
        if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
        if (!formData.garage) newErrors.garage = "Please select a garage.";
        if (!formData.date) newErrors.date = "Please select a date.";
        if (!formData.time) newErrors.time = "Please select a time.";
        // if (!formData.vehicleMake.trim()) newErrors.vehicleMake = "Vehicle make is required.";
        // if (!formData.vehicleModel.trim()) newErrors.vehicleModel = "Vehicle model is required.";
        // if (!formData.vehicleYear.trim()) newErrors.vehicleYear = "Vehicle year is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!validateForm()) {
            setMessage("❌ Please fill in all required fields.");
            return;
        }

        setIsSubmitting(true);

        console.log("📤 Sending data:", formData);  // Debugging: Log data before sending

        try {
            const response = await axios.post("https://garage-booking-backend.onrender.com/api/bookings", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log("✅ Server response:", response.data);

            if (response.status === 200) {
                setMessage("✅ Booking confirmed! A confirmation email will be sent.");
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
            console.error("❌ Booking error:", error.response ? error.response.data : error.message);
            setMessage("❌ Something went wrong. Please try again.");
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

    return (
        <div className="lg:container mx-auto bg-white shadow-xl rounded-2xl ">
            <div className="flex items-center justify-center rounded-t-xl py-4 mb-4 border-b border-gray-200 bg-red-600 text-white text-center">
                <FiMail className="size-6 inline-block mr-2 mt-[2px]" />
                <h3 className="text-2xl font-bold inline-block">Book a Meeting!</h3>
            </div>

            {message && (
                <div className={`p-4 mb-6 text-center rounded-lg font-medium ${message.includes("✅")
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                    }`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 shadow-xl p-6">
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Personal Information Section */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="pl-10 w-full p-3 text-black border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="pl-10 w-full text-black p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Phone Number
                            </label>
                            <div className="relative">
                                <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="pl-10 w-full text-black p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    placeholder="+1 234 567 8900"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Appointment Details Section */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Select Garage
                            </label>
                            <div className="relative">
                                <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <select
                                    name="garage"
                                    value={formData.garage}
                                    onChange={handleChange}
                                    className="pl-10 w-full text-black p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                >
                                    <option value="">Select a garage</option>
                                    {garageOptions.map((garage, index) => (
                                        <option key={index} value={garage}>{garage}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Date
                            </label>
                            <div className="relative">
                                <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <DatePicker
                                    selected={formData.date}
                                    onChange={date => setFormData(prev => ({ ...prev, date }))}
                                    minDate={new Date()}
                                    className="pl-10 w-full text-black p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    placeholderText="Choose a date"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Time
                            </label>
                            <div className="relative">
                                <FaClock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <select
                                    name="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                    className="pl-10 w-full text-black p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                >
                                    <option value="">Select a time</option>
                                    {availableTimeSlots.map((time, index) => (
                                        <option key={index} value={time}>{time}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vehicle Information Section */}
                <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Vehicle Information</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Make
                            </label>
                            <div className="relative">
                                <FaCar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    name="vehicleMake"
                                    value={formData.vehicleMake}
                                    onChange={handleChange}
                                    className="pl-10 w-full text-black p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    placeholder="Toyota, Ford..."
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Model
                            </label>
                            <input
                                type="text"
                                name="vehicleModel"
                                value={formData.vehicleModel}
                                onChange={handleChange}
                                className="w-full p-3 border text-black border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                placeholder="Corolla, Mustang..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Year
                            </label>
                            <input
                                type="text"
                                name="vehicleYear"
                                value={formData.vehicleYear}
                                onChange={handleChange}
                                className="w-full p-3 border text-black border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                placeholder="2023"
                            />
                        </div>
                    </div>
                </div>

                {/* Additional Notes Section */}
                <div className="pt-6">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Additional Notes
                    </label>
                    <div className="relative">
                        <FaComment className="absolute left-3 top-3 text-gray-400" />
                        <textarea
                            name="note"
                            value={formData.note}
                            onChange={handleChange}
                            className="pl-10 w-full text-black p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent min-h-[100px]"
                            placeholder="Any additional information..."
                        />
                    </div>
                </div>

                {/* Marketing Consent */}
                <div className="flex items-center gap-3 pt-4">
                    <input
                        type="checkbox"
                        name="consentForMarketing"
                        checked={formData.consentForMarketing}
                        onChange={handleChange}
                        className="w-5 h-5 border-gray-300 rounded text-red-600 focus:ring-red-500"
                    />
                    <label className="text-sm text-gray-600">
                        I agree to receive marketing communications about special offers and promotions.
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-red-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-8"
                >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                            <FaCheckCircle className="animate-spin" />
                            Processing...
                        </span>
                    ) : (
                        "Confirm Booking"
                    )}
                </button>
            </form>
        </div>
    );
};

export default BookingForm;