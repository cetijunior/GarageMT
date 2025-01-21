import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import GalleryPage from "./pages/GalleryPage";
import NotFoundPage from "./pages/NotFoundPage";
import BookingPage from "./pages/BookingPage";

function App() {
	return (
		<Router>
			<div className="flex flex-col min-h-screen">
				<Navbar />
				<main className="flex-grow pt-16">
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/about" element={<HomePage section="about" />} />
						<Route path="/services" element={<HomePage section="services" />} />
						<Route
							path="/locations"
							element={<HomePage section="locations" />}
						/>
						<Route path="/contact" element={<HomePage section="contact" />} />
						<Route path="/booking" element={<HomePage section="booking" />} />
						<Route path="/gallery" element={<GalleryPage />} />
						<Route path="/booking" element={<BookingPage />} />
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
