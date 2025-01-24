import React from "react";
import GarageHero from "../components/sections/garages/GarageHero";
import GarageAbout from "../components/sections/garages/GarageAbout";
import GarageServices from "../components/sections/garages/GarageServices";
import { GARAGE_LOCATIONS } from "../content/locations";

const services = [
    { name: "Engine Repairs", icon: "/assets/icons/engine.png", description: "Expert engine diagnostics and repairs." },
    { name: "Brake Maintenance", icon: "/assets/icons/brakes.png", description: "Safe and efficient brake services." },
    { name: "Car Wash & Detailing", icon: "/assets/icons/wash.png", description: "Top-notch car cleaning services." },
    { name: "Battery Replacement", icon: "/assets/icons/battery.png", description: "Professional battery testing and installation." },
    // Add more services specific to Mosta garage as needed
];

const galleryImages = [
    "/assets/images/mosta1.jpg",
    "/assets/images/mosta2.jpg",
    "/assets/images/mosta3.jpg",
    // Add more gallery images specific to Mosta as needed
];

function GarageMostaPage() {
    const { name, address, mapEmbedSrc } = GARAGE_LOCATIONS.LOCATION_2;

    return (
        <>
            <GarageHero
                name={name}
                description="Providing trusted and reliable automotive services in Mosta."
                image="/assets/images/hero-mosta.jpg"
            />
            <GarageAbout
                details="Garage MT in Mosta specializes in modern automotive solutions, offering customers a wide range of professional services. With state-of-the-art equipment and a team of certified mechanics, we ensure your vehicle gets the best care."
            />
            <GarageServices services={services} />
        </>
    );
}

export default GarageMostaPage;
