import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { GARAGE_LOCATIONS } from "../../content/locations";
import ScrollingFeatures from "../layout/ScrollingFeatures";
import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { GiTowTruck } from "react-icons/gi";




import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

function HeroSection() {
	const navigate = useNavigate();


	const handleNavigation = (path, section) => {
		if (location.pathname !== "/") {
			navigate("/");
			setTimeout(() => {
				scrollToSection(section);
			}, 300); // Add a slight delay to ensure navigation happens before scrolling
		} else {
			scrollToSection(section);
		}
		setNavOpen(false); // Close the navbar after clicking
	};


	const scrollToSection = (sectionId) => {
		scroll.scrollTo(document.getElementById(sectionId)?.offsetTop - 80, {
			duration: 10,
			smooth: true,
		});
	};


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
					<div className="flex flex-row w-full mx-auto lg:pr-4 justify-center lg:justify-between gap-4">
						<button
							onClick={() => handleNavigation("/", "services")}
							className="px-4 py-4 bg-transparent hover:bg-white/20 border-2 border-white group group-hover text-white rounded-full font-medium flex items-center justify-between gap-2 shadow-lg shadow-red-500/30 transition-all duration-300">

							<p>Our Services</p>
							<FaChevronRight
								className="w-4 h-4 transform-all duration-300 group-hover:rotate-90"
							/>
						</button>
						<button
							onClick={() => handleNavigation("/", "contact")}
							className="px-4 md:px-8 py-4 md:py-3 group group-hover bg-white hover:bg-red-600/90 hover:border-2 hover:border-white hover:text-white text-red-900 rounded-full font-semibold flex items-center justify-between gap-2 hover:bg-gray-100 shadow-md transition text-sm md:text-base xl:text-lg"
						>
							Emergency Help
							<GiTowTruck
								className="size-4 lg:size-6 transform-all duration-300 md:group-hover:size-8"

							/>
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
								className="w-full lg:w-1/2 group"
							>
								<div className="bg-white md:2 lg:my-4 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-2xl transform group-hover:-translate-y-2">
									<div
										className="h-48 md:h-64 xl:h-72 bg-cover bg-center relative overflow-hidden"
										style={{ backgroundImage: `url(${location.image})` }}
									>
										<div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
											<a
												href={location.link}
												className="px-6 py-3 bg-white text-red-900 rounded-full font-semibold hover:bg-gray-100 transition"
											>
												View Location
											</a>
										</div>
									</div>
									<div className="p-4 text-center">
										<h3 className="text-xl font-bold text-red-900">{location.name}</h3>

										<a
											href={location.googleMapsLink}
											target="_blank" rel="noopener noreferrer"
											className="hover:underline text-sm text-gray-600 mb-1">{location.address}</a>
										<div className="flex items-center justify-center space-x-2 text-sm text-gray-700">
											<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
												<path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
											</svg>
											<a
												href={`tel:${location.phone}`}
												className="hover:underline"
											>
												{location.phone}
											</a>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</motion.div>
			</div >
			<div className="relative mt-8 lg:bottom-40 lg:-mb-40 md:bottom-20">
				<ScrollingFeatures />
			</div>
		</section >
	);
}

export default HeroSection;
