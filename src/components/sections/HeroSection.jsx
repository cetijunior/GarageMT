import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { GARAGE_LOCATIONS } from "../../content/locations";
import ScrollingFeatures from "../layout/ScrollingFeatures";

function HeroSection() {
	const navigate = useNavigate();

	return (
		<section
			id="hero"
			className="relative flex flex-col w-full mt-16 bg-gradient-to-br from-red-800 to-red-600"
		>
			{/* Top Section */}
			<div className="flex flex-col mt-16 lg:-mt-10 lg:flex-row w-full h-5/6 items-center justify-between p-6 lg:py-32 xl:py-40">
				{/* Top Left: Text Section */}
				<motion.div
					className="flex-1 text-center lg:text-left space-y-6 max-w-2xl"
					initial={{ opacity: 0, x: -50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8 }}
				>
					<h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight">
						<span className="text-shadow">Vehicle Rescue Experts</span> <br />
						at Garage MT
					</h1>
					<p className="text-base md:text-lg xl:text-xl text-white/90 lg:pr-4">
						Swift, professional repairs that get you back on the road. Your trusted automotive partner in Malta.
					</p>
					<div className="flex flex-row-reverse w-full mx-auto lg:pr-4 justify-center lg:justify-between gap-4">
						<button
							onClick={() => navigate('/contact')}
							className="px-6 md:px-8 py-2 md:py-3 bg-white text-red-900 rounded-full font-semibold hover:bg-gray-100 shadow-md transition text-sm md:text-base xl:text-lg"
						>
							Emergency Help
						</button>
						<button
							onClick={() => navigate('/services')}
							className="px-6 md:px-8 py-2 md:py-3 border-2 border-white text-white rounded-full hover:bg-white/20 shadow-md transition text-sm md:text-base xl:text-lg"
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
					{Object.keys(GARAGE_LOCATIONS).map((locationKey, index) => {
						const location = GARAGE_LOCATIONS[locationKey];
						return (
							<div
								key={index}
								className="w-full lg:w-1/2 bg-white rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-all duration-300"
							>
								<div
									className="h-48 md:h-64 xl:h-72 bg-cover bg-center rounded-t-2xl"
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
			<div className="lg:-mt-32">
				<ScrollingFeatures />
			</div>
		</section>
	);
}

export default HeroSection;
