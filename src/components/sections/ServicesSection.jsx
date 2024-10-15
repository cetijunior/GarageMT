// src/components/sections/ServicesSection.jsx
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

function ServicesSection() {
	// Assign icons to servicesData
	const servicesWithIcons = servicesData.map((service) => {
		let icon;
		switch (service.title) {
			case "General Repairs":
				icon = <FaWrench size={50} />;
				break;
			case "Oil Changes":
				icon = <FaOilCan size={50} />;
				break;
			case "Battery Replacement":
				icon = <FaCarBattery size={50} />;
				break;
			case "Tire Rotation":
				icon = <FaSyncAlt size={50} />;
				break;
			case "Brake Inspection":
				icon = <FaCarCrash size={50} />;
				break;
			case "Diagnostic Services":
				icon = <FaSearch size={50} />;
				break;
			default:
				icon = <FaWrench size={50} />;
		}
		return { ...service, icon };
	});

	return (
		<section id="services" className="py-16 px-10 bg-gray-100">
			<div className="container mx-auto text-center">
				<h2 className="text-4xl font-bold mb-12">Our Services</h2>
				<div className="grid md:grid-cols-3 gap-8">
					{servicesWithIcons.map((service, index) => (
						<motion.div
							key={index}
							className="bg-white p-6 rounded-lg shadow-md"
							whileHover={{ scale: 1.05 }}
						>
							<div className="text-secondary mb-4 flex justify-center">
								{service.icon}
							</div>
							<h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
							<p className="text-gray-600">{service.description}</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

export default ServicesSection;
