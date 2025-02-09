import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ParticlesBackground from "../components/layout/ParticlesBackground";

// Image and video categories with respective media files
const categories = {
	"Garage 1": [
		"/assets/images/work1.jpg",
		"/assets/images/work6.jpg",
		"/assets/images/work.jpg",
		"/assets/videos/vid1.mp4",
		"/assets/images/work3.jpg",
		"/assets/videos/vid3.mp4",
		"/assets/images/work2.jpg",
		"/assets/images/work5.jpg",
		"/assets/images/work4.jpg",
		"/assets/videos/vid2.mp4",
		"/assets/images/entry3.jpg",
		"/assets/images/entry1.jpg",

		// Add more "Work" images
	],
	"Garage 2": [

		// Add more "Garage" media files (images/videos)
	],
};

function GalleryPage() {
	const [selectedCategory, setSelectedCategory] = useState("Garage 1"); // Default to "Work" category
	const [selectedMedia, setSelectedMedia] = useState(null);

	// Get images and videos based on selected category
	const mediaFiles = categories[selectedCategory] || [];

	// Utility function to check if the media is a video
	const isVideo = (file) => {
		return (
			file.endsWith(".mp4") || file.endsWith(".webm") || file.endsWith(".ogg")
		);
	};

	return (
		<div className="container mx-auto mt-6 pb-16">
			<div className="z-0">
				<ParticlesBackground />
			</div>
			<h2 className="text-4xl font-bold text-center mb-12">Gallery</h2>

			{/* Category Selector */}
			<div className="flex justify-center space-x-6 mb-8">
				{Object.keys(categories).map((category) => (
					<button
						key={category}
						className={`px-6 py-2 rounded-full font-semibold text-white ${selectedCategory === category
							? "bg-red-500"
							: "bg-gray-400 hover:bg-gray-500"
							}`}
						onClick={() => setSelectedCategory(category)}
					>
						{category}
					</button>
				))}
			</div>

			{/* Image and Video Gallery */}
			<div className="grid md:grid-cols-3 gap-6">
				{mediaFiles.map((media, index) => (
					<motion.div
						key={index}
						className="cursor-pointer"
						onClick={() => setSelectedMedia(media)}
						whileHover={{ scale: 1.05 }}
					>
						{/* Render image or video thumbnail */}
						{isVideo(media) ? (
							<video
								src={media}
								className="rounded-xl p-2 shadow-xl hover:shadow-2xl hover:shadow-red-600 transition-all duration-300 w-full h-64 object-cover"
								muted
								loop
								autoPlay
								playsInline
							/>
						) : (
							<img
								src={media}
								alt={`Gallery ${index + 1}`}
								className="rounded-xl p-2 shadow-xl hover:shadow-2xl hover:shadow-red-600 transition-all duration-300 w-full h-64 object-cover"
							/>
						)}
					</motion.div>
				))}
			</div>

			{/* Modal for Enlarged Image/Video */}
			<AnimatePresence>
				{selectedMedia && (
					<motion.div
						className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
						onClick={() => setSelectedMedia(null)}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						{/* Display video or image in the modal */}
						{isVideo(selectedMedia) ? (
							<motion.video
								src={selectedMedia}
								controls
								className="max-w-full max-h-full lg:px-2 lg:py-2 md:px-2 md:py-2 px-2 py-2 rounded-[20px]"
								initial={{ scale: 0.8 }}
								animate={{ scale: 1 }}
								exit={{ scale: 0.8 }}
								transition={{ duration: 0.3 }}
							/>
						) : (
							<motion.img
								src={selectedMedia}
								alt="Enlarged"
								className="max-w-full max-h-full lg:px-2 lg:py-2 md:px-2 md:py-2 px-2 py-2 rounded-[20px]"
								initial={{ scale: 0.8 }}
								animate={{ scale: 1 }}
								exit={{ scale: 0.8 }}
								transition={{ duration: 0.3 }}
							/>
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

export default GalleryPage;
