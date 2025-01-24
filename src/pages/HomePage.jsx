import { useEffect } from "react";
import HeroSection from "../components/sections/HeroSection";
import ServicesSection from "../components/sections/ServicesSection";
import AboutUsSection from "../components/sections/AboutUsSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import ContactSection from "../components/sections/ContactSection";
import LocationsSection from "../components/sections/LocationsSection";
import { Helmet } from "react-helmet";
import ParticlesBackground from "../components/layout/ParticlesBackground";

function HomePage({ section }) {
	useEffect(() => {
		if (section) {
			const sectionElement = document.getElementById(section);
			if (sectionElement) {
				sectionElement.scrollIntoView({ behavior: "smooth" });
			}
		}
	}, [section]);

	return (
		<div className="relative w-screen -mt-16">
			<Helmet>
				<title>Garage MT | Quality Automotive Services</title>
				<meta
					name="description"
					content="Top-notch automotive services at Brother's Garage. Serving you at two convenient locations."
				/>
			</Helmet>

			<ParticlesBackground />

			<div className="relative w-full z-10">
				<HeroSection />
			</div>
			<ServicesSection />
			<AboutUsSection />
			<LocationsSection />
			<ContactSection />
		</div>
	);
}

export default HomePage;
