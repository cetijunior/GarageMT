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
import ServicesSection from "../components/sections/ServicesSection";
import AboutUsSection from "../components/sections/AboutUsSection";

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

function GarageMTLimited() {
    const { name, address } = GARAGE_LOCATIONS.LOCATION_1;

    return (
        <>
            <section
                id="hero"
                className="flex h-full w-full items-center justify-center bg-gradient-to-br from-red-800 to-red-600 text-white"
            >
                <GarageHero1 />
            </section>




            {/* <GarageServices services={services} /> */}
            <ServicesSection />

            {/* <AboutUsSection /> */}


            <ContactSection />
        </>
    );
}

export default GarageMTLimited;
