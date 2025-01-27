import React from "react";

function GarageAbout1({ details }) {
    return (
        <section className="py-16 px-8 bg-gray-100 text-gray-800">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl lg:text-4xl font-bold text-center mb-6">About Our Garage</h2>
                <p className="text-lg leading-relaxed">{details}</p>
            </div>
        </section>
    );
}

export default GarageAbout1;
