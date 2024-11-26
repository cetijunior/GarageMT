import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { HiOutlineLocationMarker, HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { HashLink as Link } from "react-router-hash-link";

function Footer() {
	return (
		<footer className="bg-gradient-to-br from-red-700 via-black to-gray-900 text-white py-12">
			<div className="container mx-auto flex flex-col lg:flex-row justify-between items-center lg:items-center px-6 space-y-10 lg:space-y-0 lg:space-x-10">
				{/* Footer Navigation */}
				<div className="text-center lg:text-left space-y-4 lg:space-y-2">
					<h3 className="text-xl font-semibold text-gray-100">Quick Links</h3>
					<div className="flex flex-col lg:flex-row lg:space-x-6 text-sm space-y-4 lg:space-y-0">
						<Link
							to="/#hero"
							smooth
							className="hover:text-yellow-400 transition duration-200"
						>
							Home
						</Link>
						<Link
							to="/#about"
							smooth
							className="hover:text-yellow-400 transition duration-200"
						>
							About Us
						</Link>
						<Link
							to="/#services"
							smooth
							className="hover:text-yellow-400 transition duration-200"
						>
							Services
						</Link>
						<Link
							to="/#locations"
							smooth
							className="hover:text-yellow-400 transition duration-200"
						>
							Locations
						</Link>
						<Link
							to="/#contact"
							smooth
							className="hover:text-yellow-400 transition duration-200"
						>
							Contact
						</Link>
						<Link
							to="/gallery"
							className="hover:text-yellow-400 transition duration-200"
						>
							Gallery
						</Link>
					</div>
				</div>

				{/* Contact Info */}
				<div className="text-center lg:text-start space-y-2">
					<h3 className="text-xl items-center font-semibold text-gray-100">Contact Us</h3>
					<div className="flex items-center justify-start space-x-2">
						<HiOutlineLocationMarker size={20} />
						<p className="text-sm text-gray-300">Vjal Il-25 Novembru, Mosta, Malta</p>
					</div>
					<div className="flex items-center justify-start space-x-2">
						<HiOutlineMail size={20} />
						<p className="text-sm text-gray-300">Email: info@garage.mt</p>
					</div>
					<div className="flex items-center justify-start space-x-2">
						<HiOutlinePhone size={20} />
						<p className="text-sm text-gray-300">Phone: +356 770 88 222</p>
					</div>
				</div>

				{/* Social Media Links */}
				<div className="flex justify-center space-y-4 flex-col">
					<a
						href="#"
						className="p-2 bg-blue-600 rounded-full hover:bg-blue-500 transition duration-300 ease-in-out"
						aria-label="Facebook"
					>
						<FaFacebookF size={20} />
					</a>
					<a
						href="#"
						className="p-2 bg-pink-700 rounded-full hover:bg-pink-600 transition duration-300 ease-in-out"
						aria-label="Instagram"
					>
						<FaInstagram size={20} />
					</a>

				</div>
			</div>

			{/* Footer Divider and Additional Info */}
			<div className="flex flex-row items-center justify-evenly border-t border-gray-800 mt-10 pt-6">
				<p className="text-center text-sm text-white">
					<p>&copy; {new Date().getFullYear()} GarageMT. All rights reserved.</p>
				</p>
				{/* <a href="https://ca-services.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-center text-xs text-gray-300 ">
					Designed by {" "}
					<span className="underline">CA-WebsiteServices </span> - Built with Passion
				</a> */}
			</div>
		</footer>
	);
}

export default Footer;
