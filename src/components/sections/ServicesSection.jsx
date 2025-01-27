import React from "react";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
	FaTools,
	FaOilCan,
	FaBatteryFull,
	FaSyncAlt,
	FaCarCrash,
	FaDiagnoses,
	FaCarSide,
	FaBolt,
	FaCogs,
	FaSnowflake,
	FaMicrochip,
	FaLaptopCode,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const servicesData = [
	{
		title: "General Repairs",
		description: "Comprehensive repairs for all vehicle makes and models.",
		icon: <FaTools />, // General repair icon
		garage: ["Garage 1", "Garage 2"],
		garageLinks: ["garage-location-1", "garage-location-2"],
	},
	{
		title: "Oil Changes",
		description: "Quick and efficient oil changes to keep your engine healthy.",
		icon: <FaOilCan />, // Oil change icon
		garage: ["Garage 2"],
		garageLinks: ["garage-location-2"],
	},
	{
		title: "Battery Replacement",
		description: "Fast battery replacement for uninterrupted driving.",
		icon: <FaBatteryFull />, // Battery replacement icon
		garage: ["Garage 1"],
		garageLinks: ["garage-location-1"],
	},
	{
		title: "Tire Rotation",
		description: "Expert tire rotation for even wear and better handling.",
		icon: <FaSyncAlt />, // Tire rotation icon
		garage: ["Garage 1", "Garage 2"],
		garageLinks: ["garage-location-1", "garage-location-2"],
	},
	{
		title: "Brake Inspection",
		description: "Ensure safety with professional brake inspections.",
		icon: <FaCarCrash />, // Brake inspection icon
		garage: ["Garage 2"],
		garageLinks: ["garage-location-2"],
	},
	{
		title: "Diagnostic Services",
		description: "Accurate diagnostics to identify and resolve vehicle issues.",
		icon: <FaDiagnoses />, // Diagnostics icon
		garage: ["Garage 1"],
		garageLinks: ["garage-location-1"],
	},
	{
		title: "Auto Repair",
		description: "Expert repairs for all types of vehicles.",
		icon: <FaCarSide />, // Auto repair icon
		garage: ["Garage 1"],
		garageLinks: ["garage-location-1"],
	},
	{
		title: "Electrical Repairs",
		description: "Reliable electrical diagnostics and repairs.",
		icon: <FaBolt />, // Electrical repair icon
		garage: ["Garage 1"],
		garageLinks: ["garage-location-1"],
	},
	{
		title: "Mechanical Repairs",
		description: "Professional mechanical repair services.",
		icon: <FaCogs />, // Mechanical repair icon
		garage: ["Garage 1", "Garage 2"],
		garageLinks: ["garage-location-1", "garage-location-2"],
	},
	{
		title: "AC Repair & Refill",
		description: "AC repair and refrigerant refills for a comfortable ride.",
		icon: <FaSnowflake />, // AC repair icon
		garage: ["Garage 1"],
		garageLinks: ["garage-location-1"],
	},
	{
		title: "ECU Programming",
		description: "Advanced ECU programming for optimal vehicle performance.",
		icon: <FaMicrochip />, // ECU programming icon
		garage: ["Garage 2"],
		garageLinks: ["garage-location-2"],
	},
	{
		title: "Electronic Repairs",
		description: "Expert repairs for electronic components in your vehicle.",
		icon: <FaLaptopCode />, // Electronic repairs icon
		garage: ["Garage 2"],
		garageLinks: ["garage-location-2"],
	},
];






function useScreenSize() {
	const [screenSize, setScreenSize] = useState("lg");

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 1024) {
				setScreenSize("lg");
			} else if (window.innerWidth >= 768) {
				setScreenSize("md");
			} else {
				setScreenSize("sm");
			}
		};

		handleResize();
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return screenSize;
}





function ServicesSection() {
	const [showAll, setShowAll] = useState(false);
	const sectionRef = useRef(null);
	const screenSize = useScreenSize();



	const navigate = useNavigate();

	// Navigation and scroll logic
	const handleScrollNavigation = (path, sectionId) => {
		if (window.location.pathname !== path) {
			navigate(path);
			setTimeout(() => scrollToSection(sectionId), 300);
		} else {
			scrollToSection(sectionId);
		}
	};

	// Scroll to specific section
	const scrollToSection = (sectionId) => {
		const section = document.getElementById(sectionId);
		if (section) {
			section.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};





	const toggleShowMore = () => {
		setShowAll(!showAll);
		if (sectionRef.current) {
			sectionRef.current.scrollIntoView({
				behavior: "smooth",
				block: showAll ? "start" : "end",
			});
		}
	};


	// Determine the number of services to display
	const getDisplayedServices = () => {
		if (showAll) return servicesData;
		switch (screenSize) {
			case "md":
				return servicesData.slice(0, 4);
			case "sm":
			case "lg":
			default:
				return servicesData.slice(0, 3);
		}
	};

	const displayedServices = getDisplayedServices();

	const cardVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
		hover: { scale: 1.05, transition: { duration: 0.3, ease: "easeInOut" } },
	};

	return (
		<section id="services" className="bg-gray-100 py-16 px-6" ref={sectionRef}>
			<div className="container mx-auto">
				{/* Header Section */}
				<motion.div
					className="text-center mb-12"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<div className="flex lg:flex-row flex-col items-center w-full mx-auto justify-evenly">
						<div>
							<h2 className="text-4xl font-extrabold text-red-700">
								Premium Services Across Our Garages
							</h2>
							<p className="mt-4 text-lg text-gray-600">
								Offering a wide range of professional automotive services to keep your vehicle in top condition.
							</p>
						</div>

						<motion.button
							onClick={toggleShowMore}
							className="lg:mt-0 mt-8 px-6 py-3 bg-red-500 text-white font-semibold text-center rounded-full shadow-lg hover:bg-red-600 focus:ring-2 focus:ring-red-300 transition-all"
							whileHover={{ scale: 1.1 }}
						>
							{showAll ? "Show Less" : "Show More"}
						</motion.button>
					</div>
				</motion.div>

				{/* Services Section */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
					{displayedServices.map((service, index) => (
						<motion.div
							key={index}
							className="group relative bg-white rounded-2xl shadow-xl ring-1 ring-gray-900/5 overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
							variants={cardVariants}
							initial="hidden"
							animate="visible"
							whileHover="hover"
						>
							<div className="flex flex-col h-full justify-between p-6 space-y-4">
								<div className="flex items-center justify-between">
									<div className="p-3 bg-red-50 rounded-xl text-red-600">
										{React.cloneElement(service.icon, { className: "w-8 h-8" })}
									</div>
									<span className="text-sm text-gray-500 font-medium">
										{service.garage.join(" & ")}
									</span>
								</div>

								<div>
									<h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
									<p className="text-gray-600 max-w-72 text-sm leading-relaxed">
										{service.description}
									</p>
								</div>

								<div className="flex justify-center items-center my-auto pt-4 border-t border-gray-100 space-x-3">
									{service.garageLinks.map((link, idx) => (
										<a
											key={idx}
											href={link}
											className="flex w-1/2 text-center  h-10 px-4 items-center justify-center text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
										>
											{service.garage[idx]}
										</a>
									))}
									<button
										onClick={() => handleScrollNavigation("/", "contact")}
										className="flex w-1/2 items-center justify-center text-center h-10 px-4 border-2 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
									>
										Contact
									</button>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div >
		</section >
	);
}

export default ServicesSection;
