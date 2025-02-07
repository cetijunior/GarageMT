import React from "react";

import GarageHero2 from "../components/sections/garages/GarageHero2";
import GarageServices from "../components/sections/garages/GarageServices1";

import ContactSection from "../components/sections/ContactSection";
import { GARAGE_LOCATIONS } from "../content/locations";
import GarageAbout1 from "../components/sections/garages/GarageAbout1";
import ServicesSection from "../components/sections/ServicesSection";
import AboutUsSection from "../components/sections/AboutUsSection";


function GarageLocation2() {
    const { name, address } = GARAGE_LOCATIONS.LOCATION_1;

    return (
        <>
            <section
                id="hero"
                className="flex h-full w-full items-center justify-center bg-gradient-to-br from-red-800 to-red-600 text-white"
            >
                <GarageHero2 />
            </section>


            <GarageAbout1
                details="Garage MT in Mosta specializes in modern automotive solutions, offering customers a wide range of professional services. With state-of-the-art equipment and a team of certified mechanics, we ensure your vehicle gets the best care."
            />

            {/* <GarageServices services={services} /> */}
            <ServicesSection />

            <AboutUsSection />

            <ContactSection />
        </>
    );
}

export default GarageLocation2;
