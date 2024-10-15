import { motion } from "framer-motion";
import { CogIcon } from "@heroicons/react/24/outline";

function HeroSection() {
	return (
		<section
			id="home"
			className="relative w-screen sm:ml-0 -ml-2 h-screen bg-cover bg-center"
			style={{ backgroundImage: "url(/assets/images/hero.jpg)" }}
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
			</div>
		</section>
	);
}

export default HeroSection;
