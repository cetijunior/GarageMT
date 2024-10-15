import { motion } from "framer-motion";
import { CogIcon } from "@heroicons/react/24/outline";

function HeroSection() {
	return (
		<section
			id="hero"
			className="relative sm:-mx-2 -mx-4 h-screen bottom-16 bg-cover bg-right"
			style={{ backgroundImage: "url(/assets/images/Hero.png)" }}
		>
			{/* Background Overlay */}
			<div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70"></div>

			<div className="container mx-auto h-full flex flex-col justify-center items-center text-center relative z-10 space-y-6">
				{/* Hero Heading */}
				<motion.h1
					className="text-5xl md:text-7xl text-white font-bold leading-tight"
					initial={{ opacity: 0, y: -50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					Welcome to{" "}
					<span className="text-yellow-500">Brother&apos;s Garage</span>
				</motion.h1>

				{/* Subheading */}
				<motion.p
					className="text-lg md:text-2xl text-gray-200 mb-8 px-4"
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, delay: 0.5 }}
				>
					Quality Service You Can Trust
				</motion.p>

				{/* Rotating Cog Icon with Hover Effect */}
				<motion.div
					whileHover={{ rotate: 360, scale: 1.1 }}
					transition={{ duration: 0.8, ease: "easeInOut" }}
					className="flex flex-col items-center mt-8"
				>
					<a href="#services" className="text-white">
						<CogIcon className="h-24 w-24 text-yellow-500 mb-4 drop-shadow-lg" />
					</a>
				</motion.div>

				{/* Call to Action Text */}
				<motion.p
					className="text-lg md:text-xl cursor-pointer text-gray-200 font-semibold"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1, delay: 0.5 }}
				>
					<a href="#services">
						Explore <span className="text-yellow-500">Our Services</span>
					</a>
				</motion.p>

				{/* Contact Us Link */}
				<motion.p
					className="text-lg md:text-xl cursor-pointer text-gray-200 font-semibold"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1, delay: 0.5 }}
				>
					<a href="#contact">
						<span className="text-yellow-500">Contact</span> Us
					</a>
				</motion.p>

				{/* Blue Section visible only on large screens */}
				<motion.div className="hidden lg:flex absolute bottom-0 w-screen bg-[#1E5DBC] h-72 sm:h-28 items-center justify-evenly">
					<div className="w-auto space-x-4 flex flex-row items-start">
						<img src="/assets/images/hands.png" alt="Hands Icon" />
						<div className="flex flex-col space-y-1 items-start justify-start">
							<h1 className="text-xl text-white font-bold">Best Prices</h1>
							<h3 className="text-start text-gray-300 w-[250px]">
								All mechanical repairs and services are available at affordable
								rates
							</h3>
						</div>
					</div>

					<div className="w-auto space-x-4 flex flex-row items-start">
						<img src="/assets/images/thumbs-up.png" alt="Thumbs Up Icon" />
						<div className="flex flex-col space-y-1 items-start justify-start">
							<h1 className="text-xl text-white font-bold">100% Guarantee</h1>
							<h3 className="text-start text-gray-300 w-[250px]">
								All of our repairs and services come with a guarantee period
							</h3>
						</div>
					</div>

					<div className="w-auto space-x-4 flex flex-row items-start">
						<img src="/assets/images/certificate.png" alt="Certificate Icon" />
						<div className="flex flex-col space-y-1 items-start justify-start">
							<h1 className="text-xl text-white font-bold">
								Certified Mechanics
							</h1>
							<h3 className="text-start text-gray-300 w-[250px]">
								All of our mechanics are qualified and are regularly trained.
							</h3>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}

export default HeroSection;
