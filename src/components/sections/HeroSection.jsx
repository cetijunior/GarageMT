import { motion } from "framer-motion";
import { CogIcon } from "@heroicons/react/24/outline";
import { ArrowDownCircleIcon } from "@heroicons/react/20/solid";

function HeroSection() {
	return (
		<section
			id="hero"
			className="relative w-screen h-screen  bottom-16 bg-cover bg-center"
			style={{ backgroundImage: "url(/assets/images/entry3.jpg)" }}
		>
			{/* Background Overlay for better text readability */}
			<div className="absolute inset-0 bg-black bg-opacity-60"></div>

			<div className="container mx-auto h-full flex flex-col justify-center items-center text-center relative z-10 space-y-8 px-4">
				{/* Hero Heading */}
				<motion.h1
					className="text-4xl md:text-6xl sm:mt-16 mt-32 text-white font-extrabold leading-tight tracking-wide"
					initial={{ opacity: 0, y: -50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					Stuck on the Road? <br />{" "}
					<span className="text-red-500">Contact Brother&apos;s Garage</span>{" "}
					Today!
				</motion.h1>

				{/* Subheading */}
				<motion.p
					className="text-lg md:text-xl text-gray-200 mb-8 px-4"
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, delay: 0.5 }}
				>
					For all your vehicle issues, we are just a call away. Let us help you
					get back on the road quickly and safely.
				</motion.p>

				{/* Contact Button - With Cog Icon */}
				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					className="relative flex items-center justify-center bg-red-500 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition duration-300"
				>
					<motion.a
						href="#contact"
					>

						Contact Us Now
					</motion.a>
					<motion.a
						href="#contact"

						className="relative flex items-center ml-3 -mr-3 transition duration-300"
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						whileHover={{ scale: 1.3, }}

					>
						<ArrowDownCircleIcon className="h-6 w-6 mr-2" />
					</motion.a>
				</motion.div>

				{/* Services Button */}
				<motion.p
					className="text-lg md:text-xl cursor-pointer text-gray-200 font-semibold"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1, delay: 1.2 }}
				>
					<a href="#services">
						Explore <span className="text-red-500">Our Services</span>
					</a>
				</motion.p>

				{/* Red Section visible only on large screens */}
				<motion.div className="hidden lg:flex absolute bottom-0 w-screen bg-red-700 h-28 items-center justify-evenly">
					<div className="flex flex-row items-center space-x-4">
						<img src="/assets/images/hands.png" alt="Best Prices Icon" />
						<div className="flex flex-col space-y-1 items-start">
							<h1 className="text-xl text-white font-bold">Best Prices</h1>
							<p className="text-gray-300 w-[250px]">
								All repairs and services are available at competitive rates.
							</p>
						</div>
					</div>

					<div className="flex flex-row items-center space-x-4">
						<img src="/assets/images/thumbs-up.png" alt="100% Guarantee Icon" />
						<div className="flex flex-col space-y-1 items-start">
							<h1 className="text-xl text-white font-bold">100% Guarantee</h1>
							<p className="text-gray-300 w-[250px]">
								Our repairs come with a full guarantee.
							</p>
						</div>
					</div>

					<div className="flex flex-row items-center space-x-4">
						<img
							src="/assets/images/certificate.png"
							alt="Certified Mechanics Icon"
						/>
						<div className="flex flex-col space-y-1 items-start">
							<h1 className="text-xl text-white font-bold">
								Certified Mechanics
							</h1>
							<p className="text-gray-300 w-[250px]">
								Our mechanics are certified and regularly trained.
							</p>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}

export default HeroSection;
