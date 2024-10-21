/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import { HashLink as Link } from "react-router-hash-link";
import { FiMenu, FiX } from "react-icons/fi";
import { motion } from "framer-motion";

function Navbar() {
	const [navOpen, setNavOpen] = useState(false);
	const [navbarBg, setNavbarBg] = useState(false);
	const location = useLocation(); // Get the current route

	// Function to handle scroll
	useEffect(() => {
		const handleScroll = () => {
			const heroHeight = document.getElementById("hero")?.offsetHeight || 0;
			if (window.scrollY > heroHeight || location.pathname === "/gallery") {
				setNavbarBg(true); // Apply background if scrolled past hero or on /gallery page
			} else {
				setNavbarBg(false); // Remove background if not scrolled and not on /gallery
			}
		};

		// Add scroll event listener
		window.addEventListener("scroll", handleScroll);

		// Initial check to apply background if on /gallery without scroll
		handleScroll();

		// Clean up event listener on component unmount
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [location.pathname]);

	// Variants for the mobile menu
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
			setTimeout(() => scrollToSection(sectionId), 300); // Delay scroll to ensure page has loaded
		} else {
			scrollToSection(sectionId);
		}
	};

	return (
		<nav
			className={`fixed w-full z-20 top-0 left-0 shadow-lg transition-colors duration-300 ${
				navbarBg ? "bg-red-700" : "bg-transparent"
			} border-b-4 sm:rounded-b-full rounded-b-2xl border-red-500`}
		>
			<div className="container mx-auto flex items-center justify-between px-10 py-3">
				<Link
					onClick={() => handleNavigation("top")}
					to="/#hero"
					smooth
					scroll={(el) =>
						el.scrollIntoView({ behavior: "smooth", block: "start" })
					}
					className="flex items-center"
				>
					{/* Logo with gradient background and rounded shape */}
					<div className="h-12 w-36 md:h-12 lg:h-14 lg:w-44 lg:ml-10 bg-white border-2 border-red-600 rounded-lg flex items-center justify-center">
						<img
							src="/assets/images/logo.png"
							alt="Brother's Garage Logo"
							className="h-10 md:h-12 lg:h-14 object-contain" // Ensure proper scaling for responsiveness
						/>
					</div>
				</Link>
				<div className="md:hidden">
					<button
						onClick={() => setNavOpen(!navOpen)}
						className="text-white focus:outline-none"
					>
						{navOpen ? <FiX size={24} /> : <FiMenu size={24} />}
					</button>
				</div>
				<div className="hidden md:flex space-x-6 items-center">
					<Link to="/#hero" smooth className="text-white hover:text-yellow-500">
						Home
					</Link>
					<Link
						to="/#about"
						smooth
						className="text-white hover:text-yellow-500"
					>
						About Us
					</Link>
					<Link
						to="/#services"
						smooth
						className="text-white hover:text-yellow-500"
					>
						Services
					</Link>
					<Link
						to="/#locations"
						smooth
						className="text-white hover:text-yellow-500"
					>
						Locations
					</Link>
					<Link to="/gallery" className="text-white hover:text-yellow-500">
						Gallery
					</Link>
					<Link
						to="/#contact"
						smooth
						className="text-white hover:text-yellow-500"
					>
						Contact
					</Link>
				</div>
			</div>
			{/* Mobile Menu */}
			<motion.div
				className="md:hidden rounded-2xl backdrop-blur-md bg-red-900 border-t-4 border-red-500 bg-opacity-20 text-white overflow-hidden"
				animate={navOpen ? "open" : "closed"}
				variants={menuVariants}
				initial={false}
			>
				<div className="flex flex-col space-y-4 px-4 py-4">
					<Link
						to="/"
						smooth
						scroll={(el) =>
							el.scrollIntoView({ behavior: "smooth", block: "start" })
						}
						className="hover:text-yellow-500"
						onClick={() => setNavOpen(false)}
					>
						Home
					</Link>
					<Link
						to="/#about"
						smooth
						className="hover:text-yellow-500"
						onClick={() => setNavOpen(false)}
					>
						About Us
					</Link>
					<Link
						to="/#services"
						smooth
						className="hover:text-yellow-500"
						onClick={() => setNavOpen(false)}
					>
						Services
					</Link>
					<Link
						to="/#locations"
						smooth
						className="hover:text-yellow-500"
						onClick={() => setNavOpen(false)}
					>
						Locations
					</Link>
					<Link
						to="/gallery"
						className="hover:text-yellow-500"
						onClick={() => setNavOpen(false)}
					>
						Gallery
					</Link>
					<Link
						to="/#contact"
						smooth
						className="hover:text-yellow-500"
						onClick={() => setNavOpen(false)}
					>
						Contact
					</Link>
				</div>
			</motion.div>
		</nav>
	);
}

export default Navbar;
