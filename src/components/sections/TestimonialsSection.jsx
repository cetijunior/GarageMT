import { testimonialsData } from "../../content/testimonialsContent";
import { FaQuoteLeft } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

function TestimonialsSection() {
	return (
		<section className="py-16 bg-gray-100" id="testimonials">
			<div className="container mx-auto text-center">
				<h2 className="text-3xl font-extrabold mb-8 text-gray-800 tracking-wider uppercase relative">
					<span className="relative z-10">What Our Clients Say</span>
					<div className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-24 h-1 bg-red-500"></div>
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
					className="max-w-6xl py-10 mx-auto"
				>
					{testimonialsData.map((testimonial, index) => (
						<SwiperSlide key={index}>
							<div className="bg-white shadow-lg rounded-lg p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
								<div className="flex items-center mb-6">
									<FaQuoteLeft className="text-red-500 h-10 w-10 mr-4" />
									<p className="text-gray-700 text-left italic text-lg">
										&quot;{testimonial.quote}&quot;
									</p>
								</div>
								<div className="flex items-center mt-6">
									<img
										src={testimonial.image}
										alt={testimonial.name}
										className="h-16 w-16 rounded-full object-cover mr-4 shadow-md"
									/>
									<div className="text-left">
										<p className="font-bold text-red-600 text-xl">
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
