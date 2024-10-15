/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { FiMenu, FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

function Navbar() {
	const [navOpen, setNavOpen] = useState(false);
	const [navbarBg, setNavbarBg] = useState(false);
	const location = useLocation();

	// Function to handle scroll
	useEffect(() => {
		const handleScroll = () => {
			const heroSection = document.getElementById("hero");
			const heroHeight = heroSection ? heroSection.offsetHeight : 0;
			if (window.scrollY > heroHeight || location.pathname === "/gallery") {
				setNavbarBg(true);
			} else {
				setNavbarBg(false);
			}
		};

		// Add scroll event listener
		window.addEventListener("scroll", handleScroll);

		// Check navbar background on initial render
		handleScroll();

		// Clean up event listener on component unmount
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [location]);

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

	return (
		<nav
			className={`fixed w-full z-20 top-0 left-0 shadow-lg transition-colors duration-300 ${
				navbarBg ? "bg-blue-900" : "bg-transparent"
			} border-b-4 sm:rounded-b-full rounded-b-2xl border-blue-700`}
		>
			<div className="container mx-auto flex items-center justify-between px-10 py-3">
				<Link
					to="/#hero"
					smooth
					scroll={(el) =>
						el.scrollIntoView({ behavior: "smooth", block: "start" })
					}
					className="text-white text-2xl font-bold"
				>
					Brother`s Garage
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
					<Link to="/#hero" smooth className="text-white hover:text-secondary">
						Home
					</Link>
					<Link to="/#about" smooth className="text-white hover:text-secondary">
						About Us
					</Link>
					<Link
						to="/#services"
						smooth
						className="text-white hover:text-secondary"
					>
						Services
					</Link>
					<Link
						to="/#locations"
						smooth
						className="text-white hover:text-secondary"
					>
						Locations
					</Link>
					<Link to="/gallery" className="text-white hover:text-secondary">
						Gallery
					</Link>
					<Link
						to="/#contact"
						smooth
						className="text-white hover:text-secondary"
					>
						Contact
					</Link>
				</div>
			</div>
			{/* Mobile Menu */}
			<motion.div
				className="md:hidden rounded-2xl backdrop-blur-md bg-yellow-900 border-t-4 border-blue-700 bg-opacity-20 text-white overflow-hidden"
				animate={navOpen ? "open" : "closed"}
				variants={menuVariants}
				initial={false}
			>
				<div className="flex flex-col space-y-4 px-4 py-4">
					<Link
						to="/#hero"
						smooth
						scroll={(el) =>
							el.scrollIntoView({ behavior: "smooth", block: "start" })
						}
						className="hover:text-secondary"
						onClick={() => setNavOpen(false)}
					>
						Home
					</Link>
					<Link
						to="/#about"
						smooth
						className="hover:text-secondary"
						onClick={() => setNavOpen(false)}
					>
						About Us
					</Link>
					<Link
						to="/#services"
						smooth
						className="hover:text-secondary"
						onClick={() => setNavOpen(false)}
					>
						Services
					</Link>
					<Link
						to="/#locations"
						smooth
						className="hover:text-secondary"
						onClick={() => setNavOpen(false)}
					>
						Locations
					</Link>
					<Link
						to="/gallery"
						className="hover:text-secondary"
						onClick={() => setNavOpen(false)}
					>
						Gallery
					</Link>
					<Link
						to="/#contact"
						smooth
						className="hover:text-secondary"
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
