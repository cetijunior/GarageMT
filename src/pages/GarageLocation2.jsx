import React from "react";
import GarageHero from "../components/sections/garages/GarageHero";
import GarageAbout from "../components/sections/garages/GarageAbout";
import GarageServices from "../components/sections/garages/GarageServices";
import ContactSection from "../components/sections/ContactSection";
import { GARAGE_LOCATIONS } from "../content/locations";
import {
    FaOilCan,
    FaSyncAlt,
    FaCarCrash,
    FaWrench,
} from "react-icons/fa";

const services = [
    {
        name: "Oil Changes",
        icon: <FaOilCan className='text-red-600 text-5xl' />, // Add custom styling
        description: "Quick and efficient oil changes to keep your engine healthy.",
    },
    {
        name: "Tire Rotation",
        icon: <FaSyncAlt className='text-red-600 text-5xl' />,
        description: "Expert tire rotation for even wear and better handling.",
    },
    {
        name: "Brake Inspection",
        icon: <FaCarCrash className='text-red-600 text-5xl' />,
        description: "Ensure safety with professional brake inspections.",
    },
    {
        name: "General Repairs",
        icon: <FaWrench className='text-red-600 text-5xl' />,
        description: "Comprehensive repairs for all vehicle makes and models.",
    },
];

function GarageLocation2() {
    const { name, address } = GARAGE_LOCATIONS.LOCATION_2;

    return (
        <>
            <section
                id="hero"
                className="relative mt-20 flex items-center justify-center bg-gradient-to-br from-red-800 to-red-600 text-white h-[80vh] w-full"
                style={{
                    backgroundImage: `url(/assets/images/hero.jpg)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="bg-black bg-opacity-50 p-8 rounded-xl text-center max-w-4xl animate-fade-in-down">
                    <h1 className="text-4xl lg:text-6xl font-extrabold mb-4">
                        Welcome to {name}
                    </h1>
                    <p className="text-lg lg:text-xl">
                        Providing trusted and reliable automotive services in Mosta.
                    </p>
                    <p className="mt-4 text-sm lg:text-base">Located at {address}</p>
                </div>
            </section>

            <GarageAbout
                details="Garage MT in Mosta specializes in modern automotive solutions, offering customers a wide range of professional services. With state-of-the-art equipment and a team of certified mechanics, we ensure your vehicle gets the best care."
            />

            <GarageServices services={services} />

            <ContactSection />
        </>
    );
}

export default GarageLocation2;
