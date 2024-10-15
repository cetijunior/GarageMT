import { useState } from "react";

function ContactSection() {
	const [formData, setFormData] = useState({
		user_name: "",
		user_email: "",
		location: "",
		message: "",
	});

	const { user_name, user_email, location, message } = formData;

	// Handle input changes
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// Create mailto link for submission
	const mailtoLink = `mailto:contact@brothersgarage.com?subject=Appointment Request from ${user_name}&body=Name: ${user_name}%0AEmail: ${user_email}%0ALocation: ${location}%0AMessage: ${message}`;

	return (
		<section id="contact" className="py-12 bg-gray-100">
			<div className="container mx-auto max-w-lg bg-white p-6 shadow-md rounded-lg">
				<h2 className="text-3xl font-bold text-center mb-6">Get in Touch</h2>
				<p className="text-center text-gray-600 mb-4">
					Fill out the form below to send us a message.
				</p>
				<form className="space-y-4">
					<div className="space-y-2">
						<label
							htmlFor="user_name"
							className="block text-sm font-medium text-gray-700"
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
							className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary text-sm"
							required
						/>
					</div>
					<div className="space-y-2">
						<label
							htmlFor="user_email"
							className="block text-sm font-medium text-gray-700"
						>
							Your Email
						</label>
						<input
							type="email"
							name="user_email"
							id="user_email"
							value={user_email}
							onChange={handleChange}
							placeholder="you@example.com"
							className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary text-sm"
							required
						/>
					</div>
					<div className="space-y-2">
						<label
							htmlFor="location"
							className="block text-sm font-medium text-gray-700"
						>
							Select Garage Location
						</label>
						<select
							name="location"
							id="location"
							value={location}
							onChange={handleChange}
							className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary text-sm"
							required
						>
							<option value="">Choose a Location</option>
							<option value="Downtown Garage">Downtown Garage</option>
							<option value="Uptown Garage">Uptown Garage</option>
						</select>
					</div>
					<div className="space-y-2">
						<label
							htmlFor="message"
							className="block text-sm font-medium text-gray-700"
						>
							Your Message
						</label>
						<textarea
							name="message"
							id="message"
							value={message}
							onChange={handleChange}
							placeholder="Write your message here..."
							className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary text-sm"
							rows="4"
							required
						></textarea>
					</div>
					<a
						href={mailtoLink}
						className="w-full block text-center bg-secondary text-white py-2 rounded hover:bg-yellow-500 transition duration-200 text-sm"
					>
						Send Message
					</a>
				</form>
			</div>
		</section>
	);
}

export default ContactSection;
