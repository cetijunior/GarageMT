import { testimonialsData } from "../../content/testimonialsContent";
import { FaQuoteLeft } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

function TestimonialsSection() {
	return (
		<section className="py-16 bg-gray-50" id="testimonials">
			<div className="container mx-auto text-center">
				<h2 className="text-3xl font-bold mb-8 text-gray-800 tracking-wider uppercase relative">
					<span className="relative z-10">What Our Clients Say</span>
					<div className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-24 h-1 bg-blue-500"></div>
				</h2>

				<Swiper
					modules={[Pagination]}
					spaceBetween={30}
					slidesPerView={1}
					pagination={{ clickable: true }}
					breakpoints={{
						640: {
							slidesPerView: 1,
						},
						1024: {
							slidesPerView: 2,
						},
						1280: {
							slidesPerView: 3,
						},
					}}
					className="max-w-6xl mx-auto"
				>
					{testimonialsData.map((testimonial, index) => (
						<SwiperSlide key={index}>
							<div className="bg-white shadow-lg rounded-lg p-8">
								<div className="flex items-center mb-4">
									<FaQuoteLeft className="text-blue-500 h-14 w-14 mr-2" />
									<p className="text-gray-700 text-left italic text-lg">
										&quot;{testimonial.quote}&quot;
									</p>
								</div>
								<div className="flex items-center mt-4">
									<img
										src={testimonial.image}
										alt={testimonial.name}
										className="h-12 w-12 rounded-full object-cover mr-4"
									/>
									<div className="text-left">
										<p className="font-bold text-blue-700">
											{testimonial.name}
										</p>
										<p className="text-sm text-gray-500">
											{testimonial.location}
										</p>
									</div>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
}

export default TestimonialsSection;
