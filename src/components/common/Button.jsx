/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

function Button({ children, onClick, className, href }) {
	return (
		<motion.a
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			href={href}
			onClick={onClick}
			className={`inline-block px-6 py-3 rounded-full bg-secondary text-white hover:bg-yellow-500 ${className}`}
		>
			{children}
		</motion.a>
	);
}

export default Button;
