import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
	HiOutlineLocationMarker,
	HiOutlineMail,
	HiOutlinePhone,
} from "react-icons/hi";
import { MapPinIcon } from "@heroicons/react/20/solid";
import { GARAGE_LOCATIONS } from "../../content/locations";

function ContactSection() {
	const [formData, setFormData] = useState({
		user_name: "",
		user_phone: "",
		user_email: "",
		message: "",
	});
	const [errors, setErrors] = useState({});
	const [isLoaded, setIsLoaded] = useState(false);
	const [selectedLocation, setSelectedLocation] = useState("LOCATION_2"); // Default location

	const { user_name, user_phone, user_email, message } = formData;

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

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

	const handleSubmit = (e) => {
		e.preventDefault();

		if (validateForm()) {
			const mailtoLink = `mailto:info@garage.mt?subject=Appointment Request from ${user_name}&body=Appointment Request Details:%0A%0A-----------------------------------------%0AName: ${user_name}%0APhone: ${user_phone}%0AEmail: ${user_email}%0APreferred Location: ${GARAGE_LOCATIONS[selectedLocation].name}%0A%0A-----------------------------------------%0AMessage:%0A${message}%0A%0A-----------------------------------------`;

			window.location.href = mailtoLink;
		}
	};

	useEffect(() => {
		document.body.style.overflowX = isLoaded ? "auto" : "hidden";
		return () => {
			document.body.style.overflowX = "auto";
		};
	}, [isLoaded]);

	return (
		<section
			id="contact"
			className="py-20 bg-gradient-to-r from-red-600 via-red-800 to-black text-white"
		>
			<div className="container mx-auto flex flex-col lg:flex-row items-start gap-12 px-6 lg:px-12">
				{/* Left Side - Contact Details */}
				<motion.div
					className="lg:w-1/2"
					initial={{ opacity: 0, x: -50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8 }}
					onAnimationComplete={() => setIsLoaded(true)}
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
							<p>{GARAGE_LOCATIONS[selectedLocation]?.phone || "+356 770 88 222"}</p>
						</div>

						{/* Location Selection */}
						<div className="mt-6 flex space-x-4">
							{Object.keys(GARAGE_LOCATIONS).map((key) => (
								<button
									key={key}
									onClick={() => setSelectedLocation(key)}
									className={`text-white flex items-center gap-2 hover:text-yellow-300 ${selectedLocation === key
										? "rounded-lg p-1 px-2 border-2 border-yellow-300 text-black"
										: ""
										}`}
								>
									{GARAGE_LOCATIONS[key].name}
									<MapPinIcon className="w-4 h-4" />
								</button>
							))}
						</div>

						{/* Display selected location */}
						{selectedLocation && (
							<div className="mt-4 w-full">
								<h4 className="text-3xl font-semibold text-yellow-300 mb-4">
									{GARAGE_LOCATIONS[selectedLocation].name}
								</h4>
								<div className="flex text-lg items-center space-x-4">
									<HiOutlineLocationMarker className="text-3xl text-yellow-300" />
									<p>{GARAGE_LOCATIONS[selectedLocation].address}</p>
								</div>
								<div className="mt-4 mr-0 rounded-lg overflow-hidden">
									<iframe
										src={GARAGE_LOCATIONS[selectedLocation].mapEmbedSrc}
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
				>
					<h3 className="text-2xl font-bold mb-6 text-center">
						How Can We Help?
					</h3>
					<form onSubmit={handleSubmit}>
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
