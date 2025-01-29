import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
	HiOutlineLocationMarker,
	HiOutlineMail,
	HiOutlinePhone,
} from "react-icons/hi";
import { MapPinIcon } from "@heroicons/react/20/solid";
import { GARAGE_LOCATIONS } from "../../content/locations";
import ModernBookingForm from "../sections/BookingForm";
import { FiMail } from "react-icons/fi";

function ContactSection() {
	const [formData, setFormData] = useState({
		user_name: "",
		user_phone: "",
		user_email: "",
		message: "",
	});
	const [errors, setErrors] = useState({});
	const [isLoaded, setIsLoaded] = useState(false);
	const [selectedLocation, setSelectedLocation] = useState("LOCATION_2");

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
		<section className="bg-gradient-to-r from-red-600 via-red-800 to-black text-white">

			<div className="mx-auto flex flex-col lg:flex-row px-6 lg:px-12">
				{/* 📞 Top Left - Contact Details */}
				<motion.div
					className="flex flex-col justify-center lg:w-1/2"
					initial={{ opacity: 0, x: 50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8 }}
				>
					<h4 className="text-yellow-300 lg:mt-0 mt-10 lg:text-lg text-md font-semibold uppercase mb-4 tracking-widest">
						Contact Information
					</h4>
					<h2 className="text-4xl font-bold mb-4 leading-snug">
						We’re Here to Help You Get Back on the Road!
					</h2>
					<p className="text-gray-200 mb-8">
						Our team is ready to assist you. Contact us today for all your service needs.
					</p>

					{/* Email & Phone */}
					<div className="space-y-4">
						<div className="flex items-center space-x-4">
							<HiOutlineMail className="text-3xl text-yellow-300" />
							<a
								href="mailto:info@garage.mt"
								className="text-xl font-semibold text-white hover:text-yellow-300">
								info@garage.mt
							</a>
						</div>
						<div className="flex items-center space-x-3">
							<HiOutlinePhone className="text-3xl text-yellow-300" />
							<p className="text-xl font-semibold">{GARAGE_LOCATIONS[selectedLocation]?.phone || "+356 770 88 222"}</p>
						</div>
					</div>

				</motion.div>

				{/* 🗺️ Top Right - MapView */}
				<motion.div
					className="flex flex-col lg:w-1/2"
					initial={{ opacity: 0, x: -50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8 }}
					onAnimationComplete={() => setIsLoaded(true)}
					id="contact"
				>
					<h4 className="text-yellow-300 lg:text-lg text-md font-semibold uppercase lg:pt-16 pt-10 mb-4 tracking-widest">
						Select Location
					</h4>

					{/* Location Selection Buttons */}
					<div className="flex space-x-4 mb-4">
						{Object.keys(GARAGE_LOCATIONS).map((key) => (
							<button
								key={key}
								onClick={() => setSelectedLocation(key)}
								className={`flex items-center gap-2 text-white hover:text-yellow-300 ${selectedLocation === key ? "border-2 border-yellow-300 px-3 py-1 rounded-lg" : ""}`}
							>
								<MapPinIcon className="w-4 h-4" />
								{GARAGE_LOCATIONS[key].name}
							</button>
						))}
					</div>


					{/* Map View */}
					<div className="w-full rounded-lg overflow-hidden">
						<iframe
							src={GARAGE_LOCATIONS[selectedLocation]?.mapEmbedSrc}
							width="100%"
							height="280"
							style={{ border: 0 }}
							allowFullScreen=""
							loading="lazy"
						></iframe>
					</div>


				</motion.div>

			</div>

			{/* Bottom Section - Grid for Forms */}
			<div className="mx-auto flex flex-col-reverse md:gap-12 mt-12 px-6 lg:px-12">

				{/* 📧 Bottom Left - Contact Form */}
				<motion.div className="mx-auto bg-white mb-10 text-gray-800 rounded-xl shadow-lg p-10" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
					<div className="rounded-t-xl py-4 mb-4 border-b border-gray-200 bg-red-600 text-white text-center">
						<FiMail className="size-6 inline-block mr-2" />
						<h3 className="text-2xl font-bold inline-block">Email Us!</h3>
					</div>
					<form onSubmit={handleSubmit}>
						<input type="text" name="user_name" value={user_name} onChange={handleChange} placeholder="Your Name" className="w-full p-3 border rounded-lg mb-4" />
						<input type="tel" name="user_phone" value={user_phone} onChange={handleChange} placeholder="Phone Number" className="w-full p-3 border rounded-lg mb-4" />
						<input type="email" name="user_email" value={user_email} onChange={handleChange} placeholder="Email Address" className="w-full p-3 border rounded-lg mb-4" />
						<textarea name="message" value={message} onChange={handleChange} placeholder="Your Message" className="w-full p-3 border rounded-lg mb-4" rows="4"></textarea>
						<button type="submit" className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-700 transition">Send Message</button>
					</form>
				</motion.div>
				{/* 📅 Bottom Right - Booking Form */}
				<motion.div
					className="mx-auto w-full pb-10"
					initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
					<ModernBookingForm />
				</motion.div>

			</div>
		</section>
	);
}

export default ContactSection;
