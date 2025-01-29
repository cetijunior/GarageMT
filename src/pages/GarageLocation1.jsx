import React from "react";
import GarageHero1 from "../components/sections/garages/GarageHero1";
import GarageServices from "../components/sections/garages/GarageServices1";
import ContactSection from "../components/sections/ContactSection";
import { GARAGE_LOCATIONS } from "../content/locations";
import {
    FaOilCan,
    FaSyncAlt,
    FaCarCrash,
    FaWrench,
} from "react-icons/fa";
import GarageAbout1 from "../components/sections/garages/GarageAbout1";

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
    const { name, address } = GARAGE_LOCATIONS.LOCATION_1;

    return (
        <>
            <section
                id="hero"
                className="flex h-full w-full items-center justify-center bg-gradient-to-br from-red-800 to-red-600 text-white"
            >
                <GarageHero1 />
            </section>


            <GarageAbout1
                details="Garage MT in Mosta specializes in modern automotive solutions, offering customers a wide range of professional services. With state-of-the-art equipment and a team of certified mechanics, we ensure your vehicle gets the best care."
            />

            <GarageServices services={services} />

            <ContactSection />
        </>
    );
}

export default GarageLocation2;
