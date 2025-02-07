import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { HiOutlineLocationMarker, HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { GARAGE_LOCATIONS } from "../../content/locations";

function Footer({ onCookieSettingsClick }) {
	const navigate = useNavigate();

	// Handle navigation and scroll logic
	const handleNavigation = (path, sectionId) => {
		if (window.location.pathname !== path) {
			navigate(path);
			setTimeout(() => scrollToSection(sectionId), 300);
		} else {
			scrollToSection(sectionId);
		}
	};

	// Scroll to the specific section
	const scrollToSection = (sectionId) => {
		const section = document.getElementById(sectionId);
		if (section) {
			section.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};

	return (
		<footer className="bg-gradient-to-br from-red-700 via-black to-gray-900 text-white py-12">
			<div className="container mx-auto flex flex-col lg:flex-row justify-between lg:items-center px-6 space-y-10 lg:space-y-0">
				{/* Footer Navigation */}
				<div className="text-center lg:text-left space-y-4">
					<h3 className="text-xl font-semibold text-gray-100">Quick Links:</h3>
					<div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm">
						<button
							onClick={() => handleNavigation("/", "hero")}
							className="hover:text-yellow-400 transition duration-200 cursor-pointer"
						>
							Home
						</button>
						<button
							onClick={() => handleNavigation("/", "about")}
							className="hover:text-yellow-400 transition duration-200 cursor-pointer"
						>
							About Us
						</button>
						<button
							onClick={() => handleNavigation("/", "services")}
							className="hover:text-yellow-400 transition duration-200 cursor-pointer"
						>
							Services
						</button>
						<button
							onClick={() => handleNavigation("/", "locations")}
							className="hover:text-yellow-400 transition duration-200 cursor-pointer"
						>
							Locations
						</button>
						<button
							onClick={() => handleNavigation("/", "contact")}
							className="hover:text-yellow-400 transition duration-200 cursor-pointer"
						>
							Contact
						</button>
						<a href="/gallery" className="hover:text-yellow-400 transition duration-200">
							Gallery
						</a>
						<a href="/privacy-policy" className="hover:text-yellow-400 transition duration-200">
							Privacy Policy
						</a>
						<a href="/terms-of-service" className="hover:text-yellow-400 transition duration-200">
							Terms Of Service
						</a>
					</div>
				</div>



				<div className="text-center border-t border-gray-800 mt-10 pt-6"></div>



				{/* Contact Info for Both Garages */}
				<div className="flex lg:flex-row flex-col text-center space-y-6">
					<h3 className="lg:text-2xl text-xl font-bold text-gray-100">
						Contact Us:
					</h3>


					<div className="flex lg:flex-col space-y-2 items-center justify-evenly">
						{/* Garage 1 Info */}
						<div className="flex flex-col items-start">
							<h4 className="font-bold text-lg self-center">GarageMT Limited</h4>
							<div className="flex items-center justify-center space-x-2">
								<HiOutlineLocationMarker size={20} />
								<p className="text-sm text-gray-300">{GARAGE_LOCATIONS.LOCATION_1.address}</p>
							</div>
							<div className="flex items-center justify-center space-x-2">
								<HiOutlinePhone size={20} />
								<p> | Whatsapp </p>
								<p className="text-sm text-gray-300">{GARAGE_LOCATIONS.LOCATION_1.phone}</p>
							</div>
						</div>

						<div className="border lg:h-0 lg:w-full h-20 border-red-900"></div>

						{/* Garage 2 Info */}
						<div className="flex flex-col items-start">
							<h4 className="font-bold text-lg self-center">Garage MT</h4>
							<div className="flex items-center justify-center space-x-2">
								<HiOutlineLocationMarker size={20} />
								<p className="text-sm text-gray-300">{GARAGE_LOCATIONS.LOCATION_2.address}</p>
							</div>
							<div className="flex items-center justify-center space-x-2">
								<HiOutlinePhone size={20} />
								<p> | Whatsapp </p>
								<p className="text-sm text-gray-300">{GARAGE_LOCATIONS.LOCATION_2.phone}</p>
							</div>
						</div>

					</div>

					{/* Email */}
					<div className="flex items-center justify-center space-x-2">
						<HiOutlineMail size={20} />
						<p className="text-lg text-gray-300">Email: info@garage.mt</p>
					</div>
				</div>

				{/* Social Media Links */}
				<div className="flex flex-row lg:flex-col justify-center items-center space-x-6 lg:space-x-0 lg:space-y-4">
					<a
						href="https://www.instagram.com/garagemt.ltd/"
						className="p-3 bg-pink-700 rounded-full hover:bg-pink-600 transition duration-300 ease-in-out"
						aria-label="Instagram"
						target="_blank"
						rel="noopener noreferrer"
					>
						<FaInstagram size={20} />
					</a>
					<a
						href="https://www.facebook.com/garagemt.ltd"
						className="p-3 bg-blue-600 rounded-full hover:bg-blue-500 transition duration-300 ease-in-out"
						aria-label="Facebook"
						target="_blank"
						rel="noopener noreferrer"
					>
						<FaFacebookF size={20} />
					</a>
				</div>
			</div>

			{/* Footer Divider and Additional Info */}
			<div className="text-center border-t border-gray-800 mt-10 pt-6">


				<div className="flex flex-col items-center justify-center">
					<p className="text-sm text-white">&copy; {new Date().getFullYear()} GarageMT. All rights reserved.</p>

					<button
						onClick={onCookieSettingsClick}
						className="flex text-sm my-3 items-end justify-end bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition"
					>
						Cookie Preferences
					</button>



				</div>
				<p className="text-sm mt-2 text-white">
					Designed by{" "}
					<a
						className="underline hover:text-yellow-400 transition duration-200"
						href="https://www.ca-webservices.com"
						target="_blank"
						rel="noopener noreferrer"
					>
						CA Web Services
					</a>
				</p>
				<div
					className="flex mx-auto mt-4 items-center justify-center h-auto"
				>
					<img
						className="animate-spin hover:animate-none mr-4 w-20 md:w-32 h-auto"
						src="/assets/icons/ca/logo.png"
					/>
					<a className=" flex w-fulll text-3xl font-extrabold font-serif hover:text-red-600 transition duration-200"
						href="https://www.ca-webservices.com"
						target="_blank"
						rel="noopener noreferrer"
					>
						CA Web Services
					</a>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
