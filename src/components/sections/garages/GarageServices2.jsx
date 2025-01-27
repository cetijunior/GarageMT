import React from "react";

function GarageServices1({ services }) {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8">Our Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center p-6 bg-gray-100 rounded-lg shadow-md"
                        >
                            <img
                                src={service.icon}
                                alt={service.name}
                                className="w-16 h-16 mb-4"
                            />
                            <h3 className="text-xl font-bold">{service.name}</h3>
                            <p className="text-gray-600 mt-2">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default GarageServices1;
