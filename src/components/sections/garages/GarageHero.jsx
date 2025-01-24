import React from "react";

function GarageHero({ name, description, image }) {
    return (
        <section
            className="relative flex flex-col justify-center items-center bg-gradient-to-br from-red-800 to-red-600 text-white h-[80vh] w-full"
            style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="bg-black bg-opacity-50 p-8 rounded-xl text-center max-w-4xl">
                <h1 className="text-4xl lg:text-6xl font-extrabold mb-4">{name}</h1>
                <p className="text-lg lg:text-xl">{description}</p>
            </div>
        </section>
    );
}

export default GarageHero;
