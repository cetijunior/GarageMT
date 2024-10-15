import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { HashLink as Link } from "react-router-hash-link";

function Footer() {
	return (
		<footer className="bg-gray-900 text-white py-10">
			<div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6 space-y-6 md:space-y-0">
				{/* Footer Navigation */}
				<div className="text-center md:text-left space-y-2">
					<h3 className="text-lg font-semibold">Quick Links</h3>
					<div className="flex flex-col md:flex-row md:space-x-4 text-sm space-y-2 md:space-y-0">
						<Link to="/#hero" smooth className="hover:text-yellow-500">
							Home
						</Link>
						<Link to="/#about" smooth className="hover:text-yellow-500">
							About Us
						</Link>
						<Link to="/#services" smooth className="hover:text-yellow-500">
							Services
						</Link>
						<Link to="/#locations" smooth className="hover:text-yellow-500">
							Locations
						</Link>
						<Link to="/#contact" smooth className="hover:text-yellow-500">
							Contact
						</Link>
						<Link to="/gallery" className="hover:text-yellow-500">
							Gallery
						</Link>
					</div>
				</div>

				{/* Social Media Links */}
				<div className="flex justify-center md:justify-start space-x-6">
					<a
						href="#"
						className="bg-blue-600 p-2 rounded-full hover:bg-blue-500 transition duration-200"
						aria-label="Facebook"
					>
						<FaFacebookF size={18} />
					</a>
					<a
						href="#"
						className="bg-pink-500 p-2 rounded-full hover:bg-pink-400 transition duration-200"
						aria-label="Instagram"
					>
						<FaInstagram size={18} />
					</a>
					<a
						href="#"
						className="bg-blue-400 p-2 rounded-full hover:bg-blue-300 transition duration-200"
						aria-label="Twitter"
					>
						<FaTwitter size={18} />
					</a>
				</div>

				{/* Contact Info */}
				<div className="text-center md:text-right space-y-2">
					<h3 className="text-lg font-semibold">Contact Us</h3>
					<p className="text-sm">123 Main St, Cityville, ST 12345</p>
					<p className="text-sm">Email: support@brothersgarage.com</p>
					<p className="text-sm">Phone: (123) 456-7890</p>
				</div>
			</div>

			{/* Footer Divider and Additional Info */}
			<div className="border-t border-gray-700 mt-8 pt-4">
				<p className="text-center text-sm text-gray-500">
					&copy; {new Date().getFullYear()} Brother&apos;s Garage. All rights
					reserved. | Designed by Brother&apos;s Garage - Built with Passion
				</p>
				<p className="text-center text-xs text-gray-600 mt-2">
					Follow us on social media for the latest updates and exclusive offers!
				</p>
			</div>
		</footer>
	);
}

export default Footer;
