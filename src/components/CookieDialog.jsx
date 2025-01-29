import { XMarkIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";
import { FaCross, FaXingSquare } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

function CookieDialog({ preferences, onSave, onAcceptAll, onClose }) {
    const [localPreferences, setLocalPreferences] = useState(preferences);

    const handleToggle = (key) => {
        setLocalPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSave = () => {
        localStorage.setItem("cookiePreferences", JSON.stringify(localPreferences));
        onSave(localPreferences);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Cookie & Marketing Preferences</h2>
                    <button onClick={onClose} className="text-gray-600">
                        <FaX />
                    </button>
                </div>
                <p className="text-sm text-gray-600 mb-6">
                    We use cookies to improve your experience. Manage your preferences below.
                </p>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span>Necessary Cookies</span>
                        <input type="checkbox" checked disabled />
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Analytics Cookies</span>
                        <input
                            type="checkbox"
                            checked={localPreferences.analytics}
                            onChange={() => handleToggle("analytics")}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Marketing & Booking Consent</span>
                        <input
                            type="checkbox"
                            checked={localPreferences.marketing}
                            onChange={() => handleToggle("marketing")}
                        />
                    </div>
                </div>
                <div className="flex justify-end mt-6 gap-4">
                    <button onClick={handleSave} className="px-4 py-2 bg-red-600 text-white rounded-lg">
                        Save Preferences
                    </button>
                    <button onClick={onAcceptAll} className="px-4 py-2 bg-green-600 text-white rounded-lg">
                        Accept All
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CookieDialog;
