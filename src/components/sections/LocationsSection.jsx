import { motion } from "framer-motion";
import { GARAGE_LOCATIONS } from "../../content/locations"; // Import the garage locations data

function LocationsSection() {
	const locations = Object.values(GARAGE_LOCATIONS); // Extract locations from the constant

	return (
		<section id="locations" className="py-16 bg-transparent">
			<div className="container mx-auto px-6 lg:px-12">
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-center mb-12"
				>
					<h2 className="text-4xl font-extrabold text-gray-800">
						Our Locations
					</h2>
					<p className="text-gray-600 mt-4 max-w-2xl mx-auto">
						Find us at two convenient locations in Malta. We’re here to serve you
						better!
					</p>
				</motion.div>

				{/* Locations Grid */}
				<div className="grid md:grid-cols-2 gap-12">
					{locations.map((location, index) => (
						<motion.div
							key={index}
							className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 ease-in-out"
							initial={{ opacity: 0, scale: 0.9 }}
							whileInView={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.6, delay: index * 0.3 }}
							viewport={{ once: true }}
						>
							<h3 className="text-2xl font-semibold text-red-600 mb-2">
								{location.name}
							</h3>
							<p className="text-gray-700 mb-4">{location.address}</p>

							{/* Terrain Map Embed */}
							<div className="w-full h-64 overflow-hidden rounded-lg shadow-md transform transition-transform duration-300">
								<iframe
									src={`${location.mapEmbedSrc}&maptype=terrain`} // Add terrain view to the map
									width="100%"
									height="100%"
									style={{ border: 0 }}
									allowFullScreen=""
									loading="lazy"
									title={location.name}
									className="rounded-lg"
								></iframe>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

export default LocationsSection;
