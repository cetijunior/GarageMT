function LocationsSection() {
	const locations = [
		{
			name: "Downtown Garage",
			address: "123 Main St, Cityville, ST 12345",
			mapSrc: "https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE_1",
		},
		{
			name: "Uptown Garage",
			address: "456 Elm St, Townsville, ST 67890",
			mapSrc: "https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE_2",
		},
	];

	return (
		<section id="locations" className="py-16 bg-white">
			<div className="container mx-auto">
				<h2 className="text-4xl font-bold text-center mb-12">Our Locations</h2>
				<div className="grid md:grid-cols-2 gap-8">
					{locations.map((location, index) => (
						<div key={index} className="space-y-4 px-10">
							<h3 className="text-2xl font-semibold">{location.name}</h3>
							<p>{location.address}</p>
							<div className="w-full h-64">
								<iframe
									src={location.mapSrc}
									width="100%"
									height="100%"
									style={{ border: 0 }}
									allowFullScreen=""
									loading="lazy"
									title={location.name}
								></iframe>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default LocationsSection;
