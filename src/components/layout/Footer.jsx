import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
	return (
		<footer className="bg-primary text-white py-6">
			<div className="container mx-auto text-center space-y-4">
				<p>
					&copy; {new Date().getFullYear()} Brother`s Garage. All rights
					reserved.
				</p>
				<div className="flex justify-center space-x-4">
					<a href="#" className="hover:text-secondary">
						<FaFacebookF size={20} />
					</a>
					<a href="#" className="hover:text-secondary">
						<FaInstagram size={20} />
					</a>
					<a href="#" className="hover:text-secondary">
						<FaTwitter size={20} />
					</a>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
