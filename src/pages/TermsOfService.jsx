import React from "react";
import ParticlesBackground from "../components/layout/ParticlesBackground";

function TermsOfService() {
    return (
        <div className="container min-h-screen mx-auto py-12 mt-20 px-6">
            <ParticlesBackground />
            <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
            <p className="mb-4">
                These Terms of Service govern your use of the GarageMT website and
                services. By accessing our website or using our services, you agree to
                these terms.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">1. Services</h2>
            <p className="mb-4">
                GarageMT provides automotive repair and maintenance services. All
                services are subject to availability and prior booking.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">2. User Responsibilities</h2>
            <ul className="list-disc pl-6 mb-4">
                <li>Provide accurate information during bookings or inquiries.</li>
                <li>Comply with local traffic and safety laws when bringing your vehicle to us.</li>
            </ul>
            <h2 className="text-2xl font-semibold mt-6 mb-4">3. Payments and Refunds</h2>
            <p className="mb-4">
                Payments for services are due upon completion unless otherwise agreed.
                Refunds will only be processed for valid claims as determined by
                GarageMT.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">4. Liability</h2>
            <p className="mb-4">
                GarageMT is not liable for damages resulting from incorrect information
                provided by the user or third-party incidents.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">5. Contact Us</h2>
            <p>
                For any questions or concerns about these Terms of Service, contact us
                at info@garage.mt.
            </p>
        </div>
    );
}

export default TermsOfService;
