import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

const ScrollingFeatures = () => {
    const features = [
        {
            icon: "/assets/images/hands.png",
            title: "Best Prices",
            description: "Competitive rates for all repairs and services.",
        },
        {
            icon: "/assets/images/thumbs-up.png",
            title: "100% Guarantee",
            description: "Full guarantee on all our repair work.",
        },
        {
            icon: "/assets/images/certificate.png",
            title: "Certified Mechanics",
            description: "Highly trained and certified automotive experts.",
        },
        {
            icon: "/assets/images/hands.png",
            title: "Latest Tools",
            description: "State-of-the-art equipment for precision repairs.",
        },
        {
            icon: "/assets/images/hands.png",
            title: "Flexible Scheduling",
            description: "Book repairs at your convenience.",
        },
        {
            icon: "/assets/images/hands.png",
            title: "20+ Years Experience",
            description: "Trusted expertise in automotive repair.",
        },
        {
            icon: "/assets/images/hands.png",
            title: "Fast Turnaround",
            description: "Quick and efficient service.",
        },
    ];

    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;

        const updateScroll = () => {
            if (!container) return;
            container.scrollLeft += 1; // Adjust speed as necessary
            if (container.scrollLeft >= container.scrollWidth / 2) {
                container.scrollLeft = 0; // Reset for seamless loop
            }
        };

        const intervalId = setInterval(updateScroll, 20); // Adjust interval for smoothness

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div
            className="hidden lg:flex absolute bottom-0 overflow-hidden w-full 
            bg-gradient-to-l from-red-700 to-red-800 py-6 
            h-1/4 laptop:h-1/4 desktop:h-1/3"
        >
            <div
                ref={containerRef}
                className="flex space-x-8 items-center justify-start"
                style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                }}
            >
                {/* Duplicate features for seamless looping */}
                {[...features, ...features].map((item, index) => (
                    <motion.div
                        key={index}
                        className="flex flex-col items-center text-center min-w-[150px] md:min-w-[200px] px-4"
                        animate={{
                            opacity: [0.8, 1, 0.8],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    >
                        <img
                            src={item.icon}
                            alt={`${item.title} Icon`}
                            className="w-12 h-12 lg:w-16 lg:h-16 laptop:h-20 laptop:w-20 laptop:mb-2 desktop:h-28 desktop:w-28 desktop:mb-10"
                        />
                        <h3 className="text-base lg:text-md font-bold text-white">
                            {item.title}
                        </h3>
                        <p className="text-xs lg:text-sm text-white/70">
                            {item.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ScrollingFeatures;
