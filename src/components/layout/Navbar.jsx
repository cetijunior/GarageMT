import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
	FiMenu,
	FiX,
	FiHome,
	FiInfo,
	FiTool,
	FiMapPin,
	FiImage,
	FiMail,
} from "react-icons/fi";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { motion } from "framer-motion";
import { HiOutlineLocationMarker, HiOutlinePhone, HiOutlineMail } from "react-icons/hi";
import { GARAGE_LOCATIONS } from "../../content/locations";
import { FaInstagram, FaFacebookF } from "react-icons/fa";

function Navbar() {
	const [navOpen, setNavOpen] = useState(false);
	const [navbarBg, setNavbarBg] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const handleScroll = () => {
			const heroHeight = document.getElementById("hero")?.offsetHeight || 0;
			if (window.scrollY > heroHeight || location.pathname === "/gallery") {
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

	const handleNavigation = (path, section) => {
		if (location.pathname !== "/") {
			navigate("/");
			setTimeout(() => {
				scrollToSection(section);
			}, 300); // Add a slight delay to ensure navigation happens before scrolling
		} else {
			scrollToSection(section);
		}
		setNavOpen(false); // Close the navbar after clicking
	};

	const scrollToSection = (sectionId) => {
		scroll.scrollTo(document.getElementById(sectionId)?.offsetTop - 80, {
			duration: 10,
			smooth: true,
		});
	};

	return (
		<nav
			className={`fixed w-full top-0 left-0 z-50 shadow-lg transition-colors duration-300 bg-gradient-to-br from-red-900 to-red-600 border-b-2 border-red-900`}
		>
			<div className="flex flex-row items-center justify-between px-6  pb-1 pt-4 md:py-4">
				{/* Logo */}
				<button
					onClick={() => handleNavigation("/", "hero")}
					className="flex items-center cursor-pointer"
				>
					<div className="h-12 w-36 md:h-12 lg:h-14 lg:w-44 lg:ml-10 bg-white border-2 border-red-900 rounded-lg flex items-center justify-center">
						<img
							src="/assets/icons/logo3.png"
							alt="Garage MT Logo"
							className="h-16 md:h-12 lg:h-14 object-contain"
						/>
					</div>
				</button>

				{/* Mobile Menu Toggle */}
				<div className="md:hidden">
					<button
						onClick={() => setNavOpen(!navOpen)}
						className="text-white focus:outline-none"
					>
						{navOpen ? <FiX size={24} /> : <FiMenu size={24} />}
					</button>
				</div>

				{/* Desktop Menu */}
				<div className="hidden md:flex space-x-6 items-center">
					<button
						onClick={() => handleNavigation("/", "hero")}
						className="text-white flex flex-row items-center hover:text-gray-800"
					>
						<FiHome size={24} />
						<span className="ml-2 hidden lg:inline-block">Home</span>
					</button>
					<button
						onClick={() => handleNavigation("/", "about")}
						className="text-white flex flex-row items-center hover:text-gray-800"
					>
						<FiInfo size={24} />
						<span className="ml-2 hidden lg:inline-block">About Us</span>
					</button>
					<button
						onClick={() => handleNavigation("/", "services")}
						className="text-white flex flex-row items-center hover:text-gray-800"
					>
						<FiTool size={24} />
						<span className="ml-2 hidden lg:inline-block">Services</span>
					</button>
					<button
						onClick={() => handleNavigation("/", "locations")}
						className="text-white flex flex-row items-center hover:text-gray-800"
					>
						<FiMapPin size={24} />
						<span className="ml-2 hidden lg:inline-block">Locations</span>
					</button>
					<button
						onClick={() => {
							navigate("/gallery");
						}}
						className="text-white flex flex-row items-center hover:text-gray-800"
					>
						<FiImage size={24} />
						<span className="ml-2 hidden lg:inline-block">Gallery</span>
					</button>
					<button
						onClick={() => handleNavigation("/", "contact")}
						className="text-white flex flex-row items-center hover:text-gray-800"
					>
						<FiMail size={24} />
						<span className="ml-2 hidden lg:inline-block">Contact</span>
					</button>
				</div>
			</div>



			{/* Mobile Menu */}
			<motion.div
				className="md:hidden w-full flex justify-start mt-2 rounded-2xl backdrop-blur-md bg-black border-t-8 border-red-950 bg-opacity-20 text-white overflow-hidden"
				animate={navOpen ? "open" : "closed"}
				variants={menuVariants}
				initial={false}
			>
				<div className="flex flex-col w-full space-y-4 px-4 py-4">
					<button
						onClick={() => handleNavigation("/", "hero")}
						className="text-white flex flex-row items-center hover:text-gray-800"
					>
						<FiHome size={24} />
						<span className="ml-2">Home</span>
					</button>
					<button
						onClick={() => handleNavigation("/", "about")}
						className="text-white flex flex-row items-center hover:text-gray-800"
					>
						<FiInfo size={24} />
						<span className="ml-2">About Us</span>
					</button>
					<button
						onClick={() => handleNavigation("/", "services")}
						className="text-white flex flex-row items-center hover:text-gray-800"
					>
						<FiTool size={24} />
						<span className="ml-2">Services</span>
					</button>
					<button
						onClick={() => handleNavigation("/", "locations")}
						className="text-white flex flex-row items-center hover:text-gray-800"
					>
						<FiMapPin size={24} />
						<span className="ml-2">Locations</span>
					</button>
					<button
						onClick={() => {
							navigate("/gallery");
							setNavOpen(false);
						}}
						className="text-white flex flex-row items-center hover:text-gray-800"
					>
						<FiImage size={24} />
						<span className="ml-2">Gallery</span>
					</button>
					<button
						onClick={() => handleNavigation("/", "contact")}
						className="text-white flex flex-row items-center hover:text-gray-800"
					>
						<FiMail size={24} />
						<span className="ml-2">Contact</span>
					</button>





					<div className="flex border-2 w-full"></div>






					{/* Contact Info for Both Garages */}
					<div className="text-start space-y-6">
						<h3 className="text-xl font-semibold text-gray-100">Locations: </h3>

						{/* Garage 1 Info */}
						<div>
							<h4 className="font-bold text-lg">GarageMT Limited</h4>
							<div className="flex items-center justify-start space-x-2">
								<HiOutlineLocationMarker size={20} />
								<p className="text-sm text-gray-300">{GARAGE_LOCATIONS.LOCATION_1.address}</p>
							</div>
							<div className="flex items-center justify-start space-x-2">
								<HiOutlinePhone size={20} />
								<p className="flex space-x-2">  <span className="flex mr-2"> | </span> Whatsapp </p>
								<p className="text-sm text-gray-300">{GARAGE_LOCATIONS.LOCATION_1.phone}</p>
							</div>
						</div>

						{/* Garage 2 Info */}
						<div>
							<h4 className="font-bold text-lg">Garage MT</h4>
							<div className="flex items-center justify-start space-x-2">
								<HiOutlineLocationMarker size={20} />
								<p className="text-sm text-gray-300">{GARAGE_LOCATIONS.LOCATION_2.address}</p>
							</div>
							<div className="flex items-center justify- space-x-2">
								<HiOutlinePhone size={20} />
								<p className="flex space-x-2">  <span className="flex mr-2"> | </span> Whatsapp </p>
								<p className="text-sm text-gray-300">{GARAGE_LOCATIONS.LOCATION_2.phone}</p>
							</div>
						</div>
					</div>

					{/* Social Media Links */}
					<div className="flex w-full justify-between items-center space-x-6 ">

						{/* Email */}
						<div className="flex items-center justify-start space-x-2">
							<HiOutlineMail size={20} />
							<p className="text-lg text-gray-300">info@garage.mt</p>
						</div>


						<div className="flex w-full justify-end items-center space-x-6 ">
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
				</div>
			</motion.div>
		</nav >
	);
}

export default Navbar;
