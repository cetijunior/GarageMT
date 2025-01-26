import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import GalleryPage from "./pages/GalleryPage";
import GarageLocation1 from "./pages/GarageLocation1";
import GarageLocation2 from "./pages/GarageLocation2";
import NotFoundPage from "./pages/NotFoundPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ScrollToTop from "./hooks/useScrollToTop";

function ScrollableHomePage({ section }) {
	const navigate = useNavigate();

	// Scroll to the specific section when navigating to the homepage
	return (
		<HomePage
			scrollToSection={() => {
				if (section) {
					setTimeout(() => {
						const element = document.getElementById(section);
						if (element) {
							element.scrollIntoView({ behavior: "smooth" });
						}
					}, 0); // Delay for ensuring the DOM is fully rendered
				}
			}}
		/>
	);
}

function App() {
	return (
		<Router>
			<ScrollToTop />
			<div className="flex flex-col min-h-screen">
				<Navbar />
				<main>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/about" element={<ScrollableHomePage section="about" />} />
						<Route path="/services" element={<ScrollableHomePage section="services" />} />
						<Route path="/locations" element={<ScrollableHomePage section="locations" />} />
						<Route path="/contact" element={<ScrollableHomePage section="contact" />} />
						<Route path="/gallery" element={<GalleryPage />} />

						<Route path="/privacy-policy" element={<PrivacyPolicy />} />
						<Route path="/terms-of-service" element={<TermsOfService />} />

						<Route path="/garage-location-1" element={<GarageLocation1 />} />
						<Route path="/garage-location-2" element={<GarageLocation2 />} />
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
