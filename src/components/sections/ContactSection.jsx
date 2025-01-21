import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
	HiOutlineLocationMarker,
	HiOutlineMail,
	HiOutlinePhone,
} from "react-icons/hi";
import { MapIcon, MapPinIcon } from "@heroicons/react/20/solid";

// Business locations as constants
const businessLocations = {
	garage_1: {
		name: "Garage 1",
		address: "1, Birżebbuġa, Malta",
		mapSrc:
			"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d430.71315598264846!2d14.518804705763193!3d35.8157334542468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130e5b522c15549b%3A0x82174cca8e4c099b!2sGARAGE%20MT!5e1!3m2!1sde!2sde!4v1732807341130!5m2!1sde!2sde",
	},
	garage_2: {
		name: "Garage 2",
		address: "Vjal Il-25 Novembru, Iż-Żejtun, Malta",
		mapSrc:
			"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248.69393882937254!2d14.524665593205865!3dVjal Il-25 Novembru, Iż-Żejtun, Malta35.853644799951276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130e5b3e0628b271%3A0x705b09517ef44cfa!2sRenAuto%20Garage!5e1!3m2!1sde!2sus!4v1729684105982!5m2!1sen!2sus",
	},
};

function ContactSection() {
	const [formData, setFormData] = useState({
		user_name: "",
		user_phone: "",
		user_email: "",
		message: "",
	});
	const [errors, setErrors] = useState({});
	const [isLoaded, setIsLoaded] = useState(false); // Track when the animations are done loading
	const [selectedLocation, setSelectedLocation] = useState("garage_1"); // Track the selected location and set garage_2 as default

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

	// Handle form submission
	const handleSubmit = (e) => {
		e.preventDefault();

		if (validateForm()) {
			const mailtoLink = `mailto:info@garage.mt?subject=Appointment Request from ${user_name}&body=Name: ${user_name}%0APhone: ${user_phone}%0AEmail: ${user_email}%0AMessage: ${message}`;
			window.location.href = mailtoLink;
		}
	};

	useEffect(() => {
		// Disable body overflow during the load
		document.body.style.overflowX = isLoaded ? "auto" : "hidden";

		// Cleanup on unmount
		return () => {
			document.body.style.overflowX = "auto";
		};
	}, [isLoaded]);

	return (
		<section
			id="contact"
			className="py-20 bg-gradient-to-r  from-red-600 via-red-800 to-black text-white"
		>
			<div className="container mx-auto flex flex-col lg:flex-row items-start gap-12 px-6 lg:px-12">
				{/* Left Side - Contact Details */}
				<motion.div
					className="lg:w-1/2"
					initial={{ opacity: 0, x: -50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8 }}
					onAnimationComplete={() => setIsLoaded(true)} // Once animation is complete, mark loaded
				>
					<h4 className="text-yellow-300 text-sm font-semibold tracking-widest uppercase mb-4">
						Make an Appointment
					</h4>
					<h2 className="text-4xl font-bold mb-2 leading-snug">
						We’re Here to Help You Get Back on the Road!
					</h2>
					<p className="mb-8 text-gray-200">
						Our team is ready to assist you. Contact us today for all your
						service needs, and we’ll ensure you get back on the road safely and
						quickly.
					</p>

					<div className="space-y-6">
						<div className="flex items-center space-x-4">
							<HiOutlineMail className="text-3xl text-yellow-300" />
							<a
								href="mailto:info@garage.mt"
								className="text-white hover:text-yellow-300"
							>
								info@garage.mt
							</a>
						</div>
						<div className="flex items-center space-x-4">
							<HiOutlinePhone className="text-3xl text-yellow-300" />
							<p>+356 770 88 222</p>
						</div>

						{/* Location Selection */}
						<div className="mt-6 flex space-x-4">
							<button
								onClick={() => setSelectedLocation("garage_1")}
								className={`text-white flex items-center gap-2 hover:text-yellow-300 ${selectedLocation === "garage_1" ? "rounded-lg p-1 px-2 border-2 border-yellow-300 text-black" : ""}`}
							>
								Garage 1
								<MapPinIcon className="w-4 h-4" />
							</button>
							<button
								onClick={() => setSelectedLocation("garage_2")}
								className={`text-white flex items-center gap-2 hover:text-yellow-300 ${selectedLocation === "garage_2" ? "rounded-lg p-1 px-2 border-2 border-yellow-300 text-black" : ""}`}
							>
								Garage 2
								<MapPinIcon className="w-4 h-4" />
							</button>
						</div>

						{/* Display selected location */}
						{selectedLocation && (
							<div className="mt-4 sm:mr-32 md:mr-2 mr-2">
								<h4 className="text-xl font-semibold text-yellow-300 mb-4">
									{businessLocations[selectedLocation].name}
								</h4>
								<div className="flex items-center space-x-4">
									<HiOutlineLocationMarker className="text-3xl text-yellow-300" />
									<p>{businessLocations[selectedLocation].address}</p>
								</div>
								{/* Embedded Google Map */}
								<div className="mt-4 sm:mr-32 md:mr-2 mr-2 rounded-lg overflow-hidden">
									<iframe
										src={businessLocations[selectedLocation].mapSrc}
										width="100%"
										height="200"
										style={{ border: 0 }}
										allowFullScreen=""
										loading="lazy"
									></iframe>
								</div>
							</div>
						)}
					</div>
				</motion.div>

				{/* Right Side - Contact Form */}
				<motion.div
					className="lg:w-1/2 sm:mx-0 -mx-1 w-full bg-white text-gray-800 rounded-xl shadow-lg p-10 py-16"
					initial={{ opacity: 0, x: 50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8 }}
					onAnimationComplete={() => setIsLoaded(true)} // Mark the form as loaded
				>
					<h3 className="text-2xl font-bold mb-6 text-center">
						How Can We Help?
					</h3>
					<form onSubmit={handleSubmit}>
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
								placeholder="eg. John Doe"
								className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm ${errors.user_name ? "border-red-500" : "border-gray-300"
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
								placeholder="eg. +356 99 123456"
								className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm ${errors.user_phone ? "border-red-500" : "border-gray-300"
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
								placeholder="eg. you@example.com"
								className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm ${errors.user_email ? "border-red-500" : "border-gray-300"
									}`}
							/>
							{errors.user_email && (
								<p className="text-red-500 text-xs mt-1">{errors.user_email}</p>
							)}
						</div>
						{/* Message Input */}
						<div className="mb-6">
							<label
								htmlFor="message"
								className="block text-sm font-medium mb-2"
							>
								Your Message
							</label>
							<textarea
								name="message"
								id="message"
								value={message}
								onChange={handleChange}
								placeholder="Describe your issue..."
								className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm ${errors.message ? "border-red-500" : "border-gray-300"
									}`}
								rows="4"
							></textarea>
							{errors.message && (
								<p className="text-red-500 text-xs mt-1">{errors.message}</p>
							)}
						</div>
						{/* Submit Button */}
						<button
							type="submit"
							className="w-full block text-center text-white bg-red-500 font-semibold text-lg py-3 rounded-lg hover:bg-red-700 transition duration-200"
						>
							Send Message
						</button>
					</form>
				</motion.div>
			</div>
		</section>
	);
}

export default ContactSection;
