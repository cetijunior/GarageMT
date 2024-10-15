import { useState } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const images = [
	"/assets/images/gallery1.jpg",
	"/assets/images/gallery2.jpg",
	"/assets/images/gallery3.jpg",
	// Add more image paths
];

function GalleryPage() {
	const [photoIndex, setPhotoIndex] = useState(0);
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="container mx-auto py-16">
			<h2 className="text-4xl font-bold text-center mb-12">Gallery</h2>
			<div className="grid md:grid-cols-3 gap-6">
				{images.map((img, index) => (
					<div
						key={index}
						className="cursor-pointer"
						onClick={() => {
							setPhotoIndex(index);
							setIsOpen(true);
						}}
					>
						<img
							src={img}
							alt={`Gallery ${index + 1}`}
							className="rounded shadow-lg gallery-image"
						/>
					</div>
				))}
			</div>
			{isOpen && (
				<Lightbox
					mainSrc={images[photoIndex]}
					nextSrc={images[(photoIndex + 1) % images.length]}
					prevSrc={images[(photoIndex + images.length - 1) % images.length]}
					onCloseRequest={() => setIsOpen(false)}
					onMovePrevRequest={() =>
						setPhotoIndex((photoIndex + images.length - 1) % images.length)
					}
					onMoveNextRequest={() =>
						setPhotoIndex((photoIndex + 1) % images.length)
					}
				/>
			)}
		</div>
	);
}

export default GalleryPage;
