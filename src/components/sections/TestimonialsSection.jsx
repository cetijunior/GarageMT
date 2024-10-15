import { useState } from "react";
import { testimonialsData } from "../../content/testimonialsContent";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"; // Import navigation icons

function TestimonialsSection() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);

	// Animation duration (matching framer-motion animation duration)
	const ANIMATION_DURATION = 0.5;

	// Handle previous button
	const handlePrev = () => {
		if (!isAnimating) {
			setIsAnimating(true);
			setTimeout(() => {
				setIsAnimating(false);
			}, ANIMATION_DURATION * 1000);

			setCurrentIndex(
				(currentIndex + testimonialsData.length - 1) % testimonialsData.length
			);
		}
	};

	// Handle next button
	const handleNext = () => {
		if (!isAnimating) {
			setIsAnimating(true);
			setTimeout(() => {
				setIsAnimating(false);
			}, ANIMATION_DURATION * 1000);

			setCurrentIndex((currentIndex + 1) % testimonialsData.length);
		}
	};

	return (
		<section
			className="py-16 bg-gradient-to-r from-gray-100 via-white to-gray-100"
			id="testimonials"
		>
			<div className="container mx-auto text-center">
				<h2 className="text-4xl font-bold mb-12 text-gray-800">
					What Our Customers Say
				</h2>
				<div className="relative max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
					{/* AnimatePresence allows for exit and enter animations */}
					<AnimatePresence mode="wait">
						<motion.div
							key={currentIndex}
							initial={{ opacity: 0, x: 100 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -100 }}
							transition={{ duration: ANIMATION_DURATION }}
						>
							<p className="text-xl italic mb-4 text-gray-700">
								&quot;{testimonialsData[currentIndex].quote}&quot;
							</p>
							<p className="font-semibold text-gray-900">
								- {testimonialsData[currentIndex].name}
							</p>
						</motion.div>
					</AnimatePresence>
					{/* Navigation Buttons */}
					<div className="flex justify-between items-center mt-8">
						{/* Previous Button */}
						<motion.button
							onClick={handlePrev}
							whileHover={{ scale: 1.2 }}
							whileTap={{ scale: 0.9 }}
							className="p-3 bg-yellow-500 text-white rounded-full shadow hover:bg-yellow-600 transition duration-200"
						>
							<ChevronLeftIcon className="h-6 w-6" />
						</motion.button>
						{/* Next Button */}
						<motion.button
							onClick={handleNext}
							whileHover={{ scale: 1.2 }}
							whileTap={{ scale: 0.9 }}
							className="p-3 bg-yellow-500 text-white rounded-full shadow hover:bg-yellow-600 transition duration-200"
						>
							<ChevronRightIcon className="h-6 w-6" />
						</motion.button>
					</div>
				</div>
			</div>
		</section>
	);
}

export default TestimonialsSection;
