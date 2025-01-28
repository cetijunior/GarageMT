import React from "react";
import ParticlesBackground from "../components/layout/ParticlesBackground";

function PrivacyPolicy() {
    return (
        <div className="container min-h-screen mx-auto py-16 px-6 mt-20 bg-gray-100 rounded-lg shadow-lg">
            <ParticlesBackground />
            <h1 className="text-4xl font-bold text-red-700 mb-8 text-center">Privacy Policy</h1>
            <p className="text-lg leading-relaxed text-gray-700 mb-8">
                At <span className="font-semibold">GarageMT</span>, we value your privacy and are committed to protecting your personal data. This Privacy Policy outlines how we collect, use, and protect your information when you visit our website or use our services.
            </p>

            <div className="space-y-8">
                <section>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
                    <p className="text-gray-600 leading-relaxed">
                        We collect personal information that you voluntarily provide to us, such as:
                    </p>
                    <ul className="list-disc pl-6 text-gray-600 mt-4">
                        <li>Your name and contact information, including phone number and email address.</li>
                        <li>Details related to your vehicle and service requests.</li>
                        <li>Payment details for processing transactions securely.</li>
                        <li>Technical data like IP addresses when you browse our website.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. How We Use Your Information</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Your personal information is used to provide the best possible service, including:
                    </p>
                    <ul className="list-disc pl-6 text-gray-600 mt-4">
                        <li>Scheduling and managing your service bookings.</li>
                        <li>Communicating important updates or follow-ups regarding your inquiries or services.</li>
                        <li>Improving our website and overall customer experience.</li>
                        <li>Processing payments and generating invoices for services rendered.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Sharing Your Information</h2>
                    <p className="text-gray-600 leading-relaxed">
                        We respect your privacy and will only share your personal information:
                    </p>
                    <ul className="list-disc pl-6 text-gray-600 mt-4">
                        <li>With trusted third-party providers who assist us in delivering services, such as payment gateways.</li>
                        <li>When legally required by Maltese law or government authorities.</li>
                        <li>To protect our rights and interests in cases of fraud or security concerns.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Data Security</h2>
                    <p className="text-gray-600 leading-relaxed">
                        We use modern security measures to protect your personal data, including secure servers, encryption, and restricted access to sensitive information.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Your Rights</h2>
                    <p className="text-gray-600 leading-relaxed">
                        As a resident of Malta or the EU, you have the right to:
                    </p>
                    <ul className="list-disc pl-6 text-gray-600 mt-4">
                        <li>Access, update, or delete your personal data.</li>
                        <li>Restrict or object to the processing of your information.</li>
                        <li>Request data portability for transferring your information to another service provider.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Contact Us</h2>
                    <p className="text-gray-600 leading-relaxed">
                        If you have questions about this Privacy Policy or wish to exercise your rights, contact us at:
                    </p>
                    <ul className="list-none pl-0 mt-4 text-gray-600">
                        <li className="mb-4">Email: <span className="text-red-700">info@garage.mt</span></li>
                        <li>Phone: <span className="text-red-700">+356 770 88 222</span></li>
                        <li>Phone: <span className="text-red-700">+356 77 49 86 75</span></li>
                        <li>Address: <span className="text-red-700">1, Barbra, Triq Ħal Far, Birżebbuġa BBG 9034, Malta</span></li>
                        <li>Address: <span className="text-red-700">35 Triq San Tumas, Qormi, Malta</span></li>
                    </ul>
                </section>
            </div>
        </div>
    );
}

export default PrivacyPolicy;
