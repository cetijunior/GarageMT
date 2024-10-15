import HeroSection from "../components/sections/HeroSection";
import ServicesSection from "../components/sections/ServicesSection";
import AboutUsSection from "../components/sections/AboutUsSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import LocationsSection from "../components/sections/LocationsSection";
import ContactSection from "../components/sections/ContactSection";
import { Helmet } from "react-helmet";

function HomePage() {
	return (
		<div className=" sm:px-2 px-4">
			<Helmet>
				<title>Brother`s Garage | Quality Automotive Services</title>
				<meta
					name="description"
					content="Top-notch automotive services at Brother's Garage. Serving you at two convenient locations."
				/>
			</Helmet>
			<div className="-ml-2">
				<HeroSection />
			</div>
			<ServicesSection />
			<TestimonialsSection />
			<AboutUsSection />
			<LocationsSection />
			<ContactSection />
		</div>
	);
}

export default HomePage;
