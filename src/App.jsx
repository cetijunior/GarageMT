import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import GalleryPage from "./pages/GalleryPage";
import GarageLocation1 from "./pages/GarageLocation1";
import GarageLocation2 from "./pages/GarageLocation2";
import NotFoundPage from "./pages/NotFoundPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookieDialog from "./components/CookieDialog";
import ScrollToTop from "./hooks/useScrollToTop";

function App() {
	const [cookiePreferences, setCookiePreferences] = useState({
		accepted: false,
		necessary: true, // Necessary cookies are always enabled
		analytics: true,
		marketing: true,
	});
	const [showCookieDialog, setShowCookieDialog] = useState(false);

	useEffect(() => {
		const savedPreferences = JSON.parse(localStorage.getItem("cookiePreferences"));
		if (savedPreferences) {
			setCookiePreferences(savedPreferences);
		} else {
			setShowCookieDialog(true); // Show dialog if no preferences are saved
		}
	}, []);

	const handleSavePreferences = (preferences) => {
		setCookiePreferences(preferences);
		localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
		setShowCookieDialog(false);
	};

	const handleAcceptAll = () => {
		const preferences = { accepted: true, necessary: true, analytics: true, marketing: true };
		handleSavePreferences(preferences);
	};

	return (
		<Router>
			<ScrollToTop />
			<div className="flex flex-col min-h-screen">
				<Navbar />
				<main>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/gallery" element={<GalleryPage />} />
						<Route path="/privacy-policy" element={<PrivacyPolicy />} />
						<Route path="/terms-of-service" element={<TermsOfService />} />
						<Route path="/garage-location-1" element={<GarageLocation1 />} />
						<Route path="/garage-location-2" element={<GarageLocation2 />} />
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</main>
				<Footer onCookieSettingsClick={() => setShowCookieDialog(true)} />
			</div>

			{showCookieDialog && (
				<CookieDialog
					preferences={cookiePreferences}
					onSave={handleSavePreferences}
					onAcceptAll={handleAcceptAll}
					onClose={() => setShowCookieDialog(false)}
				/>
			)}
		</Router>
	);
}

export default App;
