import { useState } from "react";
import { motion } from "framer-motion";
import {
	HiOutlineLocationMarker,
	HiOutlineMail,
	HiOutlinePhone,
} from "react-icons/hi";

function ContactSection() {
	const [formData, setFormData] = useState({
		user_name: "",
		user_phone: "",
		user_email: "",
		message: "",
	});
	const [errors, setErrors] = useState({});

	const { user_name, user_phone, user_email, message } = formData;

	// Handle input changes
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// Validate form data
	const validateForm = () => {
		let formErrors = {};
		let isValid = true;

		if (user_name.trim() === "") {
			formErrors.user_name = "Name is required";
			isValid = false;
		}

		if (user_phone.trim() === "") {
			formErrors.user_phone = "Phone number is required";
			isValid = false;
		}

		if (user_email.trim() === "") {
			formErrors.user_email = "Email is required";
			isValid = false;
		}

		if (message.trim() === "") {
			formErrors.message = "Message is required";
			isValid = false;
		}

		setErrors(formErrors);
		return isValid;
	};

	// Create mailto link for submission
	const mailtoLink = `mailto:contact@brothersgarage.com?subject=Appointment Request from ${user_name}&body=Name: ${user_name}%0APhone: ${user_phone}%0AEmail: ${user_email}%0AMessage: ${message}`;

	// Handle form submission
	const handleSubmit = (e) => {
		e.preventDefault();

		if (validateForm()) {
			// Submit the form
			window.location.href = mailtoLink;
		}
	};

	return (
		<section id="contact" className="py-20 -mx-4 bg-blue-800 text-white">
			<div className="container mx-auto flex flex-col lg:flex-row items-start gap-12 px-6 lg:px-12">
				{/* Left Side - Contact Details */}
				<motion.div
					className="lg:w-1/2"
					initial={{ opacity: 0, x: -50 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
				>
					<h4 className="text-yellow-300 text-sm font-semibold tracking-widest uppercase mb-4">
						Make Appointment
					</h4>
					<h2 className="text-4xl font-bold mb-6">
						Trust Our Service to Get You Back on the Road!
					</h2>
					<p className="mb-8">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
						tellus, luctus nec ullamcorper mattis.
					</p>

					<div className="space-y-6">
						<div className="flex items-center space-x-4">
							<HiOutlineLocationMarker className="text-3xl text-yellow-300" />
							<p>123 Main St, Cityville, ST 12345</p>
						</div>
						<div className="flex items-center space-x-4">
							<HiOutlineMail className="text-3xl text-yellow-300" />
							<p>support@brothersgarage.com</p>
						</div>
						<div className="flex items-center space-x-4">
							<HiOutlinePhone className="text-3xl text-yellow-300" />
							<p>(123) 456-7890</p>
						</div>
					</div>
				</motion.div>

				{/* Right Side - Contact Form */}
				<motion.div
					className="lg:w-1/2 w-full bg-white text-gray-800 rounded-lg shadow-lg p-8"
					initial={{ opacity: 0, x: 50 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
				>
					<h3 className="text-2xl font-bold mb-6 text-center">
						How Can We Help?
					</h3>
					{/* Name Input */}
					<div className="mb-4">
						<label
							htmlFor="user_name"
							className="block text-sm font-medium mb-2"
						>
							Your Name
						</label>
						<input
							type="text"
							name="user_name"
							id="user_name"
							value={user_name}
							onChange={handleChange}
							placeholder="John Doe"
							className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm ${
								errors.user_name ? "border-red-500" : "border-gray-300"
							}`}
						/>
						{errors.user_name && (
							<p className="text-red-500 text-xs mt-1">{errors.user_name}</p>
						)}
					</div>
					{/* Phone Number Input */}
					<div className="mb-4">
						<label
							htmlFor="user_phone"
							className="block text-sm font-medium mb-2"
						>
							Phone Number
						</label>
						<input
							type="tel"
							name="user_phone"
							id="user_phone"
							value={user_phone}
							onChange={handleChange}
							placeholder="(123) 456-7890"
							className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm ${
								errors.user_phone ? "border-red-500" : "border-gray-300"
							}`}
						/>
						{errors.user_phone && (
							<p className="text-red-500 text-xs mt-1">{errors.user_phone}</p>
						)}
					</div>
					{/* Email Input */}
					<div className="mb-4">
						<label
							htmlFor="user_email"
							className="block text-sm font-medium mb-2"
						>
							Email Address
						</label>
						<input
							type="email"
							name="user_email"
							id="user_email"
							value={user_email}
							onChange={handleChange}
							placeholder="you@example.com"
							className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm ${
								errors.user_email ? "border-red-500" : "border-gray-300"
							}`}
						/>
						{errors.user_email && (
							<p className="text-red-500 text-xs mt-1">{errors.user_email}</p>
						)}
					</div>
					{/* Message Input */}
					<div className="mb-6">
						<label htmlFor="message" className="block text-sm font-medium mb-2">
							Your Issue
						</label>
						<textarea
							name="message"
							id="message"
							value={message}
							onChange={handleChange}
							placeholder="Describe your issue..."
							className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm ${
								errors.message ? "border-red-500" : "border-gray-300"
							}`}
							rows="4"
						></textarea>
						{errors.message && (
							<p className="text-red-500 text-xs mt-1">{errors.message}</p>
						)}
					</div>
					{/* Submit Button */}
					<button
						onClick={handleSubmit}
						className="w-full block text-center text-black bg-yellow-500 font-semibold text-lg py-3 rounded hover:bg-green-800 transition duration-200"
					>
						Send Message
					</button>
				</motion.div>
			</div>
		</section>
	);
}

export default ContactSection;
