import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { GARAGE_LOCATIONS } from "../../../content/locations";
import ScrollingFeatures from "../../layout/ScrollingFeatures";
import { FaArrowRightLong } from "react-icons/fa6";
import ScrollingFeatures1 from "./ScrollingFeatures1";

function HeroSection() {
    const navigate = useNavigate();

    // Navigation and scroll logic
    const handleScrollNavigation = (path, sectionId) => {
        if (window.location.pathname !== path) {
            navigate(path);
            setTimeout(() => scrollToSection(sectionId), 300);
        } else {
            scrollToSection(sectionId);
        }
    };

    // Scroll to specific section
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <section
            id="hero"
            className="relative flex flex-col w-full h-fit mt-4 bg-gradient-to-br from-red-800 to-red-600"
        >
            {/* Top Section */}
            <div className="flex flex-col mt-16 lg:-mt-10 lg:flex-row w-full h-5/6 items-center justify-between p-6 lg:py-32 xl:py-40">
                {/* Top Left: Text Section */}
                <motion.div
                    className="flex-1 text-center lg:text-left space-y-6 max-w-2xl"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight">
                        <span className="text-shadow">GarageMT Limited</span> <br />
                        <span className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl flex items-center lg:justify-between justify-evenly space-x-4">
                            <FaArrowRightLong />
                            <p>
                                Location 1
                            </p>
                        </span>
                    </h1>
                    <p className="text-base md:text-lg xl:text-xl text-white/90 lg:pr-4">
                        Swift, professional repairs that get you back on the road. Your trusted automotive partner in Malta.
                    </p>
                    <div className="flex flex-row-reverse w-full mx-auto lg:pr-4 justify-center lg:justify-between gap-4">
                        <button
                            onClick={() => handleScrollNavigation("/", "contact")}
                            className="px-6 md:px-8 py-2 md:py-3 bg-white text-red-900 rounded-full font-semibold hover:bg-gray-100 shadow-md transition text-sm md:text-base xl:text-lg"
                        >
                            Emergency Help
                        </button>
                        <button
                            onClick={() => handleScrollNavigation("/", "services")}
                            className="px-6 md:px-8 py-2 md:py-3 border-2 border-white text-white rounded-full hover:bg-white/20 shadow-md transition text-sm md:text-base xl:text-lg"
                        >
                            Our Services
                        </button>
                    </div>
                </motion.div>

                <div
                    className="flex items-center justify-center lg:justify-end lg:pl-10 mt-10 lg:mt-0 w-full lg:w-1/2"
                >

                    <img
                        src="/assets/images/entry3.jpg"
                        className="rounded-lg shadow-2xl w-full"
                    />

                </div>

            </div >
            <div className="mt-20 lg:mt-0">
                <ScrollingFeatures1 />
            </div>
        </section >
    );
}

export default HeroSection;
