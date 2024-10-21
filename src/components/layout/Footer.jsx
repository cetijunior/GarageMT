import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
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
				<div className="text-center lg:text-right space-y-2">
					<h3 className="text-xl font-semibold text-gray-100">Contact Us</h3>
					<p className="text-sm text-gray-300">123 Main St, Cityville, ST 12345</p>
					<p className="text-sm text-gray-300">Email: info@garage.mt</p>
					<p className="text-sm text-gray-300">Phone: +356 770 88 222</p>
				</div>

				{/* Social Media Links */}
				<div className="flex justify-center lg:justify-start space-x-4 flex-wrap">
					<a
						href="#"
						className="p-2 bg-blue-600 rounded-full hover:bg-blue-500 transition duration-300 ease-in-out"
						aria-label="Facebook"
					>
						<FaFacebookF size={20} />
					</a>
					<a
						href="#"
						className="p-2 bg-pink-500 rounded-full hover:bg-pink-400 transition duration-300 ease-in-out"
						aria-label="Instagram"
					>
						<FaInstagram size={20} />
					</a>
					<a
						href="#"
						className="p-2 bg-blue-400 rounded-full hover:bg-blue-300 transition duration-300 ease-in-out"
						aria-label="Twitter"
					>
						<FaTwitter size={20} />
					</a>
				</div>
			</div>

			{/* Footer Divider and Additional Info */}
			<div className="border-t border-gray-800 mt-10 pt-6">
				<p className="text-center text-sm text-white">
					&copy; {new Date().getFullYear()} Brother&apos;s Garage. All rights reserved.
					| Designed by Brother&apos;s Garage - Built with Passion
				</p>
				<p className="text-center text-xs text-gray-300 mt-2">
					Follow us on social media for the latest updates and exclusive offers!
				</p>
			</div>
		</footer>
	);
}

export default Footer;
