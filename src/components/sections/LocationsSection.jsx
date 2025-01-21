import { motion } from "framer-motion";

function LocationsSection() {
	const locations = [
		{
			name: "Garage MT, Birżebbuġa",
			address: "1, Birżebbuġa, Malta",
			mapSrc:
				"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d284.94909605783255!2d14.518690013485234!3d35.81573042361856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x435e4107a7b5d2cf%3A0xc95f3ac61dbe66d1!2sGaragemt%20Limited!5e1!3m2!1sen!2smt!4v1737128288812!5m2!1sen!2smt",
		},
		{
			name: "Garage MT, Żejtun",
			address: "Vjal Il-25 Novembru, Iż-Żejtun, Malta",
			mapSrc:
				"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d407.2693121654438!2d14.524714048166146!3d35.85364234615932!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130e5b522c15549b%3A0x82174cca8e4c099b!2sGARAGE%20MT!5e1!3m2!1sen!2sus!4v1737126392697!5m2!1sen!2sus",
		},
	];

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
						Find us at two convenient locations in Malta. We’re here to serve
						you better!
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

							{/* Map Embed */}
							<div className="w-full h-64 overflow-hidden rounded-lg shadow-md transform transition-transform duration-300">
								<iframe
									src={location.mapSrc}
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
