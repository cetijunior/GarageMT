function AboutUsSection() {
	return (
		<section id="about" className="py-16 bg-white">
			<div className="container mx-auto flex flex-col md:flex-row items-center">
				<div className="md:w-1/2">
					<img
						src="/assets/images/about-us.jpg"
						alt="About Us"
						className="rounded-lg shadow-lg"
					/>
				</div>
				<div className="md:w-1/2 md:pl-12 mt-8 md:mt-0">
					<h2 className="text-4xl font-bold mb-4">About Us</h2>
					<p className="text-gray-600 mb-4">
						Brother&apos;s Garage has been providing top-notch automotive
						services for over 20 years.
					</p>
					<p className="text-gray-600">
						Our experienced team is dedicated to ensuring your vehicle is safe
						and performing at its best.
					</p>
					<p className="text-gray-600">
						We offer a wide range of services including regular maintenance,
						repairs, and diagnostics.
					</p>
					<p className="text-gray-600">
						Visit us today and experience the Brother&apos;s Garage difference!
					</p>
				</div>
			</div>
		</section>
	);
}

export default AboutUsSection;
