import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import GalleryPage from "./pages/GalleryPage";
import GarageLocation1 from "./pages/GarageLocation1";
import GarageLocation2 from "./pages/GarageLocation2";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
	return (
		<Router>
			<div className="flex flex-col min-h-screen">
				<Navbar />
				<main className="">
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/about" element={<HomePage section="about" />} />
						<Route path="/services" element={<HomePage section="services" />} />
						<Route path="/locations" element={<HomePage section="locations" />} />
						<Route path="/contact" element={<HomePage section="contact" />} />
						<Route path="/gallery" element={<GalleryPage />} />
						<Route path="/garage-location-1" element={<GarageLocation1 />} />
						<Route path="/garage-location-2" element={<GarageLocation2 />} />
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</main>
			</div>
			<Footer />
		</Router >
	);
}

export default App;