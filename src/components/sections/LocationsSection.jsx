import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { GARAGE_LOCATIONS } from "../../content/locations";
import { HiOutlineLocationMarker, HiOutlineMail, HiPhone } from "react-icons/hi";

function LocationsSection() {
	const locations = Object.values(GARAGE_LOCATIONS);
	const navigate = useNavigate();

	return (
		<section id="locations" className="py-16 bg-gray-100">
			<div className="container mx-auto px-6 lg:px-12">
				{/* Section Header */}
				<motion.div
					className="text-center mb-12"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<h2 className="text-4xl font-extrabold text-red-700">Our Locations</h2>
					<p className="mt-4 text-lg text-gray-600">
						Find us at two convenient locations in Malta. We’re here to serve you better!
					</p>
				</motion.div>

				{/* Locations Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{locations.map((location, index) => (
						<motion.div
							key={index}
							className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-start transition-transform hover:scale-105"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.2 }}
							viewport={{ once: true }}
						>
							{/* Location Name */}
							<h3 className="text-2xl font-bold text-red-700 mb-4">{location.name}</h3>

							{/* Location Address */}
							<div className="flex items-center space-x-2 mb-4">
								<HiOutlineLocationMarker className="text-red-500" size={20} />
								<p className="text-gray-600">{location.address}</p>
							</div>

							{/* Contact Info */}
							<div className="flex items-center space-x-2 mb-4">
								<HiPhone className="text-red-500" size={20} />
								<span className="text-gray-600">{location.phone}</span>
							</div>

							{/* Terrain Map Embed */}
							<div className="w-full h-48 rounded-lg overflow-hidden mb-4">
								<iframe
									src={location.mapEmbedSrc}
									width="100%"
									height="100%"
									style={{ border: 0 }}
									allowFullScreen=""
									loading="lazy"
								></iframe>
							</div>

							{/* Navigation Button */}
							<button
								onClick={() => navigate(location.link)}
								className="flex px-6 items-center justify-center lg:w-1/2 w-full mx-auto py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition duration-300"
							>
								View {location.name}
							</button>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

export default LocationsSection;
