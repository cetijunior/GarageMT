import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { GARAGE_LOCATIONS } from "../../content/locations"; // Ensure this is imported correctly

function HeroSection() {
	const navigate = useNavigate();

	return (
		<section
			id="hero"
			className="relative flex flex-col w-full mt-16 min-h-screen bg-gradient-to-br from-red-800 to-red-600"
		>
			{/* Top Section */}
			<div className="flex flex-col mt-16 lg:mt-0 lg:flex-row w-full h-1/2 lg:h-screen/2 items-center justify-between p-6 lg:py-32">
				{/* Top Left: Text Section */}
				<motion.div
					className="flex-1 text-center lg:text-left space-y-6 max-w-2xl"
					initial={{ opacity: 0, x: -50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8 }}
				>
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
						<span className="text-shadow">Vehicle Rescue Experts</span> <br />
						at Garage MT
					</h1>
					<p className="text-base md:text-lg text-white/90">
						Swift, professional repairs that get you back on the road. Your trusted automotive partner in Malta.
					</p>
					<div className="flex flex-wrap justify-center lg:justify-start gap-4">
						<button
							onClick={() => navigate('/contact')}
							className="px-6 md:px-8 py-2 md:py-3 bg-white text-red-900 rounded-full font-semibold hover:bg-gray-100 shadow-md transition text-sm md:text-base"
						>
							Emergency Help
						</button>
						<button
							onClick={() => navigate('/services')}
							className="px-6 md:px-8 py-2 md:py-3 border-2 border-white text-white rounded-full hover:bg-white/20 shadow-md transition text-sm md:text-base"
						>
							Our Services
						</button>
					</div>
				</motion.div>

				{/* Top Right: Garage Images */}
				<motion.div
					className="flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-8 mt-8 lg:mt-0 w-full lg:w-1/2"
					initial={{ opacity: 0, x: 50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8, delay: 0.3 }}
				>
					{/* Garage 1 Card */}
					{Object.keys(GARAGE_LOCATIONS).map((locationKey, index) => {
						const location = GARAGE_LOCATIONS[locationKey];
						return (
							<div
								key={index}
								className="w-full lg:w-1/2 bg-white rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-all duration-300"
							>
								<div
									className="h-48 md:h-64 bg-cover bg-center rounded-t-2xl"
									style={{ backgroundImage: `url(${location.image})` }}
								/>
								<div className="p-4 text-center">
									<h3 className="text-xl font-bold text-red-900">{location.name}</h3>
									<p className="text-sm text-gray-600">{location.address}</p>
									<a
										href={location.link}
										className="mt-2 text-red-600 hover:font-semibold transition"
									>
										View Location
									</a>
								</div>
							</div>
						);
					})}
				</motion.div>
			</div>

			{/* Bottom Section */}
			<motion.div className="absolute bottom-0 hidden lg:flex flex-col md:flex-row justify-evenly items-center lg:items-start w-full h-auto lg:h-1/4 bg-gradient-to-l from-red-700 to-red-800 p-6 md:p-8">
				{[
					{
						icon: "/assets/images/hands.png",
						title: "Best Prices",
						description: "Competitive rates for all repairs and services.",
					},
					{
						icon: "/assets/images/thumbs-up.png",
						title: "100% Guarantee",
						description: "Full guarantee on all our repair work.",
					},
					{
						icon: "/assets/images/certificate.png",
						title: "Certified Mechanics",
						description: "Highly trained and certified automotive experts.",
					},
				].map((item, index) => (
					<div
						key={index}
						className="flex flex-col items-center text-center w-full lg:w-auto px-4"
					>
						<img
							src={item.icon}
							alt={`${item.title} Icon`}
							className="w-12 h-12 lg:w-16 lg:h-16 mb-2"
						/>
						<div>
							<h3 className="text-base lg:text-lg font-bold text-white">{item.title}</h3>
							<p className="text-xs lg:text-sm text-white/70">{item.description}</p>
						</div>
					</div>
				))}
			</motion.div>
		</section>
	);
}

export default HeroSection;
