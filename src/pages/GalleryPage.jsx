import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
	"/assets/images/gallery1.jpg",
	"/assets/images/gallery2.jpg",
	"/assets/images/gallery3.jpg",
	// Add more image paths
];

function GalleryPage() {
	const [selectedImage, setSelectedImage] = useState(null);

	return (
		<div className="container mx-auto py-16">
			<h2 className="text-4xl font-bold text-center mb-12">Gallery</h2>
			<div className="grid md:grid-cols-3 gap-6">
				{images.map((img, index) => (
					<motion.div
						key={index}
						className="cursor-pointer px-10"
						onClick={() => setSelectedImage(img)}
						whileHover={{ scale: 1.05 }}
					>
						<img
							src={img}
							alt={`Gallery ${index + 1}`}
							className="rounded shadow-lg"
						/>
					</motion.div>
				))}
			</div>
			<AnimatePresence>
				{selectedImage && (
					<motion.div
						className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
						onClick={() => setSelectedImage(null)}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<motion.img
							src={selectedImage}
							alt="Enlarged"
							className="max-w-full max-h-full"
							initial={{ scale: 0.8 }}
							animate={{ scale: 1 }}
							exit={{ scale: 0.8 }}
							transition={{ duration: 0.3 }}
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

export default GalleryPage;
