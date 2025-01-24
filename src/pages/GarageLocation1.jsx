import React from "react";
import GarageHero from "../components/sections/garages/GarageHero";
import GarageAbout from "../components/sections/garages/GarageAbout";
import GarageServices from "../components/sections/garages/GarageServices";
import { GARAGE_LOCATIONS } from "../content/locations";

const services = [
    { name: "Oil Changes", icon: "/assets/icons/oil.png", description: "Quick oil changes." },
    { name: "Tire Repairs", icon: "/assets/icons/tire.png", description: "Flat tire fixes." },
    // Add more services as needed
];

const galleryImages = [
    "/assets/images/qormi1.jpg",
    "/assets/images/qormi2.jpg",
    // Add more gallery images as needed
];

function GarageLocation1() {
    const { name, address, mapEmbedSrc } = GARAGE_LOCATIONS.LOCATION_1;

    return (
        <>
            <GarageHero
                name={name}
                description="Your trusted Qormi garage with state-of-the-art services."
                image="/assets/images/hero-qormi.jpg"
            />
            <GarageAbout
                details="Garage MT Limited in Qormi has been providing exceptional automotive services for over 20 years. With certified mechanics and a passion for excellence, we ensure every vehicle gets the care it deserves."
            />
            <GarageServices services={services} />
        </>
    );
}

export default GarageLocation1
