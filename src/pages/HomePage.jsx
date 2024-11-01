import HeroSection from "../components/sections/HeroSection";
import ServicesSection from "../components/sections/ServicesSection";
import AboutUsSection from "../components/sections/AboutUsSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
//import LocationsSection from "../components/sections/LocationsSection";
import ContactSection from "../components/sections/ContactSection";
import { Helmet } from "react-helmet";
import ParticlesBackground from "../components/layout/ParticlesBackground";
function HomePage() {
	return (
		<div className="relative w-screen ">
			<Helmet>
				<title>Garage MT| Quality Automotive Services</title>
				<meta
					name="description"
					content="Top-notch automotive services at Brother's Garage. Serving you at two convenient locations."
				/>
			</Helmet>

			{/* Global Particle Effect */}
			<ParticlesBackground />

			<div className="relative w-full z-10">
				<HeroSection />
			</div>
			<ServicesSection />
			<AboutUsSection />
			<TestimonialsSection />
			{/* <LocationsSection /> */}
			<ContactSection />
		</div>
	);
}

export default HomePage;
