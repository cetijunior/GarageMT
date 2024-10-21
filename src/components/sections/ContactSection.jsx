import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiOutlineLocationMarker, HiOutlineMail, HiOutlinePhone } from "react-icons/hi";

// Business locations as constants
const businessLocations = {
	valletta: {
		name: "Valletta Garage",
		address: "12 Triq Sant' Ursola, Valletta, Malta",
		mapSrc:
			"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3072.121492949705!2d14.511999725601962!3d35.89703242251843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130e452b73df5997%3A0x5f6e73f9cbd0877d!2s272%20St%20Paul%20St%2C%20Valletta%2C%20Malta!5e1!3m2!1sde!2sus!4v1729021463779!5m2!1sde!2sus",
	},
	mosta: {
		name: "Garage",
		address: "Vjal Il-25 Novembru",
		mapSrc:
			"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d768.450843147797!2d14.523961669602306!3d35.853672598283296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130e5b3e0628b271%3A0x705b09517ef44cfa!2sRenAuto%20Garage!5e1!3m2!1sde!2sus!4v1729533125012!5m2!1sde!2sus",
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

						{/* Valletta Garage Location */}
						<div className="mt-6">
							<h4 className="text-xl font-semibold text-yellow-300 mb-4">
								{businessLocations.valletta.name}
							</h4>
							<div className="flex items-center space-x-4">
								<HiOutlineLocationMarker className="text-3xl text-yellow-300" />
								<p>{businessLocations.valletta.address}</p>
							</div>
							{/* Embedded Google Map */}
							<div className="mt-4 mr-32">
								<iframe
									src={businessLocations.valletta.mapSrc}
									width="100%"
									height="200"
									style={{ border: 0 }}
									allowFullScreen=""
									loading="lazy"
								></iframe>
							</div>
						</div>
					</div>
				</motion.div>

				{/* Right Side - Contact Form */}
				<motion.div
					className="lg:w-1/2 w-full bg-white text-gray-800 rounded-xl shadow-lg p-10"
					initial={{ opacity: 0, x: 50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8 }}
					onAnimationComplete={() => setIsLoaded(true)} // Mark the form as loaded
				>
					<h3 className="text-2xl font-bold mb-6 text-center">How Can We Help?</h3>
					<form onSubmit={handleSubmit}>
						{/* Name Input */}
						<div className="mb-4">
							<label htmlFor="user_name" className="block text-sm font-medium mb-2">
								Your Name
							</label>
							<input
								type="text"
								name="user_name"
								id="user_name"
								value={user_name}
								onChange={handleChange}
								placeholder="John Doe"
								className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm ${errors.user_name ? "border-red-500" : "border-gray-300"
									}`}
							/>
							{errors.user_name && (
								<p className="text-red-500 text-xs mt-1">{errors.user_name}</p>
							)}
						</div>
						{/* Phone Number Input */}
						<div className="mb-4">
							<label htmlFor="user_phone" className="block text-sm font-medium mb-2">
								Phone Number
							</label>
							<input
								type="tel"
								name="user_phone"
								id="user_phone"
								value={user_phone}
								onChange={handleChange}
								placeholder="(123) 456-7890"
								className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm ${errors.user_phone ? "border-red-500" : "border-gray-300"
									}`}
							/>
							{errors.user_phone && (
								<p className="text-red-500 text-xs mt-1">{errors.user_phone}</p>
							)}
						</div>
						{/* Email Input */}
						<div className="mb-4">
							<label htmlFor="user_email" className="block text-sm font-medium mb-2">
								Email Address
							</label>
							<input
								type="email"
								name="user_email"
								id="user_email"
								value={user_email}
								onChange={handleChange}
								placeholder="you@example.com"
								className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm ${errors.user_email ? "border-red-500" : "border-gray-300"
									}`}
							/>
							{errors.user_email && (
								<p className="text-red-500 text-xs mt-1">{errors.user_email}</p>
							)}
						</div>
						{/* Message Input */}
						<div className="mb-6">
							<label htmlFor="message" className="block text-sm font-medium mb-2">
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
