import { motion } from "framer-motion";

function LocationsSection() {
	const locations = [
		{
			name: "Garage 1",
			address: "12 Triq Sant' Ursola, Valletta, Malta",
			mapSrc:
				"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3072.121492949705!2d14.511999725601962!3d35.89703242251843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130e452b73df5997%3A0x5f6e73f9cbd0877d!2s272%20St%20Paul%20St%2C%20Valletta%2C%20Malta!5e1!3m2!1sde!2sus!4v1729021463779!5m2!1sen!2sus",
		},
		{
			name: "Garage 2",
			address: "Vjal Il-25 Novembru, Mosta, Malta",
			mapSrc:
				"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248.69393882937254!2d14.524665593205865!3d35.853644799951276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130e5b3e0628b271%3A0x705b09517ef44cfa!2sRenAuto%20Garage!5e1!3m2!1sde!2sus!4v1729684105982!5m2!1sen!2sus",
		},
	];


	const businessLocations = {
		valletta: {
			name: "Valletta Garage",
			address: "12 Triq Sant' Ursola, Valletta, Malta",
			mapSrc:
				"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3072.121492949705!2d14.511999725601962!3d35.89703242251843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130e452b73df5997%3A0x5f6e73f9cbd0877d!2s272%20St%20Paul%20St%2C%20Valletta%2C%20Malta!5e1!3m2!1sde!2sus!4v1729021463779!5m2!1sde!2sus",
		},
		mosta: {
			name: "Garage",
			address: "Vjal Il-25 Novembru, Mosta, Malta",
			mapSrc:
				"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248.69393882937254!2d14.524665593205865!3d35.853644799951276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130e5b3e0628b271%3A0x705b09517ef44cfa!2sRenAuto%20Garage!5e1!3m2!1sde!2sus!4v1729684105982!5m2!1sde!2sus",
		},
	};

	return (
		<section
			id="locations"
			className="py-16 bg-gradient-to-br from-gray-50 to-gray-100"
		>
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
