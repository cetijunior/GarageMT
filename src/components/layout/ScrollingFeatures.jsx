import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules"; // Import Autoplay module
import { FaHandshake, FaThumbsUp, FaCertificate, FaTools, FaCalendarAlt, FaHistory, FaRocket, FaCheck } from "react-icons/fa"; // Import icons from React Icons

const ScrollingFeatures = () => {
    const features = [
        {
            icon: <FaHandshake />,
            title: "Best Prices",
            description: "Competitive rates for all repairs and services.",
        },
        {
            icon: <FaCalendarAlt />,
            title: "Flexible Scheduling",
            description: "Book repairs at your convenience.",
        },
        {
            icon: <FaHistory />,
            title: "20+ Years Experience",
            description: "Trusted expertise in automotive repair.",
        },
        {
            icon: <FaThumbsUp />,
            title: "100% Guarantee",
            description: "Full guarantee on all our repair work.",
        },
        {
            icon: <FaCertificate />,
            title: "Certified Mechanics",
            description: "Highly trained and certified automotive experts.",
        },
        {
            icon: <FaTools />,
            title: "Latest Tools",
            description: "State-of-the-art equipment for precision repairs.",
        },
        {
            icon: <FaCalendarAlt />,
            title: "Flexible Scheduling",
            description: "Book repairs at your convenience.",
        },
        {
            icon: <FaHistory />,
            title: "20+ Years Experience",
            description: "Trusted expertise in automotive repair.",
        },
        {
            icon: <FaRocket />,
            title: "Fast Turnaround",
            description: "Quick and efficient service.",
        },
        {
            icon: <FaCheck />,
            title: "High Quality Service",
            description: "Exceptional service that meets the highest standards.",
        },
    ];

    return (
        <div className="hidden lg:flex relative bg-gradient-to-l from-red-700 to-red-800 -mt-3 py-4">
            <Swiper
                modules={[Autoplay]} // Enable Autoplay module
                spaceBetween={30}
                slidesPerView="3"
                loop={true} // Infinite loop
                autoplay={{
                    delay: 0, // No delay
                    disableOnInteraction: false, // Keep autoplay running on interaction
                }}
                speed={3000} // Smooth sliding speed
                className="w-full"
            >
                {features.map((feature, index) => (
                    <SwiperSlide
                        key={index}
                        className="flex flex-col items-center text-center px-4"
                        style={{ minWidth: "150px" }} // Ensure a consistent minimum width
                    >
                        <div className="text-white text-4xl lg:text-6xl desktop:text-7xl mb-8">
                            {feature.icon}
                        </div>
                        <h3 className="text-md lg:text-lg font-bold text-white">{feature.title}</h3>
                        <p className="text-xs lg:text-sm text-white/70">{feature.description}</p>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ScrollingFeatures;
