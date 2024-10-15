import { motion } from "framer-motion";

function AboutUsSection() {
	return (
		<section id="about" className="py-20 bg-white">
			<div className="container mx-auto px-6 lg:px-12">
				<motion.div
					initial={{ opacity: 0, y: -50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-center mb-12"
				>
					<h4 className="text-indigo-600 text-md font-semibold tracking-wide uppercase">
						Who We Are
					</h4>
					<h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
						Car Service Repairs & Maintenance
					</h2>
					<p className="text-gray-500 max-w-3xl mx-auto">
						With years of experience, we specialize in providing top-tier
						automotive services. Our team ensures your vehicle receives the best
						care, whether it&apos;s routine maintenance or advanced diagnostics.
					</p>
				</motion.div>

				<div className="flex flex-col lg:flex-row items-start gap-16">
					<motion.div
						className="lg:w-1/2 relative"
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
					>
						{/* Background Accent */}
						<div className="absolute top-10 left-10 w-40 h-40 bg-indigo-50 rounded-full -z-10 transform rotate-12"></div>

						<motion.img
							src="/assets/images/about-us.jpg"
							alt="Car Service"
							className="rounded-lg shadow-lg object-cover w-full h-auto"
							whileHover={{ scale: 1.05 }}
							transition={{ duration: 0.3 }}
						/>
						<motion.p
							className="text-gray-600 mt-4 leading-relaxed text-lg"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							viewport={{ once: true }}
						>
							Our certified technicians are trained to handle a variety of
							automotive services to ensure your vehicle remains safe and
							efficient. We use state-of-the-art tools and techniques to deliver
							high-quality results.
						</motion.p>
					</motion.div>

					<motion.div
						className="lg:w-1/2 flex flex-col space-y-6"
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
					>
						<motion.p
							className="text-gray-600 leading-relaxed text-lg"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							viewport={{ once: true }}
						>
							We believe in transparency and customer satisfaction. Every
							service comes with a full diagnostic report and recommendations to
							keep your vehicle in peak condition.
						</motion.p>
						<motion.img
							src="/assets/images/about-us2.png"
							alt="Car Lift"
							className="rounded-lg shadow-lg object-cover w-full h-auto"
							whileHover={{ scale: 1.05 }}
							transition={{ duration: 0.3 }}
						/>
					</motion.div>
				</div>
			</div>
		</section>
	);
}

export default AboutUsSection;
