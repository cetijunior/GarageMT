import React from 'react';
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import {
    FaCalendarAlt, FaTools, FaPhoneAlt, FaClock, FaShieldAlt, FaStar,
    FaChevronRight, FaWrench, FaCar, FaUserFriends, FaHandshake,
    FaThumbsUp, FaCertificate, FaHistory, FaRocket, FaCheck
} from "react-icons/fa";
import "swiper/css";
import "swiper/css/autoplay";

const GarageHero2 = () => {
    const stats = [
        { icon: FaWrench, value: '15+', label: 'Years Experience' },
        { icon: FaUserFriends, value: '2000+', label: 'Happy Clients' },
        { icon: FaCar, value: '24/7', label: 'Service Available' },
    ];

    const features = [
        {
            icon: <FaHandshake />,
            title: "Best Prices",
            description: "Competitive rates for all repairs and services.",
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

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    return (
        <section className="relative  bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[url('/assets/images/hero.jpg')] bg-cover bg-center opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-orange-500/10" />

            {/* Content Container */}
            <div className="relative container mx-auto px-6 md:px-10 lg:px-20 py-20 lg:py-28">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column - Main Content */}
                    <motion.div
                        className="space-y-8"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Badge */}
                        <motion.div
                            className="inline-flex items-center lg:mt-0 mt-8 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
                            {...fadeInUp}
                        >
                            <FaShieldAlt className="w-4 h-4 text-red-400 mr-2" />
                            <span className="text-white/90 text-sm">Garage MT</span>
                        </motion.div>

                        {/* Main Heading */}
                        <motion.h1
                            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
                            {...fadeInUp}
                        >
                            Expert Auto <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
                                Repair Services
                            </span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            className="text-lg text-white/80 max-w-xl"
                            {...fadeInUp}
                        >
                            Experience top-tier automotive care with our expert team. We combine state-of-the-art technology with skilled craftsmanship to keep your vehicle running perfectly.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            className="flex flex-wrap gap-4"
                            {...fadeInUp}
                        >
                            <button className="px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium flex items-center gap-2 shadow-lg shadow-red-500/30 transition-all duration-300">
                                Schedule Service
                                <FaChevronRight className="w-4 h-4" />
                            </button>
                            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium backdrop-blur-md border border-white/20 flex items-center gap-2 transition-all duration-300">
                                <FaPhoneAlt className="w-4 h-4" />
                                Emergency Support
                            </button>
                        </motion.div>

                        {/* Stats */}
                        {/* <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            {stats.map((stat, index) => (
                                <div key={index} className="bg-white/5 backdrop-blur-md p-6 rounded-lg shadow-md flex flex-col items-center">
                                    <stat.icon className="w-10 h-10 text-red-400 mb-3" />
                                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                                    <div className="text-sm text-white/60">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div> */}
                    </motion.div>

                    {/* Right Column - Image */}
                    <motion.div
                        className="relative flex justify-center"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl">
                            <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl blur opacity-30" />
                            <img
                                src="/assets/images/hero.jpg"
                                alt="Professional Auto Service"
                                className="relative rounded-2xl w-full shadow-2xl"
                            />
                        </div>

                        {/* Floating Cards */}
                        <motion.div
                            className="absolute bottom-6 left-4 sm:left-12 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <div className="flex items-center gap-3">
                                <FaClock className="w-5 h-5 text-red-400" />
                                <div>
                                    <div className="text-white font-medium">Fast Service</div>
                                    <div className="text-white/60 text-sm">2-hour average turnaround</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Additional Floating Element */}
                        <motion.div
                            className="absolute top-6 right-4 sm:right-12 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-xl"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <div className="flex items-center gap-3">
                                <FaStar className="w-5 h-5 text-yellow-400" />
                                <div>
                                    <div className="text-white font-medium">5-Star Service</div>
                                    <div className="text-white/60 text-sm">Rated by our clients</div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>



            {/* Scrolling Features Section */}
            <div className="relative -mt-10 lg:-mt-24">
                <div className="absolute opacity-0 inset-0 bg-gradient-to-l from-red-700 to-red-800" />
                <div className="relative py-6">
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={30}
                        slidesPerView={3}
                        breakpoints={{
                            320: { slidesPerView: 1 },
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        loop={true}
                        autoplay={{
                            delay: 0,
                            disableOnInteraction: false,
                        }}
                        speed={3000}
                        className="w-full"
                    >
                        {features.map((feature, index) => (
                            <SwiperSlide
                                key={index}
                                className="flex flex-col items-center text-center px-4"
                            >
                                <div className="text-white text-4xl lg:text-6xl mb-8">
                                    {feature.icon}
                                </div>
                                <h3 className="text-md lg:text-lg font-bold text-white">
                                    {feature.title}
                                </h3>
                                <p className="text-xs lg:text-sm text-white/70">
                                    {feature.description}
                                </p>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default GarageHero2;