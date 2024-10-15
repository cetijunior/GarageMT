import { useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { FiMenu, FiX } from "react-icons/fi";
import { motion } from "framer-motion";

function Navbar() {
	const [navOpen, setNavOpen] = useState(false);

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
		<nav className="bg-primary fixed w-full z-20 py-2 left-0 shadow-lg">
			<div className="container mx-auto flex items-center justify-between px-4 py-3">
				<Link to="/" className="text-white text-2xl font-bold" smooth>
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
					<Link to="/" smooth className="text-white hover:text-secondary">
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
			<motion.div
				className="md:hidden bg-primary text-white overflow-hidden"
				animate={navOpen ? "open" : "closed"}
				variants={menuVariants}
				initial={false}
			>
				<div className="flex flex-col space-y-4 px-4 py-4">
					<Link
						to="/"
						smooth
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
