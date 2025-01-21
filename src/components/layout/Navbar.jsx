/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import { FiMenu, FiX, FiHome, FiInfo, FiTool, FiMapPin, FiImage, FiMail, FiCalendar } from "react-icons/fi";
import { motion } from "framer-motion";

function Navbar() {
	const [navOpen, setNavOpen] = useState(false);
	const [navbarBg, setNavbarBg] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const handleScroll = () => {
			const heroHeight = document.getElementById("hero")?.offsetHeight || 0;
			if (window.scrollY > heroHeight || location.pathname === "/gallery" || location.pathname === "/booking" || location.pathname === "/*") {
				setNavbarBg(true);
			} else {
				setNavbarBg(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll();

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [location.pathname]);

	const menuVariants = {
		open: {
			opacity: 1,
			height: "auto",
			transition: {
				duration: 0.3,
			},
		},
		closed: {
			opacity: 0,
			height: 0,
			transition: {
				duration: 0.3,
			},
		},
	};

	const handleNavigation = (sectionId) => {
		if (window.location.pathname !== "/") {
			navigate("/");
			setTimeout(() => scrollToSection(sectionId), 300);
		} else {
			scrollToSection(sectionId);
		}
	};

	const scrollToSection = (sectionId) => {
		const section = document.getElementById(sectionId);
		if (section) {
			section.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<nav
			className={`fixed w-full z-20 top-0 sm:border-t-0 border-t-4 left-0 shadow-lg transition-colors duration-300 ${navbarBg ? "bg-red-700" : "bg-transparent"
				} border-b-4 sm:rounded-b-full rounded-b-2xl border-red-900`}
		>
			<div className="container mx-auto flex items-center justify-between px-10 py-3">
				<button
					onClick={() => handleNavigation("hero")}

					className="flex items-center"
				>
					<div className="h-12 w-36 md:h-12 lg:h-14 lg:w-44 lg:ml-10 bg-white  border-2 border-red-900 rounded-lg flex items-center justify-center">
						<img
							src="/assets/icons/logo3.png"
							alt="Garage MT Logo"
							className="h-16 md:h-12 lg:h-14 object-contain"
						/>
					</div>
				</button>
				<div className="md:hidden">
					<button
						onClick={() => setNavOpen(!navOpen)}
						className="text-white focus:outline-none"
					>
						{navOpen ? <FiX size={24} /> : <FiMenu size={24} />}
					</button>
				</div>

				<div className="hidden md:flex space-x-6 items-center">
					<button
						onClick={() => handleNavigation("hero")}
						className="text-white flex flex-row items-center hover:text-gray-800"
					>
						<FiHome size={24} />
						<span className="ml-2">Home</span>
					</button>
					<button
						onClick={() => navigate("/about")}
						className="text-white flex flex-row items-center hover:text-gray-800"
					>
						<FiInfo size={24} />
						<span className="ml-2">About Us</span>
					</button>
					<button
						onClick={() => navigate("/services")}
						className="text-white flex flex-row items-center hover:text-gray-800"
					>
						<FiTool size={24} />
						<span className="ml-2">Services</span>
					</button>
					<button
						onClick={() => navigate("/locations")}
						className="text-white flex flex-row items-center hover:text-gray-800"
					>
						<FiMapPin size={24} />
						<span className="ml-2">Locations</span>
					</button>

					<button
						onClick={() => navigate("/contact")}
						className="text-white flex flex-row items-center hover:text-gray-800"
					>
						<FiMail size={24} />
						<span className="ml-2">Contact</span>
					</button>
					<button
						onClick={() => navigate("/booking")}
						className="text-white flex flex-row items-center hover:text-gray-800"
					>
						<FiCalendar size={24} />
						<span className="ml-2">Booking (Beta)</span>
					</button>
					<button
						onClick={() => {
							navigate("/gallery");
							window.scrollTo({ top: 0, behavior: 'smooth' });
						}}
						className="text-white flex flex-row items-center hover:text-gray-800"
					>
						<FiImage size={24} />
						<span className="ml-2">Gallery</span>
					</button>
				</div>
			</div>
			<motion.div
				className="md:hidden rounded-2xl backdrop-blur-md bg-black border-t-4 border-red-900 bg-opacity-20 text-white overflow-hidden"
				animate={navOpen ? "open" : "closed"}
				variants={menuVariants}
				initial={false}
			>
				<div className="flex flex-col space-y-4 px-4 py-4">
					<button
						onClick={() => handleNavigation("hero")}
						className="text-white flex flex-row items-center hover:text-gray-800"
					>
						<FiHome size={24} />
						<span className="ml-2">Home</span>
					</button>
					<button
						onClick={() => navigate("/about")}
						className="text-white flex flex-row items-center hover:text-gray-800"
					>
						<FiInfo size={24} />
						<span className="ml-2">About Us</span>
					</button>
					<button
						onClick={() => navigate("/services")}
						className="text-white flex flex-row items-center hover:text-gray-800"
					>
						<FiTool size={24} />
						<span className="ml-2">Services</span>
					</button>
					<button
						onClick={() => navigate("/locations")}
						className="text-white flex flex-row items-center hover:text-gray-800"
					>
						<FiMapPin size={24} />
						<span className="ml-2">Locations</span>
					</button>
					<button
						onClick={() => {
							navigate("/gallery");
							window.scrollTo({ top: 0, behavior: 'smooth' });
						}}
						className="text-white flex flex-row items-center hover:text-gray-800"
					>
						<FiImage size={24} />
						<span className="ml-2">Gallery</span>
					</button>
					<button
						onClick={() => navigate("/contact")}
						className="text-white flex flex-row items-center hover:text-gray-800"
					>
						<FiMail size={24} />
						<span className="ml-2">Contact</span>
					</button>
					<button
						onClick={() => navigate("/booking")}
						className="text-white flex flex-row items-center hover:text-gray-800"
					>
						<span className="ml-2">Book a Consultation</span>
					</button>
				</div>
			</motion.div>
		</nav>
	);
}

export default Navbar;
