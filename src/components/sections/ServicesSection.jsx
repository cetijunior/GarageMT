import { useState } from "react";
import { servicesData } from "../../content/servicesContent";
import {
	FaWrench,
	FaOilCan,
	FaCarBattery,
	FaSyncAlt,
	FaCarCrash,
	FaSearch,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Work Gallery Data (Add this below)
const workData = [
	{
		title: "Engine Repair",
		description: "A comprehensive engine repair for a vintage car.",
		image: "/assets/images/work1.jpg", // Replace with actual image paths
	},
	{
		title: "Brake Service",
		description: "Brake replacement and inspection.",
		image: "/assets/images/work6.jpg",
	},
	{
		title: "Battery Replacement",
		description: "Quick and efficient battery replacement service.",
		image: "/assets/images/work3.jpg",
	},
	// Add more works as necessary
];

function ServicesSection() {
	const [showAll, setShowAll] = useState(false);

	// Assign icons to servicesData
	const servicesWithIcons = servicesData.map((service) => {
		let icon;
		switch (service.title) {
			case "General Repairs":
				icon = <FaWrench size={50} className="text-red-500" />;
				break;
			case "Oil Changes":
				icon = <FaOilCan size={50} className="text-red-500" />;
				break;
			case "Battery Replacement":
				icon = <FaCarBattery size={50} className="text-red-500" />;
				break;
			case "Tire Rotation":
				icon = <FaSyncAlt size={50} className="text-red-500" />;
				break;
			case "Brake Inspection":
				icon = <FaCarCrash size={50} className="text-red-500" />;
				break;
			case "Diagnostic Services":
				icon = <FaSearch size={50} className="text-red-500" />;
				break;
			default:
				icon = <FaWrench size={50} className="text-red-500" />;
		}
		return { ...service, icon };
	});

	// Show only the first three services initially
	const servicesToDisplay = showAll
		? servicesWithIcons
		: servicesWithIcons.slice(0, 3);

	// Motion variants for services cards
	const cardVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.5, ease: "easeOut" },
		},
		hover: { scale: 1.05, transition: { duration: 0.3, ease: "easeInOut" } },
	};

	// Motion variants for the button
	const buttonVariants = {
		hover: {
			scale: 1.1,
			backgroundColor: "#FF6347",
			color: "#FFF",
			transition: { duration: 0.3 },
		},
	};

	return (
		<section id="services" className="bg-gray-100 py-16 px-6">
			<div className="container mx-auto text-center">

				<div className="flex flex-row items-center space-x-3 mb-12 justify-center">
					{/* Services Section */}
					<motion.h2
						className="text-4xl font-extrabold text-gray-800"
						initial={{ opacity: 0, y: -30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						Our Services
					</motion.h2>
					{/* Toggle Button */}
					<motion.button
						onClick={() => setShowAll(!showAll)}
						className="px-6 py-3 mt-2 bg-red-500 text-white font-semibold rounded-full shadow-lg hover:bg-red-600 focus:ring-2 focus:ring-red-300 transition-all"
						whileHover="hover"
						variants={buttonVariants}
					>
						{showAll ? "Show Less" : "Show More"}
					</motion.button>
				</div>
				<div className="grid md:grid-cols-3 gap-8">
					{servicesToDisplay.map((service, index) => (
						<motion.div
							key={index}
							className="bg-white p-6 rounded-lg shadow-lg transition-all"
							variants={cardVariants}
							initial="hidden"
							animate="visible"
							whileHover="hover"
						>
							<div className="text-red-500 mb-4 flex justify-center">
								{service.icon}
							</div>
							<h3 className="text-2xl font-semibold mb-2 text-gray-800">
								{service.title}
							</h3>
							<p className="text-gray-600 leading-relaxed">
								{service.description}
							</p>
						</motion.div>
					))}
				</div>

			</div>

			{/* Our Work Section */}
			<div className="container mx-auto mt-20 text-center">
				<div className="flex flex-row items-center space-x-3 mb-12 justify-center">
					<motion.h2
						className="text-4xl font-extrabold text-gray-800"
						initial={{ opacity: 0, y: -30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						Our Work
					</motion.h2>
					{/* Toggle Button */}

					<motion.button

						className="px-6 py-3 mt-2 bg-red-500 text-white font-semibold rounded-full shadow-lg hover:bg-red-600 focus:ring-2 focus:ring-red-300 transition-all"
						whileHover="hover"
					>
						<Link onClick={() => window.location.href = '/gallery'}>
							Gallery
						</Link>
					</motion.button>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					{workData.map((work, index) => (
						<motion.div
							key={index}
							className="bg-white p-6 rounded-lg shadow-lg transition-all group relative overflow-hidden"
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, ease: "easeOut" }}
							whileHover={{ scale: 1.05 }}
						>
							<img
								src={work.image}
								alt={work.title}
								className="rounded-lg shadow-md w-full h-60 object-cover transition-transform duration-500 group-hover:scale-110"
							/>
							<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
								<div className="text-center text-white p-4">
									<h3 className="text-2xl font-bold mb-2">{work.title}</h3>
									<p>{work.description}</p>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section >
	);
}

export default ServicesSection;
