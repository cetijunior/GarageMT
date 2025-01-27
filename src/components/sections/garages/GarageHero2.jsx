import React from "react";
import { motion } from "framer-motion";

function GarageHero1({ name, description, image, address }) {
    return (
        <section
            className="relative flex flex-col justify-center items-center h-[80vh] w-full bg-cover bg-center"
            style={{
                backgroundImage: `url(${image})`,
            }}
        >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/90 to-red-700/70"></div>

            {/* Content */}
            <motion.div
                className="relative z-10 text-center text-white max-w-3xl p-6 lg:p-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-lg">
                    {name}
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl mb-6">{description}</p>
                <div className="text-sm md:text-base lg:text-lg font-semibold text-gray-200 mt-4">
                    Located at: {address}
                </div>
            </motion.div>
        </section>
    );
}

export default GarageHero1;
